"use client";

import { useEffect, useRef, useState } from "react";
// Aliased: a client module must not bind the name `process` — it collides
// with the bundler's `process.env` macro transform and breaks prerendering.
import { process as stages } from "@/lib/content";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../Reveal";

/**
 * Section 06 — How we work.
 *
 * Desktop: a sticky stage rail on the left tracks the stage blocks scrolling
 * past on the right, so the user always knows where they are in the process.
 * Active stage is derived from an IntersectionObserver, not from scroll maths,
 * so it stays correct at any zoom or viewport height.
 *
 * Mobile: a plain vertical timeline with a connector rule. No sticky, no
 * hover — the previous version had `:hover` padding shifts and colour changes
 * on rows that were not interactive at all.
 */
export default function ProcessJourney() {
  const [active, setActive] = useState(0);
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const els = stageRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the middle band of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const idx = els.indexOf(visible[0].target as HTMLDivElement);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

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
          support="Clear deliverables at every stage, fixed milestones and honest dates — so you always know what's happening and what comes next."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,32%)_minmax(0,1fr)] lg:gap-20">
          {/* ------------------------------------------- Sticky stage rail */}
          <div className="hidden lg:block">
            <ol className="sticky top-[calc(var(--header-h)+48px)] border-l border-line">
              {stages.map((p, i) => {
                const on = i === active;
                return (
                  <li key={p.num} className="relative">
                    <span
                      aria-hidden="true"
                      className={`absolute -left-px top-0 h-full w-0.5 origin-top bg-brand-ink transition-transform duration-std ease-uniix ${
                        on ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <div className="py-5 pl-6">
                      <span
                        className={`t-meta tabular-nums transition-colors duration-micro ${
                          on ? "accent" : "text-ink-mute"
                        }`}
                      >
                        {p.num}
                      </span>
                      <span
                        aria-current={on ? "step" : undefined}
                        className={`mt-2 block font-display font-medium text-[clamp(20px,1.9vw,26px)] tracking-[-0.02em] transition-colors duration-micro ${
                          on ? "text-ink" : "text-ink/60"
                        }`}
                      >
                        {p.title}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* ------------------------------------------------ Stage blocks */}
          <div className="flex flex-col">
            {stages.map((p, i) => (
              <div
                key={p.num}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                className="relative border-t border-line py-10 first:border-t-0 first:pt-0 lg:py-16"
              >
                <Reveal>
                  {/* One heading per stage. The numbered token is shown only
                      below lg, where the sticky rail isn't there to carry it. */}
                  <h3 className="flex items-center gap-4 t-h2 text-[clamp(24px,3vw,40px)]">
                    <span
                      aria-hidden="true"
                      className="lg:hidden grid size-11 shrink-0 place-items-center rounded-full border border-line t-meta text-ink-mute tabular-nums"
                    >
                      {p.num}
                    </span>
                    {p.title}
                  </h3>

                  <p className="t-lead mt-5 max-w-[52ch] text-ink-2">{p.desc}</p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {p.deliverables.map((d) => (
                      <li
                        key={d}
                        className="rounded-full bg-bg-warm border border-line px-3.5 py-2 text-[13px] text-ink-2"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
