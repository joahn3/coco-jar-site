import Link from "next/link";
import {
  getSiteConfig,
  getCurrentDayKey,
  getDailyMenu,
  getDayLabel,
} from "../lib/site-data";
import { isMenuDayActive, mapHref, phoneHref, whatsappHref } from "../lib/format";
import Button from "./components/ui/button";
import Card from "./components/ui/card";
import Container from "./components/ui/container";
import Section from "./components/ui/section";

export default async function HomePage() {
  const config = await getSiteConfig();
  const dailyMenu = await getDailyMenu();
  const dayKey = getCurrentDayKey();
  const todayItems = Array.isArray(dailyMenu[dayKey]) ? dailyMenu[dayKey] : [];
  const isMenuActive = isMenuDayActive(config.menuValidUntilHour);
  const todayMenuLabel = getDayLabel(dayKey);

  const trustSignals = [
    "Program clar: ziua 10:00–16:00, seara 16:00–22:00",
    "Localizare precisă, ușor de găsit în Poșești-Leordeni",
    "Răspuns rapid pe telefon și WhatsApp",
    "Meniul zilei actualizat zilnic, cu limită de 16:00",
  ];

  const safetySignals = [
    "Prezentare clară pe categorii și alergeni",
    "Procesul de servire e orientat pe timp de răspuns",
    "Comunicare transparentă pentru evenimente + catering",
  ];

  const reviewSignals = [
    {
      source: "Google Maps",
      title: "Recenzii active pe profil",
      text: "Afișăm recenziile din profilul public pentru verificare directă.",
      cta: "Vezi recenziile",
      href: config.social?.googleBusiness || "#",
    },
    {
      source: "Instagram",
      title: "Conținut real din locație",
      text: "Actualizări periodice, preparate, atmosferă, evenimente și comunicări utile.",
      cta: "Vezi pagina",
      href: config.social?.instagram || "#",
    },
  ];

  return (
    <main className="space-y-1 pb-28">
      <Container
        as="section"
        className="grid gap-4 pt-5 md:gap-6 lg:grid-cols-[1.35fr_0.92fr] lg:gap-6"
      >
        <Card className="space-y-6 py-6 sm:py-7">
          <p className="chip">
            Restaurant • {config.locality}
          </p>
          <h1 className="text-display-2xl sm:text-display-lg">
            Comandă rapidă, mâncare clară, fără pași grei.
          </h1>
          <p className="max-w-3xl text-body-lg text-ink-muted prose-balance">
            Descoperiți meniul zilei, cel complet, oferta de evenimente și opțiunile de catering dintr-un singur loc.
          </p>
          <div className="grid gap-2.5 sm:inline-flex sm:flex-wrap">
            <Button href={phoneHref(config.phone)} data-analytics="phone_click|conversion|telefon_home" className="w-full touch-target sm:w-auto">
              Sună pentru rezervare
            </Button>
            <Button
              variant="whatsapp"
              href={whatsappHref(config.whatsapp, config.phone)}
              data-analytics="whatsapp_click|conversion|whatsapp_home"
              className="w-full touch-target sm:w-auto"
            >
              Discută pe WhatsApp
            </Button>
            <Button
              as="next-link"
              href="/meniu-zilei"
              variant="ghost"
              data-analytics="click|navigation|meniu_zilei_home"
              className="w-full touch-target sm:w-auto"
            >
              Vezi meniul zilei
            </Button>
          </div>

          <div className="mt-2 grid gap-2 sm:grid-cols-3 sm:gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Meniu zilei: până la 16:00
            </p>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Telefon: {config.phone || "de completat"}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Locație: {config.locality}
            </p>
          </div>
        </Card>

        <Card className="space-y-4 py-6 sm:py-7">
          <h2 className="text-title-lg">Contact rapid</h2>
          <p className="text-sm text-ink-muted">
            Orar: {config.hours}
          </p>
          <p className="text-sm text-ink-muted">
            Telefon: <span className="text-ink-title">{config.phone || "de completat"}</span>
          </p>
          <p className="text-sm text-ink-muted">
            WhatsApp: <span className="text-ink-title">{config.whatsapp || "de completat"}</span>
          </p>
          <p className="text-sm text-ink-muted">Adresă: {config.fullAddress}</p>
          <p className="text-sm text-ink-muted">Program: {config.hours}</p>
          <p>
            <a
              className="cta-link text-sm"
              href={mapHref(config.siteName, config.fullAddress)}
              data-analytics="maps_click|conversion|google_maps"
              target="_blank"
              rel="noreferrer"
            >
              Deschide pe hartă
            </a>
          </p>
        </Card>
      </Container>

      <Container as="section">
        <Section
          title="Încredere, claritate, reacție rapidă"
          subtitle="Totul este configurat pentru conversie: informații directe, apel/WhatsApp vizibile și meniu ordonat."
          className="pb-6 pt-8"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="space-y-3">
              <p className="trust-stat">Încredere</p>
              <h3 className="text-title-md">Proces simplu pentru clienți</h3>
              <ul className="space-y-2 text-sm text-ink-muted">
                {trustSignals.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-brand-500"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="space-y-3">
              <p className="trust-stat">Siguranță</p>
              <h3 className="text-title-md">Mese clare de livrare și servire</h3>
              <ul className="space-y-2 text-sm text-ink-muted">
                {safetySignals.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-brand-500"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="space-y-3">
              <p className="trust-stat">Recenzii</p>
              <h3 className="text-title-md">Evaluări din surse publice</h3>
              <div className="space-y-2.5">
                {reviewSignals.map((review) => (
                    <article key={review.source} className="space-y-1.5 rounded-lg bg-surface-base/70 p-3">
                      <p className="review-stars" aria-hidden="true" />
                      <p className="text-sm text-ink-title">
                        {review.source} — {review.title}
                      </p>
                      <p className="text-xs text-ink-muted">{review.text}</p>
                      <a
                      className="cta-link text-sm"
                      href={review.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {review.cta}
                    </a>
                  </article>
                ))}
              </div>
            </Card>
          </div>
        </Section>
      </Container>

      <Container as="section" className="grid gap-4 py-6 md:grid-cols-2 xl:grid-cols-3">
        <Section title="Rezervări rapide, acțiuni clare" className="md:col-span-2 xl:col-span-3 py-0">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h3 className="text-title-md">Telefon &amp; WhatsApp</h3>
              <p className="text-sm text-ink-muted">Număr principal: {config.phone || "neconfirmat"}</p>
              <p className="text-sm text-ink-muted">Program: {config.hours}</p>
            </Card>
            <Card>
              <h3 className="text-title-md">Locație</h3>
              <p className="text-sm text-ink-muted">{config.fullAddress}</p>
              <p className="text-sm text-ink-muted">Popești-Leordeni, Ilfov</p>
            </Card>
            <Card>
              <h3 className="text-title-md">Evenimente + Catering</h3>
              <p className="text-sm text-ink-muted">Nuntă, botez, aniversări, evenimente corporate.</p>
              <Link className="cta-link text-sm" href="/evenimente-catering">
                Trimite cerere ofertă
              </Link>
            </Card>
          </div>
        </Section>
      </Container>

      <Container as="section">
        <Section
          title={`Meniul zilei — ${todayMenuLabel}`}
          subtitle={isMenuActive ? "" : "Meniul zilei este valabil până la ora 16:00."}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {!todayItems.length ? (
              <Card className="md:col-span-2 xl:col-span-3">
                <p className="text-sm text-ink-muted">
                  Nu avem încă meniul zilei încărcat. Se actualizează periodic în fișierul
                  <span className="font-mono text-ink-title"> data/meniu-zilei.json</span>.
                </p>
              </Card>
            ) : (
              todayItems.map((item) => (
                <Card key={item.name} className="space-y-2">
                  <h3 className="text-title-md">{item.name}</h3>
                  <p className="text-sm text-ink-muted">{item.description}</p>
                  <p className="font-semibold text-ink-title">{item.price || "—"}</p>
                </Card>
              ))
            )}
          </div>
        </Section>
      </Container>
    </main>
  );
}
