# Coco Jar Bistro — Site de prezentare (Next.js)

Proiectul este portat în Next.js App Router pentru:
- pagini clare (Acasă, Meniu, Meniul zilei, Galerie, Despre noi, Evenimente + Catering, Contact)
- call-to-call / WhatsApp
- formulare de contact + evenimente/catering cu validare
- meniu zi de zi validat temporal (până la ora 16:00)
- conținutul centralizat în fișiere JSON din `data/`
- schema JSON-LD pentru local SEO

## Structura

- `app/` — pagini și layout
- `app/components/` — componente UI (header, footer, formulare, SEO schema)
- `app/api/` — endpointuri pentru formulare
- `lib/` — logica de date/utilitare
- `data/` — config + meniuri + fișier `.xlsx`
- `public/galerie/` — imagini reale din profil/menu pentru secțiunea Galerie
- `README.md` — acest fișier
- `PRODUCTION-READINESS-PLAN.md` — plan de lansare și verificări
- `OFERTA-CLIENT-COCO-JAR-2026.md` — ofertă orientativă (3.200–4.500 EUR)
- `docs/strategic-design-refactor-coco-jar-site.md` — audit strategic + plan de refactorizare de design (premium, WCAG AA, roadmap 5 săptămâni)
- `data/meniu-coco-jar-fotografii-2026-08-15.xlsx` — setul inițial de extragere
- `data/meniu-coco-jar-detaliat-integral-2026-08-15.xlsx` — meniu integral exportat din JSON (159 preparate)
- `data/meniu-complet-fara-pret-46.json` — listă completă a preparatelor fără preț (46)

## Editare rapidă conținut

- Datele generale restaurant: `data/site-config.json`
- Meniul zilei: `data/meniu-zilei.json`
- Meniul complet + băuturi: `data/meniu-complet.json`
- Workbook extra original: `data/meniu-coco-jar-fotografii-2026-08-15.xlsx`

Galerie/asset-uri:
- `public/galerie/` conține imaginile din social media folosite exclusiv în secțiunea galerie (fără poze meniu)
- `public/meniu/fotografii/` păstrează pozele detaliate de meniu (10 imagini)
- `public/meniu/coco-jar-meniu-detaliat-2026-08-15.pdf` — PDF-ul generat din cele 10 imagini

## URL de test (deployment)

- `https://coco-jar-site.vercel.app` (alias de producție pe Vercel)

## Scripturi

- `npm run dev` — server de dezvoltare
- `npm run build` — build de producție
- `npm run start` — rulare server de producție
- `npm run lint` — lint Next.js
- `npm run assets:collect` — extrage imagini din Instagram/Facebook/Google Maps (din URL-uri din `data/site-config.json`) în `docs/social-media`
- `npm run assets:collect:gallery` — aceeași extracție + sincronizare primelor imagini în `public/galerie`
- `npm run assets:collect -- --platform=instagram --max=20` — rulezi doar o platformă
- `npm run assets:collect -- --dry-run --platform=facebook` — test de prelevare fără descărcare
- `npm run daily-menu:sync` — importă automat meniu zilei din Facebook în `data/meniu-zilei.json`

Sincronizare automată (GitHub Actions):
- Workflow: `.github/workflows/sync-daily-menu.yml`
- Programare: la fiecare 15 minute între 06:00–08:59 UTC, cu filtrare internă pentru intervalul local `09:00–10:00 Europe/Bucharest`
- Setări necesare în repo:
  - Pentru cea mai stabilă variantă (cu API): `FACEBOOK_ACCESS_TOKEN` + `FACEBOOK_PAGE_ID` (secrete GitHub)
  - Fără rol de administrator pe pagină: păstrează doar `FACEBOOK_PUBLIC_PROXY` (implicit `https://r.jina.ai/http://`) și `social.facebook` în `data/site-config.json`

Opțiuni CLI pentru script:
- `--pageUrl` sau `FACEBOOK_PAGE_URL`
- `--token` sau `FACEBOOK_ACCESS_TOKEN`
- `--pageId` sau `FACEBOOK_PAGE_ID`
- `--publicProxy` sau `FACEBOOK_PUBLIC_PROXY`

## Despre Tailwind

Proiectul folosește Tailwind CSS 4.x cu design tokens în `app/globals.css` (`@theme` + `@utility`):
- Tokenizare design: culori, spacing, raze, umbre, tipografie și scări de dimensiuni
- Componente UI reutilizabile din `app/components/ui/*` (Card, Button, Container, Section)
- Păstrarea structurii existente a paginilor și funcționalităților.
