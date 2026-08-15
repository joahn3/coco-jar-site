import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DEFAULT_CONFIG_PATH = path.join(ROOT_DIR, "data", "site-config.json");
const DEFAULT_OUTPUT_DIR = path.join(ROOT_DIR, "docs", "social-media");
const SCRIPT_VERSION = "1.0.0";
const DEFAULT_MAX_IMAGES = 120;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_4_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15";

function parseArgs(argv) {
  const out = {};
  const isVerbose = argv.includes("--verbose");
  for (const token of argv) {
    if (!token.startsWith("--")) continue;
    const [rawKey, ...rest] = token.slice(2).split("=");
    const key = rawKey.trim();
    const value = rest.length ? rest.join("=").trim() : "true";
    out[key] = value === "false" ? false : value;
  }

  return {
    output: out.output ? path.resolve(out.output) : DEFAULT_OUTPUT_DIR,
    outputDir: out.output ? path.resolve(out.output) : DEFAULT_OUTPUT_DIR,
    configPath: out.config ? path.resolve(out.config) : DEFAULT_CONFIG_PATH,
    maxPerPlatform: Number(out["max"] || DEFAULT_MAX_IMAGES),
    platforms: String(out.platform || "instagram,facebook,maps")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
    copyToGallery: out.gallery === "true" || out.copyToGallery === "true",
    verbose: isVerbose,
    dryRun: out["dry-run"] === "true",
    timeoutMs: Number(out.timeout || 55_000),
  };
}

function normalizeCandidates(values) {
  const seen = new Set();
  const out = [];
  for (const value of values) {
    if (!value) continue;
    const normalized = sanitizeUrl(value);
    if (!normalized) continue;
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
}

function sanitizeUrl(raw) {
  try {
    const url = new URL(raw);
    if (!/^https?:$/.test(url.protocol)) return null;
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    const ignoredExtensions = [".svg", ".css", ".js", ".woff", ".woff2", ".ttf", ".otf", ".ico"];
    const ext = path.extname(url.pathname).toLowerCase();
    if (ignoredExtensions.includes(ext)) return null;
    const lowered = url.toString();
    if (lowered.includes("data:")) return null;
    return lowered;
  } catch {
    return null;
  }
}

function isUsefulImageUrl(urlString) {
  const lowered = urlString.toLowerCase();
  const blockedHostPatterns = [
    "gstatic.com",
    "google.com/favicon",
    "googleapis.com",
    "maps.gstatic.com",
    "maps.googleapis.com",
    "schemas.google",
    "doubleclick.net",
    "googlesyndication.com",
  ];

  if (blockedHostPatterns.some((token) => lowered.includes(token))) {
    return false;
  }

  const blockedSegments = [
    "sprite",
    "icon",
    "logo",
    "avatar",
    "blank",
    "emoji",
    "pixel",
    "loading",
    "static.cdninstagram.com/rsrc.php",
    "profile_pic",
  ];
  if (blockedSegments.some((token) => lowered.includes(token))) {
    return false;
  }

  const imageExt = /\.(png|jpe?g|webp|avif|gif)(?:$|[?#])/i;
  if (!imageExt.test(lowered)) return false;
  if (/[?&]s=\d+x\d+/.test(lowered) && lowered.includes("width=1")) return false;
  return true;
}

function deriveExtension(urlString, contentType) {
  const extByMime = {
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/avif": ".avif",
    "image/gif": ".gif",
  };
  const direct = path.extname(new URL(urlString).pathname).toLowerCase();
  if (/\.(png|jpe?g|webp|avif|gif)$/i.test(direct)) {
    return direct.startsWith(".jpe") ? ".jpg" : direct;
  }
  if (contentType && extByMime[contentType.split(";")[0].trim()]) {
    return extByMime[contentType.split(";")[0].trim()];
  }
  return ".jpg";
}

async function loadConfig(configPath) {
  const raw = await readFile(configPath, "utf8");
  return JSON.parse(raw);
}

async function readCandidatesFromPage(page, platform) {
  const networkUrls = new Set();
  page.on("response", (response) => {
    if (!["image", "media"].includes(response.request().resourceType())) return;
    try {
      const url = response.url();
      if (isUsefulImageUrl(url)) {
        networkUrls.add(url);
      }
    } catch {
      // ignore
    }
  });

  const content = await page.content();
  const regex = /https?:\/\/[^\s"'<>\\(\\)]+?\.(?:jpg|jpeg|png|webp|avif|gif)(?:\?[^"\s'<>\\(\\)]*)?/gi;
  const contentUrls = [...content.matchAll(regex)].map((match) => match[0]);

  const domUrls = await page.evaluate(() => {
    const urls = new Set();
    const elements = Array.from(document.querySelectorAll("img[src], source[srcset]"));
    for (const el of elements) {
      const src = el.getAttribute("src");
      if (src) urls.add(src);

      const srcset = el.getAttribute("srcset");
      if (!srcset) continue;
      const parts = srcset.split(",");
      for (const part of parts) {
        const piece = part.trim().split(" ")[0];
        if (piece && piece.startsWith("http")) {
          urls.add(piece);
        }
      }
    }

    const metaImages = Array.from(document.querySelectorAll("meta[property^='og:image'], meta[name='twitter:image'], [style*='background-image']"))
      .map((node) => {
        if (node.tagName === "META") return node.getAttribute("content");
        const style = node.getAttribute("style") || "";
        const match = style.match(/url\\(["']?([^"')]+)["']?\\)/i);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    for (const item of metaImages) urls.add(item);
    return Array.from(urls);
  });

  if (platform === "instagram" || platform === "facebook") {
    await autoScroll(page);
  }
  if (platform === "maps") {
    await autoScroll(page, { step: 700, delayMs: 500, maxSteps: 6 });
  }

  const combined = [...networkUrls, ...contentUrls, ...domUrls]
    .filter((item) => isUsefulImageUrl(item))
    .map((item) => {
      if (item.startsWith("//")) return `https:${item}`;
      if (item.startsWith("/")) return null;
      return item;
    })
    .filter(Boolean);

  return normalizeCandidates(combined);
}

async function autoScroll(page, options = { step: 900, delayMs: 400, maxSteps: 20 }) {
  for (let i = 0; i < options.maxSteps; i++) {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight - 120));
    await page.waitForTimeout(options.delayMs);
  }
}

function parseCookieBanners(page) {
  return page.evaluate(() => {
    const labels = ["Acceptă", "Accept all", "Accept", "Permit all", "Permite", "Consimțăm"];
    const buttons = Array.from(document.querySelectorAll("button, [role='button'], a"));
    for (const button of buttons) {
      const txt = (button.textContent || "").trim().toLowerCase();
      if (!txt) continue;
      if (labels.some((label) => txt.includes(label.toLowerCase()))) {
        button.click();
        return true;
      }
    }
    return false;
  });
}

async function collectFromSource(browser, platform, sourceUrl, opts) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 3000 } });
  page.setDefaultTimeout(opts.timeoutMs);
  page.setDefaultNavigationTimeout(opts.timeoutMs);

  const candidates = new Set();
  const manifestEntries = [];
  let mapsScreenshot = null;
  const origin = (() => {
    try {
      return new URL(sourceUrl).origin;
    } catch {
      return "https://www.example.com";
    }
  })();

  try {
    await page.setExtraHTTPHeaders({
      "Accept-Language": "ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7",
    });
    await page.goto(sourceUrl, {
      waitUntil: platform === "maps" ? "networkidle" : "domcontentloaded",
      timeout: opts.timeoutMs,
    });

    try {
      await parseCookieBanners(page);
      await page.waitForTimeout(1200);
      await parseCookieBanners(page);
      await page.waitForTimeout(600);
    } catch {
      // ignore
    }

    const found = await readCandidatesFromPage(page, platform);
    found.forEach((item) => candidates.add(item));

    if (platform === "maps") {
      await autoScroll(page, { step: 700, delayMs: 500, maxSteps: 10 });
      if (found.length === 0 && !opts.dryRun) {
        mapsScreenshot = path.join(opts.outputDir, platform, "maps-page-shot.png");
        await ensureDirectory(mapsScreenshot);
        await page.screenshot({ path: mapsScreenshot, fullPage: true });
      }
    }
  } catch (error) {
    console.warn(`Nu am putut încărca platforma ${platform}: ${sourceUrl}`, error?.message || error);
  } finally {
    await page.close().catch(() => {});
  }

  const urlList = Array.from(candidates).slice(0, opts.maxPerPlatform);
  for (let index = 0; index < urlList.length; index++) {
    const imageUrl = urlList[index];
    const safeName = safeImageName(platform, index + 1, imageUrl);
    const outPath = path.join(opts.outputDir, platform, safeName);
    const downloaded = await downloadImage(imageUrl, outPath, origin, opts.dryRun);
    if (downloaded) {
      manifestEntries.push({
        sourceUrl: imageUrl,
        savedAs: path.relative(ROOT_DIR, outPath),
        platform,
      });
    }
  }

  if (platform === "maps" && mapsScreenshot) {
    manifestEntries.push({
      sourceUrl: sourceUrl,
      savedAs: path.relative(ROOT_DIR, mapsScreenshot),
      platform,
    });
  }

  return {
    platform,
    source: sourceUrl,
    totalFound: urlList.length,
    downloaded: manifestEntries.length,
    items: manifestEntries,
  };
}

function safeImageName(platform, index, imageUrl) {
  const hash = createHash("sha1").update(imageUrl).digest("hex").slice(0, 10);
  const ext = deriveExtension(imageUrl, "image/jpeg");
  return `${platform}-${String(index).padStart(3, "0")}-${hash}${ext}`;
}

async function ensureDirectory(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function downloadImage(urlString, outputPath, referer, dryRun = false) {
  if (dryRun) return true;

  try {
    await ensureDirectory(outputPath);
    const response = await fetch(urlString, {
      headers: {
        "User-Agent": UA,
        Accept:
          "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: referer,
      },
    });

    if (!response || !response.ok) {
      return false;
    }

    const contentType = (response.headers.get("content-type") || "").toLowerCase();
    if (!contentType.includes("image")) {
      return false;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.byteLength < 5000) {
      return false;
    }

    await writeFile(outputPath, buffer);
    return true;
  } catch (error) {
    console.warn(`Nu s-a putut descărca ${urlString}:`, error?.message || error);
    return false;
  }
}

function toCsvRows(manifest) {
  const lines = ["platform,file,url"];
  for (const item of manifest) {
    for (const entry of item.items) {
      lines.push(`${item.platform},${entry.savedAs},${entry.sourceUrl}`);
    }
  }
  return lines.join("\n");
}

function toPlatformGroups(manifest, outputDir) {
  const readme = [
    `# Assete social media - extracție (v${SCRIPT_VERSION})`,
    "",
    `Generat: ${new Date().toISOString()}`,
    "",
    `Director output: ${path.relative(ROOT_DIR, outputDir)}`,
    "",
    "## Rezumat",
  ];
  for (const item of manifest) {
    readme.push(`- ${item.platform}: ${item.downloaded}/${item.totalFound} imagini salvate`);
  }
  readme.push("", "## Surse", `- Instagram: ${manifest.find((i) => i.platform === "instagram")?.source || "-"}`, `- Facebook: ${manifest.find((i) => i.platform === "facebook")?.source || "-"}`, `- Google Maps: ${manifest.find((i) => i.platform === "google")?.source || "-"}`);
  readme.push("", "## Notă", "Extragerea social media este best-effort: uneori paginile blochează cookie-uri/anti-bot sau dau conținut limitat fără autentificare.");
  return `${readme.join("\n")}\n`;
}

function createGallerySyncManifest(items, limit = 8) {
  return items
    .flatMap((bucket) => bucket.items.map((item) => item.savedAs))
    .filter(Boolean)
    .slice(0, limit)
    .map((file) => path.join("/", file.replaceAll("\\", "/")));
}

async function copyGalleryImages(manifest, rootDir, count = 8) {
  const { copyFile, rm } = await import("node:fs/promises");
  const galleryDir = path.join(rootDir, "public", "galerie");
  await rm(galleryDir, { recursive: true, force: true });
  await mkdir(galleryDir, { recursive: true });

  const sourceFiles = createGallerySyncManifest(manifest, count).map((relativePath) =>
    path.join(rootDir, relativePath)
  );
  const copied = [];
  for (const source of sourceFiles) {
    try {
      const safeName = path.basename(source);
      const destination = path.join(galleryDir, safeName);
      await copyFile(source, destination);
      copied.push(destination);
    } catch {
      // skip unavailable file
    }
  }
  return copied;
}

function printSummary(manifest, options) {
  const totalFound = manifest.reduce((acc, item) => acc + item.totalFound, 0);
  const totalDownloaded = manifest.reduce((acc, item) => acc + item.downloaded, 0);
  console.log(`Extracție finalizată: ${totalDownloaded}/${totalFound} imagini descărcate.`);
  console.log(`Folder output: ${path.relative(ROOT_DIR, options.outputDir)}`);
  console.log("Platforme:");
  for (const item of manifest) {
    console.log(`- ${item.platform}: ${item.downloaded}/${item.totalFound} (src=${item.source})`);
  }
}

async function run() {
  const options = parseArgs(process.argv.slice(2));
  const sourceConfig = await loadConfig(options.configPath);
  const social = sourceConfig.social || {};
  const requested = new Set(options.platforms);

  const sources = {
    instagram: social.instagram,
    facebook: social.facebook,
    maps: social.googleBusiness,
    google: social.googleBusiness,
  };

  const requestedPlatforms = new Set();
  for (const platform of requested) {
    if (platform === "google" || platform === "maps") {
      requestedPlatforms.add("maps");
      continue;
    }
    requestedPlatforms.add(platform);
  }
  const chosenSources = Object.entries(sources).filter(([platform]) =>
    requestedPlatforms.has(platform)
  );

  if (chosenSources.length === 0) {
    throw new Error("Nu ai selectat platforme valide. Folosește --platform=instagram,facebook,maps");
  }

  if (options.dryRun) {
    console.log("Mod dry-run activ: nu se descarcă fișiere.");
  }
  if (options.verbose) {
    console.log("[DEBUG] Opțiuni:", JSON.stringify(options, null, 2));
  }
  await mkdir(options.outputDir, { recursive: true });

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (error) {
    throw new Error(`Playwright nu este gata: ${error?.message || error}`);
  }

  const manifest = [];
  try {
    for (const [platform, sourceUrl] of chosenSources) {
      if (!sourceUrl) {
        console.warn(`Platforma ${platform} nu are URL valid în config.`);
        continue;
      }
      const normalizedPlatform = platform === "google" ? "google" : platform;
      const item = await collectFromSource(browser, normalizedPlatform, sourceUrl, {
        outputDir: options.outputDir,
        timeoutMs: options.timeoutMs,
        maxPerPlatform: options.maxPerPlatform,
        dryRun: options.dryRun,
      });
      manifest.push(item);
    }
  } finally {
    await browser.close().catch(() => {});
  }

  const manifestPath = path.join(options.outputDir, "media-manifest.json");
  const summaryPath = path.join(options.outputDir, "media-manifest.csv");
  const readmePath = path.join(options.outputDir, "README.md");

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  await writeFile(summaryPath, toCsvRows(manifest), "utf8");
  await writeFile(readmePath, toPlatformGroups(manifest, options.outputDir), "utf8");

  if (options.copyToGallery && !options.dryRun && manifest.length > 0) {
    const copied = await copyGalleryImages(manifest, ROOT_DIR, 12);
    console.log("Galerie public/galerie actualizată cu:", copied.length, "fișiere");
  }
  printSummary(manifest, options);
}

run().catch((error) => {
  console.error("Eroare la extragere:");
  console.error(error?.stack || error);
  process.exit(1);
});
