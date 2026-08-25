"use client";

import { useEffect } from "react";

const CINEMATIC_SELECTOR = "[data-cinematic]";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function revealAll(elements: HTMLElement[]) {
  elements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

export default function ScrollCinematics() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(CINEMATIC_SELECTOR),
    );

    if (elements.length === 0) {
      return;
    }

    const root = document.documentElement;
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealAll(elements);
      return;
    }

    root.dataset.cinematics = "active";

    let frame = 0;
    let observer: IntersectionObserver | null = null;

    function revealElement(element: HTMLElement) {
      element.classList.add("is-visible");
      observer?.unobserve(element);
    }

    function revealVisibleElements() {
      const triggerLine = window.innerHeight * 0.88;
      const bottomReached =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

      elements.forEach((element) => {
        if (element.classList.contains("is-visible")) {
          return;
        }

        const rect = element.getBoundingClientRect();

        if ((rect.top <= triggerLine || bottomReached) && rect.bottom >= 0) {
          revealElement(element);
        }
      });
    }

    function scheduleRevealCheck() {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        revealVisibleElements();
      });
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealElement(entry.target as HTMLElement);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));
    revealVisibleElements();

    window.addEventListener("scroll", scheduleRevealCheck, { passive: true });
    window.addEventListener("resize", scheduleRevealCheck);

    function handleMotionPreferenceChange(event: MediaQueryListEvent) {
      if (!event.matches) {
        return;
      }

      revealAll(elements);
      observer?.disconnect();
      delete root.dataset.cinematics;
    }

    reducedMotion.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      window.removeEventListener("scroll", scheduleRevealCheck);
      window.removeEventListener("resize", scheduleRevealCheck);
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      delete root.dataset.cinematics;
    };
  }, []);

  return null;
}
