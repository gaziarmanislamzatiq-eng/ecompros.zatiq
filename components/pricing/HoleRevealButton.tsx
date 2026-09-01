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
  const state = useRef({ scale: 0, x: 0, y: 0 });

  useEffect(() => {
    const anchor = anchorRef.current;
    const overlay = overlayRef.current;
    if (!anchor || !overlay) return;

    const canHover = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canHover.matches || reducedMotion.matches) return;

    const pointerState = state.current;

    function applyPosition() {
      overlay!.style.setProperty("--hole-x", `${pointerState.x}px`);
      overlay!.style.setProperty("--hole-y", `${pointerState.y}px`);
    }

    function applyScale() {
      overlay!.style.setProperty("--hole-scale", `${pointerState.scale}`);
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

    function handlePointerMove(event: PointerEvent) {
      quickX(event.clientX);
      quickY(event.clientY);
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
    }

    anchor.addEventListener("pointerenter", handleEnter);
    anchor.addEventListener("pointerleave", handleLeave);

    return () => {
      anchor.removeEventListener("pointerenter", handleEnter);
      anchor.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("pointermove", handlePointerMove);
      gsap.killTweensOf(pointerState);
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
