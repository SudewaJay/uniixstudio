"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import type { ProcessStage } from "@/lib/cms/content";

/**
 * How we work — idea to launch, in four moves.
 *
 * Desktop: the section pins for ~3 screens. Scroll position picks the stage;
 * the numeral rolls, the stage's line drawing draws itself, its deliverables
 * step in, and the rail at the bottom fills. Below lg the same markup is a
 * vertical timeline whose spine fills as you scroll past it.
 *
 * All four stages are always in the DOM (the inactive ones are only visually
 * hidden on desktop), so the content is complete for crawlers and screen
 * readers regardless of scroll position.
 */
export default function ProcessLine({ stages }: { stages: ProcessStage[] }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const n = Math.max(1, stages.length);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.999))));
  });

  return (
    <section
      ref={ref}
      id="process"
      aria-labelledby="process-title"
      className="relative border-t border-line bg-bg-paper lg:h-[320vh]"
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col lg:pt-[var(--header-h)]">
        <div className="wrap-wide flex flex-1 flex-col py-24 lg:py-10">
          <h2
            id="process-title"
            className="font-display font-medium leading-[0.92] tracking-[-0.05em] text-ink text-[clamp(40px,5vw,80px)]"
          >
            How we work
          </h2>

          {/* --------------------------------------------------- Stages */}
          <div className="relative mt-14 flex-1 lg:mt-8">
            {/* Mobile spine */}
            <div aria-hidden="true" className="absolute bottom-0 left-[15px] top-0 w-px bg-line lg:hidden">
              <motion.div style={{ scaleY: fill }} className="h-full w-px origin-top bg-brand-ink" />
            </div>

            <ol className="relative grid gap-14 lg:block lg:h-full">
              {stages.map((s, i) => {
                const on = i === active;
                return (
                  <li
                    key={s.num}
                    className={clsx(
                      "proc-stage relative pl-12 lg:absolute lg:inset-0 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:pl-0",
                      on ? "is-on" : "is-off",
                    )}
                    aria-current={on ? "step" : undefined}
                  >
                    {/* Mobile node */}
                    <span
                      aria-hidden="true"
                      className="absolute left-[9px] top-3 size-[13px] rounded-full border-2 border-brand-ink bg-bg-paper lg:hidden"
                    />
                    <div>
                      <div className="flex items-end gap-5 lg:gap-8">
                        <span
                          aria-hidden="true"
                          className="proc-num font-display font-medium leading-[0.8] tracking-[-0.06em] text-brand-ink text-[clamp(72px,14vw,220px)]"
                        >
                          {s.num}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display font-medium leading-[1] tracking-[-0.04em] text-ink text-[clamp(30px,3.4vw,56px)] lg:mt-6">
                        <span className="sr-only">Stage {s.num}: </span>
                        {s.title}
                      </h3>
                      <p className="t-body mt-4 max-w-[48ch] text-ink-2">{s.desc}</p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {s.deliverables.map((d, k) => (
                          <li
                            key={d}
                            className="proc-deliv border border-ink/15 bg-bg px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2"
                            style={{ transitionDelay: on ? `${160 + k * 70}ms` : "0ms" }}
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div aria-hidden="true" className="mt-8 hidden text-ink lg:mt-0 lg:flex lg:justify-center">
                      <StageGlyph index={i} on={on} className="w-[min(100%,440px)]" />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Desktop rail */}
          <div aria-hidden="true" className="relative mt-8 hidden lg:block">
            <div className="h-px w-full bg-line">
              <motion.div style={{ scaleX: fill }} className="h-px origin-left bg-brand-ink" />
            </div>
            <ol className="mt-4 grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0,1fr))` }}>
              {stages.map((s, i) => (
                <li
                  key={s.num}
                  className={clsx(
                    "font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-std",
                    i <= active ? "text-ink" : "text-ink-mute/60",
                  )}
                >
                  <span className={i <= active ? "text-brand-ink" : ""}>{s.num}</span> {s.title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Line drawings, one per stage. `pathLength={1}` normalises every stroke so a
 * single CSS dash animation draws them all, whatever their real length.
 */
function StageGlyph({ index, on, className }: { index: number; on: boolean; className?: string }) {
  const p = { pathLength: 1, className: "proc-line" } as const;
  const dot = "fill-brand-3";
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      className={clsx("proc-glyph h-auto", on && "is-on", className)}
    >
      {index % 4 === 0 && (
        <g>
          <circle cx="100" cy="70" r="58" {...p} />
          <circle cx="100" cy="70" r="38" {...p} />
          <circle cx="100" cy="70" r="18" {...p} />
          <path d="M100 8v124M38 70h124" {...p} opacity={0.4} />
          <path d="M100 70L141 29" {...p} />
          <circle cx="128" cy="48" r="3.5" className={dot} stroke="none" />
          <circle cx="72" cy="92" r="3" className={dot} stroke="none" />
          <circle cx="118" cy="104" r="2.5" className={dot} stroke="none" />
        </g>
      )}
      {index % 4 === 1 && (
        <g>
          <rect x="78" y="10" width="44" height="22" rx="2" {...p} />
          <path d="M100 32v16M40 48h120M40 48v12M100 48v12M160 48v12" {...p} />
          <rect x="20" y="60" width="40" height="20" rx="2" {...p} />
          <rect x="80" y="60" width="40" height="20" rx="2" {...p} />
          <rect x="140" y="60" width="40" height="20" rx="2" {...p} />
          <path d="M40 80v14M28 94h24M28 94v10M52 94v10M160 80v24" {...p} />
          <rect x="18" y="104" width="20" height="14" rx="2" {...p} />
          <rect x="42" y="104" width="20" height="14" rx="2" {...p} />
          <rect x="150" y="104" width="20" height="14" rx="2" {...p} />
          <circle cx="100" cy="21" r="3" className={dot} stroke="none" />
        </g>
      )}
      {index % 4 === 2 && (
        <g>
          <rect x="58" y="14" width="120" height="84" rx="3" {...p} opacity={0.4} />
          <rect x="40" y="28" width="120" height="84" rx="3" {...p} opacity={0.7} />
          <rect x="22" y="42" width="120" height="84" rx="3" {...p} />
          <path d="M22 54h120" {...p} />
          <path d="M34 66h44M34 76h30" {...p} />
          <rect x="34" y="86" width="44" height="28" rx="2" {...p} />
          <rect x="88" y="66" width="42" height="48" rx="2" {...p} />
          <circle cx="29" cy="48" r="2" className={dot} stroke="none" />
        </g>
      )}
      {index % 4 === 3 && (
        <g>
          <path d="M20 124h168M20 124V16" {...p} opacity={0.4} />
          <path d="M40 124v-16M70 124v-26M100 124v-38M130 124v-56M160 124v-78" {...p} strokeWidth={9} strokeLinecap="butt" opacity={0.18} />
          <path d="M28 112C70 104 96 92 118 70S158 30 184 20" {...p} />
          <path d="M172 18l12 2-4 11" {...p} />
          <circle cx="118" cy="70" r="3.5" className={dot} stroke="none" />
        </g>
      )}
    </svg>
  );
}
