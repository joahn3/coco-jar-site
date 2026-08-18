import { getSiteConfig } from "../../lib/site-data";
import { phoneHref } from "../../lib/format";
import Link from "next/link";
import Container from "../components/ui/container";
import Card from "../components/ui/card";
import EventForm from "../components/event-form";
import Button from "../components/ui/button";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata = {
  title: "Evenimente private | Coco Jar Bistro",
  description:
    "Evenimente private la Coco Jar: nuntă, botez, aniversări, team-building. Pregătim pachete personalizate cu meniu la jar, organizare atentă și comunicare constantă.",
};

export default async function EventPage() {
    const config = await getSiteConfig();
	const phoneDisplay = config.phone || "la recepție";
	const eventProof = [
	  {
	    title: "Răspuns prioritar",
	    text: "Confirmarea preliminară vine de regulă în maxim 24 de ore.",
	  },
  {
    title: "Cadru premium",
	    text: "Cooperare pe număr invitați, interval de servire, meniu preferat și buget orientativ.",
	  },
	  {
	    title: "Transparență pachet",
	    text: "Include coordonare de bază, organizare logistică și suport punctual; orice excludere este menționată explicit.",
	  },
	  ];
	const eventTypes = [
	  "Nuntă, botez, aniversare",
	  "Reuniune de familie",
	  "Petrecere privată limitată",
	  "Eveniment corporate sau întâlnire de echipă",
	];
	const eventPackages = [
	  "Intim (20–40 persoane)",
	  "Premium (40–80 persoane)",
	  "Corporate (50+ persoane)",
	];
	const eventIncludes = [
	  "Meniu recomandat, adaptat formatului evenimentului",
	  "Coordonare logistică, propunere de program și suport de rezervare",
	  "Personal de servire și timp de întreținere dedicat pe interval",
	  "Nu include băuturi alcoolice, decorații tematice sau transport extern; acestea se discută separat.",
	];

    return (
      <main className="pb-28">
        <Container as="section" className="space-y-6 py-6">
          <Breadcrumbs
            items={[
              { label: "Acasă", href: "/" },
              { label: "Evenimente private", href: "/evenimente-catering" },
            ]}
          />
        <div>
	              <h1 className="text-display-md">Evenimente private</h1>
              <div className="jar-link-list mt-3">
              <p className="text-body text-ink-muted">
                Momentele speciale merită sărbătorite cu cei dragi, în jurul unei mese bune.
              </p>
            </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:max-w-2xl">
                <Button as="next-link" href="/contact" variant="primary" className="w-full sm:w-auto">
              Rezervă experiența privată
              </Button>
    <Button as="next-link" href="/meniu-zilei" variant="secondary" className="w-full sm:w-auto">
              Alege meniul potrivit pentru eveniment
            </Button>
          </div>
          <div className="jar-link-list mt-4">
            <p>
              <Link className="jar-link touch-target" href="/contact">
                Detalii complete despre serviciile de evenimente
              </Link>
            </p>
            <p>
              <a className="jar-link touch-target" href={phoneHref(config.phone)}>
                Rezervă direct prin telefon — {phoneDisplay}
              </a>
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {eventProof.map((item) => (
              <Card key={item.title} className="space-y-2">
                <p className="jar-badge jar-badge--subtle">{item.title}</p>
                <p className="text-sm text-ink-muted">{item.text}</p>
              </Card>
            ))}
          </div>
            <div className="jar-link-list mt-4">
              <p className="text-sm text-ink-muted">
                La Coco Jar Bistro, transformăm întâlnirile speciale în amintiri durabile. Fie că este vorba de o aniversare, o reuniune de familie, o petrecere restrânsă sau un eveniment corporate, pregătim o experiență deosebită pe parcursul serii.
              </p>
            </div>
          <div className="jar-link-list mt-4">
            <p className="jar-badge jar-badge--subtle">Calitatea întâlnirii tale contează în fiecare detaliu</p>
            <p className="text-sm text-ink-muted">
              Confirmăm disponibilitatea în medie în 24 de ore. Pentru serile aglomerate,
              recomandăm confirmare prealabilă cu minim 48 de ore.
            </p>
          </div>
            <div className="jar-link-list mt-4">
              <p className="text-sm text-ink-muted">
              Pentru detalii suplimentare despre oferta noastră de evenimente și pachete, contactează-ne direct:
              </p>
            </div>
          <div className="jar-link-list">
            <p>
              <a className="jar-link touch-target" href={phoneHref(config.phone)}>
                Confirmare disponibilitate eveniment — {phoneDisplay}
              </a>
            </p>
          </div>
          <div className="jar-link-list">
            <p className="text-sm text-ink-muted">Te așteptăm cu drag și grijă la fiecare detaliu.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <h2 className="text-title-lg">Tipuri evenimente</h2>
            <div className="jar-link-list mt-2">
              {eventTypes.map((item) => (
                <p key={item} className="text-sm text-ink-muted">
                  {item}
                </p>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-title-lg">Pachete</h2>
            <div className="jar-link-list mt-2">
              {eventPackages.map((item) => (
                <p key={item} className="text-sm text-ink-muted">
                  {item}
                </p>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-title-lg">Ce include pachetul</h2>
            <div className="jar-link-list mt-2">
              {eventIncludes.map((item) => (
                <p key={item} className="text-sm text-ink-muted">
                  {item}
                </p>
              ))}
            </div>
          </Card>
        </div>

        <EventForm />
      </Container>
    </main>
  );
}
