import { mapHref, phoneHref, whatsappHref } from "../../lib/format";
import { getSiteConfig } from "../../lib/site-data";
import Container from "../components/ui/container";
import Card from "../components/ui/card";
import ContactForm from "../components/contact-form";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata = {
  title: "Contact și rezervări | Coco Jar Bistro",
  description:
    "Contactează restaurantul Coco Jar pentru rezervări, evenimente private sau întrebări. Găsești telefon, WhatsApp, adresă și program.",
};

export default async function ContactPage() {
  const config = await getSiteConfig();

    return (
      <main className="pb-28">
        <Container as="section" className="grid gap-5 py-6 lg:grid-cols-2">
          <Breadcrumbs
            items={[
              { label: "Acasă", href: "/" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <Card>
          <h1 className="text-display-md">Contact și rezervări</h1>
          <div className="jar-link-list">
            <p>
              <a
                href={phoneHref(config.phone)}
                data-analytics="phone_click|conversion|phone_contact"
                className="jar-link jar-link--text touch-target"
              >
                Telefon: {config.phone || "în curs de actualizare"}
              </a>
            </p>
            <p>
              <a
                href={whatsappHref(config.whatsapp, config.phone)}
                data-analytics="whatsapp_click|conversion|whatsapp_contact"
                className="jar-link jar-link--text touch-target"
              >
                WhatsApp: {config.whatsapp || config.phone || "în curs de actualizare"}
              </a>
            </p>
            <p>
              <a
                href={mapHref(config.siteName, config.fullAddress)}
                data-analytics="maps_click|conversion|google_maps_contact"
                className="jar-link jar-link--text touch-target"
                target="_blank"
                rel="noreferrer"
              >
                Deschide pe hartă
              </a>
            </p>
          </div>
          <p>Adresă: {config.fullAddress}</p>
          <p className="mt-2 text-sm text-ink-muted">Program zilnic: {config.hours}</p>
        </Card>

        <ContactForm />
      </Container>
    </main>
  );
}
