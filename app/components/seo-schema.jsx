import { getSiteUrl, sanitizeJsonLdText, toAbsoluteUrl } from "../../lib/seo-jsonld";
import JsonLdScript from "./jsonld-script";

export default function SeoSchema({ config, menu }) {
  const siteUrl = getSiteUrl();

  const addressParts = (config.fullAddress || "").split(",");
  const [street = "", locality = "", region = "", postalCode = ""] = addressParts
    .map((value) => sanitizeJsonLdText(value.trim()))
    .concat(["", "", "", ""]);

  const siteName = sanitizeJsonLdText(config.siteName || "Coco Jar");
  const tagline = sanitizeJsonLdText(config.tagline || "");
  const openingHours = sanitizeJsonLdText(config.hours || "10:00–22:00");
  const localCuisine = "Romanian";
  const logo = toAbsoluteUrl(config.social?.logo);

  const address = {
    "@type": "PostalAddress",
    streetAddress: street,
    addressLocality: locality || sanitizeJsonLdText(config.locality),
    addressRegion: region || "Ilfov",
    postalCode,
    addressCountry: "RO",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo,
    description: tagline,
    sameAs: [
      sanitizeJsonLdText(config.social?.facebook),
      sanitizeJsonLdText(config.social?.instagram),
      sanitizeJsonLdText(config.social?.googleBusiness),
    ].filter(Boolean),
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
    },
  };

  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteName,
    description: tagline,
    telephone: sanitizeJsonLdText(config.phone),
    url: siteUrl,
    image: logo,
    servesCuisine: localCuisine,
    priceRange: "$$",
    address,
    openingHours: [sanitizeJsonLdText(`Mo-Su ${openingHours.replace("–", "-")}`)],
    sameAs: [
      sanitizeJsonLdText(config.social?.facebook),
      sanitizeJsonLdText(config.social?.instagram),
      sanitizeJsonLdText(config.social?.googleBusiness),
    ].filter(Boolean),
  };

  const menuSections = Object.entries(menu || {})
    .filter(([key, rows]) => !key.startsWith("_") && Array.isArray(rows) && rows.length > 0)
    .slice(0, 5)
    .map(([category, rows]) => ({
      "@type": "MenuSection",
      name: sanitizeJsonLdText(category),
      hasMenuItem: rows.slice(0, 18).map((item) => ({
        "@type": "MenuItem",
        name: sanitizeJsonLdText(item.name),
        description: sanitizeJsonLdText(item.description),
        offers: item.price
          ? {
              "@type": "Offer",
              price: String(item.price).replace(/[^0-9,.]/g, "").trim() || "0",
              priceCurrency: "RON",
            }
          : undefined,
      })),
    }));

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${siteName} - Meniu`,
    hasMenuSection: menuSections,
  };

  return (
    <>
      <JsonLdScript id="jsonld-organization" data={organizationSchema} />
      <JsonLdScript id="jsonld-website" data={webSite} />
      <JsonLdScript id="jsonld-restaurant" data={restaurantSchema} />
      <JsonLdScript id="jsonld-menu" data={menuSchema} />
    </>
  );
}
