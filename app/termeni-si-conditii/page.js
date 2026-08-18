import Link from "next/link";
import Container from "../components/ui/container";
import Card from "../components/ui/card";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata = {
  title: "Termeni și condiții",
  description:
    "Termeni de utilizare pentru accesarea site-ului Coco Jar și pentru relația de comunicare cu restaurantul.",
};

export default function TermsPage() {
  const lastUpdated = "15 august 2026";

    return (
      <main className="pb-28">
        <Container as="section" className="space-y-5 py-6">
          <Breadcrumbs
            items={[
              { label: "Acasă", href: "/" },
              { label: "Termeni și condiții", href: "/termeni-si-conditii" },
            ]}
          />
          <div>
          <p className="jar-badge">Pui la jar, claritate din prima</p>
          <h1 className="text-display-md">Termeni și condiții</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Ultima actualizare: {lastUpdated}. Accesând acest site, ești de acord cu regulile de mai jos.
          </p>
        </div>

        <Card className="space-y-4">
          <section className="space-y-2">
            <h2 className="text-title-md">1. Scopul site-ului</h2>
            <p className="text-sm text-ink-muted">
              Informațiile de pe acest site descriu serviciile de ospitalitate ale Coco Jar: meniu,
              program, evenimente și contact. Toate detaliile sunt orientative și pot fi schimbate fără
              preaviz pentru sezonalitate sau disponibilitate.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-title-md">2. Comenzi și rezervări</h2>
            <p className="text-sm text-ink-muted">
              Rezervările se fac prin telefon, WhatsApp sau formularul de contact și se confirmă prin răspuns direct
              din partea echipei. Orele indicate trebuie tratate ca orientative pentru serviciul zilnic.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-title-md">3. Evenimente private</h2>
            <p className="text-sm text-ink-muted">
              Oferta pentru evenimente se construiește pe baza unui acord prealabil, număr persoane și
              preferințe alimentare. Orice ofertă transmisă poate fi ajustată în funcție de ziua aleasă.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-title-md">4. Contact</h2>
            <p className="text-sm text-ink-muted">
              Pentru nelămuriri, mergi la pagina sau sună direct la telefonul afișat.
            </p>
            <div className="jar-link-list">
            <p>
                <Link className="jar-link touch-target" href="/contact">
                  Pagina de contact
                </Link>
            </p>
            </div>
          </section>
        </Card>
      </Container>
    </main>
  );
}
