import Link from "next/link";
import clsx from "clsx";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/Reveal";

export type ProofItem = {
  slug: string;
  title: string;
  cover: string;
  coverAlt?: string;
  did: string[];
  own: boolean;
  year: string;
};

/**
 * Work that proves the services: four real projects in an offset grid, each
 * captioned with the services it used rather than a sales line.
 * Spans alternate wide / narrow so the grid reads as a spread, not a wall.
 */
const LAYOUT = [
  "md:col-span-7",
  "md:col-span-5 md:mt-32",
  "md:col-span-5",
  "md:col-span-7 md:-mt-20",
];
const RATIO = ["aspect-[16/11]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[16/11]"];

export default function ProofGrid({ items }: { items: ProofItem[] }) {
  return (
    <section id="proof" aria-labelledby="proof-title" className="on-dark relative bg-bg-ink py-24 text-white md:py-36">
      <div className="wrap-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="proof-title"
            className="max-w-[14ch] font-display font-medium leading-[0.9] tracking-[-0.05em] text-[clamp(44px,6.6vw,112px)]"
          >
            The work behind it
          </h2>
          <Link href="/portfolio/" className="btn btn-outline-light group">
            All projects <span className="cta-arrow">↗</span>
          </Link>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-16 md:mt-24 md:grid-cols-12 md:gap-y-24">
          {items.map((p, i) => (
            <li key={p.slug} className={LAYOUT[i % LAYOUT.length]}>
              <Reveal>
                <Link href={`/portfolio/${p.slug}/`} className="group block">
                  <span className={clsx("relative block overflow-hidden bg-white/5", RATIO[i % RATIO.length])}>
                    <span className="proof-img absolute inset-0 block">
                      <SmartImage src={p.cover} alt={p.coverAlt ?? `${p.title} project`} sizes="(min-width:768px) 56vw, 100vw" />
                    </span>
                  </span>
                  <span className="mt-5 flex items-baseline justify-between gap-4">
                    <span className="font-display text-[clamp(24px,2.4vw,36px)] font-medium leading-none tracking-[-0.035em] transition-colors duration-micro group-hover:text-brand-2">
                      {p.title}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-white/45">
                      {p.own ? "Our product" : p.year}
                    </span>
                  </span>
                  <span className="mt-3 block text-[14.5px] leading-[1.5] text-white/60">{p.did.join(" · ")}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
