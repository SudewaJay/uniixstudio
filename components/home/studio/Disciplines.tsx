"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import SmartImage from "../../ui/SmartImage";
import { Magnetic, useMinWidth } from "./motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

export type DisciplineService = { slug: string; name: string; pillar: string };
export type DisciplineVisual = { slug: string; title: string; coverImage: string; tags?: string[] };

/**
 * The five things the studio makes. The CMS organises services into three
 * pillars (design / technology / growth); the homepage tells it the way a
 * client thinks about it. Every CMS service lands in exactly one discipline —
 * anything new and unmapped falls back to its pillar's default row, so an
 * editor adding a service never makes it disappear from the homepage.
 */
const DISCIPLINES = [
  {
    key: "brand",
    title: ["Brand", "identity"],
    line: "Logos, brand systems, packaging and print.",
    slugs: ["brand-identity", "logo-design", "packaging-design", "print-design", "print-collateral", "social-media-creatives", "motion-graphics", "video-editing"],
    fallbackFor: "design",
    visual: "ecowave-energy",
    href: "/services/design/",
  },
  {
    key: "ux",
    title: ["UI/UX", "design"],
    line: "Apps and interfaces, researched and tested before they're built.",
    slugs: ["ui-ux-design", "mobile-apps"],
    visual: "cricbook",
    href: "/services/design/ui-ux-design/",
  },
  {
    key: "web",
    title: ["Web", "design"],
    line: "Fast websites with a CMS your team can update.",
    slugs: ["web-design", "wordpress"],
    visual: "st-lukes-medilab",
    href: "/services/technology/web-design/",
  },
  {
    key: "tech",
    title: ["Web", "development"],
    line: "E-commerce, web apps and integrations.",
    slugs: ["web-development", "ecommerce"],
    fallbackFor: "technology",
    visual: "rentmycar-lk",
    href: "/services/technology/",
  },
  {
    key: "growth",
    title: ["Digital", "marketing"],
    line: "SEO, paid ads, content and analytics.",
    slugs: ["seo", "ppc-advertising", "social-media", "content-marketing", "analytics"],
    fallbackFor: "growth",
    visual: undefined,
    href: "/services/growth/",
  },
] as const;

export default function Disciplines({
  services,
  visuals,
}: {
  services: DisciplineService[];
  visuals: DisciplineVisual[];
}) {
  const rows = DISCIPLINES.map((d) => {
    const own = services.filter((s) => (d.slugs as readonly string[]).includes(s.slug));
    const strays =
      "fallbackFor" in d
        ? services.filter(
            (s) => s.pillar === d.fallbackFor && !DISCIPLINES.some((x) => (x.slugs as readonly string[]).includes(s.slug)),
          )
        : [];
    return { ...d, services: [...own, ...strays], visual: visuals.find((v) => v.slug === d.visual) };
  });

  const desktop = useMinWidth(1024);
  const reduce = useSafeReducedMotion();
  const pin = desktop && !reduce;

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const [height, setHeight] = useState<number | undefined>(undefined);

  // The section is as tall as the sideways distance plus one screen, so one
  // pixel of vertical scroll moves the track one pixel sideways.
  useEffect(() => {
    if (!pin) {
      setHeight(undefined);
      distance.set(0);
      return;
    }
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      distance.set(d);
      setHeight(d + window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pin, distance]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const x = useTransform([smooth, distance], ([p, d]: number[]) => (pin ? -p * d : 0));
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  const intro = (
    <h2
      id="services-title"
      className="font-display font-medium leading-[0.92] tracking-[-0.05em] text-ink text-[clamp(44px,5.6vw,92px)]"
    >
      What we do
    </h2>
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className="disc relative bg-bg"
      style={pin && height ? { height } : undefined}
    >
      {!pin && <div className="wrap pt-20 md:pt-28">{intro}</div>}
      <div className={clsx(pin && "sticky top-0 h-[100svh] overflow-hidden", "flex flex-col")}>
        <motion.div
          ref={trackRef}
          style={{ x }}
          className={clsx(
            "disc-track flex",
            pin
              ? "h-full w-max items-stretch pt-[var(--header-h)]"
              : "snap-x snap-mandatory overflow-x-auto overscroll-x-contain pr-6 pb-16 [&>article:first-of-type]:border-l-0 pt-10 [scrollbar-width:none]",
          )}
        >
          {/* Intro — a panel in the pinned track; a plain header above the swipe row on touch. */}
          {pin && (
            <div className="flex w-[36vw] max-w-[560px] shrink-0 flex-col justify-start py-12 pl-[max(var(--gutter),calc((100vw-1280px)/2+var(--gutter)))] pr-12">
              {intro}
            </div>
          )}

          {/* ----------------------------------------------- Discipline panels */}
          {rows.map((d) => (
            <article
              key={d.key}
              aria-labelledby={`disc-${d.key}`}
              className={clsx(
                "disc-panel group/panel relative grid shrink-0 snap-start border-l border-line",
                pin
                  ? "w-[min(76vw,1180px)] grid-cols-[minmax(0,1fr)_minmax(0,52%)] gap-12 px-12 py-10"
                  : "w-[86vw] max-w-[520px] grid-rows-[auto_1fr] gap-6 px-6",
              )}
            >
              <div className="flex min-w-0 flex-col">

                <h3
                  id={`disc-${d.key}`}
                  className="font-display font-medium leading-[0.9] tracking-[-0.05em] text-ink text-[clamp(40px,5.4vw,96px)]"
                >
                  <Link href={d.href} className="disc-title inline-block">
                    {d.title[0]}
                    <br />
                    <span className="text-ink/35 transition-colors duration-std ease-uniix group-hover/panel:text-brand-ink">
                      {d.title[1]}
                    </span>
                  </Link>
                </h3>

                <p className="t-body mt-6 max-w-[40ch] text-ink-2">{d.line}</p>

                <ul className={clsx("mt-auto grid border-t border-line pt-2", pin ? "grid-cols-2 gap-x-6" : "mt-7 grid-cols-1")}>
                  {d.services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.pillar}/${s.slug}/`}
                        className="disc-svc flex min-h-[44px] items-center justify-between gap-3 border-b border-line-soft text-[14px] text-ink-2 transition-colors duration-micro hover:text-brand-ink"
                      >
                        <span className="truncate">{s.name}</span>
                        <span aria-hidden="true" className="disc-svc-arrow">↗</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual — real project work, or a drawn growth curve. */}
              <div className={clsx("relative min-h-0", pin ? "" : "order-first")}>
                <div className={clsx("disc-visual relative overflow-hidden bg-bg-ink", pin ? "h-full" : "aspect-[4/3]")}>
                  {d.visual ? (
                    <>
                      <SmartImage
                        src={d.visual.coverImage}
                        alt={`${d.visual.title} — ${d.title.join(" ")} work by Uniix Studio`}
                        sizes="(min-width:1024px) 50vw, 90vw"
                        className="disc-img"
                      />
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                      <Link
                        href={`/portfolio/${d.visual.slug}/`}
                        className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white"
                      >
                        <span>
                          <span className="block font-display text-[19px] font-medium tracking-[-0.02em]">{d.visual.title}</span>
                        </span>
                        <span aria-hidden="true" className="grid size-10 place-items-center rounded-full border border-white/40 transition-colors duration-micro group-hover/panel:border-brand-2 group-hover/panel:bg-brand-2 group-hover/panel:text-ink">
                          ↗
                        </span>
                      </Link>
                    </>
                  ) : (
                    <GrowthCurve />
                  )}
                </div>
              </div>
            </article>
          ))}

          {/* ------------------------------------------------------ End panel */}
          <div
            className={clsx(
              "flex shrink-0 snap-start flex-col items-start justify-center border-l border-line",
              pin ? "w-[24vw] px-14" : "w-[60vw] max-w-[300px] px-6",
            )}
          >
            <Magnetic>
              <Link href="/services/" className="btn btn-primary group">
                All services <span className="cta-arrow">↗</span>
              </Link>
            </Magnetic>
          </div>
        </motion.div>

        {/* Progress rail — desktop pin only. */}
        {pin && (
          <div aria-hidden="true" className="wrap-wide absolute inset-x-0 bottom-6">
            <div className="h-px w-full bg-line">
              <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-brand-ink" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Drawn when growth has no single project to point at — no invented numbers. */
function GrowthCurve() {
  return (
    <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="gc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F07B20" stopOpacity="0.35" />
          <stop offset="1" stopColor="#F07B20" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[60, 120, 180, 240].map((y) => (
        <line key={y} x1="24" x2="376" y1={y} y2={y} stroke="rgba(255,255,255,.08)" />
      ))}
      <path d="M24 270 C 110 262 150 230 200 190 S 300 90 376 50 L376 296 L24 296Z" fill="url(#gc-fill)" />
      <path className="gc-line" pathLength={1} d="M24 270 C 110 262 150 230 200 190 S 300 90 376 50" fill="none" stroke="#F5A623" strokeWidth="2.5" />
      <circle cx="376" cy="50" r="6" fill="#F5A623" className="gc-dot" />
      <text x="24" y="40" fill="rgba(255,255,255,.55)" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2">
        SEARCH · PAID · CONTENT · DATA
      </text>
    </svg>
  );
}
