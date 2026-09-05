import Link from "next/link";
import HeroShowreel, { type ReelFilm } from "./HeroShowreel";

/** Verified figures — the numbers already published on the site. */
const STATS = [
  { value: "50+", label: "Projects shipped" },
  { value: "30+", label: "Clients served" },
  { value: "92%", label: "Client retention" },
];

/**
 * Hero — full-bleed cinematic.
 *
 * The background is real client work (see HeroShowreel), so the studio's
 * quality is demonstrated in the first viewport rather than asserted. This
 * component itself is a server component: the headline, CTAs and stats are in
 * the initial HTML with no JS required to render or read them. Only the
 * background layer is client-side, and it is gated behind idle + in-view.
 *
 * Copy note: the H1 stays "We build brands people remember." The primary
 * keyword ("creative digital agency") is carried by the eyebrow, the lead
 * paragraph and the unchanged <title>, so the SEO position is preserved while
 * the headline earns the space.
 */
export default function Hero({ films }: { films: ReelFilm[] }) {
  const featured = films[0];

  return (
    <section data-nav-invert className="on-dark relative isolate flex min-h-[max(620px,100svh)] flex-col justify-end overflow-hidden bg-bg-ink text-white">
      <HeroShowreel films={films} />

      <div className="wrap relative z-10 pb-[72px] pt-[168px] md:pb-[88px] md:pt-[184px]">
        <div>
          <div
            className="rise-in flex flex-wrap items-center gap-x-5 gap-y-2"
            style={{ animationDelay: "40ms" }}
          >
            <span className="eyebrow">Creative Digital Agency</span>
            <span className="inline-flex items-center gap-2 t-meta text-white/70">
              <span className="status-dot" />
              2 slots open for Q3 2026
            </span>
          </div>

          <h1 className="t-display mt-7 max-w-[15ch] text-white">
            <span className="mask-line">
              <span style={{ animationDelay: "80ms" }}>We build brands</span>
            </span>
            <span className="mask-line">
              <span
                className="t-italic accent-grad-text"
                style={{ animationDelay: "170ms" }}
              >
                people remember.
              </span>
            </span>
          </h1>
        </div>

        <p
          className="rise-in t-lead mt-7 max-w-[54ch] text-white/80"
          style={{ animationDelay: "300ms" }}
        >
          Uniix Studio is a creative digital agency in Colombo. We design brand
          identities, build conversion-focused websites, and run the growth systems
          that keep them earning — for ambitious companies in Sri Lanka and beyond.
        </p>

        <div
          className="rise-in mt-9 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap"
          style={{ animationDelay: "380ms" }}
        >
          <Link href="/contact/" className="btn btn-light group">
            Start a project <span className="cta-arrow">↗</span>
          </Link>
          <Link href="/portfolio/" className="btn btn-outline-light">
            View our work
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-8 border-t border-line-dark pt-7 md:mt-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          {/* Stats — typographic, on a rule. No cards, no decoration. */}
          <dl
            className="rise-in grid w-full max-w-[520px] grid-cols-3 gap-3 sm:gap-8"
            style={{ animationDelay: "460ms" }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="t-numeral block text-[clamp(34px,4.4vw,52px)] text-white">
                    {s.value}
                  </span>
                  <span
                    aria-hidden="true"
                    className="t-meta mt-3 block text-[9px] leading-[1.5] tracking-[0.1em] text-white/65 sm:text-[10px] sm:tracking-[0.18em]"
                  >
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          {/*
            Credits the film actually on screen and links to the full reel. The
            background is proof of work, so it is labelled rather than left as
            anonymous decoration.
          */}
          {featured && (
            <Link
              href="/showreel/"
              className="rise-in group flex items-center gap-3 self-start text-left lg:self-auto"
              style={{ animationDelay: "540ms" }}
            >
              <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-line-dark transition-colors duration-micro ease-uniix group-hover:border-brand-2">
                <span className="ml-0.5 block size-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white transition-colors duration-micro ease-uniix group-hover:border-l-brand-2" />
              </span>
              <span className="min-w-0">
                <span className="t-meta block text-[9px] text-white/55">
                  Now playing · {featured.client}
                </span>
                <span className="mt-1 block text-[14px] font-medium text-white/90 transition-colors duration-micro ease-uniix group-hover:text-brand-2">
                  {featured.title}
                  <span className="cta-arrow ml-1.5 inline-block">↗</span>
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
