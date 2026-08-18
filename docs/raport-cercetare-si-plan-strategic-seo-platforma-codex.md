# Raport de Cercetare Tehnică și Plan Strategic de Implementare SEO pentru Platforma Codex

## Context

Optimizarea SEO a unei platforme moderne construite pe **Next.js App Router** nu se rezumă la setarea etichetelor meta. În modelul actual al motoarelor de căutare, performanța de indexare depinde de:

1. felul în care serverul livrează HTML inițial;
2. calitatea strategiei de randare pe tipul de pagină;
3. calitatea datelor structurate și a metadatelor;
4. viteza reală de livrare (Core Web Vitals);
5. conformitatea accesibilității (WCAG 2.2).

Scopul acestui document este să definească o abordare tehnică completă pentru a transforma platforma Codex într-un sistem optim pentru crawl/index/performanță.

## 1) Arhitectura de randare și indexare

Modelul de randare recomandat: **hibrid** RSC + SSG/ISR/SSR, în funcție de tipul de pagină.

| Tip pagină | Strategie recomandată | Payload HTML inițial | Caching | Impact SEO |
|---|---|---|---|---|
| Homepage | `SSG` cu `force-cache` | complet și pregătit la primul request | static la edge | indexare rapidă, LCP mai bun |
| Articole/documentație | `ISR` (`revalidate: 3600`) | HTML pre-randat pe server | revalidare background la 60 min | conținut proaspăt fără recompilare completă |
| Căutare / filtre | `SSR` cu `no-store` | renderizat la request | fără cache pentru conținut personalizat | acces direct la parametri, control de crawl |
| Dashboard utilizator | `CSR` (client components) | shell minimal | fără scop SEO | excludere din indexare (`noindex`) |

### De ce e necesar

Atunci când o pagină ajunge la crawler prin HTML incomplet (CSR), indexarea poate fi încetinită deoarece Googlebot trebuie să proceseze JS. Folosind RSC și render-ul server-side pentru paginile publice, conținutul este disponibil imediat în HTML, ceea ce îmbunătățește viteza de discoverability și stabilitatea indexării.

Streaming-ul prin RSC permite trimiterea incrementală a blocurilor de conținut, reducând timpul până la primul byte și permițând crawler-ului să proceseze mai repede structura paginii.

## 2) Metadate centralizate în App Router

Se recomandă o strategie unică de metadata prin `layout.tsx` + `generateMetadata`:

1. În `layout.tsx` se definește metadata globală:
   - `metadataBase`
   - șablon de titlu (`title.template`)
   - descriere implicită
   - Open Graph/Twitter defaults
2. Pentru rutele dinamice se definește `generateMetadata`:
   - fetch datele paginii în paralel cu componenta de pagină;
   - reutilizare prin memoizarea requesturilor de date din Next.js.
3. Se definesc fișiere canonice:
   - `app/sitemap.ts`
   - `app/robots.ts`
   - `app/opengraph-image.tsx`
4. Se setează `alternates.canonical` pentru a elimina duplicatele generate de filtre/UTM-uri.

## 3) Date structurate (JSON-LD) și securitate

Datele structurate clar delimitează semnificația entităților pentru Google și pentru AI Search:

1. `Organization`
2. `WebSite` + `Sitelinks Searchbox`
3. `TechArticle` / `Article` pentru conținut editorial
4. `SoftwareApplication` / `SoftwareSourceCode` dacă există resurse tehnice descărcabile

### Siguranță la injectare

Pentru JSON-LD generat de server este obligatoriu să fie evitat un `JSON.stringify` direct pe date nesanitizate (risc XSS). Se recomandă:

1. escape pentru caractere periculoase (`<` -> `\u003c`)
2. sau pachete dedicate de serializare sigură (`serialize-javascript`)

Validare periodică:

1. Google Rich Results Test
2. Schema Markup Validator
3. teste automate integrate în CI

## 4) Performanță și Core Web Vitals

Obiectiv: rezultate stabile pe LCP / INP / CLS.

- **LCP**: experiența de încărcare inițială (în special hero)
- **INP**: interactivitate, sensibil la blocări JS lungi pe main thread
- **CLS**: deplasări vizuale, afectat de imagini fără dimensiuni definite

Recomandări tehnice:

1. Folosirea `next/image` peste tot
   - dimensiuni explicite sau `fill` + aspect ratio rezervat
   - `priority` pe imaginile hero
2. Lazy loading pentru componente grele (`next/dynamic`):
   - editori de text
   - grafice
   - vizualizatoare de date
3. Distribuția activelor prin edge CDN (de regulă Vercel Edge Network)
4. `INP < 200ms` prin reducerea bundle-ului JS inițial
5. CLS țintă `<= 0.1`

## 5) Accesibilitate vizuală WCAG 2.2

Condiția pentru o experiență accesibilă și stabilă la conversie:

- Contrast text normal: minimum **4.5:1** (AA), **7:1** (AAA)
- Contrast text mare: minimum **3:1** (AA), **4.5:1** (AAA)
- Ținte tactile minime: **44x44 px**
- Focus vizibil clar pe elemente interactive
- Erorile/aprecierile trebuie indicate și prin iconografie + text, nu doar culoare
- Linie de bază: font minim `16px`, `line-height >= 1.4x`

### Politica de culoare pe teme

1. Light mode: contrast suficient pe fundaluri deschise, fără combinații foarte apropiate
2. Dark mode:
   - evitarea `#FFFFFF` pe `#000000`
   - folosită o gamă atenuată (`#F1F1F1` pe fundal antracit, ex. `#1A1A1A`)

## 6) Plan Strategic etapizat

### Faza 1 — Randare (prioritate ridicată)

Obiectiv:
- stabilirea strategyi per-tip pagină (SSG / ISR / SSR / CSR)

Fișiere țintă:
- `app/**/page.tsx`
- layout-uri și compoziția RSC

Validare:
- conținutul cheie prezent în HTML inițial
- flux de randare stabil fără erori de hydration

### Faza 2 — Metadata și indexare

Obiectiv:
- control unitar al `head` prin Metadata API

Fișiere țintă:
- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/opengraph-image.tsx`

Validare:
- titluri, descrieri și canonicale corecte pe toate rutele relevante
- fără duplicate de meta/ canonical conflictuale

### Faza 3 — Structura semantică (JSON-LD)

Obiectiv:
- implementarea markup-urilor principale de tip schema.org

Fișiere țintă:
- componente server pentru `Organization`, `WebSite`, `TechArticle`
- blocuri sanitize pentru `script type="application/ld+json"`

Validare:
- validare fără erori în Google Rich Results Test

### Faza 4 — Performanță și CWV

Obiectiv:
- stabilizarea LCP/INP/CLS

Fișiere țintă:
- imagini + componente critice (`next/image`, `next/dynamic`)
- pagina de homepage și paginile comerciale/top funnel

Validare:
- Lighthouse Performance `>= 90`
- INP `< 200ms`
- CLS `<= 0.1`

### Faza 5 — Audit final WCAG + crawl

Obiectiv:
- conformitate vizuală și indexabilitate finală

Fișiere țintă:
- tokens de design, componente UI, sistem de heading-uri

Validare:
- conformitate **WCAG 2.2 AA**
- unică structură H1 pe pagină
- 0 erori de hydration la crawl simulation

## Concluzii operative

Planul propus mută Codex de la „optimizare ad-hoc” la un model tehnic predictibil, în care SEO, performanța și accesibilitatea sunt tratate împreună:

1. se obține indexare mai rapidă pentru conținut static/editorial;
2. se reduce riscul de scădere de performanță prin controlul bundle-ului inițial;
3. se reduce volumul erorilor SEO structurale prin validări automate;
4. se păstrează o bază scalabilă pentru creștere organică și generare de cereri comerciale.

Recomandare practică pe termen mediu:
- externalizare conținut SEO (titluri, meta, canonicale) într-un CMS headless (ex. Strapi), cu mapare în ISR;
- introducerea în CI a:
  - validări JSON-LD,
  - check pentru hydration,
  - măsurători CWV pe paginile de top.

## Surse de referință

1. [Digispot — Next.js SEO: Complete Optimization Guide for React](https://digispot.ai/blog/nextjs-seo-optimization-guide)
2. [DEV Community — Practical Technical SEO in Next.js: Implementation Guide](https://dev.to/na1969na/practical-technical-seo-in-nextjs-the-implementation-guide-2bcm)
3. [Eye-Able — WCAG and accessible design](https://eye-able.com/blog/accessible-design)
4. [Arc — Next.js SEO: Rendering Strategies That Get You Indexed](https://arc.dev/employer-blog/next-js-seo-rendering-strategies/)
5. [Strapi — The Complete Next.js SEO Guide for Building Fast and Crawlable Apps](https://strapi.io/blog/nextjs-seo)
6. [Medium — Optimizing Next.js Apps for Core Web Vitals](https://medium.com/@dreamworld420/optimizing-next-js-apps-for-core-web-vitals-8d399b2712a3)
7. [Next.js Docs — JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld)
8. [Pagepro — Next.js Performance Optimization in 9/10 Steps](https://pagepro.co/blog/nextjs-performance-optimization-in-9-steps/)
