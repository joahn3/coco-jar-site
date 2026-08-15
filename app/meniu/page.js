import { getFullMenu, getOrderedMenuSections, getMenuCategoryLabel } from "../../lib/site-data";
import Container from "../components/ui/container";
import Button from "../components/ui/button";
import MenuSearch from "../components/meniu-search";

export default async function MenuPage() {
  const fullMenu = await getFullMenu();
  const sections = getOrderedMenuSections(fullMenu);
  const menuSections = sections.map((sectionKey) => ({
    key: sectionKey,
    label: getMenuCategoryLabel(sectionKey),
    rows: fullMenu[sectionKey] || [],
  }));
  const totalItems = menuSections.reduce((acc, section) => acc + section.rows.length, 0);

  return (
    <main className="pb-28">
      <Container as="section" className="py-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-display-md">Meniu</h1>
            <p className="text-body-lg text-ink-muted">
              Toate preparatele cu prețuri actualizate, organizate pe categorii clare.
            </p>
          </div>
          <Button as="a" href="/meniu/coco-jar-meniu-detaliat-2026-08-15.pdf" target="_blank" rel="noopener" variant="ghost" className="touch-target">
            Descarcă meniul în PDF
          </Button>
        </div>

        <MenuSearch sections={menuSections} totalItems={totalItems} />
      </Container>
    </main>
  );
}
