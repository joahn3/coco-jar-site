import { getSiteConfig } from "../../lib/site-data";
import { phoneHref } from "../../lib/format";
import Container from "../components/ui/container";
import Card from "../components/ui/card";
import EventForm from "../components/event-form";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata = {
  title: "Evenimente private | Coco Jar Bistro",
  description:
    "Servicii pentru evenimente private: nuntă, botez, aniversări și team-building în atmosfera restaurantului Coco Jar, cu meniu la jar și servicii personalizate.",
};

export default async function EventPage() {
  const config = await getSiteConfig();

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
          <p className="mt-4 text-body text-ink-muted">
            La Coco Jar Bistro, transformăm întâlnirile speciale în amintiri frumoase. Fie că este vorba de o aniversare, o reuniune de familie, o petrecere restrânsă sau un eveniment special, punem la dispoziție un cadru primitor, preparate atent pregătite și o atmosferă potrivită pentru fiecare ocazie. Adaptăm experiența în funcție de preferințele tale pentru ca totul să fie exact cum îți dorești.
          </p>
          <p className="mt-4 text-body text-ink-muted">
            Pentru mai multe detalii despre evenimentele private și opțiunile disponibile, contactează-ne la:
          </p>
          <div className="jar-link-list">
            <p>
              <a className="jar-link touch-target" href={phoneHref(config.phone)}>
                {config.phone || "în curs de actualizare"}
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
            <h2 className="text-title-lg">Livrare și detalii</h2>
            <p className="text-sm text-ink-muted">
              Îți propunem meniul, condițiile de livrare, transportul și detaliile de buget prin formularul de mai jos.
            </p>
          </Card>
        </div>

        <EventForm />
      </Container>
    </main>
  );
}
