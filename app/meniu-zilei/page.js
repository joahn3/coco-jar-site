import {
  getCurrentDayKey,
  getDayLabel,
  getDailyMenu,
  getSiteConfig,
} from "../../lib/site-data";
import { isMenuDayActive } from "../../lib/format";
import Image from "next/image";
import Container from "../components/ui/container";
import Card from "../components/ui/card";

export default async function DailyMenuPage() {
  const dayKey = getCurrentDayKey();
  const dailyMenu = await getDailyMenu();
  const config = await getSiteConfig();
  const dayItems = Array.isArray(dailyMenu[dayKey]) ? dailyMenu[dayKey] : [];
  const isMenuActive = isMenuDayActive(config.menuValidUntilHour);

  return (
    <main className="pb-28">
      <Container as="section" className="py-6">
        <h1 className="text-display-md">Meniul zilei — {getDayLabel(dayKey)}</h1>
        {!isMenuActive && (
          <p className="jar-badge jar-badge--subtle mt-2 normal-case">
            <span className="mr-2 inline-block size-2 rounded-full bg-brand-500" />
            Meniul zilei este valabil până la ora 16:00.
          </p>
        )}
        <p className="mt-2 text-sm text-ink-muted">
          Actualizare periodică prin fișierul <span className="font-mono">data/meniu-zilei.json</span>.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dayItems.length === 0 ? (
            <Card className="md:col-span-2 xl:col-span-3">
              <p className="text-sm text-ink-muted">
                Nu avem încă meniul zilei încărcat. Se actualizează periodic.
              </p>
            </Card>
          ) : (
            dayItems.map((item) => (
              <Card key={item.name} className="space-y-2">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={720}
                    height={480}
                    className="mx-auto w-full rounded-lg object-cover"
                  />
                ) : null}
                <h2 className="text-title-lg">{item.name}</h2>
                <p className="text-sm text-ink-muted">{item.description}</p>
                <p className="font-semibold text-ink-title">{item.price || "—"}</p>
              </Card>
            ))
          )}
        </div>
      </Container>
    </main>
  );
}
