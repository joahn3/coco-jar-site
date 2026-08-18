"use client";

import { useState } from "react";
import Button from "./ui/button";
import Card from "./ui/card";
import { cn } from "./ui/cn";

const inputClassName = "jar-form-field touch-target text-sm";

const VISIT_TYPES = [
  "Rezervare masă",
  "Întâlnire de familie",
  "Întâlnire de afaceri",
  "Eveniment privat",
  "Întrebare generală",
];

const TIME_SUGGESTIONS = [
  "18:00-19:00",
  "19:00-20:00",
  "20:00-21:30",
  "21:30-23:00",
];

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("");
    setLoading(true);

    const form = event.currentTarget;
    const payload = {
      name: form.name.value.trim(),
      phone: form.phone.value.trim(),
      visitType: form.visitType.value,
      guestCount: form.guestCount.value.trim(),
      preferredTime: form.preferredTime.value,
      message: form.message.value.trim(),
      consent: form.consent?.checked,
      website: form.website?.value,
    };

    if (!payload.name || !payload.phone) {
      setStatus("Te rugăm să introduci numele și numărul de telefon.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({ ok: false, error: "Am avut o mică întrerupere. Încearcă din nou peste câteva clipe." }));
    setLoading(false);

    if (!res.ok || !data.ok) {
      setStatus(data.error || "Îți mulțumim pentru răbdare — te rugăm să încerci trimiterea din nou într-un moment.");
      return;
    }

    if (window?.gtag) {
      window.gtag("event", "form_submit", {
        event_category: "conversion",
        event_label: "contact_form",
        source_page: "/contact",
        journey_stage: "lead_capture",
        lead_type: payload.visitType || "rezervare",
        guest_count: payload.guestCount ? Number(payload.guestCount) : 0,
        preferred_time: payload.preferredTime || "nedefinit",
      });
    }

      setStatus("Mesajul tău a ajuns. Confirmăm de obicei în maxim 30 de minute, în intervalul de lucru.");
    form.reset();
  }

  return (
    <Card>
      <h2 className="text-title-lg">Trimite cererea ta</h2>
      <p className="mt-2 text-sm text-ink-muted">
        Oferă tipul vizitei și numărul aproximativ de persoane, ca să îți pregătim un răspuns punctual.
      </p>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3.5">
        <label className="grid gap-1.5 text-sm text-ink-muted">
          Tipul vizitei *
          <select
            name="visitType"
            required
            defaultValue=""
            className={inputClassName}
            aria-label="Tipul vizitei"
          >
            <option value="" disabled>
              Selectează tipul vizitei
            </option>
            {VISIT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm text-ink-muted">
          Nume *
          <input
            name="name"
            required
            placeholder="Numele tău"
            className={inputClassName}
          />
        </label>
        <label className="grid gap-1.5 text-sm text-ink-muted">
          Telefon *
            <input
              name="phone"
              required
              placeholder="Telefon mobil (format 07xx xxx xxx)"
              className={inputClassName}
            />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm text-ink-muted">
            Număr persoane (estimativ)
              <input
                type="number"
                min="1"
                max="160"
                name="guestCount"
                placeholder="Ex.: 4 persoane"
                className={inputClassName}
              />
          </label>
          <label className="grid gap-1.5 text-sm text-ink-muted">
            Interval dorit
            <select name="preferredTime" className={inputClassName} aria-label="Intervalul dorit">
              <option value="">Ore preferate</option>
              {TIME_SUGGESTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="sr-only">
          Câmp de protecție
          <input className="sr-only" name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="grid gap-1.5 text-sm text-ink-muted">
          Mesaj
            <textarea
              name="message"
              rows={4}
              placeholder="Scrie motivul vizitei, preferințele culinare sau alergeni"
              className="jar-form-field min-h-28 resize-y text-sm"
            />
        </label>
        <label className="grid grid-cols-[auto,1fr] items-start gap-2 text-sm text-ink-muted">
          <input
            type="checkbox"
            name="consent"
            defaultChecked
            className="mt-1 rounded border-line-soft"
          />
          <span>Accept să primesc confirmarea prin telefon sau WhatsApp.</span>
        </label>
        <Button
          as="button"
          type="submit"
          disabled={loading}
          data-analytics="form_submit|conversion|contact_form|source=/contact|journey=lead_capture|lead_type=reservation"
          className={cn(
            "justify-self-start",
            loading ? "pointer-events-none opacity-70" : "",
          )}
        >
          {loading ? "Se procesează..." : "Trimite cererea"}
        </Button>
        {status && <p className="text-sm text-success">{status}</p>}
      </form>
    </Card>
  );
}
