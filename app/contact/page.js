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
            <p className="mt-2 text-body text-ink-muted">
            Trimite cererea completă și primim un răspuns prioritar în maxim 30 de minute.
            Dacă ești la orar aglomerat sau ai grupul mare, îți fixăm opțiunea potrivită din prima variantă.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button as="next-link" href="/meniu-zilei" variant="secondary" className="w-full sm:w-auto">
              Vezi meniul zilei
            </Button>
            <Button href={phoneHref(config.phone)} className="w-full sm:w-auto">
              Confirmare prioritară prin telefon
            </Button>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {conversionSignals.map((item) => (
              <div key={item.label} className="rounded-lg border border-line-soft/80 bg-surface-base/75 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">{item.label}</p>
                <p className="mt-1 text-sm text-ink-title">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="jar-link-list">
	            <p>
	              <a
	                href={phoneHref(config.phone)}
	                data-analytics="phone_click|conversion|phone_contact|source=contact|journey=lead_capture|lead_type=reservation"
	                className="jar-link jar-link--text touch-target"
	              >
	                Rezervare prioritară pe telefon — {phoneDisplay}
	              </a>
	            </p>
            <p>
              <a
	                href={whatsappHref(config.whatsapp, config.phone)}
	                data-analytics="whatsapp_click|conversion|whatsapp_contact|source=contact|journey=lead_capture|lead_type=reservation"
	                className="jar-link jar-link--text touch-target"
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
                data-analytics="maps_click|conversion|google_maps_contact|source=contact|journey=information|lead_type=none"
                className="jar-link jar-link--text touch-target"
                target="_blank"
                rel="noreferrer"
              >
                Deschide pe hartă
              </a>
            </p>
          </div>
          <p>Adresă: {config.fullAddress}</p>
	        <p className="mt-2 text-sm text-ink-muted">Deschis: {config.hours}</p>
          <p className="mt-2 text-sm text-ink-muted">
            În orele de vârf, recomandăm rezervarea din timp pentru o experiență fără compromis.
          </p>
        </Card>

        <ContactForm />
      </Container>
    </main>
  );
}
