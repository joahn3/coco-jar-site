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

  const coreSignals = [
    {
      label: "Recenzii verificabile",
      value: "Google & Instagram",
      description: "Recenziile sunt publice, actuale și verificabile din profilurile noastre oficiale.",
    },
    {
      label: "Răspuns de rezervare",
      value: "sub 30 min",
      description: isMenuActive
        ? "Răspundem rapid pentru confirmare, mai ales în zilele active."
        : "Răspundem în fluxul de zi, prioritate pentru cererile complete.",
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
      text: "Lumini calde, lemn natural și muzică discretă. Un loc unde poți sta liniștit, de la lunch până la cină.",
    },
    {
      title: "Evenimente private, atent calibrate",
      text: "Grupuri mici, aniversări, întâlniri private — totul pregătit cu timp de servire clar și atenție la detalii.",
    },
    {
      title: "Seri tematice",
      text: "Propunem combinații de preparate pentru momente speciale, cu aceeași calitate premium în orice zi.",
    },
    {
      title: "Ambianță constantă",
      text: "Păstrăm ritmul potrivit între service, muzică și pregătire, indiferent de sezon sau vârf de program.",
    },
  ];

  const menuHighlights = [
    "Atmosferă relaxată, orientată spre rafinament",
    "Porții constante, gust consistent, servire atentă",
    "Rezervare clară, fără pași suplimentari",
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
    <main className="pb-40">
      <section className="relative">
        <Container as="section" className="py-5 md:py-7">
          <article className="jar-card grid gap-6 overflow-hidden rounded-[var(--ds-radius-2xl)] p-5 sm:p-7 md:grid-cols-[1.2fr_0.8fr] md:p-8">
            <div className="space-y-5">
              <p className="jar-badge hero-kicker">Când focul se aude blând, gustul devine memorabil</p>
              <h1 className="text-display-md sm:text-display-lg md:text-display-2xl">
                Coco Jar — pui la jar, meniul zilei și preparate la carte.
              </h1>
              <p className="text-balance jar-copy jar-kicker text-body-lg max-w-2xl">
                Zi de zi, aducem aceeași experiență constantă: atmosferă autentică, preparate
                atent gătite și servicii fără grabă.
              </p>
              <div className="hidden md:flex gap-2 md:flex-wrap">
                <Button as="next-link" href="/contact" variant="primary" className="touch-target w-full sm:w-auto">
                  Rezervă-ți masa
                </Button>
                <Button as="next-link" href="/meniu-zilei" variant="secondary" className="touch-target w-full sm:w-auto">
                  Explorează meniul zilei
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="jar-link-list p-4">
                <p className="jar-copy-xs jar-kicker">Informații utile</p>
                <p className="jar-copy-sm">Telefon: {contactText}</p>
                <p className="jar-copy-sm">WhatsApp: {whatsappText}</p>
                <p className="jar-copy-sm">Locație: {config.locality}</p>
                <p className="jar-copy-sm">Program: 10:00–22:00</p>
                <p className="jar-copy-sm">Meniu zilei: {isMenuActive ? "în curs" : menuWindowText}</p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Link href="/meniu" className="jar-link touch-target">
                  Vezi meniul complet
                </Link>
                <Link href="/evenimente-catering" className="jar-link touch-target">
                  Evenimente private
                </Link>
              </div>
            </div>
          </article>
        </Container>

        <div className="mobile-bottom-cta md:hidden" aria-label="Acțiuni rapide">
          <div className="mobile-bottom-cta__panel">
            <Button as="next-link" href="/contact" variant="primary" className="touch-target w-full">
              Rezervă-ți masa
            </Button>
            <Button as="next-link" href="/meniu-zilei" variant="secondary" className="touch-target w-full">
              Explorează meniul zilei
            </Button>
          </div>
        </div>
      </section>

      <Container as="section">
        <div className="bento-grid">
          <article className="jar-card md:col-span-8">
            <Section title="Cum te simți când intri la noi" subtitle="Atmosferă calmă, orientată pe confortul tău">
              <p className="jar-copy-sm">
                Loc cald, confortabil, orientat pe confortul tău: preparat constant, servicii la timp,
                fără agitație inutilă.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {menuHighlights.map((item) => (
                  <div key={item} className="jar-soft-tile p-3 text-xs font-semibold jar-kicker">
                    {item}
                  </div>
                ))}
              </div>
            </Section>
          </article>

          <article className="jar-card md:col-span-4">
            <Section title="Rezervare directă" subtitle="Răspuns clar, fără pași inutili">
              <div className="jar-link-list">
                <p>
                  <a
                    className="jar-link touch-target"
                    aria-label={`Sună la ${config.phone || "numărul de telefon"} pentru rezervare`}
                    href={phoneHref(config.phone)}
                  >
                    Rezervare pe telefon — confirmare prioritară: {contactText}
                  </a>
                </p>
                <p>
                  <a
                    className="jar-link touch-target"
                    aria-label={`Deschide conversație pe WhatsApp ${config.whatsapp || config.phone || "la restaurant"}`}
                    href={whatsappHref(config.whatsapp, config.phone, "Bună ziua, vreau mai multe detalii.")}
                  >
                    Confirmare prin WhatsApp — răspuns în timp real: {whatsappText}
                  </a>
                </p>
                <p>
                  <a className="jar-link touch-target" href={mapHref(config.siteName, config.fullAddress)}>
                    Deschide locația pe hartă
                  </a>
                </p>
              </div>
            </Section>
          </article>

          <div className="md:col-span-12">
            <Section title="Ce poți verifica înainte de a veni" subtitle="Indicatori clari, pentru o decizie sigură">
              <div className="bento-grid !grid">
                {coreSignals.map((item) => (
                  <Card key={item.label} className="md:col-span-4">
                    <p className="jar-badge">{item.label}</p>
                    <p className="text-title-md">{item.value}</p>
                    <p className="jar-copy-sm">{item.description}</p>
                  </Card>
                ))}
              </div>
            </Section>
          </div>

          <article className="jar-card md:col-span-12">
            <Section title="Experiențe verificate" subtitle="Ce simte clientul în fiecare zi">
              <div className="carousel-track mt-4 pb-1">
                {experienceStories.map((item) => (
                  <Card key={item.title} className="carousel-item">
                    <h3 className="text-title-md">{item.title}</h3>
                    <p className="jar-copy-sm">{item.text}</p>
                  </Card>
                ))}
              </div>
            </Section>
          </article>

          <article className="jar-card md:col-span-12">
            <Section title="Meniul zilei — astăzi" subtitle={`${todayMenuLabel} • ${isMenuActive ? "în curs de afișare" : menuWindowText}`}>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {!todayItems.length ? (
                  <Card className="md:col-span-3">
                    <p className="jar-copy-sm">
                      Meniul zilei e în curs de actualizare. Revenim imediat cu varianta completă pentru ziua de azi.
                    </p>
                  </Card>
                ) : (
                  todayItems.slice(0, 3).map((item) => (
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
                      <p className="jar-copy-sm">{item.description}</p>
                      <p className="font-semibold text-ink-title">{item.price || "—"}</p>
                    </Card>
                  ))
                )}
              </div>
            </Section>
          </article>

          <article className="jar-card md:col-span-12">
            <Section title="Recomandări din partea publicului" subtitle="Review-uri vizibile direct din canale oficiale">
              <div className="carousel-track mt-4 pb-1">
                {reviewSignals.map((review) => (
                  <article key={review.source} className="carousel-item space-y-2">
                    <p className="trust-stat">Recenzie {review.source}</p>
                    <p className="jar-copy-sm font-semibold">{review.title}</p>
                    <p className="jar-copy-xs">{review.text}</p>
                    <a href={review.href} className="jar-link touch-target">
                      {review.cta}
                    </a>
                  </article>
                ))}
              </div>
            </Section>
          </article>

          <article className="jar-card md:col-span-4">
            <Section
              title="Servicii principale"
              subtitle="Totul pentru o rezervare bună din prima"
            >
              <div className="grid gap-2">
                {trustSignals.map((item) => (
                  <p key={item} className="jar-copy-sm">
                    {item}
                  </p>
                ))}
              </div>
            </Section>
          </article>
          <article className="jar-card md:col-span-4">
            <Section title="Acoperire evenimente">
              <div className="jar-link-list">
                <p className="jar-copy-sm">Nuntă, botez, aniversări, evenimente corporate</p>
                <p>
                  <Link className="jar-link touch-target" href="/evenimente-catering">
                    Cere o ofertă pentru evenimente
                  </Link>
                </p>
              </div>
            </Section>
          </article>
          <article className="jar-card md:col-span-4">
            <Section title="Navigare rapidă">
              <div className="jar-link-list">
                <p>
                  <Link className="jar-link touch-target" href="/meniu-zilei">
                    Meniu zilei
                  </Link>
                </p>
                <p>
                  <Link className="jar-link touch-target" href="/meniu">
                    Meniu a la carte
                  </Link>
                </p>
                <p>
                  <a className="jar-link touch-target" href={phoneHref(config.phone)}>
                    Confirmare directă pe telefon
                  </a>
                </p>
              </div>
            </Section>
          </article>
        </div>
      </Container>
    </main>
  );
}
