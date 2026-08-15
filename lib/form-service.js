export function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  return request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || "unknown";
}

function trimValue(value) {
  return String(value || "").replace(/[\u0000-\u001F]/g, "").trim();
}

function normalizeText(value) {
  return trimValue(value).replace(/\s+/g, " ");
}

function normalizePhone(value) {
  return normalizeText(value).replace(/[^+0-9().\-\s]/g, "");
}

function normalizePositiveInt(value, min = 1, max = 500) {
  const raw = normalizeText(value);
  if (!raw) {
    return "";
  }

  if (!/^\d+$/.test(raw)) {
    return null;
  }

  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed) || parsed < min || parsed > max) {
    return null;
  }

  return parsed;
}

function isLikelySpam(payload) {
  if (payload.website && normalizeText(payload.website).length > 0) {
    return true;
  }

  const note = normalizeText(payload.message || payload.name || "");
  if (/\bhttps?:\/\//i.test(note) && !note.includes("instagram.com/cocojarbistro")) {
    return true;
  }

  if ((payload.name || "").length > 100 || (payload.message || "").length > 3000) {
    return true;
  }

  return false;
}

const submissions = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = submissions.get(ip) || { count: 0, startedAt: now };

  if (now - bucket.startedAt > RATE_LIMIT_WINDOW_MS) {
    submissions.set(ip, { count: 1, startedAt: now });
    return false;
  }

  bucket.count += 1;
  submissions.set(ip, bucket);

  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
}

function ensureEmail(value) {
  const email = normalizeText(value);
  if (!email) {
    return "";
  }

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return valid.test(email) ? email : false;
}

function ensurePhone(value) {
  const phone = normalizePhone(value);
  if (!phone) {
    return "";
  }

  const valid = /^(\+\d{1,4})?[\s\-().]?\d{7,14}$/;
  return valid.test(phone) ? phone : false;
}

export async function parseFormBody(request) {
  try {
    const raw = await request.json();
    return raw;
  } catch (error) {
    return null;
  }
}

export function validateContactPayload(payload) {
  const name = normalizeText(payload?.name);
  const phone = ensurePhone(payload?.phone);
  const message = normalizeText(payload?.message);
  const visitType = normalizeText(payload?.visitType);
  const guestCount = normalizePositiveInt(payload?.guestCount, 1, 250);
  const preferredTime = normalizeText(payload?.preferredTime);
  const consent = payload?.consent === "on" || payload?.consent === true;
  const website = normalizeText(payload?.website);

  const result = {
    ok: true,
    errors: [],
    values: {
      name,
      phone,
      message,
      visitType,
      guestCount,
      preferredTime,
      consent: Boolean(consent),
      website,
      type: "contact",
    },
  };

  if (!name || name.length < 2) {
    result.ok = false;
    result.errors.push("Nume invalid.");
  }

  if (!phone) {
    result.ok = false;
    result.errors.push("Numărul de telefon nu este valid.");
  }

  if (payload?.guestCount && guestCount === null) {
    result.ok = false;
    result.errors.push("Numărul de persoane nu este valid.");
  }

  if (isLikelySpam(result.values)) {
    result.ok = false;
    result.errors.push("Cerere blocată anti-spam.");
  }

  return result;
}

export function validateEventPayload(payload) {
  const name = normalizeText(payload?.name);
  const phone = ensurePhone(payload?.phone);
  const email = ensureEmail(payload?.email);
  const eventType = normalizeText(payload?.eventType);
  const eventDate = normalizeText(payload?.eventDate);
  const guestCount = normalizePositiveInt(payload?.guestCount, 2, 400);
  const preferredMenu = normalizeText(payload?.preferredMenu);
  const budget = normalizeText(payload?.budget);
  const timeSlot = normalizeText(payload?.timeSlot);
  const message = normalizeText(payload?.message);
  const consent = payload?.consent === "on" || payload?.consent === true;
  const website = normalizeText(payload?.website);

  const result = {
    ok: true,
    errors: [],
    values: {
      name,
      phone,
      email,
      eventType,
      eventDate,
      guestCount,
      preferredMenu,
      budget,
      timeSlot,
      message,
      consent: Boolean(consent),
      website,
      type: "eveniment",
    },
  };

  if (!name || name.length < 2) {
    result.ok = false;
    result.errors.push("Nume invalid.");
  }

  if (!phone) {
    result.ok = false;
    result.errors.push("Numărul de telefon nu este valid.");
  }

  if (email === false) {
    result.ok = false;
    result.errors.push("Email invalid.");
  }

  if (!eventType) {
    result.ok = false;
    result.errors.push("Tipul de eveniment este obligatoriu.");
  }

  if (!eventDate) {
    result.ok = false;
    result.errors.push("Data evenimentului este obligatorie.");
  }

  if (payload?.guestCount && guestCount === null) {
    result.ok = false;
    result.errors.push("Numărul de participanți nu este valid.");
  }

  if (isLikelySpam(result.values)) {
    result.ok = false;
    result.errors.push("Cerere blocată anti-spam.");
  }

  return result;
}

function buildMetadata(request, payload) {
  return {
    type: payload.type,
    at: new Date().toISOString(),
    ip: getClientIp(request),
    userAgent: request.headers.get("user-agent") || "unknown",
    referer: request.headers.get("referer") || "",
    source: "site-web",
  };
}

export async function forwardToWebhook(payload, webhookUrl) {
  if (!webhookUrl) {
    return {
      sent: false,
      status: 0,
      message: "Webhook nereconfigurat",
    };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return {
    sent: response.ok,
    status: response.status,
    message: response.ok ? "Trimis" : `Webhook a răspuns cu ${response.status}`,
  };
}

export function canProcessRequest(request) {
  const ip = getClientIp(request);
  const limited = isRateLimited(ip);

  return {
    limited,
  };
}

export function buildContactPayload(request, parsedPayload) {
  return {
    ...parsedPayload,
    ...buildMetadata(request, parsedPayload),
  };
}
