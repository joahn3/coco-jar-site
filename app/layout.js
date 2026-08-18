import { getSiteConfig, getFullMenu } from "../lib/site-data";
import SiteHeader from "./components/site-header";
import SiteFooter from "./components/site-footer";
import SeoSchema from "./components/seo-schema";
import AnalyticsScripts from "./components/analytics-scripts";
import { Inter } from "next/font/google";
import "./globals.css";
import BackToTopButton from "./components/back-to-top-button";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://coco-jar-site.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Coco Jar Bistro | Restaurant premium de pui la jar",
    description:
      "Atmosferă caldă, preparate gătite la jar și un cadru premium pentru seri de neuitat.",
    type: "website",
    locale: "ro_RO",
    siteName: "Coco Jar",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/galerie/instagram-011-47b855d73e.jpg`,
        width: 1200,
        height: 630,
        alt: "Coco Jar Bistro, atmosferă de restaurant pui la jar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coco Jar Bistro | Restaurant premium de pui la jar",
    description:
      "Atmosferă caldă, preparate gătite la jar și un cadru premium pentru seri de neuitat.",
    images: [`${siteUrl}/galerie/instagram-011-47b855d73e.jpg`],
  },
};

export default async function RootLayout({ children }) {
  const config = await getSiteConfig();
  const fullMenu = await getFullMenu();

  return (
    <html lang="ro">
      <head>
        <SeoSchema config={config} menu={fullMenu} />
        <script
          id="theme-bootstrap"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const storedTheme = window.localStorage.getItem("coco-jar-theme");
                  if (storedTheme === "light" || storedTheme === "dark") {
                    document.documentElement.setAttribute("data-theme", storedTheme);
                    return;
                  }
                  document.documentElement.removeAttribute("data-theme");
                } catch {
                  return;
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} min-h-screen antialiased`}>
        <AnalyticsScripts />
        <SiteHeader config={config} />
        {children}
        <SiteFooter config={config} />
        <BackToTopButton />
      </body>
    </html>
  );
}
