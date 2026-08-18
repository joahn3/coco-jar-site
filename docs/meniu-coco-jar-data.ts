export interface MenuExtractionItem {
  name: string;
  size: string;
  price_lei: number | null;
  description?: string;
  allergens?: string;
  nutrition?: string;
  price_per_100g?: boolean;
  category?: string;
}

export interface MenuExtractionSection {
  name: string;
  items: MenuExtractionItem[];
}

export interface MenuExtractionDocument {
  source: string;
  source_path: string;
  extracted: string;
  currency: string;
  sections: MenuExtractionSection[];
}

export const menuData: MenuExtractionDocument = {
  "source": "Meniu_Coco_Jar_aerisit.pptx 2.pdf",
  "source_path": "/Users/ionutfrancisc/Library/Mobile Documents/com~apple~CloudDocs/_macbook-2026_/coco-jar-bistro/Meniu_Coco_Jar_aerisit.pptx 2.pdf",
  "extracted": "2026-08-18",
  "currency": "RON",
  "sections": [
    {
      "name": "Gustari",
      "items": [
        {
          "name": "Platou bruschete",
          "size": "200 g",
          "price_lei": 25,
          "description": "Baghetă, roșii, usturoi, busuioc, oregano, ulei, sare, piper.",
          "allergens": "Gluten",
          "nutrition": "1945 kJ / 465 kcal | G 25 | AGS 6 | C 34 | Z 5 | P 22 | S 2,2"
        },
        {
          "name": "Platou mix aperitiv",
          "size": "550 g",
          "price_lei": 72,
          "description": "Salată de vinete, icre, zacuscă, pâine prăjită, ceapă.",
          "allergens": "Gluten, pește, țelină",
          "nutrition": "2429 kJ / 580 kcal | G 26 | AGS 6 | C 36 | Z 5 | P 19 | S 2,2"
        },
        {
          "name": "Mix gustare bere",
          "size": "150 g",
          "price_lei": 15,
          "description": "Cârnăciori de bere, stick mozzarella, măsline pane, inele de ceapă, jalapeños.",
          "allergens": "Gluten, lapte, ouă, muștar",
          "nutrition": "1381 kJ / 330 kcal | G 22 | AGS 8 | C 15 | Z 3 | P 18 | S 2,1"
        },
        {
          "name": "Meniu cârnațori bere",
          "size": "350 g",
          "price_lei": 32,
          "description": "Cârnăciori de bere, cartofi prăjiți, sos muștar.",
          "allergens": "Muștar",
          "nutrition": "1254 kJ / 300 kcal | G 16 | AGS 5 | C 24 | Z 2 | P 15 | S 2,0"
        },
        {
          "name": "Barabule",
          "size": "350 g",
          "price_lei": 36,
          "description": "Cartofi prăjiți, bacon, ou, telemea, ceapă verde.",
          "allergens": "Lapte, ouă",
          "nutrition": "2595 kJ / 620 kcal | G 42 | AGS 15 | C 34 | Z 2 | P 24 | S 2,8"
        },
        {
          "name": "Bread garlic gratinat",
          "size": "200 g",
          "price_lei": 18,
          "description": "Baghetă, unt cu usturoi, mozzarella, cheddar.",
          "allergens": "Gluten, lapte",
          "nutrition": "2011 kJ / 480 kcal | G 28 | AGS 16 | C 40 | Z 3 | P 18 | S 2,1"
        },
        {
          "name": "Salată de vinete",
          "size": "200 g",
          "price_lei": 25,
          "description": "Vinete, ceapă, ulei, sare, piper, pâine prăjită.",
          "allergens": "Gluten",
          "nutrition": "753 kJ / 180 kcal | G 13 | AGS 2 | C 13 | Z 4 | P 3 | S 1,5"
        },
        {
          "name": "Salată de icre",
          "size": "200 g",
          "price_lei": 29,
          "description": "Icre, ceapă, ulei, sare, lămâie, pâine prăjită.",
          "allergens": "Pește, gluten",
          "nutrition": "1005 kJ / 240 kcal | G 20 | AGS 3 | C 10 | Z 2 | P 8 | S 1,8"
        },
        {
          "name": "Salată zacuscă",
          "size": "200 g",
          "price_lei": 25,
          "description": "Zacuscă (vinete, ardei capia, ceapă, ulei, sare, piper), pâine prăjită.",
          "allergens": "Gluten",
          "nutrition": "941 kJ / 225 kcal | G 15 | AGS 2 | C 18 | Z 6 | P 2 | S 1,6"
        },
        {
          "name": "MBS (mămăligă, brânză, smântână, ou)",
          "size": "350 g",
          "price_lei": 29,
          "description": "Mămăligă, brânză telemea, smântână, ou, unt, sare.",
          "allergens": "Lapte, ouă",
          "nutrition": "1366 kJ / 326 kcal | G 24 | AGS 11 | C 6 | Z 3 | P 18 | S 2,2"
        }
      ]
    },
    {
      "name": "Ciorbe & Salate",
      "items": [
        {
          "name": "Ciorbă de burtă",
          "size": "300 ml + 80 g carne",
          "price_lei": 24,
          "description": "Burtă de vită, ou, usturoi, țelină, morcov, smântână, oțet, ceapă, gogoșari, ulei.",
          "allergens": "Ouă, lapte, țelină",
          "nutrition": "495 kcal | G 35 | AGS 16 | C 15 | Z 7 | P 27 | S 3,8"
        },
        {
          "name": "Ciorbă de coadă de vită",
          "size": "300 ml + 100 g carne",
          "price_lei": 24,
          "description": "Vită, morcov, ceapă, ardei capia, țelină, păstârnac, cartof, pulpă de roșii, borș, sare, ulei.",
          "allergens": "Țelină",
          "nutrition": "420 kcal | G 18 | AGS 6 | C 20 | Z 8 | P 31 | S 3,2"
        },
        {
          "name": "Supă de găină cu tăiței de casă",
          "size": "300 ml + 80 g carne",
          "price_lei": 22,
          "description": "Carne de pui, țelină, morcov, ceapă, ardei, pătrunjel, ou, făină, păstârnac.",
          "allergens": "Ouă, țelină, gluten",
          "nutrition": "335 kcal | G 14 | AGS 4 | C 22 | Z 7 | P 24 | S 2,6"
        },
        {
          "name": "Salată Caesar",
          "size": "300 g",
          "price_lei": 39,
          "description": "Salată iceberg, piept de pui crocant, sos Caesar, crutoane, parmezan.",
          "allergens": "Gluten, ouă, lapte, muștar, pește",
          "nutrition": "720 kcal | G 45 | AGS 12 | C 31 | Z 11 | P 44 | S 3,2"
        },
        {
          "name": "Salată grecească",
          "size": "300 g",
          "price_lei": 37,
          "description": "Roșii, castraveți, ceapă roșie, ardei capia, măsline, brânză feta, oregano, ulei de măsline.",
          "allergens": "Lapte",
          "nutrition": "690 kcal | G 45 | AGS 14 | C 16 | Z 10 | P 19 | S 2,8"
        },
        {
          "name": "Salată Coco Jar",
          "size": "300 g",
          "price_lei": 45,
          "description": "Salată iceberg, salată mix, creveți, castraveți, roșii cherry, ananas, ceapă roșie, sos Calypso, fusilli tricolore.",
          "allergens": "Crustacee, gluten, lapte, ouă, muștar",
          "nutrition": "560 kcal | G 26 | AGS 8 | C 46 | Z 11 | P 34 | S 2,4"
        },
        {
          "name": "Salată verde cu lămâie",
          "size": "120 g",
          "price_lei": 18,
          "description": "Salată verde, lămâie.",
          "allergens": "Nu conține alergeni din cele 14 categorii UE",
          "nutrition": "35 kcal | G 0,3 | AGS 0,1 | C 7 | Z 1 | P 2 | S 0,1"
        }
      ]
    },
    {
      "name": "Paste",
      "items": [
        {
          "name": "Spaghete carbonara",
          "size": "350 g",
          "price_lei": 41,
          "description": "Spaghete, bacon, ou, smântână lichidă, parmezan, sare, piper.",
          "allergens": "Gluten, ouă, lapte",
          "nutrition": "351 kcal | G 12,7 | AGS 4,7 | C 23,7 | Z 1,1 | P - | S 0,92"
        },
        {
          "name": "Spaghete bolognese",
          "size": "350 g",
          "price_lei": 39,
          "description": "Spaghete, ragu de vită, sos de roșii, parmezan, sare, piper.",
          "allergens": "Gluten, lapte, țelină",
          "nutrition": "243 kcal | G 8,3 | AGS 3,2 | C 18,6 | Z 2,1 | P 10,1 | S 0,78"
        },
        {
          "name": "Spaghete AOP",
          "size": "350 g",
          "price_lei": 32,
          "description": "Spaghete, roșii cherry, usturoi, ardei iute, pătrunjel, ulei de măsline, sare, piper.",
          "allergens": "Gluten",
          "nutrition": "408 kcal | G 15 | AGS 2,2 | C 55 | Z 6 | P - | S 1,3"
        },
        {
          "name": "Spaghete AOP cu creveți",
          "size": "350 g",
          "price_lei": 47,
          "description": "Spaghete, creveți, roșii cherry, usturoi, ardei iute, pătrunjel, sare, piper.",
          "allergens": "Gluten, crustacee",
          "nutrition": "445 kcal | G 16 | AGS 2,5 | C 51 | Z 5 | P 24 | S 1,5"
        },
        {
          "name": "Tagliatelle cu creveți",
          "size": "350 g",
          "price_lei": 53,
          "description": "Tagliatelle, creveți, zucchini, roșii cherry, vin, usturoi, sare, piper, pătrunjel.",
          "allergens": "Gluten, crustacee, lapte",
          "nutrition": "560 kcal | G 21 | AGS 8 | C 51 | Z 29 | P - | S 1,7"
        },
        {
          "name": "Penne siciliene al forno",
          "size": "350 g",
          "price_lei": 48,
          "description": "Penne, piept de pui, ciuperci, sos de roșii, smântână lichidă, mozzarella, parmezan, sare, piper.",
          "allergens": "Gluten, lapte",
          "nutrition": "590 kcal | G 27 | AGS 12 | C 58 | Z 8 | P 28 | S 2,3"
        },
        {
          "name": "Penne quattro formaggi",
          "size": "350 g",
          "price_lei": 42,
          "description": "Penne, smântână lichidă, gorgonzola, mozzarella, parmezan, cheddar, sare, piper.",
          "allergens": "Gluten, lapte",
          "nutrition": "650 kcal | G 38 | AGS 21 | C 53 | Z 5 | P 30 | S 2,8"
        }
      ]
    },
    {
      "name": "Burgeri & Quesadilla",
      "items": [
        {
          "name": "Burger Coco Jar",
          "size": "350 g",
          "price_lei": 49,
          "description": "Chiflă, carne de vită, bacon, ou, salată, roșii, castraveți murați, inele de ceapă, cartofi prăjiți, sos Coco Jar, cheddar, salată coleslaw.",
          "allergens": "Gluten, ouă, lapte, muștar",
          "nutrition": "1180 kcal | G 68 | AGS 21 | C 76 | Z 8 | P 58 | S 4,8"
        },
        {
          "name": "Burger pui",
          "size": "350 g",
          "price_lei": 45,
          "description": "Chiflă, șnițel de pui, cheddar, salată, castraveți murați, cartofi prăjiți, sos Coco Jar, salată coleslaw.",
          "allergens": "Gluten, ouă, lapte, muștar",
          "nutrition": "1260 kcal | G 59 | AGS 18 | C 79 | Z 7 | P 54 | S 4,5"
        },
        {
          "name": "Burger pulled pork",
          "size": "350 g",
          "price_lei": 47,
          "description": "Chiflă, pulled pork, ceapă rumenită, salată, roșii, castraveți murați, cartofi prăjiți, sos Coco Jar, salată coleslaw.",
          "allergens": "Gluten, muștar, ouă",
          "nutrition": "1240 kcal | G 61 | AGS 18 | C 83 | Z 11 | P 49 | S 4,7"
        },
        {
          "name": "Quesadilla",
          "size": "400 g",
          "price_lei": 44,
          "description": "Lipie, mozzarella, cheddar, ceapă, ardei capia, bacon, pui, cartofi prăjiți, sos Coco Jar, sos jalapeños.",
          "allergens": "Gluten, lapte, ouă, muștar",
          "nutrition": "— kcal | G 52 | AGS 18 | C 68 | Z 6 | P 47 | S 4,1"
        }
      ]
    },
    {
      "name": "Preparate din pui",
      "items": [
        {
          "name": "Specialitatea casei - cocoșel Coco Jar",
          "size": "100 g",
          "price_lei": 6,
          "price_per_100g": true,
          "description": "Cocoșel, condimente, usturoi, unt, verdeață, ulei.",
          "allergens": "Lapte",
          "nutrition": "210 kcal | G 10 | AGS 2,5 | C 3 | Z 1 | P 27 | S 1,2"
        },
        {
          "name": "Pui în sos gorgonzola",
          "size": "400 g",
          "price_lei": 42,
          "description": "Piept de pui, sos alb, gorgonzola, mozzarella, cheddar, cartofi la cuptor cu rozmarin.",
          "allergens": "Lapte",
          "nutrition": "310 kcal | G 18 | AGS 9 | C 24 | Z 2 | P 28 | S 1,6"
        },
        {
          "name": "Thai chicken",
          "size": "450 g",
          "price_lei": 47,
          "description": "Piept de pui, ardei, morcov, ceapă, sos de soia, ulei de susan, orez, susan, sos sweet chilli, urechi de lemn.",
          "allergens": "Soia, susan",
          "nutrition": "185 kcal | G 7 | AGS 1,2 | C 12 | Z 3 | P 20 | S 1,4"
        },
        {
          "name": "Șnițel de pui în crustă de semințe",
          "size": "250 g",
          "price_lei": 32,
          "description": "Piept de pui, panko, mix de semințe, ou, făină, smântână.",
          "allergens": "Gluten, ouă, susan, lapte",
          "nutrition": "290 kcal | G 16 | AGS 3 | C 15 | Z 1 | P 22 | S 1,3"
        },
        {
          "name": "Tigaie picantă de pui",
          "size": "350 g",
          "price_lei": 41,
          "description": "Piept de pui, ceapă roșie, ardei capia, ciuperci, roșii, ardei iute, sos de roșii, usturoi.",
          "allergens": "Nu conține alergeni declarați",
          "nutrition": "170 kcal | G 6 | AGS 1,2 | C 8 | Z 4 | P 22 | S 1,3"
        },
        {
          "name": "Pui crispy în crustă de semințe",
          "size": "250 g",
          "price_lei": 32,
          "description": "Piept de pui, panko, mix de semințe, ou, făină, smântână.",
          "allergens": "Gluten, ouă, susan, lapte",
          "nutrition": "300 kcal | G 17 | AGS 3 | C 17 | Z 1 | P 22 | S 1,4"
        },
        {
          "name": "Pollo alla parmigiana",
          "size": "400 g",
          "price_lei": 40,
          "description": "Șnițel de pui, sos de roșii, mozzarella, parmezan, pătrunjel, cartofi prăjiți.",
          "allergens": "Gluten, ouă, lapte",
          "nutrition": "225 kcal | G 14 | AGS 6 | C 10 | Z 2 | P 24 | S 1,2"
        },
        {
          "name": "Aripioare crispy",
          "size": "250 g",
          "price_lei": 30,
          "description": "Aripioare de pui, pesmet, ou, făină.",
          "allergens": "Gluten, ouă",
          "nutrition": "320 kcal | G 20 | AGS 5 | C 14 | Z 0,5 | P 21 | S 1,2"
        },
        {
          "name": "Pui cu smântână și ciuperci",
          "size": "450 g",
          "price_lei": 40,
          "description": "Piept de pui, ciuperci, smântână pentru gătit, usturoi, vin alb, sare, piper, cartofi la cuptor cu rozmarin.",
          "allergens": "Lapte, sulfiți",
          "nutrition": "160 kcal | G 9 | AGS 4,5 | C 10 | Z 1,5 | P 11 | S 0,8"
        }
      ]
    },
    {
      "name": "Preparate din porc",
      "items": [
        {
          "name": "Tomahawk de porc",
          "size": "500 g",
          "price_lei": 55,
          "description": "Tomahawk de porc, sos de cimbru, sare, piper. Garnitură: cartofi la cuptor cu rozmarin.",
          "allergens": "Lapte",
          "nutrition": "980 kJ / 234 kcal | G 15 | AGS 5 | C 6 | Z 2 | P 20 | S 1,3"
        },
        {
          "name": "Tigaie picantă de porc",
          "size": "350 g",
          "price_lei": 41,
          "description": "Ceafă de porc, ardei capia, ceapă roșie, ciuperci, ardei iute, roșii, sos roșu, usturoi, vin, sare, piper.",
          "allergens": "Sulfiți (vin)",
          "nutrition": "720 kJ / 172 kcal | G 15 | AGS 5 | C 6 | Z 2 | P 20 | S 1,3"
        },
        {
          "name": "Tochitură moldovenească",
          "size": "450 g",
          "price_lei": 41,
          "description": "Ceafă de porc, cârnat, ou, brânză, sos de roșii, mămăligă, usturoi, sare, piper.",
          "allergens": "Ouă, lapte",
          "nutrition": "990 kJ / 236 kcal | G 15 | AGS 5 | C 6 | Z 2 | P 20 | S 1,3"
        },
        {
          "name": "Pomana porcului",
          "size": "400 g",
          "price_lei": 41,
          "description": "Ceafă de porc, vin, usturoi, sare, piper, pătrunjel, mămăligă.",
          "allergens": "Sulfiți (vin)",
          "nutrition": "930 kJ / 222 kcal | G 15 | AGS 5 | C 6 | Z 2 | P 20 | S 1,3"
        },
        {
          "name": "Ciolan Coco Jar",
          "size": "700 g",
          "price_lei": 59,
          "description": "Ciolan de porc, sos alb, usturoi, sare, piper. Garnitură: cartofi la cuptor cu rozmarin.",
          "allergens": "Lapte",
          "nutrition": "1040 kJ / 248 kcal | G 16 | AGS 5 | C 6 | Z 2 | P 20 | S 1,3"
        },
        {
          "name": "Coaste de porc",
          "size": "650 g",
          "price_lei": 69,
          "description": "Coaste de porc, sos barbecue, sare, piper, mix de condimente, bere. Garnitură: cartofi prăjiți și salată coleslaw.",
          "allergens": "Muștar, sulfiți (bere)",
          "nutrition": "1210 kJ / 289 kcal | G 15 | AGS 5 | C 6 | Z 2 | P 20 | S 1,3"
        }
      ]
    },
    {
      "name": "Preparate din vită",
      "items": [
        {
          "name": "T-bone steak dry age",
          "size": "350 g",
          "price_lei": 95,
          "description": "T-bone de vită, sare, unt, rozmarin, usturoi.",
          "allergens": "Lapte",
          "nutrition": "260 kcal | G 16 | AGS 6 | C 1 | Z 1 | P 25 | S 1,4"
        },
        {
          "name": "Mușchi de vită cu sos de piper verde",
          "size": "250 g",
          "price_lei": 95,
          "description": "Mușchi de vită, sos alb, piper verde.",
          "allergens": "Lapte",
          "nutrition": "245 kcal | G 15 | AGS 6 | C 3 | Z 1 | P 25 | S 1,4"
        },
        {
          "name": "Antricot de vită Black Angus Uruguay",
          "size": "300 g",
          "price_lei": 128,
          "description": "Antricot de vită, sare, unt, rozmarin, usturoi.",
          "allergens": "Lapte",
          "nutrition": "260 kcal | G 18 | AGS 8 | C 2 | Z 1 | P 24 | S 1,3"
        },
        {
          "name": "Thai beef",
          "size": "450 g",
          "price_lei": 59,
          "description": "Vită, ardei, morcov, ceapă, sos de soia, ulei de susan, orez, susan, sos sweet chilli, ghimbir, urechi de lemn.",
          "allergens": "Soia, susan",
          "nutrition": "195 kcal | G 8 | AGS 2 | C 12 | Z 3 | P 21 | S 1,4"
        }
      ]
    },
    {
      "name": "Preparate la grătar",
      "items": [
        {
          "name": "Mici",
          "size": "70 g",
          "price_lei": 6,
          "description": "Carne de vită, carne de porc, bicarbonat de sodiu, usturoi, sare, piper, cimbru, boia, coriandru.",
          "allergens": "Fără alergeni declarați",
          "nutrition": "1180 kJ / 282 kcal | G 23 | AGS 8,5 | C 3 | Z 1 | P 17 | S 1,9"
        },
        {
          "name": "Ceafă de porc",
          "size": "250 g",
          "price_lei": 34,
          "description": "Ceafă de porc, ulei, sare, piper, cimbru.",
          "allergens": "Fără alergeni",
          "nutrition": "1240 kJ / 296 kcal | G 24 | AGS 8 | C 0 | Z 0 | P 22 | S 1,2"
        },
        {
          "name": "Piept de pui",
          "size": "250 g",
          "price_lei": 28,
          "description": "Piept de pui, ulei, sare, piper, cimbru.",
          "allergens": "Fără alergeni",
          "nutrition": "690 kJ / 165 kcal | G 3,6 | AGS 1 | C 0 | Z 0 | P 31 | S 1,1"
        },
        {
          "name": "Pulpă de pui dezosată",
          "size": "250 g",
          "price_lei": 28,
          "description": "Pulpă de pui dezosată, ulei, sare, piper, cimbru.",
          "allergens": "Fără alergeni",
          "nutrition": "870 kJ / 208 kcal | G 12 | AGS 3,2 | C 0 | Z 0 | P 26 | S 1,1"
        },
        {
          "name": "Frigarui de pui",
          "size": "250 g",
          "price_lei": 31,
          "description": "Piept de pui, ardei, ceapă, ciuperci, ulei, sare, piper.",
          "allergens": "Fără alergeni",
          "nutrition": "510 kJ / 122 kcal | G 6 | AGS 1,5 | C 3 | Z 2 | P 28 | S 1,1"
        },
        {
          "name": "Frigarui de porc",
          "size": "250 g",
          "price_lei": 31,
          "description": "Ceafă de porc, bacon, ardei, ceapă, ulei, sare, piper.",
          "allergens": "Fără alergeni",
          "nutrition": "920 kJ / 220 kcal | G 10 | AGS 3 | C 3 | Z 2 | P 28 | S 1,2"
        },
        {
          "name": "Pastramă de oaie",
          "size": "250 g",
          "price_lei": 46,
          "description": "Pastramă de oaie, ulei, usturoi, sare, piper, cimbru, mămăligă.",
          "allergens": "Fără alergeni",
          "nutrition": "1080 kJ / 258 kcal | G 17 | AGS 6 | C 12 | Z 1 | P 25 | S 1,4"
        },
        {
          "name": "Cotlet de berbecuț",
          "size": "250 g",
          "price_lei": 59,
          "description": "Cotlet de berbecuț, ulei, usturoi, sare, piper, cimbru. Garnitură: cartofi la cuptor cu rozmarin.",
          "allergens": "Fără alergeni",
          "nutrition": "1010 kJ / 241 kcal | G 15 | AGS 6 | C 12 | Z 1 | P 26 | S 1,2"
        }
      ]
    },
    {
      "name": "Fructe de mare",
      "items": [
        {
          "name": "Creveți în sos de vin",
          "size": "300 g",
          "price_lei": 47,
          "description": "Creveți, vin alb, unt, roșii, usturoi, pătrunjel, sare, piper, pâine prăjită.",
          "allergens": "Crustacee, lapte, sulfiți, gluten",
          "nutrition": "150 kcal | G 8 | AGS 2 | C 4 | Z 1 | P 18 | S 1,2"
        },
        {
          "name": "Creveți în sos de unt",
          "size": "300 g",
          "price_lei": 49,
          "description": "Creveți, vin alb, unt, roșii, usturoi, pătrunjel, sare, piper, pâine prăjită.",
          "allergens": "Crustacee, lapte, sulfiți, gluten",
          "nutrition": "150 kcal | G 8 | AGS 2 | C 4 | Z 1 | P 18 | S 1,2"
        },
        {
          "name": "Creveți diavola",
          "size": "300 g",
          "price_lei": 47,
          "description": "Creveți, sos roșu, ardei iute, usturoi, pătrunjel, sare, piper, pâine prăjită.",
          "allergens": "Crustacee, gluten",
          "nutrition": "150 kcal | G 8 | AGS 2 | C 4 | Z 1 | P 18 | S 1,2"
        },
        {
          "name": "Midii în sos de vin",
          "size": "400 g",
          "price_lei": 51,
          "description": "Midii, vin alb, unt, usturoi, roșii, pătrunjel, sare, piper.",
          "allergens": "Moluște, lapte, sulfiți",
          "nutrition": "130 kcal | G 5 | AGS 1,5 | C 6 | Z 1 | P 16 | S 1,1"
        },
        {
          "name": "Midii în sos de roșu picant",
          "size": "400 g",
          "price_lei": 51,
          "description": "Midii, sos roșu, usturoi, ardei iute, sare, piper.",
          "allergens": "Moluște",
          "nutrition": "130 kcal | G 4 | AGS 1 | C 6 | Z 1 | P 16 | S 1,1"
        },
        {
          "name": "Panko seafood",
          "size": "250 g",
          "price_lei": 57,
          "description": "Creveți crispy, inele de calamar crispy, lămâie, sos aioli, sos Sweet Chilli.",
          "allergens": "Crustacee, moluște, gluten, ouă, lapte, soia",
          "nutrition": "210 kcal | G 12 | AGS 2 | C 14 | Z 2 | P 17 | S 1,3"
        }
      ]
    },
    {
      "name": "Salate",
      "items": [
        {
          "name": "Salată de roșii",
          "size": "150 g",
          "price_lei": 13,
          "description": "Roșii, ulei, sare.",
          "allergens": "Nu conține alergeni declarați",
          "nutrition": "70 kcal | G 4,5 | AGS 0,7 | C 6 | Z 4 | P 1,5 | S 1"
        },
        {
          "name": "Salată mixtă",
          "size": "150 g",
          "price_lei": 15,
          "description": "Roșii, castraveți, ardei capia, ceapă roșie, ulei, sare.",
          "allergens": "Nu conține alergeni declarați",
          "nutrition": "70 kcal | G 4,5 | AGS 0,7 | C 6 | Z 4 | P 1,5 | S 1"
        },
        {
          "name": "Salată murături mix",
          "size": "150 g",
          "price_lei": 14,
          "description": "Gogoșari, castraveți murați, gogonele, sare.",
          "allergens": "Poate conține urme de muștar",
          "nutrition": "70 kcal | G 4,5 | AGS 0,7 | C 6 | Z 4 | P 1,5 | S 1"
        },
        {
          "name": "Salată de varză",
          "size": "150 g",
          "price_lei": 11,
          "description": "Varză albă, morcov, ulei, oțet, sare, mărar.",
          "allergens": "Sulfiți (oțet)",
          "nutrition": "70 kcal | G 4,5 | AGS 0,7 | C 6 | Z 4 | P 1,5 | S 1"
        },
        {
          "name": "Salată de sfeclă cu hrean",
          "size": "150 g",
          "price_lei": 14,
          "description": "Sfeclă, hrean.",
          "allergens": "Sulfiți, dacă sfecla este conservată cu oțet",
          "nutrition": "70 kcal | G 4,5 | AGS 0,7 | C 6 | Z 4 | P 1,5 | S 1"
        },
        {
          "name": "Salată de ardei copți",
          "size": "150 g",
          "price_lei": 14,
          "description": "Ardei copți, oțet, usturoi, ulei, sare.",
          "allergens": "Sulfiți",
          "nutrition": "70 kcal | G 4,5 | AGS 0,7 | C 6 | Z 4 | P 1,5 | S 1"
        },
        {
          "name": "Salată coleslaw",
          "size": "150 g",
          "price_lei": 15,
          "description": "Varză albă, morcov, ceapă roșie, pătrunjel, maioneză, sare, piper.",
          "allergens": "Ouă, muștar",
          "nutrition": "70 kcal | G 4,5 | AGS 0,7 | C 6 | Z 4 | P 1,5 | S 1"
        }
      ]
    },
    {
      "name": "Platouri",
      "items": [
        {
          "name": "Platou mix grill - 1 persoană",
          "size": "550 g",
          "price_lei": 55,
          "description": "Ceafă de porc, pulpă de pui, mici, muștar, cartofi, murături, crustă de parmezan.",
          "allergens": "Muștar, lapte",
          "nutrition": "-"
        },
        {
          "name": "Platou românesc - 2/3 persoane",
          "size": "1,4 kg",
          "price_lei": 145,
          "description": "Ceafă, pulpă de pui, mici, cârnați, cartofi cu usturoi și parmezan, muștar, murături.",
          "allergens": "Muștar, lapte",
          "nutrition": "-"
        },
        {
          "name": "Platou family - 3/4 persoane",
          "size": "1,6 kg",
          "price_lei": 165,
          "description": "Ceafă, pulpă dezosată, pui crispy, aripioare crispy, mici, frigărui de pui și porc, cartofi cu usturoi și parmezan, muștar, murături.",
          "allergens": "Gluten, ouă, lapte, muștar",
          "nutrition": "-"
        },
        {
          "name": "Platou Gurmandului - 4/5 persoane",
          "size": "2,8 kg",
          "price_lei": 255,
          "description": "Ceafă, pastramă de berbecuț, pulpă de pui, cârnați, mici, frigărui de pui și porc, cartofi cu usturoi și parmezan, muștar, murături.",
          "allergens": "Muștar, lapte",
          "nutrition": "-"
        },
        {
          "name": "Platou Coco Jar (aproximativ 25 persoane)",
          "size": "9,5 kg",
          "price_lei": 1200,
          "description": "Ceafă, cocoșel, coaste, pastramă, mici, cârnăciori, frigărui de pui și porc, cartofi cu telemea și ierburi aromatice, murături, sos muștar. Pentru partea casei se procesează separat.",
          "allergens": "Lapte, muștar",
          "nutrition": "-"
        }
      ]
    },
    {
      "name": "Sosuri",
      "items": [
        {
          "name": "Mujdei țigănesc",
          "size": "50 g",
          "price_lei": 5,
          "description": "Usturoi, roșii, ardei copt, ardei iute copt, ulei, sare, pătrunjel.",
          "allergens": "Fără alergeni",
          "nutrition": "145 kcal | G 12 | AGS 1,7 | C 8 | Z 4,5 | P 1,8 | S 1,1"
        },
        {
          "name": "Calipso",
          "size": "50 g",
          "price_lei": 5,
          "description": "Maioneză, ketchup, coniac, sare, piper.",
          "allergens": "Ouă, muștar",
          "nutrition": "430 kcal | G 40 | AGS 4 | C 15 | Z 12 | P 2 | S 1,8"
        },
        {
          "name": "Sos jalapeños",
          "size": "50 g",
          "price_lei": 5,
          "description": "Jalapeños, maioneză, smântână.",
          "allergens": "Lapte, ouă, muștar",
          "nutrition": "360 kcal | G 34 | AGS 5 | C 8 | Z 3 | P 2 | S 1,5"
        },
        {
          "name": "Sos Coco Jar",
          "size": "50 g",
          "price_lei": 5,
          "description": "Maioneză, ketchup, sare, piper.",
          "allergens": "Ouă, muștar",
          "nutrition": "410 kcal | G 38 | AGS 4 | C 12 | Z 9 | P 2 | S 1,7"
        },
        {
          "name": "Sos aioli",
          "size": "50 g",
          "price_lei": 5,
          "description": "Maioneză, usturoi, lămâie.",
          "allergens": "Ouă, muștar",
          "nutrition": "520 kcal | G 55 | AGS 6 | C 2 | Z 1 | P 1,5 | S 1,2"
        },
        {
          "name": "Sos ketchup",
          "size": "50 g",
          "price_lei": 5,
          "description": "Roșii, zahăr, oțet, sare.",
          "allergens": "Fără alergeni",
          "nutrition": "112 kcal | G 0,2 | AGS 0 | C 26 | Z 22 | P 1,3 | S 1,8"
        },
        {
          "name": "Sos muștar",
          "size": "50 g",
          "price_lei": 5,
          "description": "Muștar, oțet, apă.",
          "allergens": "Muștar",
          "nutrition": "145 kcal | G 8 | AGS 0,6 | C 9 | Z 5 | P 6 | S 4,8"
        },
        {
          "name": "Sweet chilli",
          "size": "50 g",
          "price_lei": 5,
          "description": "Chilli, zahăr, oțet, amidon.",
          "allergens": "Fără alergeni",
          "nutrition": "240 kcal | G 0 | AGS 0 | C 58 | Z 52 | P 0,5 | S 2"
        },
        {
          "name": "Smântână",
          "size": "50 g",
          "price_lei": 5,
          "description": "Smântână.",
          "allergens": "Lapte"
        },
        {
          "name": "Telemea",
          "size": "50 g",
          "price_lei": 8,
          "description": "Brânză telemea.",
          "allergens": "Lapte"
        },
        {
          "name": "Parmezan",
          "size": "50 g",
          "price_lei": 8,
          "description": "Brânză parmezan.",
          "allergens": "Lapte"
        },
        {
          "name": "Ardei iute",
          "size": "1 buc",
          "price_lei": 2,
          "description": "Ardei iute.",
          "allergens": "Fără alergeni"
        }
      ]
    },
    {
      "name": "Garnituri",
      "items": [
        {
          "name": "Cartofi prăjiți",
          "size": "200 g",
          "price_lei": 14,
          "description": "Cartofi, sare.",
          "allergens": "Fără alergeni",
          "nutrition": "227 kcal | G 11 | AGS 1,5 | C 30 | Z 0,5 | P 3 | S 0,9"
        },
        {
          "name": "Cartofi prăjiți cu mozzarella",
          "size": "200 g",
          "price_lei": 18,
          "description": "Cartofi, mozzarella, sare.",
          "allergens": "Lapte",
          "nutrition": "268 kcal | G 15 | AGS 6 | C 29 | Z 1 | P 8 | S 1,2"
        },
        {
          "name": "Piure",
          "size": "200 g",
          "price_lei": 16,
          "description": "Cartofi, unt, lapte, sare.",
          "allergens": "Lapte",
          "nutrition": "112 kcal | G 4 | AGS 2,5 | C 18 | Z 2 | P 3 | S 0,8"
        },
        {
          "name": "Orez cu legume",
          "size": "200 g",
          "price_lei": 19,
          "description": "Orez basmati, ardei capia, ceapă, morcov, dovlecel, ciuperci, mazăre, pătrunjel.",
          "allergens": "Fără alergeni",
          "nutrition": "124 kcal | G 2 | AGS 0,3 | C 24 | Z 3 | P 3 | S 0,6"
        },
        {
          "name": "Piure",
          "size": "200 g",
          "price_lei": 16,
          "description": "Cartofi, unt, lapte, sare.",
          "allergens": "Lapte",
          "nutrition": "112 kcal | G 4 | AGS 2,5 | C 18 | Z 2 | P 3 | S 0,8"
        },
        {
          "name": "Orez basmati",
          "size": "200 g",
          "price_lei": 15,
          "description": "Orez basmati, unt, sare.",
          "allergens": "Lapte",
          "nutrition": "148 kcal | G 2 | AGS 1,2 | C 30 | Z 0 | P 3 | S 0,7"
        },
        {
          "name": "Mălai",
          "size": "200 g",
          "price_lei": 10,
          "description": "Mălai, ulei, sare.",
          "allergens": "Fără alergeni",
          "nutrition": "86 kcal | G 1 | AGS 0,2 | C 18 | Z 0 | P 2 | S 0,7"
        },
        {
          "name": "Cartofi la cuptor cu rozmarin",
          "size": "200 g",
          "price_lei": 18,
          "description": "Cartofi, rozmarin, ulei de măsline, sare, piper, boia dulce, usturoi, vin.",
          "allergens": "Sulfiți (vin)",
          "nutrition": "165 kcal | G 7 | AGS 2,5 | C 28 | Z 1 | P 3 | S 0,8"
        },
        {
          "name": "Legume grill",
          "size": "200 g",
          "price_lei": 19,
          "description": "Ardei capia, ceapă roșie, dovlecel, vânătă, ciuperci, roșii, sare, piper, oțet balsamic, pătrunjel.",
          "allergens": "Sulfiți (oțet balsamic)",
          "nutrition": "72 kcal | G 2 | AGS 0,3 | C 10 | Z 5 | P 2 | S 0,5"
        },
        {
          "name": "Sparanghel",
          "size": "200 g",
          "price_lei": 24,
          "description": "Sparanghel, usturoi, oțet balsamic, sare, piper.",
          "allergens": "Sulfiți (oțet balsamic)",
          "nutrition": "—"
        },
        {
          "name": "Cartofi prăjiți cu usturoi și parmezan",
          "size": "200 g",
          "price_lei": 20,
          "description": "Cartofi, usturoi, parmezan, pătrunjel, sare.",
          "allergens": "Lapte",
          "nutrition": "258 kcal | G 14 | AGS 4,5 | C 31 | Z 1 | P 5 | S 1,1"
        },
        {
          "name": "Cartofi prăjiți cu telemea și ierburi aromatice",
          "size": "200 g",
          "price_lei": 18,
          "description": "Cartofi, telemea, sare, ierburi aromatice.",
          "allergens": "Lapte",
          "nutrition": "273 kcal | G 16 | AGS 7 | C 28 | Z 1 | P 8 | S 1,3"
        }
      ]
    },
    {
      "name": "Deserturi",
      "items": [
        {
          "name": "Tiramisu",
          "size": "160 g",
          "price_lei": 25,
          "description": "Pișcoturi, ou, frișcă vegetală, mascarpone, zahăr, arome, cacao, lichior de migdale.",
          "allergens": "Gluten, ouă, lapte",
          "nutrition": "320 kcal | G 15 | AGS 8 | C 38 | Z 24 | P 7 | S 0,4"
        },
        {
          "name": "Clătite cu ciocolată",
          "size": "150 g",
          "price_lei": 22,
          "description": "Ou, făină, lapte, zahăr, arome, ciocolată.",
          "allergens": "Gluten, ouă, lapte",
          "nutrition": "320 kcal | G 15 | AGS 8 | C 38 | Z 24 | P 7 | S 0,4"
        },
        {
          "name": "Clătite cu miere și nuci",
          "size": "150 g",
          "price_lei": 27,
          "description": "Ou, făină, lapte, miere, nuci, zahăr.",
          "allergens": "Gluten, ouă, lapte, nuci",
          "nutrition": "320 kcal | G 15 | AGS 8 | C 38 | Z 24 | P 7 | S 0,4"
        },
        {
          "name": "Clătite cu dulceață",
          "size": "150 g",
          "price_lei": 21,
          "description": "Ou, făină, lapte, dulceață, zahăr, arome.",
          "allergens": "Gluten, ouă, lapte",
          "nutrition": "320 kcal | G 15 | AGS 8 | C 38 | Z 24 | P 7 | S 0,4"
        },
        {
          "name": "Papanași cu ciocolată",
          "size": "250 g",
          "price_lei": 30,
          "description": "Făină, ou, brânză dulce de vaci, zahăr, bicarbonat, arome, ciocolată.",
          "allergens": "Gluten, ouă, lapte",
          "nutrition": "320 kcal | G 15 | AGS 8 | C 38 | Z 24 | P 7 | S 0,4"
        },
        {
          "name": "Papanași cu dulceață",
          "size": "250 g",
          "price_lei": 30,
          "description": "Făină, ou, brânză dulce de vaci, zahăr, bicarbonat, dulceață, smântână.",
          "allergens": "Gluten, ouă, lapte",
          "nutrition": "320 kcal | G 15 | AGS 8 | C 38 | Z 24 | P 7 | S 0,4"
        },
        {
          "name": "Papanași cu nuci și miere",
          "size": "250 g",
          "price_lei": 33,
          "description": "Făină, ou, brânză dulce de vaci, zahăr, bicarbonat, smântână, miere, nuci.",
          "allergens": "Gluten, ouă, lapte, nuci",
          "nutrition": "320 kcal | G 15 | AGS 8 | C 38 | Z 24 | P 7 | S 0,4"
        },
        {
          "name": "Lava cake",
          "size": "150 g",
          "price_lei": 28,
          "description": "Ciocolată, unt, ou, făină, zahăr, înghețată de vanilie.",
          "allergens": "Gluten, ouă, lapte",
          "nutrition": "320 kcal | G 15 | AGS 8 | C 38 | Z 24 | P 7 | S 0,4"
        },
        {
          "name": "Profiterol",
          "size": "200 g",
          "price_lei": 32,
          "description": "Înghețată, aluat choux, frișcă, sos de ciocolată.",
          "allergens": "Gluten, ouă, lapte",
          "nutrition": "320 kcal | G 15 | AGS 8 | C 38 | Z 24 | P 7 | S 0,4"
        }
      ]
    },
    {
      "name": "Bauturi",
      "items": [
        {
          "name": "Espresso",
          "size": "30 ml",
          "price_lei": 10,
          "category": "Cafea"
        },
        {
          "name": "Espresso dublu",
          "size": "60 ml",
          "price_lei": 15,
          "category": "Cafea"
        },
        {
          "name": "Espresso lung",
          "size": "60 ml",
          "price_lei": 10,
          "category": "Cafea"
        },
        {
          "name": "Espresso cu lapte",
          "size": "120 ml",
          "price_lei": 12,
          "category": "Cafea"
        },
        {
          "name": "Cappuccino",
          "size": "180 ml",
          "price_lei": 14,
          "category": "Cafea"
        },
        {
          "name": "Caffe latte",
          "size": "250 ml",
          "price_lei": 17,
          "category": "Cafea"
        },
        {
          "name": "Irish coffee",
          "size": "200 ml",
          "price_lei": 20,
          "category": "Cafea"
        },
        {
          "name": "Irish lady",
          "size": "200 ml",
          "price_lei": 20,
          "category": "Răcoritoare"
        },
        {
          "name": "Cappuccino vienez",
          "size": "200 ml",
          "price_lei": 15,
          "category": "Cafea"
        },
        {
          "name": "Freddo coffee",
          "size": "250 ml",
          "price_lei": 18,
          "category": "Cafea"
        },
        {
          "name": "Cafea fără cofeină",
          "size": "30 ml",
          "price_lei": 12,
          "category": "Cafea"
        },
        {
          "name": "Cafea fără cofeină cu lapte",
          "size": "120 ml",
          "price_lei": 15,
          "category": "Cafea"
        },
        {
          "name": "Frappe",
          "size": "300 ml",
          "price_lei": 24,
          "category": "Cafea"
        },
        {
          "name": "Ciocolată caldă",
          "size": "250 ml",
          "price_lei": 18,
          "category": "Cafea"
        },
        {
          "name": "Ceai - diverse arome",
          "size": "250 ml",
          "price_lei": 15,
          "category": "Băuturi nealcoolice"
        },
        {
          "name": "Limonadă clasică",
          "size": "500 ml",
          "price_lei": 21,
          "category": "Limonadă & fresh"
        },
        {
          "name": "Limonadă mentă și ghimbir",
          "size": "500 ml",
          "price_lei": 22,
          "category": "Limonadă & fresh"
        },
        {
          "name": "Limonadă fructul pasiunii",
          "size": "500 ml",
          "price_lei": 25,
          "category": "Limonadă & fresh"
        },
        {
          "name": "Limonadă căpșuni",
          "size": "500 ml",
          "price_lei": 25,
          "category": "Limonadă & fresh"
        },
        {
          "name": "Fresh de portocale",
          "size": "300 ml",
          "price_lei": 21,
          "category": "Limonadă & fresh"
        },
        {
          "name": "Cappy Portocale",
          "size": "0,25 L",
          "price_lei": 13,
          "category": "Sucuri"
        },
        {
          "name": "Cappy Piersică",
          "size": "0,25 L",
          "price_lei": 13,
          "category": "Sucuri"
        },
        {
          "name": "Fuze Tea Piersică",
          "size": "0,25 L",
          "price_lei": 13,
          "category": "Ceai rece"
        },
        {
          "name": "Fuze Tea Lămâie",
          "size": "0,25 L",
          "price_lei": 13,
          "category": "Ceai rece"
        },
        {
          "name": "Fuze Tea Lemongrass",
          "size": "0,25 L",
          "price_lei": 13,
          "category": "Ceai rece"
        },
        {
          "name": "Coca-Cola",
          "size": "0,25 L",
          "price_lei": 12,
          "category": "Răcoritoare"
        },
        {
          "name": "Coca-Cola Zero",
          "size": "0,25 L",
          "price_lei": 12,
          "category": "Răcoritoare"
        },
        {
          "name": "Fanta",
          "size": "0,25 L",
          "price_lei": 12,
          "category": "Răcoritoare"
        },
        {
          "name": "Sprite",
          "size": "0,25 L",
          "price_lei": 12,
          "category": "Răcoritoare"
        },
        {
          "name": "Kinley / Schweppes",
          "size": "0,25 L",
          "price_lei": 12,
          "category": "Răcoritoare"
        },
        {
          "name": "Schweppes Bitter Lemon",
          "size": "0,25 L",
          "price_lei": 12,
          "category": "Răcoritoare"
        },
        {
          "name": "Schweppes Mandarin",
          "size": "0,25 L",
          "price_lei": 12,
          "category": "Răcoritoare"
        },
        {
          "name": "Figa",
          "size": "0,25 L",
          "price_lei": 20,
          "category": "Energizant"
        },
        {
          "name": "Burn",
          "size": "0,25 L",
          "price_lei": 16,
          "category": "Energizant"
        },
        {
          "name": "Cooler",
          "size": "0,330 L",
          "price_lei": 12,
          "category": "Răcoritoare",
          "description": "lemongrass, mure, grapefruit"
        },
        {
          "name": "Ursus Premium",
          "size": "0,500 L",
          "price_lei": 11,
          "category": "Bere"
        },
        {
          "name": "Ursus Black",
          "size": "0,330 L",
          "price_lei": 14,
          "category": "Bere"
        },
        {
          "name": "Ursus IPA",
          "size": "0,330 L",
          "price_lei": 14,
          "category": "Bere"
        },
        {
          "name": "Ursus Retro / Remix",
          "size": "0,330 L",
          "price_lei": 14,
          "category": "Bere"
        },
        {
          "name": "Kozel Lager",
          "size": "0,500 L",
          "price_lei": 14,
          "category": "Bere"
        },
        {
          "name": "Peroni Nastro Azzurro",
          "size": "0,500 L",
          "price_lei": 14,
          "category": "Bere"
        },
        {
          "name": "Peroni Stile Capri",
          "size": "0,330 L",
          "price_lei": 16,
          "category": "Bere"
        },
        {
          "name": "Azuga nefiltrată",
          "size": "0,500 L",
          "price_lei": 22,
          "category": "Bere"
        },
        {
          "name": "Azuga nepasteurizată",
          "size": "0,500 L",
          "price_lei": 22,
          "category": "Bere"
        },
        {
          "name": "Apă plată Perla",
          "size": "0,33 L",
          "price_lei": 11,
          "category": "Apă"
        },
        {
          "name": "Apă minerală Perla",
          "size": "0,33 L",
          "price_lei": 11,
          "category": "Apă"
        },
        {
          "name": "Apă plată Perla",
          "size": "0,75 L",
          "price_lei": 17,
          "category": "Apă"
        },
        {
          "name": "Apă minerală Perla",
          "size": "0,75 L",
          "price_lei": 17,
          "category": "Apă"
        },
        {
          "name": "Ursus Premium Draught",
          "size": "0,400 L",
          "price_lei": 11,
          "category": "Bere la halbă"
        },
        {
          "name": "Ursus Premium 0.0",
          "size": "0,500 L",
          "price_lei": 11,
          "category": "Bere fără alcool"
        },
        {
          "name": "Peroni Nastro Azzurro 0.0",
          "size": "0,330 L",
          "price_lei": 14,
          "category": "Bere fără alcool"
        }
      ]
    },
    {
      "name": "Tării, vinuri și cocktailuri",
      "items": [
        {
          "name": "Jack Daniel’s",
          "size": "40 ml",
          "price_lei": 22,
          "category": "Tării"
        },
        {
          "name": "Chivas Regal",
          "size": "40 ml",
          "price_lei": 28,
          "category": "Tării"
        },
        {
          "name": "Johnnie Walker Red Label",
          "size": "40 ml",
          "price_lei": 20,
          "category": "Tării"
        },
        {
          "name": "Johnnie Walker Black Label",
          "size": "40 ml",
          "price_lei": 25,
          "category": "Tării"
        },
        {
          "name": "Jameson",
          "size": "40 ml",
          "price_lei": 20,
          "category": "Tării"
        },
        {
          "name": "Captain Morgan Gold / White",
          "size": "40 ml",
          "price_lei": 18,
          "category": "Tării"
        },
        {
          "name": "Bumbu",
          "size": "40 ml",
          "price_lei": 28,
          "category": "Tării"
        },
        {
          "name": "Brâncoveanu VS",
          "size": "40 ml",
          "price_lei": 20,
          "category": "Tării"
        },
        {
          "name": "Courvoisier",
          "size": "40 ml",
          "price_lei": 32,
          "category": "Tării"
        },
        {
          "name": "Tanqueray",
          "size": "40 ml",
          "price_lei": 18,
          "category": "Tării"
        },
        {
          "name": "Gordon’s Dry Gin",
          "size": "40 ml",
          "price_lei": 18,
          "category": "Tării"
        },
        {
          "name": "Bombay Sapphire",
          "size": "40 ml",
          "price_lei": 24,
          "category": "Tării"
        },
        {
          "name": "Campari / Aperol / Cinzano Rosso",
          "size": "40 ml",
          "price_lei": 18,
          "category": "Tării"
        },
        {
          "name": "Baileys",
          "size": "40 ml",
          "price_lei": 20,
          "category": "Tării"
        },
        {
          "name": "Absolut",
          "size": "40 ml",
          "price_lei": 18,
          "category": "Tării"
        },
        {
          "name": "Beluga",
          "size": "40 ml",
          "price_lei": 35,
          "category": "Tării"
        },
        {
          "name": "Jose Cuervo Gold",
          "size": "40 ml",
          "price_lei": 20,
          "category": "Tării"
        },
        {
          "name": "Limoncello / Jägermeister",
          "size": "40 ml",
          "price_lei": 18,
          "category": "Tării"
        },
        {
          "name": "Cuba Libre",
          "size": "250 ml",
          "price_lei": 29,
          "category": "Long drinks 250 ml"
        },
        {
          "name": "Campari Orange",
          "size": "250 ml",
          "price_lei": 29,
          "category": "Long drinks 250 ml"
        },
        {
          "name": "Gin Tonic",
          "size": "250 ml",
          "price_lei": 29,
          "category": "Long drinks 250 ml"
        },
        {
          "name": "Vodka Juice",
          "size": "250 ml",
          "price_lei": 29,
          "category": "Long drinks 250 ml"
        },
        {
          "name": "Gin Tonic cu arome",
          "size": "250 ml",
          "price_lei": 29,
          "category": "Long drinks 250 ml"
        },
        {
          "name": "Hugo",
          "size": "350 ml",
          "price_lei": 32,
          "category": "Cocktailuri alcool"
        },
        {
          "name": "Aperol Spritz",
          "size": "350 ml",
          "price_lei": 32,
          "category": "Cocktailuri alcool"
        },
        {
          "name": "Negroni",
          "size": "350 ml",
          "price_lei": 35,
          "category": "Cocktailuri alcool"
        },
        {
          "name": "Piña Colada",
          "size": "350 ml",
          "price_lei": 32,
          "category": "Cocktailuri alcool"
        },
        {
          "name": "Blue Hawaiian",
          "size": "350 ml",
          "price_lei": 32,
          "category": "Cocktailuri alcool"
        },
        {
          "name": "Mojito",
          "size": "350 ml",
          "price_lei": 32,
          "category": "Cocktailuri alcool"
        },
        {
          "name": "Tequila Sunrise",
          "size": "350 ml",
          "price_lei": 32,
          "category": "Cocktailuri alcool"
        },
        {
          "name": "Hugo 0.0",
          "size": "350 ml",
          "price_lei": 30,
          "category": "Cocktailuri non-alcool"
        },
        {
          "name": "Gin Tonic 0.0",
          "size": "350 ml",
          "price_lei": 30,
          "category": "Cocktailuri non-alcool"
        },
        {
          "name": "Green Apple",
          "size": "350 ml",
          "price_lei": 30,
          "category": "Cocktailuri non-alcool"
        },
        {
          "name": "Virgin Piña Colada",
          "size": "350 ml",
          "price_lei": 30,
          "category": "Cocktailuri non-alcool"
        },
        {
          "name": "Sex on the Beach 0.0",
          "size": "350 ml",
          "price_lei": 30,
          "category": "Cocktailuri non-alcool"
        },
        {
          "name": "Castel Huniade Fetească Regală",
          "size": "0,75 L",
          "price_lei": 65,
          "category": "Vin alb"
        },
        {
          "name": "Castel Huniade Sarbă",
          "size": "0,75 L",
          "price_lei": 65,
          "category": "Vin alb"
        },
        {
          "name": "Implicit Chardonnay",
          "size": "0,75 L",
          "price_lei": 95,
          "category": "Vin alb"
        },
        {
          "name": "Sole Fetească Regală",
          "size": "0,75 L",
          "price_lei": 130,
          "category": "Vin alb"
        },
        {
          "name": "Caii de la Letea Vol. II Aligoté",
          "size": "0,75 L",
          "price_lei": 90,
          "category": "Vin alb"
        },
        {
          "name": "Caii de la Letea Vol. II Sauvignon Blanc Fumé",
          "size": "0,75 L",
          "price_lei": 90,
          "category": "Vin alb"
        },
        {
          "name": "Spirit",
          "size": "0,75 L",
          "price_lei": 75,
          "category": "Vin alb"
        },
        {
          "name": "Mysterium",
          "size": "0,75 L",
          "price_lei": 90,
          "category": "Vin alb"
        },
        {
          "name": "Purcari Sauvignon Blanc",
          "size": "0,75 L",
          "price_lei": 85,
          "category": "Vin alb"
        },
        {
          "name": "Purcari Chardonnay",
          "size": "0,75 L",
          "price_lei": 85,
          "category": "Vin alb"
        },
        {
          "name": "Solo Quinto",
          "size": "0,75 L",
          "price_lei": 170,
          "category": "Vin alb"
        },
        {
          "name": "Tezaur",
          "size": "0,75 L",
          "price_lei": 75,
          "category": "Vin alb"
        },
        {
          "name": "Caii de la Letea Vol. II Sauvignon Blanc",
          "size": "0,75 L",
          "price_lei": 90,
          "category": "Vin alb"
        },
        {
          "name": "Caii de la Letea Vol.II Fetească Neagră",
          "size": "0,75 L",
          "price_lei": 90,
          "category": "Vin roșu"
        },
        {
          "name": "Caii de la Letea Vol. II Cabernet Sauvignon",
          "size": "0,75 L",
          "price_lei": 90,
          "category": "Vin roșu"
        },
        {
          "name": "Purcari Fetească Neagră",
          "size": "0,75 L",
          "price_lei": 85,
          "category": "Vin roșu"
        },
        {
          "name": "Implicit Fetească Neagră",
          "size": "0,75 L",
          "price_lei": 95,
          "category": "Vin roșu"
        },
        {
          "name": "Tezaur Rosé",
          "size": "0,75 L",
          "price_lei": 75,
          "category": "Vin rosé"
        },
        {
          "name": "Spirit Rosé",
          "size": "0,75 L",
          "price_lei": 75,
          "category": "Vin rosé"
        },
        {
          "name": "Caii de la Letea Vol. II Rosé",
          "size": "0,75 L",
          "price_lei": 90,
          "category": "Vin rosé"
        },
        {
          "name": "Purcari Rosé",
          "size": "0,75 L",
          "price_lei": 85,
          "category": "Vin rosé"
        },
        {
          "name": "Castel Huniade Rosé",
          "size": "0,75 L",
          "price_lei": 65,
          "category": "Vin rosé"
        },
        {
          "name": "Sole Rosé",
          "size": "0,75 L",
          "price_lei": 130,
          "category": "Vin rosé"
        },
        {
          "name": "Implicit Rosé",
          "size": "0,75 L",
          "price_lei": 95,
          "category": "Vin rosé"
        },
        {
          "name": "Caii de la Letea Vol 1",
          "size": "0,75 L",
          "price_lei": 70,
          "category": "Vin rosé"
        },
        {
          "name": "Castel Huniade Fetească Regală",
          "size": "0,150 L",
          "price_lei": 15,
          "category": "Vin la pahar"
        },
        {
          "name": "Castel Huniade Rosé",
          "size": "0,150 L",
          "price_lei": 15,
          "category": "Vin la pahar"
        }
      ]
    }
  ]
};

export default menuData;
