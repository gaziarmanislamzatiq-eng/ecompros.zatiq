"use client";

import {
  IconCode,
  IconMovie,
  IconPalette,
  IconShieldCheck,
  IconSpeakerphone,
  IconWorldWww,
} from "@tabler/icons-react";
import Link from "next/link";
import type { ComponentType } from "react";

import { services, type ServiceSlug } from "@/lib/services";

type ServiceIcon = ComponentType<{
  "aria-hidden"?: boolean;
  className?: string;
  size?: number;
}>;

const serviceIcons: Record<ServiceSlug, ServiceIcon> = {
  "brand-ready-systems": IconPalette,
  "cybersecurity-helper": IconShieldCheck,
  "marketing-branding-seo": IconSpeakerphone,
  "motion-video-design": IconMovie,
  "software-product-development": IconCode,
  "web-design-development": IconWorldWww,
};

export default function ServicesGrid() {
  return (
    <div className="home-services-grid">
      {services.map((service, index) => (
        <Feature key={service.slug} index={index} service={service} />
      ))}
    </div>
  );
}

function Feature({
  index,
  service,
}: {
  index: number;
  service: (typeof services)[number];
}) {
  const Icon = serviceIcons[service.slug];

  return (
    <Link
      className="home-service-card"
      data-cinematic="rise"
      data-cinematic-delay={Math.min(index + 1, 6)}
      href={`/services/${service.slug}`}
    >
      <span className="home-service-card__top">
        <span className="home-service-card__icon">
          <Icon aria-hidden={true} className="home-service-card__svg" size={24} />
        </span>
        <span className="home-service-card__count">
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>
      <span className="home-service-card__title">{service.title}</span>
      <span className="home-service-card__description">{service.homeDescription}</span>
      <span className="home-service-card__action">View details</span>
    </Link>
  );
}
