"use client";

import { useState } from "react";
import clsx from "clsx";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { SL, type Query } from "./data";

/** Pick a search; see the live page built to answer it, on desktop or phone. */
export default function QueryRouter({ queries }: { queries: Query[] }) {
  const [i, setI] = useState(0);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const q = queries[i];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
      <div>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute">A patient searches</p>
        <ul role="radiogroup" aria-label="Search query" className="mt-4 flex flex-col gap-2">
          {queries.map((item, n) => {
            const on = n === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setI(n)}
                  lang={item.lang}
                  className={clsx(
                    "flex min-h-[52px] w-full items-center gap-3 rounded-full border px-5 text-left text-[15px] transition-all duration-std ease-uniix",
                    on ? "border-transparent bg-ink text-white shadow-[0_16px_30px_-18px_rgba(15,23,42,.8)]" : "border-line bg-white text-ink-2 hover:border-ink/30 hover:text-ink",
                  )}
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" style={on ? { color: SL.green } : undefined}>
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  <span className="truncate">{item.q}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div key={i} className="rise-in mt-8 border-t border-line pt-6">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute">The page that answers it</p>
          <p className="mt-3 break-all font-mono text-[12px]" style={{ color: SL.greenDark }}>
            {q.url}
          </p>
          <p className="t-body mt-3 text-ink-2">{q.why}</p>
        </div>
      </div>

      <div>
        <div className="mb-4 flex justify-end">
          <div role="group" aria-label="Device" className="flex gap-1 rounded-full border border-line bg-white p-1">
            {(["desktop", "mobile"] as const).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={device === d}
                onClick={() => setDevice(d)}
                className={clsx(
                  "min-h-[36px] rounded-full px-4 text-[13px] capitalize transition-colors duration-micro",
                  device === d ? "bg-ink text-white" : "text-ink-2 hover:text-ink",
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div key={`${i}-${device}`} className="rise-in">
          {device === "desktop" ? (
            <BrowserFrame src={q.img} url={q.url} alt={`Live page answering “${q.q}”`} sizes="(min-width:1024px) 58vw, 100vw" />
          ) : (
            <PhoneFrame src={q.mobile} alt={`Live page answering “${q.q}” on mobile`} className="mx-auto w-[min(300px,80vw)]" sizes="300px" />
          )}
        </div>
      </div>
    </div>
  );
}
