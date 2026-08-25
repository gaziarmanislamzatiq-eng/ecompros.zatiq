'use client';

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useEffectEvent, useId, useState } from "react";

export type HeroMediaItem = {
  caption: string;
  decorative?: boolean;
  imageAlt?: string;
  imageSrc: string;
  priority?: boolean;
  title: string;
};

type HeroMediaSliderProps = {
  className?: string;
  items: HeroMediaItem[];
};

type HeroMediaCardProps = {
  animationDirection: "next" | "prev";
  animationKey: number;
  className?: string;
  item: HeroMediaItem;
  panelId: string;
  priority?: boolean;
  size: "active" | "preview";
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getWrappedIndex(index: number, length: number) {
  return (index + length) % length;
}

function HeroMediaCard({
  animationDirection,
  animationKey,
  className,
  item,
  panelId,
  priority = false,
  size,
}: HeroMediaCardProps) {
  const sizes =
    size === "active"
      ? "(max-width: 1023px) calc(100vw - 3rem), (max-width: 1279px) 58vw, 52vw"
      : "(max-width: 1279px) 0px, 36vw";
  const imageClasses =
    size === "active"
      ? "object-cover object-center"
      : "object-contain object-center scale-[0.88] p-3";
  const imageSurfaceClasses =
    size === "active"
      ? "hero-media-panel__image-surface"
      : "hero-media-panel__image-surface hero-media-panel__image-surface--preview";

  return (
    <article
      aria-labelledby={`${panelId}-title`}
      className={cn(
        "hero-media-panel flex flex-col justify-between p-5 sm:p-6",
        `hero-media-panel--slide-${animationDirection}`,
        size === "active" ? "hero-media-panel--active" : "hero-media-panel--preview",
        className
      )}
      key={`${panelId}-${animationKey}-${item.title}`}
    >
      <div
        className={cn(
          "hero-media-panel__image",
          size === "preview" && "hero-media-panel__image--preview"
        )}
      >
        <div className={imageSurfaceClasses}>
          <Image
            src={item.imageSrc}
            alt={item.decorative ? "" : (item.imageAlt ?? item.title)}
            fill
            priority={priority}
            sizes={sizes}
            className={imageClasses}
          />
        </div>
      </div>

      <div aria-hidden="true" className="hero-media-panel__scrim" />

      <div className="relative z-10 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
      </div>

      <div className="relative z-10 max-w-sm">
        <h3
          id={`${panelId}-title`}
          className="mt-4 text-balance text-2xl font-semibold tracking-[-0.04em] text-white sm:text-[2rem]"
        >
          {item.title}
        </h3>
        <p className="mt-3 max-w-xs text-sm leading-6 text-white/78">
          {item.caption}
        </p>
      </div>
    </article>
  );
}

export default function HeroMediaSlider({
  className,
  items,
}: HeroMediaSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationCycle, setAnimationCycle] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<"next" | "prev">("next");
  const sliderId = useId();

  function goToSlide(direction: "next" | "prev") {
    setAnimationDirection(direction);
    setAnimationCycle((current) => current + 1);
    setActiveIndex((current) =>
      getWrappedIndex(current + (direction === "next" ? 1 : -1), items.length)
    );
  }

  const handleAutoAdvance = useEffectEvent(() => {
    goToSlide("next");
  });

  useEffect(() => {
    if (items.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      handleAutoAdvance();
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [items.length]);

  if (items.length === 0) {
    return null;
  }

  const previewIndex = getWrappedIndex(activeIndex + 1, items.length);
  const activeItem = items[activeIndex];
  const previewItem = items[previewIndex];

  return (
    <section
      aria-label="Featured launch systems slider"
      className={cn("hero-slider", className)}
    >
      <div className="hero-slider__track">
        {items.length > 1 ? (
          <button
            aria-controls={`${sliderId}-active-panel`}
            aria-label="Show previous hero card"
            className="hero-slider__arrow hero-slider__arrow--prev"
            onClick={() => goToSlide("prev")}
            type="button"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
        ) : null}

        <HeroMediaCard
          animationDirection={animationDirection}
          animationKey={animationCycle}
          className="min-h-[18rem] sm:min-h-[24rem] lg:min-h-[31rem]"
          item={activeItem}
          panelId={`${sliderId}-active-panel`}
          priority={activeItem.priority}
          size="active"
        />

        {items.length > 1 ? (
          <HeroMediaCard
            animationDirection={animationDirection}
            animationKey={animationCycle}
            className="hidden min-h-[31rem] lg:flex"
            item={previewItem}
            panelId={`${sliderId}-preview-panel`}
            size="preview"
          />
        ) : null}

        {items.length > 1 ? (
          <button
            aria-controls={`${sliderId}-active-panel`}
            aria-label="Show next hero card"
            className="hero-slider__arrow hero-slider__arrow--next"
            onClick={() => goToSlide("next")}
            type="button"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        ) : null}
      </div>
    </section>
  );
}
