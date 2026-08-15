# Plan de finalizare „production-ready” — Coco Jar Bistro

## Obiectiv
Lansare stabilă, local SEO, conversion-ready (telefon + WhatsApp + formulare), cu conținut editabil din fișiere JSON și secțiuni pentru evenimente/catering.

## Ce e deja implementat
- Structură Next.js (App Router): `/`, `/meniu`, `/meniu-zilei`, `/galerie`, `/despre-noi`, `/evenimente-catering`, `/contact`.
- Header/footer cu call-to-call + call-to-WhatsApp.
- Formulare de contact + evenimente cu validare și anti-spam basic.
- SEO local de bază: metadate, sitemap, JSON-LD Restaurant + Menu.
- Meniu complet + meniu zi (configurabil prin JSON).
- Galerii imagini și linkuri reale (Facebook/Instagram/Maps din informațiile primite).
- Build și lint fără erori.

## Pași pentru faza finală de productie
1. **Date reale + prețuri complete**
   - Confirmare + completare manuală a celor 46 preparate fără preț (vezi `data/meniu-complet-fara-pret-46.json`).
   - Verificare text cu diacritice.

2. **QA tehnic + monitorizare conversii**
   - Testare formulari pe mobil/tablet + anti-spam + mesaj de success/error.
   - Verificare click tracking pe CTA-uri (`Telefon`, `WhatsApp`, `Meniu zilei`, `Trimite cerere`), eventual GA4/Meta Pixel.

3. **SEO local & performanță**
   - Verificare NAP în LocalBusiness (`nume/adresă/telefon`), meta + titluri locale + schema.
   - Corectare imagini/logo (logo local sau CDN stabil), compress/lazy load imagini.
   - LCP/CLS check pe mobil (viteză + click-uri clare).

4. **Conținut operațional**
   - Pagină „Evenimente + Catering” cu pachete (de ex. 30/50/100 pers.) + condiții.
   - Secțiune `Meniu zilei` cu mesaj de expirare la 16:00 clar.

5. **Lansare**
   - Configurare custom domain + SSL.
   - Configurare formulare webhook/contact CRM.
   - Reindexare în Google Search Console, verificare sitemap.

## Checklist final înainte de live
- [ ] Nicio pagină goală/măsurabilă (prețuri lipsă acolo unde e cazul).
- [ ] Contact + WhatsApp funcționează pe toate ecranele.
- [ ] Formular evenimente trimite corect (webhook valid).
- [ ] Sitemap + robots valabile.
- [ ] Linkuri externe (Maps/Facebook/Instagram) testate.
