import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

const ROOT_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DAILY_MENU_PATH = path.join(ROOT_DIR, "data", "meniu-zilei.json");
const PUBLIC_MENU_IMAGE_DIR = path.join(ROOT_DIR, "public", "meniu-zilei");
const DEFAULT_CONFIG_PATH = path.join(ROOT_DIR, "data", "site-config.json");
const DEFAULT_TZ = "Europe/Bucharest";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const DEFAULT_PUBLIC_PROXY = "https://r.jina.ai/http://";
const DEFAULT_PUBLIC_PROXY_TIMEOUT_MS = 25_000;

const MENU_DAY_KEYS = {
  0: "duminica",
  1: "luni",
  2: "marti",
  3: "miercuri",
  4: "joi",
  5: "vineri",
  6: "sambata",
};

const DAY_NAME_TO_INDEX = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

function parseArgs(argv) {
  const options = {};
  for (const token of argv) {
    if (!token.startsWith("--")) {
      continue;
    }
    const [key, ...rest] = token.slice(2).split("=");
    const normalizedKey = key.trim();
    const rawValue = rest.length ? rest.join("=").trim() : "true";
    options[normalizedKey] = rawValue === "false" ? false : rawValue;
  }

  const maxPosts = Number(options.maxPosts || process.env.DAILY_MENU_MAX_POSTS || 10);

  return {
    configPath: options.config ? path.resolve(options.config) : DEFAULT_CONFIG_PATH,
    date: options.date || null,
    force: options.force === "true",
    tz: options.tz || process.env.DAILY_MENU_TZ || DEFAULT_TZ,
    startTime: options.start || process.env.DAILY_MENU_START_TIME || "09:00",
    endTime: options.end || process.env.DAILY_MENU_END_TIME || "10:00",
    token: options.token || process.env.FACEBOOK_ACCESS_TOKEN || "",
    pageId: options.pageId || process.env.FACEBOOK_PAGE_ID || "",
    pageUrl: options.pageUrl || process.env.FACEBOOK_PAGE_URL || "",
    postUrl: options.postUrl || process.env.FACEBOOK_POST_URL || "",
    maxPosts: Number.isFinite(maxPosts) && maxPosts > 0 ? Math.floor(maxPosts) : 10,
    dryRun: options.dryRun === "true",
    publicProxy: options.publicProxy || process.env.FACEBOOK_PUBLIC_PROXY || "",
  };
}

function getDatePartsInTimeZone(date = new Date(), tz = DEFAULT_TZ) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value])
  );

  const dayIndex = DAY_NAME_TO_INDEX[(parts.weekday || "").toLowerCase().slice(0, 3)] || 0;

  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    dayIndex,
  };
}

function formatLocalDateKey(date = new Date(), tz = DEFAULT_TZ) {
  const localDate = getDatePartsInTimeZone(date, tz);
  const month = String(localDate.month).padStart(2, "0");
  const day = String(localDate.day).padStart(2, "0");
  return `${localDate.year}-${month}-${day}`;
}

function getDayKey(date = new Date(), tz = DEFAULT_TZ) {
  const { dayIndex } = getDatePartsInTimeZone(date, tz);
  return MENU_DAY_KEYS[dayIndex] || "luni";
}

function normalizeMinutes(value) {
  const [h = 0, m = 0] = String(value || "0:0")
    .trim()
    .split(":")
    .map((item) => Number(item));

  return { h: Number.isFinite(h) ? h : 0, m: Number.isFinite(m) ? m : 0 };
}

function isWithinWindow(date = new Date(), tz = DEFAULT_TZ, start = "09:00", end = "10:00") {
  const localDate = getDatePartsInTimeZone(date, tz);
  const currentMinutes = localDate.hour * 60 + localDate.minute;
  const startMinutes = (() => {
    const parsed = normalizeMinutes(start);
    return parsed.h * 60 + parsed.m;
  })();
  const endMinutes = (() => {
    const parsed = normalizeMinutes(end);
    return parsed.h * 60 + parsed.m;
  })();

  if (startMinutes === endMinutes) {
    return true;
  }

  if (startMinutes < endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes < endMinutes;
  }

  return currentMinutes >= startMinutes || currentMinutes < endMinutes;
}

function slugify(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/(^-|-$)/g, "");
}

function parseDateFromText(text) {
  const dateMatch = String(text || "").match(/(\d{1,2})[./](\d{1,2})[./](\d{2,4})/);
  if (!dateMatch) return null;

  let [, d, m, y] = dateMatch;
  d = Number(d);
  m = Number(m);
  y = Number(y.length === 2 ? `20${y}` : y);

  if (!Number.isFinite(d) || !Number.isFinite(m) || !Number.isFinite(y)) {
    return null;
  }

  const dt = new Date(`${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T00:00:00Z`);
  if (Number.isNaN(dt.getTime())) {
    return null;
  }

  return dt;
}

function normalizeDateKey(value, tz = DEFAULT_TZ) {
  return value ? formatLocalDateKey(value, tz) : null;
}

function isMenuPostCandidate(postText) {
  const normalized = String(postText || "").toLowerCase();
  if (!normalized) {
    return false;
  }

  const withAccent = normalized.includes("meniul zilei") || normalized.includes("meniu zilei");
  const withoutAccent = normalized.includes("meniul zile") || normalized.includes("meniu zile");
  const hasDishes = /🍽️|🍲|🍗|🥗|🌭|🔥|🥘|🥙|🍜|🍛|🍖|🍤|🍕/u.test(postText || "");

  return Boolean(withAccent || withoutAccent || hasDishes);
}

function stripSocialNoiseLines(lines) {
  const rawLines = Array.isArray(lines)
    ? lines
    : String(lines || "").replace(/\r\n/g, "\n").split("\n");

  const normalizedStopWords = [
    /toate\s+reac/i,
    /all\s+reactions/i,
    /reactii|reacții/i,
    /hide\s+reactions/i,
    /show\s+more/i,
    /comment|comentariu|comentarii/i,
    /permi[țt]e\s+folosirea\s+modulelor\s+cookie/i,
    /cookie|cookies/i,
    /meta\s+platforms?|facebook/i,
    /anun[aț]uri\s+publicitare|publicitatea/i,
  ];

  return rawLines
    .map((line) => String(line || "").replace(/\u00a0/g, " ").trim())
    .filter((line) => {
      if (!line || line.length < 3) {
        return false;
      }

      if (/^\u00b7$/.test(line)) {
        return false;
      }

      if (isLoginNoiseLine(line)) {
        return false;
      }

      if (/\{(?:"require"|\s*\[|\])|require\[|qplTimingsServerJS|qplTagServerJS|fbcdn\.net|Comet[A-Za-z]/i.test(line)) {
        return false;
      }

      if (normalizedStopWords.some((pattern) => pattern.test(line))) {
        return false;
      }

      return true;
    });
}

function scoreMenuPostText(text) {
  const normalized = String(text || "").toLowerCase();
  if (!normalized) {
    return 0;
  }

  let score = 0;
  if (/meniul\s+zilei|meniu\s+zilei/.test(normalized)) {
    score += 120;
  }

  const hasEmoji = /[\p{Extended_Pictographic}]/u.test(normalized);
  if (hasEmoji) {
    score += 20;
  }

  if (/ciorb|sup[aă]|salat|mici|cartofi|pui|carn|preparat|v[aă]cu|varz/i.test(normalized)) {
    score += 12;
  }

  const lines = normalized.split(/\r?\n/).filter(Boolean);
  if (lines.length > 4 && lines.length < 20) {
    score += 8;
  }

  if (/\d{1,2}[./]\d{1,2}[./]\d{2,4}/.test(normalized)) {
    score += 3;
  }

  return score;
}

function isLoginNoiseLine(line) {
  const lowered = String(line || "").toLowerCase();
  return (
    lowered.includes("log in") ||
    lowered.includes("forgot password") ||
    lowered.includes("create new account") ||
    lowered.includes("email or phone number") ||
    lowered.includes("privacy") ||
    lowered.includes("terms") ||
    lowered.includes("see more from") ||
    lowered.includes("all reactions") ||
    lowered.includes("sign up") ||
    lowered.includes("create account") ||
    lowered.includes("email")
  );
}

function normalizeImageAlt(rawAlt) {
  const alt = String(rawAlt || "").trim();
  if (!alt) {
    return "";
  }

  if (/^Image\s+\d+\s*:?\s*$/i.test(alt)) {
    return "";
  }

  const cleaned = alt.replace(/^Image\s+\d+\s*:\s*/i, "").trim();
  if (!cleaned || cleaned.length < 6) {
    return "";
  }

  if (/^may be an image of/i.test(cleaned)) {
    return "";
  }

  if (!/[\p{L}]/u.test(cleaned)) {
    return "";
  }

  return cleaned;
}

function extractJinaPosts(markdownText, fallbackCountStart = 0) {
  const lines = String(markdownText || "").split(/\r?\n/);
  const posts = [];
  let currentPost = null;
  let sequence = Number.isFinite(fallbackCountStart) ? Number(fallbackCountStart) : 0;

  const asBoundary = (line) => {
    const directMatch = String(line || "").match(
      /^\[([^\]]+)\]\((https:\/\/www\.facebook\.com\/[^)]+)\)/i
    );
    if (!directMatch) {
      return null;
    }

    const label = directMatch[1].trim();
    const href = directMatch[2];
    if (!/story_fbid=|\/photo\/?\?|\/photo\.php\?fbid=|\/posts\//i.test(href)) {
      return null;
    }

    return { label, href };
  };

  const endCurrent = () => {
    if (!currentPost) {
      return;
    }

    const message = Array.from(new Set(currentPost.messageLines || []))
      .filter(Boolean)
      .join("\n")
      .trim();

    const images = Array.from(new Set(currentPost.imageCandidates || []));
    if (!message && !images.length) {
      currentPost = null;
      return;
    }

    const explicitDate = extractDateFromRelativeLabel(currentPost.label);
    const parsedDate = parseDateFromText(message);
    const effectiveDate = explicitDate || parsedDate || new Date(Date.now() - sequence * 60_000);
    sequence += 1;

    const idMatch = currentPost.permalink.match(/story_fbid=([0-9]+)/);
    posts.push({
      message,
      created_time: effectiveDate ? effectiveDate.toISOString() : new Date().toISOString(),
      full_picture: images[0] || "",
      permalink_url: currentPost.permalink,
      id: idMatch?.[1] || `jina-${sequence}`,
      attachments: {
        data: images.map((source) => ({
          media: {
            image: {
              src: source,
            },
          },
        })),
      },
    });

    currentPost = null;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const boundary = asBoundary(line);
    if (boundary) {
      endCurrent();
      currentPost = {
        label: boundary.label,
        permalink: boundary.href,
        messageLines: [],
        imageCandidates: [],
      };
      continue;
    }

    if (!currentPost) {
      continue;
    }

    if (/^## \[photos\]/i.test(line) || /see more from coco jar/i.test(line) || /^email or phone number$/i.test(line)) {
      endCurrent();
      continue;
    }

    const imageMatch = [...rawLine.matchAll(/!\[([^\]]*)\]\((https?:\/\/[^\)\s]+)\)/g)];
    if (imageMatch.length > 0) {
      for (const [, alt, src] of imageMatch) {
        if (/FBLogo_Blueprint|blob:http:/.test(src)) {
          continue;
        }
        if (/(fbcdn\.net|scontent\.fbcdn\.net)/.test(src)) {
          currentPost.imageCandidates.push(src);
        }

        const normalizedAlt = normalizeImageAlt(alt);
        if (normalizedAlt) {
          currentPost.messageLines.push(normalizedAlt);
        }
      }
      continue;
    }

    if (isLoginNoiseLine(line) || line === "·" || line.length < 2) {
      continue;
    }

    const cleaned = line
      .replace(/^#+\s*/, "")
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
      .replace(/^>\s*/, "")
      .replace(/\u2022\s*/, "")
      .trim();

    if (cleaned && cleaned.length > 1) {
      currentPost.messageLines.push(cleaned);
    }
  }

  endCurrent();
  return posts;
}

function parseMenuItems(postText) {
  const lines = String(postText || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const filtered = lines.filter((line) => {
    if (/meniul zilei/i.test(line)) return false;
    if (/^\d{1,2}[./]\d{1,2}[./]\d{2,4}$/.test(line)) return false;
    return true;
  });

  const candidates = [];
  for (const rawLine of filtered) {
    const hasBullet = /^\p{Extended_Pictographic}/u.test(rawLine);
    const line = hasBullet
      ? rawLine.replace(/^[^\p{L}\p{N}]+/gu, "").trim()
      : rawLine.replace(/^\s*[—–-•*]\s*/, "").trim();

    if (!line || line.length < 3) {
      continue;
    }

    if (/meniul zilei/i.test(line) || /meniu zilei/i.test(line) || /^\d{1,2}[./]\d{1,2}[./]\d{2,4}$/.test(line)) {
      continue;
    }

    const isLikelyDish =
      hasBullet ||
      /\s+(cu|și|si)\s+/.test(line) ||
      /(supa|ciorb|frigar|prepar|mici|pui|porc|v|vit|platou|salata|varza|supă|mânc|cartofi|carn)\w*/i.test(line);

    if (isLikelyDish) {
      candidates.push({ name: line, description: "", size: "", price: "" });
      continue;
    }

    const looksLikeDish = /(meniu|servit|ziua|ciorb|supa|salat|varza|pui|mici|cartofi|platou|mancare|plat)/i.test(line);
    if (!candidates.length && looksLikeDish) {
      candidates.push({ name: line, description: "", size: "", price: "" });
    }
  }

  return candidates.length ? candidates : [{ name: String(postText || "").trim(), description: "", size: "", price: "" }];
}

async function readJsonSafe(filePath, fallback = {}) {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (_error) {
    return fallback;
  }
}

function extractPageIdFromFacebookUrl(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    const segments = parsed.pathname
      .split("/")
      .filter(Boolean)
      .filter((segment) => segment !== "people");

    const lastNumeric = [...segments].reverse().find((segment) => /^\d+$/.test(segment));
    return lastNumeric || "";
  } catch {
    return "";
  }
}

function buildFacebookPageUrlCandidates(pageUrl) {
  const candidates = [];
  const addCandidate = (value) => {
    const normalized = cleanFacebookPageUrl(value);
    if (normalized && !candidates.includes(normalized)) {
      candidates.push(normalized);
    }
  };

  addCandidate(pageUrl);

  const pageId = (() => {
    try {
      const parsed = new URL(pageUrl);
      if (parsed.searchParams.get("id")) {
        return parsed.searchParams.get("id");
      }
    } catch {
      return "";
    }

    return extractPageIdFromFacebookUrl(pageUrl);
  })();

  if (!pageId) {
    return candidates;
  }

  addCandidate(`https://m.facebook.com/profile.php?id=${pageId}`);
  addCandidate(`http://m.facebook.com/profile.php?id=${pageId}`);
  addCandidate(`https://m.facebook.com/profile.php?id=${pageId}&v=timeline`);
  addCandidate(`http://www.facebook.com/profile.php?id=${pageId}`);
  addCandidate(`https://www.facebook.com/profile.php?id=${pageId}&v=timeline`);

  return candidates;
}

function cleanFacebookPageUrl(rawUrl) {
  if (!rawUrl) return "";

  try {
    const parsed = new URL(rawUrl);
    [
      "__tn__",
      "__cft__",
      "wtsid",
      "__a",
      "sk",
      "ref",
      "op",
      "story_fbid",
      "photo",
      "v",
    ].forEach((key) => parsed.searchParams.delete(key));

    return `${parsed.protocol}//${parsed.host}${parsed.pathname}${parsed.search}`;
  } catch {
    return rawUrl;
  }
}

function buildProxyUrl(pageUrl, proxyBase) {
  if (!pageUrl) {
    return "";
  }

  const target = cleanFacebookPageUrl(pageUrl);
  const normalizedBase = String(proxyBase || DEFAULT_PUBLIC_PROXY).replace(/\/?$/, "/");
  const safeTarget = String(target || "").replace(/^https?:\/\//, "");
  return `${normalizedBase}${safeTarget}`;
}

function extractDateFromRelativeLabel(label) {
  const match = String(label || "").trim().match(/^(\d+)\s*([a-z]{1,2})$/i);
  if (!match) {
    return null;
  }

  const amount = Number.parseInt(match[1], 10);
  if (!Number.isFinite(amount)) {
    return null;
  }

  const now = new Date();
  const unit = match[2].toLowerCase();
  if (unit.startsWith("m")) {
    now.setMinutes(now.getMinutes() - amount);
  } else if (unit.startsWith("h")) {
    now.setHours(now.getHours() - amount);
  } else if (unit.startsWith("d")) {
    now.setDate(now.getDate() - amount);
  } else if (unit.startsWith("w")) {
    now.setDate(now.getDate() - amount * 7);
  } else if (unit.startsWith("s")) {
    now.setSeconds(now.getSeconds() - amount);
  } else if (unit.startsWith("y")) {
    now.setFullYear(now.getFullYear() - amount);
  } else if (unit.startsWith("mo")) {
    now.setMonth(now.getMonth() - amount);
  }

  return now;
}

async function fetchConfig(configPath) {
  const raw = await readJsonSafe(configPath, {});
  return raw?.social || {};
}

function sanitizeImageName(url) {
  const hash = createHash("sha1")
    .update(`${url}-${Date.now()}`)
    .digest("hex")
    .slice(0, 10);

  return hash;
}

function getImageExtension(url, contentType = "") {
  const extensionMap = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/avif": ".avif",
    "image/gif": ".gif",
  };

  const directExtension = path.extname(new URL(url).pathname).toLowerCase();
  if (/\.(png|jpe?g|webp|avif|gif)$/i.test(directExtension)) {
    return directExtension === ".jpe" ? ".jpg" : directExtension;
  }

  return extensionMap[contentType.split(";")[0].trim()] || ".jpg";
}

async function downloadImage(url, targetPath, referer, dryRun = false) {
  if (dryRun) {
    return targetPath;
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Referer: referer,
        Accept: "image/*,*/*;q=0.8",
      },
    });

    if (!response || !response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type") || "";
    if (!String(contentType).toLowerCase().startsWith("image/")) {
      return null;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength < 5000) {
      return null;
    }

    const ext = getImageExtension(url, contentType);
    const extPath = targetPath.replace(/\.\w+$/i, "") + ext;

    await mkdir(path.dirname(extPath), { recursive: true });
    await writeFile(extPath, buffer);

    return extPath;
  } catch (_error) {
    return null;
  }
}

async function fetchWithGraphApi({ pageId, token, limit = 10 }) {
  const endpoint = `https://graph.facebook.com/v23.0/${encodeURIComponent(pageId)}/posts`;
  const query = new URLSearchParams({
    fields: "id,message,created_time,full_picture,permalink_url,attachments{media,type,media_type,title,description,subattachments}",
    access_token: token,
    limit: String(limit),
  });

  const response = await fetch(`${endpoint}?${query.toString()}`);
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Graph API: ${response.status} ${response.statusText} ${text}`);
  }

  const payload = await response.json();
  return Array.isArray(payload?.data) ? payload.data : [];
}

function collectImageFromPost(post) {
  const candidates = [];
  if (post.full_picture) {
    candidates.push(post.full_picture);
  }

  const rawAttachments = post.attachments?.data || [];
  for (const attachment of rawAttachments) {
    if (attachment.media?.image?.src) {
      candidates.push(attachment.media.image.src);
    }

    const nested = attachment.subattachments?.data || [];
    for (const sub of nested) {
      if (sub.media?.image?.src) {
        candidates.push(sub.media.image.src);
      }
    }
  }

  return candidates.filter(Boolean);
}

function parsePostDate(post) {
  if (post?.created_time) {
    const parsed = new Date(post.created_time);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return null;
}

function pickBestPost(posts, targetDateKey, tz = DEFAULT_TZ) {
  const normalizedPosts = posts
    .filter((post) => isMenuPostCandidate(post.message || ""))
    .map((post) => {
      const parsedDate = parsePostDate(post, tz);
      const inMessageDate = parseDateFromText(post.message || "");
      const date = inMessageDate || parsedDate || null;
      return {
        post,
        postDate: date,
        dateKey: date ? normalizeDateKey(date, tz) : null,
      };
    })
    .sort((a, b) => {
      const aTime = parsePostDate(a.post)?.getTime() || 0;
      const bTime = parsePostDate(b.post)?.getTime() || 0;
      return bTime - aTime;
    });

  const todayMatch = normalizedPosts.find((item) => item.dateKey && item.dateKey === targetDateKey);
  if (todayMatch) return todayMatch;

  return normalizedPosts[0] || null;
}

function buildImagePath(dateKey, imageUrl) {
  const safeNameBase = `${dateKey}-${slugify(dateKey) || "meniul-zilei"}`;
  const fallback = `${safeNameBase}-${sanitizeImageName(imageUrl)}`;
  return fallback;
}

function hasContentChanged(previous, dayKey, dayItems, sourceMeta) {
  const previousItems = previous[dayKey] || [];
  const previousSource = previous._source || {};
  const itemsMatch = JSON.stringify(previousItems) === JSON.stringify(dayItems);
  const sourceMatch =
    (previousSource.sourcePostId || "") === (sourceMeta.sourcePostId || "") &&
    (previousSource.sourceUrl || "") === (sourceMeta.sourceUrl || "") &&
    (previousSource.date || "") === (sourceMeta.date || "");

  return !(itemsMatch && sourceMatch);
}

async function fetchFromPlaywrightFallback({ pageUrl, maxPosts }) {
  if (!pageUrl) {
    return { posts: [], imageCandidates: [] };
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 2200 } });
    const result = [];
    const imageSet = new Map();

    await page.goto(pageUrl, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForTimeout(3000);

    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    await page.waitForTimeout(2000);

    const posts = await page.$$eval("[role='article'], .x1lliihq, [data-pagelet]", (nodes) => {
      const out = [];
      for (const node of nodes) {
        const text = node?.textContent?.trim() || "";
        const image = node.querySelector("img");
        out.push({
          text,
          image: image?.src || "",
        });
      }
      return out;
    });

    for (const item of posts.slice(0, maxPosts)) {
      if (!isMenuPostCandidate(item.text)) continue;
      result.push({
        message: item.text,
        created_time: new Date().toISOString(),
        full_picture: item.image || "",
      });
      if (item.image) imageSet.set(item.image, item.image);
    }

    if (!result.length) {
      const allText = await page.evaluate(() => document.body.innerText || "");
      if (isMenuPostCandidate(allText)) {
        result.push({
          message: allText,
          created_time: new Date().toISOString(),
          full_picture: "",
        });
      }
    }

    return {
      posts: result,
      imageCandidates: Array.from(imageSet.values()),
    };
  } finally {
    await browser.close().catch(() => {});
  }
}

async function fetchFromJinaFallback({ pageUrl, maxPosts, publicProxy }) {
  if (!pageUrl) {
    return { posts: [], imageCandidates: [] };
  }

  const candidates = buildFacebookPageUrlCandidates(pageUrl);
  const allPosts = [];
  const allImageCandidates = new Map();
  const seenPosts = new Set();
  let firstHttpStatus = null;

  for (const candidate of candidates) {
    const proxyUrl = buildProxyUrl(candidate, publicProxy);
    console.log(`Încearc r.jina.ai pe: ${candidate}`);

    let response;
    try {
      response = await fetch(proxyUrl, {
        headers: {
          "User-Agent": UA,
          "Accept-Language": "en-US,en;q=0.9",
          Accept: "text/plain, text/html;q=0.9,*/*;q=0.8",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(DEFAULT_PUBLIC_PROXY_TIMEOUT_MS),
      });
    } catch (_error) {
      if (firstHttpStatus === null) {
        firstHttpStatus = "error";
      }
      continue;
    }

    if (!response || !response.ok) {
      if (firstHttpStatus === null) {
        firstHttpStatus = `HTTP ${response?.status || "n/a"}`;
      }
      continue;
    }

    const body = await response.text();
    const posts = extractJinaPosts(body, allPosts.length);

    if (!posts.length) {
      continue;
    }

    for (const post of posts) {
      const id = post.id || post.permalink_url || "";
      if (!id) {
        allPosts.push(post);
        continue;
      }

      if (seenPosts.has(id)) {
        continue;
      }
      seenPosts.add(id);
      allPosts.push(post);
      for (const imageCandidate of collectImageFromPost(post)) {
        allImageCandidates.set(imageCandidate, imageCandidate);
      }
    }

    if (allPosts.length >= maxPosts) {
      break;
    }
  }

  if (!allPosts.length && firstHttpStatus && firstHttpStatus !== "error") {
    console.warn(`r.jina.ai nu a dat rezultate utile. Ultima stare: ${firstHttpStatus}.`);
  }

  if (!allPosts.length && firstHttpStatus === "error") {
    console.warn("r.jina.ai nu a răspuns pe variantele testate.");
  }

  if (allPosts.length && !allImageCandidates.size) {
    for (const post of allPosts) {
      for (const imageCandidate of collectImageFromPost(post)) {
        allImageCandidates.set(imageCandidate, imageCandidate);
      }
    }
  }

  return {
    posts: allPosts.slice(0, maxPosts),
    imageCandidates: Array.from(allImageCandidates.values()),
  };
}

async function fetchFromPostUrlFallback({ postUrl, maxPosts, publicProxy }) {
  if (!postUrl) {
    return { posts: [], imageCandidates: [] };
  }

  const proxyFallback = await fetchFromJinaFallback({
    pageUrl: postUrl,
    maxPosts,
    publicProxy,
  });

  if (proxyFallback.posts.length) {
    return proxyFallback;
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 2200 } });
    await page.goto(postUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForTimeout(3000);

    const extracted = await page.evaluate(() => {
      const containerNodes = [
        ...document.querySelectorAll("article"),
        ...document.querySelectorAll("[role='article']"),
      ];

      const sanitize = (raw) => {
        const lines = String(raw || "")
          .replace(/\u00a0/g, " ")
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean);

        const stopPatterns = [
          /toate\s+reac/i,
          /all\s+reactions/i,
          /show\s+more/i,
          /ac[țt]iune\s+pentru|ac[țt]iune/i,
        ];

        const clean = [];
        for (const line of lines) {
          const lower = line.toLowerCase();
          if (stopPatterns.some((pattern) => pattern.test(lower))) {
            break;
          }

          if (!line || line.length < 3) {
            continue;
          }

          if (/\{(?:\"require\"|\s*\[|\])|require\[/i.test(line)) {
            continue;
          }

          if (/\b(log in|forgot|email|password|create account|sign up)\b/i.test(lower)) {
            continue;
          }

          clean.push(line);
        }

        return clean.join("\n");
      };

      const candidates = [];
      for (const container of containerNodes) {
        const candidateText = sanitize(container?.innerText || "");
        if (!candidateText) {
          continue;
        }

        const candidateImages = [];
        const images = container.querySelectorAll("img") || [];
        for (const image of images) {
        const src = image.currentSrc || image.src || "";
        if (!src || /(fbcdn\.net|scontent\.fbcdn\.net)/.test(src) === false) {
          continue;
        }

        const width = Number(image.naturalWidth || 0);
        const height = Number(image.naturalHeight || 0);
        if (width <= 120 || height <= 120) {
          continue;
        }
          candidateImages.push(src);
        }

        candidates.push({
          text: candidateText,
          imageCandidates: candidateImages,
        });
      }

      if (!candidates.length) {
        const fallback = sanitize(document.querySelector("[role='main']")?.innerText || document.body?.innerText || "");
        if (fallback) {
          const mainImages = [];
          const fallbackImages = document.querySelectorAll("[role='main'] img") || document.body?.querySelectorAll("img") || [];
          for (const img of fallbackImages) {
            const src = img.currentSrc || img.src || "";
            if (!src || /(fbcdn\.net|scontent\.fbcdn\.net)/.test(src) === false) {
              continue;
            }

            const width = Number(img.naturalWidth || 0);
            const height = Number(img.naturalHeight || 0);
            if (width <= 120 || height <= 120) {
              continue;
            }

            mainImages.push(src);
          }

          candidates.push({ text: fallback, imageCandidates: mainImages });
        }
      }

      return candidates;
    });

    const scored = (extracted || [])
      .map((entry, index) => ({
        ...entry,
        message: stripSocialNoiseLines(entry.text).join("\n"),
        _score: scoreMenuPostText(entry.text),
        _index: index,
      }))
      .filter((entry) => entry.message && entry._score > 0)
      .sort((a, b) => {
        if (b._score !== a._score) {
          return b._score - a._score;
        }

        return a._index - b._index;
      });

    if (!scored.length) {
      const fallbackImageCandidates =
        (extracted || []).flatMap((entry) => entry.imageCandidates || []).filter(Boolean);

      return {
        posts: [],
        imageCandidates: fallbackImageCandidates,
      };
    }

    const posts = scored.slice(0, maxPosts).map((entry) => ({
      message: entry.message,
      created_time: new Date().toISOString(),
      full_picture: entry.imageCandidates[0] || "",
      permalink_url: postUrl,
      id: `post-${Date.now()}-${entry._index}`,
      attachments: {
        data: entry.imageCandidates.map((source) => ({
          media: {
            image: {
              src: source,
            },
          },
        })),
      },
    }));

    const imageCandidates = scored
      .flatMap((entry) => entry.imageCandidates || [])
      .filter(Boolean)
      .slice(0, maxPosts);

    return {
      posts,
      imageCandidates,
    }
  } finally {
    await browser.close().catch(() => {});
  }
}

function pickSyncSources({ tokenAvailable, pageIdAvailable, pageUrl, postUrl }) {
  const sources = [];

  if (postUrl) {
    sources.push("post");
  }

  if (tokenAvailable && pageIdAvailable) {
    sources.push("graph");
  }

  if (pageUrl) {
    sources.push("public-proxy");
  }

  if (pageUrl) {
    sources.push("playwright");
  }

  return sources;
}

function parseTargetDate(value) {
  if (!value) return new Date();
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return new Date();

  const [, y, m, d] = match;
  return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d), 0, 0, 0));
}

async function sync() {
  const options = parseArgs(process.argv.slice(2));
  const social = await fetchConfig(options.configPath);
  const fbUrl = options.pageUrl || social.facebook || "";
  const pageId = options.pageId || extractPageIdFromFacebookUrl(fbUrl);
  const explicitPostUrl = options.postUrl || "";
  const runDate = parseTargetDate(options.date, options.tz);
  const targetDateKey = options.date || formatLocalDateKey(runDate, options.tz);
  const dayKey = getDayKey(runDate, options.tz);

  if (!options.force && !isWithinWindow(new Date(), options.tz, options.startTime, options.endTime)) {
    console.log(
      `Scriptul rulează doar între ${options.startTime} - ${options.endTime} (${options.tz}). Acum e în afara intervalului, se sarează.`
    );
    return;
  }

  if (!fbUrl && !options.pageId && !explicitPostUrl) {
    throw new Error("Nu există sursă Facebook setată. Definește data/site-config.json => social.facebook, Facebook Page ID prin --pageId sau link direct prin --postUrl.");
  }

  let sourcePosts = [];
  let fallbackImages = [];
  const sourcePlan = pickSyncSources({
    tokenAvailable: Boolean(options.token),
    pageIdAvailable: Boolean(pageId),
    pageUrl: fbUrl,
    postUrl: explicitPostUrl,
  });

  if (!options.token || !pageId) {
    console.log(
      "Autentificarea Facebook lipsește sau pagina nu are Page ID. Se folosește flux public (r.jina.ai), apoi fallback Playwright."
    );
  }

  for (const source of sourcePlan) {
      if (sourcePosts.length) {
      break;
    }

    if (source === "post" && !sourcePosts.length) {
      console.log("Încerc sincronizare directă prin linkul postării...");
      const fallback = await fetchFromPostUrlFallback({
        postUrl: explicitPostUrl,
        maxPosts: options.maxPosts,
        publicProxy: options.publicProxy || process.env.FACEBOOK_PUBLIC_PROXY || DEFAULT_PUBLIC_PROXY,
      });
      sourcePosts = fallback.posts;
      fallbackImages = fallback.imageCandidates;
      if (!sourcePosts.length) {
        console.warn("Linkul direct al postării nu a dat rezultate utile.");
      }
    }

    if (source === "graph") {
      console.log(`Încerc sincronizare prin Graph API pentru pagina ${pageId}...`);
      try {
        const graphPosts = await fetchWithGraphApi({
          pageId,
          token: options.token,
          limit: options.maxPosts,
        });
        sourcePosts = graphPosts;
        if (!sourcePosts.length) {
          console.warn("Graph API nu a returnat postări relevante.");
        }
      } catch (error) {
        console.warn(`Graph API a eșuat: ${error?.message || "eroare necunoscută"}.`);
      }
    }

    if (source === "public-proxy" && !sourcePosts.length) {
      console.log("Încerc sincronizare publică prin r.jina.ai...");
      const fallback = await fetchFromJinaFallback({
        pageUrl: fbUrl,
        maxPosts: options.maxPosts,
        publicProxy: options.publicProxy || process.env.FACEBOOK_PUBLIC_PROXY || DEFAULT_PUBLIC_PROXY,
      });
      sourcePosts = fallback.posts;
      fallbackImages = fallback.imageCandidates;
      if (!sourcePosts.length) {
        console.warn("r.jina.ai nu a returnat postări utile.");
      }
    }

    if (source === "playwright" && !sourcePosts.length) {
      console.log("Încerc fallback Playwright...");
      const fallback = await fetchFromPlaywrightFallback({
        pageUrl: fbUrl,
        maxPosts: options.maxPosts,
      });

      sourcePosts = fallback.posts;
      fallbackImages = fallback.imageCandidates;
      if (!sourcePosts.length) {
        console.warn("Playwright nu a găsit postări utile.");
      }
    }
  }

  if (!sourcePosts.length) {
    throw new Error("Nu am găsit nicio postare de meniu ziua pe sursa Facebook.");
  }

  const best = pickBestPost(sourcePosts, targetDateKey, options.tz);
  if (!best) {
    throw new Error("Nu am reușit să selectez o postare relevantă pentru meniul zilei.");
  }

  const menuText = best.post.message || "";
  if (!isMenuPostCandidate(menuText)) {
    throw new Error("Postarea selectată nu conține marker pentru 'meniul zilei'.");
  }

  const items = parseMenuItems(menuText);
  if (!items.length) {
    throw new Error("Nu am extras nicio pozitie din textul meniului zilei.");
  }

  const baseImageCandidates = collectImageFromPost(best.post);
  if (!baseImageCandidates.length && fallbackImages.length) {
    baseImageCandidates.push(...fallbackImages);
  }

  const sourceMeta = {
    provider: "facebook",
    sourceUrl: best.post.permalink_url || fbUrl || "",
    sourcePostId: best.post.id || "unknown",
    date: targetDateKey,
    image: "",
  };

  const targetImageBase = path.join(
    PUBLIC_MENU_IMAGE_DIR,
    buildImagePath(targetDateKey, best.post.full_picture || baseImageCandidates[0] || "default")
  );

  let imagePublicPath = "";
  if (baseImageCandidates.length) {
    const imagePath = await downloadImage(
      baseImageCandidates[0],
      targetImageBase,
      fbUrl || pageId,
      options.dryRun
    );
    if (imagePath) {
      imagePublicPath = `/meniu-zilei/${path.basename(imagePath)}`;
      sourceMeta.image = imagePublicPath;
    }
  }

  const itemsWithImage = items.map((item) => ({
    ...item,
    image: imagePublicPath || item.image || "",
  }));

  const existing = await readJsonSafe(DAILY_MENU_PATH, {});
  if (!hasContentChanged(existing, dayKey, itemsWithImage, sourceMeta)) {
    console.log("Nu au apărut modificări noi pentru meniul zilei.");
    return;
  }

  if (options.dryRun) {
    console.log("DRY-RUN mode. Nu s-au scris fișiere.");
    console.log(JSON.stringify({ dayKey, targetDateKey, items: itemsWithImage }, null, 2));
    return;
  }

  const cleaned = { ...existing };
  cleaned[dayKey] = itemsWithImage;
  cleaned._source = {
    ...(cleaned._source || {}),
    ...sourceMeta,
    updatedAt: new Date().toISOString(),
  };

  await mkdir(PUBLIC_MENU_IMAGE_DIR, { recursive: true });
  await writeFile(DAILY_MENU_PATH, `${JSON.stringify(cleaned, null, 2)}\n`, "utf8");
  console.log(`Meniul zilei a fost actualizat pentru ${dayKey}: ${itemsWithImage.length} feluri.`);
}

sync().catch((error) => {
  console.error(error?.message || String(error));
  process.exit(1);
});
