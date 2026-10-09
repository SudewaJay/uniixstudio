import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import BrandStatement from "@/components/home/BrandStatement";
import Pillars, { type HomePillar, type PillarProof } from "@/components/home/Pillars";
import WorkShowcase from "@/components/home/WorkShowcase";
import IndustryIndex, { type IndustryProof } from "@/components/home/IndustryIndex";
import CinematicReel from "@/components/home/reel/CinematicReel";
import ProcessJourney from "@/components/home/ProcessJourney";
import WhyUniix from "@/components/home/WhyUniix";
import Results from "@/components/home/Results";
import ClientStories from "@/components/home/ClientStories";
import Insights from "@/components/home/Insights";
import FinalCTA from "@/components/home/FinalCTA";
import { getProjects } from "@/lib/cms/projects";
import { getPillars, getServices } from "@/lib/cms/services";
import { getIndustries } from "@/lib/cms/industries";
import { getFeaturedPosts } from "@/lib/cms/blog";
import { getFeaturedClients, getFeaturedTestimonials, getProcess, getWhyPoints } from "@/lib/cms/content";
import { getHomepage, getSiteSettings, getStats, toCopy } from "@/lib/cms/site";
import { getShowreelFilms } from "@/lib/cms/showreel";
import { buildMetadata } from "@/lib/cms/seo";
import { isDoc } from "@/lib/cms/helpers";

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHomepage(), getSiteSettings()]);
  const meta = buildMetadata({
    path: "/",
    title: `${settings.name} | Creative Design & Digital Agency in Sri Lanka`,
    description: settings.description,
    seo: home.seo,
    fallbackImage: settings.defaultOgImage,
  });
  // The homepage keeps the layout's default title unless an editor overrides it.
  return home.seo?.metaTitle ? meta : { ...meta, title: undefined };
}

export default async function HomePage() {
  const [home, films, projects, pillars, services, industries, posts, clients, testimonials, stages, why, stats] =
    await Promise.all([
      getHomepage(),
      getShowreelFilms(),
      getProjects(),
      getPillars(),
      getServices(),
      getIndustries(),
      getFeaturedPosts(3),
      getFeaturedClients(),
      getFeaturedTestimonials(),
      getProcess(),
      getWhyPoints(),
      getStats(),
    ]);

  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const projectOf = (ref: unknown) => (isDoc(ref as { id: number } | null) ? bySlug.get((ref as { slug: string }).slug) : undefined);

  // "Selected work": the editor's picks, in their order.
  const homeWork = (home.featuredWork ?? []).map(projectOf).filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Pillars in their "01 / 02 / 03" order, each with its live services.
  const homePillars: HomePillar[] = [...pillars]
    .sort((a, b) => (a.num ?? "").localeCompare(b.num ?? ""))
    .map((p) => ({
      slug: p.slug,
      num: p.num ?? "",
      title: p.label,
      positioning: p.positioning ?? p.description,
      subs: services.filter((s) => s.pillar === p.slug).map((s) => ({ slug: s.slug, name: s.name, pillar: s.pillar })),
    }));

  // Real project evidence per discipline — `evidence` is a tag the project carries.
  const pillarProof: PillarProof[] = (home.pillarProof ?? []).flatMap((row) => {
    const p = projectOf(row.project);
    const pillar = isDoc(row.pillar) ? row.pillar.slug : undefined;
    return p && pillar
      ? [{ pillar, slug: p.slug, title: p.title, year: p.year, coverImage: p.coverImage, evidence: row.evidence }]
      : [];
  });

  // Real work behind an industry; the rest render as typographic cards.
  const industryProof: Record<string, IndustryProof> = {};
  for (const row of home.industryProof ?? []) {
    const slug = isDoc(row.industry) ? row.industry.slug : undefined;
    if (!slug) continue;
    const p = projectOf(row.project);
    const f = row.filmVimeoId ? films.find((x) => x.vimeoId === row.filmVimeoId) : undefined;
    if (p) industryProof[slug] = { image: p.coverImage, label: p.client ?? p.title };
    else if (f) industryProof[slug] = { image: f.poster, label: `${f.client} — Commercial` };
  }

  return (
    <>
      {/* 01 */} <Hero films={films} />
      {/* 02 */} <BrandStatement clients={clients} body={home.brandStatement?.body ?? undefined} trustLine={home.brandStatement?.trustLine ?? undefined} />
      {/* 03 */} <Pillars pillars={homePillars} proof={pillarProof} copy={toCopy(home.pillars)} />
      {/* 04 */} <WorkShowcase items={homeWork} copy={toCopy(home.work)} />
      {/* 05 */} <IndustryIndex industries={industries.map(({ slug, name, description, accent }) => ({ slug, name, description, accent }))} proof={industryProof} copy={toCopy(home.industries)} />
      {/* 05b */} <CinematicReel films={films} />
      {/* 06 */} <ProcessJourney stages={stages} copy={toCopy(home.process)} />
      {/* 07 */} <WhyUniix whyPoints={why} copy={toCopy(home.why)} />
      {/* 08 */} <Results stats={stats} copy={toCopy(home.results)} />
      {/* 09 */} <ClientStories testimonials={testimonials} copy={toCopy(home.clientStories)} />
      {/* 10 */} <Insights posts={posts} copy={toCopy(home.insights)} />
      {/* 11 */} <FinalCTA />
    </>
  );
}
