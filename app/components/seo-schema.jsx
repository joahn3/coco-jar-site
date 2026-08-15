export default function SeoSchema({ config, menu }) {
  const schemaOrgUrl = "https://coco-jar-site.vercel.app";

  const addressParts = (config.fullAddress || "").split(",");

  const [street = "", locality = "", region = "", postalCode = ""] = addressParts
    .map((value) => value.trim())
    .concat(["", "", "", ""]);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: config.siteName,
    description: config.tagline,
    telephone: config.phone,
    url: schemaOrgUrl,
    image: config.social?.logo,
    servesCuisine: "Romanian",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: locality || config.locality,
      addressRegion: region || "Ilfov",
      postalCode,
      addressCountry: "RO",
    },
    openingHours: ["Mo-Su 10:00-22:00"],
    sameAs: [config.social?.facebook, config.social?.instagram, config.social?.googleBusiness].filter(Boolean),
  };

  const menuSections = Object.entries(menu || {})
    .filter(([key, rows]) => !key.startsWith("_") && Array.isArray(rows) && rows.length > 0)
    .slice(0, 5)
    .map(([category, rows]) => ({
      "@type": "MenuSection",
      name: category,
      hasMenuItem: rows.slice(0, 18).map((item) => ({
        "@type": "MenuItem",
        name: item.name,
        description: item.description,
        offers: item.price
          ? {
              "@type": "Offer",
              price: String(item.price).replace(/[^0-9,.]/g, "").trim() || "",
              priceCurrency: "RON",
            }
          : undefined,
      })),
    }));

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${config.siteName} - Meniu`,
    hasMenuSection: menuSections,
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: config.siteName,
    url: schemaOrgUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${schemaOrgUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  );
}
