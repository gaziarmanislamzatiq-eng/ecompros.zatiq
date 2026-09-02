"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const HOVER_SELECTOR =
  'a, button, [role="button"], input[type="submit"], input[type="button"], label, summary, [data-cursor-hover]';
const TEXT_SELECTOR = 'input:not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';

function getContrastThemeForElement(element: HTMLElement | null): "light" | "dark" | "default" {
  let current = element;

  while (current && current !== document.body) {
    const style = window.getComputedStyle(current);
    const bg = style.backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/i);
      if (match) {
        const r = Number(match[1]);
        const g = Number(match[2]);
        const b = Number(match[3]);
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        return luminance > 0.58 ? "dark" : "light";
      }

      if (bg.startsWith("var(")) {
        return "light";
      }
    }

    current = current.parentElement;
  }

  return "default";
}

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canHover = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reducedMotion.matches) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return;

    document.body.classList.add("has-custom-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const moveDot = gsap.quickTo(dot, "x", { duration: 0.09, ease: "power3.out" });
    const moveDotY = gsap.quickTo(dot, "y", { duration: 0.09, ease: "power3.out" });
    const moveRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const moveRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    let hasEntered = false;

    function handlePointerMove(event: PointerEvent) {
      if (!hasEntered) {
        hasEntered = true;
        gsap.set([dot, ring], { x: event.clientX, y: event.clientY });
        root!.dataset.visible = "true";
      }
      moveDot(event.clientX);
      moveDotY(event.clientY);
      moveRing(event.clientX);
      moveRingY(event.clientY);
    }

    function handlePointerDown() {
      root!.dataset.pressed = "true";
    }

    function handlePointerUp() {
      delete root!.dataset.pressed;
    }

    function handlePointerOver(event: PointerEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const theme = getContrastThemeForElement(target);
      root!.dataset.theme = theme;

      if (target.closest(TEXT_SELECTOR)) {
        root!.dataset.state = "text";
        return;
      }

      if (target.closest(HOVER_SELECTOR)) {
        root!.dataset.state = "hover";
        return;
      }

      delete root!.dataset.state;
    }

    function handleLeaveWindow() {
      root!.dataset.visible = "false";
    }

    function handleEnterWindow() {
      root!.dataset.visible = "true";
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("mouseleave", handleLeaveWindow);
    document.addEventListener("mouseenter", handleEnterWindow);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("mouseleave", handleLeaveWindow);
      document.removeEventListener("mouseenter", handleEnterWindow);
    };
  }, []);

  return (
    <div aria-hidden="true" className="custom-cursor" data-visible="false" ref={rootRef}>
      <div className="custom-cursor__ring" ref={ringRef}>
        <span className="custom-cursor__bracket custom-cursor__bracket--tl" />
        <span className="custom-cursor__bracket custom-cursor__bracket--tr" />
        <span className="custom-cursor__bracket custom-cursor__bracket--bl" />
        <span className="custom-cursor__bracket custom-cursor__bracket--br" />
      </div>
      <div className="custom-cursor__dot" ref={dotRef} />
    </div>
  );
}
