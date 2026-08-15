import Image from "next/image";
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
  const heroImage = "/galerie/instagram-011-47b855d73e.jpg";

  const trustSignals = [
    "Program clar: ziua 10:00–16:00, seara 16:00–22:00",
    "Terasă intimă, luminată cald, perfectă pentru o ieșire fără grabă",
    "Răspuns rapid pe telefon și WhatsApp",
    "Meniul zilei actualizat zilnic, cu limită de 16:00",
  ];

  const safetySignals = [
    "Prezentare clară pe categorii și alergeni",
    "Pregătire atentă pentru o experiență de servire calmă",
    "Comunicare transparentă pentru evenimente + catering",
    "Opțiuni directe pentru rezervare în timp real",
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
    <main className="pb-28">
      <section className="relative isolate overflow-hidden">
        <div className="hero-ambiance">
          <Image
            src={heroImage}
            alt="Terasa și atmosfera din restaurantul Coco Jar"
            fill
            priority
            sizes="100vw"
            className="hero-ambiance__image"
          />
          <div className="hero-ambiance__overlay" />
          <div className="hero-ambiance__grain" />
          <Container className="relative z-10 py-8 md:py-10">
            <div className="glass-panel glass-panel--hero relative z-10 rounded-[1.55rem] p-4 sm:p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end md:gap-8">
                <div className="max-w-2xl">
                  <p className="jar-badge">La Coco Jar, fiecare vizită începe cu poftă</p>
                  <h1 className="mt-2 text-display-2xl sm:text-display-xl">
                    Te așteaptă o seară caldă, cu atmosferă autentică și mâncare gustoasă.
                  </h1>
                  <p className="mt-3 max-w-3xl text-body-lg text-ink-title/90 prose-balance">
                    Terasa cu accente rustice, lemn natural, lumini calde și verdeață creează un spațiu intim și plăcut,
                    exact cum îți place pentru o masă în familie sau cu prietenii.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <Button
                      as="next-link"
                      href="/meniu-zilei"
                      data-analytics="click|navigation|meniu_zilei_hero"
                      className="touch-target"
                    >
                      Meniul zilei
                    </Button>
                    <Button
                      href={whatsappHref(config.whatsapp, config.phone)}
                      variant="whatsapp"
                      data-analytics="whatsapp_click|conversion|whatsapp_hero"
                      className="touch-target"
                    >
                      Rezervare rapidă
                    </Button>
                    <Button
                      as="next-link"
                      href="/galerie"
                      variant="ghost"
                      data-analytics="click|navigation|galerie_hero"
                      className="touch-target"
                    >
                      Atmosfera noastră
                    </Button>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Meniu clar, fără pași grei",
                      "Pregătiri de la grătar",
                      "Locație prietenoasă, ușor de ajuns",
                    ].map((badge) => (
                      <span key={badge} className="jar-chip">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hero-ambiance__logo-wrap">
                  {config.social?.logo ? (
                    <Image
                      className="hero-ambiance-logo"
                      src={config.social.logo}
                      alt={`${config.siteName} logo`}
                      width={88}
                      height={88}
                      unoptimized
                    />
                  ) : (
                    <div className="hero-ambiance-logo hero-ambiance-logo--fallback" aria-hidden="true">
                      CJ
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      <Container
        as="section"
        className="grid gap-4 pt-4 md:gap-6 lg:grid-cols-[1.35fr_0.92fr] lg:gap-6"
      >
        <Card className="space-y-6 py-6 sm:py-7">
          <p className="jar-badge">Atmosferă + mâncare bună</p>
          <h2 className="text-title-lg">O experiență gândită pentru răgaz</h2>
          <p className="max-w-3xl text-body-lg text-ink-muted prose-balance">
            Un loc cald, relaxat și primitor unde te așezi cu poftă, savurezi un preparat bun și ai chef să te mai oprești puțin.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
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
          <p className="text-sm text-ink-muted">Orar: {config.hours}</p>
          <div className="jar-link-list">
            <p>
              <a
                className="jar-link touch-target"
                href={phoneHref(config.phone)}
              >
                Telefon: {config.phone || "de completat"}
              </a>
            </p>
            <p>
              <a
                className="jar-link touch-target"
                href={whatsappHref(config.whatsapp, config.phone, "Bună ziua, vreau mai multe detalii.")}
              >
                WhatsApp: {config.whatsapp || "de completat"}
              </a>
            </p>
          </div>
          <p className="text-sm text-ink-muted">Adresă: {config.fullAddress}</p>
          <div className="jar-link-list">
            <p>
            <a
                className="jar-link jar-link--text touch-target"
                href={mapHref(config.siteName, config.fullAddress)}
                data-analytics="maps_click|conversion|google_maps"
                target="_blank"
                rel="noreferrer"
              >
                Deschide pe hartă
              </a>
            </p>
          </div>
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
                      className="jar-link jar-link--text touch-target"
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
              <Link className="jar-link jar-link--text touch-target" href="/evenimente-catering">
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
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={640}
                      height={360}
                      className="mx-auto w-full rounded-lg object-cover"
                    />
                  ) : null}
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
