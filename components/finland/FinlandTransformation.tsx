"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Reveal from "../Reveal";
import TransformFrame from "./TransformFrame";
import { finlandTransformation as stages } from "@/lib/finland";

/**
 * 05 — Digital transformation.
 *
 * Desktop: stage copy scrolls on the left while one sticky browser frame on
 * the right evolves through each state. The active stage comes from an
 * IntersectionObserver band in the middle of the viewport (the same approach
 * as the homepage process rail), so it's correct at any zoom level and simply
 * snaps between states under reduced motion.
 *
 * Mobile: no sticky; each stage carries its own small frame.
 */
export default function FinlandTransformation() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (!hit) return;
        const idx = els.indexOf(hit.target as HTMLElement);
        if (idx >= 0) setActive(idx);
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="transformation" aria-labelledby="fi-tf-heading" className="section bg-bg-warm border-y border-line-soft">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:items-end lg:gap-16">
          <Reveal>
            <span className="eyebrow">Digital transformation</span>
            <h2 id="fi-tf-heading" className="t-h2 mt-5">
              Not a website vendor.
              <br />
              <span className="t-italic accent-grad-text">A product partner.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead max-w-[42ch] text-ink-2">
              Strategy, UX, design, engineering and growth — one continuous
              line from an outdated presence to a digital product that keeps
              improving.
            </p>
          </Reveal>
        </div>

        {/* Evolution chips — the whole journey at a glance. */}
        <ol className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="Transformation stages">
          {stages.map((s, i) => (
            <li key={s.key} className="flex items-center gap-2">
              <span
                aria-current={i === active ? "step" : undefined}
                className={clsx(
                  "rounded-full border px-3.5 py-1.5 t-meta text-[10px] transition-colors duration-std ease-uniix",
                  i === active
                    ? "border-ink bg-ink text-white"
                    : i < active
                      ? "border-ink/30 text-ink"
                      : "border-line text-ink-mute",
                )}
              >
                {s.label}
              </span>
              {i < stages.length - 1 && (
                <span aria-hidden="true" className="text-ink-mute">→</span>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-10 lg:mt-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          {/* ------------------------------------------------ Stage copy */}
          <div>
            {stages.map((s, i) => (
              <article
                key={s.key}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="flex flex-col justify-center border-t border-line py-10 first:border-t-0 lg:min-h-[64vh] lg:border-t-0 lg:py-0"
              >
                <p className="t-meta text-ink-mute">
                  <span className={clsx(i === active ? "accent" : "")}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="mx-2 opacity-40">/</span>
                  {s.disciplines.join(" · ")}
                </p>
                <h3
                  className={clsx(
                    "t-h2 mt-4 text-[clamp(26px,3vw,42px)] transition-colors duration-std ease-uniix",
                    i === active ? "text-ink" : "lg:text-ink/55",
                  )}
                >
                  {s.title}
                </h3>
                <p className="t-lead mt-4 max-w-[40ch] text-ink-2">{s.desc}</p>

                {/* Mobile: the frame travels with its stage. */}
                <div className="mt-8 lg:hidden">
                  <TransformFrame active={i} solo />
                </div>
              </article>
            ))}
          </div>

          {/* ------------------------------------------------ Sticky frame */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+40px)] py-[8vh]">
              <TransformFrame active={active} />
              <div aria-hidden="true" className="mt-6 h-px w-full overflow-hidden bg-line">
                <span
                  className="block h-full origin-left bg-brand-ink transition-transform duration-reveal ease-uniix"
                  style={{ transform: `scaleX(${(active + 1) / stages.length})` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
