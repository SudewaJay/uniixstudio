"use client";

import { useState } from "react";
import clsx from "clsx";
import { SL } from "./data";

type Pkg = { name: string; short: string; price: number; for: string };
type Row = { test: string; in: boolean[] };

/** Pick a package to see exactly which tests it bundles. */
export default function PackageMatrix({ packages, rows }: { packages: Pkg[]; rows: Row[] }) {
  const [active, setActive] = useState(0);
  const pkg = packages[active];
  const count = rows.filter((r) => r.in[active]).length;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
      <div role="radiogroup" aria-label="Health package" className="grid gap-3 self-start sm:grid-cols-2 lg:grid-cols-1">
        {packages.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.name}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setActive(i)}
              className={clsx(
                "flex min-h-[64px] items-center justify-between gap-4 rounded-[16px] border px-5 py-4 text-left transition-all duration-std ease-uniix",
                on ? "border-transparent text-white shadow-[0_20px_40px_-20px_rgba(47,94,27,.7)]" : "border-line bg-white text-ink hover:border-ink/30",
              )}
              style={on ? { background: SL.greenDark } : undefined}
            >
              <span>
                <span className="block font-display text-[17px] font-medium leading-tight">{p.name}</span>
                <span className={clsx("mt-1 block text-[13px]", on ? "text-white/75" : "text-ink-mute")}>{p.for}</span>
              </span>
              <span className="shrink-0 text-right font-display text-[18px] font-semibold tabular-nums">
                <span className={clsx("block font-mono text-[9px] font-normal tracking-[0.14em]", on ? "text-white/60" : "text-ink-mute")}>LKR</span>
                {p.price.toLocaleString("en-LK")}
              </span>
            </button>
          );
        })}
      </div>

      <div>
        <p aria-live="polite" className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute">
          {pkg.short} · <span className="text-ink">{count} tests included</span>
        </p>
        <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
          {rows.map((r) => {
            const on = r.in[active];
            return (
              <li
                key={r.test}
                className={clsx(
                  "flex items-center gap-3 border-b border-line py-2.5 text-[14px] transition-all duration-std",
                  on ? "text-ink" : "text-ink-mute/50",
                )}
              >
                <span
                  aria-hidden="true"
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] transition-all duration-std"
                  style={on ? { background: SL.green, color: "white" } : { boxShadow: "inset 0 0 0 1px rgba(15,23,42,.15)" }}
                >
                  {on ? "✓" : ""}
                </span>
                <span className={on ? undefined : "line-through decoration-ink-mute/30"}>{r.test}</span>
                <span className="sr-only">{on ? "included" : "not included"}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
