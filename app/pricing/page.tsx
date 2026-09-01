import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

import ScrollCinematics from "@/components/motion/ScrollCinematics";
import HoleRevealButton from "@/components/pricing/HoleRevealButton";
import PricingTabs from "@/components/pricing/PricingTabs";
import { brand } from "@/lib/brand";

const pageTitle = "Pricing Preview | Ecom ProDesk";
const pageDescription =
  "Monthly and long-term ecommerce operations pricing from Ecom ProDesk, scoped by order volume.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/pricing",
    siteName: brand.name,
    locale: "en_US",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <div className="pricing-page page-shell">
      <ScrollCinematics />

      <section className="pricing-hero" aria-labelledby="pricing-title">
        <div className="section__inner">
          <p className="section__label" data-cinematic="rise">
            Pricing preview
          </p>
          <h1 className="pricing-hero__title" data-cinematic="clip" id="pricing-title">
            Choose the support your business needs.
          </h1>
        </div>
      </section>

      <section className="section pricing-plans" aria-labelledby="pricing-plans-title">
        <div className="section__inner section__inner--wide">
          <div className="section__head">
            <p className="section__label" data-cinematic="rise">
              Plans
            </p>
            <h2
              className="section__title"
              data-cinematic="clip"
              data-cinematic-delay="1"
              id="pricing-plans-title"
            >
              Pick a billing period, see the tier that fits.
            </h2>
          </div>

          <div data-cinematic="rise" data-cinematic-delay="2">
            <PricingTabs />
          </div>
        </div>
      </section>

      <section className="pricing-cta section section--tight" aria-labelledby="pricing-cta-title">
        <div className="section__inner pricing-cta__inner">
          <h2 className="section__title" data-cinematic="clip" id="pricing-cta-title">
            Ready to see the plan that fits.
          </h2>
          <p className="section__copy" data-cinematic="rise" data-cinematic-delay="1">
            Walk through order volume, current gaps, and the tier that matches before
            anything is booked.
          </p>
          <div data-cinematic="rise" data-cinematic-delay="2">
            <HoleRevealButton className="btn btn--primary btn--lg" href="/#booking">
              Explore Plans
              <ArrowRight aria-hidden="true" size={18} />
            </HoleRevealButton>
          </div>
        </div>
      </section>
    </div>
  );
}
