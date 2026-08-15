import Image from "next/image";
import Link from "next/link";
import { readdirSync } from "node:fs";
import path from "node:path";
import Container from "../components/ui/container";
import Card from "../components/ui/card";
import galleryCatalog from "../../data/galerie-atmosfera.json";
import Breadcrumbs from "../components/breadcrumbs";

const galleryPath = path.join(process.cwd(), "public/galerie");
const EXCLUDED_PATTERNS = [/meniu/i];

const FILTERS = [
  { key: "toate", label: "Toate" },
  { key: "interior", label: "Interior" },
  { key: "locatie", label: "Locație" },
  { key: "preparat", label: "Preparat" },
  { key: "gratar", label: "Grătar" },
];

const validFilters = new Set(FILTERS.map((filter) => filter.key));
const catalogByFile = new Map(galleryCatalog.map((item) => [item.file, item]));

function normalizeFilter(value) {
  return validFilters.has(value) ? value : "toate";
}

export default async function GalleryPage({ searchParams }) {
  const resolvedSearchParams = await Promise.resolve(searchParams || {});
  const activeFilter = normalizeFilter(resolvedSearchParams?.filtru);

  const files = readdirSync(galleryPath)
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .filter((file) => !EXCLUDED_PATTERNS.some((pattern) => pattern.test(file)))
    .sort()
    .map((file) => {
      const item = catalogByFile.get(file) || {};

      return {
        file,
        src: `/galerie/${file}`,
        category: item.category || "interior",
        title: item.title || `Poza Coco Jar ${file}`,
        description: item.description || "Atmosferă Coco Jar.",
        alt: item.title || `Poza de atmosferă Coco Jar ${file}`,
      };
    })
    .filter((item) => (activeFilter === "toate" ? true : item.category === activeFilter));

  const sectionTitleByFilter = {
    toate: "Toate momentele din atmosfera Coco Jar",
    interior: "Interior: spațiu primitor, lemn și lumină caldă",
    locatie: "Locație: unde te simți ca acasă",
    preparat: "Preparat: prezentare atentă în farfurie",
    gratar: "Grătar: căldură, fum și textură",
  };

  return (
      <main className="pb-28">
      <Container as="section" className="space-y-5 py-6">
        <Breadcrumbs
          items={[
            { label: "Acasă", href: "/" },
            { label: "Galerie", href: "/galerie" },
          ]}
        />
        <div>
          <h1 className="text-display-md">Atmosferă la Coco Jar</h1>
          <p className="text-sm text-ink-muted">
            Fotografii din restaurant, organizate pe elementele care definesc atmosfera: liniște, lemn și preparate de la grătar.
          </p>
        </div>

        <nav aria-label="Filtre galerie" className="overflow-x-auto">
          <div className="flex min-w-max gap-2">
            {FILTERS.map((filter) => {
              const href =
                filter.key === "toate"
                  ? "/galerie"
                  : `/galerie?filtru=${encodeURIComponent(filter.key)}`;
              const isActive = filter.key === activeFilter;

              return (
                <Link
                  key={filter.key}
                  href={href}
                  className={`jar-filter ${isActive ? "jar-filter--active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {filter.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <p className="text-sm text-ink-muted">{sectionTitleByFilter[activeFilter] || "Atmosferă dincolo de meniu."}</p>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {files.length === 0 ? (
            <Card>
              <p className="text-sm text-ink-muted">Momentan nu există imagini pentru filtrul selectat.</p>
            </Card>
          ) : (
            files.map((item) => (
              <Card key={item.src} className="space-y-2 overflow-hidden p-0">
                <div className="relative">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1200}
                    height={900}
                    className="aspect-[3/2] h-auto w-full object-cover"
                    loading="lazy"
                  />
                  <span className={`jar-chip jar-chip--floating jar-chip--${item.category}`}>
                    {FILTERS.find((filter) => filter.key === item.category)?.label || item.category}
                  </span>
                </div>

                <div className="space-y-1 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-300">{item.category}</p>
                  <h2 className="text-title-md">{item.title}</h2>
                  <p className="text-sm text-ink-muted">{item.description}</p>
                </div>
              </Card>
            ))
          )}
        </div>
      </Container>
    </main>
  );
}
