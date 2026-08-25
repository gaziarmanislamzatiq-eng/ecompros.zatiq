"use client";

import { useEffect } from "react";

const HERO_SELECTOR = "[data-hero-video-scale]";
const COPY_SELECTOR = ".hero-showcase__copy";
const STICKY_SELECTOR = ".hero-showcase__sticky";
const VIDEO_SELECTOR = ".hero-showcase__video";
const MOBILE_VIDEO_QUERY = "(max-width: 39.99rem)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const VIDEO_PLAY_PROGRESS = 0.995;
const VIDEO_PAUSE_PROGRESS = 0.98;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function smoothStep(value: number) {
  const clamped = clamp(value);
  return clamped * clamped * (3 - 2 * clamped);
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function getStartHeight(viewportWidth: number, viewportHeight: number, rootFontSize: number) {
  if (viewportWidth < 40 * rootFontSize) {
    return Math.min(Math.max(9.5 * rootFontSize, viewportHeight * 0.22), 12 * rootFontSize);
  }

  if (viewportWidth >= 60 * rootFontSize) {
    return Math.min(viewportHeight * 0.36, 30 * rootFontSize);
  }

  return Math.min(Math.max(10 * rootFontSize, viewportHeight * 0.23), 18 * rootFontSize);
}

function getCssLength(styles: CSSStyleDeclaration, name: string, fallback: number) {
  const value = styles.getPropertyValue(name).trim();
  const rootFontSize = Number.parseFloat(styles.fontSize) || 16;
  const parsed = Number.parseFloat(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  if (value.endsWith("rem")) {
    return parsed * rootFontSize;
  }

  return parsed;
}

export default function HeroVideoScale() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(HERO_SELECTOR);
    const copy = hero?.querySelector<HTMLElement>(COPY_SELECTOR);
    const sticky = hero?.querySelector<HTMLElement>(STICKY_SELECTOR);
    const video = hero?.querySelector<HTMLVideoElement>(VIDEO_SELECTOR);

    if (!hero || !copy || !sticky || !video) {
      return;
    }

    const heroElement = hero;
    const copyElement = copy;
    const stickyElement = sticky;
    const videoElement = video;
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    const mobileVideo = window.matchMedia(MOBILE_VIDEO_QUERY);
    const desktopVideoSrc = videoElement.dataset.desktopSrc ?? "/assets/F6.mp4";
    const mobileVideoSrc = videoElement.dataset.mobileSrc ?? "/assets/F4_MOBILE.MP4";
    let frame = 0;
    let isVideoPlaying = false;

    function setVideoState(state: "paused" | "playing") {
      heroElement.dataset.videoState = state;
    }

    function markVideoPaused() {
      isVideoPlaying = false;
      setVideoState("paused");
    }

    function markVideoPlaying() {
      isVideoPlaying = true;
      setVideoState("playing");
    }

    function pauseVideo() {
      if (!videoElement.paused) {
        videoElement.pause();
      }

      markVideoPaused();
    }

    function playVideo() {
      if (isVideoPlaying) {
        return;
      }

      if (!videoElement.paused) {
        markVideoPlaying();
        return;
      }

      videoElement.muted = true;
      const playPromise = videoElement.play();
      isVideoPlaying = true;

      if (playPromise !== undefined) {
        void playPromise.then(markVideoPlaying).catch(markVideoPaused);
      } else {
        markVideoPlaying();
      }
    }

    function getCurrentVideoPath() {
      const currentSrc = videoElement.currentSrc || videoElement.getAttribute("src") || "";

      if (!currentSrc) {
        return "";
      }

      return new URL(currentSrc, window.location.href).pathname;
    }

    function syncVideoSource() {
      const nextSrc = mobileVideo.matches ? mobileVideoSrc : desktopVideoSrc;

      if (getCurrentVideoPath() === nextSrc) {
        return;
      }

      pauseVideo();
      videoElement.src = nextSrc;
      videoElement.load();
    }

    function syncVideoPlayback(progress: number) {
      if (reducedMotion.matches || progress < VIDEO_PAUSE_PROGRESS) {
        pauseVideo();
        return;
      }

      if (progress >= VIDEO_PLAY_PROGRESS) {
        playVideo();
      }
    }

    function updateVideoScale() {
      frame = 0;
      syncVideoSource();

      const rootStyles = window.getComputedStyle(document.documentElement);
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const rootFontSize = Number.parseFloat(rootStyles.fontSize) || 16;
      const gutter = getCssLength(rootStyles, "--space-xl", 32);
      const radius = getCssLength(rootStyles, "--radius-md", 8);
      const stickyStyles = window.getComputedStyle(stickyElement);
      const stickyGap = Number.parseFloat(stickyStyles.rowGap || stickyStyles.gap) || 0;
      const stickyRect = stickyElement.getBoundingClientRect();
      const copyRect = copyElement.getBoundingClientRect();
      const startWidth = Math.min(58 * rootFontSize, Math.max(0, viewportWidth - gutter));
      const largeWidth = Math.min(88 * rootFontSize, Math.max(startWidth, viewportWidth - gutter));
      const startTop = Math.max(0, copyRect.bottom - stickyRect.top + stickyGap);
      const baseStartHeight = getStartHeight(viewportWidth, viewportHeight, rootFontSize);
      const mobileViewportFillHeight = Math.max(1, viewportHeight - startTop);
      const startHeight =
        viewportWidth < 40 * rootFontSize
          ? mobileViewportFillHeight
          : baseStartHeight;
      const earlyTopLift = Math.min(startTop * 0.28, viewportHeight * 0.14);
      const largeTop = Math.max(0, startTop - earlyTopLift);

      if (reducedMotion.matches) {
        syncVideoPlayback(0);
        heroElement.style.setProperty("--hero-video-progress", "0");
        heroElement.style.setProperty("--hero-video-width", `${startWidth}px`);
        heroElement.style.setProperty("--hero-video-height", `${startHeight}px`);
        heroElement.style.setProperty("--hero-video-top", `${startTop}px`);
        heroElement.style.setProperty("--hero-video-radius", `${radius}px`);
        heroElement.style.setProperty("--hero-video-border-width", "1px");
        return;
      }

      const rect = heroElement.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - viewportHeight);
      const progress = clamp(-rect.top / scrollableDistance);
      const largePhase = smoothStep(progress / 0.68);
      const fullPhase = smoothStep((progress - 0.68) / 0.32);
      const videoWidth =
        progress < 0.68
          ? lerp(startWidth, largeWidth, largePhase)
          : lerp(largeWidth, viewportWidth, fullPhase);
      const videoHeight = lerp(startHeight, viewportHeight, fullPhase);
      const videoTop =
        progress < 0.68 ? lerp(startTop, largeTop, largePhase) : lerp(largeTop, 0, fullPhase);

      heroElement.style.setProperty("--hero-video-progress", progress.toFixed(4));
      heroElement.style.setProperty("--hero-video-width", `${videoWidth.toFixed(2)}px`);
      heroElement.style.setProperty("--hero-video-height", `${videoHeight.toFixed(2)}px`);
      heroElement.style.setProperty("--hero-video-top", `${videoTop.toFixed(2)}px`);
      heroElement.style.setProperty("--hero-video-radius", `${lerp(radius, 0, fullPhase).toFixed(2)}px`);
      heroElement.style.setProperty("--hero-video-border-width", `${lerp(1, 0, fullPhase).toFixed(3)}px`);
      syncVideoPlayback(progress);
    }

    function scheduleVideoScale() {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(updateVideoScale);
    }

    videoElement.autoplay = false;
    videoElement.addEventListener("playing", markVideoPlaying);
    videoElement.addEventListener("pause", markVideoPaused);
    pauseVideo();
    updateVideoScale();
    window.addEventListener("scroll", scheduleVideoScale, { passive: true });
    window.addEventListener("resize", scheduleVideoScale);
    reducedMotion.addEventListener("change", scheduleVideoScale);
    mobileVideo.addEventListener("change", scheduleVideoScale);

    return () => {
      window.removeEventListener("scroll", scheduleVideoScale);
      window.removeEventListener("resize", scheduleVideoScale);
      reducedMotion.removeEventListener("change", scheduleVideoScale);
      mobileVideo.removeEventListener("change", scheduleVideoScale);
      videoElement.removeEventListener("playing", markVideoPlaying);
      videoElement.removeEventListener("pause", markVideoPaused);
      window.cancelAnimationFrame(frame);
      pauseVideo();
    };
  }, []);

  return <span hidden data-hero-video-scale-controller />;
}
