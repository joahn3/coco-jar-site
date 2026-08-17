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
    "Meniul zilei de la Coco Jar: pui la jar, preparate tradiționale, salate și o experiență completă pentru întreaga zi.",
};

const premiumMenuCopy = {
  "Meniul zilei": {
    name: "Meniul zilei premium",
    description:
      "O porție echilibrată, gândită ca experiență de zi: început echilibrat, mijloc consistent și final fără grabă.",
  },
  "Ciorbă de văcuță": {
    name: "Ciorbă de văcuță — porție de deschidere",
    description:
      "Ciorbă de casă cu intensitate de familie, densă, echilibrată și pregătită ca introducere pentru zi.",
  },
  "Supă de pui cu tăiței de casă": {
    name: "Supă de pui cu tăiței de casă — porție de echilibru",
    description:
      "Supă de pui cu tăiței proaspeți, preparată lent, pentru textură mătăsoasă și răgaz plăcut pe zi.",
  },
  "Pui la jar cu cartofi prăjiți": {
    name: "Pui la jar marinat — porție de zi",
    description:
      "Pui afumat pe jar, cu cartofi crocanți și crustă aurie, porție generoasă pentru o experiență de zi constantă.",
  },
  "Pilaf de legume cu pui la jar": {
    name: "Pilaf de legume cu pui la jar — porție completă",
    description:
      "Pilaf cu pui la jar și legume selectat, armonizat pentru o notă de casă premium.",
  },
  "Cârnăciori cu cartofi prăjiți": {
    name: "Cârnăciori la jar — porție crocantă",
    description:
      "Cârnăciori rumeniți pe exterior, alături de cartofi aurii și muștar artizanal, cu prezentare clară pe toată ziua.",
  },
  "Mici cu cartofi prăjiți și muștar": {
    name: "Mici cu cartofi prăjiți și muștar — porție robustă",
    description:
      "Mici cu crustă rumenă, combinați cu cartofi crocanți și muștar de casă, ca accent de grătar premium.",
  },
  "Salată de varză": {
    name: "Salată de varză crocantă, notă fresh și răcoroasă",
    description:
      "Sfeclă și varză gândite pentru echilibru acid, crocant și curat, ca contrapunct digestiv la preparatele principale.",
  },
};

function getPremiumMenuItemCopy(item) {
  const preset = premiumMenuCopy[item.name];
  const title = preset?.name || item.name;
  const baseDescription = (preset?.description || item.description || "").trim();
  const extras = [];
  const hasPorție = /\bporț/i.test(baseDescription);
  const hasExperiență = /experienț|zi/i.test(baseDescription);
  if (!hasPorție) {
    extras.push("Porție gândită pentru o experiență de zi echilibrată.");
  }
  if (!hasExperiență) {
    extras.push("Pachet de zi cu prezentare constantă.");
  }
  const description = [baseDescription, ...extras].filter(Boolean).join(" ");
  return { title, description };
}

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
        <h1 className="text-display-md">Meniul zilei — experiență completă la jar</h1>
        <p className="mt-2 text-sm text-ink-muted">
          {selectedDate
            ? `Compoziția pentru ${requestedLabel || selectedDate} este gândită ca o experiență de zi: start echilibrat, preparat la jar, ritm constant și servire stabilă.`
            : `Este o propunere de zi completă: început, fel principal și final pentru o masă întreagă, fără compromis pe calitate și timp.`}
        </p>
        {selectedDate ? (
          <p className="mt-2 text-sm text-ink-muted">
            Ai activat meniul zilei pentru data <span className="font-semibold">{requestedLabel || selectedDate}</span>.{" "}
            <a href="/meniu-zilei" className="underline underline-offset-3">
              Revino la ziua curentă
            </a>
          </p>
        ) : null}
	        {!isMenuActive && (
          <p className="jar-badge jar-badge--subtle mt-2 normal-case">
            <span className="mr-2 inline-block size-2 rounded-full bg-brand-500" />
            Deschis: 10:00–22:00
          </p>
        )}
        <p className="mt-2 text-sm text-ink-muted">
          Meniul este actualizat zilnic, la fiecare schimbare de bucătărie, ca o experiență completă pe zi — nu doar o listă tehnică.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button as="next-link" href="/contact" variant="primary" className="touch-target">
            Rezervă-ți locul pentru azi
          </Button>
          <Button as="next-link" href="/meniu" variant="secondary" className="touch-target">
            Explorează meniul complet
          </Button>
          <Button href={phoneHref(config.phone)} className="touch-target">
            Rezervare directă pe telefon
          </Button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dayItems.length === 0 ? (
                <Card className="md:col-span-2 xl:col-span-3">
                  <p className="text-sm text-ink-muted">
                    Îți pregătim experiența zilei pas cu pas; revenim în scurt timp cu oferta completă pentru această zi.
                  </p>
                </Card>
            ) : (
            dayItems.map((item) => {
              const premiumItem = getPremiumMenuItemCopy(item);
              return (
                <Card key={item.name} className="space-y-2">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={premiumItem.title}
                      width={720}
                      height={480}
                      className="mx-auto w-full rounded-lg object-cover"
                    />
                  ) : null}
                  <h2 className="text-title-lg">{premiumItem.title}</h2>
                  <p className="text-sm text-ink-muted">{premiumItem.description}</p>
                  <p className="font-semibold text-ink-title">{item.price || "—"}</p>
                </Card>
              );
            })
          )}
        </div>
      </Container>
    </main>
  );
}
