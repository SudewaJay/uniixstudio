import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import SmartImage from "../ui/SmartImage";
import ClipReveal from "./ClipReveal";
import type { FiProject, FiProjects } from "./types";
import { shortIndustry } from "./types";
import { cld, finlandWorkLayout } from "@/lib/finland";
import type { FinlandContent } from "@/lib/finland-i18n";
import styles from "./finland.module.css";

/**
 * 02 — Selected work. The most important section, so it comes straight after
 * the hero and gives the work room: large → two-up → large (reversed) →
 * horizontal strip of detail frames. Every card is a link to the existing
 * case study; every word on a card comes from that project's MDX.
 */
export default function FinlandWork({ projects, c }: { projects: FiProjects; c: FinlandContent }) {
  const { lead, pair, feature } = finlandWorkLayout;
  const strip = c.strip;
  const t = c.t.work;
  const L = projects[lead];
  const P = pair.map((s) => projects[s]).filter(Boolean) as FiProject[];
  const F = projects[feature];

  return (
    <section id="work" aria-labelledby="fi-work-heading" className="section bg-bg">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:items-end lg:gap-16">
          <Reveal>
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 id="fi-work-heading" className="t-h2 mt-5">
              {t.title[0]} <span className="t-italic accent-grad-text">{t.title[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead max-w-[44ch] text-ink-2">
              {t.lead}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-24">
          {L && <LargeCard p={L} index={1} view={t.view} />}

          {P.length > 0 && (
            <div className="grid gap-16 md:grid-cols-2 md:gap-8 lg:gap-12">
              {P.map((p, i) => (
                <SmallCard key={p.slug} p={p} index={2 + i} offset={i === 1} view={t.view} />
              ))}
            </div>
          )}

          {F && <LargeCard p={F} index={2 + P.length} reverse view={t.view} />}
        </div>
      </div>

      {/* ------------------------------------------------ Horizontal strip */}
      <div className="mt-20 md:mt-28">
        <div className="wrap flex items-end justify-between gap-6">
          <p className="t-meta text-ink-mute">{t.details}</p>
          <Link href="/portfolio/" className="link-cta group">
            {t.all} <span className="cta-arrow">↗</span>
          </Link>
        </div>
        <ul className={clsx(styles.strip, "mt-6")} aria-label={t.stripAria}>
          {strip.map((s, i) => {
            const p = projects[s.project];
            if (!p) return null;
            return (
              <li key={i} className={styles.stripItem}>
                <Link href={`/portfolio/${p.slug}/`} className="group block">
                  <div className="frame aspect-[4/5]">
                    <SmartImage src={cld(s.image, 900)} alt={`${p.title} — ${s.caption.toLowerCase()}`} sizes="(min-width:1024px) 22vw, 60vw" quality={64} />
                  </div>
                  <p className="mt-3 flex items-baseline justify-between gap-3 text-[13.5px]">
                    <span className="font-medium text-ink">{p.title}</span>
                    <span className="t-meta text-[9px] text-ink-mute">{s.caption}</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Meta({ p, index }: { p: FiProject; index: number }) {
  return (
    <p className="t-meta text-ink-mute">
      <span className="accent">{String(index).padStart(2, "0")}</span>
      <span className="mx-2 opacity-40">·</span>
      {shortIndustry(p)}
      <span className="mx-2 opacity-40">·</span>
      {p.year}
    </p>
  );
}

function LargeCard({ p, index, reverse, view }: { p: FiProject; index: number; reverse?: boolean; view: string }) {
  return (
    <article>
      <Link href={`/portfolio/${p.slug}/`} className="group grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
        <ClipReveal className={clsx("lg:col-span-8", reverse && "lg:order-2")}>
          <div className="frame aspect-[4/3] shadow-sm2 md:aspect-[16/10]">
            <SmartImage src={p.coverImage} alt={`${p.title} — ${p.headline}`} sizes="(min-width:1024px) 62vw, 92vw" quality={74} />
          </div>
        </ClipReveal>
        <div className={clsx("lg:col-span-4 lg:pb-4", reverse && "lg:order-1")}>
          <Meta p={p} index={index} />
          <h3 className="t-h2 mt-4 text-[clamp(30px,3.4vw,48px)] transition-colors duration-micro group-hover:text-brand-ink">
            {p.title}
          </h3>
          <p className="t-meta mt-4 text-[10px] text-ink-mute">{p.services}</p>
          <p className="t-body mt-5 max-w-[42ch] text-ink-2">{p.headline}</p>
          <span className="link-cta mt-7">
            {view} <span className="cta-arrow">↗</span>
          </span>
        </div>
      </Link>
    </article>
  );
}

function SmallCard({ p, index, offset, view }: { p: FiProject; index: number; offset?: boolean; view: string }) {
  return (
    <article className={clsx(offset && "md:mt-24")}>
      <Reveal>
        <Link href={`/portfolio/${p.slug}/`} className="group block">
          <div className="frame aspect-[4/5] shadow-sm2">
            <SmartImage src={p.coverImage} alt={`${p.title} — ${p.headline}`} sizes="(min-width:768px) 45vw, 92vw" quality={72} position="center" />
          </div>
          <div className="mt-6">
            <Meta p={p} index={index} />
            <h3 className="t-h3 mt-3 transition-colors duration-micro group-hover:text-brand-ink">{p.title}</h3>
            <p className="t-meta mt-3 text-[10px] text-ink-mute">{p.services}</p>
            <p className="t-body mt-4 max-w-[46ch] text-ink-2">{p.headline}</p>
            <span className="link-cta mt-6">
              {view} <span className="cta-arrow">↗</span>
            </span>
          </div>
        </Link>
      </Reveal>
    </article>
  );
}
