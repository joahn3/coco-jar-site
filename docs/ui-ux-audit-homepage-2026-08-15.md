# Audit UI/UX Homepage (v2 – live, mobile-first)

**Data:** 2026-08-15  
**URL:** https://coco-jar-site.vercel.app  
**Rezultat livrat:** Refresh premium pe hero + validare mobil-first + optimizări de conversie

## Ce am verificat
- Homepage (`/`) + header + CTA principale
- 3 breakpoint-uri: **360x812**, **768x1024**, **1280x900**
- Lighthouse (desktop + mobile)
- Conversie + micro-fricțiune pentru acțiuni: apel/WhatsApp/meniu-zilei

## Validare live pe 3 breakpoints

| Breakpoint | Header (px) | Hero top (px) | Nav (px) | Overflow orizontal | Status |
|---|---:|---:|---:|---:|---|
| 360x812 | 185 | 185 | 60 | No | OK |
| 768x1024 | 233 | 233 | 164 | No | OK |
| 1280x900 | 233 | 233 | 164 | No | OK |

Fișier brut: `docs/ui-ux-audit/live-mobile-first-breakpoints-report.json`

## Lighthouse (live, production)

- **Desktop**: Performance **100**, Accessibility **100**, Best Practices **96**, SEO **100**, LCP ~**403ms**, FCP ~**281ms**, CLS **0.000**
- **Mobile**: Performance **100**, Accessibility **100**, Best Practices **96**, SEO **100**, LCP ~**1540ms**, FCP ~**1540ms**, CLS **0.000**
- Fișiere brute: `docs/ui-ux-audit/live-lighthouse-desktop.json`, `docs/ui-ux-audit/live-lighthouse-mobile.json`

## Ce a fost făcut pe homepage (pas premium simplu pentru client)

- Hero clarificat: mesaj central + 3 acțiuni rapide vizibile.
- Spațiere/ritm îmbunătățit pe desktop + mobile.
- CTA-urile esențiale sunt vizibile fără scroll.
- Header navigabil pe mobil prin layout compact, fără creșterea excesivă a înălțimii.
- Informațiile pragmă importante (telefon, locație, oră meniu zilei) aflate sus, în primul ecran.

## Listă scurtă îmbunătățiri UI/UX orientate conversie

1. **Un singur traseu clar de comandă**: Telefon, WhatsApp, Meniu zilei.
2. **Reducerea „deciziei” pe acțiuni**: butoane mari, etichete scurte, comportament de click predictibil.
3. **Trust vizual minim, dar clar**: 2 badge-uri scurte în zona hero (ex: „Recenzii active”, „Locație confirmată”).
4. **Navigare pe mobil fără fricțiune**: doar acțiuni esențiale primar; ce e secundar la scroll.
5. **Ancoră de încredere**: telefon + WhatsApp mereu într-un bloc ușor de atins.

## Output livrat
- `app/page.js` – refresh hero + spacing premium și conversie mai simplă
- `app/components/site-header.jsx` – layout compact pe mobil
- `docs/ui-ux-audit/live-mobile-first-breakpoints-report.json`
- `docs/ui-ux-audit/live-lighthouse-desktop.json`
- `docs/ui-ux-audit/live-lighthouse-mobile.json`
- `docs/ui-ux-audit/homepage-live-360x812.png`
- `docs/ui-ux-audit/homepage-live-768x1024.png`
- `docs/ui-ux-audit/homepage-live-1280x900.png`
