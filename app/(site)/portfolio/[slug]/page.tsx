import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { getProject, getDetailedProjects } from "@/lib/projects-fs";
import { breadcrumbSchema, schemaGraph } from "@/lib/schema";
import { site } from "@/lib/content";

export function generateStaticParams() {
  return getDetailedProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} · ${site.name}`,
      description: project.summary,
      images: [{ url: project.coverImage }],
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.hasDetail) notFound();

  const others = getDetailedProjects()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const pageSchema = schemaGraph(
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Portfolio", url: `${site.url}/portfolio` },
      { name: project.title, url: `${site.url}/portfolio/${project.slug}` },
    ]),
  );

  return (
    <>
      <JsonLd data={pageSchema} />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="wrap">
          <Reveal>
            <Link
              href="/portfolio"
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 hover:text-ink transition-colors"
            >
              ← Portfolio
            </Link>
            <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-brand-4 mt-8">
              {project.overline} · {project.year}
            </div>
            <h1
              className="font-display font-medium mt-4 tracking-[-0.02em] leading-[1.05]"
              style={{ fontSize: "clamp(40px,6vw,88px)" }}
            >
              {project.title}
            </h1>
            <p className="text-[clamp(18px,1.5vw,22px)] text-ink-2 max-w-[60ch] leading-[1.5] mt-6">
              {project.headline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cover image */}
      {project.coverImage && (
        <section className="pb-16 md:pb-24">
          <div className="wrap">
            <Reveal>
              <div className="relative w-full aspect-[16/9] rounded-lg2 overflow-hidden bg-bg-warm">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} cover`}
                  fill
                  priority
                  sizes="(min-width:1024px) 1100px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Meta strip — client, services, deliverables */}
      <section className="py-12 md:py-16 bg-bg-warm border-y border-line">
        <div className="wrap grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {project.client && (
            <Reveal>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-3">
                Client
              </div>
              <div className="font-display text-[18px] leading-[1.4]">{project.client}</div>
              {project.location && (
                <div className="text-[14px] text-ink-2 mt-1">{project.location}</div>
              )}
            </Reveal>
          )}
          {project.industry && (
            <Reveal delay={1}>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-3">
                Industry
              </div>
              <div className="font-display text-[18px] leading-[1.4]">{project.industry}</div>
            </Reveal>
          )}
          {project.services && project.services.length > 0 && (
            <Reveal delay={2}>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-3">
                Services
              </div>
              <ul className="flex flex-col gap-1.5 text-[15px] text-ink leading-[1.4]">
                {project.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
          )}
          {project.url && (
            <Reveal delay={3}>
              <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-3">
                Live site
              </div>
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[18px] gradient-text hover:opacity-80 transition-opacity inline-flex items-center gap-1.5"
              >
                Visit ↗
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* Stats */}
      {project.stats && project.stats.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="wrap">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {project.stats.map((s, i) => (
                <Reveal key={s.label} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <div className="border-l border-line pl-5">
                    <div
                      className="font-display font-medium gradient-text"
                      style={{ fontSize: "clamp(36px,4vw,56px)", letterSpacing: "-0.02em" }}
                    >
                      {s.value}
                    </div>
                    <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mt-2">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* P/S/R */}
      {(project.problem || project.solution || project.result) && (
        <section className="py-16 md:py-24 bg-bg-warm">
          <div className="wrap max-w-[920px] mx-auto flex flex-col gap-10 md:gap-14">
            {project.problem && (
              <Reveal>
                <h4 className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-3">
                  The Problem
                </h4>
                <p className="text-[clamp(18px,1.5vw,22px)] leading-[1.55] text-ink">
                  {project.problem}
                </p>
              </Reveal>
            )}
            {project.solution && (
              <Reveal delay={1}>
                <h4 className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-3">
                  Our Approach
                </h4>
                <p className="text-[clamp(18px,1.5vw,22px)] leading-[1.55] text-ink">
                  {project.solution}
                </p>
              </Reveal>
            )}
            {project.result && (
              <Reveal delay={2}>
                <h4 className="font-mono text-[11px] tracking-[0.18em] uppercase text-brand-4 mb-3">
                  The Result
                </h4>
                <p
                  className="font-display text-[clamp(22px,2vw,30px)] leading-[1.4] text-ink"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {project.result}
                </p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Long-form body (MDX) */}
      {project.body && (
        <section className="py-20 md:py-28">
          <div className="wrap max-w-[760px] mx-auto prose-blog">
            <Reveal>
              <ReactMarkdown>{project.body}</ReactMarkdown>
            </Reveal>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 md:py-24 bg-bg-warm">
          <div className="wrap">
            <Reveal>
              <h2
                className="font-display font-medium mb-10 md:mb-14"
                style={{ fontSize: "clamp(28px,3.5vw,48px)", letterSpacing: "-0.02em" }}
              >
                Selected views
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
              {project.gallery.map((src, i) => (
                <Reveal key={src} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <div className="relative w-full aspect-[4/3] rounded-lg2 overflow-hidden bg-bg-paper">
                    <Image
                      src={src}
                      alt={`${project.title} — image ${i + 1}`}
                      fill
                      sizes="(min-width:640px) 540px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <section className="py-20 md:py-28">
          <div className="wrap max-w-[820px] mx-auto text-center">
            <Reveal>
              <p
                className="font-display italic-display"
                style={{ fontSize: "clamp(24px,2.8vw,40px)", letterSpacing: "-0.01em", lineHeight: 1.35 }}
              >
                “{project.testimonial.quote}”
              </p>
              <div className="mt-6 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
                {project.testimonial.name} · {project.testimonial.role}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Next projects */}
      {others.length > 0 && (
        <section className="py-20 md:py-28 border-t border-line">
          <div className="wrap">
            <Reveal>
              <h2
                className="font-display font-medium mb-10 md:mb-14"
                style={{ fontSize: "clamp(28px,3.5vw,48px)", letterSpacing: "-0.02em" }}
              >
                More work
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {others.map((p) => (
                <Reveal key={p.slug}>
                  <Link
                    href={`/portfolio/${p.slug}`}
                    className="group block bg-bg-paper border border-line rounded-lg2 p-6 md:p-7 transition-all hover:-translate-y-1 hover:shadow-sm2"
                  >
                    <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-brand-4 mb-3">
                      {p.overline}
                    </div>
                    <h3
                      className="font-display font-medium leading-[1.2]"
                      style={{ fontSize: "clamp(20px,2vw,28px)", letterSpacing: "-0.02em" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-[14px] text-ink-2 mt-3 leading-[1.5]">
                      {p.headline}
                    </p>
                    <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-mute mt-5 inline-flex items-center gap-1">
                      Read case study
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
