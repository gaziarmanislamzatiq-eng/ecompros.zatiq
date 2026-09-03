import type { Metadata } from "next";

import ScrollCinematics from "@/components/motion/ScrollCinematics";
import BookingForm from "@/components/sections/BookingForm";
import BookingSection from "@/components/sections/BookingSection";
import Button from "@/components/ui/Button";
import { brand } from "@/lib/brand";

const pageTitle = "Book a Call | EcomPros";
const pageDescription =
  "Share your project scope, preferred plan, timeline, and a quick note — we'll reply by email or WhatsApp.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/booking",
    siteName: brand.name,
    locale: "en_US",
    type: "website",
  },
};

export default function BookingPage() {
  return (
    <div className="page-shell">
      <ScrollCinematics />

      <section className="section section--tight booking-scale" aria-labelledby="scale-title">
        <div className="section__inner">
          <div className="section__head">
            <div>
              <p className="section__label" data-cinematic="rise">
                Scale
              </p>
              <h1
                className="section__title"
                data-cinematic="clip"
                data-cinematic-delay="1"
                id="scale-title"
              >
                Ready for Your Biggest Days.
              </h1>
            </div>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="2">
              From everyday operations to major campaigns, holidays and sudden demand
              spikes, EcomPros provides the team and capacity to keep your operation
              moving.
            </p>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="3">
              Your business grows. Your operation scales with it.
            </p>
          </div>
        </div>
      </section>

      <BookingSection>
        <div className="section__inner section__inner--wide">
          <p className="section__label booking-section__label">Book a call</p>

          <div className="booking-layout">
          <div data-cinematic="rise">
            <h2 className="section__title" id="booking-title">
              Bring the surface that needs to ship.
            </h2>
            <p className="section__copy">
              Share the rough shape, your preferred plan, the timeline you&apos;re
              considering, and a quick note about the project. We&apos;ll reply by email
              or WhatsApp.
            </p>

            <Button
              className="booking-whatsapp"
              href="https://wa.me/?+8001714437828" //make the number hide from the public
              rel="noreferrer"
              size="md"
              target="_blank"
              variant="secondary"
            >
              <svg
                aria-hidden="true"
                className="booking-whatsapp__icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.52 3.48A9.82 9.82 0 0 0 12.08 1.5C6.86 1.5 2.6 5.72 2.6 10.94c0 1.86.48 3.69 1.39 5.3L2.5 21.5l5.46-1.55a9.56 9.56 0 0 0 4.12 1.06h.01c5.22 0 9.47-4.25 9.47-9.47 0-2.53-.98-4.92-2.78-6.72ZM12.64 17.05c-1.3 0-2.59-.35-3.72-1.02l-.27-.16-3.24.92.87-3.16-.18-.29A7.92 7.92 0 0 1 3.5 10.94a8.56 8.56 0 0 1 8.58-8.58c2.29 0 4.44.89 6.07 2.52a8.53 8.53 0 0 1 2.5 6.06c-.02 4.72-3.82 8.53-8.53 8.53Zm4.72-6.36c-.26-.13-1.53-.75-1.76-.84-.24-.09-.4-.13-.56.13-.17.26-.65.84-.8 1.01-.15.17-.29.19-.55.07-.26-.13-1.09-.4-2.08-1.28-.77-.69-1.29-1.54-1.44-1.8-.15-.26-.02-.39.11-.52.11-.11.26-.29.39-.43.13-.14.17-.24.26-.4.09-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.45.06-.68.32-.24.26-.9.88-.9 2.15 0 1.27.92 2.49 1.05 2.66.13.17 1.79 2.72 4.33 3.81.61.26 1.08.42 1.45.54.62.2 1.18.17 1.62.1.49-.07 1.53-.62 1.75-1.22.22-.6.22-1.12.15-1.23-.07-.11-.25-.17-.52-.3Z"
                  fill="currentColor"
                />
              </svg>
              Chat on WhatsApp
            </Button>
          </div>

          <div className="booking-panel" data-cinematic="rise" data-cinematic-delay="2">
            <BookingForm />
          </div>
          </div>
        </div>
      </BookingSection>
    </div>
  );
}
