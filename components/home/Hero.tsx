"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SmartImage from "../ui/SmartImage";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export type HeroProject = {
  slug: string;
  title: string;
  overline: string;
  coverImage: string;
};

/** Verified figures — the numbers already published on the site. */
const STATS = [
  { value: "50+", label: "Projects shipped" },
  { value: "30+", label: "Clients served" },
  { value: "92%", label: "Client retention" },
];

/** Card placement + parallax depth for the desktop cluster. */
const LAYOUT = [
  { pos: "left-0 top-[8%] w-[62%] aspect-[4/5] z-[3]", depth: 14 },
  { pos: "right-0 top-0 w-[46%] aspect-[3/4] z-[2]", depth: 7 },
  { pos: "right-[6%] bottom-0 w-[54%] aspect-[4/3] z-[4]", depth: 18 },
];

function HeroCard({
  project,
  index,
  px,
  py,
  parallax,
  reduce,
}: {
  project: HeroProject;
  index: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  parallax: boolean;
  reduce: boolean | null;
}) {
  const { pos, depth } = LAYOUT[index] ?? LAYOUT[0];
  // Hooks are called unconditionally; only their *use* is conditional.
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);

  return (
    <motion.article
      className={`absolute ${pos} group`}
      initial={reduce ? false : { opacity: 0, y: 26, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.16 + index * 0.09, ease: EASE }}
      style={parallax ? { x, y } : undefined}
    >
      <Link
        href={`/portfolio/${project.slug}/`}
        className="block frame h-full shadow-lift ring-1 ring-black/5"
      >
        <SmartImage
          src={project.coverImage}
          alt={`${project.title} — ${project.overline}`}
          sizes="(min-width:1280px) 28vw, (min-width:768px) 34vw, 80vw"
          priority={index === 0}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-std ease-uniix"
        />
        <span className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 transition-all duration-std ease-uniix">
          <span className="block t-meta text-white/70 text-[10px]">
            {project.overline.split("·")[0].trim()}
          </span>
          <span className="mt-1.5 flex items-center gap-2 font-display font-medium text-white text-[19px] tracking-[-0.02em]">
            {project.title} <span className="cta-arrow">↗</span>
          </span>
        </span>
      </Link>
    </motion.article>
  );
}

/**
 * Hero.
 *
 * Replaces the previous full-bleed WebGL silk shader (3 nested 6-octave fBm
 * evaluations per pixel at 2× DPR, running at 60fps for the life of the page,
 * under a backdrop-blur layer) with real project work. The studio's quality is
 * now demonstrated rather than asserted, and the hero costs no GPU.
 *
 * Parallax is pointer-driven, spring-damped, ≤18px, and switched off entirely
 * for touch input and reduced-motion.
 */
export default function Hero({ projects }: { projects: HeroProject[] }) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [fine, setFine] = useState(false);

  const px = useSpring(0, { stiffness: 60, damping: 18, mass: 0.6 });
  const py = useSpring(0, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const parallax = fine && !reduce;

  useEffect(() => {
    if (!parallax) return;
    const el = stageRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [parallax, px, py]);

  const shown = projects.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-bg pt-[132px] pb-[64px] md:pt-[152px] md:pb-[88px]">
      {/* Warm ambient wash — static, cheap, keeps the cream from going flat. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(58% 48% at 88% 8%, rgba(248,200,74,0.22), transparent 68%), radial-gradient(46% 44% at 2% 92%, rgba(232,98,26,0.10), transparent 70%)",
        }}
      />

      <div className="wrap relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,40%)] lg:gap-14 xl:gap-20 lg:items-center">
          {/* ------------------------------------------------------ Copy */}
          <div className="min-w-0">
            <div
              className="rise-in flex flex-wrap items-center gap-x-5 gap-y-2"
              style={{ animationDelay: "40ms" }}
            >
              <span className="eyebrow">Creative Digital Agency</span>
              <span className="inline-flex items-center gap-2 t-meta text-ink-mute">
                <span className="status-dot" />
                2 slots open for Q3 2026
              </span>
            </div>

            <h1 className="t-display mt-7">
              <span className="mask-line">
                <span style={{ animationDelay: "80ms" }}>We build brands</span>
              </span>
              <span className="mask-line">
                <span
                  className="t-italic accent-grad-text"
                  style={{ animationDelay: "170ms" }}
                >
                  people remember.
                </span>
              </span>
            </h1>

            <p
              className="rise-in t-lead mt-7 max-w-[52ch] text-ink-2"
              style={{ animationDelay: "300ms" }}
            >
              Uniix Studio is a creative digital agency in Colombo. We design brand
              identities, build conversion-focused websites, and run the growth systems
              that keep them earning — for ambitious companies in Sri Lanka and beyond.
            </p>

            <div
              className="rise-in mt-9 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap"
              style={{ animationDelay: "380ms" }}
            >
              <Link href="/contact" className="btn btn-primary group">
                Start a project <span className="cta-arrow">↗</span>
              </Link>
              <Link href="/portfolio" className="btn btn-secondary">
                View our work
              </Link>
            </div>

            {/* Stats — typographic, on a rule. No cards, no decoration. */}
            <dl
              className="rise-in mt-12 md:mt-14 grid grid-cols-3 gap-3 sm:gap-8 border-t border-line pt-7 max-w-[520px]"
              style={{ animationDelay: "460ms" }}
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="t-numeral block text-[clamp(34px,4.4vw,52px)] text-ink">
                      {s.value}
                    </span>
                    <span
                      aria-hidden="true"
                      className="t-meta mt-3 block text-ink-mute text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.18em] leading-[1.5]"
                    >
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* --------------------------------------------------- Work stage */}
          <div ref={stageRef} className="relative min-w-0">
            {/* Desktop: overlapping editorial cluster with pointer parallax. */}
            <div className="hidden md:block relative h-[540px] lg:h-[600px]">
              {shown.map((p, i) => (
                <HeroCard
                  key={p.slug}
                  project={p}
                  index={i}
                  px={px}
                  py={py}
                  parallax={parallax}
                  reduce={reduce}
                />
              ))}
            </div>

            {/* Mobile: a swipeable strip. Same content, native interaction. */}
            <div className="md:hidden -mx-[var(--gutter)]">
              <ul className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-[var(--gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {shown.map((p) => (
                  <li key={p.slug} className="snap-start shrink-0 w-[68%]">
                    <Link href={`/portfolio/${p.slug}/`} className="block group">
                      <div className="frame aspect-[4/5] shadow-sm2">
                        <SmartImage
                          src={p.coverImage}
                          alt={`${p.title} — ${p.overline}`}
                          sizes="70vw"
                        />
                      </div>
                      <span className="mt-3 flex items-center gap-1.5 t-h4 text-ink">
                        {p.title} <span className="cta-arrow accent">↗</span>
                      </span>
                      <span className="mt-1 block t-meta text-ink-mute text-[10px]">
                        {p.overline.split("·")[0].trim()}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
