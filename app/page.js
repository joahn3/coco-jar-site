import Image from "next/image";
import Link from "next/link";
import {
  getSiteConfig,
  getCurrentDayKey,
  getDailyMenu,
  getDayLabel,
} from "../lib/site-data";
import { isMenuDayActive, mapHref, phoneHref, whatsappHref } from "../lib/format";
import galleryCatalog from "../data/galerie-atmosfera.json";
import Button from "./components/ui/button";
import Card from "./components/ui/card";
import Container from "./components/ui/container";
import Section from "./components/ui/section";

export const metadata = {
  title: "Coco Jar | Restaurant premium pui la jar în Popești-Leordeni",
  description:
    "La Coco Jar, atmosfera caldă și puiul la jar creează cadrul perfect pentru mesele de seară. Descoperă meniul zilnic, rezervări rapide și evenimente private.",
};

export default async function HomePage() {
  const config = await getSiteConfig();
  const dailyMenu = await getDailyMenu();
  const dayKey = getCurrentDayKey();
  const todayItems = Array.isArray(dailyMenu[dayKey]) ? dailyMenu[dayKey] : [];
  const isMenuActive = isMenuDayActive(config.menuValidUntilHour);
	const todayMenuLabel = getDayLabel(dayKey);
	const contactText = config.phone || "la recepție";
	const whatsappText = config.whatsapp || config.phone || "la recepție";
	const heroImage = "/galerie/instagram-011-47b855d73e.jpg";
	const galleryCount = Array.isArray(galleryCatalog) ? galleryCatalog.length : 0;
	const proofStack = [
		{
	  label: "Atmosferă verificată",
	  value: "sub 30 min",
	  description: "Rezervări confirmate printr-un flux prioritar, înainte de ora de vârf.",
	},
    {
      label: "Meniu la zi",
      value: `${todayItems.length || "—"} feluri`,
      description: isMenuActive
        ? "Actualizat până la ora 16:00, cu porții clare pentru seara de azi."
        : "Actualizare programată zilnic, după ora 16:00.",
    },
    {
      label: "Feedback verificabil",
      value: `${galleryCount} imagini`,
      description: "Colecție actualizată din locație, inclusiv terasă, grătar, preparate, evenimente.",
    },
  ];

	const trustSignals = [
    "Atmosferă: spațiu cald, servicii fără stres, timp de seară susținut.",
    "Preparat: pui la jar, porții constante, garnituri alese la comandă.",
    "Feedback: recenzii de profil, actualizări constante pe social.",
	];

	const experienceStories = [
    {
      title: "Terasă cu ritm lent",
      text: "Lumini calde, lemn natural și muzică discretă. Un loc unde poți sta până când seara și gustul se liniștesc.",
    },
    {
      title: "Evenimente private, atent calibrate",
      text: "Grupuri mici, aniversări, întâlniri private — totul pregătit cu timp de servire clar și atenție la detalii.",
    },
    {
      title: "Seri tematice",
      text: "Propunem combinații de preparate pentru momente speciale, cu aceeași calitate premium în orice seară.",
    },
	];

	const heroHighlights = [
    "Experiență de seară cu final clar",
    "Preparate la jar, gătite pentru o masă echilibrată",
    "Rezervare clară, fără pași inutili",
	];

  const reviewSignals = [
    {
      source: "Google Maps",
      title: "Recenzii active pe profil",
      text: "Afișăm recenziile din profilul public pentru verificare directă.",
      cta: "Vezi recenziile clienților",
      href: config.social?.googleBusiness || "#",
    },
    {
      source: "Instagram",
      title: "Conținut real din locație",
      text: "Actualizări periodice din restaurant, cu preparate și imagini de seară.",
      cta: "Vezi pagina Instagram",
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
                  <p className="jar-badge">Seara bună începe cu căldura unui loc gândit pentru oameni</p>
                  <h1 className="mt-2 text-display-2xl sm:text-display-xl">
                    Aici, puiul la jar și atmosfera se întâlnesc într-o experiență de seară clară, fără compromisuri.
                  </h1>
                  <p className="mt-3 max-w-3xl text-body-lg text-ink-title/90 prose-balance">
                    Primești un parcurs complet: rezervare prioritară, preparate la jar cu porție de seară și un spațiu menit pentru
                    conversații lungi, fără grabă și fără compromis pe calitate.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <Button
                      as="next-link"
                      href="/contact"
                      variant="primary"
                      data-analytics="click|conversion|rezervare_primara|source=home|journey=primary_cta|lead_type=reservation"
                      className="touch-target"
                    >
                      Rezervare prioritară
                    </Button>
                    <Button
                      as="next-link"
                      href="/meniu-zilei"
                      variant="secondary"
                      data-analytics="click|navigation|meniu_zilei_hero|source=home|journey=menu_cta|lead_type=menu"
                      className="touch-target"
                    >
                      Meniul zilei pentru azi
                    </Button>
                    <Button
                      as="next-link"
                      href="/evenimente-catering"
                      variant="ghost"
                      data-analytics="click|navigation|evenimente_hero|source=home|journey=exploration|lead_type=event"
                      className="touch-target"
                    >
                      Alege evenimentul tău
                    </Button>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Atmosferă premium, fără agitație",
                      "Preparat la jar, porție gândită pentru seară",
                      "Rezervare clară, confirmare rapidă",
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
          <p className="jar-badge">Restaurant de pui la jar</p>
          <p className="jar-badge">Atmosferă premium, ritm stabil</p>
          <h2 className="text-title-lg">Ce simte clientul când intră</h2>
          <p className="max-w-3xl text-body-lg text-ink-muted prose-balance">
            Loc cald, confortabil și atent, construit pentru o seară echilibrată: pregătire susținută, porții clare, fără zgomot de fond inutil.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            {heroHighlights.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-line-soft bg-surface-base/75 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.07em] text-ink-muted"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Meniu zilei: până la 16:00
            </p>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Telefon: {contactText}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Locație: {config.locality}
            </p>
          </div>
        </Card>

        <Card className="space-y-4 py-6 sm:py-7">
          <h2 className="text-title-lg">Rezervare pe acțiune</h2>
          <p className="text-sm text-ink-muted">Program: {config.hours}</p>
          <p className="text-sm text-ink-muted">
            Se recomandă planificare din timp la vârf de seară: confirmăm rapid preferințele de masă.
          </p>
          <div className="jar-link-list">
            <p>
              <a
                className="jar-link touch-target"
                aria-label={`Sună la ${config.phone || "numărul de telefon"} pentru rezervare`}
                href={phoneHref(config.phone)}
              >
                Rezervare telefonic: confirmare prioritară — {contactText}
              </a>
            </p>
            <p>
              <a
                className="jar-link touch-target"
                aria-label={`Deschide conversație pe WhatsApp ${config.whatsapp || config.phone || "la restaurant"} din pagina principală`}
                href={whatsappHref(config.whatsapp, config.phone, "Bună ziua, vreau mai multe detalii.")}
              >
                Confirmare prin WhatsApp: răspuns rapid — {whatsappText}
              </a>
            </p>
          </div>
          <p className="text-sm text-ink-muted">Adresa: {config.fullAddress}</p>
          <div className="jar-link-list">
            <p>
                <a
                  className="jar-link jar-link--text touch-target"
                  href={mapHref(config.siteName, config.fullAddress)}
                  data-analytics="maps_click|conversion|google_maps|source=home|journey=information|lead_type=site"
                  target="_blank"
                  rel="noreferrer"
                >
                  Deschide locația pe hartă
                </a>
            </p>
          </div>
        </Card>
      </Container>

      <Container as="section">
        <Section title="Indicatori de încredere" className="pb-4 pt-8">
          <div className="grid gap-3 sm:grid-cols-3">
            {proofStack.map((item) => (
              <Card key={item.label} className="space-y-2">
                <p className="jar-badge">{item.label}</p>
                <p className="text-title-lg text-ink-title">{item.value}</p>
                <p className="text-sm text-ink-muted">{item.description}</p>
              </Card>
            ))}
          </div>
        </Section>
      </Container>

      <Container as="section">
        <Section
          title="Experiențe"
          subtitle="Ce simte clientul în fiecare noapte, din seara de sâmbătă până în cea mai liniștită zi"
          className="pb-4 pt-2"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {experienceStories.map((item) => (
              <Card key={item.title} className="space-y-2">
                <h3 className="text-title-md">{item.title}</h3>
                <p className="text-sm text-ink-muted">{item.text}</p>
              </Card>
            ))}
          </div>
        </Section>
      </Container>

      <Container as="section">
        <Section
          title="3 argumente verificabile"
          subtitle="Atitudini pe care le poți confirma direct, nu promisiuni generice."
          className="pb-6 pt-8"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="space-y-3">
              <p className="trust-stat">Încredere</p>
              <h3 className="text-title-md">Atmosferă consistentă</h3>
              <ul className="space-y-2 text-sm text-ink-muted">
                {trustSignals.slice(0, 1).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-brand-500"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="space-y-3">
              <p className="trust-stat">Siguranță</p>
              <h3 className="text-title-md">Preparat verificat</h3>
              <ul className="space-y-2 text-sm text-ink-muted">
                {trustSignals.slice(1, 2).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 size-1.5 rounded-full bg-brand-500"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="space-y-3">
              <p className="trust-stat">Feedback</p>
              <h3 className="text-title-md">Recenzii și activitate reală</h3>
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
        <Section title="Rezervare directă și informații clare" className="md:col-span-2 xl:col-span-3 py-0">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h3 className="text-title-md">Telefon și WhatsApp</h3>
              <p className="text-sm text-ink-muted">
                Rezervare directă: {contactText}
              </p>
              <p className="text-sm text-ink-muted">Program: {config.hours}</p>
              <p className="text-xs text-ink-muted">Confirmare estimativă: în maxim 30 de minute (în interval de program)</p>
            </Card>
            <Card>
              <h3 className="text-title-md">Locație</h3>
              <p className="text-sm text-ink-muted">{config.fullAddress}</p>
              <p className="text-sm text-ink-muted">Popești-Leordeni, Ilfov</p>
            </Card>
            <Card>
              <h3 className="text-title-md">Evenimente și catering</h3>
              <p className="text-sm text-ink-muted">Nuntă, botez, aniversări, evenimente corporate.</p>
              <Link className="jar-link jar-link--text touch-target" href="/evenimente-catering">
                Cere o ofertă pentru evenimente
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
                  Meniul zilei este finalizat în acest moment. Reîncărcarea paginii aduce meniul actualizat al zilei.
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
