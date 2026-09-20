"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
};

export default function ArchiveDirectoryTable({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="t-h3 text-ink">No projects match the selected criteria.</p>
        <p className="t-body mt-3 text-ink-mute">
          Try resetting the discipline or audience tier filter.
        </p>
      </div>
    );
  }

  return (
    <section className="wrap py-16 md:py-24">
      <Reveal>
        <div className="overflow-x-auto border-t border-line">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-line text-ink-mute font-mono text-[11px] tracking-[0.2em] uppercase">
                <th className="py-5 pr-4 font-normal w-16">No.</th>
                <th className="py-5 px-4 font-normal">Project / Client</th>
                <th className="py-5 px-4 font-normal">Year</th>
                <th className="py-5 px-4 font-normal">Discipline</th>
                <th className="py-5 px-4 font-normal">Industry</th>
                <th className="py-5 pl-4 font-normal text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/80 font-sans">
              {projects.map((project, i) => (
                <tr
                  key={project.slug}
                  className="group hover:bg-bg-warm/60 transition-colors duration-micro cursor-pointer"
                >
                  <td className="py-6 pr-4 font-mono text-[12px] text-brand-ink">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <td className="py-6 px-4">
                    <Link
                      href={`/portfolio/${project.slug}/`}
                      className="font-display font-medium text-[19px] text-ink group-hover:text-brand-ink group-hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-micro"
                    >
                      {project.title}
                    </Link>
                    <div className="text-[13px] text-ink-mute mt-1 max-w-[40ch] line-clamp-1">
                      {project.summary}
                    </div>
                  </td>
                  <td className="py-6 px-4 font-mono text-[12px] text-ink-mute whitespace-nowrap">
                    {project.year}
                  </td>
                  <td className="py-6 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full border border-line text-[11px] font-medium text-ink-2 bg-bg-paper whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-6 px-4 text-[14px] text-ink-2 whitespace-nowrap">
                    {project.industry ?? project.overline}
                  </td>
                  <td className="py-6 pl-4 text-right whitespace-nowrap">
                    <Link
                      href={`/portfolio/${project.slug}/`}
                      className="inline-flex items-center gap-1 font-mono text-[11px] tracking-[0.14em] uppercase text-ink group-hover:text-brand-ink group-hover:gap-2 transition-all duration-micro"
                    >
                      <span>Open</span>
                      <span className="cta-arrow">↗</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
