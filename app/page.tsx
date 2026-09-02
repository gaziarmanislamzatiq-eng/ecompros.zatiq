import {
  ArrowRight,
  Layers3,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

import HeroVideoScale from "@/components/motion/HeroVideoScale";
import Ferrofluid from "@/components/effects/Ferrofluid";
import RollingStats from "@/components/effects/RollingStats";
import ServicesSection from "@/components/ServicesSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ScrollCinematics from "@/components/motion/ScrollCinematics";
import BookingForm from "@/components/sections/BookingForm";
import BookingSection from "@/components/sections/BookingSection";
import Button from "@/components/ui/Button";
import PortfolioPreview from "@/components/portfolio/PortfolioPreview";
import { portfolioProjects, portfolioTabs } from "@/lib/portfolio";

type Capability = {
  body: string;
  icon: LucideIcon;
  title: string;
};

type ProcessStep = {
  body: string;
  mark: string;
  title: string;
};

type ClientLogo = {
  height: number;
  name: string;
  src: string;
  width: number;
};

const processSteps: ProcessStep[] = [
  {
    mark: "Frame",
    title: "Define the surface",
    body:
      "Clarify the audience, primary action, service boundaries, and proof that can honestly be shown now.",
  },
  {
    mark: "Shape",
    title: "Design the system",
    body:
      "Turn the offer into a responsive page structure, token set, interface rhythm, and image direction.",
  },
  {
    mark: "Build",
    title: "Implement the front end",
    body:
      "Ship the Next.js surface with accessible states, local assets, and production-ready responsive behavior.",
  },
  {
    mark: "Extend",
    title: "Prepare the next layer",
    body:
      "Leave the system ready for real case studies, booking infrastructure, product screenshots, and proof assets.",
  },
];

const clientLogos: ClientLogo[] = [
  {
    name: "Instaheadshots",
    src: "/clients/Instaheadshots.png",
    width: 2412,
    height: 960,
  },
  {
    name: "Ultra",
    src: "/clients/Ultra.png",
    width: 2816,
    height: 628,
  },
  {
    name: "Zest",
    src: "/clients/Zest.png",
    width: 880,
    height: 196,
  },
  {
    name: "Deos",
    src: "/clients/deos.png",
    width: 2296,
    height: 1024,
  },
  {
    name: "OnePlateMeal",
    src: "/clients/one%20plate%20meal.png",
    width: 500,
    height: 500,
  },
  {
    name: "Solarstock",
    src: "/clients/solarstock.png",
    width: 8812,
    height: 1736,
  },
  {
    name: "TapCon",
    src: "/clients/tapcon.png",
    width: 611,
    height: 725,
  },
  {
    name: "vidIQ",
    src: "/clients/vidiq.png",
    width: 3200,
    height: 1344,
  },
];

const clientLogoMarqueeGroups = ["primary", "duplicate"] as const;

export default function Home() {
  return (
    <div className="page-shell">
      <ScrollCinematics />
      <section
          className="hero-showcase"
        aria-labelledby="hero-title"
        data-hero-video-scale
        data-video-state="paused"
      >
        <HeroVideoScale />
        <div className="hero-showcase__bg">
          <Ferrofluid
            colors={["#EB461D", "#EB461D", "#EB461D"]}
            speed={0.3}
            scale={1.6}
            turbulence={0.8}
            fluidity={0.15}
            rimWidth={0.25}
            sharpness={2.5}
            shimmer={1.5}
            glow={1.5}
            flowDirection="down"
            opacity={0.5}
            mouseInteraction={true}
            mouseStrength={0.8}
            mouseRadius={0.4}
            mouseDampening={0.15}
          />
        </div>
        <div className="hero-showcase__sticky">
          <div className="hero-showcase__copy">
            <p className="hero-showcase__eyebrow" data-cinematic="rise">
              HUMAN-POWERED ECOMMERCE OPERATIONS. 24/7.
            </p>
            <h1 className="hero-showcase__title" data-cinematic="clip" id="hero-title">
              Great Ecommerce Has Great People Behind It.
            </h1>
            <p className="hero-showcase__text" data-cinematic="rise" data-cinematic-delay="1">
              A dedicated ecommerce team handling your operations, customer support,
              creative, marketing and technology — powered by people, automation and AI.
            </p>
            <RollingStats />
            <div
              className="hero-showcase__actions"
              data-cinematic="rise"
              data-cinematic-delay="2"
            >
              <Button href="/pricing" size="lg">
                Explore Plans
                <ArrowRight aria-hidden="true" size={18} />
              </Button>
            </div>
          </div>

          <div className="hero-showcase__media-area">
            <div className="hero-showcase__media">
              <span className="hero-showcase__play-indicator" aria-hidden="true" />
              <video
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="hero-showcase__video"
                data-desktop-src="/assets/F6.mp4"
                data-mobile-src="/assets/F4_MOBILE.MP4"
              >
                <source
                  media="(max-width: 39.99rem)"
                  src="/assets/F4_MOBILE.MP4"
                  type="video/mp4"
                />
                <source src="/assets/F6.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services" aria-labelledby="services-title">
        <div className="section__inner section__inner--wide">
          <div className="section__head">
            <div>
              <p className="section__label" data-cinematic="rise">
                Services
              </p>
              <h2
                className="section__title"
                data-cinematic="clip"
                data-cinematic-delay="1"
                id="services-title"
              >
                Everything your ecommerce business needs to grow.
              </h2>
            </div>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="2">
              One practical partner for catalog management, marketplace
              operations, order fulfillment, customer care, marketing, and
              ecommerce development.
            </p>
          </div>
          <ServicesGrid />
        </div>
      </section>

      <ServicesSection />

      <section
        className="section portfolio-preview"
        id="portfolio-preview"
        aria-labelledby="portfolio-preview-title"
      >
        <div className="section__inner section__inner--wide">
          <div className="section__head portfolio-preview__head">
            <div>
              <h2
                className="section__title"
                data-cinematic="clip"
                id="portfolio-preview-title"
              >
                Working systems, not placeholder case studies.
              </h2>
            </div>
            <div className="portfolio-preview__intro" data-cinematic="rise" data-cinematic-delay="2">
              <p className="section__copy">
                From marketplace operations and customer support to storefronts,
                creative work, and growth, explore the services that keep your
                ecommerce business moving.
              </p>
              <Button href="/portfolio" size="sm" variant="secondary">
                View portfolio
                <ArrowRight aria-hidden="true" size={16} />
              </Button>
            </div>
          </div>

          <PortfolioPreview projects={portfolioProjects} tabs={portfolioTabs} />
        </div>
      </section>

      <section className="section section--tight" id="process" aria-labelledby="process-title">
        <div className="section__inner">
          <div className="section__head">
            <div>
              <p className="section__label" data-cinematic="rise">
                Process
              </p>
              <h2
                className="section__title"
                data-cinematic="clip"
                data-cinematic-delay="1"
                id="process-title"
              >
                From vague ask to usable surface.
              </h2>
            </div>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="2">
              The process is designed for small teams that need momentum and
              decisions, not a long discovery theater.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article
                className="process-step"
                data-cinematic="rise"
                data-cinematic-delay={`${index + 1}`}
                key={step.title}
              >
                <span className="process-step__mark">{step.mark}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight client-section" id="proof" aria-labelledby="proof-title">
        <div className="section__inner section__inner--wide">
          <div className="section__head client-section__head">
            <div>
              <p className="section__label" data-cinematic="rise">
                Client logos
              </p>
              <h2
                className="section__title"
                data-cinematic="clip"
                data-cinematic-delay="1"
                id="proof-title"
              >
                Client marks, carried as proof.
              </h2>
            </div>
            <p className="section__copy" data-cinematic="rise" data-cinematic-delay="2">
              The strip uses the logos currently supplied in the project, without
              inventing quotes, metrics, or case-study claims.
            </p>
          </div>

          <div className="client-proof">
            <p className="client-proof__eyebrow">Already Powering Ecommerce Worldwide.</p>
            <div className="client-proof__grid">
              <div className="client-proof__item">
                <span className="client-proof__value">1,000+</span>
                <span className="client-proof__label">Clients</span>
              </div>
              <div className="client-proof__item">
                <span className="client-proof__value">6+</span>
                <span className="client-proof__label">Countries</span>
              </div>
              <div className="client-proof__item">
                <span className="client-proof__value">4M+</span>
                <span className="client-proof__label">Annual Orders Processed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="client-marquee" aria-label="Client logos" data-cinematic="rise" data-cinematic-delay="3">
          <ul className="client-marquee__sr-list">
            {clientLogos.map((client) => (
              <li key={client.name}>{client.name}</li>
            ))}
          </ul>

          <div className="client-marquee__viewport" aria-label="Client logo strip" tabIndex={0}>
            <div className="client-marquee__track" aria-hidden="true">
              {clientLogoMarqueeGroups.map((group) => (
                <div className="client-marquee__group" key={group}>
                  {clientLogos.map((client) => (
                    <figure className="client-marquee__item" key={`${group}-${client.name}`}>
                      <Image
                        alt=""
                        className="client-marquee__image"
                        draggable={false}
                        height={client.height}
                        loading={group === "primary" ? "eager" : "lazy"}
                        sizes="(max-width: 639px) 9rem, 11rem"
                        src={client.src}
                        width={client.width}
                      />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BookingSection>
        <div className="section__inner section__inner--wide booking-layout">
          <div data-cinematic="rise">
            <p className="section__label">Book a call</p>
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
              href="https://wa.me/?text=Hi%20Ecom%20ProDesk%2C%20I%20want%20to%20discuss%20a%20project."
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
      </BookingSection>
    </div>
  );
}
