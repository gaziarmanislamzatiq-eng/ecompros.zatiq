"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useRef, useState, type CSSProperties, type FormEvent, type PointerEvent } from "react";

import Button from "@/components/ui/Button";
import { serviceBookingOptions } from "@/lib/services";

const PLACEHOLDER_BOOKING_INBOX = "hello@ecomprodesk.com";
const bookingOptions = [...serviceBookingOptions, "Multiple services"];

type FormData = {
  budget: string;
  company: string;
  email: string;
  message: string;
  name: string;
  service: string;
};

type FormErrors = Partial<Record<keyof Pick<FormData, "email" | "message" | "name">, string>>;

const initialFormData: FormData = {
  budget: "",
  company: "",
  email: "",
  message: "",
  name: "",
  service: serviceBookingOptions[0] ?? "Web design and development",
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
    `Service: ${data.service}`,
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
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function updateField(field: keyof FormData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("success");
    window.location.href = buildMailtoUrl(formData);
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
        <Button type="submit" size="lg">
          Start the conversation
          <ArrowRight aria-hidden="true" size={18} />
        </Button>
        <p aria-live="polite" className="booking-form__status">
          {status === "success" ? (
            <>
              <CheckCircle2 aria-hidden="true" size={18} />
              Email draft opened. Send it from your mail app to finish.
            </>
          ) : (
            `Uses placeholder inbox ${PLACEHOLDER_BOOKING_INBOX}.`
          )}
        </p>
      </div>
    </form>
  );
}
