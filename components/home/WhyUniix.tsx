import { whyPoints } from "@/lib/content";
import Reveal from "../Reveal";

/**
 * Section 07 — Why Uniix.
 *
 * Typography-led: the differentiators are the visual, set large enough to be
 * read at a glance, with the supporting sentence held back at body size. The
 * previous version buried five <h4> items (skipping h3) beside a stat card
 * that repeated the "3×" figure already shown in the hero.
 */
export default function WhyUniix() {
  return (
    <section id="about" className="section bg-bg">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,40%)] lg:gap-20 lg:items-end">
          <Reveal>
            <span className="eyebrow">Why Uniix</span>
            <h2 className="t-h2 mt-5">
              A studio built
              <br />
              <span className="t-italic accent-grad-text">for serious work.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead text-ink-2">
              A small, senior team in Colombo working with clients across South Asia,
              Australia and the UK. No middlemen. No fluff. Just design and engineering
              that compounds.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 md:mt-20 border-t border-line">
          {whyPoints.map((p, i) => (
            <li key={p.num} className="border-b border-line">
              <Reveal delay={(i % 3) as 0 | 1 | 2}>
                <div className="grid gap-x-8 gap-y-4 py-9 md:py-11 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,42%)] md:items-baseline">
                  <span className="t-meta tabular-nums accent md:pt-2">{p.num}</span>
                  <h3 className="font-display font-medium text-[clamp(24px,3.2vw,40px)] leading-[1.08] tracking-[-0.028em] text-balance">
                    {p.title}
                  </h3>
                  <p className="t-body text-ink-2 max-w-[46ch]">{p.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
