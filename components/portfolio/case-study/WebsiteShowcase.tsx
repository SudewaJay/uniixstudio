"use client";

import Reveal from "@/components/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import type { Project } from "@/lib/projects";

type Props = {
  project: Project;
};

export default function WebsiteShowcase({ project }: Props) {
  const isWeb =
    project.tags?.some(
      (t) =>
        t.toLowerCase().includes("web") ||
        t.toLowerCase().includes("wordpress") ||
        t.toLowerCase().includes("ui/ux") ||
        t.toLowerCase().includes("development"),
    ) ||
    project.services?.some(
      (s) =>
        s.toLowerCase().includes("web") ||
        s.toLowerCase().includes("development"),
    );

  if (!isWeb) return null;

  const screens = project.wireframes ?? [];
  const primaryScreen = screens[0]?.src ?? project.coverImage;
  const secondaryScreens = screens.slice(1, 4);

  return (
    <section className="py-24 md:py-36 bg-bg border-b border-line">
      <div className="wrap">
        <div className="max-w-[880px] mb-16 md:mb-24">
          <Reveal>
            <span className="eyebrow text-brand-ink">Digital Platform</span>
            <h2 className="t-h2 mt-4 text-[clamp(34px,4.5vw,60px)]">
              Engineered for conversion,{" "}
              <span className="t-italic accent-grad-text">built for scale.</span>
            </h2>
            <p className="t-lead mt-6 text-ink-2 text-[clamp(17px,1.35vw,21px)]">
              Every viewport structured around user intent — responsive navigation, clear informational hierarchy, and high-performance frontend engineering.
            </p>
          </Reveal>
        </div>

        {/* ---------------- 01. Desktop Browser Frame (Hero Screen) ---------------- */}
        <div className="mb-16 md:mb-24">
          <Reveal>
            <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-line bg-bg-paper shadow-lift">
              {/* Browser Chrome Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-bg-warm/80 border-b border-line select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>
                <div className="px-4 py-1 rounded-md bg-white border border-line font-mono text-[11px] text-ink-mute tracking-[0.08em] max-w-[320px] w-full text-center truncate">
                  {project.url ? project.url.replace(/^https?:\/\//, "") : `uniixstudio.com/work/${project.slug}`}
                </div>
                <div className="w-12 text-right font-mono text-[10px] text-ink-mute">
                  SSL ✓
                </div>
              </div>

              {/* Browser Screen Content */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-paper">
                <SmartImage
                  src={primaryScreen}
                  alt={`${project.title} — Primary Web Viewport`}
                  sizes="(min-width:1280px) 1280px, 100vw"
                />
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---------------- 02. Secondary Compositions & Detail Views ---------------- */}
        {secondaryScreens.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {secondaryScreens.map((screen, i) => (
              <Reveal key={screen.src} delay={(i % 3) as 0 | 1 | 2}>
                <div className="flex flex-col gap-3 group">
                  <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-bg-paper border border-line shadow-sm2 group-hover:shadow-soft transition-all duration-std">
                    <SmartImage
                      src={screen.src}
                      alt={screen.caption ?? `${project.title} viewport ${i + 2}`}
                      sizes="(min-width:1024px) 400px, 100vw"
                    />
                  </div>
                  {screen.caption && (
                    <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute pt-1">
                      <span>{screen.caption}</span>
                      <span className="text-brand-ink">0{i + 2}</span>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
