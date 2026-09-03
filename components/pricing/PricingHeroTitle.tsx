"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function PricingHeroTitle({ title }: { title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return;

    // Split text into characters and words
    const split = SplitText.create(titleRef.current, {
      type: "chars, words",
      charsClass: "split-char",
      wordsClass: "split-word",
    });

    // Initial staggered entrance animation
    gsap.from(split.chars, {
      yPercent: 120,
      opacity: 0,
      ease: "back.out(1.2)",
      duration: 0.6,
      stagger: 0.04,
      delay: 0.2,
    });

    // Main horizontal scroll animation - slower and readable
    const scrollTween = gsap.to(titleRef.current, {
      xPercent: -100,
      ease: "none",
      duration: 15,
      repeat: -1,
      repeatDelay: 1,
      delay: 1,
    });

    scrollTweenRef.current = scrollTween;

    // Handle hover to slow down animation
    const handleMouseEnter = () => {
      if (scrollTweenRef.current) {
        gsap.to(scrollTweenRef.current, {
          timeScale: 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      if (scrollTweenRef.current) {
        gsap.to(scrollTweenRef.current, {
          timeScale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const element = titleRef.current;
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      split.revert();
      scrollTween.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="pricing-hero__title-container">
      <h1
        ref={titleRef}
        className="pricing-hero__title pricing-hero__title--animated"
        id="pricing-title"
      >
        {title} • {title} • {title} •
      </h1>
    </div>
  );
}
