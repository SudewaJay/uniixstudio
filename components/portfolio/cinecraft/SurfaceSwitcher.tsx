"use client";

import { useState } from "react";
import clsx from "clsx";
import SmartImage from "@/components/ui/SmartImage";
import { asset, ratio, surfaces } from "./data";

/** WCAG relative luminance of a #RRGGBB colour. */
function luminance(hex: string) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = c.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Pick a surface and a lock-up; the matching supplied artwork is swapped in
 * (white on dark grounds, black on light) and the contrast ratio is computed
 * live against the logo fill.
 */
export default function SurfaceSwitcher() {
  const [surfaceId, setSurfaceId] = useState<(typeof surfaces)[number]["id"]>("black");
  const [lockup, setLockup] = useState<"full" | "mono">("full");
  const surface = surfaces.find((s) => s.id === surfaceId) ?? surfaces[0];
  const fill = surface.dark ? "#FFFFFF" : "#000000";
  const src =
    lockup === "full"
      ? surface.dark
        ? asset.fullWhite
        : asset.fullBlack
      : surface.dark
        ? asset.monoWhite
        : asset.monoBlack;
  const file = {
    [asset.fullWhite]: "Vector.svg · white full logo",
    [asset.fullBlack]: "Vector-1.svg · black full logo",
    [asset.monoWhite]: "Vector-2.svg · white monogram",
    [asset.monoBlack]: "Vector-3.svg · black monogram",
  }[src];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Background surface" className="flex flex-wrap gap-2">
          {surfaces.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === surfaceId}
              onClick={() => setSurfaceId(s.id)}
              className={clsx(
                "inline-flex min-h-[44px] items-center gap-2.5 rounded-full border pl-2 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-micro",
                s.id === surfaceId ? "border-ink text-ink" : "border-line text-ink-2 hover:border-ink",
              )}
            >
              <span aria-hidden="true" className="h-7 w-7 rounded-full ring-1 ring-ink/15" style={{ background: s.bg }} />
              {s.label}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Lock-up" className="inline-flex rounded-full border border-line p-1 self-start">
          {(
            [
              ["full", "Full logo"],
              ["mono", "Monogram"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={lockup === id}
              onClick={() => setLockup(id)}
              className={clsx(
                "min-h-[40px] rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-micro",
                lockup === id ? "bg-ink text-white" : "text-ink-2 hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="relative mt-6 grid place-items-center overflow-hidden rounded-[28px] ring-1 ring-line aspect-[4/3] sm:aspect-[16/8] transition-colors duration-std"
        style={{ background: surface.bg }}
      >
        <div className="relative w-[64%] sm:w-[44%]" style={{ aspectRatio: lockup === "full" ? ratio.full : ratio.mono }}>
          <SmartImage
            key={src}
            src={src}
            alt={`Cinecraft Media ${lockup === "full" ? "full logo" : "monogram"} on a ${surface.label.toLowerCase()} background`}
            sizes="(min-width:640px) 40vw, 60vw"
            fit="contain"
          />
        </div>
      </div>

      <dl
        aria-live="polite"
        className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute sm:flex sm:flex-wrap sm:gap-x-10"
      >
        <div>
          <dt className="sr-only">Surface</dt>
          <dd>
            {surface.label} <span className="text-ink">{surface.bg}</span>
          </dd>
        </div>
        <div>
          <dt className="sr-only">Contrast ratio</dt>
          <dd>
            Contrast <span className="text-ink">{contrast(fill, surface.bg).toFixed(1)}:1</span>
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="sr-only">Artwork used</dt>
          <dd>
            Artwork <span className="text-ink normal-case tracking-normal">{file}</span>
          </dd>
        </div>
      </dl>
    </div>
  );
}
