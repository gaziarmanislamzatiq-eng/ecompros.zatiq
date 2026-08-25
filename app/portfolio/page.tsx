import type { Metadata } from "next";

import ScrollCinematics from "@/components/motion/ScrollCinematics";
import PortfolioShowcase from "@/components/portfolio/PortfolioShowcase";
import { brand } from "@/lib/brand";
import { portfolioProjects, portfolioTabs } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio | Ecom ProDesk",
  description:
    "Selected Ecom ProDesk website, application, video editing, motion design, marketing, and SEO work across product systems and social-ready media.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Portfolio | Ecom ProDesk",
    description:
      "Selected Ecom ProDesk website, application, video editing, motion design, marketing, and SEO work across product systems and social-ready media.",
    url: "/portfolio",
    siteName: brand.name,
    images: [
      {
        url: "/portfolio/web/tapcon/cover.png",
        width: 1536,
        height: 1024,
        alt: "TapCon platform interface preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Ecom ProDesk",
    description:
      "Selected Ecom ProDesk website, application, video editing, motion design, marketing, and SEO work across product systems and social-ready media.",
    images: ["/portfolio/web/tapcon/cover.png"],
  },
};

export default function PortfolioPage() {
  return (
    <div className="portfolio-page page-shell">
      <ScrollCinematics />
      <section className="portfolio-hero" aria-labelledby="portfolio-title">
        <div className="portfolio-hero__inner">
          <div className="portfolio-hero__content">
            <p className="section__label" data-cinematic="rise">
              Selected work
            </p>
            <h1 className="portfolio-hero__title" data-cinematic="clip" id="portfolio-title">
              Digital systems and motion work built to ship.
            </h1>
          </div>
          <p className="portfolio-hero__copy" data-cinematic="rise" data-cinematic-delay="1">
            Full-stack products, campaign videos, podcast edits, and motion
            graphics shaped for clients who need the work to look finished and
            function in the real world.
          </p>
        </div>
      </section>

      <PortfolioShowcase projects={portfolioProjects} tabs={portfolioTabs} />
    </div>
  );
}
