import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import SmartImage from "../ui/SmartImage";
import type { FiProjects } from "./types";
import { cld, isFinlandPlaceholder } from "@/lib/finland";
import type { FinlandContent } from "@/lib/finland-i18n";

/**
 * 09 — About Uniix. Introduced only after the work has made the case.
 * No headcount, client counts or superlatives — just what the studio does,
 * who leads it, and frames from real projects (captioned with the project).
 */
export default function FinlandAbout({ projects, c }: { projects: FiProjects; c: FinlandContent }) {
  const f = c.founder;
  const t = c.t.about;
  const finlandStudioFrames = c.studioFrames;
  const initial = isFinlandPlaceholder(f.name) ? "U" : f.name.charAt(0).toUpperCase();

  return (
    <section id="about" aria-labelledby="fi-about-heading" className="section bg-bg-paper border-t border-line-soft">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <Reveal>
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 id="fi-about-heading" className="t-h2 mt-5">
              {t.title[0]}
              <br />
              <span className="t-italic accent-grad-text">{t.title[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead mt-7 max-w-[48ch] text-ink-2">
              {t.lead}
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-10 flex items-center gap-5 rounded-xl2 border border-line bg-bg p-5">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-bg-ink">
                {f.portrait ? (
                  <SmartImage src={f.portrait} alt={`${f.name}, ${f.role}`} sizes="80px" quality={75} />
                ) : (
                  <span aria-hidden="true" className="grid h-full w-full place-items-center font-display text-[30px] font-medium text-white">
                    {initial}
                  </span>
                )}
              </div>
              <div>
                <p className="t-meta text-[10px] accent">{f.role}</p>
                <p className="mt-1 font-display text-[20px] font-medium tracking-[-0.02em]">{f.name}</p>
                <p className="mt-1 max-w-[46ch] text-[13.5px] leading-[1.5] text-ink-mute">{f.bio}</p>
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-sm2 border border-line bg-line">
              <div className="bg-bg-paper p-4">
                <dt className="t-meta text-[10px] text-ink-mute">{t.disciplines}</dt>
                <dd className="mt-1 text-[14.5px] font-medium">{t.disciplinesValue}</dd>
              </div>
              <div className="bg-bg-paper p-4">
                <dt className="t-meta text-[10px] text-ink-mute">{t.workingWith}</dt>
                <dd className="mt-1 text-[14.5px] font-medium">{t.workingWithValue}</dd>
              </div>
            </dl>

            <Link href="/about/" className="link-cta group mt-8">
              {t.more} <span className="cta-arrow">↗</span>
            </Link>
          </Reveal>
        </div>

        {/* Frames from real projects */}
        <div className="grid grid-cols-2 gap-4 self-center md:gap-5">
          {finlandStudioFrames.map((fr, i) => {
            const p = projects[fr.project];
            if (!p) return null;
            return (
              <Reveal key={i} delay={(i % 3) as 0 | 1 | 2} className={clsx(i === 0 && "col-span-2")}>
                <Link href={`/portfolio/${p.slug}/`} className="group block">
                  <div className={clsx("frame", i === 0 ? "aspect-[16/9]" : "aspect-[4/5]")}>
                    <SmartImage
                      src={fr.image === "cover" ? p.coverImage : cld(fr.image, 1200)}
                      alt={`${p.title} — ${fr.caption.toLowerCase()}`}
                      sizes={i === 0 ? "(min-width:1024px) 42vw, 92vw" : "(min-width:1024px) 21vw, 46vw"}
                      quality={66}
                    />
                  </div>
                  <p className="mt-2.5 text-[12.5px] text-ink-mute">
                    {fr.caption} · <span className="text-ink">{p.title}</span>
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
