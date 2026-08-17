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
    "Rezervări premium la Coco Jar Bistro: confirmare rapidă, detalii clare pentru grupuri mici sau evenimente și echipă de servire cu atenție la detalii.",
};

export default async function ContactPage() {
	    const config = await getSiteConfig();
		const phoneDisplay = config.phone || "la recepție";
		const whatsappDisplay = config.whatsapp || config.phone || "la recepție";
  const conversionSignals = [
      {
      label: "Răspuns prioritar",
      text: "Confirmare inițială în cel mult 30 de minute, direct pentru cererile complete.",
    },
    {
      label: "Date clare din start",
      text: "Solicităm intervalul dorit, tipul vizitei și numărul de persoane, pentru un răspuns punctual.",
    },
    {
      label: "Confirmare personalizată",
      text: "Dacă rezervarea este complexă, îți revenim direct cu o propunere de echipare și program.",
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
          <h1 className="text-display-md">Rezervare fără pași inutili, cu confirmare clară</h1>
            <p className="mt-2 text-body text-ink-muted">
            Trimite cererea completă și îți oferim o confirmare prioritară în 30 de minute, ca să ai siguranța locului.
            Dacă ora e aglomerată sau ai un grup, îți fixăm oferta corect din prima, fără schimbări de ultim moment.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button as="next-link" href="/meniu-zilei" variant="secondary" className="w-full sm:w-auto">
              Vezi meniul zilei premium
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
              Locurile se ocupă repede: rezervă din timp, ideal la începutul programului.
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
            Se recomandă rezervarea din timp la intervale de vârf, mai ales pentru mese între 6 și 10 persoane.
          </p>
        </Card>

        <ContactForm />
      </Container>
    </main>
  );
}
