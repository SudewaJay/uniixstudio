"use client";

import { useState } from "react";
import clsx from "clsx";
import { PhoneFrame } from "./Frames";
import { SL, type Town } from "./data";

const kindLabel = { hq: "Headquarters", "walk-in": "Walk-in + home visits", "home-visit": "Home visits only" } as const;

/**
 * Schematic map of the ten towns along the Negombo Road corridor (not to
 * scale). Picking a town shows what its landing page leads with.
 */
export default function TownExplorer({
  towns,
  anatomy,
  phones,
}: {
  towns: Town[];
  anatomy: string[];
  /** Mobile screenshots for towns we captured, keyed by slug. */
  phones: Record<string, string>;
}) {
  const [slug, setSlug] = useState("katunayake");
  const town = towns.find((t) => t.slug === slug)!;
  const road = [...towns].sort((a, b) => a.y - b.y);
  const phone = phones[slug];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
      {/* Map */}
      <div>
        <div
          role="radiogroup"
          aria-label="Town landing pages"
          className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[24px] border border-white/10"
          style={{ background: "linear-gradient(90deg, #12324F 0%, #12324F 14%, #16263D 14.2%, #111C2E 100%)" }}
        >
          <span aria-hidden="true" className="absolute left-[3%] top-1/2 -translate-y-1/2 -rotate-90 font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">
            Indian Ocean
          </span>
          {/* Grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)", backgroundSize: "10% 8%" }}
          />
          {/* Corridor line */}
          <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <polyline
              points={road.map((t) => `${t.x},${t.y}`).join(" ")}
              fill="none"
              stroke="rgba(255,255,255,.18)"
              strokeWidth="0.6"
              strokeDasharray="1.4 1.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* Home-visit radius from HQ */}
          <span
            aria-hidden="true"
            className="absolute aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
            style={{ left: "48%", top: "57%", borderColor: "rgba(88,179,48,.35)", background: "radial-gradient(circle, rgba(88,179,48,.14), transparent 70%)" }}
          />

          {towns.map((t) => {
            const on = t.slug === slug;
            const hq = t.kind === "hq";
            return (
              <button
                key={t.slug}
                type="button"
                role="radio"
                aria-checked={on}
                aria-label={`${t.name}, ${kindLabel[t.kind]}`}
                onClick={() => setSlug(t.slug)}
                className="group absolute flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
              >
                <span
                  className={clsx(
                    "block rounded-full transition-all duration-std ease-uniix",
                    hq ? "h-4 w-4" : "h-3 w-3",
                    t.kind === "home-visit" && "border-2 bg-transparent",
                    on && "scale-[1.35]",
                  )}
                  style={
                    t.kind === "home-visit"
                      ? { borderColor: on ? "#fff" : SL.green }
                      : { background: on ? "#fff" : SL.green, boxShadow: hq ? `0 0 0 5px rgba(88,179,48,.3)` : undefined }
                  }
                />
                {on && (
                  <span aria-hidden="true" className="absolute h-9 w-9 rounded-full ring-1 ring-white/50 animate-ping motion-reduce:animate-none" />
                )}
                <span
                  className={clsx(
                    "pointer-events-none absolute left-[calc(50%+14px)] whitespace-nowrap font-mono text-[10px] tracking-[0.12em] uppercase transition-colors duration-micro",
                    on ? "text-white" : "text-white/55 group-hover:text-white",
                  )}
                >
                  {t.name}
                </span>
              </button>
            );
          })}

          <p aria-hidden="true" className="absolute right-4 top-3 font-mono text-[9px] tracking-[0.2em] uppercase text-white/30">
            Schematic · not to scale
          </p>
        </div>

        <ul className="mx-auto mt-5 flex max-w-[520px] flex-wrap gap-x-5 gap-y-2 text-[12px] text-white/60">
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-3 w-3 rounded-full" style={{ background: SL.green, boxShadow: "0 0 0 3px rgba(88,179,48,.3)" }} /> Ja-Ela HQ
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: SL.green }} /> 6 more walk-in towns
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border-2" style={{ borderColor: SL.green }} /> 3 home-visit areas
          </li>
        </ul>
      </div>

      {/* Selected town */}
      <div aria-live="polite" className="flex flex-col">
        <div key={slug} className="rise-in grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "#A6E08A" }}>
              {kindLabel[town.kind]}
            </p>
            <h3 className="mt-3 font-display text-[clamp(30px,3.4vw,46px)] font-medium leading-[1.02] tracking-[-0.02em] text-white">
              {town.name}
            </h3>
            <p className="mt-4 max-w-[42ch] text-[16px] leading-[1.6] text-white/75">“{town.line}”</p>
            <a
              href={`https://www.stlukesmedilab.com/locations/${town.slug}`}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-mono text-[12px] text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              stlukesmedilab.com/locations/{town.slug} <span aria-hidden="true">↗</span>
            </a>
          </div>
          {phone && (
            <PhoneFrame src={phone} alt={`${town.name} landing page on mobile`} className="mx-auto w-[180px] sm:w-[170px]" sizes="180px" />
          )}
        </div>

        <div className="mt-8 border-t border-white/15 pt-6">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">Every town page carries</p>
          <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {anatomy.map((a) => (
              <li key={a} className="flex gap-3 text-[14px] leading-[1.45] text-white/80">
                <span aria-hidden="true" style={{ color: SL.green }}>✓</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
