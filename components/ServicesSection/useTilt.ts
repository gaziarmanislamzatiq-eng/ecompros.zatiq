"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Attaches a subtle pointer-driven 3D tilt + glare to whatever element the
 * returned ref is bound to. Uses gsap.quickTo so the tilt eases smoothly
 * every frame instead of snapping straight to the pointer position.
 */
export function useTilt<T extends HTMLElement>(strength = 10) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (window.matchMedia("(pointer: coarse)").matches) {
      // Skip tilt on touch devices — pointer position is meaningless there.
      return;
    }

    const rotateX = gsap.quickTo(el, "rotateX", {
      duration: 0.6,
      ease: "power3.out",
    });
    const rotateY = gsap.quickTo(el, "rotateY", {
      duration: 0.6,
      ease: "power3.out",
    });
    const translateY = gsap.quickTo(el, "y", {
      duration: 0.6,
      ease: "power3.out",
    });
    const glareX = gsap.quickTo(el, "--glare-x", {
      duration: 0.4,
      ease: "power2.out",
    });
    const glareY = gsap.quickTo(el, "--glare-y", {
      duration: 0.4,
      ease: "power2.out",
    });

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      rotateY(( px - 0.5) * strength * 2);
      rotateX(-(py - 0.5) * strength * 2);
      translateY(-4);
      glareX(px * 100);
      glareY(py * 100);
    };

    const handleLeave = () => {
      rotateX(0);
      rotateY(0);
      translateY(0);
    };

    el.style.transformStyle = "preserve-3d";
    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [strength]);

  return ref;
}
