import { getSiteConfig, getFullMenu } from "../lib/site-data";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import SeoSchema from "./components/seo-schema";
import { phoneHref, whatsappHref } from "../lib/format";
import AnalyticsScripts from "./components/analytics-scripts";
import "./globals.css";
import Container from "./components/ui/container";
import Button from "./components/ui/button";

export const metadata = {
  metadataBase: new URL("https://coco-jar-site.vercel.app"),
  title: {
    template: "%s | Coco Jar Bistro",
    default: "Coco Jar — Restaurant Popești-Leordeni",
  },
  description:
    "Meniu complet, meniu zilei, evenimente și catering pentru Coco Jar Bistro din Popești-Leordeni.",
  keywords: [
    "Coco Jar",
    "restaurant Popești-Leordeni",
    "meniu zilei",
    "catering Popești-Leordeni",
    "cochinita",
  ],
  openGraph: {
    title: "Coco Jar Bistro",
    description: "Gust autentic, atmosferă primitoare.",
    type: "website",
    locale: "ro_RO",
    siteName: "Coco Jar",
    url: "https://coco-jar-site.vercel.app",
    images: [
      {
        url: "https://coco-jar-site.vercel.app/galerie/instagram-010-ff3cb9cdf0.jpg",
        width: 100,
        height: 100,
        alt: "Coco Jar logo",
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
      <body className="min-h-screen">
        <AnalyticsScripts />
        <SiteHeader config={config} />
        {children}
        <SiteFooter config={config} />
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line/85 bg-surface-base/98 px-3 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-xl shadow-[0_-8px_34px_rgba(0,0,0,0.3)] lg:hidden">
          <Container className="grid grid-cols-2 gap-3">
            <Button
              href={phoneHref(config.phone)}
              data-analytics="phone_click|conversion|telefon_floating"
              className="w-full text-sm sm:text-base"
            >
              Sună
            </Button>
            <Button
              variant="whatsapp"
              href={whatsappHref(config.whatsapp, config.phone)}
              data-analytics="whatsapp_click|conversion|whatsapp_floating"
              className="w-full text-sm sm:text-base"
            >
              WhatsApp
            </Button>
          </Container>
        </div>
      </body>
    </html>
  );
}
