"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import SmartImage from "../ui/SmartImage";
import type { FiProject } from "./types";
import { firstSentence, shortIndustry } from "./types";
import styles from "./finland.module.css";

/**
 * 04 — Case studies. How the work solved a problem, not just how it looks.
 *
 * Challenge / approach / result are each project's own MDX `problem`,
 * `solution` and `result`, trimmed to their first sentence. Figures appear
 * only where the MDX records them (`stats`) and are labelled as project facts
 * — no invented metrics.
 *
 * WAI-ARIA tabs: arrow keys move between projects, Home/End jump.
 */
export default function FinlandCaseStudies({ items }: { items: FiProject[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  if (!items.length) return null;

  const onKey = (e: KeyboardEvent) => {
    const n = items.length;
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % n;
    else if (e.key === "ArrowLeft") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  const p = items[active];
  const steps = [
    { k: "The challenge", v: firstSentence(p.problem) },
    { k: "The approach", v: firstSentence(p.solution) },
    { k: "The result", v: firstSentence(p.result) },
  ].filter((s) => s.v);

  return (
    <section id="case-studies" aria-labelledby="fi-cases-heading" className="section bg-bg">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Case studies</span>
          <h2 id="fi-cases-heading" className="t-h2 mt-5 max-w-[18ch]">
            Good design looks better.{" "}
            <span className="t-italic accent-grad-text">Great design works better.</span>
          </h2>
        </Reveal>

        <div role="tablist" aria-label="Case studies" onKeyDown={onKey} className={clsx(styles.caseTabs, "mt-12")}>
          {items.map((it, i) => (
            <button
              key={it.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`fi-case-tab-${i}`}
              aria-selected={active === i}
              aria-controls="fi-case-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={clsx(styles.caseTab, active === i && styles.caseTabOn)}
            >
              <span className="t-meta text-[10px] tabular-nums opacity-70">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-medium">{it.title}</span>
            </button>
          ))}
        </div>

        <div
          id="fi-case-panel"
          role="tabpanel"
          aria-labelledby={`fi-case-tab-${active}`}
          className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14"
        >
          <div key={p.slug} className={clsx(styles.fadeSwap, "relative")}>
            <div className="frame aspect-[4/3] shadow-sm2">
              <SmartImage src={p.coverImage} alt={`${p.title} — ${p.headline}`} sizes="(min-width:1024px) 55vw, 92vw" quality={72} />
            </div>
            {p.stats && p.stats.length > 0 && (
              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-sm2 border border-line bg-line sm:grid-cols-4">
                {p.stats.slice(0, 4).map((s) => (
                  <div key={s.label} className="flex flex-col-reverse bg-bg-paper px-4 py-3">
                    <dt className="t-meta mt-1 text-[9px] text-ink-mute">{s.label}</dt>
                    <dd className="t-numeral text-[24px]">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div key={`${p.slug}-copy`} className={styles.fadeSwap}>
            <p className="t-meta text-ink-mute">
              {shortIndustry(p)} <span className="mx-2 opacity-40">·</span> {p.year}
            </p>
            <h3 className="t-h3 mt-3">{p.title}</h3>
            <ol className="mt-8 border-t border-line">
              {steps.map((s, i) => (
                <li key={s.k} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-6">
                  <span className={clsx("t-meta text-[10px]", i === steps.length - 1 ? "accent" : "text-ink-mute")}>{s.k}</span>
                  <p className="text-[15px] leading-[1.6] text-ink-2">{s.v}</p>
                </li>
              ))}
            </ol>
            <Link href={`/portfolio/${p.slug}/`} className="link-cta group mt-8">
              Read the full case study <span className="cta-arrow">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
