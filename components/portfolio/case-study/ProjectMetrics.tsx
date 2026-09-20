"use client";

import Reveal from "@/components/Reveal";
import type { ProjectStat } from "@/lib/projects";

type Props = {
  stats: ProjectStat[];
};

export default function ProjectMetrics({ stats }: Props) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-bg border-b border-line">
      <div className="wrap">
        <Reveal>
          <div className="flex items-center gap-3 mb-12 md:mb-16">
            <span className="eyebrow">Measurable Impact</span>
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
              / Verified Outcomes
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="flex flex-col border-l-2 border-brand-ink/40 pl-5 md:pl-7 group">
                <div className="t-numeral text-[clamp(44px,5.5vw,76px)] text-ink group-hover:text-brand-ink transition-colors duration-micro">
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] md:text-[12px] tracking-[0.18em] uppercase text-ink-2 mt-3 leading-[1.4]">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
