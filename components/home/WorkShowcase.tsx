import Link from "next/link";
import SmartImage from "../ui/SmartImage";
import Reveal from "../Reveal";

export type ShowcaseProject = {
  slug: string;
  title: string;
  overline: string;
  year: string;
  headline: string;
  summary: string;
  coverImage: string;
  tags?: string[];
  client?: string;
  industry?: string;
};

/**
 * Section 04 — Selected work.
 *
 * Centered header over a two-column grid of large rounded covers, each with
 * the project name and its discipline tags as pills. Every card is a real
 * link to its case study; a single column on mobile.
 */
export default function WorkShowcase({ items }: { items: ShowcaseProject[] }) {
  return (
    <section id="work" className="section bg-bg">
      <div className="wrap">
        <Reveal className="mx-auto flex flex-col items-center text-center">
          <span className="rounded-full border border-line px-4 py-1.5 text-[13px] text-ink-2">
            Selected work
          </span>
          <h2 className="t-h2 mt-6">
            Brands we&apos;re <span className="t-italic accent-grad-text whitespace-nowrap">proud of.</span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:mt-20 lg:gap-x-10 lg:gap-y-16">
          {items.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i % 2 === 1 ? 1 : undefined}>
                <Link href={`/portfolio/${p.slug}/`} className="group block">
                  <div className="frame aspect-[3/2] rounded-[24px]">
                    <SmartImage
                      src={p.coverImage}
                      alt={`${p.title} — ${p.headline}`}
                      sizes="(min-width:768px) 46vw, 92vw"
                      priority={i < 2}
                    />
                  </div>
                  <h3 className="mt-6 flex items-center gap-3 text-[clamp(22px,2vw,30px)] font-semibold tracking-[-0.02em] text-ink">
                    {p.title}
                    <span
                      aria-hidden="true"
                      className="cta-arrow opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  </h3>
                  {p.tags && p.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2.5">
                      {p.tags.slice(0, 2).map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-line px-4 py-1.5 text-[14px] text-ink-2"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-16 flex justify-center">
          <Link href="/portfolio" className="btn btn-secondary btn-sm group">
            All projects <span className="cta-arrow">↗</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
