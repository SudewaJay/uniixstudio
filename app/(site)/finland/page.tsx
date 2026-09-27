import type { Metadata } from "next";
import FinlandHero from "@/components/finland/FinlandHero";
import FinlandWork from "@/components/finland/FinlandWork";
import FinlandServices from "@/components/finland/FinlandServices";
import FinlandCaseStudies from "@/components/finland/FinlandCaseStudies";
import FinlandTestimonials, { type FiTestimonial } from "@/components/finland/FinlandTestimonials";
import FinlandCapabilities from "@/components/finland/FinlandCapabilities";
import FinlandIndustries, { type IndustryTile } from "@/components/finland/FinlandIndustries";
import FinlandProcess from "@/components/finland/FinlandProcess";
import FinlandAbout from "@/components/finland/FinlandAbout";
import FinlandPresence from "@/components/finland/FinlandPresence";
import FinlandCTA from "@/components/finland/FinlandCTA";
import type { FiProject, FiProjects } from "@/components/finland/types";
import JsonLd from "@/components/JsonLd";
import { site, testimonials } from "@/lib/content";
import { allProjects } from "@/lib/projects-fs";
import { breadcrumbSchema, schemaGraph } from "@/lib/schema";
import {
  cld,
  finlandCaseStudies,
  finlandHasPlaceholders,
  finlandIndustries,
  finlandServices,
  finlandWorkLayout,
} from "@/lib/finland";

const PATH = "/finland/";
const URL_ = site.canonical(PATH);
const TITLE = "Digital Agency Finland | Uniix Studio";
const DESCRIPTION =
  "Uniix Studio creates websites, digital products, brands and growth experiences for ambitious businesses in Finland and internationally.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL_ },
  // Kept out of the index until the placeholders in lib/finland.ts are
  // replaced — see `finlandHasPlaceholders`.
  robots: finlandHasPlaceholders ? { index: false, follow: true } : { index: true, follow: true },
  openGraph: {
    type: "website",
    url: URL_,
    title: TITLE,
    description: DESCRIPTION,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/** Every project the page references, reduced to what it renders. */
function collectProjects(): FiProjects {
  const slugs = new Set<string>([
    finlandWorkLayout.lead,
    ...finlandWorkLayout.pair,
    finlandWorkLayout.feature,
    ...finlandCaseStudies,
    ...finlandServices.map((s) => s.project),
    ...finlandIndustries.flatMap((i) => (i.proofProject ? [i.proofProject] : [])),
    "rentmycar-lk",
    "st-lukes-medilab",
    "ecowave-energy",
    "sierra-energy-solutions",
  ]);
  const out: FiProjects = {};
  for (const slug of slugs) {
    const p = allProjects.find((x) => x.slug === slug && x.hasDetail);
    if (!p) continue;
    out[slug] = {
      slug: p.slug,
      title: p.title,
      client: p.client,
      industry: p.industry,
      services: p.overline,
      headline: p.headline,
      summary: p.summary,
      coverImage: cld(p.coverImage, 1800),
      year: p.year,
      problem: p.problem,
      solution: p.solution,
      result: p.result,
      stats: p.stats,
    };
  }
  return out;
}

/**
 * Testimonials that already exist in the codebase: project-linked ones from
 * MDX first (they carry a case study), then the site-wide list the homepage
 * already publishes. Nothing is written here.
 */
function collectTestimonials(projects: FiProjects): FiTestimonial[] {
  const fromProjects: FiTestimonial[] = allProjects.flatMap((p) =>
    p.testimonial && projects[p.slug]
      ? [
          {
            quote: p.testimonial.quote,
            name: p.testimonial.name,
            role: p.testimonial.role,
            project: { slug: p.slug, title: p.title, image: projects[p.slug].coverImage },
          },
        ]
      : [],
  );
  const sitewide: FiTestimonial[] = testimonials.map((t) => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    context: [t.project, t.year].filter(Boolean).join(" · ") || undefined,
  }));
  return [...fromProjects, ...sitewide];
}

function finlandSchema(projects: FiProject[]) {
  const base = site.url.replace(/\/$/, "");
  return schemaGraph(
    {
      "@type": "WebPage",
      "@id": `${URL_}#webpage`,
      url: URL_,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${base}/#website` },
      about: { "@id": `${URL_}#service` },
      mainEntity: {
        "@type": "ItemList",
        name: "Selected work",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${base}/portfolio/${p.slug}/`,
          name: p.title,
        })),
      },
    },
    {
      // Area served, provided by the existing Organization — deliberately not
      // a LocalBusiness with a Finnish address (no Finnish office exists).
      "@type": "Service",
      "@id": `${URL_}#service`,
      name: "Web design, development, product design and digital growth",
      serviceType: finlandServices.map((s) => s.title),
      description: DESCRIPTION,
      provider: { "@id": `${base}/#organization` },
      areaServed: { "@type": "Country", name: "Finland" },
    },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Finland", url: PATH },
    ]),
  );
}

export default function FinlandPage() {
  const projects = collectProjects();
  const caseStudies = finlandCaseStudies.map((s) => projects[s]).filter(Boolean) as FiProject[];
  const reviews = collectTestimonials(projects);

  const industries: IndustryTile[] = finlandIndustries.map((ind) => {
    const p = ind.proofProject ? projects[ind.proofProject] : undefined;
    return p ? { ...ind, proof: { image: p.coverImage, label: p.title, slug: p.slug } } : ind;
  });

  const workList = [finlandWorkLayout.lead, ...finlandWorkLayout.pair, finlandWorkLayout.feature]
    .map((s) => projects[s])
    .filter(Boolean) as FiProject[];

  return (
    <>
      <JsonLd data={finlandSchema(workList)} />
      {/*
        Client-first journey: discover → see the work → services → proof →
        capabilities → trust → contact. On mobile, reviews move above the case
        studies (CSS order only; both are self-contained sections).
      */}
      <div className="flex flex-col">
        <div className="order-1"><FinlandHero projects={projects} /></div>
        <div className="order-2"><FinlandWork projects={projects} /></div>
        <div className="order-3"><FinlandServices projects={projects} /></div>
        <div className="order-5 md:order-4"><FinlandCaseStudies items={caseStudies} /></div>
        <div className="order-4 md:order-5"><FinlandTestimonials items={reviews} /></div>
        <div className="order-6"><FinlandCapabilities /></div>
        <div className="order-7"><FinlandIndustries items={industries} /></div>
        <div className="order-8"><FinlandProcess /></div>
        <div className="order-9"><FinlandAbout projects={projects} /></div>
        <div className="order-10"><FinlandPresence /></div>
        <div className="order-11"><FinlandCTA /></div>
      </div>
    </>
  );
}
