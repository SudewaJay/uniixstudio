import Link from "next/link";
import Reveal from "../Reveal";

/**
 * Section 08 — Results.
 *
 * Every figure here is one already published on the site. The "3×" traffic
 * lift is tied to the case study it comes from rather than floating free, and
 * the four raw counts (previously duplicated between the hero cards and a
 * separate stats bar) now live here only — the hero keeps three, this section
 * carries the outcome figures.
 */
const RESULTS = [
  {
    value: "3×",
    label: "Average traffic lift",
    detail: "Within 90 days of launch, across selected projects.",
  },
  {
    value: "4+",
    label: "Years building",
    detail: "Selected work since 2022 across Sri Lanka, Australia and the UK.",
  },
  {
    value: "8",
    label: "Industries served",
    detail: "From healthcare and education to fintech, travel and SaaS.",
  },
];

export default function Results() {
  return (
    <section className="on-dark relative overflow-hidden bg-bg-ink text-white section">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(46% 56% at 82% 12%, rgba(232,98,26,0.22), transparent 70%), radial-gradient(44% 50% at 6% 94%, rgba(248,200,74,0.12), transparent 70%)",
        }}
      />

      <div className="wrap relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:gap-16 lg:items-end">
          <Reveal>
            <span className="eyebrow">Results</span>
            <h2 className="t-h2 mt-5">
              Creative work,
              <br />
              <span className="t-italic accent-grad-text">measured.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead text-white/70">
              Every project ties creative decisions back to a business outcome — not to
              impressions and likes.
            </p>
          </Reveal>
        </div>

        <dl className="mt-16 md:mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-3 border-t border-line-dark pt-12">
          {RESULTS.map((r, i) => (
            <Reveal key={r.label} delay={(i % 3) as 0 | 1 | 2}>
              <div>
                <dd className="t-numeral accent-grad-text text-[clamp(72px,10vw,148px)]">
                  {r.value}
                </dd>
                <dt className="t-meta mt-7 text-white">{r.label}</dt>
                <p className="t-body mt-3 max-w-[30ch] text-white/60">{r.detail}</p>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal>
          <div className="mt-14">
            <Link href="/portfolio" className="link-cta group">
              See the work behind the numbers <span className="cta-arrow">↗</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
