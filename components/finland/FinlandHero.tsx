import Link from "next/link";
import clsx from "clsx";
import SmartImage from "../ui/SmartImage";
import type { FiProjects } from "./types";
import { shortIndustry } from "./types";
import { cld, finlandHeroTiles } from "@/lib/finland";
import styles from "./finland.module.css";

type Tile = { slug: string; title: string; industry?: string; services: string; image: string; ratio: string };

/**
 * 01 — Hero. Answers "what does Uniix do?" and shows real work in the first
 * screen.
 *
 * Copy is server-rendered with the site's CSS entrance, so the headline (the
 * LCP element) never waits on JavaScript. The visual is a "living portfolio":
 * two columns of real project frames drifting in opposite directions (CSS
 * only — no JS). Each frame is a link to its case study; hover or focus
 * reveals project, industry and services. Drift pauses on hover/focus and is
 * off under reduced motion. Mobile gets a single horizontal drift.
 */
export default function FinlandHero({ projects }: { projects: FiProjects }) {
  const tiles: Tile[] = finlandHeroTiles.flatMap((t) => {
    const p = projects[t.project];
    if (!p) return [];
    return [
      {
        slug: p.slug,
        title: p.title,
        industry: shortIndustry(p),
        services: p.services,
        image: t.image === "cover" ? p.coverImage : cld(t.image, 900),
        ratio: t.ratio,
      },
    ];
  });
  const colA = tiles.filter((_, i) => i % 2 === 0);
  const colB = tiles.filter((_, i) => i % 2 === 1);

  return (
    <section
      data-nav-invert
      aria-labelledby="fi-hero-heading"
      className="on-dark relative isolate overflow-hidden bg-bg-ink text-white"
    >
      <div aria-hidden="true" className={clsx(styles.grid, "absolute inset-0 -z-10 opacity-60")} />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(46% 50% at 12% 88%, rgba(232,98,26,0.16), transparent 70%), radial-gradient(40% 40% at 90% 10%, rgba(169,195,217,0.10), transparent 70%)",
        }}
      />

      <div className="h-[104px]" aria-hidden="true" />

      <div className="wrap grid grid-cols-[minmax(0,1fr)] items-center gap-12 pb-12 pt-6 lg:min-h-[calc(100svh-104px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:pb-0 lg:pt-0">
        {/* ------------------------------------------------ Copy */}
        <div className="lg:py-16">
          <p className="rise-in eyebrow">Design · Technology · Growth</p>

          <h1
            id="fi-hero-heading"
            className="t-display mt-7 text-[clamp(40px,4.7vw,78px)] leading-[0.94] tracking-[-0.052em]"
          >
            <span className="mask-line">
              <span style={{ animationDelay: "80ms" }}>Digital experiences</span>
            </span>
            <span className="mask-line">
              <span style={{ animationDelay: "180ms" }}>built to move</span>
            </span>
            <span className="mask-line pb-[0.08em]">
              <span style={{ animationDelay: "280ms" }} className="t-italic accent-grad-text">
                businesses forward.
              </span>
            </span>
          </h1>

          <p className="rise-in t-lead mt-7 max-w-[48ch] text-white/75" style={{ animationDelay: "420ms" }}>
            Uniix combines strategy, design, technology and digital growth to
            create websites, products and experiences people remember.
          </p>

          <div className="rise-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "520ms" }}>
            <Link href="#work" className="btn btn-light group">
              Explore our work <span className="cta-arrow">↓</span>
            </Link>
            <Link href="/contact/" className="btn btn-outline-light group">
              Start a project <span className="cta-arrow">↗</span>
            </Link>
          </div>
        </div>

        {/* ------------------------------------------------ Living portfolio */}
        <div className="rise-in relative" style={{ animationDelay: "300ms" }}>
          {/* Desktop: two vertical columns */}
          <div className={clsx(styles.heroCols, "hidden lg:grid")}>
            <Column tiles={colA} dir="up" priorityFirst />
            <Column tiles={colB} dir="down" />
          </div>
          {/* Mobile / tablet: one horizontal row */}
          <div className={clsx(styles.heroRow, "lg:hidden")}>
            <div className={styles.heroRowTrack}>
              {[...tiles, ...tiles].map((t, i) => (
                <TileCard key={`${t.slug}-${i}`} tile={t} dup={i >= tiles.length} sizes="220px" row />
              ))}
            </div>
          </div>
          <p className="mt-4 t-meta text-[10px] text-white/45 lg:hidden">
            Real projects · tap to open the case study
          </p>
        </div>
      </div>
    </section>
  );
}

function Column({ tiles, dir, priorityFirst }: { tiles: Tile[]; dir: "up" | "down"; priorityFirst?: boolean }) {
  return (
    <div className={styles.heroCol}>
      <div className={clsx(styles.heroColTrack, dir === "down" && styles.heroColDown)}>
        {[...tiles, ...tiles].map((t, i) => (
          <TileCard
            key={`${t.slug}-${i}`}
            tile={t}
            dup={i >= tiles.length}
            sizes="(min-width:1280px) 280px, 22vw"
            priority={priorityFirst && i < 2}
          />
        ))}
      </div>
    </div>
  );
}

function TileCard({
  tile,
  dup,
  sizes,
  priority,
  row,
}: {
  tile: Tile;
  dup: boolean;
  sizes: string;
  priority?: boolean;
  row?: boolean;
}) {
  return (
    <Link
      href={`/portfolio/${tile.slug}/`}
      aria-hidden={dup || undefined}
      tabIndex={dup ? -1 : undefined}
      className={clsx(styles.heroTile, row ? styles.heroTileRow : styles[`heroTile_${tile.ratio}`])}
    >
      <SmartImage
        src={tile.image}
        alt={dup ? "" : `${tile.title} — project by Uniix Studio`}
        sizes={sizes}
        quality={62}
        priority={priority}
      />
      <span className={styles.heroTileInfo}>
        <span className="block font-display text-[15px] font-medium leading-tight tracking-[-0.01em]">{tile.title}</span>
        {tile.industry && <span className="mt-1 block text-[11.5px] text-white/70">{tile.industry}</span>}
        <span className="mt-1 block t-meta text-[9px] text-white/60">{tile.services.split("·").slice(0, 2).join(" · ")}</span>
      </span>
    </Link>
  );
}
