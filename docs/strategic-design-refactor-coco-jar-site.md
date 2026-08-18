# Audit Strategic și Plan de Refactorizare de Design pentru Platforma Digitală `coco-jar-site.vercel.app`

## Diagnoza stării actuale și cadrul general de refactorizare

Piața aplicațiilor web moderne impune rigori stricte legate de performanță, estetică vizuală și accesibilitate universală. Proiectul găzduit la adresa [coco-jar-site.vercel.app](https://coco-jar-site.vercel.app) activează pe infrastructura serverless oferită de Vercel. În starea actuală există indicatori de configurare incompletă al mediului de producție, precum erori de conectivitate la build și semnale de securitate intermediare la unele subdomenii generice `.vercel.app`. În practică, astfel de blocaje apar frecvent prin lipsă de sincronizare între componentele backend/frontend în arhitecturi Next.js sau prin semnalări false pozitive ale unor sisteme automate de browser.

Conform observatoarelor UX/UI, interfețele care au arhitectură informațională vagă, blocuri de text masive fără ierarhie și navigare încărcată înregistrează frecvent rate crescute de abandon. Refactorizarea de design trebuie tratată holistic, pe patru piloni principali:

- reorganizarea vizuală prin sisteme de layout moderne (Bento Grid + design tokens);
- reducerea complexității cognitive și optimizarea căii de navigare;
- conformitatea cu WCAG 2.2 Nivel AA;
- optimizarea codului frontend și a performanței pe infrastructură Vercel.

## Sistemul de Design și tokenizarea interfeței

Procesul de refactorizare debutează prin eliminarea stilizărilor ad-hoc și introducerea unui sistem de design bazat pe tokeni atomic organizați. Lipsa consistenței vizuale crește incertitudinea utilizatorului; stabilitatea premium vine din reguli vizuale repetabile:

- culori, tipografie, spațiere, contraste, umbre și comportamente interacționale definite global;
- mecanism de schimbare adaptiv între teme (light/dark) prin tokeni centralizați;
- folosirea unor palette atenuate pentru a reduce efortul vizual pe displayuri mobile.

**Exemplu de tokenizare propusă**

| Rol în interfață | Valoare Light | Valoare Dark |
| --- | --- | --- |
| `--bg-surface` | `#FFFFFF` | `#1A1A1A` |
| `--text-primary` | `#0A0A0A` | `#F1F1F1` |
| `--color-primary-500` | `#2563EB` | `#3B82F6` |
| `--border-subtle` | `#E5E7EB` | `#374151` |
| `--font-heading` | `Inter Display, sans-serif` | `Inter Display, sans-serif` |

## Arhitectura vizuală: de la structură liniară la Bento Grid

Consolidarea arhitecturii de conținut pe carduri modulare reduce sarcina cognitivă. În locul listelor dense, conținutul se organizează în zone clare, cu ierarhie tipografică:

- titluri > subtitluri > text de suport;
- separatoare vizuale fine;
- grupare pe teme (rezervare, experiență, meniu, încredere, evenimente);
- spațieri coerente pe toate breakpoints.

## Navigație și experiența utilizatorului

Obiectivul de conversie este eliminarea pașilor inutili:

- accesul la actiuni comerciale-cheie în maximum 2 clicuri de pe homepage;
- acțiuni secundare gestionate în paneluri secundare sau fluxuri rapide,
- eliminarea punctelor moarte și a interacțiunilor redundante;
- opțiuni clare de revenire la fluxul principal din orice stare.

Pe mobil, experiența trebuie adaptată la ergonomie:

- butoanele de acțiune principală regrupate în zona inferioară accesibilă dintr-o singură mână;
- interacțiuni tactile și gestuale simple (fără blocaje la scroll);
- spațiere suplimentară pentru touch targets.

## Conformitatea cu WCAG 2.2 Nivel AA

Referință minimă obligatorie pentru accesibilitate:

- **SC 1.4.3 Contrast (minimum):** text normal 4.5:1, text mare 3.0:1.
- **SC 1.4.11 Non-text Contrast:** componente UI min 3.0:1.
- **SC 2.5.8 Target Size:** minimum 44×44 px pe interacțiuni primare.
- **SC 2.4.7 Focus Visible:** contur vizibil clar și consistent pentru navigarea pe tastatură.

Implementare:

- ajustare de contrast pe palette,
- extindere target-uri tactile,
- focus vizibil consistent pe elemente interactive,
- indicator de stare pentru erori fără dependență exclusiv pe culoare.

## Refactorizarea codului sursă și performanței

Refactorizarea vizuală nu este suficientă fără arhitectură tehnică clară:

- menținerea fluxului Next.js pe React Server Components unde este posibil;
- reducerea JavaScript-ului transferat inutil;
- pipeline unificat de build + date pentru rulare predictibilă la deploy;
- verificare clară a integrării scripturilor de date cu build-ul Next.

Consolidarea încrederii se face prin configurare de domeniu dedicat cu certificat valid, reducând riscul de avertismente automate de tip phishing pe subdomenii generic-provizionate.

## Matrice comparativă și impact țintă

| Dimensiune | Stare de referință | Stare țintă | Impact |
| --- | --- | --- | --- |
| Găzduire & domeniu | Subdomeniu generic cu risc de blocaj | Domeniu custom + SSL/TLS dedicat pe Vercel | acces fără întreruperi, reducerea alertelor |
| Arhitectură vizuală | flux liniar, blocuri text neierarhizate | layout modular Bento Grid | claritate și timp redus de decizie |
| Contrast cromatic | rapoarte de lizibilitate inconsistenta | tokeni WCAG-conform | acces mai bun pe desktop și mobil |
| Interacțiune mobilă | controale cu accesare dificilă | touch targets de 44×44 + ierarhie ergonomic | reducere erori tactile |
| Pipeline de livrare | scripturi paralele fără standardizare | build unificat + verificare continuă | stabilitate la deploy |

## Plan de implementare (5 săptămâni)

1. **Săptămâna 1** — unificare pipeline build + rezolvare domeniu/găzduire.
2. **Săptămânile 2–3** — sistem de tokeni de design + sistem modular de layout.
3. **Săptămâna 4** — optimizare accesibilitate, touch targets, focus states.
4. **Săptămâna 5** — audit final performanță + test de conversie + validare utilizatori.

Prin aplicarea acestor pași, proiectul își crește stabilitatea tehnică, claritatea vizuală și potențialul de conversie premium.

## Referințe

1. [WCAG and accessible design – Eye-Able](https://eye-able.com/blog/accessible-design)
2. [Web Design Trends 2026](https://iweb.ee/en/blog/web-design-trends-2026/)
3. [Vercel](https://vercel.com/)
4. [Deploying a web app on Vercel – Stack Overflow](https://stackoverflow.com/questions/78817904/deploying-a-web-app-on-vercel-back-end-is-not-started)
5. [Fix phishing warning in Vercel – Stack Overflow](https://stackoverflow.com/questions/72503425/how-do-i-fix-this-phishing-warning-in-my-app-deployed-in-vercel)
6. [WCAG 2.2 W3C](https://www.w3.org/TR/WCAG22/)
7. [Design trends context (repetat)](https://iweb.ee/en/blog/web-design-trends-2026/)
8. [Vercel Agentic Infrastructure](https://vercel.com/)
9. [Color contrast tips](https://accessibilityinnovations.com/color-contrast/)
10. [Accessibility Act in Practice – UX/UI](https://www.mozestudio.com/journal/european-accessibility-act-in-practice-operational-guide-for-ux-and-ui-designers)
