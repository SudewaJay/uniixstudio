import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import BrandStatement from "@/components/home/BrandStatement";
import Pillars, { type PillarProof } from "@/components/home/Pillars";
import WorkShowcase from "@/components/home/WorkShowcase";
import IndustryIndex from "@/components/home/IndustryIndex";
import ProcessJourney from "@/components/home/ProcessJourney";
import WhyUniix from "@/components/home/WhyUniix";
import Results from "@/components/home/Results";
import ClientStories from "@/components/home/ClientStories";
import Insights from "@/components/home/Insights";
import FinalCTA from "@/components/home/FinalCTA";
import { site } from "@/lib/content";
import { allProjects } from "@/lib/projects-fs";
import { getShowreelFilms } from "@/lib/showreel-fs";

/**
 * Curated order for the homepage work showcase. Each of these has an MDX case
 * study, so every card links to a real page.
 */
const HOME_WORK_ORDER = [
  "rentmycar-lk",
  "st-lukes-medilab",
  "ecowave-energy",
  "sierra-energy-solutions",
];

/**
 * Real project evidence for each discipline. `evidence` is a tag that project
 * actually carries in its MDX frontmatter — nothing here is invented.
 */
const PILLAR_PROOF: { pillar: string; slug: string; evidence: string }[] = [
  { pillar: "design", slug: "ecowave-energy", evidence: "Brand Identity" },
  { pillar: "growth", slug: "st-lukes-medilab", evidence: "Local SEO" },
  { pillar: "technology", slug: "rentmycar-lk", evidence: "Web Development" },
];

export const metadata: Metadata = {
  alternates: { canonical: site.canonical("/") },
};

export default async function HomePage() {
  const films = await getShowreelFilms();

  const homeWork = HOME_WORK_ORDER.map((slug) =>
    allProjects.find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const pillarProof: PillarProof[] = PILLAR_PROOF.flatMap(({ pillar, slug, evidence }) => {
    const p = allProjects.find((x) => x.slug === slug);
    return p
      ? [{ pillar, slug: p.slug, title: p.title, year: p.year, coverImage: p.coverImage, evidence }]
      : [];
  });

  return (
    <>
      {/* 01 */} <Hero films={films} />
      {/* 02 */} <BrandStatement />
      {/* 03 */} <Pillars proof={pillarProof} />
      {/* 04 */} <WorkShowcase items={homeWork} />
      {/* 05 */} <IndustryIndex />
      {/* 06 */} <ProcessJourney />
      {/* 07 */} <WhyUniix />
      {/* 08 */} <Results />
      {/* 09 */} <ClientStories />
      {/* 10 */} <Insights />
      {/* 11 */} <FinalCTA />
    </>
  );
}
