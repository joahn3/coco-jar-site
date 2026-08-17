import Container from "../components/ui/container";
import Card from "../components/ui/card";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata = {
  title: "Politica cookies",
  description: "Informații despre modul de utilizare a cookie-urilor pe site-ul Coco Jar.",
};

export default function CookiesPage() {
  const lastUpdated = "15 august 2026";

    return (
      <main className="pb-28">
        <Container as="section" className="space-y-5 py-6">
          <Breadcrumbs
            items={[
              { label: "Acasă", href: "/" },
              { label: "Politica cookies", href: "/cookies" },
            ]}
          />
          <div>
          <p className="jar-badge">Mai puțin zgomot, mai multă discreție</p>
          <h1 className="text-display-md">Politica de utilizare a cookie-urilor</h1>
          <p className="mt-2 text-sm text-ink-muted">
            Ultima actualizare: {lastUpdated}.
          </p>
        </div>

        <Card className="space-y-4">
          <section className="space-y-2">
            <h2 className="text-title-md">Ce folosim noi pe site</h2>
            <p className="text-sm text-ink-muted">
              Folosim cookie-uri strict necesare pentru funcționare stabilă: navigare rapidă, securitate
              și o experiență constantă.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-title-md">Ce opțiuni ai</h2>
            <p className="text-sm text-ink-muted">
              Poți controla aceste setări din browserul tău. Unele funcții pot fi limitate dacă sunt dezactivate.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-title-md">Modificări</h2>
            <p className="text-sm text-ink-muted">
              Politica poate fi actualizată periodic. Orice modificare este publicată aici.
            </p>
          </section>
        </Card>
      </Container>
    </main>
  );
}
