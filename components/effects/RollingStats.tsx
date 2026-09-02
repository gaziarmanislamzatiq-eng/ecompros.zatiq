"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const STAT_ITEMS = [
  "1,000+ Clients · 6+ Countries · 4M+ Orders Processed Annually",
  "120+ Brands Managed · 24/7 Support Coverage · 99.9% SLA Focus",
  "40+ Channel Experts · Multi-Platform Operations · Growth Without the Chaos",
];

export default function RollingStats() {
  const currentRef = useRef<HTMLSpanElement | null>(null);
  const nextRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const current = currentRef.current;
    const next = nextRef.current;
    if (!current || !next) return;

    gsap.set([current, next], { xPercent: 0, yPercent: 0, opacity: 1 });
    gsap.set(next, { yPercent: 100, opacity: 0 });

    let activeNode = current;
    let nextNode = next;
    let index = 0;

    const cycle = () => {
      const nextText = STAT_ITEMS[(index + 1) % STAT_ITEMS.length];
      nextNode.textContent = nextText;

      gsap.fromTo(
        activeNode,
        { yPercent: 0, opacity: 1, filter: "blur(0px)" },
        {
          yPercent: -100,
          opacity: 0,
          filter: "blur(4px)",
          duration: 0.5,
          ease: "power2.inOut",
          clearProps: "transform, opacity, filter",
        }
      );

      gsap.fromTo(
        nextNode,
        { yPercent: 100, opacity: 0, filter: "blur(6px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.55,
          ease: "power2.out",
          clearProps: "transform, opacity, filter",
          onComplete: () => {
            const temp = activeNode;
            activeNode = nextNode;
            nextNode = temp;
            index = (index + 1) % STAT_ITEMS.length;
            gsap.set(activeNode, { yPercent: 0, opacity: 1, filter: "blur(0px)" });
            gsap.set(nextNode, { yPercent: 100, opacity: 0, filter: "blur(6px)" });
          },
        }
      );
    };

    const timer = window.setInterval(cycle, 1500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hero-showcase__stats" data-cinematic="rise" data-cinematic-delay="1" aria-live="polite">
      <span ref={currentRef} className="hero-showcase__stats-line">
        {STAT_ITEMS[0]}
      </span>
      <span ref={nextRef} className="hero-showcase__stats-line hero-showcase__stats-line--next">
        {STAT_ITEMS[1]}
      </span>
    </div>
  );
}
