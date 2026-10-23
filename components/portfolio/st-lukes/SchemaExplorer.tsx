"use client";

import { useState } from "react";
import clsx from "clsx";
import { type SchemaPage } from "./data";

/** Which structured data each page template emits, counted from the live HTML. */
export default function SchemaExplorer({ pages, allTypes }: { pages: SchemaPage[]; allTypes: string[] }) {
  const [i, setI] = useState(0);
  const page = pages[i];
  const used = new Set(page.types.map(([t]) => t));
  const top = Math.max(...page.types.map(([, n]) => n));

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
      <div>
        <div role="tablist" aria-label="Page template" className="flex flex-wrap gap-2">
          {pages.map((p, n) => (
            <button
              key={p.path}
              type="button"
              role="tab"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className={clsx(
                "min-h-[40px] rounded-full border px-4 text-[13px] transition-colors duration-micro",
                n === i ? "border-white bg-white text-ink" : "border-white/20 text-white/70 hover:border-white/50",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* JSON-LD style readout */}
        <div role="tabpanel" aria-label={`${page.label} structured data`} className="mt-6 overflow-hidden rounded-[18px] border border-white/10 bg-black/30">
          <p className="border-b border-white/10 px-5 py-3 font-mono text-[11px] text-white/50">
            {"<script type=\"application/ld+json\">"} · <span className="text-white/80">{page.path}</span>
          </p>
          <ul key={i} className="divide-y divide-white/[0.06]">
            {page.types.map(([type, n], k) => (
              <li
                key={type}
                className="rise-in grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-2.5 font-mono text-[13px]"
                style={{ animationDelay: `${k * 35}ms` }}
              >
                <span className="min-w-0">
                  <span className="text-white/40">&quot;@type&quot;: </span>
                  <span className="text-[#A6E08A]">&quot;{type}&quot;</span>
                  <span aria-hidden="true" className="mt-1.5 block h-[3px] rounded-full bg-[#58B330]/60" style={{ width: `${Math.max(4, (n / top) * 100)}%` }} />
                </span>
                <span className="tabular-nums text-white/70">×{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">All 22 types across the site</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {allTypes.map((t) => {
            const on = used.has(t);
            return (
              <li
                key={t}
                className={clsx(
                  "rounded-md border px-2.5 py-1.5 font-mono text-[11px] transition-all duration-std",
                  on ? "border-[#58B330] bg-[#58B330]/15 text-white" : "border-white/10 text-white/35",
                )}
              >
                {t}
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-[14px] leading-[1.6] text-white/60">
          Highlighted: the types on the <span className="text-white">{page.label.toLowerCase()}</span>. Each template
          carries what Google needs for that kind of page, from prices as <code className="text-white/80">Offer</code> to
          the reviewer as <code className="text-white/80">Person</code>.
        </p>
      </div>
    </div>
  );
}
