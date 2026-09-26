import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import { finlandEngagements } from "@/lib/finland";
import styles from "./finland.module.css";

/**
 * 11 — Engagement models. Three ways to start; no prices. Every card ends in
 * the same scoping conversation.
 */
export default function FinlandEngagement() {
  return (
    <section id="engagement" aria-labelledby="fi-eng-heading" className="section bg-bg-warm border-t border-line-soft">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,36%)] lg:items-end lg:gap-16">
          <Reveal>
            <span className="eyebrow">Engagement models</span>
            <h2 id="fi-eng-heading" className="t-h2 mt-5">
              Three ways
              <br />
              <span className="t-italic accent-grad-text">to start.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead max-w-[40ch] text-ink-2">
              Every engagement is scoped to the project. Tell us where you are,
              and we&apos;ll propose the right shape.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3">
          {finlandEngagements.map((e, i) => (
            <li key={e.num}>
              <Reveal delay={i as 0 | 1 | 2} className="h-full">
                <article className={clsx(styles.engCard, "flex h-full flex-col rounded-xl2 border border-line bg-bg-paper p-7 md:p-9")}>
                  <div className="flex items-center justify-between">
                    <span className="t-meta accent tabular-nums">{e.num}</span>
                    <span aria-hidden="true" className={styles.engMark} />
                  </div>
                  <h3 className="t-h3 mt-10">{e.title}</h3>
                  <p className="t-body mt-3 text-ink-2">{e.forWho}</p>

                  <p className="t-meta mt-8 text-[10px] text-ink-mute">Includes</p>
                  <ul className="mt-3 border-t border-line">
                    {e.includes.map((inc) => (
                      <li key={inc} className="flex items-center gap-3 border-b border-line py-3 text-[14.5px] text-ink-2">
                        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" className="shrink-0 text-brand-ink">
                          <path d="M2 6.5 5 9l5-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-9">
                    <Link
                      href="/contact/"
                      className="btn btn-secondary w-full group"
                      aria-label={`Let's scope your project — ${e.title}`}
                    >
                      Let&apos;s scope your project <span className="cta-arrow">↗</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
