"use client";

import { useState } from "react";
import clsx from "clsx";
import SmartImage from "@/components/ui/SmartImage";

type Zone = {
  n: string;
  title: string;
  body: string;
  box: { x: number; y: number; w: number; h: number };
  /** Where the numbered pin sits, in the same percentages. */
  pin: { x: number; y: number };
};

/**
 * One post, taken apart. Each zone is a button in the list and a numbered pin
 * on the post; hovering or focusing either spotlights that region by dimming
 * everything around it. "Show all" outlines every zone at once.
 */
export default function PostAnatomy({
  src,
  alt,
  zones,
}: {
  src: string;
  alt: string;
  zones: Zone[];
}) {
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const zone = zones[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 items-start">
      {/* Post with overlays */}
      <div className="lg:sticky lg:top-24">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-[22px] bg-black shadow-lift">
          <SmartImage src={src} alt={alt} sizes="(min-width:1024px) 560px, 92vw" />

          {/* Spotlight: a huge shadow around the active box dims the rest of the post */}
          {!showAll && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute rounded-[10px] ring-2 ring-white transition-all duration-[450ms] ease-uniix motion-reduce:transition-none"
              style={{
                left: `${zone.box.x}%`,
                top: `${zone.box.y}%`,
                width: `${zone.box.w}%`,
                height: `${zone.box.h}%`,
                boxShadow: "0 0 0 2000px rgba(10,14,12,.62)",
              }}
            />
          )}

          {showAll &&
            zones.map((z, i) => (
              <div
                key={z.n}
                aria-hidden="true"
                className={clsx(
                  "pointer-events-none absolute rounded-[8px] border border-dashed transition-colors",
                  i === active ? "border-white bg-white/10" : "border-white/60",
                )}
                style={{ left: `${z.box.x}%`, top: `${z.box.y}%`, width: `${z.box.w}%`, height: `${z.box.h}%` }}
              />
            ))}

          {/* Pins */}
          {zones.map((z, i) => (
            <button
              key={z.n}
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={clsx(
                "absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-[10px] font-medium transition-all duration-micro",
                i === active
                  ? "z-10 scale-110 bg-white text-ink shadow-lift"
                  : "bg-ink/80 text-white ring-1 ring-white/60 hover:bg-white hover:text-ink",
              )}
              style={{ left: `${z.pin.x}%`, top: `${z.pin.y}%` }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-4 flex max-w-[560px] items-center justify-between gap-4">
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute">
            Zone {zone.n} / {String(zones.length).padStart(2, "0")}
          </p>
          <button
            type="button"
            aria-pressed={showAll}
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-2 hover:border-brand-ink hover:text-brand-ink transition-colors duration-micro"
          >
            <span
              aria-hidden="true"
              className={clsx("h-2 w-2 rounded-full transition-colors", showAll ? "bg-brand-ink" : "bg-line")}
            />
            Show all zones
          </button>
        </div>

        {/* Small screens: step through zones right under the post, so the spotlight stays in view */}
        <div className="mx-auto mt-5 max-w-[560px] rounded-[20px] border border-line bg-bg p-5 lg:hidden">
          <div aria-live="polite" className="min-h-[132px]">
            <p className="font-display text-[19px] font-medium text-ink">
              <span className="mr-2 font-mono text-[12px] text-brand-ink">{zone.n}</span>
              {zone.title}
            </p>
            <p className="t-body mt-2 text-ink-2">{zone.body}</p>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setActive((i) => (i - 1 + zones.length) % zones.length)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-ink"
              aria-label="Previous zone"
            >
              <span aria-hidden="true">←</span>
            </button>
            <div className="flex gap-1.5" aria-hidden="true">
              {zones.map((z, i) => (
                <span
                  key={z.n}
                  className={clsx("h-1.5 rounded-full transition-all duration-micro", i === active ? "w-5 bg-ink" : "w-1.5 bg-line")}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActive((i) => (i + 1) % zones.length)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-ink"
              aria-label="Next zone"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Zone list */}
      <ol className="hidden border-t border-line lg:block">
        {zones.map((z, i) => {
          const on = i === active;
          return (
            <li key={z.n} className="border-b border-line">
              <button
                type="button"
                aria-expanded={on}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group grid w-full grid-cols-[auto_1fr] gap-x-5 py-5 text-left"
              >
                <span
                  className={clsx(
                    "mt-0.5 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[10px] transition-colors duration-micro",
                    on ? "bg-ink text-white" : "bg-bg-warm text-ink-mute ring-1 ring-line group-hover:text-ink",
                  )}
                >
                  {i + 1}
                </span>
                <span>
                  <span
                    className={clsx(
                      "block font-display text-[19px] md:text-[21px] font-medium transition-colors duration-micro",
                      on ? "text-ink" : "text-ink-2 group-hover:text-ink",
                    )}
                  >
                    {z.title}
                  </span>
                  <span
                    className={clsx(
                      "grid transition-[grid-template-rows,opacity] duration-[400ms] ease-uniix motion-reduce:transition-none",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden">
                      <span className="t-body block pt-2 text-ink-2 max-w-[54ch]">{z.body}</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
