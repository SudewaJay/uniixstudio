import Link from "next/link";
import clsx from "clsx";
import SmartImage from "../ui/SmartImage";
import Snowfall from "./Snowfall";
import LangSwitch from "./LangSwitch";
import type { FiProjects } from "./types";
import { shortIndustry } from "./types";
import { cld, finlandHeroTiles, finlandImages } from "@/lib/finland";
import type { FinlandContent } from "@/lib/finland-i18n";
import styles from "./finland.module.css";

type Tile = { slug: string; title: string; industry?: string; services: string; image: string; ratio: string };

/**
 * 01 — Hero. Answers "what does Uniix do?" and shows real work in the first
 * screen, set in a quiet Nordic atmosphere.
 *
 * Layers (back to front): an early-morning misty forest drifting almost
 * imperceptibly, heavy ink overlays so it stays a mood rather than a
 * photograph, the site's grid, sparse slow snow, then the copy and the
 * "living portfolio" — two columns of real project frames drifting in
 * opposite directions (CSS only). Every frame links to its case study.
 *
 * The headline (LCP) is server-rendered with the site's CSS entrance.
 */
export default function FinlandHero({ projects, c }: { projects: FiProjects; c: FinlandContent }) {
  const t = c.t.hero;
  const tiles: Tile[] = finlandHeroTiles.flatMap((tile) => {
    const p = projects[tile.project];
    if (!p) return [];
    return [
      {
        slug: p.slug,
        title: p.title,
        industry: shortIndustry(p),
        services: p.services,
        image: tile.image === "cover" ? p.coverImage : cld(tile.image, 900),
        ratio: tile.ratio,
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
      {/* ------------------------------------------------ Atmosphere */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className={clsx(styles.kenBurns, "absolute inset-0")}>
          <SmartImage
            src={finlandImages.heroForest.src}
            alt=""
            sizes="100vw"
            priority
            quality={60}
            position={finlandImages.heroForest.position}
            className={styles.photoCold}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(18,16,14,0.9) 0%, rgba(18,16,14,0.72) 45%, rgba(18,16,14,0.5) 100%), linear-gradient(180deg, rgba(18,16,14,0.55) 0%, rgba(18,16,14,0.12) 40%, rgba(18,16,14,0.9) 100%)",
          }}
        />
        <div className={clsx(styles.grain, "absolute inset-0")} />
      </div>
      <div aria-hidden="true" className={clsx(styles.grid, "absolute inset-0 -z-10 opacity-40")} />
      <Snowfall count={18} className="-z-10" />

      <div className="h-[104px]" aria-hidden="true" />

      <div className="wrap grid grid-cols-[minmax(0,1fr)] items-center gap-12 pb-12 pt-6 lg:min-h-[calc(100svh-104px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:pb-0 lg:pt-0">
        {/* ------------------------------------------------ Copy */}
        <div className="lg:py-16">
          <div className="rise-in flex flex-wrap items-center justify-between gap-4">
            <p className="eyebrow">{t.eyebrow}</p>
            <LangSwitch lang={c.lang} label={c.t.lang.label} />
          </div>

          <h1
            id="fi-hero-heading"
            className="t-display mt-7 text-[clamp(38px,4.7vw,78px)] leading-[0.96] tracking-[-0.052em]"
          >
            <span className="mask-line">
              <span style={{ animationDelay: "80ms" }}>{t.h1[0]}</span>
            </span>
            <span className="mask-line">
              <span style={{ animationDelay: "180ms" }}>{t.h1[1]}</span>
            </span>
            <span className="mask-line pb-[0.08em]">
              <span style={{ animationDelay: "280ms" }} className="t-italic accent-grad-text">
                {t.h1[2]}
              </span>
            </span>
          </h1>

          <p className="rise-in t-lead mt-7 max-w-[48ch] text-white/80" style={{ animationDelay: "420ms" }}>
            {t.lead}
          </p>

          <div className="rise-in mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "520ms" }}>
            <Link href="#work" className="btn btn-light group">
              {t.work} <span className="cta-arrow">↓</span>
            </Link>
            <Link href="/contact/" className="btn btn-outline-light group">
              {t.start} <span className="cta-arrow">↗</span>
            </Link>
          </div>
        </div>

        {/* ------------------------------------------------ Living portfolio */}
        <div className="rise-in relative" style={{ animationDelay: "300ms" }}>
          <div className={clsx(styles.heroCols, "hidden lg:grid")}>
            <Column tiles={colA} dir="up" alt={t.tileAlt} priorityFirst />
            <Column tiles={colB} dir="down" alt={t.tileAlt} />
          </div>
          <div className={clsx(styles.heroRow, "lg:hidden")}>
            <div className={styles.heroRowTrack}>
              {[...tiles, ...tiles].map((tile, i) => (
                <TileCard key={`${tile.slug}-${i}`} tile={tile} alt={t.tileAlt} dup={i >= tiles.length} sizes="220px" row />
              ))}
            </div>
          </div>
          <p className="mt-4 t-meta text-[10px] text-white/55 lg:hidden">{t.hint}</p>
        </div>
      </div>
    </section>
  );
}

function Column({ tiles, dir, alt, priorityFirst }: { tiles: Tile[]; dir: "up" | "down"; alt: string; priorityFirst?: boolean }) {
  return (
    <div className={styles.heroCol}>
      <div className={clsx(styles.heroColTrack, dir === "down" && styles.heroColDown)}>
        {[...tiles, ...tiles].map((tile, i) => (
          <TileCard
            key={`${tile.slug}-${i}`}
            tile={tile}
            alt={alt}
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
  alt,
  dup,
  sizes,
  priority,
  row,
}: {
  tile: Tile;
  alt: string;
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
      <SmartImage src={tile.image} alt={dup ? "" : `${tile.title} — ${alt}`} sizes={sizes} quality={62} priority={priority} />
      <span className={styles.heroTileInfo}>
        <span className="block font-display text-[15px] font-medium leading-tight tracking-[-0.01em]">{tile.title}</span>
        {tile.industry && <span className="mt-1 block text-[11.5px] text-white/70">{tile.industry}</span>}
        <span className="mt-1 block t-meta text-[9px] text-white/60">{tile.services.split("·").slice(0, 2).join(" · ")}</span>
      </span>
    </Link>
  );
}
