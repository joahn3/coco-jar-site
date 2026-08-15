import Image from "next/image";
import Link from "next/link";
import { phoneHref, whatsappHref } from "../../lib/format";
import Container from "./ui/container";
import Button from "./ui/button";

const NAV_LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/meniu", label: "Meniu" },
  { href: "/meniu-zilei", label: "Meniul zilei" },
  { href: "/galerie", label: "Galerie" },
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/evenimente-catering", label: "Evenimente + Catering" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader({ config }) {
  return (
    <header className="relative z-20 border-b border-line bg-surface-base/95 backdrop-blur-md">
      <Container>
        <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <a href={config.social?.googleBusiness || "#"} aria-label="Vezi pe hartă" target="_blank" rel="noreferrer">
              {config.social?.logo ? (
                <Image
                  className="rounded-xl border border-line/70 bg-surface-soft p-1"
                  src={config.social.logo}
                  alt={`${config.siteName} logo`}
                  width={44}
                  height={44}
                  unoptimized
                />
              ) : (
                <span className="inline-block size-3 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 shadow-[0_0_0_4px_rgba(255,204,102,0.2)]" />
              )}
            </a>
            <Link
              href="/"
              className="group min-w-0 truncate text-sm font-semibold text-ink-title sm:text-base"
            >
              <span className="block sm:inline">{config.siteName}</span>
              <span className="block text-xs font-normal tracking-wide text-ink-muted sm:inline sm:text-[0.82rem]">
                — {config.tagline}
              </span>
            </Link>
          </div>
          <div className="flex w-full flex-wrap gap-2 md:w-auto">
            <Button
              href={phoneHref(config.phone)}
              data-analytics="phone_click|conversion|telefon"
              className="touch-target"
            >
              {config.phone || "Telefon"}
            </Button>
            <Button
              variant="whatsapp"
              href={whatsappHref(
                config.whatsapp,
                config.phone,
                "Bună ziua, aș vrea detalii pentru o rezervare.",
              )}
              data-analytics="whatsapp_click|conversion|whatsapp"
              className="touch-target"
            >
              WhatsApp
            </Button>
          </div>
        </div>

        <nav className="pb-2 pt-1">
          <ul className="flex gap-2 overflow-x-auto pb-1 whitespace-nowrap sm:grid sm:grid-cols-2 sm:overflow-visible md:grid-cols-3 md:flex-wrap md:gap-2">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="shrink-0 touch-target inline-flex items-center justify-center rounded-full border border-transparent px-3.5 py-2 text-xs font-semibold text-ink-muted transition-colors duration-200 hover:border-brand-500/55 hover:bg-brand-500/10 hover:text-ink-title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base sm:text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
