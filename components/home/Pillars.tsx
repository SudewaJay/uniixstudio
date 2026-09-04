"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { services } from "@/lib/content";
import { getServicesForPillar, type ServicePillar } from "@/lib/services";
import SmartImage from "../ui/SmartImage";
import SectionHeader from "../ui/SectionHeader";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export type PillarProof = {
  pillar: string;
  slug: string;
  title: string;
  year: string;
  coverImage: string;
  /** The tag on that project which evidences this discipline. */
  evidence: string;
};

function Icon({ slug, className }: { slug: string; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
  if (slug === "design")
    return (
      <svg {...common}>
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="10.5" r="2.5" />
        <circle cx="8.5" cy="7.5" r="2.5" />
        <circle cx="6.5" cy="12.5" r="2.5" />
        <path d="M12 22a10 10 0 0 1 0-20c5.5 0 10 4.5 9 9.5 0 2-1.5 3.5-3.5 3.5h-2c-1.5 0-2.5 1-2.5 2.5C13 19 13.5 22 12 22Z" />
      </svg>
    );
  if (slug === "growth")
    return (
      <svg {...common}>
        <polyline points="3 17 9 11 13 15 21 7" />
        <polyline points="14 7 21 7 21 14" />
      </svg>
    );
  return (
    <svg {...common}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

/**
 * Section 03 — What we do.
 *
 * A discipline *index*, not a card grid: the three names are set at display
 * scale and behave like an accordion, and the panel beside them answers the
 * question the section actually raises — "can you prove it?" — with a real
 * project from that discipline.
 *
 * One markup tree serves every breakpoint (the earlier version rendered a
 * desktop grid and a mobile accordion separately, duplicating every heading).
 * Pointer users get hover; keyboard and touch users get click/tap on the same
 * control. Sub-service links stay in the DOM whether or not a panel is open, so
 * the internal linking is unchanged for crawlers.
 */
export default function Pillars({ proof }: { proof: PillarProof[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const pillars = services.map((s) => ({
    slug: s.slug,
    num: s.num,
    title: s.title,
    positioning: s.positioning,
    subs: getServicesForPillar(s.slug as ServicePillar),
    proof: proof.find((p) => p.pillar === s.slug),
  }));

  const activeProof = pillars[active]?.proof;

  return (
    <section id="services" className="section bg-bg-paper border-y border-line-soft">
      <div className="wrap">
        <SectionHeader
          eyebrow="What we do"
          title={
            <>
              Three disciplines.
              <br />
              <span className="t-italic accent-grad-text">One accountable team.</span>
            </>
          }
          support="Open a discipline to see what sits inside it — and a project where we shipped it."
          action={
            <Link href="/services" className="link-cta group">
              All services <span className="cta-arrow">↗</span>
            </Link>
          }
        />

        <div className="mt-14 md:mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,40%)] lg:gap-16 items-start">
          {/* ------------------------------------------- Discipline index */}
          <ul className="border-t border-line">
            {pillars.map((p, i) => {
              const isOpen = i === active;
              return (
                <li key={p.slug} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-expanded={isOpen}
                      aria-controls={`pillar-${p.slug}`}
                      className="group flex w-full items-center gap-5 py-6 text-left md:py-7"
                    >
                      <span
                        aria-hidden="true"
                        className={`t-meta shrink-0 tabular-nums transition-colors duration-micro ${
                          isOpen ? "accent" : "text-ink-mute"
                        }`}
                      >
                        {p.num}
                      </span>

                      <span
                        className={`font-display font-medium leading-[0.98] tracking-[-0.04em] transition-colors duration-std ease-uniix ${
                          isOpen ? "text-ink" : "text-ink/60 group-hover:text-ink"
                        }`}
                        style={{
                          fontSize: "clamp(34px,5.2vw,68px)",
                          fontVariationSettings: `"opsz" 144, "slnt" ${
                            isOpen ? -10 : 0
                          }`,
                          transition:
                            "font-variation-settings var(--dur-std) var(--ease), color var(--dur-std) var(--ease)",
                        }}
                      >
                        {p.title}
                      </span>

                      {/* Discipline mark — fills in when the row is open. */}
                      <span
                        className={`ml-auto grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-std ease-uniix md:size-12 ${
                          isOpen
                            ? "border-brand-ink bg-brand-ink text-white"
                            : "border-line text-ink-mute group-hover:border-ink group-hover:text-ink"
                        }`}
                      >
                        <Icon slug={p.slug} className="size-5" />
                      </span>
                    </button>
                  </h3>

                  {/*
                    Expanding detail. Animated with grid-template-rows 0fr→1fr
                    rather than an animated height: it needs no measurement
                    pass, so it cannot fall out of sync with React state, and
                    it costs no JS. Kept mounted so the sub-service links stay
                    in the HTML for crawlers at every state.
                  */}
                  <div
                    id={`pillar-${p.slug}`}
                    className="grid transition-[grid-template-rows,opacity] duration-std ease-uniix"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                    <div className="pb-8">
                      <p className="t-body max-w-[52ch] text-ink-2">{p.positioning}</p>

                      <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
                        {p.subs.map((sub) => (
                          <li key={sub.slug} className="border-b border-line-soft">
                            <Link
                              href={`/services/${sub.pillar}/${sub.slug}/`}
                              tabIndex={isOpen ? undefined : -1}
                              className="group/link flex min-h-[48px] items-center justify-between gap-3 py-2.5 text-[14.5px] text-ink-2 transition-colors duration-micro ease-uniix hover:text-brand-ink"
                            >
                              <span className="min-w-0 truncate">{sub.name}</span>
                              <span
                                aria-hidden="true"
                                className="shrink-0 opacity-0 -translate-x-1 transition-all duration-micro ease-uniix group-hover/link:opacity-70 group-hover/link:translate-x-0"
                              >
                                →
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/services/${p.slug}/`}
                        tabIndex={isOpen ? undefined : -1}
                        className="link-cta group mt-7 text-[14px]"
                      >
                        Explore {p.title.toLowerCase()}{" "}
                        <span className="cta-arrow">↗</span>
                      </Link>

                      {/* Proof, inline — this is the only place it appears
                          below lg, where the sticky panel is not rendered. */}
                      {p.proof && (
                        <Link
                          href={`/portfolio/${p.proof.slug}/`}
                          tabIndex={isOpen ? undefined : -1}
                          className="group mt-8 flex items-center gap-4 rounded-lg2 border border-line bg-bg p-3 lg:hidden"
                        >
                          <span className="frame relative size-20 shrink-0 rounded-[14px]">
                            <SmartImage
                              src={p.proof.coverImage}
                              alt=""
                              sizes="80px"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="t-meta block text-[9px] text-ink-mute">
                              Proof · {p.proof.evidence}
                            </span>
                            <span className="mt-1.5 flex items-center gap-1.5 t-h4 text-ink">
                              {p.proof.title} <span className="cta-arrow accent">↗</span>
                            </span>
                          </span>
                        </Link>
                      )}
                    </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* ------------------------------------------------- Proof panel */}
          <div className="hidden lg:block sticky top-[calc(var(--header-h)+32px)]">
            <div className="relative">
              {/* Oversized outlined numeral — decorative, hidden from AT, so
                  its low contrast carries no meaning. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-14 -left-6 z-[2] select-none font-display font-medium leading-none"
                style={{
                  fontSize: "180px",
                  letterSpacing: "-0.06em",
                  color: "transparent",
                  WebkitTextStroke: "1.5px rgba(18,16,14,0.16)",
                  fontVariationSettings: '"opsz" 144, "slnt" 0',
                }}
              >
                {pillars[active]?.num}
              </span>

              <div className="frame relative aspect-[4/5] shadow-lift ring-1 ring-black/5">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeProof?.slug ?? active}
                    initial={reduce ? false : { opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute inset-0"
                  >
                    {activeProof && (
                      <SmartImage
                        src={activeProof.coverImage}
                        alt=""
                        sizes="(min-width:1280px) 38vw, 42vw"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/15 to-transparent"
                />

                {activeProof && (
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="t-meta text-[10px] text-white/70">
                      Proof · {activeProof.evidence} · {activeProof.year}
                    </p>
                    <Link
                      href={`/portfolio/${activeProof.slug}/`}
                      className="group mt-2.5 inline-flex items-center gap-2 font-display font-medium text-[23px] tracking-[-0.025em] text-white"
                    >
                      {activeProof.title}
                      <span className="cta-arrow">↗</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
