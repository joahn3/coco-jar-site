import { getSiteUrl, sanitizeJsonLdText, toAbsoluteUrl } from "../../lib/seo-jsonld";
import JsonLdScript from "./jsonld-script";

function withAbsoluteUrl(url) {
  const resolved = toAbsoluteUrl(url || "");
  return sanitizeJsonLdText(resolved);
}

export default function PageJsonLd({
  slug,
  title,
  description,
  image,
  author,
  datePublished,
  dateModified,
  section,
}) {
  const siteUrl = getSiteUrl();
  const canonicalUrl = withAbsoluteUrl(slug);
  const imageUrl = image ? withAbsoluteUrl(image) : `${siteUrl}/galerie/instagram-011-47b855d73e.jpg`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: sanitizeJsonLdText(title),
    description: sanitizeJsonLdText(description),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    image: imageUrl,
    author: {
      "@type": "Organization",
      name: sanitizeJsonLdText("Coco Jar"),
    },
    publisher: {
      "@type": "Organization",
      name: sanitizeJsonLdText("Coco Jar"),
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/galerie/instagram-011-47b855d73e.jpg`,
      },
    },
    inLanguage: "ro-RO",
    isPartOf: {
      "@type": "WebSite",
      name: "Coco Jar",
      url: siteUrl,
    },
    url: canonicalUrl,
  };

  if (section) {
    schema.articleSection = sanitizeJsonLdText(section);
  }

  if (author) {
    schema.author = {
      "@type": "Organization",
      name: sanitizeJsonLdText(author),
    };
  }

  if (datePublished) {
    schema.datePublished = sanitizeJsonLdText(datePublished);
  }

  if (dateModified) {
    schema.dateModified = sanitizeJsonLdText(dateModified);
  }

  return <JsonLdScript id="jsonld-page-article" data={schema} />;
}
