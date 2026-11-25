"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import { useFinePointer } from "@/components/home/studio/motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import type { AudienceTier } from "@/lib/projects";

export type IndexProject = {
  slug: string;
  title: string;
  year: string;
  overline: string;
  industry?: string;
  tier?: AudienceTier;
  descriptors: string[];
  /** Only set for projects with real imagery. */
  cover?: string;
  own: boolean;
};

type Discipline = "all" | "brand" | "web" | "seo" | "social";
type Tier = "all" | AudienceTier;

const DISCIPLINES: { id: Discipline; label: string; match: string[] }[] = [
  { id: "all", label: "All work", match: [] },
  { id: "brand", label: "Brand identity", match: ["brand", "logo", "guideline", "packaging"] },
  { id: "web", label: "Digital & web", match: ["web", "wordpress", "ui/ux", "development", "platform", "product design"] },
  { id: "seo", label: "SEO & growth", match: ["seo", "growth", "optimization", "optimisation"] },
  { id: "social", label: "Social & motion", match: ["social", "motion", "video", "graphic"] },
];

const TIERS: { id: Tier; label: string }[] = [
  { id: "all", label: "Any size" },
  { id: "startup", label: "Startup" },
  { id: "smb", label: "Small business" },
  { id: "midmarket", label: "Mid-market" },
];

/**
 * The full archive as an index: one row per project, newest first. Filters
 * keep the existing disciplines and client sizes. On a mouse, the project's
 * cover follows the pointer over its row; on touch, rows with real imagery
 * carry a small thumbnail instead.
 */
export default function ProjectIndex({ projects }: { projects: IndexProject[] }) {
  const [discipline, setDiscipline] = useState<Discipline>("all");
  const [tier, setTier] = useState<Tier>("all");
  const [hover, setHover] = useState<string | null>(null);
  const fine = useFinePointer();
  const reduce = useSafeReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  const list = useMemo(() => {
    const d = DISCIPLINES.find((x) => x.id === discipline)!;
    return projects.filter(
      (p) =>
        (discipline === "all" || p.descriptors.some((t) => d.match.some((m) => t.includes(m)))) &&
        (tier === "all" || p.tier === tier),
    );
  }, [projects, discipline, tier]);

  const hovered = list.find((p) => p.slug === hover);
  const filtered = discipline !== "all" || tier !== "all";

  return (
    <section id="archive" aria-labelledby="archive-title" className="relative bg-bg py-24 md:py-32">
      <div className="wrap-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="archive-title"
            className="font-display font-medium leading-[0.9] tracking-[-0.05em] text-ink text-[clamp(44px,6.6vw,112px)]"
          >
            Index
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute" aria-live="polite">
            {list.length} of {projects.length} projects
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-[calc(var(--header-h)-1px)] z-30 mt-10 border-y border-ink/10 bg-bg/90 backdrop-blur-xl">
        <div className="wrap-wide flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by discipline" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
            {DISCIPLINES.map((d) => (
              <button
                key={d.id}
                type="button"
                aria-pressed={discipline === d.id}
                onClick={() => setDiscipline(d.id)}
                className={clsx(
                  "min-h-[40px] whitespace-nowrap px-4 text-[14px] font-medium transition-colors duration-micro",
                  discipline === d.id ? "bg-ink text-white" : "text-ink-2 hover:bg-ink/5 hover:text-ink",
                )}
              >
                {d.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <div role="group" aria-label="Filter by client size" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
              {TIERS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={tier === t.id}
                  onClick={() => setTier(t.id)}
                  className={clsx(
                    "min-h-[36px] whitespace-nowrap border px-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-micro",
                    tier === t.id ? "border-brand-ink bg-brand-ink text-white" : "border-ink/15 text-ink-mute hover:border-ink/40 hover:text-ink",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setDiscipline("all");
                  setTier("all");
                }}
                className="ml-2 min-h-[36px] whitespace-nowrap px-2 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-ink underline underline-offset-4"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="wrap-wide">
        <ol
          className="relative mt-2"
          onPointerMove={(e) => {
            if (!fine) return;
            x.set(e.clientX);
            y.set(e.clientY);
          }}
          onPointerLeave={() => setHover(null)}
        >
          {list.map((p) => (
            <li key={p.slug} className="border-b border-ink/12">
              <Link
                href={`/portfolio/${p.slug}/`}
                onPointerEnter={() => setHover(p.cover ? p.slug : null)}
                onFocus={() => setHover(null)}
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-2 py-6 md:grid-cols-[72px_minmax(0,1.3fr)_minmax(0,1fr)_140px_32px] md:py-8"
              >
                <span className="hidden font-mono text-[12px] tabular-nums text-ink-mute md:block">{p.year}</span>
                <span className="flex items-center gap-4">
                  {p.cover && (
                    <span className="relative block size-14 shrink-0 overflow-hidden bg-bg-warm md:hidden">
                      <SmartImage src={p.cover} alt="" sizes="56px" />
                    </span>
                  )}
                  <span>
                    <span className="block font-display font-medium leading-[1] tracking-[-0.04em] text-ink text-[clamp(26px,3.4vw,52px)] transition-[color,transform] duration-std ease-uniix group-hover:translate-x-2 group-hover:text-brand-ink">
                      {p.title}
                    </span>
                    <span className="mt-2 block font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute md:hidden">
                      {p.year} · {p.own ? "Our product" : p.industry ?? p.overline}
                    </span>
                  </span>
                </span>
                <span className="hidden text-[14.5px] leading-[1.45] text-ink-2 md:block">{p.overline}</span>
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute md:block">
                  {p.own ? "Our product" : TIERS.find((t) => t.id === p.tier)?.label ?? ""}
                </span>
                <span aria-hidden="true" className="text-[20px] text-ink-mute transition-transform duration-std group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-ink">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {list.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-[28px] font-medium tracking-[-0.03em] text-ink">Nothing matches both filters.</p>
            <button
              type="button"
              onClick={() => {
                setDiscipline("all");
                setTier("all");
              }}
              className="btn btn-ghost mt-6"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>

      {/* Cursor preview (mouse only) */}
      {fine && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {hovered?.cover && (
              <motion.div
                key={hovered.slug}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                className="absolute -translate-y-1/2 translate-x-8 overflow-hidden shadow-[0_30px_60px_-20px_rgba(18,16,14,.45)]"
              >
                <div className="relative h-[220px] w-[320px]">
                  <SmartImage src={hovered.cover} alt="" sizes="320px" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
