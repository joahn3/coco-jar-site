"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { phoneHref, whatsappHref } from "../../lib/format";
import Container from "./ui/container";
import Button from "./ui/button";

const NAV_LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/meniu", label: "Meniu a la carte" },
  { href: "/meniu-zilei", label: "Meniul zilei" },
  { href: "/galerie", label: "Galerie" },
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/evenimente-catering", label: "Evenimente și catering" },
  { href: "/contact", label: "Contact" },
];

const EVENING_HIGHLIGHTS = [
  { href: "/meniu", label: "Meniu a la carte, după gust" },
	  { href: "/meniu-zilei", label: "Meniul zilei" },
  { href: "/galerie", label: "Atmosferă autentică din restaurant" },
];

function MenuIcon({ open }) {
  return (
    <span className="relative block h-5 w-6" aria-hidden>
      <span
        className={`absolute left-0 right-0 top-0 h-0.5 rounded-full transition-all duration-300 ${
          open ? "translate-y-2 rotate-45 bg-brand-500" : "bg-ink-title"
        }`}
      />
      <span
        className={`absolute left-0 right-0 top-2 h-0.5 rounded-full transition-all duration-300 ${
          open ? "opacity-0" : "bg-ink-title"
        }`}
      />
      <span
        className={`absolute left-0 right-0 top-4 h-0.5 rounded-full transition-all duration-300 ${
          open ? "translate-y-[-10px] -rotate-45 bg-brand-500" : "bg-ink-title"
        }`}
      />
    </span>
  );
}

export default function SiteHeader({ config }) {
  const logoSrc = config?.social?.logo || "/images/logo-coco-jar.svg";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setIsHeaderScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const prevScrollY = window.scrollY;

    if (isMenuOpen) {
      body.dataset.cocoJarMenuScrollY = String(prevScrollY);
      body.style.position = "fixed";
      body.style.top = `-${prevScrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      body.style.overscrollBehavior = "none";
      html.style.overflow = "hidden";
    } else {
      const lastScrollY = Number(body.dataset.cocoJarMenuScrollY || "0");
      body.style.overflow = "";
      body.style.touchAction = "";
      body.style.overscrollBehavior = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      html.style.overflow = "";
      window.scrollTo(0, lastScrollY);
      delete body.dataset.cocoJarMenuScrollY;
    }

    return () => {
      body.style.overflow = "";
      body.style.touchAction = "";
      body.style.overscrollBehavior = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      html.style.overflow = "";
      if (body.dataset.cocoJarMenuScrollY) {
        const lastScrollY = Number(body.dataset.cocoJarMenuScrollY || "0");
        delete body.dataset.cocoJarMenuScrollY;
        window.scrollTo(0, lastScrollY);
      }
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="relative z-30 border-b border-[color:var(--ds-border)]/70 glass-shell glass-shell--header">
        <Container>
          <div className="flex items-center justify-between gap-3 py-3.5 md:py-4">
            <div className="flex min-w-0 items-center gap-3">
              <a href={config.social?.googleBusiness || "#"} aria-label="Vezi pe hartă" target="_blank" rel="noreferrer">
                <Image
                  className="rounded-xl"
                  src={logoSrc}
                  alt={`${config.siteName} logo`}
                  width={44}
                  height={44}
                  unoptimized
                />
              </a>
              <Link href="/" className="group min-w-0 truncate text-sm font-semibold text-ink-title sm:text-base">
                <span className="block sm:inline">{config.siteName}</span>
                <span className="block text-xs font-normal tracking-wide text-ink-muted sm:inline sm:text-[0.82rem]">
                  — {config.tagline}
                </span>
              </Link>
            </div>

            <div className="hidden w-full flex-wrap justify-end gap-2 md:flex md:w-auto">
              <Button
                href={phoneHref(config.phone)}
                data-analytics="phone_click|conversion|header_phone|source_page=global|journey_stage=lead_capture|lead_type=reservation"
                className="touch-target"
              >
                Sună
              </Button>
              <Button
                variant="whatsapp"
                href={whatsappHref(
                  config.whatsapp,
                  config.phone,
                  "Bună ziua, aș vrea detalii pentru o rezervare.",
                )}
                data-analytics="whatsapp_click|conversion|header_whatsapp|source_page=global|journey_stage=lead_capture|lead_type=whatsapp"
                className="touch-target"
              >
                WhatsApp
              </Button>
            </div>

            <button
              type="button"
              className={`group inline-flex h-11 w-11 items-center justify-center rounded-full border text-ink-title shadow-[0_14px_30px_rgba(82,42,16,.18)] transition-all duration-200 lg:hidden ${
                isHeaderScrolled
                  ? "border-brand-400/55 bg-surface-raised/85 backdrop-blur-xl shadow-[0_16px_30px_rgba(0,0,0,.28)]"
                  : "border-brand-500/30 bg-gradient-to-b from-brand-50/70 to-brand-100/35"
              }`}
              aria-label={isMenuOpen ? "Închide meniul" : "Deschide meniul"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <MenuIcon open={isMenuOpen} />
            </button>
          </div>

          <nav className="hidden pb-2 pt-1 lg:block" aria-label="Meniu principal">
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="shrink-0 touch-target inline-flex items-center justify-center rounded-full px-3.5 py-2 jar-copy-xs text-ink-muted transition-colors duration-200 hover:border-brand-500/55 hover:bg-brand-500/10 hover:text-ink-title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base sm:text-sm"
                    data-analytics={`click|navigation|header_nav_${item.href.replace(/\W+/g, "_").replace(/^_+|_+$/g, "")}|source_page=global|journey_stage=navigation|lead_type=site_nav`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </header>

      <div
        className={`fixed inset-0 z-20 bg-black/55 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
        onClick={closeMenu}
      />

        <div
          aria-hidden={!isMenuOpen}
          id="mobile-nav"
          className={`fixed inset-x-0 top-0 z-30 mt-[4.4rem] px-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
            isMenuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
        <div className="relative mx-auto w-full max-w-[calc(100%-1.2rem)] overflow-hidden rounded-[1.45rem] px-3 pb-4 pt-3 glass-shell glass-shell--mobile-drawer">
          <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1.5 bg-gradient-to-r from-transparent via-brand-400/75 to-transparent" />
          <span className="pointer-events-none absolute inset-0 opacity-45" aria-hidden>
            <span className="absolute left-[-20%] top-[-35%] h-[320px] w-[320px] rounded-full bg-brand-100/22 blur-[48px]" />
            <span className="absolute right-[-14%] bottom-[-25%] h-[240px] w-[240px] rounded-full bg-brand-500/10 blur-[42px]" />
            <span className="absolute inset-0 opacity-15 bg-[linear-gradient(140deg,rgba(255,255,255,0.4),rgba(255,248,240,0),rgba(0,0,0,0.1))]" />
          </span>
          <p className="jar-badge mb-3 w-full justify-center">Restaurant autentic de pui la jar</p>
          <nav aria-label="Meniu mobil">
            <ul className="relative grid gap-2">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="group relative flex items-center rounded-lg border border-[color:var(--ds-border)] bg-surface-panel/65 px-3.5 py-3 text-sm font-semibold text-ink-title transition-all duration-200 hover:border-brand-500/55 hover:bg-brand-500/12 hover:text-ink-title"
                    data-analytics={`click|navigation|mobile_nav_${item.href.replace(/\W+/g, "_").replace(/^_+|_+$/g, "")}|source_page=mobile|journey_stage=navigation|lead_type=site_nav`}
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-500/85 transition-all duration-200 group-hover:scale-125" />
                    <span className="ml-2.5">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 jar-soft-tile bg-surface-panel/45 p-2.5">
            <p className="jar-copy-xs jar-kicker">Recomandări premium</p>
            <ul className="mt-2 space-y-2">
              {EVENING_HIGHLIGHTS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-start gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-ink-muted transition-colors duration-200 hover:text-ink-title"
                  >
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-500/85 transition-colors duration-200 group-hover:bg-brand-400" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-3 flex gap-2 border-t border-[color:var(--ds-border)]/80 pt-3">
            <Button
              href={phoneHref(config.phone)}
              data-analytics="phone_click|conversion|mobile_nav_phone|source_page=mobile|journey_stage=lead_capture|lead_type=reservation"
              aria-label="Sună restaurantul"
              className="touch-target h-auto flex-1 justify-center bg-surface-base/95 py-2.5 text-xs font-semibold md:h-11"
            >
              <span className="hidden sm:inline">Sună</span>
              <span className="sm:hidden inline-flex items-center justify-center" aria-hidden="true">
                <span className="grid h-5 w-5 place-items-center rounded-full border border-current/65 text-xs font-semibold leading-none">
                  ☎
                </span>
              </span>
            </Button>
              <Button
                variant="whatsapp"
              href={whatsappHref(
                config.whatsapp,
                config.phone,
                  "Bună ziua, aș vrea detalii pentru o rezervare.",
                )}
                data-analytics="whatsapp_click|conversion|mobile_nav_whatsapp|source_page=mobile|journey_stage=lead_capture|lead_type=whatsapp"
                aria-label="Trimite mesaj pe WhatsApp"
                className="touch-target h-auto flex-1 justify-center py-2.5 text-xs font-semibold md:h-11"
              >
              <span className="hidden sm:inline">WhatsApp</span>
              <span className="sm:hidden inline-flex items-center justify-center" aria-hidden="true">
                <span className="grid h-5 w-5 place-items-center rounded-full border border-current/65 text-[0.52rem] font-bold leading-none">
                  WA
                </span>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
