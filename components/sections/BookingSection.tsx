"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

type BookingSectionProps = {
  children: ReactNode;
};

type BookingSectionStyle = CSSProperties & {
  "--cursor-x"?: string;
  "--cursor-y"?: string;
};

export default function BookingSection({ children }: BookingSectionProps) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--cursor-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--cursor-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--cursor-x", "50%");
    event.currentTarget.style.setProperty("--cursor-y", "50%");
  };

  return (
    <section
      className="section booking-section"
      id="booking"
      aria-labelledby="booking-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ "--cursor-x": "50%", "--cursor-y": "50%" } as BookingSectionStyle}
    >
      {children}
    </section>
  );
}
