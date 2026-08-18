import { readFile } from "node:fs/promises";
import path from "node:path";
import { menuData as extractedMenuData } from "../docs/meniu-coco-jar-data";

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

  "Gustari",
  "Ciorbe & Salate",
  "Paste",
  "Burgeri & Quesadilla",
  "Preparate din pui",
  "Preparate din porc",
  "Preparate din vită",
  "Preparate la grătar",
  "Fructe de mare",
  "Salate",
  "Platouri",
  "Sosuri",
  "Garnituri",
  "Deserturi",
  "Bauturi",
  "Tării, vinuri și cocktailuri",
  "Cafea",
  "Băuturi nealcoolice",
  "Limonadă & fresh",
  "Sucuri",
  "Ceai rece",
  "Energizant",
  "Long drinks 250 ml",
  "Cocktailuri alcool",
  "Cocktailuri non-alcool",
  "Vin alb",
  "Vin roșu",
  "Vin rosé",
  "Vin la pahar",
  "Tării",
  "Apă",
  "Bere la halbă",
  "Bere fără alcool",
];

const MENU_CATEGORY_LABELS = {
  "GUSTĂRI": "Gustări",
  "CIORBE & SALATE": "Ciorbe & salate",
  "CIORBE": "Ciorbe",
  "SALATE": "Salate",
  "PASTE": "Paste",
  "BURGER / QUESADILLA": "Burger / Quesadilla",
  "PREPARATE DIN PUI": "Preparate din pui",
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
  Gustari: "Gustări",
  "Ciorbe & Salate": "Ciorbe & Salate",
  "Burgeri & Quesadilla": "Burger / Quesadilla",
  "Preparate din pui": "Preparate din pui",
  "Preparate din vită": "Preparate din vită",
  "Preparate din porc": "Preparate din porc",
  "Preparate la grătar": "Preparate de la grătar",
  "Fructe de mare": "Fructe de mare",
  "Bauturi": "Băuturi",
  "Tării, vinuri și cocktailuri": "Tării, vinuri și cocktailuri",
  Cafea: "Cafea",
  "Băuturi nealcoolice": "Băuturi nealcoolice",
  "Limonadă & fresh": "Limonadă & fresh",
  Sucuri: "Sucuri",
  "Ceai rece": "Ceai rece",
  Energizant: "Energizant",
  "Long drinks 250 ml": "Long drinks 250 ml",
  "Cocktailuri alcool": "Cocktailuri cu alcool",
  "Cocktailuri non-alcool": "Cocktailuri fără alcool",
  "Vin alb": "Vin alb",
  "Vin roșu": "Vin roșu",
  "Vin rosé": "Vin rosé",
  "Vin la pahar": "Vin la pahar",
  Tării: "Tării",
  "Apă": "Apă",
  "Bere la halbă": "Bere la halbă",
  "Răcoritoare alcoolice": "Răcoritoare alcoolice",
  "Long drinks": "Long drinks",
  "Bere fără alcool": "Bere fără alcool",
};

const EXTRACTED_MENU_SUBSECTIONS = {
  "Bauturi": {
    "Cafea": "Cafea",
    "Răcoritoare": "Răcoritoare",
    "Băuturi nealcoolice": "Băuturi nealcoolice",
    "Limonadă & fresh": "Limonadă & fresh",
    "Sucuri": "Sucuri",
    "Ceai rece": "Ceai rece",
    "Energizant": "Energizant",
    "Bere": "Bere",
    "Apă": "Apă",
    "Bere la halbă": "Bere la halbă",
    "Bere fără alcool": "Bere fără alcool",
  },
  "Tării, vinuri și cocktailuri": {
    "Tării": "Tării",
    "Long drinks 250 ml": "Long drinks 250 ml",
    "Cocktailuri alcool": "Cocktailuri alcool",
    "Cocktailuri non-alcool": "Cocktailuri non-alcool",
    "Vin alb": "Vin alb",
    "Vin roșu": "Vin roșu",
    "Vin rosé": "Vin rosé",
    "Vin la pahar": "Vin la pahar",
  },
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
  hours: "10:00–22:00",
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

export function getDayKeyByDate(dateInput) {
  const date = parseDateInputToDate(dateInput);
  if (!date) {
    return getCurrentDayKey();
  }

  return MENU_DAY_KEYS[date.getDay()] || "luni";
}

function parseDateInputToDate(dateInput) {
  if (!(typeof dateInput === "string")) {
    return dateInput instanceof Date && !Number.isNaN(dateInput.getTime()) ? dateInput : null;
  }

  const match = dateInput.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    const parsed = new Date(dateInput);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const [, year, month, day] = match.map(Number);
  const parsedDate = new Date(year, month - 1, day);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
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
        ...row,
        name: String(row.name || ""),
        size: row.size ? String(row.size) : "",
        description: row.description ? String(row.description) : "",
        price: row.price ? String(row.price).trim() : "",
      }));
  }

  return normalized;
}

function normalizePrice(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const raw = String(value).trim();
  if (!raw) {
    return "";
  }

  if (/LEI/i.test(raw)) {
    return raw;
  }

  const numeric = Number(raw);
  if (Number.isFinite(numeric)) {
    return `${String(raw)} LEI`;
  }

  return raw;
}

function normalizeExtractedMenuData(extraction = {}) {
  if (!Array.isArray(extraction.sections)) {
    return {};
  }

  const normalized = {};

  for (const section of extraction.sections) {
    const sectionName = String(section?.name || "").trim();
    const rows = Array.isArray(section?.items) ? section.items : [];

    if (!sectionName || !rows.length) {
      continue;
    }

    const mappedRows = rows
      .filter((row) => row?.name)
      .map((row) => ({
        ...row,
        name: String(row.name || ""),
        size: row.size ? String(row.size) : "",
        description: row.description ? String(row.description) : "",
        price: normalizePrice(row.price_lei ?? row.price),
        allergens: row.allergens ? String(row.allergens) : "",
        nutrition: row.nutrition ? String(row.nutrition) : "",
      }));

    const subsectionMap = EXTRACTED_MENU_SUBSECTIONS[sectionName] || {};
    const subsectionEntries = Object.entries(subsectionMap);

    if (subsectionEntries.length === 0) {
      normalized[sectionName] = mappedRows;
      continue;
    }

    const mappedBySubsection = {};
    for (const row of mappedRows) {
      const category = String(row.category || "").trim();
      const subsection = subsectionMap[category] || sectionName;

      if (!Array.isArray(mappedBySubsection[subsection])) {
        mappedBySubsection[subsection] = [];
      }

      mappedBySubsection[subsection].push(row);
    }

    for (const [subsection, subsectionRows] of Object.entries(mappedBySubsection)) {
      if (!Array.isArray(subsectionRows) || !subsectionRows.length) {
        continue;
      }

      normalized[subsection] = subsectionRows;
    }
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
  const extracted = normalizeExtractedMenuData(extractedMenuData);
  if (Object.keys(extracted).length > 0) {
    return extracted;
  }

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
