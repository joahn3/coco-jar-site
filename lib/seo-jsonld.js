const DEFAULT_SITE_URL = "https://coco-jar-site.vercel.app";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
}

export function toAbsoluteUrl(input) {
  const siteUrl = getSiteUrl();

  if (!input || typeof input !== "string") {
    return siteUrl;
  }

  if (/^https?:\/\//i.test(input)) {
    return input;
  }

  const normalizedPath = input.startsWith("/") ? input : `/${input}`;
  return `${siteUrl}${normalizedPath}`;
}

export function sanitizeJsonLdText(value) {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .replace(/&/g, "\\u0026")
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function sanitizeJsonLdPayload(payload) {
  const data = payload;

  if (data == null) {
    return data;
  }

  if (typeof data === "string") {
    return sanitizeJsonLdText(data);
  }

  if (Array.isArray(data)) {
    return data.map((value) => sanitizeJsonLdPayload(value));
  }

  if (typeof data === "object") {
    const normalized = {};
    for (const [key, value] of Object.entries(data)) {
      normalized[key] = sanitizeJsonLdPayload(value);
    }
    return normalized;
  }

  return data;
}

export function serializeJsonLd(data) {
  return JSON.stringify(sanitizeJsonLdPayload(data));
}
