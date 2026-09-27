import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import SmartImage from "../ui/SmartImage";
import type { FinlandIndustry } from "@/lib/finland";
import type { FinlandUI } from "@/lib/finland-i18n";
import styles from "./finland.module.css";

export type IndustryTile = FinlandIndustry & {
  proof?: { image: string; label: string; slug: string };
};

/**
 * 07 — Industries.
 *
 * A 4×2 hairline grid. On devices that can hover, each tile is typographic
 * until hovered or focused, then reveals its statement, capability and — only
 * where a real Uniix project exists — that project's cover. No stock photos.
 *
 * Touch / small screens: a horizontal swipe rail where every tile is already
 * open, so nothing is hover-only. All of this is CSS; the section ships no JS.
 */
export default function FinlandIndustries({ items, t }: { items: IndustryTile[]; t: FinlandUI["industries"] }) {
  return (
    <section id="industries" aria-labelledby="fi-ind-heading" className="section bg-bg">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 id="fi-ind-heading" className="t-h2 mt-5 max-w-[18ch]">
              {t.title[0]}{" "}
              <span className="t-italic accent-grad-text">{t.title[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-body max-w-[38ch] text-ink-mute">
              {t.lead}
            </p>
          </Reveal>
        </div>
      </div>

      <div className={clsx(styles.indRail, "mt-12 md:mt-16")}>
        <ul className={styles.indGrid}>
          {items.map((ind) => (
            <li key={ind.num} className={styles.indTile}>
              {ind.proof && (
                <div aria-hidden="true" className={styles.indMedia}>
                  <SmartImage
                    src={ind.proof.image}
                    alt=""
                    sizes="(min-width:1024px) 25vw, 80vw"
                    quality={60}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/35" />
                </div>
              )}

              <div className="relative flex h-full flex-col p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className={clsx(styles.indNum, "t-meta tabular-nums")}>{ind.num}</span>
                  {ind.proof && (
                    <span className={clsx(styles.indProofTag, "t-meta text-[9px]")}>{t.related}</span>
                  )}
                </div>

                <h3 className={clsx(styles.indName, "mt-auto font-display font-medium text-[clamp(26px,2.4vw,36px)] leading-[1.02] tracking-[-0.03em]")}>
                  {ind.name}
                </h3>
                <p className={clsx(styles.indSectors, "mt-3 text-[13.5px]")}>{ind.sectors.join(" · ")}</p>

                <div className={styles.indDetail}>
                  <div className="min-h-0">
                    <p className="pt-5 text-[15px] leading-[1.5]">{ind.statement}</p>
                    <p className="t-meta mt-4 text-[10px] opacity-70">{ind.capability}</p>
                    {ind.proof ? (
                      <Link href={`/portfolio/${ind.proof.slug}/`} className={clsx(styles.indLink, "mt-5")}>
                        {ind.proof.label} <span aria-hidden="true">↗</span>
                      </Link>
                    ) : (
                      <Link href="/contact/" className={clsx(styles.indLink, "mt-5")}>
                        {t.discuss} <span aria-hidden="true">↗</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
