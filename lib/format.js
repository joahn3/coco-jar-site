export function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "");
}

export function phoneHref(value) {
  const digits = normalizePhone(value);
  return digits ? `tel:${digits}` : "#";
}

export function whatsappHref(value, fallback = "", customText = "") {
  const digits = normalizePhone(value || fallback);
  if (!digits) {
    return "#";
  }

  const text = encodeURIComponent(
    customText || "Bună ziua! Vreau informații despre meniuri / rezervare."
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export function mapHref(siteName, fullAddress) {
  const query = encodeURIComponent(`${siteName || "Coco Jar"} ${fullAddress || ""}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function parseHourToMinutes(hourString) {
  if (!hourString) {
    return null;
  }
  const match = String(hourString).match(/^(\d{1,2}):(\d{2})$/);
  if (!match) {
    return null;
  }
  return Number(match[1]) * 60 + Number(match[2]);
}

export function isBeforeHours(minutesLimit) {
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  return current <= minutesLimit;
}

export function isMenuDayActive(menuValidUntilHour) {
  const limit = parseHourToMinutes(menuValidUntilHour);
  if (limit === null) {
    return true;
  }

  return isBeforeHours(limit);
}
