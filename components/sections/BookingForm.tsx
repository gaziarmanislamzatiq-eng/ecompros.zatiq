"use client";

import emailjs from "@emailjs/browser";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useRef, useState, type CSSProperties, type FormEvent, type PointerEvent } from "react";

import Button from "@/components/ui/Button";
import { monthlyPlans, periodLabels, periodOrder } from "@/lib/pricing";

const PLACEHOLDER_BOOKING_INBOX = "gazi.arman.islam.zatiq@gmail.com";
const bookingOptions = [...monthlyPlans.map((plan) => plan.name), "Not sure yet"];
const durationOptions = periodOrder.map((key) => periodLabels[key]);

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_CONFIGURED = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY,
);

type FormData = {
  budget: string;
  company: string;
  duration: string;
  email: string;
  message: string;
  name: string;
  service: string;
};

type FormErrors = Partial<Record<keyof Pick<FormData, "email" | "message" | "name">, string>>;

const initialFormData: FormData = {
  budget: "",
  company: "",
  duration: durationOptions[0] ?? "Monthly",
  email: "",
  message: "",
  name: "",
  service: bookingOptions[0] ?? "Operations",
};

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Add your name.";
  }

  if (!/.+@.+\..+/.test(data.email.trim())) {
    errors.email = "Add a valid email.";
  }

  if (!data.message.trim()) {
    errors.message = "Add a short project note.";
  }

  return errors;
}

function buildMailtoUrl(data: FormData) {
  const subjectLabel = data.company.trim() || data.name.trim();
  const subject = `Ecom ProDesk project inquiry - ${subjectLabel}`;
  const body = [
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
    `Company: ${data.company.trim() || "Not provided"}`,
    `Primary need: ${data.service}`,
    `Project duration: ${data.duration}`,
    `Budget / timeline: ${data.budget.trim() || "Not provided"}`,
    "",
    "Project note:",
    data.message.trim(),
  ].join("\n");

  const params = new URLSearchParams({ subject, body });
  return `mailto:${PLACEHOLDER_BOOKING_INBOX}?${params.toString()}`;
}

export default function BookingForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"error" | "idle" | "sending" | "success">("idle");

  function updateField(field: keyof FormData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    if (!EMAILJS_CONFIGURED) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID!,
        EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          company: formData.company.trim() || "Not provided",
          service: formData.service,
          duration: formData.duration,
          budget: formData.budget.trim() || "Not provided",
          message: formData.message.trim(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY! },
      );
      setStatus("success");
      setFormData(initialFormData);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      className="booking-form"
      data-status={status}
      onPointerMove={(event: PointerEvent<HTMLFormElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--cursor-x",
          `${event.clientX - bounds.left}px`,
        );
        event.currentTarget.style.setProperty(
          "--cursor-y",
          `${event.clientY - bounds.top}px`,
        );
      }}
      onPointerLeave={() => {
        formRef.current?.style.setProperty("--cursor-x", "50%");
        formRef.current?.style.setProperty("--cursor-y", "50%");
      }}
      style={{ "--cursor-x": "50%", "--cursor-y": "50%" } as CSSProperties}
      onSubmit={onSubmit}
      noValidate
    >
      <div className="booking-form__grid">
        <label className="field">
          <span className="field__label">Name</span>
          <input
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "booking-name-error" : undefined}
            className="field__control"
            name="name"
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your name"
            value={formData.name}
          />
          {errors.name ? (
            <span className="field__error" id="booking-name-error">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="field">
          <span className="field__label">Email</span>
          <input
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "booking-email-error" : undefined}
            className="field__control"
            inputMode="email"
            name="email"
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@company.com"
            type="email"
            value={formData.email}
          />
          {errors.email ? (
            <span className="field__error" id="booking-email-error">
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="field">
          <span className="field__label">Company</span>
          <input
            className="field__control"
            name="company"
            onChange={(event) => updateField("company", event.target.value)}
            placeholder="Company or project"
            value={formData.company}
          />
        </label>

        <label className="field">
          <span className="field__label">Primary need</span>
          <select
            className="field__control"
            name="service"
            onChange={(event) => updateField("service", event.target.value)}
            value={formData.service}
          >
            {bookingOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Project duration</span>
          <select
            className="field__control"
            name="duration"
            onChange={(event) => updateField("duration", event.target.value)}
            value={formData.duration}
          >
            {durationOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="field booking-form__wide">
          <span className="field__label">Budget or timeline</span>
          <input
            className="field__control"
            name="budget"
            onChange={(event) => updateField("budget", event.target.value)}
            placeholder="Optional"
            value={formData.budget}
          />
        </label>

        <label className="field booking-form__wide">
          <span className="field__label">Project note</span>
          <textarea
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "booking-message-error" : undefined}
            className="field__control field__control--textarea"
            name="message"
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="What needs to be designed, built, repaired, or clarified?"
            value={formData.message}
          />
          {errors.message ? (
            <span className="field__error" id="booking-message-error">
              {errors.message}
            </span>
          ) : null}
        </label>
      </div>

      <div className="booking-form__actions">
        <Button disabled={status === "sending"} type="submit" size="lg">
          {status === "sending" ? (
            <LoaderCircle aria-hidden="true" className="booking-form__spinner" size={18} />
          ) : (
            <>
              Start the conversation
              <ArrowRight aria-hidden="true" size={18} />
            </>
          )}
        </Button>
        <p aria-live="polite" className="booking-form__status">
          {status === "success" ? (
            <>
              <CheckCircle2 aria-hidden="true" size={18} />
              Sent. We&apos;ll reply by email shortly.
            </>
          ) : status === "sending" ? (
            "Sending..."
          ) : status === "error" && !EMAILJS_CONFIGURED ? (
            <>
              Email sending isn&apos;t connected yet.{" "}
              <a href={buildMailtoUrl(formData)}>Email us directly</a> instead.
            </>
          ) : status === "error" && Object.keys(errors).length === 0 ? (
            <>
              Something went wrong sending that.{" "}
              <a href={buildMailtoUrl(formData)}>Email us directly</a> instead.
            </>
          ) : (
            `We reply from ${PLACEHOLDER_BOOKING_INBOX}.`
          )}
        </p>
      </div>
    </form>
  );
}
