"use client";

import type { CSSProperties } from "react";
import type { ServiceItem } from "./data";
import { useTilt } from "./useTilt";

// CSS custom properties (--glare-x / --glare-y) aren't part of the
// standard CSSProperties type, so we widen it locally for this one style.
type CardStyle = CSSProperties & {
  "--glare-x"?: string | number;
  "--glare-y"?: string | number;
};

const initialGlareStyle: CardStyle = {
  "--glare-x": 50,
  "--glare-y": 50,
};

export default function ServiceCard({ item }: { item: ServiceItem }) {
  const ref = useTilt<HTMLDivElement>(8);
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className="service-card group relative flex items-center gap-3 rounded-[1.35rem] border border-black/[0.06] bg-white p-3.5 shadow-[0_1px_2px_rgba(17,17,18,0.04)] transition-shadow duration-300 will-change-transform hover:shadow-[0_18px_40px_-16px_rgba(76,29,149,0.35)]"
      style={initialGlareStyle}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[1.35rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(220px_circle_at_calc(var(--glare-x)*1%)_calc(var(--glare-y)*1%),rgba(234,88,12,0.14),transparent_70%)]"
      />
      <span className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.8rem] bg-orange-50 text-orange-700 transition-colors duration-300 group-hover:bg-orange-600 group-hover:text-white">
        <Icon size={17} strokeWidth={1.75} />
      </span>
      <span className="relative z-[1] flex-1 text-[13.5px] font-medium leading-[1.3] text-neutral-800">
        {item.label}
      </span>
    </div>
  );
}
