"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SERVICE_TABS, TAB_ICONS } from "./data";
import ServiceCard from "./ServiceCard";
import MagneticButton from "./MagneticButton";

const AmbientOrb = dynamic(() => import("./AmbientOrb"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(SERVICE_TABS[0].id);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const tabButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeTabData =
    SERVICE_TABS.find((tab) => tab.id === activeTab) ?? SERVICE_TABS[0];

  // Entrance choreography: header fades up, left panel drops in from the
  // top, right panel rises in from below, cards stagger in once the
  // section crosses ~75% of the viewport.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(headerRef.current, { y: 28, opacity: 0, duration: 0.7 })
        .from(
          leftPanelRef.current,
          { y: -90, opacity: 0, duration: 0.9 },
          "-=0.35"
        )
        .from(
          rightPanelRef.current,
          { y: 90, opacity: 0, duration: 0.9 },
          "<0.12"
        )
        .from(
          gsap.utils.toArray(".service-card"),
          {
            y: 24,
            opacity: 0,
            duration: 0.55,
            stagger: 0.035,
            clearProps: "transform",
          },
          "-=0.55"
        );

      gsap.from(bannerRef.current, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        y: 36,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate the active-tab pill to the selected button's position.
  useLayoutEffect(() => {
    const btn = tabButtonRefs.current[activeTab];
    const highlight = highlightRef.current;
    if (!btn || !highlight) return;

    gsap.to(highlight, {
      y: btn.offsetTop,
      height: btn.offsetHeight,
      duration: 0.5,
      ease: "power3.inOut",
    });
  }, [activeTab]);

  // Re-run the card stagger whenever the tab content swaps.
  useEffect(() => {
    if (!contentRef.current) return;
    const cards = contentRef.current.querySelectorAll(".service-card");
    gsap.fromTo(
      cards,
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.025,
        ease: "power2.out",
        clearProps: "transform",
      }
    );
  }, [activeTab]);

  useEffect(() => {
    const track = slideRef.current;
    if (!track) return;

    const checkOverflow = () => {
      setIsOverflowing(track.scrollWidth > track.clientWidth + 1);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(track);
    window.addEventListener("resize", checkOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="marketplace-operations"
      className="relative overflow-hidden bg-[#f2f0ee] py-12 md:py-16"
    >
      <div className="relative mx-auto max-w-[1500px] px-2 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 overflow-hidden bg-transparent lg:grid-cols-[0.95fr_1.2fr]">
          <div
            ref={leftPanelRef}
            className="relative min-h-[620px] overflow-hidden bg-[var(--color-brand-accent)] px-5 py-10 md:px-8 lg:px-10"
          >
            <AmbientOrb />
            <nav
              role="tablist"
              aria-label="Service categories"
              className="relative flex flex-col gap-2.5"
            >
              {SERVICE_TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    ref={(node) => {
                      tabButtonRefs.current[tab.id] = node;
                    }}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative z-[1] w-full text-left font-semibold leading-[0.9] tracking-[-0.06em] text-white transition-all duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span className="block text-[clamp(2.2rem,2.8vw,4.4rem)]">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div ref={rightPanelRef} className="bg-[#f4f1ee] px-5 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
            <div className="max-w-[980px]">
              <div className="flex items-center gap-3 text-[#111112]">
                <h3 className="font-serif text-[clamp(2rem,2.2vw,3rem)] italic leading-[1.15] tracking-[-0.04em]">
                  {activeTabData.label}
                </h3>
                <span className="font-serif text-[clamp(1.4rem,1.8vw,2.2rem)] italic leading-[1.15] text-[#111112]">
                  :
                </span>
                <span className="font-serif text-[clamp(1.4rem,1.8vw,2.2rem)] italic leading-[1.15] text-[#111112]">
                  {activeTabData.eyebrow.replace(/^\d+\s*[—-]\s*/, "")}
                </span>
              </div>

              {isOverflowing ? (
                <div
                  ref={slideRef}
                  className="mt-8 flex min-w-full gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  style={{ scrollBehavior: "auto", scrollSnapType: "x proximity" }}
                >
                  {activeTabData.groups.flatMap((group) =>
                    group.items.map((item) => (
                      <div key={item.label} className="min-w-[15.5rem] flex-1 scroll-snap-align-start">
                        <ServiceCard item={item} />
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-2">
                  {activeTabData.groups.flatMap((group) =>
                    group.items.map((item) => <ServiceCard key={item.label} item={item} />)
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          ref={bannerRef}
          className="relative mt-16 overflow-hidden rounded-3xl bg-[#111112] px-8 py-10 sm:px-12 sm:py-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-600/30 blur-[100px]"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[1.4rem] font-semibold leading-snug tracking-tight text-white sm:text-[1.7rem]">
                Ready to hand off the operational load?
              </p>
              <p className="mt-2 max-w-md text-[14px] text-neutral-400">
                Tell us which channels you&apos;re on — we&apos;ll map out where we can
                save your team the most time this month.
              </p>
            </div>
            <MagneticButton href="#booking" className="shrink-0">
              Talk to our team
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
