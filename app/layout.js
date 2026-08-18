import { getSiteConfig, getFullMenu } from "../lib/site-data";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import SeoSchema from "./components/seo-schema";
import AnalyticsScripts from "./components/analytics-scripts";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
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
      </body>
    </html>
  );
}
