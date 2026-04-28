import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import WorkGrid from "@/components/WorkGrid";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A selection of recent brand identity, web design and digital projects from Uniix Studio — including Zerro, Wasana Drivers, Coventry Business Club and Terraflow.",
};

const caseStudies = [
  {
    slug: "zerro",
    overline: "Brand Identity · 2024",
    title: "Zerro",
    problem:
      "A launch-stage tech company with no visual system, inconsistent positioning across decks and product, and no scalable identity to grow into.",
    solution:
      "Full identity system — logo suite, type system, colour architecture, brand guidelines, marketing collateral and motion language — designed to scale from launch to Series A.",
    result:
      "A consistent visual identity used across pitch decks, product UI, marketing site and social — eliminating brand drift and saving the team weeks of asset rework.",
  },
  {
    slug: "wasana",
    overline: "Web Design & Development · 2024",
    title: "Wasana Drivers",
    problem:
      "A growing transport service running on a slow, dated website with no booking flow, weak local SEO, and bounce rates approaching 70%.",
    solution:
      "Mobile-first redesign with a streamlined booking enquiry flow, structured data for local search, and a content architecture optimised for service-area keywords.",
    result:
      "Improved page-load and Core Web Vitals scores, stronger ranking on Colombo-area transport queries, and a meaningful drop in bounce rate within the first 60 days.",
  },
  {
    slug: "coventry",
    overline: "Web Design · 2023",
    title: "Coventry Business Club",
    problem:
      "A UK-based business community with prestige and tradition but a website that looked dated and made membership benefits hard to discover.",
    solution:
      "Corporate redesign balancing heritage typography with modern UX patterns. Restructured information architecture around the member journey — from discovery to enquiry.",
    result:
      "A site that finally matches the club&apos;s reputation — clearer pathways for prospective members and a content structure the team can update without developer help.",
  },
  {
    slug: "terraflow",
    overline: "Brand Identity · 2024",
    title: "Terraflow",
    problem:
      "An environmental-tech startup needing a brand that signalled scientific rigour without falling into the green-washed clichés of the sustainability space.",
    solution:
      "End-to-end identity — logomark, palette, type system, motion principles, and a 30-page brand book — anchored in a mark that nods to flow systems without being literal.",
    result:
      "A confident, distinctive identity that stands apart from sustainability category visual norms and gives the team a system they can apply across every touchpoint.",
  },
];

export default function PortfolioPage() {
  return (
    <>
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

      {/* Grid */}
      <section className="py-12 md:py-16">
        <div className="wrap">
          <WorkGrid />
        </div>
      </section>

      {/* Case studies */}
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
                <article className="bg-bg-paper border border-line rounded-lg2 p-8 md:p-12 transition-all duration-300 hover:shadow-sm2">
                  <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start">
                    <div>
                      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-brand-4 mb-3">
                        {c.overline}
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
                        Case {String(i + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="flex flex-col gap-7">
                      <div>
                        <h4 className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-2">
                          Problem
                        </h4>
                        <p className="text-[16px] leading-[1.6] text-ink-2">{c.problem}</p>
                      </div>
                      <div>
                        <h4 className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-2">
                          Solution
                        </h4>
                        <p className="text-[16px] leading-[1.6] text-ink-2">{c.solution}</p>
                      </div>
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
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
