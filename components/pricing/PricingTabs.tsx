"use client";

import { useMemo, useState } from "react";

import InfiniteCardCarousel from "@/components/pricing/InfiniteCardCarousel";
import {
  baseRateNote,
  enterpriseNote,
  getPlansForPeriod,
  periodLabels,
  periodOrder,
  type PricingPeriod,
} from "@/lib/pricing";

export default function PricingTabs() {
  const [period, setPeriod] = useState<PricingPeriod>("monthly");
  const cards = useMemo(() => getPlansForPeriod(period), [period]);

  return (
    <div className="pricing-tabs">
      <div aria-label="Billing period" className="pricing-tabs__list" role="tablist">
        {periodOrder.map((key) => (
          <button
            aria-selected={period === key}
            className="pricing-tabs__tab"
            data-active={period === key ? "true" : undefined}
            key={key}
            onClick={() => setPeriod(key)}
            role="tab"
            type="button"
          >
            {periodLabels[key]}
          </button>
        ))}
      </div>

      <InfiniteCardCarousel ariaLabel={`${periodLabels[period]} pricing plans`} cards={cards} />

      <p className="pricing-note">
        {baseRateNote} {enterpriseNote}
      </p>
    </div>
  );
}
