"use client";

import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/Reveal";
import type { Project } from "@/lib/projects";

type Props = {
  nextProject: Project;
  prevProject?: Project;
};

export default function NextProjectExhibition({
  nextProject,
  prevProject,
}: Props) {
  return (
    <section className="py-24 md:py-36 bg-bg border-b border-line overflow-hidden">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 border-b border-line pb-6">
          <Reveal>
            <span className="eyebrow text-brand-ink">Continue Exploring</span>
          </Reveal>
          <Reveal delay={1}>
            <Link
              href="/portfolio/"
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute hover:text-brand-ink transition-colors"
            >
              View Full Archive ↗
            </Link>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-[1fr_1.6fr] gap-8 items-stretch">
          {/* Optional Previous Small Card (or Studio Dossier pill) */}
          {prevProject ? (
            <Reveal>
              <Link
                href={`/portfolio/${prevProject.slug}/`}
                className="group flex flex-col justify-between h-full p-8 rounded-3xl bg-bg-warm border border-line hover:shadow-soft transition-all duration-std"
              >
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute mb-3">
                    <span>← Previous Project</span>
                  </div>
                  <h3 className="font-display font-medium text-[24px] text-ink group-hover:text-brand-ink transition-colors">
                    {prevProject.title}
                  </h3>
                  <p className="text-[14px] text-ink-2 mt-2 line-clamp-2">
                    {prevProject.headline}
                  </p>
                </div>
                <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-ink">
                  Open case study ←
                </div>
              </Link>
            </Reveal>
          ) : (
            <Reveal>
              <div className="flex flex-col justify-between h-full p-8 rounded-3xl bg-bg-warm border border-line">
                <div>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-ink">
                    Studio Direction
                  </span>
                  <h3 className="font-display font-medium text-[24px] text-ink mt-3">
                    Independent Digital Product Studio
                  </h3>
                  <p className="text-[14px] text-ink-2 mt-3 leading-[1.6]">
                    Every project in this archive represents direct senior involvement, custom engineering, and zero template reliance.
                  </p>
                </div>
                <Link
                  href="/services/"
                  className="mt-8 font-mono text-[11px] tracking-[0.16em] uppercase text-brand-ink hover:underline"
                >
                  Our Service Pillars →
                </Link>
              </div>
            </Reveal>
          )}

          {/* Next Curated Lead Project (Large Visual Card) */}
          <Reveal delay={1}>
            <Link
              href={`/portfolio/${nextProject.slug}/`}
              className="group relative block overflow-hidden rounded-3xl border border-line bg-bg-ink text-white shadow-lift hover:shadow-2xl transition-all duration-std"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04]">
                  <SmartImage
                    src={nextProject.coverImage}
                    alt={nextProject.title}
                    sizes="(min-width:768px) 60vw, 100vw"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 font-mono text-[11px] tracking-[0.18em] uppercase text-brand-2">
                      Next Case Study →
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/70">
                      {nextProject.year}
                    </span>
                  </div>

                  <div>
                    <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-2 mb-2">
                      {nextProject.overline}
                    </div>
                    <h2 className="t-h2 text-white group-hover:translate-x-2 transition-transform duration-micro ease-uniix text-[clamp(28px,3.5vw,46px)]">
                      {nextProject.title}
                    </h2>
                    <p className="t-body text-white/80 mt-2 max-w-[44ch] line-clamp-2">
                      {nextProject.headline}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
