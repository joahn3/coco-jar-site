import {
  getCurrentDayKey,
  getDayKeyByDate,
  getDayLabel,
  getDailyMenu,
  getSiteConfig,
} from "../../lib/site-data";
import { isMenuDayActive, phoneHref } from "../../lib/format";
import Image from "next/image";
import Container from "../components/ui/container";
import Card from "../components/ui/card";
import Button from "../components/ui/button";
import Breadcrumbs from "../components/breadcrumbs";

export const metadata = {
  title: "Meniul zilei | Coco Jar Bistro",
  description:
    "Meniul zilei de azi de la Coco Jar: pui la jar, preparate tradiționale, salate și gusturi gândite pentru seara perfectă.",
};

function formatDateInput(dateInput) {
  if (!dateInput || typeof dateInput !== "string") {
    return "";
  }

  const match = dateInput.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return "";
  }

  const date = new Date(match[1], Number(match[2]) - 1, Number(match[3]));
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export default async function DailyMenuPage({ searchParams }) {
  const selectedDate = searchParams?.date;
  const requestedDayKey = selectedDate ? getDayKeyByDate(selectedDate) : null;
  const dayKey = requestedDayKey || getCurrentDayKey();
  const dailyMenu = await getDailyMenu();
  const config = await getSiteConfig();
  const dayItems = Array.isArray(dailyMenu[dayKey]) ? dailyMenu[dayKey] : [];
  const isMenuActive = isMenuDayActive(config.menuValidUntilHour);
  const requestedLabel = selectedDate ? formatDateInput(selectedDate) : "";
  const pageTitle = selectedDate
    ? `Meniul zilei — ${getDayLabel(dayKey)} (${requestedLabel || selectedDate})`
    : `Meniul zilei — ${getDayLabel(dayKey)}`;

    return (
      <main className="pb-28">
        <Container as="section" className="py-6">
          <Breadcrumbs
            items={[
              { label: "Acasă", href: "/" },
              { label: "Meniul zilei", href: "/meniu-zilei" },
            ]}
          />
          <h1 className="text-display-md">{pageTitle}</h1>
        {selectedDate ? (
          <p className="mt-2 text-sm text-ink-muted">
            Ai deschis meniul zilei pentru data <span className="font-semibold">{requestedLabel || selectedDate}</span>.{" "}
            <a href="/meniu-zilei" className="underline underline-offset-3">
              Revino la ziua curentă
            </a>
          </p>
        ) : null}
        {!isMenuActive && (
          <p className="jar-badge jar-badge--subtle mt-2 normal-case">
            <span className="mr-2 inline-block size-2 rounded-full bg-brand-500" />
            Meniul zilei este valabil până la ora 16:00.
          </p>
        )}
        <p className="mt-2 text-sm text-ink-muted">
          Meniul este actualizat zilnic, în funcție de oferta de sezon.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button as="next-link" href="/contact" variant="primary" className="touch-target">
            Rezervă masa pentru seara de azi
          </Button>
          <Button as="next-link" href="/meniu" variant="secondary" className="touch-target">
            Vezi meniu complet
          </Button>
          <Button href={phoneHref(config.phone)} className="touch-target">
            Sună direct
          </Button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dayItems.length === 0 ? (
            <Card className="md:col-span-2 xl:col-span-3">
              <p className="text-sm text-ink-muted">
                Meniul zilei nu a fost încă publicat. Revino peste puțin.
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
