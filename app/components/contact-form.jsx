"use client";

import { useState } from "react";
import Button from "./ui/button";
import Card from "./ui/card";
import { cn } from "./ui/cn";

const inputClassName = "jar-form-field touch-target text-sm";

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
      message: form.message.value.trim(),
      consent: form.consent?.checked,
      website: form.website?.value,
    };

    if (!payload.name || !payload.phone) {
      setStatus("Te rugăm să completezi nume și telefon.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({ ok: false, error: "Răspuns invalid de la server" }));
    setLoading(false);

    if (!res.ok || !data.ok) {
      setStatus(data.error || "Nu am putut trimite mesajul. Încearcă din nou.");
      return;
    }

    if (window?.gtag) {
      window.gtag("event", "send_form", {
        event_category: "conversion",
        event_label: "contact",
      });
    }

    setStatus("Mulțumim! Mesajul tău a fost transmis.");
    form.reset();
  }

  return (
    <Card>
      <h2 className="text-title-lg">Trimite mesaj rapid</h2>
      <form onSubmit={onSubmit} className="mt-4 grid gap-3.5">
        <label className="grid gap-1.5 text-sm text-ink-muted">
          Nume *
          <input
            name="name"
            required
            placeholder="Numele"
            className={inputClassName}
          />
        </label>
        <label className="grid gap-1.5 text-sm text-ink-muted">
          Telefon *
          <input
            name="phone"
            required
            placeholder="07xx xxx xxx"
            className={inputClassName}
          />
        </label>
        <label className="sr-only">
          Nu completați acest câmp
          <input className="sr-only" name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="grid gap-1.5 text-sm text-ink-muted">
          Mesaj
          <textarea
            name="message"
            rows={4}
            placeholder="Scrie-ne ce ai nevoie"
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
          <span>Sunt de acord să primesc apel/mesaj de confirmare.</span>
        </label>
        <Button
          as="button"
          type="submit"
          disabled={loading}
          data-analytics="form_submit|conversion|contact_form"
          className={cn(
            "justify-self-start",
            loading ? "pointer-events-none opacity-70" : "",
          )}
        >
          {loading ? "Se trimite..." : "Trimite"}
        </Button>
        {status && <p className="text-sm text-success">{status}</p>}
      </form>
    </Card>
  );
}
