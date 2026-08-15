import { getFullMenu, getOrderedMenuSections, getMenuCategoryLabel } from "../../lib/site-data";
import Container from "../components/ui/container";
import Card from "../components/ui/card";
import Button from "../components/ui/button";

export default async function MenuPage() {
  const fullMenu = await getFullMenu();
  const sections = getOrderedMenuSections(fullMenu);

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
          <Button
            as="next-link"
            href="/meniu/coco-jar-meniu-detaliat-2026-08-15.pdf"
            variant="ghost"
            target="_blank"
            className="touch-target"
          >
            Descarcă meniul în PDF
          </Button>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {sections.map((sectionKey) => {
            const rows = fullMenu[sectionKey] || [];
            const sectionLabel = getMenuCategoryLabel(sectionKey);

            return (
              <Card key={sectionKey} className="overflow-hidden">
                <h2 className="text-title-lg">{sectionLabel}</h2>
                {rows.length === 0 ? (
                  <p className="text-sm text-ink-muted">
                    Nu sunt încă înregistrate produse în această secțiune.
                  </p>
                ) : (
                  <div className="mt-3 overflow-x-auto -mx-1 rounded-lg">
                    <table className="menu-table text-left">
                      <thead>
                        <tr>
                          <th>Preparat</th>
                          <th>Descriere</th>
                          <th>Preț</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row, idx) => (
                          <tr key={`${row.name}-${row.size}-${row.price}-${idx}`}>
                            <td>{row.name}</td>
                            <td>
                              {row.description}
                              {row.size ? ` • ${row.size}` : ""}
                            </td>
                            <td>{row.price || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
