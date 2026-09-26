import Reveal from "../Reveal";
import { finlandWhy } from "@/lib/finland";
import styles from "./finland.module.css";

/**
 * 10 — Why Uniix. Five factual differentiators as an editorial index: sticky
 * heading on the left, hairline rows on the right. No superlatives.
 */
export default function FinlandWhy() {
  return (
    <section id="why" aria-labelledby="fi-why-heading" className="section bg-bg">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div>
          <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)]">
            <Reveal>
              <span className="eyebrow">Why Uniix</span>
              <h2 id="fi-why-heading" className="t-h2 mt-5">
                Design meets
                <br />
                <span className="t-italic accent-grad-text">engineering.</span>
              </h2>
              <p className="t-lead mt-6 max-w-[38ch] text-ink-2">
                What working with one distributed team actually changes.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="border-t border-line">
          {finlandWhy.map((w) => (
            <li key={w.num} className={styles.whyRow}>
              <Reveal>
                <div className="grid gap-3 py-8 md:grid-cols-[64px_minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8 md:py-10">
                  <span className="t-meta accent tabular-nums">{w.num}</span>
                  <h3 className="t-h3">{w.title}</h3>
                  <p className="t-body text-ink-2 md:pt-1.5">{w.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
