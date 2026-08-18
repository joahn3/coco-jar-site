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

## Audit strategic de design (prioritar înainte de full premium relaunch)
- Document strategic complet: `docs/strategic-design-refactor-coco-jar-site.md`
- Rezultat așteptat: standardizare premium pe 5 piloni: sistem de tokeni vizuali, arhitectură Bento Grid, flux UX redus la acțiuni clare, conformitate WCAG 2.2 AA, performanță stabilă Vercel.

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

## Plan executabil de finalizare (sub-task-uri)
**Săptămâna 1**
- [ ] 1.1. Completare prețuri din fișierul curat de 46 preparate (`data/meniu-complet-fara-pret-46.json`), cu verificare finală de numerotare.
- [ ] 1.2. Finalizare review copy produs pe `meniu-zilei`, `meniu`, `evenimente-catering` (ton comercial unificat).
- [ ] 1.3. Corectarea notelor tehnice din textul vizibil (`site`, `contact`, `event form`) înainte de UI lock.
- [ ] 1.4. Validare NAP (nume/adresă/telefon) pe toate paginile relevante + social link-uri.

**Săptămâna 2**
- [ ] 2.1. QA tehnic pe formular: mesajele de succes/eroare, anti-spam, rate limit minim.
- [ ] 2.2. Verificare click tracking pe CTA-uri (`phone`, `whatsapp`, `meniu-zilei`, `contact`) + naming unificat în payload.
- [ ] 2.3. Audit de accesibilitate rapid: contrast minim 4.5:1 pentru text normal, 3.0:1 pentru text mare.
- [ ] 2.4. Confirmare touch-target-uri 44x44 pe butoanele primare din header/footer/hero.

**Săptămâna 3**
- [ ] 3.1. Uniformizare design tokens (culori/spacing/typografie) pe secțiunile active (`home`, `contact`, `meniu`, `meniu-zilei`).
- [ ] 3.2. Implementare card-hover + separatoare consistente pe toate blocurile de conversie.
- [ ] 3.3. Uniformizare linkuri „detalii/rezervă” pe tipar comun premium.
- [ ] 3.4. Mic audit de performanță (`LCP`, `CLS`, `TBT`) pe homepage + `meniu` + `evenimente-catering`.

**Săptămâna 4**
- [ ] 4.1. Audit final de conținut public (copy, diacritice, callouts, ton comercial) fără termeni tehnici.
- [ ] 4.2. Implementare finală micro-listă „proof stack” pe homepage + evenimente.
- [ ] 4.3. Reducere overlay-uri/efecte pe mobil pentru LCP mai bun (overlay hero optimizat).
- [ ] 4.4. Validare cross-device (360x812, 390x844, 768x1024, 1280x900).

**Săptămâna 5**
- [ ] 5.1. Configurare custom domain + SSL + verificare HTTPS strict.
- [ ] 5.2. Verificare finală sitemap + robots + indexare GSC.
- [ ] 5.3. Reconciliere ultimă cu GitHub Actions/CI + push pe `main`.
- [ ] 5.4. Go-live și monitorizare primele 48h (erori, formular, conversii, feedback clienți).

## Plan de execuție secvențial (mini-Gantt)
- Fiecare dependență este strictă; un task din etapă următoare începe doar după validarea celor de bază din etapa curentă.

| Etapă | Durată estimată | Dependențe | Rezultat de ieșire |
| --- | --- | --- | --- |
| S1a – Verificare date prepte | 2-3 zile | - | Prețuri + conținut fără goluri, NAP validat |
| S1b – Curățare copy premium | 1-2 zile | S1a | Texte comerciale uniforme pe pagini-cheie |
| S2a – QA formulare + tracking | 2 zile | S1b | Formulare robuste + eventiști de conversie coerenti |
| S2b – Audit accesibilitate + touch targets | 2 zile | S2a | Conformitate AA pe elemente critice, 44x44 px pentru CTA |
| S3a – Unificare UI tokens/layout | 3-4 zile | S2b | `home`, `contact`, `meniu`, `meniu-zilei` pe același pattern |
| S3b – Performance micro-audits | 1-2 zile | S3a | Raport LCP/CLS/TBT + acțiuni corective aplicate |
| S4a – Finalizare conținut & proof stack | 2 zile | S3b | Copy final, secțiune „proof stack” stabilită |
| S4b – Validare cross-device | 1-2 zile | S4a | Validare pe 360x812, 390x844, 768x1024, 1280x900 |
| S5a – Lansare DNS + SSL | 1 zi | S4b | Domeniu custom live, HTTPS strict |
| S5b – SEO/publication checklist | 1 zi | S5a | Sitemap/robots+indexare finală |
| S5c – Go-live + monitorizare | 2 zile | S5b | Deploy stabil + monitorizare 48h |

## Checklist final înainte de live
- [ ] Nicio pagină goală/măsurabilă (prețuri lipsă acolo unde e cazul).
- [ ] Contact + WhatsApp funcționează pe toate ecranele.
- [ ] Formular evenimente trimite corect (webhook valid).
- [ ] Sitemap + robots valabile.
- [ ] Linkuri externe (Maps/Facebook/Instagram) testate.
