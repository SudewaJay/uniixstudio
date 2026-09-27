"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import SmartImage from "../ui/SmartImage";
import styles from "./finland.module.css";

export type FiTestimonial = {
  quote: string;
  name: string;
  role: string;
  /** Linked project, when the testimonial belongs to a portfolio case study. */
  project?: { slug: string; title: string; image: string };
  /** Context label when there is no linked project (e.g. "Brand Identity · 2024"). */
  context?: string;
};

/**
 * 05 — Client trust. Only testimonials that already exist in the codebase
 * (project MDX + lib/content.ts) — none are written here.
 *
 * Desktop: one large quote at a time with the client and a small project
 * preview; prev/next buttons with a live region. Mobile: a swipeable
 * scroll-snap rail of cards (no JS needed to read them all).
 */
export default function FinlandTestimonials({ items }: { items: FiTestimonial[] }) {
  const [i, setI] = useState(0);
  const railRef = useRef<HTMLUListElement>(null);
  const [railIdx, setRailIdx] = useState(0);

  const onRail = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const w = el.firstElementChild?.getBoundingClientRect().width ?? el.clientWidth;
    setRailIdx(Math.round(el.scrollLeft / (w + 12)));
  }, []);
  useEffect(onRail, [onRail]);

  if (!items.length) return null;
  const t = items[i];
  const total = items.length;

  return (
    <section id="reviews" aria-labelledby="fi-reviews-heading" className="section bg-bg-warm border-y border-line-soft">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="eyebrow">Client trust</span>
            <h2 id="fi-reviews-heading" className="t-h2 mt-5">
              Trusted by the people
              <br />
              <span className="t-italic accent-grad-text">we build with.</span>
            </h2>
          </Reveal>
          <div className="hidden items-center gap-4 md:flex">
            <span className="t-meta tabular-nums text-ink-mute" aria-hidden="true">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => setI((i - 1 + total) % total)} aria-label="Previous testimonial" aria-controls="fi-quote" className={styles.railBtn}>
              ←
            </button>
            <button type="button" onClick={() => setI((i + 1) % total)} aria-label="Next testimonial" aria-controls="fi-quote" className={styles.railBtn}>
              →
            </button>
          </div>
        </div>

        {/* ---------------------------------------- Desktop: editorial quote */}
        <div id="fi-quote" aria-live="polite" className="mt-14 hidden md:block">
          <figure key={i} className={clsx(styles.fadeSwap, "grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_280px]")}>
            <div>
              <span aria-hidden="true" className="block font-display text-[96px] leading-[0.6] text-brand-ink/30">“</span>
              <blockquote className="mt-4 max-w-[30ch] font-display text-[clamp(28px,3.2vw,46px)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
                {t.quote}
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4 border-t border-line pt-6">
                <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-ink font-display text-[15px] font-medium text-white">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-ink">{t.name}</span>
                  <span className="block text-[13px] text-ink-mute">{t.role}</span>
                </span>
              </figcaption>
            </div>
            {t.project ? (
              <Link href={`/portfolio/${t.project.slug}/`} className="group block">
                <div className="frame aspect-[4/5] shadow-sm2">
                  <SmartImage src={t.project.image} alt={`${t.project.title} project`} sizes="280px" quality={66} />
                </div>
                <p className="mt-3 text-[13px] text-ink-mute">
                  Project · <span className="text-ink">{t.project.title}</span> <span className="cta-arrow">↗</span>
                </p>
              </Link>
            ) : (
              t.context && (
                <div className="rounded-xl2 border border-line bg-bg-paper p-6">
                  <p className="t-meta text-[10px] text-ink-mute">Engagement</p>
                  <p className="mt-2 font-display text-[20px] font-medium tracking-[-0.02em]">{t.context}</p>
                </div>
              )
            )}
          </figure>
        </div>

        {/* ---------------------------------------- Mobile: swipe cards */}
        <ul ref={railRef} onScroll={onRail} className={clsx(styles.quoteRail, "mt-10 md:hidden")} aria-label="Testimonials">
          {items.map((it, k) => (
            <li key={k} className={styles.quoteCard}>
              <figure className="flex h-full flex-col">
                <blockquote className="font-display text-[20px] font-medium leading-[1.3] tracking-[-0.02em] text-ink">
                  “{it.quote}”
                </blockquote>
                <figcaption className="mt-auto pt-6">
                  <span className="block text-[14px] font-medium text-ink">{it.name}</span>
                  <span className="block text-[12.5px] text-ink-mute">{it.role}</span>
                  {it.project && (
                    <Link href={`/portfolio/${it.project.slug}/`} className="mt-3 inline-flex min-h-[32px] items-center text-[13px] text-brand-ink underline underline-offset-4">
                      {it.project.title} case study ↗
                    </Link>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex justify-center gap-2 md:hidden" aria-hidden="true">
          {items.map((_, k) => (
            <span key={k} className={clsx("h-1.5 rounded-full transition-all duration-std", k === railIdx ? "w-6 bg-ink" : "w-1.5 bg-ink/25")} />
          ))}
        </div>
      </div>
    </section>
  );
}
