import type { Metadata } from "next";
import PortfolioArchiveClient from "@/components/portfolio/PortfolioArchiveClient";
import { allProjects } from "@/lib/projects-fs";
import { site } from "@/lib/content";
import { breadcrumbSchema, schemaGraph } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
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

export default function PortfolioPage() {
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
      itemListElement: allProjects.map((p, i) => ({
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
      <PortfolioArchiveClient initialProjects={allProjects} />
    </>
  );
}
