"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getServiceUrl } from "@/lib/service-links";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
};

export default function ProjectDossier({ project }: Props) {
  return (
    <section
      aria-label="Project Intelligence Dossier"
      className="py-14 md:py-20 bg-bg-warm border-y border-line"
    >
      <div className="wrap">
        <Reveal>
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <span className="w-2 h-2 rounded-full bg-brand-ink" />
            <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-mute">
              Project Dossier &amp; Intelligence
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-line/70">
          {/* Client */}
          <div className="pt-4 lg:pt-0 lg:pr-6">
            <Reveal delay={0}>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute mb-2">
                Client
              </div>
              <div className="font-display font-medium text-[17px] text-ink leading-[1.3]">
                {project.client ?? project.title}
              </div>
              {project.location && (
                <div className="text-[13px] text-ink-mute mt-1">
                  {project.location}
                </div>
              )}
            </Reveal>
          </div>

          {/* Industry */}
          <div className="pt-4 lg:pt-0 lg:px-6">
            <Reveal delay={1}>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute mb-2">
                Industry
              </div>
              <div className="font-display font-medium text-[17px] text-ink leading-[1.3]">
                {project.industry ?? project.overline}
              </div>
              {project.audienceTier && (
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-ink mt-1">
                  Tier: {project.audienceTier}
                </div>
              )}
            </Reveal>
          </div>

          {/* Year & Timeline */}
          <div className="pt-4 lg:pt-0 lg:px-6">
            <Reveal delay={1}>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute mb-2">
                Timeline
              </div>
              <div className="font-display font-medium text-[17px] text-ink leading-[1.3]">
                {project.year}
              </div>
              <div className="text-[13px] text-ink-mute mt-1">
                Completed &amp; Live
              </div>
            </Reveal>
          </div>

          {/* Services */}
          <div className="pt-4 lg:pt-0 lg:px-6 col-span-2 md:col-span-1 lg:col-span-1">
            <Reveal delay={2}>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute mb-2">
                Services
              </div>
              <ul className="flex flex-col gap-1 text-[13.5px] text-ink leading-[1.4]">
                {(project.services ?? project.tags ?? []).slice(0, 4).map((s) => {
                  const href = getServiceUrl(s);
                  return (
                    <li key={s}>
                      {href ? (
                        <Link
                          href={href}
                          className="hover:text-brand-ink transition-colors underline decoration-line/80 decoration-1 underline-offset-[3px] hover:decoration-brand-ink"
                        >
                          {s}
                        </Link>
                      ) : (
                        <span>{s}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          {/* Built With */}
          <div className="pt-4 lg:pt-0 lg:px-6 col-span-2 md:col-span-1 lg:col-span-1">
            <Reveal delay={2}>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute mb-2">
                Built With
              </div>
              {project.techStack && project.techStack.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span
                      key={tech.name}
                      className="px-2 py-0.5 rounded-md bg-white border border-line text-[11px] font-medium text-ink-2"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-[13px] text-ink-2">
                  Bespoke Studio Stack
                </div>
              )}
            </Reveal>
          </div>

          {/* Live Deployment */}
          <div className="pt-4 lg:pt-0 lg:pl-6">
            <Reveal delay={3}>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute mb-2">
                Deployment
              </div>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-display font-medium text-[16px] text-brand-ink hover:text-brand-deep transition-colors group"
                >
                  <span>Visit Live</span>
                  <span className="cta-arrow">↗</span>
                </a>
              ) : (
                <div className="font-mono text-[12px] text-ink-mute uppercase tracking-[0.14em]">
                  Private / In Production
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
