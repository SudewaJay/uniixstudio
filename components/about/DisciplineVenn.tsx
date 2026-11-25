"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

export type VennItem = { slug: string; label: string; tagline: string; capabilities: string[] };

/**
 * Design, Technology and Growth as three overlapping circles with the studio
 * where they meet. Choosing a circle (pointer, focus or tap) brings it
 * forward and lists what sits inside it. The circles are real buttons, so the
 * diagram works from the keyboard.
 */
const W = 480;
const H = 500;
const R = 125;
const POS = [
  { cx: 240, cy: 170 },
  { cx: 345, cy: 350 },
  { cx: 135, cy: 350 },
];

export default function DisciplineVenn({ items }: { items: VennItem[] }) {
  const [active, setActive] = useState(0);
  const cur = items[active];

  return (
    <section id="disciplines" aria-labelledby="disciplines-title" className="bg-bg py-24 md:py-36">
      <div className="wrap-wide grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="relative mx-auto w-full max-w-[560px]">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-labelledby="venn-desc">
            <desc id="venn-desc">Three overlapping circles: {items.map((i) => i.label).join(", ")}. Uniix sits where all three meet.</desc>
            {items.map((it, i) => (
              <circle
                key={it.slug}
                cx={POS[i].cx}
                cy={POS[i].cy}
                r={R}
                className={clsx(
                  "venn-ring transition-[fill,stroke] duration-std",
                  i === active ? "fill-brand-3/25 stroke-brand-ink" : "fill-transparent stroke-ink/25",
                )}
                strokeWidth={1.5}
              />
            ))}
            {items.map((it, i) => {
              const p = POS[i];
              const ly = i === 0 ? p.cy - 62 : p.cy + 74;
              const lx = i === 0 ? p.cx : i === 1 ? p.cx + 40 : p.cx - 40;
              return (
                <text
                  key={it.slug}
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  className={clsx("font-display text-[24px] font-medium tracking-[-0.03em] transition-[fill] duration-std", i === active ? "fill-brand-ink" : "fill-ink")}
                >
                  {it.label}
                </text>
              );
            })}
            <circle cx={240} cy={290} r={5} className="fill-brand-3" />
            <text x={240} y={318} textAnchor="middle" className="fill-ink font-mono text-[11px] uppercase tracking-[0.2em]">
              Uniix
            </text>
          </svg>

          {/* Hit targets: real buttons over the circles */}
          <div role="group" aria-label="Choose a discipline">
            {items.map((it, i) => (
              <button
                key={it.slug}
                type="button"
                aria-pressed={i === active}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="absolute rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-ink"
                style={{
                  left: `${((POS[i].cx - 90) / W) * 100}%`,
                  top: `${((POS[i].cy - (i === 0 ? 115 : 25)) / H) * 100}%`,
                  width: `${(180 / W) * 100}%`,
                  height: `${(140 / H) * 100}%`,
                }}
              >
                <span className="sr-only">{it.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2
            id="disciplines-title"
            className="font-display font-medium leading-[0.9] tracking-[-0.05em] text-ink text-[clamp(44px,6vw,100px)]"
          >
            Three disciplines, one team
          </h2>
          <div className="mt-12 border-t border-ink/15 pt-8" aria-live="polite">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-ink">{cur.label}</p>
            <p className="mt-3 font-display text-[clamp(24px,2.4vw,36px)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              {cur.tagline}
            </p>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {cur.capabilities.map((c) => (
                <li key={c} className="border-b border-ink/10 py-3 text-[15.5px] text-ink-2">
                  {c}
                </li>
              ))}
            </ul>
            <Link href={`/services/${cur.slug}/`} className="link-cta mt-8 inline-flex text-[15px]">
              {cur.label} services <span className="cta-arrow">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
