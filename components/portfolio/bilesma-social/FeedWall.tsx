"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import SmartImage from "@/components/ui/SmartImage";
import type { Format, Post } from "./data";

type FormatInfo = { id: Format; label: string; ghost: string; formula: string };

const cornerLabel = { tl: "top left", tr: "top right", tc: "top centre" } as const;

/**
 * The feed, filterable by post format. Each format shows its formula and ghost
 * word; any post opens in a lightbox (native <dialog>, arrow keys to step) with
 * a checklist of the brand constants it carries.
 */
export default function FeedWall({ posts, formats }: { posts: Post[]; formats: FormatInfo[] }) {
  const [filter, setFilter] = useState<Format | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  /** The grid thumbnail the browser already has, shown blurred while the full image loads. */
  const [thumb, setThumb] = useState<string | null>(null);

  const shown = filter === "all" ? posts : posts.filter((p) => p.format === filter);
  const info = formats.find((f) => f.id === filter);
  const current = open !== null ? shown[open] : null;

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (open === null) return;
    const img = gridRef.current?.querySelectorAll("img")[open];
    setThumb(img?.complete && img.naturalWidth > 0 && img.currentSrc ? img.currentSrc : null);
  }, [open, filter]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open !== null && !dlg.open) dlg.showModal();
    if (open === null && dlg.open) dlg.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const count = (f: Format) => posts.filter((p) => p.format === f).length;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter posts by format">
        {[{ id: "all" as const, label: "All posts" }, ...formats].map((f) => {
          const on = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.id)}
              className={clsx(
                "inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-[14px] transition-colors duration-micro",
                on ? "border-ink bg-ink text-white" : "border-line bg-bg text-ink-2 hover:border-ink hover:text-ink",
              )}
            >
              {f.label}
              <span className={clsx("font-mono text-[11px]", on ? "text-white/60" : "text-ink-mute")}>
                {f.id === "all" ? posts.length : count(f.id)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Formula */}
      <div className="relative mt-8 min-h-[96px] overflow-hidden rounded-[20px] border border-line bg-bg-warm px-6 py-6 md:px-8">
        <span
          aria-hidden="true"
          key={info?.ghost ?? "ALL"}
          className="rise-in pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 select-none font-display text-[clamp(56px,9vw,120px)] font-bold leading-none tracking-[-0.03em] text-transparent [-webkit-text-stroke:1px_rgba(30,30,30,0.12)]"
        >
          {info?.ghost ?? "FEED"}
        </span>
        <p key={filter} className="rise-in relative max-w-[62ch] t-body text-ink-2">
          {info ? (
            <>
              <span className="font-display font-medium text-ink">The formula. </span>
              {info.formula}
            </>
          ) : (
            <>
              <span className="font-display font-medium text-ink">Nineteen posts, five formats. </span>
              Filter by format to see the formula behind each one, or open any post to check it
              against the brand rules.
            </>
          )}
        </p>
      </div>

      {/* Grid */}
      <ul ref={gridRef} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 md:gap-4">
        {shown.map((p, i) => (
          <li key={`${filter}-${p.id}`} className="rise-in" style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[16px] bg-bg-warm ring-1 ring-line focus-visible:ring-2 focus-visible:ring-brand-ink"
            >
              <span className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04] motion-reduce:transition-none">
                <SmartImage src={p.src} alt={p.alt} sizes="(min-width:1024px) 23vw, (min-width:640px) 31vw, 46vw" />
              </span>
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-left opacity-0 transition-opacity duration-micro group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-[13px] font-medium leading-[1.3] text-white">{p.product}</span>
                <span aria-hidden="true" className="font-mono text-[14px] text-white">↗</span>
              </span>
              <span className="sr-only">Open larger view</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        aria-label={current ? `${current.product} post` : "Post"}
        className="m-auto w-[min(1080px,94vw)] max-h-[94vh] overflow-y-auto rounded-[24px] bg-bg p-0 text-ink backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="relative aspect-[4/5] overflow-hidden bg-black">
              {thumb && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={thumb}
                  src={thumb}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full scale-110 object-cover blur-xl"
                />
              )}
              <SmartImage key={current.id} src={current.src} alt={current.alt} sizes="(min-width:768px) 560px, 94vw" quality={82} priority />
            </div>
            <div className="flex flex-col p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute">
                  {String((open ?? 0) + 1).padStart(2, "0")} / {String(shown.length).padStart(2, "0")} ·{" "}
                  {formats.find((f) => f.id === current.format)?.label}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="-mr-2 -mt-2 flex h-11 w-11 items-center justify-center rounded-full text-ink-mute hover:bg-bg-warm hover:text-ink"
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <h3 className="mt-4 font-display text-[24px] md:text-[28px] font-medium leading-[1.2]">{current.product}</h3>

              <p className="mt-8 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute">Brand check</p>
              <ul className="mt-3 border-t border-line text-[14px]">
                {[
                  { ok: true, label: `Logo, ${cornerLabel[current.logo]}` },
                  { ok: current.has.url, label: "bilesmanatural.lk" },
                  { ok: current.has.signoff, label: "Pure by Nature. Proudly Sri Lankan." },
                  { ok: current.has.badges, label: "Five-icon trust row" },
                  { ok: current.has.seal, label: "Natural Product seal" },
                ].map((r) => (
                  <li key={r.label} className="flex items-center justify-between gap-4 border-b border-line py-3">
                    <span className={r.ok ? "text-ink" : "text-ink-mute"}>{r.label}</span>
                    <span
                      className={clsx(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px]",
                        r.ok ? "bg-[#6A9670] text-white" : "bg-bg-warm text-ink-mute ring-1 ring-line",
                      )}
                    >
                      <span aria-hidden="true">{r.ok ? "✓" : "–"}</span>
                      <span className="sr-only">{r.ok ? "present" : "not used"}</span>
                    </span>
                  </li>
                ))}
              </ul>
              {current.format === "offer" && (
                <p className="mt-4 text-[13px] leading-[1.55] text-ink-mute">
                  Offers trade the sign-off and trust row for the number, the dates and the T&amp;C.
                </p>
              )}

              <div className="mt-auto flex items-center gap-3 pt-8">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-ink"
                  aria-label="Previous post"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-ink"
                  aria-label="Next post"
                >
                  <span aria-hidden="true">→</span>
                </button>
                <span className="ml-2 hidden font-mono text-[10px] tracking-[0.16em] uppercase text-ink-mute md:inline">
                  ← → keys
                </span>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
