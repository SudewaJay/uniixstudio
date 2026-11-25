"use client";

import { useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

export type Feature = {
  slug: string;
  title: string;
  headline: string;
  overline: string;
  year: string;
  cover: string;
  coverAlt: string;
  extra: string[];
  own: boolean;
  layout: "cinema" | "split-right" | "split-left" | "wide" | "trio";
};

/**
 * Flagship projects, each with its own composition so the run reads like the
 * spreads of a printed annual rather than a grid:
 *   cinema       full-bleed image that settles as it scrolls in, title over it
 *   split-right  text column left, tall image right
 *   split-left   mirrored, image overlapping onto the text column
 *   wide         letterboxed band with the caption underneath
 *   trio         cover plus two gallery frames, staggered
 */
export default function FeaturedWork({ items }: { items: Feature[] }) {
  return (
    <section aria-labelledby="featured-title" className="relative bg-bg">
      <h2 id="featured-title" className="sr-only">
        Featured projects
      </h2>
      {items.map((f, i) => {
        const n = String(i + 1).padStart(2, "0");
        switch (f.layout) {
          case "cinema":
            return <Cinema key={f.slug} f={f} n={n} />;
          case "wide":
            return <Wide key={f.slug} f={f} n={n} />;
          case "trio":
            return <Trio key={f.slug} f={f} n={n} />;
          default:
            return <Split key={f.slug} f={f} n={n} flip={f.layout === "split-left"} />;
        }
      })}
    </section>
  );
}

function Meta({ f, n, dark }: { f: Feature; n: string; dark?: boolean }) {
  return (
    <p className={clsx("flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em]", dark ? "text-white/60" : "text-ink-mute")}>
      <span className={dark ? "text-brand-2" : "text-brand-ink"}>{n}</span>
      <span>{f.own ? "Our product" : f.year}</span>
      <span>{f.overline}</span>
    </p>
  );
}

function CaseLink({ f, dark }: { f: Feature; dark?: boolean }) {
  return (
    <Link href={`/portfolio/${f.slug}/`} className={clsx("btn group", dark ? "btn-light" : "btn-primary")}>
      View case study<span className="sr-only">: {f.title}</span> <span className="cta-arrow">↗</span>
    </Link>
  );
}

function Cinema({ f, n }: { f: Feature; n: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(6% 6% 0% 6%)", "inset(0% 0% 0% 0%)"]);

  return (
    <article ref={ref} className="on-dark relative bg-bg-ink text-white">
      <div className="relative h-[78svh] min-h-[520px] overflow-hidden md:h-[92svh]">
        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { clipPath }}
        >
          <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
            <SmartImage src={f.cover} alt={f.coverAlt} sizes="100vw" priority />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        </motion.div>
        <div className="wrap-wide absolute inset-x-0 bottom-0 pb-10 md:pb-16">
          <Meta f={f} n={n} dark />
          <h3 className="mt-4 font-display font-medium leading-[0.86] tracking-[-0.06em] text-[clamp(64px,12vw,210px)]">
            <Link href={`/portfolio/${f.slug}/`} className="hover:text-brand-2">
              {f.title}
            </Link>
          </h3>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[46ch] text-[clamp(16px,1.3vw,19px)] leading-[1.5] text-white/80">{f.headline}</p>
            <CaseLink f={f} dark />
          </div>
        </div>
      </div>
    </article>
  );
}

function Split({ f, n, flip }: { f: Feature; n: string; flip: boolean }) {
  return (
    <article className="py-24 md:py-36">
      <div className={clsx("wrap-wide grid items-center gap-10 lg:grid-cols-12 lg:gap-8")}>
        <div className={clsx("lg:col-span-5", flip ? "lg:order-2 lg:col-start-8 lg:row-start-1" : "lg:pr-8")}>
          <Meta f={f} n={n} />
          <h3 className="mt-5 font-display font-medium leading-[0.9] tracking-[-0.05em] text-ink text-[clamp(44px,5.6vw,96px)]">
            <Link href={`/portfolio/${f.slug}/`} className="hover:text-brand-ink">
              {f.title}
            </Link>
          </h3>
          <p className="mt-6 max-w-[40ch] text-[clamp(16px,1.3vw,19px)] leading-[1.5] text-ink-2">{f.headline}</p>
          <div className="mt-8">
            <CaseLink f={f} />
          </div>
        </div>
        <Link
          href={`/portfolio/${f.slug}/`}
          tabIndex={-1}
          aria-hidden="true"
          className={clsx("group relative block overflow-hidden lg:col-span-7", flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "")}
        >
          <span className="relative block aspect-[4/3] lg:aspect-[7/6]">
            <span className="proof-img absolute inset-0 block">
              <SmartImage src={f.cover} alt="" sizes="(min-width:1024px) 58vw, 100vw" />
            </span>
          </span>
        </Link>
      </div>
    </article>
  );
}

function Wide({ f, n }: { f: Feature; n: string }) {
  return (
    <article className="bg-bg-paper py-24 md:py-36">
      <div className="wrap-wide">
        <Link href={`/portfolio/${f.slug}/`} tabIndex={-1} aria-hidden="true" className="group relative block overflow-hidden">
          <span className="relative block aspect-[16/10] md:aspect-[21/9]">
            <span className="proof-img absolute inset-0 block">
              <SmartImage src={f.cover} alt="" sizes="100vw" />
            </span>
          </span>
        </Link>
        <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <Meta f={f} n={n} />
            <h3 className="mt-4 font-display font-medium leading-[0.9] tracking-[-0.05em] text-ink text-[clamp(40px,4.6vw,80px)]">
              <Link href={`/portfolio/${f.slug}/`} className="hover:text-brand-ink">
                {f.title}
              </Link>
            </h3>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-8">
            <p className="max-w-[46ch] text-[clamp(16px,1.3vw,19px)] leading-[1.5] text-ink-2">{f.headline}</p>
            <div className="mt-8">
              <CaseLink f={f} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Trio({ f, n }: { f: Feature; n: string }) {
  const frames = [f.cover, ...f.extra].slice(0, 3);
  return (
    <article className="py-24 md:py-36">
      <div className="wrap-wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Meta f={f} n={n} />
            <h3 className="mt-4 font-display font-medium leading-[0.9] tracking-[-0.05em] text-ink text-[clamp(44px,5.6vw,96px)]">
              <Link href={`/portfolio/${f.slug}/`} className="hover:text-brand-ink">
                {f.title}
              </Link>
            </h3>
          </div>
          <CaseLink f={f} />
        </div>
        <p className="mt-6 max-w-[52ch] text-[clamp(16px,1.3vw,19px)] leading-[1.5] text-ink-2">{f.headline}</p>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {frames.map((src, i) => (
            <div
              key={src}
              className={clsx(
                "relative overflow-hidden bg-bg-warm",
                i === 0 ? "col-span-2 aspect-[16/10] md:col-span-1 md:aspect-[3/4]" : "aspect-[3/4]",
                i === 1 && "md:mt-20",
                i === 2 && "md:-mt-10",
              )}
            >
              <SmartImage src={src} alt={i === 0 ? f.coverAlt : ""} sizes="(min-width:768px) 32vw, 50vw" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
