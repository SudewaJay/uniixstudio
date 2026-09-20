import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { getProject, getDetailedProjects } from "@/lib/projects-fs";
import { resolveServiceLinks } from "@/lib/service-links";
import { site } from "@/lib/content";
import { ogImageUrl, ogImageMeta } from "@/lib/og-image";
import {
  breadcrumbSchema,
  creativeWorkSchema,
  faqPageSchema,
  schemaGraph,
  videoObjectSchema,
} from "@/lib/schema";

// Specialized Case Study Components
import CaseStudyHero from "@/components/portfolio/case-study/CaseStudyHero";
import ProjectDossier from "@/components/portfolio/case-study/ProjectDossier";
import ProjectMetrics from "@/components/portfolio/case-study/ProjectMetrics";
import ProblemApproachResult from "@/components/portfolio/case-study/ProblemApproachResult";
import InteractiveDesignRationale from "@/components/portfolio/case-study/InteractiveDesignRationale";
import BrandSystemShowcase from "@/components/portfolio/case-study/BrandSystemShowcase";
import WebsiteShowcase from "@/components/portfolio/case-study/WebsiteShowcase";
import ProcessTimeline from "@/components/portfolio/case-study/ProcessTimeline";
import SelectedViewsGallery from "@/components/portfolio/case-study/SelectedViewsGallery";
import NextProjectExhibition from "@/components/portfolio/case-study/NextProjectExhibition";
import CaseStudyCTA from "@/components/portfolio/case-study/CaseStudyCTA";
import SocialCampaignCarousel from "@/components/SocialCampaignCarousel";
import CaseStudyNarrative from "@/components/CaseStudyNarrative";

export function generateStaticParams() {
  return getDetailedProjects().map((p) => ({ slug: p.slug }));
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project | Uniix Studio" };
  const canonical = site.canonical(`/portfolio/${slug}/`);
  const ogImages = ogImageMeta(project.coverImage);
  const twitterImage = ogImageUrl(project.coverImage);

  return {
    metadataBase: new URL(site.url),
    title: `${project.title} — Case Study | Uniix Studio`,
    description: project.summary,
    alternates: { canonical },
    openGraph: {
      title: `${project.title} · ${site.name}`,
      description: project.summary,
      url: canonical,
      images: ogImages,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study`,
      description: project.summary,
      images: twitterImage ? [twitterImage] : undefined,
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

  const allDetailed = getDetailedProjects();
  const currentIndex = allDetailed.findIndex((p) => p.slug === slug);
  const nextIndex = (currentIndex + 1) % allDetailed.length;
  const prevIndex = (currentIndex - 1 + allDetailed.length) % allDetailed.length;

  const nextProject = allDetailed[nextIndex];
  const prevProject =
    allDetailed.length > 2 && currentIndex !== prevIndex
      ? allDetailed[prevIndex]
      : undefined;

  const relatedServices = resolveServiceLinks(project.services);

  // Structured Narrative extraction for signature interactive rationale
  const approachNarrative = project.narrative?.find(
    (n) => n.kind === "approach",
  );

  const rationalePoints =
    approachNarrative && approachNarrative.kind === "approach"
      ? [
          {
            num: "01",
            title: approachNarrative.pullQuote,
            detail: approachNarrative.headline,
            visual: project.wireframes?.[0]?.src ?? project.coverImage,
            tag: "Core Philosophy",
          },
          ...approachNarrative.proofs.map((p, idx) => ({
            num: String(idx + 2).padStart(2, "0"),
            title: p.claim,
            detail: p.evidence,
            visual:
              project.wireframes?.[idx + 1]?.src ??
              project.contentBlocks?.[idx]?.image ??
              project.coverImage,
            tag: `Proof 0${idx + 1}`,
          })),
        ]
      : undefined;

  const pageSchema = schemaGraph(
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Portfolio", url: `${site.url}/portfolio/` },
      { name: project.title, url: `${site.url}/portfolio/${project.slug}/` },
    ]),
    creativeWorkSchema(project),
    ...(project.faqs && project.faqs.length > 0
      ? [faqPageSchema(project.faqs)]
      : []),
    ...(project.videos && project.videos.length > 0
      ? project.videos.map((v) => videoObjectSchema(v))
      : []),
  );

  return (
    <>
      <JsonLd data={pageSchema} />

      {/* 01. Cinematic Case Study Hero */}
      <CaseStudyHero project={project} />

      {/* 02. Project Intelligence Dossier */}
      <ProjectDossier project={project} />

      {/* 03. Impact & Results Metrics (when available) */}
      {project.stats && project.stats.length > 0 && (
        <ProjectMetrics stats={project.stats} />
      )}

      {/* 04. Strategic Narrative Arc (The Problem / The Approach / The Outcome) */}
      <ProblemApproachResult project={project} />

      {/* 05. Digital Web Platform Showcase (for web projects) */}
      <WebsiteShowcase project={project} />

      {/* 06. Brand System Showcase (for branding & identity projects) */}
      <BrandSystemShowcase project={project} />

      {/* 07. Interactive Design Rationale ("Every pixel had a reason") */}
      <InteractiveDesignRationale
        rationale={project.designRationale}
        points={rationalePoints}
        palette={project.colorPalette}
        typography={project.typography}
        uiPrinciples={project.uiPrinciples}
        motionPrinciples={project.motionPrinciples}
        defaultImage={project.coverImage}
      />

      {/* 08. Structured Narrative Blocks (IA, Quadrants, Pillars) */}
      {project.narrative && project.narrative.length > 0 && (
        <CaseStudyNarrative blocks={project.narrative} />
      )}

      {/* 09. Markdown Body (when no structured narrative) */}
      {!project.narrative && project.body && (
        <section className="py-20 md:py-28 bg-bg border-b border-line">
          <div className="wrap max-w-[780px] mx-auto prose-blog">
            <Reveal amount="some">
              <ReactMarkdown>{project.body}</ReactMarkdown>
            </Reveal>
          </div>
        </section>
      )}

      {/* 10. Social Media Campaign (when campaign images present) */}
      {project.socialCampaign &&
        project.socialCampaign.images &&
        project.socialCampaign.images.length > 0 && (
          <SocialCampaignCarousel
            title={project.socialCampaign.title ?? "Social Media Campaign System"}
            description={project.socialCampaign.description}
            images={project.socialCampaign.images}
          />
        )}

      {/* 11. Studio Delivery Process Timeline */}
      <ProcessTimeline />

      {/* 12. Selected Views Gallery & Lightbox */}
      {project.gallery && project.gallery.length > 0 && (
        <SelectedViewsGallery
          images={project.gallery}
          projectTitle={project.title}
          heading={project.galleryHeading ?? "Selected Views"}
          industry={project.industry}
        />
      )}

      {/* 13. Frequently Asked Questions (Structured FAQ) */}
      {project.faqs && project.faqs.length > 0 && (
        <section
          className="py-24 md:py-36 bg-bg-warm/60 border-b border-line"
          aria-labelledby="faq-heading"
        >
          <div className="wrap max-w-[900px] mx-auto">
            <Reveal>
              <span className="eyebrow text-brand-ink">AEO &amp; Questions</span>
              <h2
                id="faq-heading"
                className="t-h2 mt-4 text-[clamp(28px,3.5vw,48px)]"
              >
                Questions about this engagement
              </h2>
            </Reveal>

            <dl className="mt-12 flex flex-col divide-y divide-line border-y border-line">
              {project.faqs.map((f, i) => (
                <Reveal key={f.question} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <div className="py-7 md:py-8">
                    <dt className="font-display font-medium text-[20px] md:text-[22px] text-ink leading-[1.3]">
                      {f.question}
                    </dt>
                    <dd className="t-body mt-3 text-ink-2 max-w-[65ch]">
                      {f.answer}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* 14. Related Service Capabilities */}
      {relatedServices.length > 0 && (
        <section className="py-20 md:py-28 bg-bg border-b border-line">
          <div className="wrap">
            <Reveal>
              <span className="eyebrow text-brand-ink">Capabilities</span>
              <h2 className="t-h2 mt-4 text-[clamp(26px,3vw,42px)]">
                Related studio disciplines
              </h2>
            </Reveal>

            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mt-10">
              {relatedServices.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex items-center justify-between p-5 rounded-2xl bg-bg-warm border border-line hover:border-brand-ink hover:shadow-sm2 hover:-translate-y-0.5 transition-all duration-micro"
                  >
                    <span className="font-display font-medium text-[17px] text-ink">
                      {s.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[14px] text-brand-ink group-hover:translate-x-1 transition-transform"
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 15. Next Project Exhibition Navigation */}
      <NextProjectExhibition
        nextProject={nextProject}
        prevProject={prevProject}
      />

      {/* 16. Studio Closing CTA */}
      <CaseStudyCTA currentProjectTitle={project.title} />
    </>
  );
}
