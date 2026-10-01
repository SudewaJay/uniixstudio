"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/Reveal";
import type { Project } from "@/lib/projects";

type Props = {
  projects: Project[];
};

export default function EditorialProjectFeed({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="t-h3 text-ink">No projects match the selected criteria.</p>
        <p className="t-body mt-3 text-ink-mute">
          Try clearing filters to explore the complete studio archive.
        </p>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24 flex flex-col gap-24 md:gap-36">
      {projects.map((project, index) => {
        // Map projects to their unique visual composition
        switch (project.slug) {
          case "cricbook":
            return (
              <FlagshipProductStory
                key={project.slug}
                project={project}
                index={index}
                total={projects.length}
              />
            );
          case "bilesma-natural":
            return (
              <PackagingStory
                key={project.slug}
                project={project}
                index={index}
                total={projects.length}
              />
            );
          case "rentmycar-lk":
            return (
              <FullBleedLeadStory
                key={project.slug}
                project={project}
                index={index}
              />
            );
          case "st-lukes-medilab":
            return (
              <SplitDossierStory
                key={project.slug}
                project={project}
                index={index}
                total={projects.length}
              />
            );
          case "ecowave-energy":
            return (
              <BrandSystemStory
                key={project.slug}
                project={project}
                index={index}
                total={projects.length}
              />
            );
          case "sierra-energy-solutions":
            return (
              <CampaignGridStory
                key={project.slug}
                project={project}
                index={index}
                total={projects.length}
              />
            );
          case "zerro":
            return (
              <TechBrandStory
                key={project.slug}
                project={project}
                index={index}
              />
            );
          case "wasana":
            return (
              <MobileProductStory
                key={project.slug}
                project={project}
                index={index}
              />
            );
          case "coventry":
            return (
              <CorporatePrestigeStory
                key={project.slug}
                project={project}
                index={index}
              />
            );
          case "terraflow":
            return (
              <ClimateTechStory
                key={project.slug}
                project={project}
                index={index}
              />
            );
          default:
            return (
              <DefaultEditorialStory
                key={project.slug}
                project={project}
                index={index}
              />
            );
        }
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HOVER CARD CONTAINER HELPER                                                */
/* -------------------------------------------------------------------------- */

function ProjectCardShell({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link
      ref={containerRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-4 rounded-2xl transition-all duration-std ${className}`}
    >
      {children}

      {/* Floating Cursor Badge (Desktop only) */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-30 hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink/90 text-white font-mono text-[11px] tracking-[0.16em] uppercase backdrop-blur-md shadow-lift border border-white/15"
          initial={false}
          animate={{
            x: mousePos.x + 16,
            y: mousePos.y + 16,
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.85,
          }}
          transition={{
            type: "spring",
            damping: 24,
            stiffness: 280,
            mass: 0.2,
          }}
        >
          <span>View Case</span>
          <span className="text-brand-2">↗</span>
        </motion.div>
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* 00. FLAGSHIP PRODUCT STORY (CricBook)                                      */
/* -------------------------------------------------------------------------- */

function FlagshipProductStory({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <section className="wrap">
      <Reveal>
        <ProjectCardShell href={`/portfolio/${project.slug}/`}>
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-[#15103F] text-white border border-white/10 shadow-lift">
            <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)]">
              {/* Narrative */}
              <div className="order-2 lg:order-1 flex flex-col justify-between gap-10 p-6 sm:p-10 lg:p-12">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#22E0A0] text-[#06302A] font-mono text-[10px] tracking-[0.18em] uppercase">
                      Flagship
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/60">
                      {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} · {project.year}
                    </span>
                  </div>
                  <h2 className="t-h2 mt-6 text-white group-hover:translate-x-1 transition-transform duration-micro ease-uniix text-[clamp(38px,4.6vw,64px)]">
                    {project.title}
                  </h2>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-[#22E0A0]">
                    {project.overline}
                  </p>
                  <p className="t-lead mt-6 text-white/80 max-w-[46ch]">{project.summary}</p>
                </div>

                <div>
                  {project.tags && project.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2" aria-label="Services">
                      {project.tags.map((t) => (
                        <li
                          key={t}
                          className="px-3 py-1 rounded-full bg-white/[.07] text-white/85 text-[12px] font-medium border border-white/10"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-8 inline-flex items-center gap-2 font-display text-[16px] font-medium text-[#22E0A0] group-hover:gap-3 transition-all duration-micro">
                    Explore the product case study <span className="cta-arrow">↗</span>
                  </span>
                </div>
              </div>

              {/* Visual */}
              <div className="order-1 lg:order-2 relative aspect-[16/10] lg:aspect-auto lg:min-h-[520px] overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.03]">
                  <SmartImage
                    src={project.coverImage}
                    alt={`${project.title} — sports booking platform on desktop and mobile`}
                    sizes="(min-width:1280px) 760px, (min-width:1024px) 60vw, 100vw"
                    priority={index === 0}
                    position="left center"
                  />
                </div>
              </div>
            </div>
          </div>
        </ProjectCardShell>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 01. FULL-WIDTH CINEMATIC LEAD STORY (RentMyCar.lk)                        */
/* -------------------------------------------------------------------------- */

function FullBleedLeadStory({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <section className="wrap">
      <Reveal>
        <ProjectCardShell href={`/portfolio/${project.slug}/`}>
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-bg-ink text-white border border-white/10 shadow-lift">
            {/* Visual Frame */}
            <div className="relative aspect-[16/10] md:aspect-[21/10] w-full overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.035]">
                <SmartImage
                  src={project.coverImage}
                  alt={`${project.title} — ${project.headline}`}
                  sizes="(min-width:1280px) 1280px, 100vw"
                  priority={index === 0}
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-bg-ink via-bg-ink/40 to-transparent"
              />

              {/* Top Floating Badge */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 font-mono text-[11px] tracking-[0.18em] uppercase text-brand-2">
                  Featured Case {String(index + 1).padStart(2, "0")}
                </span>
                <span className="hidden sm:inline-block font-mono text-[11px] tracking-[0.18em] uppercase text-white/70">
                  {project.year} · Sri Lanka
                </span>
              </div>
            </div>

            {/* Content Bottom Panel */}
            <div className="relative p-6 sm:p-8 md:p-12 lg:p-14 -mt-16 md:-mt-24 z-10">
              <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-end">
                <div>
                  <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-brand-2 mb-3">
                    {project.overline}
                  </div>
                  <h2 className="t-h2 text-white group-hover:translate-x-1 transition-transform duration-micro ease-uniix text-[clamp(32px,4vw,56px)]">
                    {project.title}
                  </h2>
                  <p className="t-lead text-white/80 mt-4 max-w-[54ch]">
                    {project.headline}
                  </p>
                </div>

                <div className="flex flex-col gap-6 lg:items-end">
                  {project.tags && project.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2 lg:justify-end">
                      {project.tags.slice(0, 4).map((t) => (
                        <li
                          key={t}
                          className="px-3 py-1 rounded-full bg-white/10 text-white/85 text-[12px] font-medium border border-white/10"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="inline-flex items-center gap-2 font-display text-[16px] font-medium text-brand-2 group-hover:gap-3 transition-all duration-micro">
                    Explore full marketplace dossier <span className="cta-arrow">↗</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ProjectCardShell>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 02. SPLIT DOSSIER STORY (St Luke's Medical Laboratory)                      */
/* -------------------------------------------------------------------------- */

function SplitDossierStory({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <section className="wrap">
      <Reveal>
        <ProjectCardShell href={`/portfolio/${project.slug}/`}>
          <div className="grid lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] gap-10 lg:gap-14 items-center bg-bg-warm border border-line rounded-2xl md:rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-soft transition-all duration-std">
            {/* Left Narrative Column */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-ink">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="text-ink-mute/40">·</span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                  {project.industry ?? "Healthcare"}
                </span>
              </div>

              <h2 className="t-h2 mt-4 text-[clamp(30px,3.6vw,50px)] group-hover:translate-x-1 transition-transform duration-micro ease-uniix">
                {project.title}
              </h2>

              <p className="t-lead mt-5 text-ink-2 max-w-[48ch]">
                {project.summary}
              </p>

              {/* Live Metric Pills */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-line">
                <div>
                  <div className="t-numeral text-[28px] text-brand-ink">24h</div>
                  <div className="t-meta text-ink-mute text-[10px] mt-1">
                    Report Turnaround
                  </div>
                </div>
                <div>
                  <div className="t-numeral text-[28px] text-brand-ink">500+</div>
                  <div className="t-meta text-ink-mute text-[10px] mt-1">
                    Partner Doctors
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <span className="link-cta group-hover:text-brand-ink">
                  Read clinical case study <span className="cta-arrow">↗</span>
                </span>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl md:rounded-2xl bg-bg-paper shadow-lift border border-line">
              <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04]">
                <SmartImage
                  src={project.coverImage}
                  alt={`${project.title} — Interface`}
                  sizes="(min-width:1024px) 55vw, 100vw"
                />
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-md bg-white/90 backdrop-blur-sm border border-line font-mono text-[10px] tracking-[0.16em] uppercase text-ink">
                Clinical Web Platform
              </div>
            </div>
          </div>
        </ProjectCardShell>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 03. BRAND SYSTEM STORY (EcoWave Energy)                                    */
/* -------------------------------------------------------------------------- */

function BrandSystemStory({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <section className="wrap">
      <Reveal>
        <ProjectCardShell href={`/portfolio/${project.slug}/`}>
          <div className="grid lg:grid-cols-[minmax(0,55%)_minmax(0,45%)] gap-10 lg:gap-14 items-center bg-bg-paper border border-line rounded-2xl md:rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-soft transition-all duration-std">
            {/* Visual Brandmark Column */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl md:rounded-2xl bg-[#017B7C] shadow-sm2">
              <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04]">
                <SmartImage
                  src={project.coverImage}
                  alt={`${project.title} — Visual Identity`}
                  sizes="(min-width:1024px) 55vw, 100vw"
                />
              </div>

              {/* Floating Swatches Detail */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                <span
                  className="w-5 h-5 rounded-full border border-white/30"
                  style={{ backgroundColor: "#017B7C" }}
                  title="EcoWave Teal"
                />
                <span
                  className="w-5 h-5 rounded-full border border-white/30"
                  style={{ backgroundColor: "#F9CB00" }}
                  title="Solar Yellow"
                />
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/80 pr-2">
                  System Tokens
                </span>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-ink">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="text-ink-mute/40">·</span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                  Clean Tech &amp; Motion
                </span>
              </div>

              <h2 className="t-h2 mt-4 text-[clamp(30px,3.6vw,50px)] group-hover:translate-x-1 transition-transform duration-micro ease-uniix">
                {project.title}
              </h2>

              <p className="t-lead mt-5 text-ink-2 max-w-[46ch]">
                {project.summary}
              </p>

              {/* Deliverables tags */}
              {project.deliverables && (
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.deliverables.slice(0, 3).map((d) => (
                    <span
                      key={d}
                      className="px-3 py-1 rounded-full border border-line text-[12px] text-ink-2 bg-bg-warm"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <span className="link-cta group-hover:text-brand-ink">
                  View identity system &amp; brand films <span className="cta-arrow">↗</span>
                </span>
              </div>
            </div>
          </div>
        </ProjectCardShell>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* PACKAGING BEFORE / AFTER (Bilesma Natural)                                 */
/* -------------------------------------------------------------------------- */

function PackagingStory({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <section className="wrap">
      <Reveal>
        <ProjectCardShell href={`/portfolio/${project.slug}/`}>
          <div className="grid lg:grid-cols-[minmax(0,45%)_minmax(0,55%)] gap-10 lg:gap-14 items-center bg-bg-paper border border-line rounded-2xl md:rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-soft transition-all duration-std">
            <div className="flex flex-col lg:order-1 order-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-ink">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <span className="text-ink-mute/40">·</span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                  Beauty &amp; Packaging
                </span>
              </div>

              <h2 className="t-h2 mt-4 text-[clamp(30px,3.6vw,50px)] group-hover:translate-x-1 transition-transform duration-micro ease-uniix">
                {project.title}
              </h2>

              <p className="t-lead mt-5 text-ink-2 max-w-[46ch]">{project.headline}</p>

              {project.tags && (
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full border border-line text-[12px] text-ink-2 bg-bg-warm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <span className="link-cta group-hover:text-brand-ink">
                  See the before &amp; after <span className="cta-arrow">↗</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-[0.8fr_1.2fr] gap-3 md:gap-4 lg:order-2 order-1">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl md:rounded-2xl bg-white border border-line">
                <div className="absolute inset-[8%]">
                  <SmartImage
                    src="/portfolio/bilesma/old-kraft-bag.webp"
                    alt="Bilesma Natural kraft bag before the redesign"
                    sizes="(min-width:1024px) 20vw, 40vw"
                    fit="contain"
                  />
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-[#7A5A3A] px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] uppercase text-white">
                  Before
                </span>
              </div>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl md:rounded-2xl bg-[#1F3A2B]">
                <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04]">
                  <SmartImage
                    src="/portfolio/bilesma/bag-tagline-monstera.webp"
                    alt="Bilesma Natural redesigned botanical carry bag"
                    sizes="(min-width:1024px) 30vw, 58vw"
                  />
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-[#6A9670] px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] uppercase text-white">
                  After
                </span>
              </div>
            </div>
          </div>
        </ProjectCardShell>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 04. CREATIVE CAMPAIGN GRID (Sierra Energy Solutions)                       */
/* -------------------------------------------------------------------------- */

function CampaignGridStory({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  return (
    <section className="wrap">
      <Reveal>
        <ProjectCardShell href={`/portfolio/${project.slug}/`}>
          <div className="bg-gradient-to-br from-[#0B5FA5]/10 via-bg-warm to-bg-paper border border-line rounded-2xl md:rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-soft transition-all duration-std">
            <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-ink">
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <span className="text-ink-mute/40">·</span>
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                    Occasion Marketing
                  </span>
                </div>

                <h2 className="t-h2 mt-4 text-[clamp(28px,3.4vw,48px)] group-hover:translate-x-1 transition-transform duration-micro ease-uniix">
                  {project.title}
                </h2>

                <p className="t-lead mt-5 text-ink-2 max-w-[48ch]">
                  {project.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono uppercase tracking-[0.14em]">
                    Bilingual · English &amp; Sinhala
                  </span>
                  <span className="px-3 py-1 rounded-full border border-line text-[11px] font-mono uppercase tracking-[0.14em] text-ink-mute">
                    7 Campaign Creatives
                  </span>
                </div>

                <div className="mt-8">
                  <span className="link-cta group-hover:text-brand-ink">
                    Explore occasion campaign <span className="cta-arrow">↗</span>
                  </span>
                </div>
              </div>

              {/* Multi-Post Collage Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl md:rounded-2xl shadow-lift border border-line bg-bg-warm">
                <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04]">
                  <SmartImage
                    src={project.coverImage}
                    alt={`${project.title} — Campaign Creative`}
                    sizes="(min-width:1024px) 60vw, 100vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </ProjectCardShell>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 05. TECH BRAND STORY (Zerro)                                               */
/* -------------------------------------------------------------------------- */

function TechBrandStory({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <section className="wrap">
      <Reveal>
        <ProjectCardShell href={`/portfolio/${project.slug}/`}>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center bg-bg-ink text-white border border-white/10 rounded-2xl md:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lift">
            <div>
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-brand-2 mb-3">
                {String(index + 1).padStart(2, "0")} · {project.overline}
              </div>
              <h2 className="t-h2 text-white group-hover:translate-x-1 transition-transform duration-micro ease-uniix text-[clamp(30px,3.6vw,48px)]">
                {project.title}
              </h2>
              <p className="t-lead text-white/80 mt-4 max-w-[48ch]">
                {project.summary}
              </p>
              <div className="mt-8">
                <span className="link-cta text-white border-white/30 group-hover:text-brand-2 group-hover:border-brand-2">
                  View tech identity system <span className="cta-arrow">↗</span>
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl md:rounded-2xl border border-white/15 shadow-sm2">
              <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04]">
                <SmartImage
                  src={project.coverImage}
                  alt={`${project.title} — Identity System`}
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </ProjectCardShell>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 06. MOBILE PRODUCT STORY (Wasana Drivers)                                  */
/* -------------------------------------------------------------------------- */

function MobileProductStory({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <section className="wrap">
      <Reveal>
        <ProjectCardShell href={`/portfolio/${project.slug}/`}>
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center bg-bg-warm border border-line rounded-2xl md:rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-soft transition-all duration-std">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl md:rounded-2xl bg-bg-paper border border-line shadow-sm2 order-2 lg:order-1">
              <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04]">
                <SmartImage
                  src={project.coverImage}
                  alt={`${project.title} — Fleet & Booking`}
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-ink">
                {String(index + 1).padStart(2, "0")} · Mobility &amp; Booking
              </div>
              <h2 className="t-h2 mt-3 text-[clamp(28px,3.4vw,46px)] group-hover:translate-x-1 transition-transform duration-micro ease-uniix">
                {project.title}
              </h2>
              <p className="t-lead mt-4 text-ink-2 max-w-[48ch]">
                {project.summary}
              </p>
              <div className="mt-7">
                <span className="link-cta group-hover:text-brand-ink">
                  View mobile-first platform <span className="cta-arrow">↗</span>
                </span>
              </div>
            </div>
          </div>
        </ProjectCardShell>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 07. CORPORATE PRESTIGE STORY (Coventry Business Club)                      */
/* -------------------------------------------------------------------------- */

function CorporatePrestigeStory({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <section className="wrap">
      <Reveal>
        <ProjectCardShell href={`/portfolio/${project.slug}/`}>
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 items-center bg-bg-paper border border-line rounded-2xl md:rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-soft transition-all duration-std">
            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute">
                {String(index + 1).padStart(2, "0")} · Executive Community
              </div>
              <h2 className="t-h2 mt-3 text-[clamp(28px,3.4vw,46px)] group-hover:translate-x-1 transition-transform duration-micro ease-uniix">
                {project.title}
              </h2>
              <p className="t-lead mt-4 text-ink-2 max-w-[48ch]">
                {project.summary}
              </p>
              <div className="mt-7">
                <span className="link-cta group-hover:text-brand-ink">
                  Explore corporate portal <span className="cta-arrow">↗</span>
                </span>
              </div>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl md:rounded-2xl border border-line shadow-sm2">
              <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04]">
                <SmartImage
                  src={project.coverImage}
                  alt={`${project.title} — Members Portal`}
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </ProjectCardShell>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 08. CLIMATE TECH STORY (Terraflow)                                         */
/* -------------------------------------------------------------------------- */

function ClimateTechStory({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <section className="wrap">
      <Reveal>
        <ProjectCardShell href={`/portfolio/${project.slug}/`}>
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center bg-[#0E2419] text-white border border-white/10 rounded-2xl md:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lift">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl md:rounded-2xl border border-white/15">
              <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04]">
                <SmartImage
                  src={project.coverImage}
                  alt={`${project.title} — Sustainability Identity`}
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#F8C84A] mb-3">
                {String(index + 1).padStart(2, "0")} · Environmental Tech
              </div>
              <h2 className="t-h2 text-white group-hover:translate-x-1 transition-transform duration-micro ease-uniix text-[clamp(30px,3.6vw,48px)]">
                {project.title}
              </h2>
              <p className="t-lead text-white/80 mt-4 max-w-[48ch]">
                {project.summary}
              </p>
              <div className="mt-8">
                <span className="link-cta text-white border-white/30 group-hover:text-[#F8C84A] group-hover:border-[#F8C84A]">
                  View brand book &amp; motion system <span className="cta-arrow">↗</span>
                </span>
              </div>
            </div>
          </div>
        </ProjectCardShell>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* FALLBACK EDITORIAL STORY                                                   */
/* -------------------------------------------------------------------------- */

function DefaultEditorialStory({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <section className="wrap">
      <Reveal>
        <ProjectCardShell href={`/portfolio/${project.slug}/`}>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center bg-bg-paper border border-line rounded-2xl md:rounded-3xl p-6 sm:p-10 lg:p-12 hover:shadow-soft transition-all duration-std">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl md:rounded-2xl border border-line">
              <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04]">
                <SmartImage
                  src={project.coverImage}
                  alt={`${project.title} — Showcase`}
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute">
                {String(index + 1).padStart(2, "0")} · {project.overline}
              </div>
              <h2 className="t-h2 mt-3 text-[clamp(28px,3.4vw,46px)] group-hover:translate-x-1 transition-transform duration-micro ease-uniix">
                {project.title}
              </h2>
              <p className="t-lead mt-4 text-ink-2 max-w-[48ch]">
                {project.summary}
              </p>
              <div className="mt-7">
                <span className="link-cta group-hover:text-brand-ink">
                  Read case study <span className="cta-arrow">↗</span>
                </span>
              </div>
            </div>
          </div>
        </ProjectCardShell>
      </Reveal>
    </section>
  );
}
