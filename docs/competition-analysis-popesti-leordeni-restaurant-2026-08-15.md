# Competitie: restaurante în Popești-Leordeni (august 2026)

## Obiectiv
Verificare reală a densității concurenței pentru servicii restaurant locale în zona Popești-Leordeni, cu un minim de 50–100 unități ca indicator de piață și un shortlist de practici implementabile pe site-ul premium.

---

## Surse auditate

1. **Cylex România**  
   - URL: `https://popesti-leordeni.cylex.ro/restaurant.html`  
   - Snippet public citit: „Rezultate 1 - 20 din 76” (în funcție de paginare și cache, variază între 71–76 pe paginile de listare).
   - Alte pagini găsite prin căutare: `/restaurant-2.html`, `/restaurant-3.html`, `/restaurant-4.html`, plus listingul cu scoruri/recomandări.
   - Observație: accesul direct prin `curl` este blocat uneori prin Cloudflare (anti-bot), de aceea verificarea completă a listei a fost făcută prin sursa alternativă mai accesibilă.

2. **Firma de Aur**  
   - URL: `https://www.firmadeaur.ro/50534-67/popesti-leordeni/restaurant`  
   - Pagina internă conține 77 elemente parse-abile (secțiunea `restaurants` din HTML), deci confirmăm pragul minim de competitori.

## Concluzie numerică (acoperire minimă)
- În total verificat din surse publice: **≥ 71 restaurante** pe Cylex (fragmentat pe pagini/search) și **77** din pagina listă Firma de Aur.
- Concluzie: piața locală are un număr consistent de concurenți, deci website-ul trebuie să fie diferențiator clar pe:
  - conversie (apel/WhatsApp/formulare),
  - claritate informațională (telefon, orar, adresă),
  - actualizare zilnică meniu,
  - încredere/reputație vizibilă.

## Lista extrasă (77 localuri – Firma de Aur)

1. Bucataria La Tibescu  
2. Cetatea Berarilor  
3. One Love Coffee  
4. MiT - Burgărie și altele  
5. Atesbaz Kebap  
6. Kif Mec  
7. Bistro Lemon  
8. Casa Dunose Restaurant  
9. House Of Burger  
10. Restaurant La Şulea  
11. La Ciotoianu grill / Mici / Pastramă  
12. Yvi's  
13. Novo Paste Artizanale & Pizza  
14. Sea Ray - Fructe de mare  
15. Mosimo Bistro  
16. DanyMar food 2  
17. Gyros Thessalonikis • Popesti-Leordeni  
18. La mami acasă  
19. Home Kitchen  
20. Restaurant Pizzerie Atmosfera  
21. Qzeen  
22. MEDITERRANO • Urban Greek Food 2 - VITAN  
23. LIO Restaurant  
24. Grataru Meserias  
25. La Bunicu  
26. NOD Urban Food Restaurant  
27. Gorilla's Crazy Burgers Berceni  
28. Restaurant "Casa Regala" - La Paraul Rece  
29. Reina Oriental Cuisine  
30. Terasa Alba  
31. arabugrill  
32. Arte Napoletana  
33. Aslan Restaurant  
34. La Italianu' - Pizza Popești Leordeni  
35. TNG - Gustul de acasă  
36. La Vecinu Pub&Grill  
37. Casa Cu Pauni  
38. Aubert restaurant  
39. Trattoria Pizza Italia  
40. AFI Bistro&Caffe  
41. Restaurant Casa Dulce Casa  
42. Restaurant Arena Leilor  
43. La Moșu  
44. Bistro Decan  
45. Agapi Bistro  
46. JAR - Just A Restaurant  
47. Ornely Events  
48. La Ceaune  
49. OK Sushi  
50. The Brasserie  
51. Restaurant Zorilor  
52. Gogu Rezident  
53. Hasmir Kebap 3  
54. Artisan by Cocorico  
55. Urban Eat  
56. BunGust Catering si Evenimente  
57. Mandaloo Restaurant Lounge  
58. Bucate Calde  
59. Leonida Grill  
60. Jar House  
61. 6ciorbe  
62. Sushi Yoro Nara 🍣  
63. Terasa La Scena  
64. 81 Infinity Restaurant  
65. Mandarin House Stick It  
66. Casa Gambino  
67. Ambient Bistro  
68. La Florin  
69. Pizza Tranquilla  
70. Costas Greek Cuisine  
71. Navigli  
72. AYT Steakhouse - Mâncare turcească  
73. Restaurant Belvedere  
74. Sushi Yoko Yoko Delivery  
75. Casa Huber  
76. Bistro La Minut  
77. Check in Lounge

## Ce preluăm obligatoriu din analiza concurenței (deja mapat pe componenta noastră)

### 1. Trust & conversie instantă
- Butoane primare clare: **Telefon**, **WhatsApp**, **Meniu zilei** (ambele pe desktop + floating pe mobile).
- Secțiune dedicată de încredere/recenzii pe homepage (rating-like + link direct către surse).
- Link direct Google Maps și CTA vizibil în header/contact.

### 2. Claritate local: date care contează
- Telefon, WhatsApp, adresă, program (inclusiv mențiunea „meniul zilei valabil până la 16:00”).
- Formular de evenimente + catering cu câmpuri de urgență (nr. persoane, buget, data, alergeni).
- Structură de meniu pe categorii + PDF actualizabil.

### 3. Experiență vizuală premium pentru 5+ ani
- Tipografie + spacing unificate pe toate secțiunile (`text-display-*`, `text-title-*`, `text-body-lg`, `section-shell`).
- Micro-interacții subtile: hover/focus pe carduri, CTA și formulare.
- Vizibilitate CTA mobile prin bară fixă.

### 4. SEO local coerent
- Nume real al localului + adresă + tipul de activitate în metadate.
- JSON-LD Restaurant + Menu deja implementat prin `SeoSchema`.
- Meniul zilei/meniu complet expus constant pentru crawlers și utilizatori.

### 5. Următorul pas tehnic recomandat
- Pe lângă site: monitorizare recenzii + evenimente in-app (event tracking: `phone_click`, `whatsapp_click`, `form_submit`) + periodic refresh de conținut de meniu.
- Dacă dorim a atinge un standard „premium 5 ani+”, următorul update ar trebui să includă și:
  1. Galeria diferențiată pe categorii (`ambianță`, `preparate`, `evenimente`),
  2. Pagina „Recenzii” cu recenzii JSON din Google/Instagram dacă putem extrage legal feed direct,
  3. Secțiune „FAQ + alergeni / opțiuni meniu”.

## Note de lucru
- `docs/social-media/` conține deja extrasul de imagini (Instagram/Facebook/Maps).
- Pentru implementare imediată pe premium polish, lista de mai sus a fost folosită doar ca „market scan” pentru funcționalități, nu pentru copiere de design.
