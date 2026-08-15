import { NextResponse } from "next/server";
import {
  canProcessRequest,
  parseFormBody,
  validateContactPayload,
  buildContactPayload,
  forwardToWebhook,
} from "../../../lib/form-service";

export async function POST(request) {
  const rateState = canProcessRequest(request);
  if (rateState.limited) {
    return NextResponse.json(
      { ok: false, error: "Prea multe cereri. Încearcă din nou peste un minut." },
      { status: 400 }
    );
  }

  const rawPayload = await parseFormBody(request);
  const validation = validateContactPayload(rawPayload || {});

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.errors.join(" ") },
      { status: 400 }
    );
  }

  const payload = buildContactPayload(request, {
    ...validation.values,
    consent: Boolean(validation.values.consent),
  });

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL || process.env.WEBHOOK_URL || "";
  let delivery;

  try {
    delivery = await forwardToWebhook(payload, webhookUrl);
  } catch (error) {
    console.warn("contact-forward-error", error.message || String(error));
    delivery = {
      sent: false,
      status: 0,
      message: "Webhook inaccesibil",
    };
  }

  console.info("contact-submission", payload);

  return NextResponse.json({
    ok: true,
    message: delivery.sent
      ? "Cererea a fost transmisă."
      : "Cererea a fost înregistrată. Te contactăm rapid.",
    delivery,
  });
}
