import type { Metadata } from "next";
import PortfolioArchiveClient from "@/components/portfolio/PortfolioArchiveClient";
import { getProjects } from "@/lib/cms/projects";
import type { Project } from "@/lib/projects";
import { site } from "@/lib/content";
import { breadcrumbSchema, schemaGraph } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Portfolio / Selected Work | Uniix Studio",
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

/** Only what the archive cards render — keeps case-study payloads off the client. */
function toCard(p: Project): Project {
  const { slug, title, overline, year, feature, headline, summary, bg, bigText, bigClass, coverImage, tags, audienceTier, client, industry, services, deliverables, hasDetail } = p;
  return { slug, title, overline, year, feature, headline, summary, bg, bigText, bigClass, coverImage, tags, audienceTier, client, industry, services, deliverables, hasDetail };
}

export default async function PortfolioPage() {
  const allProjects = await getProjects();
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

  return (
    <>
      <JsonLd data={schemaGraph(crumbs, collectionSchema)} />
      <PortfolioArchiveClient initialProjects={allProjects.map(toCard)} />
    </>
  );
}
