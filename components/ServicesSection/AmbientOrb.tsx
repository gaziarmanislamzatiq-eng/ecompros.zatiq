"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export default function AmbientOrb() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.opacity = "0.9";
    mount.appendChild(canvas);

    const context = canvas.getContext("2d");
    if (!context) return;

    const points: Particle[] = [];
    let width = mount.clientWidth;
    let height = mount.clientHeight;
    let rafId = 0;
    let pointerX = 0;
    let pointerY = 0;
    let isVisible = true;

    const createParticles = () => {
      points.length = 0;
      const count = Math.min(48, Math.max(26, Math.round((width * height) / 18)));

      for (let i = 0; i < count; i += 1) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 2.1 + 1.1,
        });
      }
    };

    const resizeCanvas = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove);

    resizeCanvas();

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const baseHue = 50;
      const offsetX = pointerX * 22;
      const offsetY = pointerY * 18;

      for (let i = 0; i < points.length; i += 1) {
        const particle = points[i];
        particle.x += particle.vx + (pointerX * 0.18);
        particle.y += particle.vy + (pointerY * 0.12);

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        const glow = 0.12 + (Math.sin(Date.now() * 0.001 + i) + 1) * 0.1;
        context.beginPath();
        context.fillStyle = `hsla(${baseHue}, 100%, 96%, ${0.22 + glow})`;
        context.arc(
          particle.x + offsetX * 0.35,
          particle.y + offsetY * 0.35,
          particle.radius,
          0,
          Math.PI * 2
        );
        context.fill();
      }

      for (let i = 0; i < points.length; i += 1) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j += 1) {
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 120) {
            const opacity = 1 - distance / 120;
            context.beginPath();
            context.strokeStyle = `rgba(255,255,255,${opacity * 0.5})`;
            context.lineWidth = 0.8;
            context.moveTo(a.x + offsetX * 0.35, a.y + offsetY * 0.35);
            context.lineTo(b.x + offsetX * 0.35, b.y + offsetY * 0.35);
            context.stroke();
          }
        }
      }

      if (!prefersReducedMotion) {
        for (const particle of points) {
          particle.x += (particle.vx * 0.2) * 0.7;
          particle.y += (particle.vy * 0.2) * 0.7;
        }
      }

      if (isVisible && !document.hidden) {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(mount);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      io.disconnect();
      if (canvas.parentNode === mount) {
        mount.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen"
    />
  );
}
