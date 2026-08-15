import { getSiteConfig } from "../../lib/site-data";
import Container from "../components/ui/container";
import Card from "../components/ui/card";

export default async function AboutPage() {
  const config = await getSiteConfig();

  return (
    <main className="pb-28">
      <Container as="section" className="space-y-6 py-6">
        <div>
          <h1 className="text-display-md">Despre {config.siteName}</h1>
          <p className="text-body-lg text-ink-muted">
            La Coco Jar, fiecare vizită începe cu poftă și se termină cu dorința de a
            reveni. Am creat un loc cald, relaxat și primitor, unde mâncarea gustoasă
            se bucură de o atmosferă pe măsură.
          </p>
          <p className="mt-3 text-body-lg text-ink-muted">
            Terasa noastră cu accente rustice, lemn natural, lumini calde și verdeață creează
            un spațiu intim și plăcut, perfect pentru o masă în familie, o ieșire cu
            prietenii sau câteva momente de relaxare după o zi aglomerată. Este genul de
            loc în care te așezi pentru o masă și ajungi să mai stai puțin, pentru că te
            simți bine.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <h2 className="text-title-lg">Ce oferim</h2>
            <p className="text-sm text-ink-muted">
              Meniu transparent, opțiuni rapide de contact și răspuns la cereri de
              evenimente / catering.
            </p>
          </Card>
          <Card>
            <h2 className="text-title-lg">Valori</h2>
            <p className="text-sm text-ink-muted">
              Igienă, ingrediente clare, comunicare rapidă, punctualitate.
            </p>
          </Card>
          <Card>
            <h2 className="text-title-lg">Zona noastră</h2>
            <p className="text-sm text-ink-muted">
              Servim clienți din Popești-Leordeni și împrejurimi.
            </p>
          </Card>
        </div>
      </Container>
    </main>
  );
}
