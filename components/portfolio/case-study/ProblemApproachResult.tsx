"use client";

import Reveal from "@/components/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
};

export default function ProblemApproachResult({ project }: Props) {
  const { problem, solution, result, coverImage, contentBlocks, gallery } =
    project;

  if (!problem && !solution && !result) return null;

  // Visual cues from project content
  const visual1 =
    contentBlocks?.[0]?.image ?? gallery?.[0] ?? coverImage;
  const visual2 =
    contentBlocks?.[1]?.image ?? gallery?.[1] ?? gallery?.[0];

  return (
    <section className="py-24 md:py-36 bg-bg-warm/60 border-b border-line">
      <div className="wrap">
        <div className="max-w-[900px] mb-16 md:mb-24">
          <Reveal>
            <span className="eyebrow text-brand-ink">Strategic Arc</span>
            <h2 className="t-h2 mt-4 text-[clamp(34px,4.5vw,60px)]">
              From business friction to{" "}
              <span className="t-italic accent-grad-text">measurable scale.</span>
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-24 md:gap-36">
          {/* 01. THE PROBLEM */}
          {problem && (
            <article className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
              <div>
                <Reveal>
                  <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-brand-ink mb-4">
                    <span>01</span>
                    <span className="opacity-40">/</span>
                    <span>The Challenge</span>
                  </div>
                  <h3 className="t-h3 text-[clamp(24px,2.6vw,38px)] leading-[1.25]">
                    {problem}
                  </h3>
                </Reveal>

                {project.narrative?.[0]?.kind === "brief" && (
                  <Reveal delay={1}>
                    <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6">
                      {project.narrative[0].problems.map((p, idx) => (
                        <div key={p.title} className="flex gap-4 items-start">
                          <span className="font-mono text-[11px] text-brand-ink pt-0.5">
                            0{idx + 1}
                          </span>
                          <div>
                            <div className="font-medium text-ink text-[15px]">
                              {p.title}
                            </div>
                            <div className="text-[14px] text-ink-2 mt-0.5">
                              {p.body}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                )}
              </div>

              {visual1 && (
                <Reveal delay={2}>
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-bg-paper border border-line shadow-lift">
                    <SmartImage
                      src={visual1}
                      alt={`${project.title} — Challenge context`}
                      sizes="(min-width:1024px) 50vw, 100vw"
                    />
                  </div>
                </Reveal>
              )}
            </article>
          )}

          {/* 02. THE APPROACH */}
          {solution && (
            <article className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
              {visual2 && (
                <div className="order-2 lg:order-1">
                  <Reveal>
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-bg-paper border border-line shadow-lift">
                      <SmartImage
                        src={visual2}
                        alt={`${project.title} — Strategic execution`}
                        sizes="(min-width:1024px) 50vw, 100vw"
                      />
                    </div>
                  </Reveal>
                </div>
              )}

              <div className="order-1 lg:order-2">
                <Reveal delay={1}>
                  <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-brand-ink mb-4">
                    <span>02</span>
                    <span className="opacity-40">/</span>
                    <span>The Solution</span>
                  </div>
                  <h3 className="t-h3 text-[clamp(24px,2.6vw,38px)] leading-[1.25]">
                    {solution}
                  </h3>
                </Reveal>

                {project.deliverables && (
                  <Reveal delay={2}>
                    <div className="mt-8 pt-6 border-t border-line">
                      <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute mb-3">
                        Architected Deliverables
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {project.deliverables.slice(0, 5).map((d) => (
                          <li
                            key={d}
                            className="px-3 py-1.5 rounded-full bg-white border border-line text-[13px] text-ink-2"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )}
              </div>
            </article>
          )}

          {/* 03. THE RESULT */}
          {result && (
            <article className="max-w-[1000px] mx-auto text-center py-8">
              <Reveal>
                <div className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-brand-ink mb-4">
                  <span>03</span>
                  <span className="opacity-40">/</span>
                  <span>The Outcome</span>
                </div>
                <h3 className="t-h2 text-[clamp(28px,3.8vw,52px)] max-w-[48ch] mx-auto leading-[1.2]">
                  {result}
                </h3>
              </Reveal>

              {project.testimonial && (
                <Reveal delay={1}>
                  <div className="mt-12 p-8 md:p-12 rounded-3xl bg-bg-paper border border-line shadow-soft max-w-[800px] mx-auto text-left">
                    <p className="font-display text-[clamp(18px,1.8vw,26px)] leading-[1.4] text-ink italic-display">
                      &ldquo;{project.testimonial.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                      <span className="text-ink font-semibold">
                        {project.testimonial.name}
                      </span>
                      <span>·</span>
                      <span>{project.testimonial.role}</span>
                    </div>
                  </div>
                </Reveal>
              )}
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
