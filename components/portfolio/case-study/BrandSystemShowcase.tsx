"use client";

import Reveal from "@/components/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { VideoShowcase } from "@/components/VideoShowcase";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
};

export default function BrandSystemShowcase({ project }: Props) {
  const isBranding =
    project.tags?.some(
      (t) =>
        t.toLowerCase().includes("brand") ||
        t.toLowerCase().includes("logo"),
    ) ||
    project.services?.some(
      (s) =>
        s.toLowerCase().includes("brand") ||
        s.toLowerCase().includes("logo"),
    );

  if (!isBranding) return null;

  return (
    <section className="py-24 md:py-36 bg-bg-warm/80 border-b border-line">
      <div className="wrap">
        <div className="max-w-[860px] mb-16 md:mb-24">
          <Reveal>
            <span className="eyebrow text-brand-ink">Brand Architecture</span>
            <h2 className="t-h2 mt-4 text-[clamp(34px,4.5vw,60px)]">
              The complete visual{" "}
              <span className="t-italic accent-grad-text">identity system.</span>
            </h2>
            <p className="t-lead mt-6 text-ink-2 text-[clamp(17px,1.35vw,21px)]">
              From the core mark to digital collateral, social design templates, and promotional video — built as one coherent system.
            </p>
          </Reveal>
        </div>

        {/* ---------------- 01. Logo System Grid ---------------- */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-20 md:mb-28">
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-ink" />
                <span>Mark Variations &amp; Vector Lockups</span>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {project.gallery.slice(0, 4).map((img, i) => (
                <Reveal key={img} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-bg-paper border border-line shadow-sm2 group hover:-translate-y-1 transition-all duration-micro">
                    <div className="absolute inset-0 p-6 flex items-center justify-center">
                      <SmartImage
                        src={img}
                        alt={`${project.title} logo lockup ${i + 1}`}
                        sizes="(min-width:1024px) 300px, 50vw"
                        fit="contain"
                      />
                    </div>
                    <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-white font-mono text-[10px] tracking-[0.12em] uppercase">
                      Lockup 0{i + 1}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- 02. Social Creative System ---------------- */}
        {project.socialGallery && project.socialGallery.length > 0 && (
          <div className="mb-20 md:mb-28">
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-ink" />
                <span>Social Media &amp; Campaign Collateral</span>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {project.socialGallery.slice(0, 4).map((post, i) => (
                <Reveal key={post} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-bg-paper border border-line shadow-sm2 group">
                    <SmartImage
                      src={post}
                      alt={`${project.title} social post creative ${i + 1}`}
                      sizes="(min-width:1024px) 320px, 50vw"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- 03. Motion & Brand Films ---------------- */}
        {project.videos && project.videos.length > 0 && (
          <div className="mt-16">
            <VideoShowcase
              videos={project.videos}
              heading="Motion & Brand Film System"
              subheading={`Promotional films and brand motion directed and produced for ${project.client ?? project.title}.`}
            />
          </div>
        )}
      </div>
    </section>
  );
}
