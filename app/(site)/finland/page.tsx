import type { Metadata } from "next";
import FinlandHero from "@/components/finland/FinlandHero";
import FinlandBridge from "@/components/finland/FinlandBridge";
import FinlandCapabilities from "@/components/finland/FinlandCapabilities";
import FinlandServices from "@/components/finland/FinlandServices";
import FinlandTransformation from "@/components/finland/FinlandTransformation";
import FinlandIndustries, { type IndustryTile } from "@/components/finland/FinlandIndustries";
import FinlandPortfolio, { type FinlandWorkItem } from "@/components/finland/FinlandPortfolio";
import FinlandProcess from "@/components/finland/FinlandProcess";
import FinlandPartner from "@/components/finland/FinlandPartner";
import FinlandWhy from "@/components/finland/FinlandWhy";
import FinlandEngagement from "@/components/finland/FinlandEngagement";
import FinlandCTA from "@/components/finland/FinlandCTA";
import FinlandHuman from "@/components/finland/FinlandHuman";
import FinlandBreak from "@/components/finland/FinlandBreak";
import FinlandJourney, { type JourneyScreen } from "@/components/finland/FinlandJourney";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/content";
import { allProjects } from "@/lib/projects-fs";
import { breadcrumbSchema, schemaGraph } from "@/lib/schema";
import {
  finlandHasPlaceholders,
  finlandIndustries,
  finlandServices,
  finlandWorkOrder,
} from "@/lib/finland";

const PATH = "/finland/";
const URL_ = site.canonical(PATH);
const TITLE = "Digital Agency in Finland | Uniix Studio";
const DESCRIPTION =
  "Uniix is an international digital studio combining UX, design, technology and growth for ambitious businesses in Finland and beyond.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL_ },
  // Kept out of the index until the partner / contact placeholders in
  // lib/finland.ts are replaced — see `finlandHasPlaceholders`.
  robots: finlandHasPlaceholders ? { index: false, follow: true } : { index: true, follow: true },
  openGraph: {
    type: "website",
    url: URL_,
    title: TITLE,
    description: DESCRIPTION,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * Structured data. Deliberately a WebPage + Service with `areaServed:
 * Finland`, provided by the existing Organization node — NOT a second
 * LocalBusiness with a Finnish address, because no Finnish office exists.
 */
function finlandSchema() {
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
    },
    {
      "@type": "Service",
      "@id": `${URL_}#service`,
      name: "Digital design, development and growth for businesses in Finland",
      serviceType: [
        "Web design",
        "Web development",
        "UX/UI design",
        "Digital product development",
        "Software development",
        "SEO and growth",
        "AI and automation",
      ],
      description: DESCRIPTION,
      provider: { "@id": `${base}/#organization` },
      areaServed: { "@type": "Country", name: "Finland" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: finlandServices.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.desc },
        })),
      },
    },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Finland", url: PATH },
    ]),
  );
}

export default function FinlandPage() {
  // Selected work: existing case studies, content straight from their MDX.
  const work: FinlandWorkItem[] = finlandWorkOrder.flatMap((slug) => {
    const p = allProjects.find((x) => x.slug === slug);
    if (!p) return [];
    return [
      {
        slug: p.slug,
        title: p.title,
        industry: p.industry,
        services: p.overline,
        impact: p.headline,
        stat: p.stats?.[0],
        coverImage: p.coverImage,
        year: p.year,
      },
    ];
  });

  const industries: IndustryTile[] = finlandIndustries.map((ind) => {
    const p = ind.proofProject ? allProjects.find((x) => x.slug === ind.proofProject) : undefined;
    return p
      ? { ...ind, proof: { image: p.coverImage, label: p.client ?? p.title, slug: p.slug } }
      : ind;
  });

  const lead = work[0];
  const journeyScreen: JourneyScreen | null = lead
    ? { src: lead.coverImage, title: lead.title, slug: lead.slug }
    : null;

  return (
    <>
      <JsonLd data={finlandSchema()} />
      {/* Rhythm: digital → human → digital → nature → work → human → cinematic close */}
      {/* 01 */} <FinlandHero />
      {/* 02 */} <FinlandBridge />
      {/* 02b human */} <FinlandHuman />
      {/* 03 */} <FinlandCapabilities />
      {/* 04 */} <FinlandServices />
      {/* 04b nature */} <FinlandBreak />
      {/* 05 */} <FinlandTransformation />
      {/* 06 */} <FinlandIndustries items={industries} />
      {/* 07 */} <FinlandPortfolio items={work} />
      {/* 07b signature */} {journeyScreen && <FinlandJourney screen={journeyScreen} />}
      {/* 08 */} <FinlandProcess />
      {/* 09 */} <FinlandPartner />
      {/* 10 */} <FinlandWhy />
      {/* 11 */} <FinlandEngagement />
      {/* 12 */} <FinlandCTA />
    </>
  );
}
