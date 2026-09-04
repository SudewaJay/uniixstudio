"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/content";
import Reveal from "../Reveal";

const EASE = [0.22, 0.61, 0.36, 1] as const;

function Arrow({
  dir,
  onClick,
  disabled,
}: {
  dir: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous client story" : "Next client story"}
      className="grid size-12 place-items-center rounded-full border border-line text-ink transition-all duration-micro ease-uniix hover:bg-ink hover:text-white hover:border-ink disabled:opacity-30 disabled:pointer-events-none"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {dir === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

/**
 * Section 09 — Client stories.
 *
 * One testimonial at a time at display scale, so a quote reads as evidence
 * rather than as a review widget. Replaces the three-up horizontal scroller,
 * which had a hidden scrollbar, no position indicator, and arrows that never
 * disabled at the ends.
 *
 * The quote region is a polite live region so the change is announced to
 * screen-reader users who press the arrows.
 */
export default function ClientStories() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const total = testimonials.length;

  if (total === 0) return null;
  const t = testimonials[i];

  const go = (next: number) => {
    setDir(next > i ? 1 : -1);
    setI(next);
  };

  return (
    <section id="testimonials" className="section bg-bg-warm border-y border-line-soft">
      <div className="wrap">
        {/* The quote is the focal point, so the section heading is set small
            and to the side rather than competing with it — but it is a real
            <h2>, not an eyebrow, so the section is titled in the outline. */}
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="eyebrow">Client stories</span>
            <h2 className="t-h4 text-ink-mute font-normal">
              What clients actually say.
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 lg:items-end">
          <div className="relative min-h-[300px] sm:min-h-[280px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={t.name}
                initial={reduce ? false : { opacity: 0, y: dir * 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: dir * -14 }}
                transition={{ duration: 0.4, ease: EASE }}
                aria-live="polite"
              >
                <blockquote>
                  <p className="font-display font-medium text-[clamp(26px,3.8vw,52px)] leading-[1.12] tracking-[-0.03em] text-balance max-w-[22ch]">
                    <span aria-hidden="true" className="accent">
                      &ldquo;
                    </span>
                    {t.headline}
                    <span aria-hidden="true" className="accent">
                      &rdquo;
                    </span>
                  </p>
                  <p className="t-lead mt-7 max-w-[56ch] text-ink-2">{t.quote}</p>
                </blockquote>

                <figcaption className="mt-9 flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-ink font-display text-[16px] font-semibold text-white"
                  >
                    {t.initial}
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-ink">
                      {t.name}
                    </span>
                    <span className="block text-[13px] text-ink-mute mt-0.5">
                      {t.role}
                    </span>
                  </span>
                  {t.project && (
                    <span className="ml-2 hidden sm:inline-flex rounded-full border border-line px-3.5 py-2 t-meta text-ink-mute text-[10px]">
                      {t.project}
                      {t.year ? ` · ${t.year}` : ""}
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Counter + controls */}
          <div className="flex items-center gap-6">
            <p className="t-meta tabular-nums text-ink-mute">
              <span className="accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="mx-2 opacity-40">/</span>
              {String(total).padStart(2, "0")}
            </p>
            <div className="flex gap-3">
              <Arrow dir="prev" onClick={() => go(i - 1)} disabled={i === 0} />
              <Arrow dir="next" onClick={() => go(i + 1)} disabled={i === total - 1} />
            </div>
          </div>
        </div>

        {/* Progress rail — mirrors the counter for at-a-glance position. */}
        <div aria-hidden="true" className="mt-10 flex gap-1.5">
          {testimonials.map((x, n) => (
            <span
              key={x.name}
              className={`h-0.5 flex-1 rounded-full transition-colors duration-std ease-uniix ${
                n <= i ? "bg-brand-ink" : "bg-line"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
