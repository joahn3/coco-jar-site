import { mapHref, phoneHref, whatsappHref } from "../../lib/format";
import { getSiteConfig } from "../../lib/site-data";
import Container from "../components/ui/container";
import Card from "../components/ui/card";
import ContactForm from "../components/contact-form";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata = {
  title: "Contact și rezervări | Coco Jar Bistro",
  description:
    "Rezervări premium la Coco Jar Bistro: confirmare rapidă, detalii clare pentru grupuri mici sau evenimente și echipă de servire cu atenție la detalii.",
};

export default async function ContactPage() {
  const config = await getSiteConfig();
  const conversionSignals = [
    {
      label: "Răspuns",
      text: "Maxim 30 minute în intervalul de program.",
    },
    {
      label: "Calibrare timp",
      text: "Îți cerem intervalul de oră și tipul vizitei, ca mesajul să fie relevant imediat.",
    },
    {
      label: "Confirmare",
      text: "Contactăm pentru detalii suplimentare doar dacă ai cerut o rezervare complexă.",
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
          <h1 className="text-display-md">Contact și rezervări premium</h1>
          <p className="mt-2 text-body text-ink-muted">
            Confirmăm rapid cererile clare: număr de persoane, interval dorit și tipul vizitei. Pentru evenimente complexe,
            îți vom trimite propunerea în cel mult o zi lucrătoare.
          </p>
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
                Telefon: {config.phone || "în curs de actualizare"}
              </a>
            </p>
            <p>
              <a
                href={whatsappHref(config.whatsapp, config.phone)}
                data-analytics="whatsapp_click|conversion|whatsapp_contact|source=contact|journey=lead_capture|lead_type=reservation"
                className="jar-link jar-link--text touch-target"
              >
                WhatsApp: {config.whatsapp || config.phone || "în curs de actualizare"}
              </a>
            </p>
            <p className="jar-badge jar-badge--subtle">Răspuns estimativ: max. 30 minute în intervalul de program</p>
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
          <p className="mt-2 text-sm text-ink-muted">Program zilnic: {config.hours}</p>
          <p className="mt-2 text-sm text-ink-muted">
            Se recomandă rezervarea la <strong>început de seară</strong> pentru mese de grup între 6 și 10 persoane.
          </p>
        </Card>

        <ContactForm />
      </Container>
    </main>
  );
}
