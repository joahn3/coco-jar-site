import { getSiteConfig, getFullMenu } from "../lib/site-data";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import SeoSchema from "./components/seo-schema";
import { phoneHref, whatsappHref } from "../lib/format";
import AnalyticsScripts from "./components/analytics-scripts";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Container from "./components/ui/container";
import Button from "./components/ui/button";
import BackToTopButton from "./components/back-to-top-button";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://coco-jar-site.vercel.app"),
  title: {
    template: "%s | Coco Jar Bistro",
    default: "Coco Jar Bistro | Restaurant premium de pui la jar în Popești-Leordeni",
  },
  description:
    "Coco Jar Bistro – experiență premium de pui la jar, cu atmosferă caldă, preparate atent gătite și rezervări rapide.",
  keywords: [
    "Coco Jar",
    "restaurant Popești-Leordeni",
    "meniu zilei",
    "catering Popești-Leordeni",
    "pui la jar",
    "grătar",
    "restaurant cu terasă",
  ],
  openGraph: {
    title: "Coco Jar Bistro | Restaurant premium de pui la jar",
    description:
      "Atmosferă caldă, preparate gătite la jar și un cadru premium pentru seri de neuitat.",
    type: "website",
    locale: "ro_RO",
    siteName: "Coco Jar",
    url: "https://coco-jar-site.vercel.app",
    images: [
      {
        url: "https://coco-jar-site.vercel.app/galerie/instagram-011-47b855d73e.jpg",
        width: 1200,
        height: 630,
        alt: "Coco Jar Bistro, atmosferă de restaurant pui la jar",
      },
    ],
  },
};

export default async function RootLayout({ children }) {
  const config = await getSiteConfig();
  const fullMenu = await getFullMenu();

  return (
    <html lang="ro">
      <head>
        <SeoSchema config={config} menu={fullMenu} />
      </head>
      <body className={`${manrope.variable} ${playfair.variable} min-h-screen`}>
        <AnalyticsScripts />
        <SiteHeader config={config} />
        {children}
        <SiteFooter config={config} />
        <BackToTopButton />
        <div className="floating-cta-bar fixed inset-x-0 bottom-0 z-40 lg:hidden">
          <Container className="floating-cta-shell grid h-full grid-cols-2 gap-2">
            <Button
              href={phoneHref(config.phone)}
              data-analytics="phone_click|conversion|floating_phone|source=global|journey=lead_capture|lead_type=reservation"
              aria-label={`Sună la ${config.phone || "restaurantul"}`}
              className="floating-cta-button w-full justify-center gap-2"
            >
              <span className="floating-cta-icon" aria-hidden="true">
                ☎
              </span>
              <span className="floating-cta-label">Sună</span>
            </Button>
            <Button
              variant="whatsapp"
              href={whatsappHref(config.whatsapp, config.phone)}
              data-analytics="whatsapp_click|conversion|floating_whatsapp|source=global|journey=lead_capture|lead_type=whatsapp"
              aria-label={`Trimite mesaj pe WhatsApp la ${config.whatsapp || config.phone || "restaurant"}`}
              className="floating-cta-button w-full justify-center gap-2"
            >
              <span className="floating-cta-icon" aria-hidden="true">
                WA
              </span>
              <span className="floating-cta-label">WhatsApp</span>
            </Button>
          </Container>
        </div>
      </body>
    </html>
  );
}
