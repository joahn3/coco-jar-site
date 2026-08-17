import Link from "next/link";

import { getSiteConfig } from "../lib/site-data";
import { mapHref, phoneHref, whatsappHref } from "../lib/format";
import Button from "./components/ui/button";
import Card from "./components/ui/card";
import Container from "./components/ui/container";

export const metadata = {
  title: "Pagina nu a fost găsită",
  description:
    "Ruta accesată nu mai există sau a fost mutată. Te ajutăm să ajungi la paginile importante pentru rezervări, meniu și evenimente la Coco Jar.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: { canonical: "/404" },
};

const directLinks = [
  {
    href: "/",
    title: "Înapoi acasă",
    text: "Vezi ce poți comanda, ce servicii ai aici și cum ne poți contacta.",
  },
  {
    href: "/meniu",
    title: "Meniu complet",
    text: "Toate preparatele, porțiile și categoriile sunt organizate clar.",
  },
    {
      href: "/meniu-zilei",
      title: "Meniul zilei",
      text: "Actualizare zilnică pentru meniul de zi.",
    },
  {
    href: "/evenimente-catering",
    title: "Evenimente și catering",
    text: "Nunta, botez, aniversări, team-building sau petreceri private.",
  },
  {
    href: "/galerie",
    title: "Vezi atmosfera",
    text: "Încearcă atmosfera caldă de restaurant și imaginile de la evenimente.",
  },
  {
    href: "/contact",
    title: "Contact și rezervări",
    text: "Telefon, WhatsApp și formular de rezervare într-un singur loc.",
  },
];

export default async function NotFound() {
  const config = await getSiteConfig();
  const mapsLink = mapHref(config.siteName, config.fullAddress);

  return (
    <main className="relative space-y-4 overflow-hidden pb-24 section-shell">
      <div
        className="pointer-events-none absolute -top-20 -left-14 h-[18rem] w-[18rem] rounded-full bg-gradient-to-br from-amber-200/12 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-28 h-[16rem] w-[16rem] rounded-full bg-gradient-to-br from-orange-500/12 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <Container className="relative z-10 grid gap-4 md:grid-cols-[1.25fr_0.95fr]">
        <Card className="space-y-5">
          <p className="jar-badge">Pui la jar, direcția e clară</p>
          <h1 className="text-display-md">404 — pagina căutată nu a mai fost găsită</h1>
          <p className="text-body-lg text-ink-muted prose-balance">
            Pagina pe care o cauți nu există sau a fost mutată. Dar restaurantul
            e deschis: poți reveni la meniuri, program, locație sau poți lua
            contact direct pentru rezervare.
          </p>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <Button
              as="next-link"
              href="/meniu-zilei"
              data-analytics="404_click|navigation|meniu_zilei|source=404|journey=recovery|lead_type=menu"
            >
              Meniul zilei
            </Button>
            <Button
              as="next-link"
              href="/evenimente-catering"
              variant="ghost"
              data-analytics="404_click|navigation|evenimente|source=404|journey=recovery|lead_type=event"
            >
              Evenimente și catering
            </Button>
            <Button
              href={phoneHref(config.phone)}
              data-analytics="404_click|conversion|telefon|source=404|journey=lead_capture|lead_type=reservation"
              className="sm:col-span-2 md:col-span-1"
            >
              Sună pentru rezervare
            </Button>
            <Button
              variant="whatsapp"
              href={whatsappHref(config.whatsapp, config.phone, "Bună! Nu am reușit să găsesc pagina. Aș vrea informații despre meniu, program sau o rezervare.")}
              data-analytics="404_click|conversion|whatsapp|source=404|journey=lead_capture|lead_type=whatsapp"
              className="sm:col-span-2 md:col-span-1"
            >
              Trimite mesaj pe WhatsApp
            </Button>
          </div>
        </Card>

        <Card className="space-y-4">
          <h2 className="text-title-md">Nu te-ai rătăcit? Găsește-ne aici.</h2>
          <p className="text-sm text-ink-muted">
            Adresă: {config.fullAddress}
          </p>
          <div className="jar-link-list">
            <p>
              <a
                className="jar-link touch-target"
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                data-analytics="404_click|conversion|google_maps|source=404|journey=information|lead_type=site"
              >
                Deschide locația pe Google Maps
              </a>
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            <p className="trust-stat">Contact direct</p>
            <p className="text-sm text-ink-muted">Telefon: {config.phone || "la recepție"}</p>
            <p className="text-sm text-ink-muted">WhatsApp: {config.whatsapp || "la recepție"}</p>
            <p className="text-sm text-ink-muted">Deschis: 10:00–22:00</p>
          </div>

          <p className="text-xs text-ink-muted">
            Notă de orientare: dacă ai ajuns printr-un link vechi, folosește rutele de mai jos — acolo
            găsești cel mai rapid ce cauți.
          </p>
        </Card>
      </Container>

        <Container className="relative z-10">
        <h2 className="sr-only">Rute alternative</h2>
        <div className="jar-link-list">
          {directLinks.map((item) => (
            <p key={item.href} className="space-y-1.5">
                <Link
                  className="jar-link touch-target"
                  href={item.href}
                  data-analytics={`404_click|navigation|${item.href.replace("/", "") || "home"}|source=404|journey=recovery|lead_type=${item.href.includes("/evenimente") ? "event" : item.href.includes("/meniu") ? "menu" : "navigation"}`}
                >
                  {item.title}
                </Link>
              <span className="block text-sm text-ink-muted">{item.text}</span>
            </p>
          ))}
        </div>
      </Container>
    </main>
  );
}
