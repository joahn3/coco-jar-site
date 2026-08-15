import Link from "next/link";

const SITE_ORIGIN = "https://coco-jar-site.vercel.app";

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
      name: item.label,
      item: `${SITE_ORIGIN}${item.href}`,
    })),
  };

  return (
    <nav aria-label="Cale de navigare" className="mb-4 border-b border-line-soft/70 pb-3">
      <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.07em] text-ink-muted">
        {validItems.map((item, index) => {
          const isLast = index === validItems.length - 1;

          return (
            <li key={`${item.href}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 ? <span className="mt-0.5 inline-block size-1 rounded-full bg-brand-400/85" aria-hidden="true" /> : null}
              {isLast ? (
                <span className="font-semibold text-ink-title">{item.label}</span>
              ) : (
                <Link className="hover:text-ink-title transition-colors duration-200" href={item.href}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </nav>
  );
}
