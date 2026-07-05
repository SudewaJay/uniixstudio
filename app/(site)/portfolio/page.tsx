import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import {
  PortfolioFeatured,
  PortfolioFilterableGrid,
} from "@/components/PortfolioLayout";
import LogoCloud from "@/components/LogoCloud";
import { allProjects, getDetailedProjects } from "@/lib/projects-fs";
import { site } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Portfolio · Web, Branding & SEO Case Studies | Uniix Studio",
  description:
    "Selected case studies from Uniix Studio — brand identity, web design and digital strategy work for ambitious brands across Sri Lanka, Australia & the UK.",
  alternates: { canonical: site.canonical("/portfolio/") },
};

export default function PortfolioPage() {
  const caseStudies = getDetailedProjects();

  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio/" },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Brands we&apos;re{" "}
            <span className="italic-display gradient-text">proud of.</span>
          </>
        }
        lede="A small selection of recent work across brand identity, web design and digital strategy. Every project starts with a real problem and ends with measurable change."
      />

      {/* Client logo cloud — same component as homepage */}
      <LogoCloud />

      {/* Featured projects — staggered 2-col grid */}
      <PortfolioFeatured projects={allProjects} />

      {/* All projects — 3-col with filters */}
      <PortfolioFilterableGrid projects={allProjects} />

      {/* Case studies — Problem / Solution / Result */}
      {caseStudies.length > 0 && (
        <section className="py-20 md:py-28 bg-bg-warm">
          <div className="wrap">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end mb-16 lg:mb-20">
              <Reveal>
                <span className="eyebrow">Case studies</span>
                <h2 className="display mt-4" style={{ fontSize: "clamp(40px,5vw,72px)" }}>
                  Problem.{" "}
                  <span className="italic-display gradient-text">
                    Solution. Result.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={1}>
                <p className="text-[clamp(16px,1.3vw,18px)] text-ink-2 max-w-[42ch] leading-[1.55]">
                  A short walkthrough of how each engagement actually played out — from
                  initial brief to measurable outcome.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-5 md:gap-6">
              {caseStudies.map((c, i) => (
                <Reveal key={c.slug}>
                  <Link
                    href={`/portfolio/${c.slug}`}
                    className="group block bg-bg-paper border border-line rounded-lg2 p-8 md:p-12 transition-all duration-300 hover:shadow-sm2 hover:-translate-y-0.5"
                  >
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start">
                      <div>
                        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-brand-4 mb-3">
                          {c.overline} · {c.year}
                        </div>
                        <h3
                          className="font-display font-medium"
                          style={{
                            fontSize: "clamp(32px,3.5vw,48px)",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {c.title}
                        </h3>
                        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-mute mt-4">
                          Case {String(i + 1).padStart(2, "0")} /{" "}
                          {String(caseStudies.length).padStart(2, "0")}
                        </div>
                        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-brand-4 mt-6 inline-flex items-center gap-1.5">
                          Read full case
                          <span className="transition-transform group-hover:translate-x-1">→</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-7">
                        {c.problem && (
                          <div>
                            <h4 className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-2">
                              Problem
                            </h4>
                            <p className="text-[16px] leading-[1.6] text-ink-2">{c.problem}</p>
                          </div>
                        )}
                        {c.solution && (
                          <div>
                            <h4 className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-2">
                              Solution
                            </h4>
                            <p className="text-[16px] leading-[1.6] text-ink-2">{c.solution}</p>
                          </div>
                        )}
                        {c.result && (
                          <div>
                            <h4 className="font-mono text-[11px] tracking-[0.18em] uppercase text-brand-4 mb-2">
                              Result
                            </h4>
                            <p
                              className="font-display text-[20px] leading-[1.45] text-ink"
                              style={{ letterSpacing: "-0.01em" }}
                            >
                              {c.result}
                            </p>
                          </div>
                        )}
                      </div>
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
