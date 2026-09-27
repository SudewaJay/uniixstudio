"use client";

import { useState } from "react";
import clsx from "clsx";
import Reveal from "../Reveal";
import { finlandCapabilities } from "@/lib/finland";
import styles from "./finland.module.css";

/**
 * 06 — Capabilities: design → experience → engineering → growth.
 *
 * Desktop: four slim columns in a row; the active one widens (flex-grow, CSS
 * transition) to reveal its capability list. Hover, focus or click all set
 * the active column, so nothing depends on a mouse.
 *
 * Mobile: the same markup becomes a vertical accordion — the list opens with
 * a grid-rows 0fr→1fr transition, no height measuring.
 *
 * Every list stays in the DOM for crawlers; collapsed ones are hidden from
 * assistive tech via aria-hidden and the button's aria-expanded.
 */
export default function FinlandCapabilities() {
  const [active, setActive] = useState(0);

  return (
    <section id="capabilities" aria-labelledby="fi-cap-heading" className="section bg-bg-paper border-y border-line-soft">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="eyebrow">Capabilities</span>
            <h2 id="fi-cap-heading" className="t-h2 mt-5">
              Design meets
              <br />
              <span className="t-italic accent-grad-text">engineering.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-body max-w-[36ch] text-ink-mute">
              Designers and engineers on one team — so what gets designed is what gets built. Select a stage to see what sits inside it.
            </p>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <ul className={clsx(styles.capRow, "mt-12 md:mt-16")}>
            {finlandCapabilities.map((c, i) => {
              const on = active === i;
              const panelId = `fi-cap-${c.num}`;
              return (
                <li
                  key={c.num}
                  className={clsx(styles.capCol, on && styles.capOn)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={panelId}
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="block w-full text-left"
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span className={clsx("t-meta tabular-nums", on ? "accent" : "text-ink-mute")}>
                          {c.num}
                        </span>
                        <span
                          aria-hidden="true"
                          className={clsx(
                            "grid size-9 shrink-0 place-items-center rounded-full border text-[15px] transition-all duration-std ease-uniix",
                            on ? "rotate-45 border-ink bg-ink text-white" : "border-line text-ink-mute",
                          )}
                        >
                          +
                        </span>
                      </span>
                      <span className="mt-5 block font-display font-medium text-[clamp(26px,2.2vw,34px)] leading-none tracking-[-0.035em]">
                        {c.title}
                      </span>
                    </button>
                  </h3>

                  <div id={panelId} aria-hidden={!on} className={styles.capBody}>
                    <div className="min-h-0">
                      <p className="mt-6 max-w-[34ch] text-[15px] leading-[1.55] text-ink-2">{c.line}</p>
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {c.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-[13px] text-ink-2"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {i < finlandCapabilities.length - 1 && (
                    <span aria-hidden="true" className={styles.capArrow}>→</span>
                  )}

                  {/* Oversized numeral — a quiet texture that only shows on the open column. */}
                  <span aria-hidden="true" className={styles.capNumeral}>
                    {c.num}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
