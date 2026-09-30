"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import clsx from "clsx";
import SmartImage from "@/components/ui/SmartImage";
import { consoleViews } from "./data";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function VenueConsole() {
  const [active, setActive] = useState(0);
  const reduce = useSafeReducedMotion();
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const view = consoleViews[active];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = consoleViews.length - 1;
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-12 items-start">
      <div
        role="tablist"
        aria-label="Venue console views"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-[var(--gutter)] px-[var(--gutter)] lg:mx-0 lg:px-0 pb-2 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {consoleViews.map((v, i) => {
          const on = i === active;
          return (
            <button
              key={v.key}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={clsx(
                "flex-none text-left rounded-2xl border px-5 py-4 min-h-[48px] transition-colors duration-micro",
                on
                  ? "border-[#22E0A0]/60 bg-white/[.06] text-white"
                  : "border-white/10 text-white/60 hover:text-white hover:border-white/25",
              )}
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.18em] text-[#22E0A0]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[16px] md:text-[18px] font-medium tracking-[-0.01em] whitespace-nowrap">
                  {v.key}
                </span>
              </span>
              <span
                className={clsx(
                  "hidden lg:block overflow-hidden text-[14px] leading-[1.55] text-white/65 transition-all duration-std",
                  on ? "mt-2 max-h-40 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                {v.body}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        className="min-w-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view.key}
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <h3 className="font-display text-[22px] md:text-[26px] font-medium tracking-[-0.02em] text-white">
              {view.title}
            </h3>
            <p className="mt-2 mb-6 text-[15px] leading-[1.6] text-white/65 lg:hidden">{view.body}</p>
            <div className={clsx("mt-5", view.key === "Courts & pricing" || view.key === "Settlement" ? "max-w-[620px]" : "")}>
              <div className="relative w-full overflow-hidden rounded-[14px] md:rounded-[18px] ring-1 ring-white/10 shadow-lift" style={{ aspectRatio: view.ratio }}>
                {/* The console demos already carry their own window chrome. */}
                <SmartImage src={view.src} alt={view.alt} sizes="(min-width:1280px) 880px, (min-width:1024px) 66vw, 94vw" position="top" quality={80} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
