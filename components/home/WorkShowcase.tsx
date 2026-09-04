"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import SmartImage from "../ui/SmartImage";
import Reveal from "../Reveal";

export type ShowcaseProject = {
  slug: string;
  title: string;
  overline: string;
  year: string;
  headline: string;
  summary: string;
  coverImage: string;
  tags?: string[];
  client?: string;
  industry?: string;
};

/**
 * Build the opacity ramp for layer `i` of `n`: fully visible across its own
 * slice, cross-fading over a 14%-of-slice overlap with its neighbours.
 */
function useLayerOpacity(p: MotionValue<number>, i: number, n: number) {
  const slice = 1 / n;
  const start = i * slice;
  const end = start + slice;
  const fade = slice * 0.16;
  return useTransform(
    p,
    [start - fade, start + fade * 0.4, end - fade * 0.4, end + fade],
    i === 0 ? [1, 1, 1, 0] : i === n - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0],
    { clamp: true },
  );
}

function VisualLayer({
  project,
  index,
  total,
  progress,
  reduce,
}: {
  project: ShowcaseProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const opacity = useLayerOpacity(progress, index, total);
  const slice = 1 / total;
  // Slow drift + settle: the image scales 1.06 → 1 across its own slice.
  const scale = useTransform(
    progress,
    [index * slice - slice * 0.3, (index + 1) * slice],
    reduce ? [1, 1] : [1.06, 1],
    { clamp: true },
  );

  return (
    <motion.div
      style={{ opacity: reduce ? (index === 0 ? 1 : 0) : opacity }}
      className="absolute inset-0"
      aria-hidden={index !== 0 ? "true" : undefined}
    >
      <div className="frame h-full w-full shadow-lift ring-1 ring-black/5">
        <motion.div style={{ scale }} className="absolute inset-0">
          <SmartImage
            src={project.coverImage}
            alt={`${project.title} — ${project.headline}`}
            sizes="(min-width:1280px) 55vw, (min-width:1024px) 52vw, 92vw"
            priority={index === 0}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function TextLayer({
  project,
  index,
  total,
  progress,
  reduce,
}: {
  project: ShowcaseProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const opacity = useLayerOpacity(progress, index, total);
  const slice = 1 / total;
  const y = useTransform(
    progress,
    [index * slice - slice * 0.16, index * slice + slice * 0.16],
    reduce ? [0, 0] : [18, 0],
    { clamp: true },
  );

  return (
    <motion.div
      style={{ opacity: reduce ? (index === 0 ? 1 : 0) : opacity, y }}
      className={index === 0 ? "relative" : "absolute inset-0"}
      aria-hidden={index !== 0 ? "true" : undefined}
    >
      <p className="t-meta text-ink-mute">
        <span className="accent">{String(index + 1).padStart(2, "0")}</span>
        <span className="mx-2 opacity-40">/</span>
        {String(total).padStart(2, "0")}
        <span className="mx-3 opacity-40">·</span>
        {project.year}
      </p>

      <h3 className="t-h2 mt-5 text-[clamp(30px,3.4vw,46px)]">{project.title}</h3>

      {project.industry && (
        <p className="t-meta mt-4 text-ink-mute text-[10px]">{project.industry}</p>
      )}

      <p className="t-body mt-5 max-w-[46ch] text-ink-2">{project.summary}</p>

      {project.tags && project.tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.slice(0, 5).map((t) => (
            <li
              key={t}
              className="rounded-full border border-line px-3 py-1.5 text-[12px] text-ink-2"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      <Link href={`/portfolio/${project.slug}/`} className="link-cta group mt-8">
        View case study <span className="cta-arrow">↗</span>
      </Link>
    </motion.div>
  );
}

/**
 * Section 04 — Selected work.
 *
 * Sticky storytelling: the visual is anchored while the project information
 * cross-fades beneath it, roughly one project per viewport. Replaces the
 * previous pinned card deck, which consumed 4,029px of scroll (3,628px on
 * mobile) and — critically — contained no links at all: the ↗ affordance on
 * every card was a decorative <div>.
 *
 * Mobile drops the sticky mechanic entirely for a plain stacked list. A
 * scroll-driven crossfade is a desktop affordance; on a phone it fights the
 * user's own scrolling.
 */
export default function WorkShowcase({ items }: { items: ShowcaseProject[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const total = items.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.35,
  });

  return (
    <section id="work" className="section bg-bg">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <Reveal>
            <span className="eyebrow">Selected work</span>
            <h2 className="t-h2 mt-5">
              Brands we&apos;re
              <br />
              <span className="t-italic accent-grad-text">proud of.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <Link href="/portfolio" className="btn btn-secondary btn-sm group">
              All projects <span className="cta-arrow">↗</span>
            </Link>
          </Reveal>
        </div>
      </div>

      {/*
        Desktop: sticky storytelling — but only when motion is welcome. Under
        prefers-reduced-motion the crossfade is disabled, which would leave
        every project after the first at opacity 0 for 340vh of scroll, so the
        whole mechanic is dropped and the stacked list below serves all widths.
      */}
      <div
        ref={ref}
        className={`${reduce ? "hidden" : "hidden lg:block"} wrap relative mt-16`}
        style={{ height: `${total * 85}vh` }}
      >
        <div className="sticky top-[var(--header-h)] h-[calc(100svh-var(--header-h)-48px)] flex items-center">
          <div className="grid w-full grid-cols-[minmax(0,38%)_minmax(0,1fr)] gap-14 xl:gap-20 items-center">
            {/* Text column — layer 0 is in flow so the column keeps its height. */}
            <div className="relative">
              {items.map((p, i) => (
                <TextLayer
                  key={p.slug}
                  project={p}
                  index={i}
                  total={total}
                  progress={progress}
                  reduce={reduce}
                />
              ))}
            </div>

            {/* Visual column. */}
            <div className="relative aspect-[16/11] w-full">
              {items.map((p, i) => (
                <VisualLayer
                  key={p.slug}
                  project={p}
                  index={i}
                  total={total}
                  progress={progress}
                  reduce={reduce}
                />
              ))}

              {/* Progress rail. */}
              <div
                aria-hidden="true"
                className="absolute -bottom-8 left-0 right-0 h-px bg-line overflow-hidden"
              >
                <motion.span
                  className="block h-full bg-brand-ink origin-left"
                  style={{ scaleX: progress }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------- Mobile / tablet: stacked */}
      <ul className={`${reduce ? "" : "lg:hidden"} wrap mt-12 flex flex-col gap-14`}>
        {items.map((p, i) => (
          <li key={p.slug}>
            <Reveal>
              <Link href={`/portfolio/${p.slug}/`} className="group block">
                <div className="frame aspect-[4/3] shadow-sm2">
                  <SmartImage
                    src={p.coverImage}
                    alt={`${p.title} — ${p.headline}`}
                    sizes="(min-width:768px) 90vw, 92vw"
                  />
                </div>
                <p className="t-meta mt-5 text-ink-mute">
                  <span className="accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mx-2 opacity-40">/</span>
                  {String(total).padStart(2, "0")}
                  <span className="mx-3 opacity-40">·</span>
                  {p.year}
                </p>
                <h3 className="t-h3 mt-3">{p.title}</h3>
                <p className="t-body mt-3 text-ink-2 max-w-[52ch]">{p.summary}</p>
                <span className="link-cta mt-6">
                  View case study <span className="cta-arrow">↗</span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
