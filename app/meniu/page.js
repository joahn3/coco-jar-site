import { getFullMenu, getOrderedMenuSections, getMenuCategoryLabel } from "../../lib/site-data";
import Container from "../components/ui/container";
import Button from "../components/ui/button";
import MenuSearch from "../components/meniu-search";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata = {
  title: "Meniu complet | Coco Jar Bistro",
  description:
    "Descoperă meniul complet al restaurantului Coco Jar: pui la jar, preparate pe categorii, porții clare și recomandări pentru mesele din orice zi.",
};

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
          <Breadcrumbs
            items={[
              { label: "Acasă", href: "/" },
              { label: "Meniu", href: "/meniu" },
            ]}
          />
          <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-display-md">Meniu complet</h1>
            <p className="text-body-lg text-ink-muted">
              Toate preparatele sunt organizate pe categorii clare, cu prețuri actualizate constant.
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <Button as="a" href="/meniu-zilei" className="touch-target">
              Meniul zilei
            </Button>
            <Button
              as="a"
              href="/meniu/coco-jar-meniu-detaliat-2026-08-15.pdf"
              target="_blank"
              rel="noopener"
              variant="ghost"
              className="touch-target"
            >
              Descarcă meniul complet (PDF)
            </Button>
          </div>
        </div>

        <MenuSearch sections={menuSections} totalItems={totalItems} />
      </Container>
    </main>
  );
}
