import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo-metadata";
import Hero from "@/components/home/Hero";
import BrandStatement from "@/components/home/BrandStatement";
import CinematicReel from "@/components/home/reel/CinematicReel";
import Disciplines from "@/components/home/studio/Disciplines";
import WorkStack from "@/components/home/studio/WorkStack";
import Approach from "@/components/home/studio/Approach";
import ProcessLine from "@/components/home/studio/ProcessLine";
import Studio from "@/components/home/studio/Studio";
import BriefBuilder from "@/components/home/studio/BriefBuilder";
import { getProjects } from "@/lib/cms/projects";
import { getServices } from "@/lib/cms/services";
import { getIndustries } from "@/lib/cms/industries";
import { getProcess, getWhyPoints } from "@/lib/cms/content";
import { getHomepage, getSiteSettings } from "@/lib/cms/site";
import { getShowreelFilms } from "@/lib/cms/showreel";

export async function generateMetadata(): Promise<Metadata> {
  const [home, settings] = await Promise.all([getHomepage(), getSiteSettings()]);
  // Never return `title: undefined` here: Next resolves an explicit undefined
  // title to an empty one, which is how the homepage lost its <title>.
  return pageMeta("/", { seo: home.seo, fallbackImage: settings.defaultOgImage });
}

/**
 * Homepage.
 *
 * 01–02 are the hero and the brand statement / client marks. Everything from
 * "What we do" down is one continuous piece with a single motion language
 * ("wipe and pin" — components/home/studio/motion.tsx):
 *
 *   01 What we do   — five disciplines, pinned sideways scroll (swipe on mobile)
 *   02 Selected work — full-screen project deck, cards stack as you scroll
 *      Reel          — commercials, kept as-is
 *   03 Why Uniix     — drag-to-compare "the usual" vs. the Uniix way
 *   04 How we work   — pinned four-stage process with drawn artefacts
 *   05 The studio    — live Colombo time, toolkit, sectors
 *   06 Start         — the visitor composes the first line of their brief
 *
 * Testimonials and headline stats were removed from the page: none of them is
 * approved for use. Proof is carried by real projects and real films instead.
 */
export default async function HomePage() {
  const [home, films, projects, services, industries, stages, why, settings] = await Promise.all([
    getHomepage(),
    getShowreelFilms(),
    getProjects(),
    getServices(),
    getIndustries(),
    getProcess(),
    getWhyPoints(),
    getSiteSettings(),
  ]);

  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const isRef = (r: unknown): r is { slug: string } => typeof r === "object" && r !== null && "slug" in r;

  // "Selected work": the editor's picks, in their order.
  const homeWork = (home.featuredWork ?? [])
    .map((r) => (isRef(r) ? bySlug.get(r.slug) : undefined))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const visuals = projects.map(({ slug, title, coverImage, tags }) => ({ slug, title, coverImage, tags }));

  return (
    <>
      <Hero films={films} />
      <BrandStatement trustLine={home.brandStatement?.trustLine ?? undefined} />
      <Disciplines
        services={services.map(({ slug, name, pillar }) => ({ slug, name, pillar }))}
        visuals={visuals}
      />
      <WorkStack items={homeWork} />
      <CinematicReel films={films} />
      <Approach points={why} />
      <ProcessLine stages={stages} />
      <Studio industries={industries.map(({ slug, name }) => ({ slug, name }))} />
      <BriefBuilder email={settings.email} whatsapp={settings.whatsappLink} />
    </>
  );
}
