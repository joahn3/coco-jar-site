import { readFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();

const MENU_DAY_KEYS = {
  0: "duminica",
  1: "luni",
  2: "marti",
  3: "miercuri",
  4: "joi",
  5: "vineri",
  6: "sambata",
};

const MENU_SECTION_ORDER = [
  "GUSTĂRI",
  "CIORBE & SALATE",
  "CIORBE",
  "SALATE",
  "PASTE",
  "BURGER / QUESADILLA",
  "PREPARATE DIN PUI",
  "PREPARATE DIN VITA",
  "PREPARATE DE LA GRĂTAR",
  "PREPARATE DIN PORC",
  "FRUCTE DE MARE",
  "PLATOURI",
  "SOSURI",
  "GARNITURI",
  "DESERTURI",
  "Cafea",
  "Limonade & Apa",
  "Răcoritoare",
  "Bere",
  "Bere fără alcool",
  "Cocktail cu alcool",
  "Cocktail fără alcool",
  "Long drinks",
  "Răcoritoare alcoolice",
];

const MENU_CATEGORY_LABELS = {
  "GUSTĂRI": "Gustări",
  "CIORBE & SALATE": "Ciorbe & salate",
  "CIORBE": "Ciorbe",
  "SALATE": "Salate",
  "PASTE": "Paste",
  "BURGER / QUESADILLA": "Burger / Quesadilla",
  "PREPARATE DIN PUI": "Preparare din pui",
  "PREPARATE DIN VITA": "Preparări din vită",
  "PREPARATE DE LA GRĂTAR": "Preparări de la grătar",
  "PREPARATE DIN PORC": "Preparări din porc",
  "FRUCTE DE MARE": "Fructe de mare",
  "PLATOURI": "Platouri",
  "SOSURI": "Sosuri",
  "GARNITURI": "Garnituri",
  "DESERTURI": "Deserturi",
  "Cafea": "Cafea",
  "Limonade & Apa": "Limonadă & Apă",
  "Răcoritoare": "Răcoritoare",
  "Bere": "Bere",
  "Bere fără alcool": "Bere fără alcool",
  "Cocktail cu alcool": "Cocktail cu alcool",
  "Cocktail fără alcool": "Cocktail fără alcool",
  "Long drinks": "Long drinks",
  "Răcoritoare alcoolice": "Răcoritoare alcoolice",
};

const MENU_DAY_LABELS = {
  duminica: "Duminică",
  luni: "Luni",
  marti: "Marți",
  miercuri: "Miercuri",
  joi: "Joi",
  vineri: "Vineri",
  sambata: "Sâmbătă",
};

const configDefaults = {
  siteName: "Coco Jar",
  tagline: "Restaurant în Popești-Leordeni",
  locality: "Popești-Leordeni",
  fullAddress: "Șoseaua Olteniței 50, Popești-Leordeni, Ilfov, 077160",
  phone: "0742 299 869",
  whatsapp: "0742 299 869",
  email: "",
  hours: "Luni-Duminică: 10:00–16:00 (meniu zilei), 16:00–22:00",
  menuValidUntilHour: "16:00",
  coords: "44.3767,26.1744",
  social: {
    facebook: "https://www.facebook.com/people/Coco-Jar/61592924622016/",
    instagram: "https://www.instagram.com/cocojarbistro?igsh=MTRjMDF6cXh5MnUwaA==",
    googleBusiness: "https://maps.app.goo.gl/NWoXnymc2Ww4Yyhv6?g_st=ic",
    logo: "/galerie/instagram-010-ff3cb9cdf0.jpg",
  },
  formspreeEndpoint: "",
};

export function getCurrentDayKey() {
  const day = new Date().getDay();
  return MENU_DAY_KEYS[day] || "luni";
}

export function getDayLabel(dayKey) {
  return MENU_DAY_LABELS[dayKey] || "Ziua curentă";
}

function normalizeMenu(menuData = {}) {
  const entries = Object.entries(menuData).filter(
    ([key]) => !key.startsWith("_")
  );

  const normalized = {};

  for (const [key, rows] of entries) {
    if (!Array.isArray(rows)) {
      continue;
    }

    normalized[key] = rows
      .filter((row) => row?.name)
      .map((row) => ({
        name: String(row.name || ""),
        size: row.size ? String(row.size) : "",
        description: row.description ? String(row.description) : "",
        price: row.price ? String(row.price).trim() : "",
      }));
  }

  return normalized;
}

async function readJsonFile(fileName, fallback) {
  try {
    const filePath = path.join(rootDir, "data", fileName);
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (_error) {
    return fallback;
  }
}

export async function getSiteConfig() {
  const config = await readJsonFile("site-config.json", {});
  return {
    ...configDefaults,
    ...config,
    social: {
      ...configDefaults.social,
      ...(config.social || {}),
    },
  };
}

export async function getDailyMenu() {
  const dailyMenuRaw = await readJsonFile("meniu-zilei.json", {});

  return {
    ...dailyMenuRaw,
  };
}

export async function getFullMenu() {
  const fullMenuRaw = await readJsonFile("meniu-complet.json", {});
  return normalizeMenu(fullMenuRaw);
}

export function getMenuSectionOrder() {
  return MENU_SECTION_ORDER;
}

export function getMenuCategoryLabel(section) {
  return MENU_CATEGORY_LABELS[section] || section;
}

export function getOrderedMenuSections(fullMenu) {
  const normalized = normalizeMenu(fullMenu);
  const sections = [...MENU_SECTION_ORDER, ...Object.keys(normalized).filter((key) => !MENU_SECTION_ORDER.includes(key))];

  return Array.from(new Set(sections)).filter((key) => Array.isArray(normalized[key]) && normalized[key].length > 0);
}
