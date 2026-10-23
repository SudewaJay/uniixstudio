"use client";

import { useState } from "react";
import clsx from "clsx";
import { SL, type Article, type Topic } from "./data";

const month = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

/** Every article on the live blog, filterable by topic and language. */
export default function ArticleWall({ articles, topics }: { articles: Article[]; topics: Record<Topic, string> }) {
  const [topic, setTopic] = useState<Topic | "all">("all");
  const [lang, setLang] = useState<"all" | "en" | "si">("all");

  const shown = articles.filter(
    (a) => (topic === "all" || a.topic === topic) && (lang === "all" || (lang === "si" ? a.si : !a.si)),
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {(["all", ...Object.keys(topics)] as Array<Topic | "all">).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
              className={clsx(
                "min-h-[40px] rounded-full border px-4 text-[13px] transition-colors duration-micro",
                topic === t ? "border-transparent bg-ink text-white" : "border-line bg-white text-ink-2 hover:border-ink/30",
              )}
            >
              {t === "all" ? "All topics" : topics[t]}
            </button>
          ))}
        </div>
        <div role="group" aria-label="Filter by language" className="flex gap-1 rounded-full border border-line bg-white p-1">
          {([
            ["all", "All"],
            ["en", "English"],
            ["si", "සිංහල"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={lang === id}
              onClick={() => setLang(id)}
              lang={id === "si" ? "si" : undefined}
              className={clsx(
                "min-h-[34px] rounded-full px-3.5 text-[13px] transition-colors duration-micro",
                lang === id ? "text-white" : "text-ink-2 hover:text-ink",
              )}
              style={lang === id ? { background: SL.greenDark } : undefined}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute">
        <span className="text-ink">{shown.length}</span> of {articles.length} articles
      </p>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a, k) => (
          <li key={a.slug} className="rise-in" style={{ animationDelay: `${Math.min(k, 9) * 30}ms` }}>
            <a
              href={`https://www.stlukesmedilab.com/blog/${a.slug}`}
              target="_blank"
              rel="noopener"
              lang={a.si ? "si" : undefined}
              className="group flex h-full flex-col justify-between gap-6 rounded-[16px] border border-line bg-white p-5 transition-all duration-std ease-uniix hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_18px_36px_-24px_rgba(15,23,42,.45)]"
            >
              <span className="font-display text-[17px] font-medium leading-[1.3] text-ink">{a.title}</span>
              <span className="flex items-center justify-between gap-3 font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.topic === "outbreak" ? SL.red : SL.green }} aria-hidden="true" />
                  {topics[a.topic]}
                </span>
                <span className="flex items-center gap-2">
                  {a.si && (
                    <span className="rounded px-1.5 py-0.5 text-white" style={{ background: SL.greenDark }}>
                      SI
                    </span>
                  )}
                  {month(a.date)}
                  <span aria-hidden="true" className="text-ink transition-transform duration-micro group-hover:translate-x-0.5">↗</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
