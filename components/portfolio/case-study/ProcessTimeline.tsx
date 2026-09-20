"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";

type Stage = {
  num: string;
  title: string;
  summary: string;
  deliverables: string[];
};

const DEFAULT_STAGES: Stage[] = [
  {
    num: "01",
    title: "Discover",
    summary:
      "Deep-dive alignment workshops to audit existing analytics, interview key stakeholders, and define quantifiable criteria for project success.",
    deliverables: [
      "Stakeholder interviews",
      "Competitive gap analysis",
      "Technical audit",
      "Success metrics roadmap",
    ],
  },
  {
    num: "02",
    title: "Define",
    summary:
      "Synthesizing customer mental models into information architecture, taxonomy, content blueprints, and high-intent query maps.",
    deliverables: [
      "Information architecture",
      "Customer journey mapping",
      "Content strategy blueprint",
      "Search-intent taxonomy",
    ],
  },
  {
    num: "03",
    title: "Design",
    summary:
      "Architecting the visual direction — typography hierarchy, spatial systems, interactive states, and design tokens across every viewport.",
    deliverables: [
      "Design token architecture",
      "Interactive UI prototypes",
      "Responsive wireframes",
      "Design guidelines manual",
    ],
  },
  {
    num: "04",
    title: "Build",
    summary:
      "Engineering clean, performant frontend code with React, Next.js, and TypeScript, backed by semantic SEO schemas and accessibility standards.",
    deliverables: [
      "Next.js App Router codebase",
      "Semantic HTML & ARIA audit",
      "Schema.org structured data",
      "Core Web Vitals tuning",
    ],
  },
  {
    num: "05",
    title: "Launch",
    summary:
      "Rigorous pre-flight quality assurance, analytics tracking verification, zero-downtime deployment, and ongoing organic search monitoring.",
    deliverables: [
      "Production deployment",
      "Search Console verification",
      "Conversion tracking test",
      "Post-launch telemetry",
    ],
  },
];

export default function ProcessTimeline({
  stages = DEFAULT_STAGES,
}: {
  stages?: Stage[];
}) {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section className="py-24 md:py-36 bg-bg border-b border-line">
      <div className="wrap">
        <div className="max-w-[880px] mb-14 md:mb-20">
          <Reveal>
            <span className="eyebrow text-brand-ink">Delivery Framework</span>
            <h2 className="t-h2 mt-4 text-[clamp(34px,4.5vw,60px)]">
              From brief to release:{" "}
              <span className="t-italic accent-grad-text">how we build.</span>
            </h2>
            <p className="t-lead mt-6 text-ink-2 text-[clamp(17px,1.35vw,21px)]">
              A disciplined, transparent production process ensuring zero ambiguity and measurable return on investment at every milestone.
            </p>
          </Reveal>
        </div>

        {/* ---------------- Desktop: Horizontal Stage Navigator ---------------- */}
        <div className="hidden lg:block">
          <Reveal>
            {/* Timeline Progress Bar */}
            <div className="grid grid-cols-5 border-b border-line pb-4 mb-10">
              {stages.map((stage, idx) => {
                const isActive = activeStage === idx;
                return (
                  <button
                    key={stage.num}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className="text-left group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-[12px] tracking-[0.2em] font-semibold transition-colors ${
                          isActive ? "text-brand-ink" : "text-ink-mute"
                        }`}
                      >
                        {stage.num}
                      </span>
                      <div
                        className={`h-0.5 flex-1 transition-colors ${
                          isActive ? "bg-brand-ink" : "bg-line group-hover:bg-ink/30"
                        }`}
                      />
                    </div>
                    <div
                      className={`font-display font-medium text-[20px] mt-3 transition-colors ${
                        isActive ? "text-ink" : "text-ink-mute group-hover:text-ink"
                      }`}
                    >
                      {stage.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Details Panel */}
            <div className="p-10 md:p-12 rounded-3xl bg-bg-warm border border-line grid grid-cols-[1.4fr_1fr] gap-12 items-center">
              <div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-ink mb-3">
                  Stage {stages[activeStage].num} Focus
                </div>
                <h3 className="font-display font-medium text-[32px] text-ink">
                  {stages[activeStage].title} Phase
                </h3>
                <p className="t-lead mt-4 text-ink-2 max-w-[50ch]">
                  {stages[activeStage].summary}
                </p>
              </div>

              <div className="bg-bg-paper p-8 rounded-2xl border border-line">
                <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute mb-4">
                  Phase Deliverables
                </div>
                <ul className="flex flex-col gap-2.5">
                  {stages[activeStage].deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-3 text-[14.5px] text-ink"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-ink" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------- Mobile: Vertical Stepper ---------------- */}
        <div className="lg:hidden flex flex-col gap-6">
          {stages.map((stage, idx) => (
            <Reveal key={stage.num} delay={(idx % 3) as 0 | 1 | 2}>
              <div className="p-6 rounded-2xl bg-bg-warm border border-line">
                <div className="flex items-center gap-2 font-mono text-[11px] text-brand-ink mb-2">
                  <span>{stage.num}</span>
                  <span className="opacity-40">/</span>
                  <span className="uppercase tracking-[0.16em]">Phase</span>
                </div>
                <h3 className="font-display font-medium text-[22px] text-ink">
                  {stage.title}
                </h3>
                <p className="text-[15px] text-ink-2 mt-2 leading-[1.6]">
                  {stage.summary}
                </p>
                <div className="mt-4 pt-4 border-t border-line">
                  <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-mute mb-2">
                    Key Outputs
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {stage.deliverables.map((d) => (
                      <li
                        key={d}
                        className="px-2.5 py-1 rounded-md bg-white border border-line text-[12px] text-ink-2"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
