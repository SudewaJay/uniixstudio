"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import SmartImage from "@/components/ui/SmartImage";
import type { Corner, Post, Tone } from "./data";

const corners: Array<{ id: Corner; label: string; pos: string; rule: string }> = [
  { id: "tl", label: "Top left", pos: "left-[7%] top-[6%]", rule: "Headline or product sits right" },
  { id: "tc", label: "Top centre", pos: "left-1/2 -translate-x-1/2 top-[6%]", rule: "Co-branded offers only" },
  { id: "tr", label: "Top right", pos: "right-[7%] top-[6%]", rule: "Headline runs left" },
];

/**
 * Where the logo lives across the whole feed. Pick a corner (and optionally a
 * mark colour) and the posts that use it fan out on the right.
 */
export default function LogoMap({
  posts,
  tones,
}: {
  posts: Post[];
  tones: Record<Tone, { label: string; swatch: string; body: string }>;
}) {
  const [corner, setCorner] = useState<Corner>("tr");
  const [tone, setTone] = useState<Tone | "all">("all");

  const counts = useMemo(() => {
    const c: Record<Corner, number> = { tl: 0, tc: 0, tr: 0 };
    posts.forEach((p) => (c[p.logo] += 1));
    return c;
  }, [posts]);

  const shown = posts.filter((p) => p.logo === corner && (tone === "all" || p.tone === tone));
  const active = corners.find((c) => c.id === corner)!;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16 items-start">
      <div>
        {/* The frame */}
        <div
          role="radiogroup"
          aria-label="Logo position"
          className="relative mx-auto aspect-[4/5] w-full max-w-[380px] rounded-[20px] border border-white/20 bg-white/[0.04]"
        >
          {/* Safe-area guides */}
          <div aria-hidden="true" className="absolute inset-[4%] rounded-[12px] border border-dashed border-white/15" />
          <div aria-hidden="true" className="absolute inset-x-[4%] top-[22%] border-t border-dashed border-white/10" />
          <div aria-hidden="true" className="absolute inset-x-[4%] bottom-[14%] border-t border-dashed border-white/10" />
          <span aria-hidden="true" className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
            Product zone
          </span>
          <span aria-hidden="true" className="absolute left-1/2 bottom-[5%] -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 whitespace-nowrap">
            Seal · trust row · sign-off
          </span>

          {corners.map((c) => {
            const on = c.id === corner;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={on}
                aria-label={`${c.label}: ${counts[c.id]} posts`}
                onClick={() => setCorner(c.id)}
                className={clsx(
                  "absolute flex h-[17%] w-[24%] flex-col items-center justify-center rounded-[12px] border transition-all duration-std ease-uniix",
                  c.pos,
                  on
                    ? "border-[#A9D18E] bg-[#A9D18E]/15 text-white"
                    : "border-white/20 text-white/60 hover:border-white/50 hover:text-white",
                )}
              >
                <span className="font-display text-[clamp(22px,3vw,34px)] font-semibold leading-none">{counts[c.id]}</span>
                <span className="mt-1 font-mono text-[9px] tracking-[0.16em] uppercase">{c.id.toUpperCase()}</span>
                {on && (
                  <span aria-hidden="true" className="absolute -inset-1 rounded-[14px] ring-1 ring-[#A9D18E]/40 animate-pulse motion-reduce:animate-none" />
                )}
              </button>
            );
          })}
        </div>

        <p className="mx-auto mt-5 max-w-[380px] text-center text-[14px] text-white/60">
          <span className="text-white">{active.label}.</span> {active.rule}.
        </p>

        {/* Mark colour filter */}
        <div className="mx-auto mt-8 max-w-[380px]">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">Mark colour</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by logo colour">
            {(["all", "light", "dark", "tint"] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tone === t}
                onClick={() => setTone(t)}
                className={clsx(
                  "inline-flex min-h-[40px] items-center gap-2 rounded-full border px-3.5 text-[13px] transition-colors duration-micro",
                  tone === t ? "border-white bg-white text-ink" : "border-white/20 text-white/70 hover:border-white/50",
                )}
              >
                {t !== "all" && (
                  <span
                    aria-hidden="true"
                    className="h-3 w-3 rounded-full ring-1 ring-white/40"
                    style={{ background: tones[t].swatch }}
                  />
                )}
                {t === "all" ? "Any" : tones[t].label}
              </button>
            ))}
          </div>
          {tone !== "all" && <p className="mt-3 text-[13px] leading-[1.55] text-white/60">{tones[tone].body}</p>}
        </div>
      </div>

      {/* Matching posts */}
      <div aria-live="polite">
        <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/50">
          {shown.length} {shown.length === 1 ? "post" : "posts"} · logo {active.label.toLowerCase()}
        </p>
        {shown.length > 0 ? (
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
            {shown.map((p, i) => (
              <li
                key={`${corner}-${tone}-${p.id}`}
                className="rise-in"
                style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}
              >
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-white/5">
                    <SmartImage src={p.src} alt={p.alt} sizes="(min-width:1024px) 20vw, 45vw" />
                    {/* Logo marker on the thumbnail */}
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "absolute top-[2%] h-[15%] rounded-[8px] ring-2 ring-[#A9D18E]",
                        p.logo === "tl" && "left-[2%] w-[17%]",
                        p.logo === "tr" && "right-[2%] w-[17%]",
                        p.logo === "tc" && "left-1/2 -translate-x-1/2 w-[50%]",
                      )}
                    />
                  </div>
                  <figcaption className="mt-2 text-[12px] leading-[1.4] text-white/60">{p.product}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 rounded-[14px] border border-dashed border-white/20 p-8 text-[14px] text-white/60">
            No posts pair this corner with this mark colour. Try another combination.
          </p>
        )}
      </div>
    </div>
  );
}
