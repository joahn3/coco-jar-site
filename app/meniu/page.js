import { getFullMenu, getOrderedMenuSections, getMenuCategoryLabel } from "../../lib/site-data";
import Link from "next/link";
import Container from "../components/ui/container";
import MenuSearch from "../components/meniu-search";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata = {
  title: "Meniu complet | Coco Jar Bistro",
  description:
    "Descoperă meniul complet a la carte al Coco Jar: preparate pe categorii, porții clare și recomandări pentru mesele de orice moment.",
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
	const quickLinks = [
	  { label: "Detalii complete meniu zilei", href: "/meniu-zilei" },
	  { label: "Rezervă masa ta", href: "/contact" },
	  { label: "Descarcă meniul complet (PDF)", href: "/meniu/coco-jar-meniu-detaliat-2026-08-15.pdf", target: "_blank" },
	];

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
            <h1 className="text-display-md">Meniu a la carte</h1>
            <p className="text-body-lg text-ink-muted">
              Toate preparatele a la carte sunt organizate pe categorii clare, cu prețuri actualizate constant.
            </p>
              <div className="jar-link-list mt-3">
              <p className="text-sm text-ink-muted">
                Structură completă: {menuSections.length} categorii, {totalItems} preparate atent ordonate.
              </p>
              <p className="text-sm text-ink-muted">
                Căutare rapidă + filtre disponibile pentru alegerea exactă a preparatelor preferate.
              </p>
            </div>
          </div>
          <div className="jar-link-list mt-3">
            {quickLinks.map((link) =>
              link.target === "_blank" ? (
                <p key={link.label}>
                  <a
                    className="jar-link touch-target"
                    href={link.href}
                    target={link.target}
                    rel="noopener"
                  >
                    {link.label}
                  </a>
                </p>
              ) : (
                <p key={link.label}>
                  <Link className="jar-link touch-target" href={link.href}>
                    {link.label}
                  </Link>
                </p>
              )
            )}
          </div>
        </div>

        <MenuSearch sections={menuSections} totalItems={totalItems} />
      </Container>
    </main>
  );
}
