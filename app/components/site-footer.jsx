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
          <p className="text-ink-title">Deschis: {config.hours}</p>
          <p>Adresă: {config.fullAddress}</p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold text-ink-title">Meniu și rezervări</p>
          <div className="jar-link-list">
            <p>
              <Link href="/termeni-si-conditii" className="jar-link jar-link--text touch-target">
                Termeni și condiții
              </Link>
            </p>
            <p>
              <Link href="/politica-confidentialitate" className="jar-link jar-link--text touch-target">
                Politica de confidențialitate
              </Link>
            </p>
            <p>
              <Link href="/cookies" className="jar-link jar-link--text touch-target">
                Politica cookie-urilor
              </Link>
            </p>
            <p>
              <a
                className="jar-link jar-link--text touch-target"
                href={config.social?.googleBusiness || "#"}
                target="_blank"
                rel="noreferrer"
              >
                Google Maps
              </a>
            </p>
            <p>
              <Link href="/contact" className="jar-link jar-link--text touch-target">
                Contact
              </Link>
            </p>
            <p>
              <Link href="/meniu-zilei" className="jar-link jar-link--text touch-target">
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
                className="jar-link jar-link--text touch-target"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </p>
            <p>
              <a
                href={instaUrl}
                className="jar-link jar-link--text touch-target"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </p>
            <p>
              <a
                href="/meniu/coco-jar-meniu-detaliat-2026-08-15.pdf"
                className="jar-link jar-link--text touch-target"
              >
                Meniu PDF
              </a>
            </p>
            <p>
              <Link href="/meniu" className="jar-link jar-link--text touch-target">
                Meniu a la carte
              </Link>
            </p>
            <p>
              <Link href="/evenimente-catering" className="jar-link jar-link--text touch-target">
                Evenimente și catering
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
