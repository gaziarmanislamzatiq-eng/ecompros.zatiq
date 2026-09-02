"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import Link from "next/link";

type HoleRevealButtonProps = {
  children: ReactNode;
  className?: string;
  href: string;
};

export default function HoleRevealButton({ children, className, href }: HoleRevealButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const state = useRef({ scale: 0, x: 0, y: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const anchor = anchorRef.current;
    const overlay = overlayRef.current;
    if (!anchor || !overlay) return;

    const anchorElement = anchor;
    const overlayElement = overlay;
    const canHover = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reducedMotion.matches) return;

    const pointerState = state.current;

    function applyPosition() {
      overlayElement.style.setProperty("--hole-x", `${pointerState.x}px`);
      overlayElement.style.setProperty("--hole-y", `${pointerState.y}px`);
    }

    function applyScale() {
      overlayElement.style.setProperty("--hole-scale", `${pointerState.scale}`);
    }

    const quickX = gsap.quickTo(pointerState, "x", {
      duration: 0.5,
      ease: "power3.out",
      onUpdate: applyPosition,
    });
    const quickY = gsap.quickTo(pointerState, "y", {
      duration: 0.5,
      ease: "power3.out",
      onUpdate: applyPosition,
    });

    const tiltX = gsap.quickTo(anchorElement, "rotateX", {
      duration: 0.45,
      ease: "power3.out",
    });
    const tiltY = gsap.quickTo(anchorElement, "rotateY", {
      duration: 0.45,
      ease: "power3.out",
    });
    const offsetX = gsap.quickTo(anchorElement, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const offsetY = gsap.quickTo(anchorElement, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    function handlePointerMove(event: PointerEvent) {
      const rect = anchorElement.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;

      quickX(event.clientX);
      quickY(event.clientY);
      tiltY(px * 12);
      tiltX(py * -12);
      offsetX(px * 6);
      offsetY(py * 6);
    }

    function handleEnter(event: PointerEvent) {
      pointerState.x = event.clientX;
      pointerState.y = event.clientY;
      applyPosition();
      gsap.to(pointerState, {
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        onUpdate: applyScale,
      });
      window.addEventListener("pointermove", handlePointerMove);
    }

    function handleLeave() {
      window.removeEventListener("pointermove", handlePointerMove);
      gsap.to(pointerState, {
        scale: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onUpdate: applyScale,
      });
      gsap.to(anchorElement, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }

    anchorElement.addEventListener("pointerenter", handleEnter);
    anchorElement.addEventListener("pointerleave", handleLeave);

    return () => {
      anchorElement.removeEventListener("pointerenter", handleEnter);
      anchorElement.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("pointermove", handlePointerMove);
      gsap.killTweensOf(pointerState);
      gsap.killTweensOf(anchorElement);
    };
  }, []);

  return (
    <>
      <Link className={className ?? "btn btn--primary btn--lg"} href={href} ref={anchorRef}>
        {children}
      </Link>
      <div aria-hidden="true" className="hole-reveal" ref={overlayRef} />
    </>
  );
}
