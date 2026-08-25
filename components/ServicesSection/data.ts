import type { LucideIcon } from "lucide-react";
import {
  Database,
  Boxes,
  Megaphone,
  LineChart,
  Code2,
  Palette,
  Headphones,
  ShoppingBag,
  Store,
  Package,
  Building2,
  Layers,
  Rocket,
  Percent,
  Search as SearchIcon,
  Radar,
  Mail,
  Share2,
  Target,
  Globe,
  ShoppingCart,
  Wallet,
  Braces,
  MonitorSmartphone,
  Image as ImageIcon,
  Video,
  Type,
  Newspaper,
  Gift,
  IdCard,
  MessageSquareText,
  UserCog,
  ClipboardList,
  Truck,
  Factory,
  PackageCheck,
  StoreIcon,
  Star,
  Users2,
  FileText,
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
    id: "data-management",
    label: "Data Management",
    eyebrow: "01 — Catalog",
    blurb:
      "Listing creation, catalog hygiene and marketplace-ready data across every channel you sell on.",
    stat: { value: "20+", label: "marketplaces synced" },
    groups: [
      {
        heading: "Marketplace Data Entry",
        items: [
          { label: "Amazon", icon: ShoppingBag },
          { label: "Walmart", icon: Store },
          { label: "eBay", icon: Package },
          { label: "Shop.com", icon: ShoppingCart },
          { label: "Big Commerce", icon: Building2 },
          { label: "Shopify", icon: ShoppingBag },
          { label: "Fruugo", icon: Globe },
          { label: "Best Buy", icon: StoreIcon },
          { label: "Over Stock", icon: Layers },
          { label: "Target +", icon: Target },
          { label: "Newegg", icon: Boxes },
          { label: "Houzz", icon: Building2 },
          { label: "Rakuten", icon: Store },
          { label: "Wish", icon: Star },
          { label: "Wayfair", icon: Building2 },
          { label: "Etsy", icon: Gift },
          { label: "Kohl's", icon: StoreIcon },
        ],
      },
    ],
  },
  {
    id: "multichannel",
    label: "Marketplace Operations",
    eyebrow: "02 — Ops",
    blurb:
      "We manage the daily operations that keep inventory, listings, pricing, and orders running smoothly across every channel.",
    stat: { value: "5", label: "core channels managed" },
    groups: [
      {
        heading: "Multichannel Ecommerce Services",
        items: [
          { label: "Channel Advisor", icon: Radar },
          { label: "Ecomdash", icon: Braces },
          { label: "Sellbrite", icon: Layers },
          { label: "Linnworks", icon: Boxes },
          { label: "Solid Commerce", icon: Database },
        ],
      },
    ],
  },
  {
    id: "sponsored-ads",
    label: "Ads & Growth",
    eyebrow: "03 — Growth",
    blurb:
      "Full-funnel marketplace and paid media growth, from campaign strategy to daily optimization and performance reporting.",
    stat: { value: "12+", label: "ad channels managed" },
    groups: [
      {
        heading: "Sponsor Ads Management",
        items: [
          { label: "Amazon", icon: ShoppingBag },
          { label: "Walmart", icon: Store },
          { label: "eBay", icon: Package },
          { label: "Etsy", icon: Gift },
          { label: "Over Stock", icon: Layers },
          { label: "Target +", icon: Target },
          { label: "Newegg", icon: Boxes },
          { label: "Macy's", icon: Star },
          { label: "Wayfair", icon: Building2 },
          { label: "Sears", icon: StoreIcon },
          { label: "Home Depot", icon: Building2 },
        ],
      },
      {
        heading: "Ads Used Software",
        items: [
          { label: "Helium 10", icon: LineChart },
          { label: "Channel Advisor", icon: Radar },
          { label: "Jungle Scout", icon: SearchIcon },
          { label: "Sellerboard", icon: LineChart },
          { label: "Sellozo", icon: Percent },
          { label: "Perpetua", icon: Rocket },
          { label: "Merchant Words", icon: FileText },
          { label: "Quartile", icon: Boxes },
          { label: "Criteo", icon: Target },
          { label: "Intentwise", icon: Radar },
          { label: "Bid X", icon: Percent },
          { label: "Trellis", icon: Layers },
          { label: "Teikametrics", icon: LineChart },
          { label: "PromoteIQ", icon: Megaphone },
        ],
      },
    ],
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    eyebrow: "04 — Demand",
    blurb:
      "Demand generation across email, social, search and paid — built to feed the marketplaces above.",
    stat: { value: "5", label: "acquisition channels" },
    groups: [
      {
        items: [
          { label: "Email Marketing", icon: Mail },
          { label: "Social Media Marketing", icon: Share2 },
          { label: "Lead Generation", icon: Users2 },
          { label: "Google PPC", icon: Target },
          { label: "Search Engine Optimization", icon: SearchIcon },
        ],
      },
    ],
  },
  {
    id: "website-development",
    label: "Ecommerce Website Development",
    eyebrow: "05 — Build",
    blurb:
      "Storefronts, product pages, and custom ecommerce builds designed to support sales, conversions, and order flow.",
    stat: { value: "10+", label: "platforms & stacks" },
    groups: [
      {
        items: [
          { label: "Shopify E-commerce", icon: ShoppingBag },
          { label: "WordPress E-commerce", icon: Globe },
          { label: "Magento E-commerce", icon: Building2 },
          { label: "Woo Commerce E-commerce", icon: ShoppingCart },
          { label: "Opencart Website Development", icon: Code2 },
          { label: "PrestaShop Website Development", icon: Code2 },
          { label: "X-Cart/Zen-cart Website Development", icon: Braces },
          { label: "Payment Gateway Integration", icon: Wallet },
          { label: "Laravel E-commerce", icon: Code2 },
          { label: "PHP Website", icon: Code2 },
          { label: "UX Website Development", icon: MonitorSmartphone },
          { label: "Node JS/Angular JS Website Development", icon: Braces },
        ],
      },
    ],
  },
  {
    id: "creative-graphics",
    label: "Creative Graphics",
    eyebrow: "06 — Visuals",
    blurb:
      "Conversion-focused imagery, from A+ content to social banners, produced on industry-standard tools.",
    stat: { value: "9", label: "deliverable types" },
    groups: [
      {
        heading: "Creative Graphic Services",
        items: [
          { label: "A+ Content design", icon: FileText },
          { label: "Photo editing", icon: ImageIcon },
          { label: "Brands store design", icon: Store },
          { label: "Feature Images", icon: ImageIcon },
          { label: "Video editing", icon: Video },
          { label: "Logo design", icon: Type },
          { label: "Newsletter design", icon: Newspaper },
          { label: "Social media banner design", icon: ImageIcon },
          { label: "Packaging gift card design", icon: Gift },
          { label: "ID card/Visiting Card Design/Flyer", icon: IdCard },
        ],
      },
      {
        heading: "Creative Graphic Used Software",
        items: [
          { label: "Adobe Photoshop", icon: Palette },
          { label: "Adobe Illustrator", icon: Palette },
          { label: "Adobe InDesign", icon: Palette },
          { label: "Adobe After Effect", icon: Video },
          { label: "Adobe Premier Pro", icon: Video },
        ],
      },
    ],
  },
  {
    id: "customer-support",
    label: "Customer Support & Fulfillment",
    eyebrow: "07 — Care",
    blurb:
      "End-to-end customer support, order management, shipping coordination, returns, and marketplace issue resolution for ecommerce brands.",
    stat: { value: "11", label: "support workflows" },
    groups: [
      {
        heading: "Customer Service Agent",
        items: [
          { label: "Responding Customer Inquiries", icon: MessageSquareText },
          { label: "Resolve Customer Complaints & Issues", icon: UserCog },
          { label: "Order Processing & Management", icon: ClipboardList },
          { label: "Return, Refund & Replacement Processing", icon: PackageCheck },
          { label: "Shipping Carrier Management", icon: Truck },
          { label: "Warehouse, Manufacturer & Freight Forwarder Management", icon: Factory },
          { label: "Shipment Creation & Tracking", icon: Truck },
          { label: "Contacting Marketplace Support", icon: Headphones },
          { label: "Feedback & Review Management", icon: Star },
          { label: "Social Media Support", icon: Share2 },
          { label: "Inbound Sales Management", icon: Rocket },
          { label: "Invoice & Shipping Label Management", icon: FileText },
          { label: "Reporting: Order Report & Performance Report", icon: LineChart },
        ],
      },
    ],
  },
];

export const TAB_ICONS: Record<string, LucideIcon> = {
  "data-management": Database,
  multichannel: Boxes,
  "sponsored-ads": Megaphone,
  "digital-marketing": LineChart,
  "website-development": Code2,
  "creative-graphics": Palette,
  "customer-support": Headphones,
};
