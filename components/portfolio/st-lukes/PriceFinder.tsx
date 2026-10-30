"use client";

import { useId, useMemo, useState } from "react";
import clsx from "clsx";
import { SL, type Test } from "./data";

const fmt = (n: number) => n.toLocaleString("en-LK");
type Sort = "list" | "low" | "high";

/**
 * A working copy of the price finder we built for St Luke's, loaded with the
 * real published list: search by name, filter by category, sort by price.
 */
export default function PriceFinder({ tests, categories }: { tests: Test[]; categories: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<Sort>("list");
  const inputId = useId();

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const rows = tests.filter(
      (t) => (cat === "all" || t.cat === cat) && (!needle || t.name.toLowerCase().includes(needle)),
    );
    if (sort === "low") return [...rows].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...rows].sort((a, b) => b.price - a.price);
    return rows;
  }, [tests, q, cat, sort]);

  const max = 7000;

  return (
    <div className="overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_30px_60px_-34px_rgba(15,23,42,.35)]">
      {/* Controls */}
      <div className="border-b border-line p-4 md:p-6" style={{ background: SL.soft }}>
        <label htmlFor={inputId} className="sr-only">
          Search for a test by name
        </label>
        <div className="relative">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id={inputId}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try “TSH”, “sugar” or “liver”"
            className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-[15px] text-ink outline-none transition-shadow duration-micro placeholder:text-ink-mute focus-visible:ring-2"
            style={{ ["--tw-ring-color" as string]: SL.green }}
          />
        </div>

        <div className="mt-4 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <div role="group" aria-label="Filter by category" className="flex w-max gap-2 md:w-auto md:flex-wrap">
            {["all", ...categories].map((c) => {
              const on = cat === c;
              const n = c === "all" ? tests.length : tests.filter((t) => t.cat === c).length;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCat(c)}
                  className={clsx(
                    "inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-[13px] transition-colors duration-micro",
                    on ? "border-transparent text-white" : "border-line bg-white text-ink-2 hover:border-ink/30",
                  )}
                  style={on ? { background: SL.ink } : undefined}
                >
                  {c === "all" ? "All tests" : c}
                  <span className={clsx("tabular-nums text-[11px]", on ? "text-white/60" : "text-ink-mute")}>{n}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 md:px-6">
        <p aria-live="polite" className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute">
          <span className="text-ink">{shown.length}</span> {shown.length === 1 ? "test" : "tests"} shown
        </p>
        <div role="group" aria-label="Sort" className="flex gap-1 rounded-full border border-line p-1">
          {([
            ["list", "As listed"],
            ["low", "Lowest"],
            ["high", "Highest"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={sort === id}
              onClick={() => setSort(id)}
              className={clsx(
                "min-h-[32px] rounded-full px-3 text-[12px] transition-colors duration-micro",
                sort === id ? "bg-ink text-white" : "text-ink-2 hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Rows */}
      <ul className="max-h-[440px] overflow-y-auto overscroll-contain" tabIndex={0} aria-label="Test prices">
        {shown.map((t) => (
          <li key={t.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 border-b border-line/70 px-4 py-3 last:border-b-0 md:px-6">
            <div className="min-w-0">
              <p className="truncate text-[15px] text-ink">{t.name}</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span aria-hidden="true" className="h-1 rounded-full" style={{ width: `${Math.max(3, (t.price / max) * 100)}%`, maxWidth: "70%", background: SL.green, opacity: 0.55 }} />
                <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-mute">{t.cat}</span>
              </div>
            </div>
            <p className="text-right font-display text-[18px] font-semibold tabular-nums text-ink">
              <span className="mr-1 font-mono text-[10px] font-normal tracking-[0.1em] text-ink-mute">LKR</span>
              {fmt(t.price)}
            </p>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="px-6 py-10 text-center text-[14px] text-ink-mute">
            No test matches “{q}”. On the live site, that is where the “call us for a price” prompt appears.
          </li>
        )}
      </ul>
    </div>
  );
}
