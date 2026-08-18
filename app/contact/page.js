import { mapHref, phoneHref, whatsappHref } from "../../lib/format";
import { getSiteConfig } from "../../lib/site-data";
import Container from "../components/ui/container";
import Card from "../components/ui/card";
import Button from "../components/ui/button";
import ContactForm from "../components/contact-form";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata = {
  title: "Contact și rezervări | Coco Jar Bistro",
  description:
    "Rezervări rapide la Coco Jar Bistro: confirmare clară, detalii complete și un răspuns personalizat pentru mesele de zi sau seară.",
};

export default async function ContactPage() {
	    const config = await getSiteConfig();
		const phoneDisplay = config.phone || "la recepție";
		const whatsappDisplay = config.whatsapp || config.phone || "la recepție";
  const conversionSignals = [
      {
      label: "Răspuns prioritar",
      text: "Răspundem de regulă în maxim 30 de minute, cu o propunere clară de orar.",
    },
    {
      label: "Date clare din start",
      text: "Avem nevoie de interval, tipul vizitei și numărul de persoane ca răspunsul să fie exact.",
    },
    {
      label: "Confirmare personalizată",
      text: "Pentru cereri complexe îți propunem direct o soluție de organizare clară.",
    },
  ];

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
          <h1 className="text-display-md">Rezervare clară, fără pași inutili</h1>
            <p className="mt-2 jar-copy">
            Trimite cererea completă și alegi între două direcții: meniul zilei sau preparatele a la carte.
            Echipa îți confirmă locul în maxim 30 de minute.
            Dacă ești la orar aglomerat sau ai grupul mare, îți fixăm opțiunea potrivită din prima variantă.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button
              as="next-link"
              href="/meniu-zilei"
              variant="secondary"
              data-analytics="click|navigation|contact_to_meniu_zilei|source_page=/contact|journey_stage=menu_cta|lead_type=menu"
              className="w-full sm:w-auto"
            >
              Vezi meniul zilei
            </Button>
            <Button
              href={phoneHref(config.phone)}
              data-analytics="phone_click|conversion|contact_phone_cta|source_page=/contact|journey_stage=lead_capture|lead_type=reservation"
              className="w-full sm:w-auto"
            >
              Confirmare prioritară prin telefon
            </Button>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {conversionSignals.map((item) => (
              <div key={item.label} className="jar-soft-tile bg-surface-card/85 p-3">
                <p className="jar-copy-xs jar-kicker">{item.label}</p>
                <p className="mt-1 jar-copy">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="jar-link-list">
            <p>
              <a
                href={phoneHref(config.phone)}
                data-analytics="phone_click|conversion|phone_contact|source_page=/contact|journey_stage=lead_capture|lead_type=reservation"
                className="jar-link touch-target"
              >
                Rezervare prioritară pe telefon — {phoneDisplay}
              </a>
            </p>
            <p>
              <a
                href={whatsappHref(config.whatsapp, config.phone)}
                data-analytics="whatsapp_click|conversion|whatsapp_contact|source_page=/contact|journey_stage=lead_capture|lead_type=reservation"
                className="jar-link touch-target"
              >
                Confirmare rapidă prin WhatsApp — {whatsappDisplay}
              </a>
            </p>
            <p className="jar-badge jar-badge--subtle">
              Locurile bune se ocupă repede; rezervă din timp, mai ales pe intervalele căutate.
            </p>
            <p>
              <a
                href={mapHref(config.siteName, config.fullAddress)}
                data-analytics="maps_click|conversion|google_maps_contact|source_page=/contact|journey_stage=information|lead_type=site"
                className="jar-link touch-target"
                target="_blank"
                rel="noreferrer"
              >
                Deschide pe hartă
              </a>
            </p>
          </div>
          <div className="jar-link-list mt-3">
            <p className="jar-copy-sm">Adresă: {config.fullAddress}</p>
            <p className="jar-copy-sm">Deschis: {config.hours}</p>
            <p className="jar-copy-sm">
              În orele de vârf, recomandăm rezervarea din timp pentru o experiență fără compromis.
            </p>
          </div>
        </Card>

        <ContactForm />
      </Container>
    </main>
  );
}
