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

export const metadata = {
  title: "Coco Jar | Restaurant de pui la jar în Popești-Leordeni",
  description:
    "La Coco Jar ai două opțiuni clare: meniul zilei pentru o masă echilibrată, de la început la final, și preparatele a la carte din restaurant.",
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
	const menuWindowText = `Meniul zilei: 10:00–${config.menuValidUntilHour || "16:00"}`;
	const operatingHoursText = "Deschis: 10:00–22:00";
	const heroImage = "/galerie/instagram-011-47b855d73e.jpg";
	const proofStack = [
		{
	  label: "Recenzii verificabile",
	  value: "Google & Instagram",
	  description:
	    "Recenziile sunt publice, actuale și pot fi verificate din profilurile noastre oficiale.",
	},
    {
      label: "Răspuns de rezervare",
      value: "sub 30 min",
      description: isMenuActive
        ? "Răspunsul inițial vine rapid pentru confirmare, în zilele active."
        : "Răspundem pe fluxul de zi, cu prioritate pentru cererile complete.",
    },
    {
      label: "Acoperire evenimente",
      value: "4 tipuri principale",
      description: "Aniversări, reuniuni, evenimente corporate și întâlniri private, cu echipare adaptată.",
    },
  ];

	const trustSignals = [
    "Atmosferă: spațiu cald, serviciu fără presiune și atenție la detaliu.",
    "Preparat: pui la jar, porții constante, garnituri atent alese.",
    "Feedback: recenzii autentice de la clienți reali, nu promisiuni goale.",
	];

	const experienceStories = [
    {
      title: "Terasă cu ritm lent",
      text: "Lumini calde, lemn natural și muzică discretă. Un loc unde poți sta liniștit, de la lunch până la cină, fără grabă.",
    },
    {
      title: "Evenimente private, atent calibrate",
      text: "Grupuri mici, aniversări, întâlniri private — totul pregătit cu timp de servire clar și atenție la detalii.",
    },
    {
      title: "Seri tematice",
      text: "Propunem combinații de preparate pentru momente speciale, cu aceeași calitate premium în orice zi.",
    },
	];

	const heroHighlights = [
    "Atmosferă calmă, lumină caldă, muzică discretă",
    "Porții constante, gust consistent, servire atentă",
    "Rezervare directă, fără pași suplimentari",
	];

  const reviewSignals = [
		{
	  		source: "Google Maps",
	  	title: "Recenzii active pe profil",
	  	text: "Vezi ce spun clienții noștri în profilurile publice Google.",
	  	cta: "Vezi recenziile clienților",
	  	href: config.social?.googleBusiness || "#",
	 	},
    {
      source: "Instagram",
      title: "Conținut real din locație",
      text: "Actualizări periodice din restaurant, cu preparate și imagini din sala de zi.",
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
          <Container className="relative z-10 py-4 sm:py-6 md:py-10">
            <div className="glass-panel glass-panel--hero relative z-10 rounded-[1.35rem] p-4 sm:p-6 md:p-8">
            <div className="hero-copy-grid flex flex-col gap-3 md:grid md:grid-cols-[1fr_auto] md:items-end md:gap-8">
                <div className="max-w-2xl space-y-3 sm:space-y-4">
                  <p className="jar-badge hero-kicker">Când focul se aude blând, gustul devine memorabil</p>
                  <h1 className="text-display-sm sm:text-display-xl md:text-display-2xl">
                    Coco Jar — pui la jar, meniul zilei și preparate la carte.
                  </h1>
                  <p className="max-w-xl text-sm sm:text-base text-ink-title/90">
                    Zi de zi, aducem aceeași experiență constantă: atmosferă autentică, preparate la jar și servicii fără grabă.
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <Button
                      as="next-link"
                      href="/contact"
                      variant="primary"
                      data-analytics="click|conversion|rezervare_primara|source_page=/|journey_stage=primary_cta|lead_type=reservation"
                      className="touch-target w-full min-h-11 text-sm sm:text-base"
                    >
                      Rezervă-ți masa
	                    </Button>
	                    <Button
                      as="next-link"
                      href="/meniu-zilei"
                      variant="secondary"
                      data-analytics="click|navigation|meniu_zilei_hero|source_page=/|journey_stage=menu_cta|lead_type=menu"
                      className="touch-target w-full min-h-11 text-sm sm:text-base"
                      >
                      Explorează meniul zilei
		                    </Button>
                  </div>

	                  <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
	                    {[
                      "Meniu zilei și a la carte",
                      "Atmosferă relaxată, orientată spre rafinament",
                      "Rezervare clară, fără pași suplimentari",
	                    ].map((badge) => (
	                      <span key={badge} className="jar-chip text-[0.74rem]">
	                        {badge}
	                      </span>
	                    ))}
                  </div>
                </div>

                <div className="hero-ambiance__logo-wrap self-start md:self-end">
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
          <p className="jar-badge">Atmosferă naturală, relaxată, autentică</p>
          <h2 className="text-title-lg">Cum te simți când intri la noi</h2>
          <p className="max-w-3xl text-body-lg text-ink-muted prose-balance">
            Loc cald, confortabil, orientat pe confortul tău: preparat constant, servicii la timp, fără agitație inutilă.
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
          <div className="jar-link-list">
            <p>
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                {operatingHoursText}
              </span>
            </p>
            <p>
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Telefon: {contactText}
              </span>
            </p>
            <p>
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Locație: {config.locality}
              </span>
            </p>
          </div>
        </Card>

        <Card className="space-y-4 py-6 sm:py-7">
          <h2 className="text-title-lg">Rezervare directă</h2>
          <div className="jar-link-list">
            <p className="text-sm text-ink-muted">
              Pentru intervalele aglomerate, recomandăm rezervare din timp. Confirmăm rapid preferințele tale.
            </p>
            <p>
              <a
                className="jar-link touch-target"
                aria-label={`Sună la ${config.phone || "numărul de telefon"} pentru rezervare`}
                href={phoneHref(config.phone)}
                data-analytics="phone_click|conversion|home_phone|source_page=/|journey_stage=lead_capture|lead_type=reservation"
              >
                Rezervare pe telefon — confirmare prioritară: {contactText}
              </a>
            </p>
            <p>
              <a
                className="jar-link touch-target"
                aria-label={`Deschide conversație pe WhatsApp ${config.whatsapp || config.phone || "la restaurant"} din pagina principală`}
                href={whatsappHref(config.whatsapp, config.phone, "Bună ziua, vreau mai multe detalii.")}
                data-analytics="whatsapp_click|conversion|home_whatsapp|source_page=/|journey_stage=lead_capture|lead_type=whatsapp"
              >
                Confirmare prin WhatsApp — răspuns în timp real: {whatsappText}
              </a>
            </p>
            <p className="text-sm text-ink-muted">Adresa: {config.fullAddress}</p>
            <p>
              <a
                className="jar-link touch-target"
                href={mapHref(config.siteName, config.fullAddress)}
                data-analytics="maps_click|conversion|google_maps|source_page=/|journey_stage=information|lead_type=site"
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
        <Section
          title="Ce poți verifica înainte de a veni"
          subtitle="Indicatori clari, ca să ai încredere completă în alegere"
          className="pb-4 pt-8"
        >
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
          subtitle="Ce simte clientul în fiecare zi, de luni până în cea mai liniștită zi de odihnă"
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
          title="Ceea ce poți verifica înainte de a veni"
          subtitle="Rezervare clară, feedback real și evenimente pregătite profesionist."
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
                      className="jar-link touch-target"
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
              <div className="jar-link-list">
                <p className="text-sm text-ink-muted">Rezervare directă: {contactText}</p>
                <p className="text-sm text-ink-muted">{operatingHoursText}</p>
                <p className="text-xs text-ink-muted">Confirmare estimativă: în maxim 30 de minute (în interval de program)</p>
              </div>
            </Card>
            <Card>
              <h3 className="text-title-md">Locație</h3>
              <div className="jar-link-list">
                <p className="text-sm text-ink-muted">{config.fullAddress}</p>
                <p className="text-sm text-ink-muted">Popești-Leordeni, Ilfov</p>
              </div>
            </Card>
            <Card>
              <h3 className="text-title-md">Evenimente și catering</h3>
              <div className="jar-link-list">
                <p className="text-sm text-ink-muted">Nuntă, botez, aniversări, evenimente corporate.</p>
                <p>
                  <Link className="jar-link touch-target" href="/evenimente-catering">
                    Cere o ofertă pentru evenimente
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </Section>
      </Container>

      <Container as="section">
        <Section
          title={`Meniul zilei — ${todayMenuLabel} (experiență completă)`}
          subtitle={isMenuActive ? "" : menuWindowText}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {!todayItems.length ? (
              <Card className="md:col-span-2 xl:col-span-3">
                <p className="text-sm text-ink-muted">
                  Meniul zilei e în curs de actualizare. Revenim imediat cu varianta completă pentru ziua de azi.
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
