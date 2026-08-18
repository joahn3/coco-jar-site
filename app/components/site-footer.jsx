import Image from "next/image";
import Link from "next/link";
import Container from "./ui/container";

export default function SiteFooter({ config }) {
  const fbUrl = config.social?.facebook || "#";
  const instaUrl = config.social?.instagram || "#";

  return (
    <footer className="mt-10 border-t border-line/70 glass-shell glass-shell--footer py-8 text-sm text-ink-muted">
      <Container className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <div className="mb-1 flex items-center gap-2">
            {config.social?.logo ? (
              <Image
                src={config.social.logo}
                alt={`${config.siteName} logo`}
                width={34}
                height={34}
                unoptimized
                className="rounded-lg"
              />
            ) : null}
            <p className="font-semibold text-ink-title">
              {config.siteName} · {config.locality}
            </p>
          </div>
          <div className="jar-link-list">
            <p className="text-sm text-ink-muted">Deschis: {config.hours}</p>
            <p className="text-sm text-ink-muted">Adresă: {config.fullAddress}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-ink-title">Meniu și rezervări</p>
          <div className="jar-link-list">
            <p>
              <Link
                href="/termeni-si-conditii"
                className="jar-link touch-target"
                data-analytics="click|navigation|footer_terms|source_page=global|journey_stage=information|lead_type=site"
              >
                Termeni și condiții
              </Link>
            </p>
            <p>
              <Link
                href="/politica-confidentialitate"
                className="jar-link touch-target"
                data-analytics="click|navigation|footer_privacy|source_page=global|journey_stage=information|lead_type=site"
              >
                Politica de confidențialitate
              </Link>
            </p>
            <p>
              <Link
                href="/cookies"
                className="jar-link touch-target"
                data-analytics="click|navigation|footer_cookies|source_page=global|journey_stage=information|lead_type=site"
              >
                Politica cookie-urilor
              </Link>
            </p>
            <p>
              <a
                className="jar-link touch-target"
                href={config.social?.googleBusiness || "#"}
                target="_blank"
                rel="noreferrer"
                data-analytics="click|conversion|footer_google_maps|source_page=global|journey_stage=information|lead_type=site"
              >
                Google Maps
              </a>
            </p>
            <p>
              <Link
                href="/contact"
                className="jar-link touch-target"
                data-analytics="click|navigation|footer_contact|source_page=global|journey_stage=lead_capture|lead_type=reservation"
              >
                Contact
              </Link>
            </p>
            <p>
              <Link
                href="/meniu-zilei"
                className="jar-link touch-target"
                data-analytics="click|navigation|footer_daily_menu|source_page=global|journey_stage=menu_cta|lead_type=menu"
              >
                Meniul zilei
              </Link>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="jar-link-list">
            <p>
              <a
                href={fbUrl}
                className="jar-link touch-target"
                target="_blank"
                rel="noreferrer"
                data-analytics="click|navigation|footer_facebook|source_page=global|journey_stage=social|lead_type=site"
              >
                Facebook
              </a>
            </p>
            <p>
              <a
                href={instaUrl}
                className="jar-link touch-target"
                target="_blank"
                rel="noreferrer"
                data-analytics="click|navigation|footer_instagram|source_page=global|journey_stage=social|lead_type=site"
              >
                Instagram
              </a>
            </p>
            <p>
              <a
                href="/meniu/coco-jar-meniu-detaliat-2026-08-15.pdf"
                className="jar-link touch-target"
                data-analytics="click|navigation|footer_menu_pdf|source_page=global|journey_stage=menu_cta|lead_type=menu"
              >
                Meniu PDF
              </a>
            </p>
            <p>
              <Link
                href="/meniu"
                className="jar-link touch-target"
                data-analytics="click|navigation|footer_full_menu|source_page=global|journey_stage=menu_cta|lead_type=menu"
              >
                Meniu a la carte
              </Link>
            </p>
            <p>
              <Link
                href="/evenimente-catering"
                className="jar-link touch-target"
                data-analytics="click|navigation|footer_events|source_page=global|journey_stage=lead_capture|lead_type=event"
              >
                Evenimente și catering
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
