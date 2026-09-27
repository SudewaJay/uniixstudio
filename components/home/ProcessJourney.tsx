"use client";

import { useState } from "react";
import clsx from "clsx";
// Aliased: a client module must not bind the name `process` — it collides
// with the bundler's `process.env` macro transform and breaks prerendering.
import { process as stages } from "@/lib/content";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../Reveal";

/**
 * Section 06 — How we work.
 *
 * Four panels, one open at a time. The open stage widens, turns dark and
 * draws its own line illustration of what that stage produces — research
 * radar, sitemap, stacked screens, growth curve — so the process reads as
 * artefacts rather than paragraphs.
 *
 * Desktop: panels sit side by side; pointing at, focusing or clicking one
 * opens it. Below lg the same markup becomes a vertical accordion driven by
 * tap. Every stage's copy is always in the DOM; collapsing is visual only.
 *
 * Replaces the sticky rail + long text blocks (~1,470px on a 670px viewport).
 */
export default function ProcessJourney() {
  const [active, setActive] = useState(0);

  return (
    <section id="process" className="section bg-bg-paper border-y border-line-soft">
      <div className="wrap">
        <SectionHeader
          eyebrow="How we work"
          title={
            <>
              Four stages.
              <br />
              <span className="t-italic accent-grad-text">No surprises.</span>
            </>
          }
          support="Clear deliverables at every stage, fixed milestones and honest dates."
        />

        <Reveal>
          <ol className="proc-list mt-12 flex flex-col gap-2.5 lg:mt-16 lg:h-[540px] lg:flex-row lg:gap-3">
            {stages.map((s, i) => {
              const on = i === active;
              const bodyId = `stage-${s.num}`;
              return (
                <li
                  key={s.num}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                  className={clsx(
                    "proc-panel relative flex min-w-0 flex-col overflow-hidden rounded-lg2 border",
                    on
                      ? "is-on on-dark border-transparent bg-bg-ink text-white lg:flex-[2.7]"
                      : "border-line bg-bg lg:flex-1",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-expanded={on}
                      aria-controls={bodyId}
                      className="flex w-full items-baseline gap-4 p-5 text-left lg:flex-col lg:gap-3 lg:p-7"
                    >
                      <span
                        className={clsx(
                          "t-meta shrink-0 tabular-nums",
                          on ? "text-brand-2" : "text-ink-mute",
                        )}
                      >
                        {s.num}
                      </span>
                      <span className="font-display text-[clamp(22px,1.9vw,30px)] font-medium leading-[1.1] tracking-[-0.025em] text-balance">
                        {s.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className={clsx(
                          "ml-auto text-lg transition-transform duration-std ease-uniix lg:hidden",
                          on ? "rotate-45 text-white/70" : "text-ink-mute",
                        )}
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  {/* Illustration — desktop always shows it; it draws when open. */}
                  <div
                    aria-hidden="true"
                    className={clsx(
                      "hidden flex-1 items-center justify-center px-7 lg:flex",
                      on ? "text-white/80" : "text-ink/25",
                    )}
                  >
                    <StageGlyph index={i} on={on} className={on ? "w-[min(100%,300px)]" : "w-[min(100%,150px)]"} />
                  </div>

                  {/* Body — collapses via grid rows so height animates without JS. */}
                  <div
                    id={bodyId}
                    className={clsx(
                      "grid transition-[grid-template-rows,opacity] duration-reveal ease-uniix",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="px-5 pb-6 lg:w-[min(540px,52vw)] lg:px-7 lg:pb-8">
                        <div aria-hidden="true" className="mb-5 text-white/80 lg:hidden">
                          <StageGlyph index={i} on={on} className="w-[180px]" />
                        </div>
                        <p className="t-body max-w-[46ch] text-white/75">{s.desc}</p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {s.deliverables.map((d, k) => (
                            <li
                              key={d}
                              style={{ transitionDelay: on ? `${220 + k * 70}ms` : "0ms" }}
                              className={clsx(
                                "proc-chip rounded-full border border-white/20 px-3 py-1.5 text-[12.5px] text-white/85",
                                on && "is-in",
                              )}
                            >
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Stage progress tick along the top edge. */}
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "absolute inset-x-0 top-0 h-[2px] origin-left bg-brand-grad transition-transform duration-reveal ease-uniix",
                      on ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </li>
              );
            })}
          </ol>
        </Reveal>
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
  const dot = on ? "fill-brand-2" : "fill-current";
  return (
    <svg
      viewBox="0 0 200 140"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      className={clsx("proc-glyph h-auto transition-[width] duration-reveal ease-uniix", on && "is-on", className)}
    >
      {index === 0 && (
        // Discover — a research radar sweeping an audience.
        <g>
          <circle cx="100" cy="70" r="58" {...p} />
          <circle cx="100" cy="70" r="38" {...p} />
          <circle cx="100" cy="70" r="18" {...p} />
          <path d="M100 8v124M38 70h124" {...p} opacity={0.5} />
          <path d="M100 70L141 29" {...p} />
          <circle cx="128" cy="48" r="3.5" className={dot} stroke="none" />
          <circle cx="72" cy="92" r="3" className={dot} stroke="none" />
          <circle cx="118" cy="104" r="2.5" className={dot} stroke="none" />
        </g>
      )}
      {index === 1 && (
        // Define — sitemap / information architecture.
        <g>
          <rect x="78" y="10" width="44" height="22" rx="3" {...p} />
          <path d="M100 32v16M40 48h120M40 48v12M100 48v12M160 48v12" {...p} />
          <rect x="20" y="60" width="40" height="20" rx="3" {...p} />
          <rect x="80" y="60" width="40" height="20" rx="3" {...p} />
          <rect x="140" y="60" width="40" height="20" rx="3" {...p} />
          <path d="M40 80v14M28 94h24M28 94v10M52 94v10M160 80v24" {...p} />
          <rect x="18" y="104" width="20" height="14" rx="2" {...p} />
          <rect x="42" y="104" width="20" height="14" rx="2" {...p} />
          <rect x="150" y="104" width="20" height="14" rx="2" {...p} />
          <circle cx="100" cy="21" r="3" className={dot} stroke="none" />
        </g>
      )}
      {index === 2 && (
        // Design & Build — stacked screens, grid to component.
        <g>
          <rect x="58" y="14" width="120" height="84" rx="5" {...p} opacity={0.45} />
          <rect x="40" y="28" width="120" height="84" rx="5" {...p} opacity={0.7} />
          <rect x="22" y="42" width="120" height="84" rx="5" {...p} />
          <path d="M22 54h120" {...p} />
          <path d="M34 66h44M34 76h30" {...p} />
          <rect x="34" y="86" width="44" height="28" rx="3" {...p} />
          <rect x="88" y="66" width="42" height="48" rx="3" {...p} />
          <circle cx="29" cy="48" r="2" className={dot} stroke="none" />
        </g>
      )}
      {index === 3 && (
        // Launch & Grow — bars and the curve they compound into.
        <g>
          <path d="M20 124h168M20 124V16" {...p} opacity={0.5} />
          <path d="M40 124v-16M70 124v-26M100 124v-38M130 124v-56M160 124v-78" {...p} strokeWidth={9} strokeLinecap="butt" opacity={0.28} />
          <path d="M28 112C70 104 96 92 118 70S158 30 184 20" {...p} />
          <path d="M172 18l12 2-4 11" {...p} />
          <circle cx="118" cy="70" r="3.5" className={dot} stroke="none" />
        </g>
      )}
    </svg>
  );
}
