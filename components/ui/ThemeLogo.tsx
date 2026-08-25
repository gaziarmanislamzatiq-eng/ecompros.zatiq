"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { brand } from "@/lib/brand";

type ThemeLogoProps = {
  alt: string;
  className?: string;
  priority?: boolean;
  variant?: "wordmark" | "icon";
};

type ThemeMode = "light" | "dark";

function getThemeMode(): ThemeMode {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return "dark";
  }

  const explicitTheme = document.documentElement.dataset.theme;
  if (explicitTheme === "dark") {
    return "dark";
  }

  if (explicitTheme === "light") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeLogo({
  alt,
  className,
  priority = false,
  variant = "wordmark",
}: ThemeLogoProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("dark");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => setThemeMode(getThemeMode());

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributeFilter: ["data-theme"],
      attributes: true,
    });

    mediaQuery.addEventListener("change", syncTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", syncTheme);
    };
  }, []);

  return (
    <Image
      src={
        variant === "icon"
          ? brand.logos.small
          : themeMode === "dark"
            ? brand.logos.dark
            : brand.logos.light
      }
      alt={alt}
      priority={priority}
      width={variant === "icon" ? 800 : 3508}
      height={852}
      className={className}
    />
  );
}
