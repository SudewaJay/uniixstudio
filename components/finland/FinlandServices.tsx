"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import SmartImage from "../ui/SmartImage";
import type { FiProjects } from "./types";
import { finlandServices } from "@/lib/finland";
import styles from "./finland.module.css";

/**
 * 03 — What we do. Six plain-language services.
 *
 * Desktop: a list on the left; hovering, focusing or clicking a row opens its
 * capabilities inline and swaps the sticky preview on the right to the related
 * real project. Mobile: the same rows as an accordion, with the related
 * project shown inside the open row. Nothing depends on hover alone.
 */
export default function FinlandServices({ projects }: { projects: FiProjects }) {
  const [active, setActive] = useState(0);

  return (
    <section id="services" aria-labelledby="fi-services-heading" className="section bg-bg-paper border-y border-line-soft">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:items-end lg:gap-16">
          <Reveal>
            <span className="eyebrow">Services</span>
            <h2 id="fi-services-heading" className="t-h2 mt-5">
              What we <span className="t-italic accent-grad-text">do.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead max-w-[42ch] text-ink-2">
              Web design, development, product and growth — for businesses in
              Helsinki, across Finland and internationally.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <ul className="border-t border-line">
            {finlandServices.map((s, i) => {
              const on = active === i;
              const p = projects[s.project];
              const panel = `fi-svc-${s.num}`;
              return (
                <li
                  key={s.num}
                  className={clsx(styles.svcRow, on && styles.svcOn)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={on}
                      aria-controls={panel}
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className="flex w-full items-baseline gap-5 py-6 text-left md:gap-8"
                    >
                      <span className={clsx("t-meta w-6 shrink-0 tabular-nums", on ? "accent" : "text-ink-mute")}>{s.num}</span>
                      <span className="flex-1 font-display text-[clamp(22px,2.3vw,32px)] font-medium leading-[1.1] tracking-[-0.03em]">
                        {s.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className={clsx(
                          "grid size-8 shrink-0 place-items-center self-center rounded-full border text-[14px] transition-all duration-std ease-uniix",
                          on ? "rotate-45 border-ink bg-ink text-white" : "border-line text-ink-mute",
                        )}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div id={panel} aria-hidden={!on} className={styles.svcBody}>
                    <div className="min-h-0">
                      <div className="pb-7 pl-11 md:pl-14">
                        <p className="max-w-[44ch] text-[15px] leading-[1.55] text-ink-2">{s.desc}</p>
                        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label={`${s.title} capabilities`}>
                          {s.capabilities.map((c) => (
                            <li key={c} className="flex items-center gap-2 text-[14px] text-ink">
                              <span aria-hidden="true" className="text-brand-ink">→</span>
                              {c}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                          <Link href={s.href} tabIndex={on ? undefined : -1} className="link-cta group">
                            About this service <span className="cta-arrow">↗</span>
                          </Link>
                          {p && (
                            <Link
                              href={`/portfolio/${p.slug}/`}
                              tabIndex={on ? undefined : -1}
                              className="group flex items-center gap-3 lg:hidden"
                            >
                              <span className="relative block h-12 w-16 overflow-hidden rounded-[8px] bg-bg-warm">
                                <SmartImage src={p.coverImage} alt="" sizes="64px" quality={55} />
                              </span>
                              <span className="text-[13px] text-ink-mute">
                                Related work · <span className="text-ink">{p.title}</span>
                              </span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Sticky related-work preview (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+40px)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl2 bg-bg-warm shadow-sm2">
                {finlandServices.map((s, i) => {
                  const p = projects[s.project];
                  if (!p) return null;
                  return (
                    <Link
                      key={s.num}
                      href={`/portfolio/${p.slug}/`}
                      tabIndex={-1}
                      aria-hidden={active !== i}
                      className={clsx(styles.svcPreview, active === i && styles.svcPreviewOn)}
                    >
                      <SmartImage src={p.coverImage} alt="" sizes="36vw" quality={70} />
                      <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                      <span className="on-dark absolute inset-x-0 bottom-0 p-6 text-white">
                        <span className="t-meta block text-[10px] text-white/70">Related work</span>
                        <span className="mt-2 block font-display text-[26px] font-medium tracking-[-0.02em]">{p.title}</span>
                        <span className="mt-1 block text-[13px] text-white/75">{p.services}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
