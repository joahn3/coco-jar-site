"use client";

import { useState } from "react";
import Button from "./ui/button";
import Card from "./ui/card";
import { cn } from "./ui/cn";

const inputClassName =
  "jar-form-field touch-target text-sm";

const eventTypes = [
  "Nuntă",
  "Botez",
  "Aniversare",
  "Corporate",
  "Parastas",
  "Conferință",
  "Altul",
];

const timeSlots = [
  "17:00–19:00",
  "19:00–21:00",
  "21:00–23:00",
  "După program",
];

export default function EventForm() {
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
      email: form.email.value.trim(),
      eventType: form.eventType.value,
      eventDate: form.eventDate.value,
      guestCount: form.guestCount.value.trim(),
      preferredMenu: form.preferredMenu.value.trim(),
      budget: form.budget.value.trim(),
      timeSlot: form.timeSlot.value,
      message: form.message.value.trim(),
      consent: form.consent?.checked,
      website: form.website?.value,
    };

    if (!payload.name || !payload.phone) {
      setStatus("Te rugăm să introduci numele și numărul de telefon.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/evenimente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({ ok: false, error: "Am avut o mică întrerupere. Încearcă din nou peste câteva clipe." }));
    setLoading(false);

    if (!response.ok || !data.ok) {
      setStatus(data.error || "Am întâmpinat o perturbare scurtă. Trimite cererea din nou în câteva momente.");
      return;
    }

    if (window?.gtag) {
      window.gtag("event", "form_submit", {
        event_category: "conversion",
        event_label: "event_form",
        source_page: "/evenimente-catering",
        journey_stage: "lead_capture",
        lead_type: "event",
        guest_count: payload.guestCount ? Number(payload.guestCount) : 0,
        budget: payload.budget || "nedefinit",
      });
    }

    setStatus("Cererea ta a fost transmisă. Confirmarea preliminară o primești de regulă în maxim 24 de ore.");
    form.reset();
  }

  return (
    <Card>
      <h2 className="text-title-lg">Solicitarea pentru evenimente</h2>
      <p className="mt-2 text-sm text-ink-muted">
        Pentru un răspuns punctual, completează numărul de invitați, data dorită și intervalul de servire.
      </p>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3.5">
        <label className="grid gap-1.5 text-sm text-ink-muted">
          Nume *
          <input
            name="name"
            required
            placeholder="Nume complet"
            className={inputClassName}
          />
        </label>
        <label className="grid gap-1.5 text-sm text-ink-muted">
          Telefon *
          <input
            name="phone"
            required
            placeholder="Ex: 07xx xxx xxx"
            className={inputClassName}
          />
        </label>
        <label className="grid gap-1.5 text-sm text-ink-muted">
          Email
          <input
            name="email"
            type="email"
            placeholder="nume@exemplu.com"
            className={inputClassName}
          />
        </label>
        <label className="grid gap-1.5 text-sm text-ink-muted">
          Tip eveniment
          <select
            name="eventType"
            required
            defaultValue=""
            className={inputClassName}
            aria-label="Tip eveniment"
          >
            <option value="" disabled>
              Selectează tipul evenimentului
            </option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm text-ink-muted">
            Data evenimentului
            <input name="eventDate" type="date" required className={inputClassName} />
          </label>
          <label className="grid gap-1.5 text-sm text-ink-muted">
            Număr invitați
            <input
              type="number"
              min="5"
              max="300"
              name="guestCount"
              placeholder="Ex: 40 invitați"
              required
              className={inputClassName}
            />
          </label>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm text-ink-muted">
            Interval de servire
            <select name="timeSlot" className={inputClassName} aria-label="Interval de servire">
              <option value="">Alege intervalul dorit</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm text-ink-muted">
            Buget orientativ
            <input
              name="budget"
              placeholder="Ex: 80-120 lei/persoană"
              className={inputClassName}
            />
          </label>
        </div>
        <label className="grid gap-1.5 text-sm text-ink-muted">
          Tip meniu preferat
          <input
            name="preferredMenu"
            placeholder="ex: pui la jar, opțiuni vegetariene"
            className={inputClassName}
          />
        </label>
        <label className="sr-only">
          Nu completați acest câmp
          <input className="sr-only" name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="grid gap-1.5 text-sm">
          Mesaj / alergeni / alte detalii
          <textarea
            name="message"
            rows={4}
            placeholder="Scopul evenimentului, restricții alimentare sau cerințe speciale"
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
          <span>Sunt de acord să primesc propunerea finală prin telefon sau WhatsApp.</span>
        </label>
        <Button
          as="button"
          type="submit"
          disabled={loading}
          data-analytics="form_submit|conversion|event_form|source=/evenimente-catering|journey=lead_capture|lead_type=event"
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
