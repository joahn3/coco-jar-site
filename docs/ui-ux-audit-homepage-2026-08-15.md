# Audit UI/UX Homepage – Coco Jar (mobile-first + 3 breakpoints)

**Data audit:** 2026-08-15
**Scope:** homepage (`/`) + header + CTA-uri primare
**Modele de validare:**
- Lighthouse local (desktop + mobile)
- Validare mobile-first pe 3 breakpoints (360/768/1280)
- Verificări de utilizabilitate: overflow X, înălțime tap-target, lizibilitate, accesibilitate a header-ului

## Rezultate tehnice rapide

- **Lighthouse desktop:** Performance 99, Accessibility 100, Best Practices 96, SEO 100
- **Lighthouse mobile:** Performance 99, Accessibility 100, Best Practices 96, SEO 100
- **LCP/FCP:** ~2.1–2.2s / 0.8s
- **CLS/TBT/FID(max-potential):** 0 / 0ms / 20ms
- **Color-contrast / target-size:** OK (1)

## Rezultate mobile-first pe 3 breakpoints

| Breakpoint | Header (px) | Hero top (px) | Nav height (px) | Nav overflow | Observație |
|---|---:|---:|---:|---:|---|
| 360x812 | 185 | 185 | 60 | No | OK pentru mobil compact |
| 768x1024 | 233 | 233 | 164 | No | OK pe tabletă |
| 1280x900 | 233 | 233 | 164 | No | OK pe desktop |

## Schimbare vizuală făcută pe homepage (hero)
- CTA-urile principale (Telefon, WhatsApp, Meniu zi) sunt acum mai aerisite și mai consistente pe spațiere.
- Informațiile critice (program/telefon/locație) sunt prezente direct în zona hero ca „scan first-order”.
- Am introdus CTA „Meniu zilei” clar și contrastant, cu aliniere simplă mobile.
- Header-ul a fost rafinat pentru mobile (navigare orizontală scrollată) pentru a păstra homepage-ul ușor de scanat.

## Listă scurtă îmbunătățiri UI/UX pentru conversie (prag scurt/rapid)

1. **Consolidează „primul ecran”**
   - Prioritizează 3 obiective: un buton de telefon, unul WhatsApp, una întrebare clară „Meniu zilei”.
   - Păstrează un singur mesaj principal (ex: „Comandă rapidă, fără pași grei”).

2. **Navigare mai simplă pe mobil**
   - Păstrează doar 4–5 linkuri directe în nav primar și mută restul în „Mai multe servicii”.
   - Păstrează scroll-ul orizontal doar dacă spațiul e limitat.

3. **Reducerea fricțiunii la contact**
   - În pagina „Contact”, afișează permanent un bloc mini „Sună / WhatsApp / Deschide hartă” (3 acțiuni, un click).

4. **Mai multe micro-promisiuni clare**
   - Adaugă un bloc de „Ce primești azi”: `Meniu actualizat`, `Comandă prin WhatsApp`, `Răspuns în 10 min`.

5. **Trust imediat**
   - În hero/superioară, include 2 badge-uri: „Recenzii active” + „Localizare confirmată” cu iconițe simple.

6. **Reducerea anxietății**
   - Confirmă ora limită meniu zilei direct pe buton: „Meniul zilei valid pănă la 16:00”.

7. **Aliniere „premium simplu”**
   - Păstrează culorile brand + spațiu consistent; evită blocuri prea multe de text.

## Livrabile create
- `app/page.js` – refresh hero premium și spațiere îmbunătățită
- `app/components/site-header.jsx` – nav mobil compact / scannabil
- `docs/ui-ux-audit/mobile-first-breakpoints-report.json` – date brute validare 360/768/1280
- `docs/ui-ux-audit/homepage-*.png` – capturi de control pe cele 3 breakpoints

## Status recomandare
- Varianta curentă este acum semnificativ mai simplă pentru client (mai puține pași, acțiuni clare, touch targets conforme) și gata pentru livrare.
