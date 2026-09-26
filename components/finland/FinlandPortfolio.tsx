"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import SmartImage from "../ui/SmartImage";
import styles from "./finland.module.css";

export type FinlandWorkItem = {
  slug: string;
  title: string;
  industry?: string;
  services: string;
  impact: string;
  stat?: { label: string; value: string };
  coverImage: string;
  year: string;
};

/**
 * 07 — Selected work.
 *
 * Existing Uniix case studies only — no Finnish clients are implied. Every
 * field comes from the project's own MDX frontmatter; nothing is authored
 * here. Each card links to the existing case study.
 *
 * Desktop: a native horizontal scroll-snap rail (trackpad, shift-wheel,
 * keyboard and the prev/next buttons all work; nothing is scroll-jacked).
 * Mobile: plain vertical cards.
 */
export default function FinlandPortfolio({ items }: { items: FinlandWorkItem[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft < 8,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section id="work" aria-labelledby="fi-work-heading" className="section bg-bg-paper border-y border-line-soft">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="eyebrow">Selected work</span>
            <h2 id="fi-work-heading" className="t-h2 mt-5">
              Proof, not
              <br />
              <span className="t-italic accent-grad-text">promises.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="flex items-center gap-3">
              <Link href="/portfolio/" className="btn btn-secondary btn-sm group">
                All projects <span className="cta-arrow">↗</span>
              </Link>
              <div className="hidden gap-2 lg:flex">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={edge.start}
                  aria-controls="fi-work-rail"
                  aria-label="Previous projects"
                  className={styles.railBtn}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={edge.end}
                  aria-controls="fi-work-rail"
                  aria-label="Next projects"
                  className={styles.railBtn}
                >
                  →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <ul
        id="fi-work-rail"
        ref={railRef}
        onScroll={update}
        className={clsx(styles.workRail, "mt-12 md:mt-16")}
      >
        {items.map((p, i) => (
          <li key={p.slug} className={styles.workItem}>
            <Link href={`/portfolio/${p.slug}/`} className={clsx(styles.workCard, "group block")}>
              <div className="frame aspect-[4/3] shadow-sm2 lg:aspect-[16/11]">
                <SmartImage
                  src={p.coverImage}
                  alt={`${p.title} — case study cover`}
                  sizes="(min-width:1024px) 60vw, 92vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-std ease-uniix group-hover:opacity-100" />
                {p.stat && (
                  <div className="on-dark absolute bottom-4 left-4 rounded-sm2 bg-ink/80 px-4 py-3 text-white backdrop-blur-sm md:bottom-6 md:left-6">
                    <span className="t-numeral block text-[clamp(24px,2.6vw,36px)]">{p.stat.value}</span>
                    <span className="t-meta mt-1 block text-[9px] text-white/70">{p.stat.label}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-8">
                <div>
                  <p className="t-meta text-ink-mute">
                    <span className="accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mx-2 opacity-40">·</span>
                    {p.year}
                  </p>
                  <h3 className={clsx(styles.workTitle, "t-h3 mt-3")}>{p.title}</h3>
                  {p.industry && <p className="mt-2 text-[13.5px] text-ink-mute">{p.industry}</p>}
                </div>
                <div>
                  <p className="text-[15px] leading-[1.55] text-ink-2">{p.impact}</p>
                  <p className="t-meta mt-4 text-[10px] text-ink-mute">{p.services}</p>
                  <span className="link-cta mt-5">
                    View case study <span className="cta-arrow">↗</span>
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
