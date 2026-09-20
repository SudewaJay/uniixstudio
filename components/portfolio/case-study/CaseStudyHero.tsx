"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/Reveal";
import type { Project } from "@/lib/projects";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type Props = {
  project: Project;
};

export default function CaseStudyHero({ project }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="pt-28 md:pt-36 pb-12 md:pb-20 bg-bg">
      <div className="wrap">
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line">
          <Reveal>
            <Link
              href="/portfolio/"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute hover:text-brand-ink transition-colors duration-micro"
            >
              <span className="text-brand-ink">←</span> Back to Work Archive
            </Link>
          </Reveal>

          <Reveal delay={1}>
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
              <span>{project.overline}</span>
              <span className="opacity-40">·</span>
              <span className="text-brand-ink">{project.year}</span>
            </div>
          </Reveal>
        </div>

        {/* Hero Title & Strategic Positioning */}
        <div className="mt-10 md:mt-14 max-w-[1100px]">
          <Reveal delay={1}>
            <span className="eyebrow text-brand-ink">Case Study</span>
            <h1 className="t-display mt-5 text-[clamp(40px,6.8vw,96px)]">
              {project.title}
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="t-lead mt-6 md:mt-8 max-w-[58ch] text-ink-2 text-[clamp(18px,1.5vw,24px)] leading-[1.45]">
              {project.headline}
            </p>
          </Reveal>
        </div>

        {/* Cinematic Hero Visual Frame */}
        {project.coverImage && (
          <div className="mt-12 md:mt-16">
            <Reveal delay={3}>
              <div className="relative aspect-[16/10] md:aspect-[21/10] w-full overflow-hidden rounded-2xl md:rounded-3xl bg-bg-warm border border-line shadow-lift">
                <motion.div
                  className="absolute inset-0"
                  initial={reduce ? undefined : { scale: 1.05 }}
                  animate={reduce ? undefined : { scale: 1 }}
                  transition={{ duration: 1.2, ease: EASE }}
                >
                  <SmartImage
                    src={project.coverImage}
                    alt={`${project.title} hero artwork`}
                    sizes="(min-width:1280px) 1280px, 100vw"
                    priority
                  />
                </motion.div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"
                />
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
