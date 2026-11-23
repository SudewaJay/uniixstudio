"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * The studio — what we work with, who we work for, where we are.
 *
 * Capabilities are shown as the actual tools in daily use, in three crafts,
 * as two counter-running marquees. Edit TOOLKIT to keep this honest.
 */
const TOOLKIT: Array<{ craft: string; tools: string[] }> = [
  { craft: "Design", tools: ["Figma", "Illustrator", "Photoshop", "After Effects", "Premiere Pro"] },
  { craft: "Build", tools: ["Next.js", "React", "TypeScript", "WordPress", "WooCommerce", "Shopify", "Payload CMS", "Vercel"] },
  { craft: "Grow", tools: ["Google Analytics 4", "Search Console", "Google Ads", "Meta Ads"] },
];

function useColombo() {
  const [now, setNow] = useState<{ time: string } | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Colombo" });
    const tick = () => {
      setNow({ time: fmt.format(new Date()) });
    };
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Studio({ industries }: { industries: Array<{ slug: string; name: string }> }) {
  const now = useColombo();
  const rowA = TOOLKIT.flatMap((c) => c.tools.map((t) => ({ t, c: c.craft })));
  const rowB = [...rowA].reverse();

  return (
    <section id="studio" aria-labelledby="studio-title" className="on-dark relative overflow-hidden bg-bg-ink py-24 text-white md:py-32">
      <div className="wrap-wide">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,36%)] lg:items-end">
          <h2
            id="studio-title"
            className="font-display font-medium leading-[0.9] tracking-[-0.05em] text-[clamp(44px,7vw,120px)]"
          >
            Made in Colombo
          </h2>

          <div className="lg:pb-3">
            <p className="t-body max-w-[42ch] text-white/70">
              Working with clients in Sri Lanka, Australia and the UK.
            </p>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.16em] text-white/55">
              <span suppressHydrationWarning>{now ? `${now.time} in Colombo` : "Colombo, Sri Lanka"}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Toolkit — two counter-running rows. Hover/focus pauses. */}
      <div className="studio-marquee mt-16 md:mt-24" aria-label="Tools we work with">
        <ul className="sr-only">
          {TOOLKIT.map((c) => (
            <li key={c.craft}>
              {c.craft}: {c.tools.join(", ")}
            </li>
          ))}
        </ul>
        {[rowA, rowB].map((row, r) => (
          <div key={r} aria-hidden="true" className="overflow-hidden border-y border-white/10 py-4 md:py-6 [&+&]:border-t-0">
            <div className={`studio-row flex w-max ${r === 1 ? "is-rev" : ""}`}>
              {[...row, ...row].map((x, i) => (
                <span key={i} className="flex shrink-0 items-baseline gap-4 pr-12 md:pr-16">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-2">{x.c}</span>
                  <span className="studio-tool font-display font-medium tracking-[-0.04em] text-[clamp(34px,5vw,76px)] leading-none">
                    {x.t}
                  </span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sectors */}
      {industries.length > 0 && (
        <div className="wrap-wide mt-16 md:mt-20">
          <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)]">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 md:pt-3">Industries</p>
            <ul className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Link
                    href={`/industries/${ind.slug}/`}
                    className="inline-flex min-h-[44px] items-center border border-white/15 px-4 text-[14px] text-white/80 transition-colors duration-micro hover:border-brand-2 hover:bg-brand-2 hover:text-ink"
                  >
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
