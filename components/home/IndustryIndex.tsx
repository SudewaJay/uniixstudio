"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { industries } from "@/lib/industries";
import SmartImage from "../ui/SmartImage";
import Reveal from "../Reveal";

/**
 * Real Uniix work that stands behind an industry. Only industries with a
 * genuine project get an image; the rest get a typographic card rather than a
 * stock photo standing in for work we'd be implying we did.
 */
export type IndustryProof = { image: string; label: string };

/** Homepage reading order. Slugs, so industry pages and URLs are untouched. */
const ORDER = [
  "education",
  "healthcare",
  "real-estate",
  "ecommerce",
  "corporate",
  "travel",
  "finance",
  "startups",
];

const PREVIEW_W = 300;
const PREVIEW_H = 375;

/**
 * Section 05 — Industries, as a compact visual index.
 *
 * Previously a 1,200px-tall list + sticky 4:5 preview. Now eight links in a
 * 2×4 index with a floating preview that trails the pointer (desktop) or a
 * single preview panel driven by tap (touch). Every industry name is a real
 * crawlable link in the DOM at every width; descriptions stay in the DOM too,
 * inside the preview, so nothing is lost for SEO.
 */
export default function IndustryIndex({
  proof = {},
}: {
  proof?: Record<string, IndustryProof>;
}) {
  const reduce = useReducedMotion();
  const list = ORDER.map((slug) => industries.find((i) => i.slug === slug)).filter(
    (i): i is NonNullable<typeof i> => Boolean(i),
  );
  // Include any industry added to the data later but not yet in ORDER.
  list.push(...industries.filter((i) => !ORDER.includes(i.slug)));

  const [active, setActive] = useState<number | null>(null);
  // Touch default: open on the first industry with real work behind it.
  const [tapped, setTapped] = useState(() =>
    Math.max(0, list.findIndex((i) => proof[i.slug])),
  );

  // Floating preview position (desktop).
  const areaRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 30, mass: 0.6 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const place = useCallback(
    (px: number, py: number, jump = false) => {
      const box = areaRef.current?.getBoundingClientRect();
      if (!box) return;
      const nx = Math.min(Math.max(px - box.left + 28, 0), box.width - PREVIEW_W);
      const ny = py - box.top - PREVIEW_H / 2;
      x.set(nx);
      y.set(ny);
      if (jump || reduce) {
        sx.jump(nx);
        sy.jump(ny);
      }
    },
    [reduce, sx, sy, x, y],
  );

  const half = Math.ceil(list.length / 2);

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="section-tight bg-bg-warm border-t border-line-soft"
    >
      <div className="wrap">
        {/* ------------------------------------------------------ Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="eyebrow">Industries</span>
            <h2
              id="industries-heading"
              className="t-h2 mt-4 text-[clamp(30px,3.8vw,52px)]"
            >
              Built for <span className="t-italic accent-grad-text">different worlds.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <Link href="/industries/" className="link-cta group shrink-0">
              All industries <span className="cta-arrow">↗</span>
            </Link>
          </Reveal>
        </div>

        {/* ------------------------------------------ Desktop: pointer index */}
        <div
          ref={areaRef}
          className="relative mt-10 hidden lg:block"
          onPointerMove={(e) => e.pointerType === "mouse" && place(e.clientX, e.clientY)}
          onPointerLeave={() => setActive(null)}
        >
          <ol
            className={clsx(
              "ind-list grid grid-flow-col grid-cols-2 gap-x-16 border-t border-line",
              active !== null && "has-active",
            )}
            style={{ gridTemplateRows: `repeat(${half}, auto)` }}
          >
            {list.map((ind, i) => (
              <li
                key={ind.slug}
                className={clsx("ind-row relative border-b border-line", active === i && "is-active")}
              >
                <Link
                  href={`/industries/${ind.slug}/`}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    if (active === null) place(e.clientX, e.clientY, true);
                    setActive(i);
                  }}
                  onFocus={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    place(r.left + r.width * 0.55, r.top + r.height / 2, true);
                    setActive(i);
                  }}
                  onBlur={() => setActive(null)}
                  className="flex items-baseline gap-5 py-[18px] outline-offset-4"
                >
                  <span
                    className={clsx(
                      "t-meta w-6 shrink-0 tabular-nums transition-colors duration-micro",
                      active === i ? "accent" : "text-ink-mute",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ind-name font-display font-medium text-[clamp(24px,2.3vw,34px)] leading-[1.1] tracking-[-0.025em]">
                    {ind.name}
                  </span>
                  {proof[ind.slug] && (
                    <span className="t-meta ml-auto shrink-0 self-center text-[9px] text-ink-mute">
                      Case study
                    </span>
                  )}
                </Link>
                <span
                  aria-hidden="true"
                  className="ind-rule absolute inset-x-0 -bottom-px h-px bg-brand-ink"
                />
              </li>
            ))}
          </ol>

          {/* Floating preview — decorative; the link carries the meaning. */}
          <motion.div
            aria-hidden="true"
            style={{ x: sx, y: sy, width: PREVIEW_W, height: PREVIEW_H }}
            className={clsx(
              "ind-preview pointer-events-none absolute left-0 top-0 z-10 overflow-hidden rounded-lg2 bg-bg-ink shadow-lift",
              active !== null && "is-shown",
            )}
          >
            {list.map((ind, i) => (
              <PreviewSlide
                key={ind.slug}
                index={i}
                name={ind.name}
                description={ind.description}
                proof={proof[ind.slug]}
                on={active === i}
                sizes={`${PREVIEW_W}px`}
              />
            ))}
          </motion.div>
        </div>

        {/* --------------------------------------------- Touch: tap to preview */}
        <div className="mt-8 lg:hidden">
          <div id="industry-preview" className="relative aspect-[16/10] overflow-hidden rounded-lg2 bg-bg-ink">
            {list.map((ind, i) => (
              <PreviewSlide
                key={ind.slug}
                index={i}
                name={ind.name}
                description={ind.description}
                proof={proof[ind.slug]}
                on={tapped === i}
                sizes="(min-width:768px) 90vw, 92vw"
                href={`/industries/${ind.slug}/`}
              />
            ))}
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-x-4 border-t border-line">
            {list.map((ind, i) => (
              <li key={ind.slug} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setTapped(i)}
                  aria-pressed={tapped === i}
                  aria-controls="industry-preview"
                  className="flex min-h-[52px] w-full items-center gap-3 text-left"
                >
                  <span
                    className={clsx(
                      "t-meta shrink-0 text-[10px] tabular-nums",
                      tapped === i ? "accent" : "text-ink-mute",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={clsx(
                      "text-[15px] font-medium leading-tight tracking-[-0.01em] transition-colors duration-micro",
                      tapped === i ? "text-ink" : "text-ink/65",
                    )}
                  >
                    {ind.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PreviewSlide({
  index,
  name,
  description,
  proof,
  on,
  sizes,
  href,
}: {
  index: number;
  name: string;
  description: string;
  proof?: IndustryProof;
  on: boolean;
  sizes: string;
  href?: string;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div className={clsx("ind-slide absolute inset-0", on && "is-on")} aria-hidden={!on || undefined}>
      {proof ? (
        <>
          <SmartImage src={proof.image} alt="" sizes={sizes} quality={65} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
        </>
      ) : (
        <span
          aria-hidden="true"
          className="t-numeral accent-grad-text absolute -right-2 -top-6 text-[180px] opacity-90"
        >
          {num}
        </span>
      )}

      <div className="on-dark absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
        <p className="t-meta text-[10px] text-white/60">
          {num} · {proof ? proof.label : "Sector"}
        </p>
        <p className="mt-2 font-display text-[22px] font-medium leading-tight tracking-[-0.02em]">
          {name}
        </p>
        <p className="mt-2 hidden max-w-[40ch] text-[13px] leading-[1.5] text-white/70 sm:block">{description}</p>
        {href && (
          <Link
            href={href}
            tabIndex={on ? undefined : -1}
            className="mt-3 inline-flex min-h-[40px] items-center gap-2 text-[14px] font-medium text-white underline decoration-white/40 underline-offset-4"
          >
            Explore {name.toLowerCase()} <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>
    </div>
  );
}
