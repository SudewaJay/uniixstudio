"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import SmartImage from "../../ui/SmartImage";
import { Magnetic, useFinePointer } from "./motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

export type StackProject = {
  slug: string;
  title: string;
  year: string;
  headline: string;
  coverImage: string;
  tags?: string[];
  client?: string;
  industry?: string;
};

/**
 * Selected work — a deck of full-screen projects.
 *
 * Each project is a sticky card. As the next one slides over it, the card
 * underneath recedes (scale + dim), so scrolling reads like cutting between
 * shots rather than paging through a grid. Pure CSS sticky does the pinning;
 * motion only adds the depth, and is dropped under reduced motion.
 *
 * On fine pointers a "View case" cursor follows the pointer over the deck —
 * the whole card is the link, the cursor just says so.
 */
export default function WorkStack({ items }: { items: StackProject[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useSafeReducedMotion();
  const fine = useFinePointer();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });

  // Custom cursor
  const cx = useMotionValue(-200);
  const cy = useMotionValue(-200);
  const sx = useSpring(cx, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(cy, { stiffness: 500, damping: 40, mass: 0.5 });
  const [hover, setHover] = useState(false);

  const n = items.length;

  return (
    <section id="work" aria-labelledby="work-title" className="on-dark relative bg-bg-ink text-white">
      <div className="wrap-wide pb-12 pt-24 md:pb-16 md:pt-32">
        <h2
          id="work-title"
          className="font-display font-medium leading-[0.9] tracking-[-0.05em] text-[clamp(48px,8vw,140px)]"
        >
          Selected work
        </h2>
      </div>

      <ol
        ref={listRef}
        className="relative"
        onPointerMove={(e) => {
          if (!fine) return;
          cx.set(e.clientX);
          cy.set(e.clientY);
        }}
        onPointerEnter={() => fine && setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        {items.map((p, i) => (
          <StackCard key={p.slug} p={p} i={i} n={n} progress={scrollYProgress} reduce={reduce} />
        ))}
      </ol>

      <div className="wrap-wide flex justify-center py-16 md:py-24">
        <Magnetic>
          <Link href="/portfolio/" className="btn btn-light group">
            All projects <span className="cta-arrow">↗</span>
          </Link>
        </Magnetic>
      </div>

      {/* Follow cursor — decorative; the card itself is the link. */}
      {fine && (
        <motion.div
          aria-hidden="true"
          style={{ x: sx, y: sy }}
          className="pointer-events-none fixed left-0 top-0 z-[60]"
        >
          <div
            className="-translate-x-1/2 -translate-y-1/2 grid size-[104px] place-items-center rounded-full bg-brand-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-[transform,opacity] duration-std ease-uniix"
            style={{ transform: `translate(-50%,-50%) scale(${hover ? 1 : 0.2})`, opacity: hover ? 1 : 0 }}
          >
            View case
          </div>
        </motion.div>
      )}
    </section>
  );
}

function StackCard({
  p,
  i,
  n,
  progress,
  reduce,
}: {
  p: StackProject;
  i: number;
  n: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Card i starts receding once the deck has scrolled to it, and ends smaller
  // the deeper it sits in the stack.
  const start = i / n;
  const target = 1 - (n - 1 - i) * 0.045;
  const scale = useTransform(progress, [start, 1], [1, reduce ? 1 : target]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / n)], [0, reduce || i === n - 1 ? 0 : 0.55]);
  const imgY = useTransform(progress, [Math.max(0, start - 1 / n), start + 1 / n], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  const tags = (p.tags ?? []).slice(0, 3);

  return (
    <li className="sticky top-0 flex h-[100svh] items-center justify-center px-3 pt-[calc(var(--header-h)-8px)] pb-3 md:px-5 md:pb-5">
      <motion.div
        style={{ scale }}
        className="relative h-full w-full origin-top overflow-hidden bg-bg-ink-2"
      >
        <Link
          href={`/portfolio/${p.slug}/`}
          className="work-card group absolute inset-0 block md:cursor-none"
          aria-label={`${p.title}: view case study`}
        >
          <motion.div style={{ y: imgY }} className="absolute -inset-y-[8%] inset-x-0">
            <SmartImage
              src={p.coverImage}
              alt=""
              sizes="100vw"
              priority={i === 0}
              className="transition-transform duration-[1200ms] ease-uniix group-hover:scale-[1.04]"
            />
          </motion.div>
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,16,14,.55)_0%,rgba(18,16,14,0)_28%,rgba(18,16,14,0)_45%,rgba(18,16,14,.9)_100%)]"
          />

          {/* Meta strip */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/80 md:p-8">
            <span>{p.industry}</span>
            <span>{p.year}</span>
          </div>

          {/* Title block */}
          <div className="absolute inset-x-0 bottom-0 grid gap-5 p-5 md:grid-cols-[minmax(0,1fr)_minmax(0,34%)] md:items-end md:gap-10 md:p-8 lg:p-10">
            <div>
              <h3 className="font-display font-medium leading-[0.86] tracking-[-0.055em] text-white text-[clamp(44px,9vw,160px)]">
                {p.title}
              </h3>
              {tags.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <li key={t} className="border border-white/30 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/85">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="md:pb-2">
              <p className="t-body max-w-[42ch] text-white/80">{p.headline}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-brand-2 md:hidden">
                View case study <span aria-hidden="true">↗</span>
              </span>
            </div>
          </div>
        </Link>

        <motion.span aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.div>
    </li>
  );
}
