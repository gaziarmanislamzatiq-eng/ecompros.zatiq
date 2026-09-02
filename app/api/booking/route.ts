import { NextResponse } from "next/server";

import { sendBookingInquiry } from "@/lib/mailer";

type BookingPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  duration?: unknown;
  budget?: unknown;
  message?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: BookingPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const data = {
    name: asString(payload.name),
    email: asString(payload.email),
    company: asString(payload.company),
    service: asString(payload.service),
    duration: asString(payload.duration),
    budget: asString(payload.budget),
    message: asString(payload.message),
  };

  if (!data.name || !/.+@.+\..+/.test(data.email) || !data.message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  try {
    await sendBookingInquiry(data);
  } catch (error) {
    console.error("Failed to send booking inquiry email", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
