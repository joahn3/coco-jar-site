import { getSiteConfig } from "../../lib/site-data";
import Container from "../components/ui/container";
import Card from "../components/ui/card";
import Breadcrumbs from "../components/breadcrumbs";

export default async function AboutPage() {
  const config = await getSiteConfig();

    return (
      <main className="pb-28">
        <Container as="section" className="space-y-6 py-6">
          <Breadcrumbs
            items={[
              { label: "Acasă", href: "/" },
              { label: "Despre noi", href: "/despre-noi" },
            ]}
          />
          <div>
          <h1 className="text-display-md">Despre {config.siteName}</h1>
          <p className="jar-copy">
            La Coco Jar, fiecare vizită începe cu poftă și se termină cu dorința de a
            reveni. Am creat un loc cald, relaxat și primitor, unde mâncarea gustoasă
            se bucură de o atmosferă pe măsură.
          </p>
          <p className="mt-3 jar-copy">
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
            <p className="jar-copy-sm">
              Meniu transparent, răspuns pe canale directe și suport complet pentru cereri de
              evenimente sau catering.
            </p>
          </Card>
          <Card>
            <h2 className="text-title-lg">Valori</h2>
            <p className="jar-copy-sm">
              Igienă riguroasă, ingrediente atent alese, comunicare clară și punctualitate.
            </p>
          </Card>
          <Card>
            <h2 className="text-title-lg">Zona noastră</h2>
            <p className="jar-copy-sm">
              Prietenii locului sunt din Popești-Leordeni și împrejurimi.
            </p>
          </Card>
        </div>
      </Container>
    </main>
  );
}
