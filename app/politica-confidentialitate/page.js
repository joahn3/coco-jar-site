import Link from "next/link";
import Container from "../components/ui/container";
import Card from "../components/ui/card";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata = {
  title: "Politica de confidențialitate",
  description:
    "Cum tratăm datele personale pe site-ul Coco Jar.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "15 august 2026";

    return (
      <main className="pb-28">
        <Container as="section" className="space-y-5 py-6">
          <Breadcrumbs
            items={[
              { label: "Acasă", href: "/" },
              { label: "Politica de confidențialitate", href: "/politica-confidentialitate" },
            ]}
          />
          <div>
          <p className="jar-badge">Transparență &amp; calm</p>
          <h1 className="text-display-md">Politica de confidențialitate</h1>
          <p className="mt-2 jar-copy-sm">
            Ultima actualizare: {lastUpdated}. Protejăm datele tale personale prin prelucrare minimă, cu utilizare transparentă.
          </p>
        </div>

        <Card className="space-y-4">
          <section className="space-y-2">
            <h2 className="text-title-md">1. Ce date colectăm</h2>
            <p className="jar-copy-sm">
              Colectăm doar datele introduse voluntar prin formulare: nume, telefon, email (dacă e dat), și mesaj.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-title-md">2. Scopul folosirii</h2>
            <p className="jar-copy-sm">
              Folosim datele doar pentru a răspunde cererilor tale: rezervări, evenimente, mesaje de contact.
              Nu le folosim pentru profilare comercială.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-title-md">3. Timp de stocare</h2>
            <p className="jar-copy-sm">
              Datele sunt păstrate cât este necesar pentru administrarea solicitării și conform cerințelor legale.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-title-md">4. Drepturile tale</h2>
            <p className="jar-copy-sm">
              Poți cere accesul, ștergerea sau corectarea datelor prin mesaj direct. Pentru detalii complete, vezi pagina de contact.
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
