import { getSiteConfig } from "../../lib/site-data";
import { phoneHref } from "../../lib/format";
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
	            <p className="text-body-lg text-ink">
	            Momentele speciale merită să fie sărbătorite cu cei dragi, în jurul unei mese bune.
	            </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:max-w-2xl">
                <Button as="next-link" href="/contact" variant="primary" className="w-full sm:w-auto">
              Rezervă experiența privată
              </Button>
    <Button as="next-link" href="/meniu-zilei" variant="secondary" className="w-full sm:w-auto">
              Alege meniul potrivit pentru eveniment
            </Button>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {eventProof.map((item) => (
              <Card key={item.title} className="space-y-2">
                <p className="jar-badge jar-badge--subtle">{item.title}</p>
                <p className="text-sm text-ink-muted">{item.text}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-body text-ink-muted">
            La Coco Jar Bistro, transformăm întâlnirile speciale în amintiri frumoase. Fie că este vorba de o aniversare, o reuniune de familie, o petrecere restrânsă sau un eveniment special, punem la dispoziție un cadru primitor, preparate atent pregătite și o atmosferă potrivită pentru fiecare ocazie. Adaptăm experiența în funcție de preferințele tale pentru ca totul să fie exact cum îți dorești.
          </p>
          <div className="jar-link-list mt-4">
            <p className="jar-badge jar-badge--subtle">Calitatea întâlnirii tale contează în fiecare detaliu</p>
            <p className="text-sm text-ink-muted">
              Confirmăm disponibilitatea în medie în 24 de ore. Pentru serile aglomerate,
              recomandăm confirmare prealabilă cu minim 48 de ore.
            </p>
          </div>
            <p className="mt-4 text-body text-ink-muted">
              Pentru detalii suplimentare despre oferta noastră de evenimente și pachete, contactează-ne direct:
            </p>
          <div className="jar-link-list">
            <p>
              <a className="jar-link touch-target" href={phoneHref(config.phone)}>
                Confirmare disponibilitate eveniment — {phoneDisplay}
              </a>
            </p>
          </div>
          <p className="text-body text-ink-muted">Te așteptăm cu drag!</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <h2 className="text-title-lg">Tipuri evenimente</h2>
            <p className="text-sm text-ink-muted">Nuntă, botez, aniversare, evenimente corporate, conferințe mici.</p>
          </Card>
          <Card>
            <h2 className="text-title-lg">Pachete</h2>
            <p className="text-sm text-ink-muted">
              Intim (20-40 pers), Premium (40-80 pers), Corporate (50+ pers).
            </p>
          </Card>
          <Card>
            <h2 className="text-title-lg">Ce include pachetul</h2>
            <p className="text-sm text-ink-muted">
              Meniu recomandat, coordonare logistică, propunere de program, suport de rezervare pe interval și personal de servire.
            </p>
            <p className="text-sm text-ink-muted mt-2">
              Ce nu include: băuturi alcoolice, decorații tematice și transport extern, acestea se discută explicit la ofertă.
            </p>
          </Card>
        </div>

        <EventForm />
      </Container>
    </main>
  );
}
