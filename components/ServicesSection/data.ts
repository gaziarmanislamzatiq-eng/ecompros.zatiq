import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Code2,
  Headphones,
  Megaphone,
  Palette,
  PackageCheck,
  ShoppingBag,
  Store,
  Truck,
  Video,
  Wand2,
  Workflow,
  ArrowUpRight,
  Sparkles,
  MonitorSmartphone,
  Search,
} from "lucide-react";

export type ServiceItem = {
  label: string;
  icon: LucideIcon;
};

export type ServiceGroup = {
  heading?: string;
  items: ServiceItem[];
};

export type ServiceTab = {
  id: string;
  label: string;
  eyebrow: string;
  blurb: string;
  stat: { value: string; label: string };
  groups: ServiceGroup[];
};

export const SERVICE_TABS: ServiceTab[] = [
  {
    id: "operations",
    label: "Operations",
    eyebrow: "01 — Operations",
    blurb: "Orders, customer support, fulfilment and operational care across your store and channels.",
    stat: { value: "24/7", label: "store coverage" },
    groups: [
      {
        items: [
          { label: "Orders", icon: ShoppingBag },
          { label: "Customer Support", icon: Headphones },
          { label: "Fulfilment", icon: PackageCheck },
          { label: "Courier Coordination", icon: Truck },
          { label: "Follow-ups", icon: Workflow },
          { label: "Store Management", icon: Store },
        ],
      },
    ],
  },
  {
    id: "creative",
    label: "Creative",
    eyebrow: "02 — Creative",
    blurb: "Design and production that gives your ecommerce brand a stronger look and a stronger pull.",
    stat: { value: "6", label: "creative services" },
    groups: [
      {
        items: [
          { label: "Graphics", icon: Palette },
          { label: "Videos", icon: Video },
          { label: "Animations", icon: Sparkles },
          { label: "Branding", icon: Wand2 },
          { label: "Content", icon: ArrowUpRight },
          { label: "AI Creative", icon: Sparkles },
        ],
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    eyebrow: "03 — Marketing",
    blurb: "SEO, ads and performance campaigns built to drive better traffic, better conversion and better growth.",
    stat: { value: "360°", label: "growth view" },
    groups: [
      {
        items: [
          { label: "SEO", icon: Search },
          { label: "Ads", icon: Megaphone },
          { label: "Campaigns", icon: Boxes },
          { label: "Optimization", icon: Workflow },
          { label: "Growth", icon: ArrowUpRight },
        ],
      },
    ],
  },
  {
    id: "technology",
    label: "Technology",
    eyebrow: "04 — Technology",
    blurb: "Web design, development and integrations that keep your ecommerce stack efficient and scalable.",
    stat: { value: "100%", label: "digital backbone" },
    groups: [
      {
        items: [
          { label: "Web Design", icon: MonitorSmartphone },
          { label: "Development", icon: Code2 },
          { label: "Integrations", icon: Boxes },
          { label: "Automation", icon: Workflow },
          { label: "AI Implementation", icon: Sparkles },
        ],
      },
    ],
  },
];

export const TAB_ICONS: Record<string, LucideIcon> = {
  operations: Headphones,
  creative: Palette,
  marketing: Megaphone,
  technology: Code2,
};
