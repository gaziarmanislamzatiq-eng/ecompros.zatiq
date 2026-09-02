"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

type MagneticButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/**
 * A "magnetic" CTA: the button eases toward the pointer within a small
 * radius, then snaps back with an elastic ease on release. Classic
 * high-intent CRO pattern — it makes the single most important action on
 * the section feel alive without distracting from the content.
 */
export default function MagneticButton({
  href = "#contact",
  onClick,
  children,
  variant = "primary",
  className = "",
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      moveX(relX * 0.35);
      moveY(relY * 0.5);
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14.5px] font-semibold tracking-tight transition-colors duration-300 will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-orange-600 text-white hover:bg-orange-700"
      : "bg-[var(--color-paper)] text-[var(--color-ink)] ring-1 ring-inset ring-[var(--color-rule)] hover:bg-[var(--color-accent-soft)] hover:ring-[var(--color-brand-accent)]";

  return (
    <a
      ref={btnRef}
      href={href}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {children}
      <ArrowUpRight
        size={16}
        strokeWidth={2}
        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
