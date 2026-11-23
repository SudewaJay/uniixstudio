"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { animate } from "framer-motion";
import type { WhyPoint } from "@/lib/cms/content";

/**
 * Why Uniix — "Same brief. Different studio."
 *
 * A before/after slider over the studio's differentiators. Left of the handle
 * is how projects usually go (struck through); right of it is how they go
 * here. The comparison is the argument, so the interaction carries the
 * message instead of decorating it.
 *
 * - Pointer: drag anywhere on the board (vertical page scroll still works:
 *   touch-action is pan-y).
 * - Keyboard: the handle is a native range input.
 * - Screen readers: every row is announced in full as "Usually: … Uniix: …";
 *   the clipping is visual only.
 * - On first view the handle sweeps once to show it moves (skipped under
 *   reduced motion).
 */
export default function Approach({ points }: { points: WhyPoint[] }) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const touched = useRef(false);

  // One-time demo sweep on first view.
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPos(88);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const c = animate(88, 34, {
          duration: 1.6,
          ease: [0.65, 0, 0.35, 1],
          delay: 0.25,
          onUpdate: (v) => !touched.current && setPos(v),
        });
        return () => c.stop();
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fromPointer = (clientX: number) => {
    const r = boardRef.current?.getBoundingClientRect();
    if (!r) return;
    touched.current = true;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <section id="about" aria-labelledby="approach-title" className="relative overflow-hidden bg-bg py-24 md:py-32">
      <div className="wrap-wide">
        <h2
          id="approach-title"
          className="font-display font-medium leading-[0.9] tracking-[-0.05em] text-ink text-[clamp(44px,7vw,120px)]"
        >
          Why Uniix
        </h2>

        {/* ------------------------------------------------------- Board */}
        <div
          ref={boardRef}
          className={clsx("approach-board relative mt-12 select-none md:mt-16", dragging ? "cursor-grabbing" : "cursor-grab")}
          style={{ touchAction: "pan-y", ["--pos" as string]: `${pos}%` }}
          onPointerDown={(e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            setDragging(true);
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            fromPointer(e.clientX);
          }}
          onPointerMove={(e) => dragging && fromPointer(e.clientX)}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
        >
          {/* Column labels */}
          <div aria-hidden="true" className="mb-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="text-ink-mute">Typical agency</span>
            <span className="text-brand-ink">Uniix</span>
          </div>

          <ol className="border-t border-ink/15">
            {points.map((p) => (
              <li key={p.num} className="approach-row grid border-b border-ink/15">
                {/* The usual */}
                <div className="col-start-1 row-start-1 grid grid-cols-[44px_minmax(0,1fr)] items-center gap-x-4 py-6 md:grid-cols-[88px_minmax(0,1fr)] md:py-8">
                  <span className="font-mono text-[12px] tabular-nums text-ink-mute">{p.num}</span>
                  <p className="font-display font-medium leading-[1.02] tracking-[-0.035em] text-ink/40 text-[clamp(24px,3.6vw,56px)]">
                    <span className="sr-only">Typical agency: </span>
                    <span className="approach-strike">{p.instead ?? "—"}</span>
                  </p>
                </div>

                {/* Uniix — revealed right of the handle */}
                <div
                  className="approach-uniix on-dark col-start-1 row-start-1 grid grid-cols-[44px_minmax(0,1fr)] items-center gap-x-4 bg-bg-ink py-6 text-white md:grid-cols-[88px_minmax(0,1fr)] md:py-8"
                  style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
                >
                  <span className="pl-0 font-mono text-[12px] tabular-nums text-brand-2">{p.num}</span>
                  <div className="pr-4">
                    <p className="font-display font-medium leading-[1.02] tracking-[-0.035em] text-[clamp(24px,3.6vw,56px)]">
                      <span className="sr-only">Uniix: </span>
                      {p.title}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {/* Handle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 top-8 z-10 w-px -translate-x-1/2 bg-brand-3"
            style={{ left: `${pos}%` }}
          >
            <span
              className={clsx(
                "approach-knob absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-3 text-[18px] text-ink shadow-[0_10px_30px_-8px_rgba(232,98,26,.7)] transition-transform duration-micro md:size-16",
                dragging && "scale-110",
              )}
            >
              ⇆
            </span>
          </div>

          {/* Keyboard control — the same value, as a native slider. */}
          <label className="sr-only" htmlFor="approach-range">
            Compare the usual way with the Uniix way
          </label>
          <input
            id="approach-range"
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(pos)}
            onChange={(e) => {
              touched.current = true;
              setPos(Number(e.target.value));
            }}
            className="approach-range absolute inset-x-0 bottom-0 h-full w-full cursor-[inherit] opacity-0"
            style={{ pointerEvents: "none" }}
          />
        </div>

      </div>
    </section>
  );
}
