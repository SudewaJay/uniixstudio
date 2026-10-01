"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Reveal from "../Reveal";
import type { FinlandContent, FinlandUI } from "@/lib/finland-i18n";

/**
 * 08 — How we work.
 *
 * One line runs through five stages and fills as the section scrolls past —
 * horizontal on desktop, vertical on mobile. It's a single transform on one
 * element (scaleX / scaleY), and the active step is derived from the same
 * progress value. Under reduced motion the line is simply full.
 */
export default function FinlandProcess({ steps, t }: { steps: FinlandContent["process"]; t: FinlandUI["process"] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(reduce ? steps.length - 1 : -1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    // Step i lights up once the line has reached its marker.
    const idx = Math.min(steps.length - 1, Math.floor(v * steps.length + 0.15));
    setReached(v <= 0.01 ? -1 : idx);
  });

  const lit = (i: number) => reduce || i <= reached;

  return (
    <section id="process" aria-labelledby="fi-process-heading" className="section bg-bg">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:items-end lg:gap-16">
          <Reveal>
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 id="fi-process-heading" className="t-h2 mt-5">
              {t.title[0]}
              <br />
              <span className="t-italic accent-grad-text">{t.title[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead max-w-[42ch] text-ink-2">
              {t.lead}
            </p>
          </Reveal>
        </div>

        <ol ref={ref} className="relative mt-14 grid gap-0 lg:mt-20 lg:grid-cols-5 lg:gap-8">
          {/* Track + fill — horizontal (lg) */}
          <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-line lg:block" />
          <motion.span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-brand-ink lg:block"
            style={{ scaleX: reduce ? 1 : progress }}
          />
          {/* Track + fill — vertical (mobile) */}
          <span aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-line lg:hidden" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-brand-ink lg:hidden"
            style={{ scaleY: reduce ? 1 : progress }}
          />

          {steps.map((s, i) => (
            <li key={s.num} className="relative pb-12 pl-10 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-12">
              <span
                aria-hidden="true"
                className={clsx(
                  "absolute left-0 top-0 grid size-[15px] place-items-center rounded-full border bg-bg transition-colors duration-std ease-uniix",
                  lit(i) ? "border-brand-ink" : "border-line",
                )}
              >
                <span
                  className={clsx(
                    "size-[7px] rounded-full transition-transform duration-std ease-uniix",
                    lit(i) ? "scale-100 bg-brand-ink" : "scale-0 bg-brand-ink",
                  )}
                />
              </span>
              <p className={clsx("t-meta tabular-nums transition-colors duration-std", lit(i) ? "accent" : "text-ink-mute")}>
                {s.num}
              </p>
              <h3
                className={clsx(
                  "mt-3 font-display font-medium text-[clamp(26px,2.4vw,34px)] leading-none tracking-[-0.03em] transition-colors duration-std ease-uniix",
                  lit(i) ? "text-ink" : "text-ink/55",
                )}
              >
                {s.title}
              </h3>
              <p className="t-body mt-4 max-w-[30ch] text-ink-2">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
