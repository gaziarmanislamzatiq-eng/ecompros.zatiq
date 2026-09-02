"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HorizontalTextAnimationProps {
  selector: string;
  duration?: number;
  delay?: number;
  ease?: string;
}

export default function HorizontalTextAnimation({
  selector,
  duration = 1.2,
  delay = 0,
  ease = "power3.out",
}: HorizontalTextAnimationProps) {
  const animatedRef = useRef(false);

  useEffect(() => {
    if (animatedRef.current) return;

    const element = document.querySelector<HTMLElement>(selector);
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    animatedRef.current = true;

    // Wrap each word in a span for individual animation
    const text = element.textContent || "";
    const words = text.split(" ");

    element.innerHTML = words
      .map((word) => `<span class="horizontal-text-word" style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`)
      .join(" ");

    // Animate each word horizontally
    const wordElements = element.querySelectorAll<HTMLElement>(".horizontal-text-word span");

    gsap.fromTo(
      wordElements,
      {
        xPercent: 100,
        opacity: 0,
      },
      {
        xPercent: 0,
        opacity: 1,
        duration,
        ease,
        stagger: 0.08,
        delay,
      }
    );

    return () => {
      gsap.killTweensOf(wordElements);
    };
  }, [selector, duration, delay, ease]);

  return null;
}
