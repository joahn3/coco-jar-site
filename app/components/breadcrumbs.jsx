import Link from "next/link";
import JsonLdScript from "./jsonld-script";
import { toAbsoluteUrl, sanitizeJsonLdText } from "../../lib/seo-jsonld";

export default function Breadcrumbs({ items = [] }) {
  if (!Array.isArray(items) || items.length < 2) {
    return null;
  }

  const validItems = items.filter((item) => item && item.label && item.href);
  if (validItems.length < 2) {
    return null;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: validItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: sanitizeJsonLdText(item.label),
      item: toAbsoluteUrl(item.href),
    })),
  };

  return (
    <nav aria-label="Cale de navigare" className="mb-4 border-b border-[color:var(--ds-border)]/70 pb-3">
      <ol className="jar-copy-xs jar-kicker flex flex-wrap items-center gap-2">
        {validItems.map((item, index) => {
          const isLast = index === validItems.length - 1;

          return (
            <li key={`${item.href}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 ? <span className="mt-0.5 inline-block size-1 rounded-full bg-brand-400/85" aria-hidden="true" /> : null}
              {isLast ? (
                <span className="font-semibold text-ink-title">{sanitizeJsonLdText(item.label)}</span>
              ) : (
                <Link
                  className="hover:text-ink-title touch-target inline-flex items-center transition-colors duration-200 rounded-full"
                  href={item.href}
                >
                  {sanitizeJsonLdText(item.label)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLdScript id="jsonld-breadcrumb" data={breadcrumbSchema} />
    </nav>
  );
}
