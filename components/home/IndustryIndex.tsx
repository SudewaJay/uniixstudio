"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { industries } from "@/lib/industries";
import SmartImage from "../ui/SmartImage";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../Reveal";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Section 05 — Industries.
 *
 * An editorial index, not a card grid. Pointing at (or tabbing to) a row swaps
 * the preview image, so the section demonstrates range instead of listing it.
 *
 * Replaces the Apple-style carousel of 640px cards, where every card was a
 * <button> opening a modal that had no focus trap, showed one paragraph, and
 * then offered a link — two interactions to reach a page, and no crawlable
 * href from the homepage. Each row is now a plain link.
 */
export default function IndustryIndex() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section bg-bg-warm border-y border-line-soft">
      <div className="wrap">
        <SectionHeader
          eyebrow="Industries"
          title={
            <>
              Range, proven across
              <br />
              <span className="t-italic accent-grad-text">eight markets.</span>
            </>
          }
          support="We've shipped brand, web and growth work in each of these. Pick the one that looks like your business."
        />

        {/* ----------------------------------------------- Desktop index */}
        <div className="mt-14 hidden lg:grid grid-cols-[minmax(0,1fr)_minmax(0,42%)] gap-16 items-start">
          <ul
            className="border-t border-line"
            onMouseLeave={() => setActive(0)}
          >
            {industries.map((ind, i) => (
              <li key={ind.slug} className="border-b border-line">
                <Link
                  href={`/industries/${ind.slug}/`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-baseline gap-6 py-5 transition-[padding] duration-std ease-uniix hover:pl-3 focus-visible:pl-3"
                >
                  <span
                    className={`t-meta shrink-0 tabular-nums transition-colors duration-micro ${
                      i === active ? "accent" : "text-ink-mute"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display font-medium text-[clamp(24px,2.4vw,34px)] tracking-[-0.02em] leading-tight transition-colors duration-micro ${
                      i === active ? "text-ink" : "text-ink/60"
                    }`}
                  >
                    {ind.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto shrink-0 self-center text-ink-mute opacity-0 -translate-x-2 transition-all duration-std ease-uniix group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
                  >
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Preview — sticky, swaps with the active row. */}
          <div className="sticky top-[calc(var(--header-h)+32px)]">
            <div className="frame relative aspect-[4/5] shadow-lift ring-1 ring-black/5">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={industries[active].slug}
                  initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="absolute inset-0"
                >
                  <SmartImage
                    src={industries[active].image}
                    alt=""
                    sizes="(min-width:1280px) 40vw, 44vw"
                  />
                </motion.div>
              </AnimatePresence>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="t-meta text-white/70 text-[10px]">
                  {String(active + 1).padStart(2, "0")} ·{" "}
                  {industries[active].name}
                </p>
                <p className="mt-3 text-[15px] leading-[1.55] text-white/90 max-w-[36ch]">
                  {industries[active].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------- Mobile accordion */}
        <div className="lg:hidden mt-10 border-t border-line">
          {industries.map((ind, i) => {
            const isOpen = open === i;
            return (
              <div key={ind.slug} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`industry-${ind.slug}`}
                    className="flex w-full min-h-[64px] items-center gap-4 py-4 text-left"
                  >
                    <span className="t-meta shrink-0 text-ink-mute tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display font-medium text-[22px] tracking-[-0.02em]">
                      {ind.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 text-lg text-ink-mute transition-transform duration-std ease-uniix ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div id={`industry-${ind.slug}`} hidden={!isOpen}>
                  <div className="pb-6">
                    <div className="frame aspect-[16/10]">
                      <SmartImage src={ind.image} alt="" sizes="92vw" />
                    </div>
                    <p className="t-body mt-4 text-ink-2">{ind.description}</p>
                    <Link
                      href={`/industries/${ind.slug}/`}
                      className="link-cta group mt-5 text-[14px]"
                    >
                      {ind.name} work <span className="cta-arrow">↗</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-12 lg:mt-14">
            <Link href="/industries" className="link-cta group">
              All industries <span className="cta-arrow">↗</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
