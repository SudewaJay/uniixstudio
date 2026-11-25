"use client";

import { useRef } from "react";
import SmartImage from "@/components/ui/SmartImage";

export type IntroShot = { src: string; alt: string };

/**
 * Portfolio opening: the word "Work" set huge, the archive's real size beside
 * it, and three project covers fanned like prints on a desk. On fine pointers
 * the fan opens toward the cursor.
 */
export default function WorkIntro({
  count,
  from,
  to,
  shots,
}: {
  count: number;
  from: string;
  to: string;
  shots: IntroShot[];
}) {
  const fan = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !fan.current) return;
    const r = fan.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / r.width;
    const y = (e.clientY - (r.top + r.height / 2)) / r.height;
    fan.current.style.setProperty("--fx", x.toFixed(3));
    fan.current.style.setProperty("--fy", y.toFixed(3));
  };

  return (
    <section
      data-nav-invert
      aria-labelledby="work-title"
      className="on-dark relative overflow-hidden bg-bg-ink pb-20 pt-[calc(var(--header-h)+56px)] text-white md:pb-28 md:pt-[calc(var(--header-h)+80px)]"
      onPointerMove={onMove}
    >
      <div className="wrap-wide grid items-end gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-10">
        <div>
          <p className="rise-in font-mono text-[11px] uppercase tracking-[0.2em] text-white/55" style={{ animationDelay: "40ms" }}>
            Portfolio
          </p>
          <h1
            id="work-title"
            className="mt-6 font-display font-medium leading-[0.8] tracking-[-0.07em] text-[clamp(110px,22vw,360px)]"
          >
            <span className="mask-line block">
              <span className="block" style={{ animationDelay: "120ms" }}>
                Work
              </span>
            </span>
          </h1>
          <div className="rise-in mt-10 grid max-w-[560px] grid-cols-2 gap-6 border-t border-white/15 pt-6" style={{ animationDelay: "420ms" }}>
            <p className="font-display text-[clamp(22px,2vw,30px)] font-medium leading-[1.1] tracking-[-0.03em]">
              {count} projects
              <span className="block text-white/50">
                {from}–{to}
              </span>
            </p>
            <p className="text-[15px] leading-[1.55] text-white/65">
              Brands, websites and products for clients in Sri Lanka, Australia and the UK.
            </p>
          </div>
        </div>

        <div ref={fan} aria-hidden="true" className="work-fan relative mx-auto aspect-[5/4] w-full max-w-[640px]">
          {shots.slice(0, 3).map((s, i) => (
            <div key={s.src} className="work-print absolute inset-[10%] overflow-hidden bg-white/5 shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)]" data-i={i}>
              <SmartImage src={s.src} alt="" sizes="(min-width:1024px) 36vw, 80vw" priority={i === 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
