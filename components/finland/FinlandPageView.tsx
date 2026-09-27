import type { Metadata } from "next";
import FinlandHero from "./FinlandHero";
import FinlandWork from "./FinlandWork";
import FinlandServices from "./FinlandServices";
import FinlandCaseStudies from "./FinlandCaseStudies";
import FinlandTestimonials, { type FiTestimonial } from "./FinlandTestimonials";
import FinlandCapabilities from "./FinlandCapabilities";
import FinlandIndustries, { type IndustryTile } from "./FinlandIndustries";
import FinlandProcess from "./FinlandProcess";
import FinlandAbout from "./FinlandAbout";
import FinlandPresence from "./FinlandPresence";
import FinlandCTA from "./FinlandCTA";
import type { FiProject, FiProjects } from "./types";
import JsonLd from "../JsonLd";
import { site } from "@/lib/content";
import type { Project } from "@/lib/projects";
import { getProjects } from "@/lib/cms/projects";
import { getFeaturedTestimonials, type TestimonialItem } from "@/lib/cms/content";
import { breadcrumbSchema, schemaGraph } from "@/lib/schema";
import {
  cld,
  finlandCaseStudies,
  finlandHasPlaceholders,
  finlandIndustries,
  finlandServices,
  finlandWorkLayout,
} from "@/lib/finland";
import {
  finlandPaths,
  fiProjects,
  fiStatLabels,
  getFinlandContent,
  type FiLang,
} from "@/lib/finland-i18n";

/** Metadata for either language, with hreflang alternates between them. */
export function finlandMetadata(lang: FiLang): Metadata {
  const { meta } = getFinlandContent(lang).t;
  const url = site.canonical(finlandPaths[lang]);
  return {
    metadataBase: new URL(site.url),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: url,
      languages: {
        en: site.canonical(finlandPaths.en),
        fi: site.canonical(finlandPaths.fi),
        "x-default": site.canonical(finlandPaths.en),
      },
    },
    // Out of the index until the placeholders in lib/finland.ts are replaced.
    robots: finlandHasPlaceholders ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      title: meta.title,
      description: meta.description,
      siteName: site.name,
      locale: lang === "fi" ? "fi_FI" : "en_US",
      alternateLocale: lang === "fi" ? ["en_US"] : ["fi_FI"],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

/** Every project the page references, reduced to what it renders, localized. */
function collectProjects(lang: FiLang, allProjects: Project[]): FiProjects {
  const slugs = new Set<string>([
    finlandWorkLayout.lead,
    ...finlandWorkLayout.pair,
    finlandWorkLayout.feature,
    ...finlandCaseStudies,
    ...finlandServices.map((s) => s.project),
    ...finlandIndustries.flatMap((i) => (i.proofProject ? [i.proofProject] : [])),
    ...finlandWorkLayout.strip.map((s) => s.project),
  ]);
  const out: FiProjects = {};
  for (const slug of slugs) {
    const p = allProjects.find((x) => x.slug === slug && x.hasDetail);
    if (!p) continue;
    const tr = lang === "fi" ? fiProjects[slug] : undefined;
    out[slug] = {
      slug: p.slug,
      title: p.title,
      client: p.client,
      industry: tr?.industry ?? p.industry,
      services: tr?.services ?? p.overline,
      headline: tr?.headline ?? p.headline,
      summary: p.summary,
      coverImage: cld(p.coverImage, 1800),
      year: p.year,
      problem: tr?.problem ?? p.problem,
      solution: tr?.solution ?? p.solution,
      result: tr?.result ?? p.result,
      stats: p.stats?.map((s) => ({ ...s, label: lang === "fi" ? (fiStatLabels[s.label] ?? s.label) : s.label })),
    };
  }
  return out;
}

/**
 * Testimonials that already exist in the codebase — project MDX first, then
 * the site-wide list the homepage publishes. Quotes are never translated.
 */
function collectTestimonials(
  projects: FiProjects,
  allProjects: Project[],
  testimonials: TestimonialItem[],
): FiTestimonial[] {
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

function finlandSchema(lang: FiLang, projects: FiProject[]) {
  const c = getFinlandContent(lang);
  const base = site.url.replace(/\/$/, "");
  const url = site.canonical(finlandPaths[lang]);
  return schemaGraph(
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: c.t.meta.title,
      description: c.t.meta.description,
      inLanguage: lang,
      isPartOf: { "@id": `${base}/#website` },
      about: { "@id": `${url}#service` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${base}/portfolio/${p.slug}/`,
          name: p.title,
        })),
      },
    },
    {
      // Provided by the existing Organization — deliberately not a
      // LocalBusiness with a Finnish address (no Finnish office exists).
      "@type": "Service",
      "@id": `${url}#service`,
      name: c.t.meta.title.split("|")[0].trim(),
      serviceType: c.services.map((s) => s.title),
      description: c.t.meta.description,
      provider: { "@id": `${base}/#organization` },
      areaServed: { "@type": "Country", name: lang === "fi" ? "Suomi" : "Finland" },
    },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: lang === "fi" ? "Suomi" : "Finland", url: finlandPaths[lang] },
    ]),
  );
}

export default async function FinlandPageView({ lang }: { lang: FiLang }) {
  const c = getFinlandContent(lang);
  const [allProjects, testimonials] = await Promise.all([getProjects(), getFeaturedTestimonials()]);
  const projects = collectProjects(lang, allProjects);
  const caseStudies = finlandCaseStudies.map((s) => projects[s]).filter(Boolean) as FiProject[];
  const reviews = collectTestimonials(projects, allProjects, testimonials);

  const industries: IndustryTile[] = c.industries.map((ind) => {
    const p = ind.proofProject ? projects[ind.proofProject] : undefined;
    return p ? { ...ind, proof: { image: p.coverImage, label: p.title, slug: p.slug } } : ind;
  });

  const workList = [finlandWorkLayout.lead, ...finlandWorkLayout.pair, finlandWorkLayout.feature]
    .map((s) => projects[s])
    .filter(Boolean) as FiProject[];

  return (
    <>
      <JsonLd data={finlandSchema(lang, workList)} />
      {/*
        Client-first journey: discover → work → services → proof →
        capabilities → trust → contact. On mobile, reviews move above the case
        studies (CSS order only). `lang` marks the Finnish version for screen
        readers and translation tools; the site nav and footer stay English.
      */}
      <div lang={lang} className="flex flex-col">
        <div className="order-1"><FinlandHero projects={projects} c={c} /></div>
        <div className="order-2"><FinlandWork projects={projects} c={c} /></div>
        <div className="order-3"><FinlandServices projects={projects} c={c} /></div>
        <div className="order-5 md:order-4"><FinlandCaseStudies items={caseStudies} t={c.t.cases} /></div>
        <div className="order-4 md:order-5"><FinlandTestimonials items={reviews} t={c.t.reviews} /></div>
        <div className="order-6"><FinlandCapabilities items={c.capabilities} t={c.t.capabilities} /></div>
        <div className="order-7"><FinlandIndustries items={industries} t={c.t.industries} /></div>
        <div className="order-8"><FinlandProcess steps={c.process} t={c.t.process} /></div>
        <div className="order-9"><FinlandAbout projects={projects} c={c} /></div>
        <div className="order-10"><FinlandPresence c={c} /></div>
        <div className="order-11"><FinlandCTA t={c.t.cta} /></div>
      </div>
    </>
  );
}
