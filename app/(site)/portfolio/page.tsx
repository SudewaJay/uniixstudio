import type { Metadata } from "next";
import WorkIntro from "@/components/work/WorkIntro";
import FeaturedWork, { type Feature } from "@/components/work/FeaturedWork";
import ProjectIndex, { type IndexProject } from "@/components/work/ProjectIndex";
import EnquiryClose from "@/components/studio/EnquiryClose";
import { getSiteSettings } from "@/lib/cms/site";
import { LOGO_ONLY_PROJECTS, OWN_PRODUCTS } from "@/lib/studio";
import { getProjects } from "@/lib/cms/projects";
import type { Project } from "@/lib/projects";
import { site } from "@/lib/content";
import { breadcrumbSchema, schemaGraph } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { absolute: "Portfolio / Selected Work | Uniix Studio" },
  description:
    "Explore the selected work archive of Uniix Studio — identities, digital products, websites, and growth systems engineered to solve real business problems across Sri Lanka, Australia & the UK.",
  alternates: { canonical: site.canonical("/portfolio/") },
  openGraph: {
    title: "Portfolio / Selected Work | Uniix Studio",
    description:
      "A curated archive of identities, digital products, websites, and growth systems built to solve real business problems.",
    url: site.canonical("/portfolio/"),
    siteName: site.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 1200,
        alt: "Uniix Studio Work Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio / Selected Work | Uniix Studio",
    description:
      "A curated archive of identities, digital products, websites, and growth systems built to solve real business problems.",
  },
};

/** Flagship projects and the composition each one gets. */
const FEATURES: Array<{ slug: string; layout: Feature["layout"] }> = [
  { slug: "cricbook", layout: "cinema" },
  { slug: "rentmycar-lk", layout: "split-right" },
  { slug: "st-lukes-medilab", layout: "split-left" },
  { slug: "ecowave-energy", layout: "wide" },
  { slug: "bilesma-natural", layout: "trio" },
];

export default async function PortfolioPage() {
  const [allProjects, settings] = await Promise.all([getProjects(), getSiteSettings()]);
  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/portfolio/" },
  ]);

  const collectionSchema = {
    "@type": "CollectionPage",
    "@id": `${site.url}/portfolio/#collection`,
    url: `${site.url}/portfolio/`,
    name: "Portfolio / Selected Work | Uniix Studio",
    description:
      "A curated archive of identities, digital products, websites, and growth systems built to solve real business problems.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allProjects.filter((p) => p.hasDetail).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}/portfolio/${p.slug}/`,
        name: p.title,
      })),
    },
  };

  const real = (p: Project) => Boolean(p.coverImage) && !LOGO_ONLY_PROJECTS.has(p.slug);
  const years = allProjects.map((p) => Number(p.year)).filter(Boolean);

  const features: Feature[] = FEATURES.flatMap(({ slug, layout }) => {
    const p = allProjects.find((x) => x.slug === slug);
    if (!p || !real(p)) return [];
    return [
      {
        slug: p.slug,
        title: p.title,
        headline: p.headline,
        overline: p.overline,
        year: p.year,
        cover: p.coverImage,
        coverAlt: `${p.title}: ${p.overline}`,
        extra: (p.gallery ?? []).slice(0, 2),
        own: OWN_PRODUCTS.has(p.slug),
        layout,
      },
    ];
  });

  const index: IndexProject[] = [...allProjects]
    .sort((a, b) => Number(b.year) - Number(a.year))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      year: p.year,
      overline: p.overline,
      industry: p.industry,
      tier: p.audienceTier,
      descriptors: [...(p.tags ?? []), ...(p.services ?? []), p.overline].map((t) => t.toLowerCase()),
      cover: real(p) ? p.coverImage : undefined,
      own: OWN_PRODUCTS.has(p.slug),
    }));

  const shots = ["rentmycar-lk", "bilesma-natural", "cricbook"]
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p && real(p)))
    .map((p) => ({ src: p.coverImage, alt: p.title }));

  return (
    <>
      <JsonLd data={schemaGraph(crumbs, collectionSchema)} />
      <WorkIntro count={allProjects.length} from={String(Math.min(...years))} to={String(Math.max(...years))} shots={shots} />
      <FeaturedWork items={features} />
      <ProjectIndex projects={index} />
      <EnquiryClose
        heading={<>The next case study could be yours.</>}
        primaryLabel="Discuss a similar project"
        email={settings.email}
        whatsappLink={settings.whatsappLink}
        whatsappText="Hi Uniix, I'd like to discuss a project similar to your portfolio work."
      />
    </>
  );
}
