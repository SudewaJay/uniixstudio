import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import RenderBlocks from "@/components/blocks/RenderBlocks";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getPage, getPageSummaries } from "@/lib/cms/pages";
import { getSiteSettings } from "@/lib/cms/site";
import { buildMetadata } from "@/lib/cms/seo";
import { notFoundOrRedirect } from "@/lib/cms/redirects";

/**
 * CMS landing & legal pages at /<slug>/, plus the site-wide fallback for any
 * URL no coded route matches: it applies CMS redirects before rendering 404.
 * Coded routes (/services, /blog…) always take precedence over this one.
 */
type Params = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  return (await getPageSummaries()).map((p) => ({ slug: [p.slug] }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (slug.length !== 1) return {};
  const [page, settings] = await Promise.all([getPage(slug[0]), getSiteSettings()]);
  if (!page) return {};
  return buildMetadata({
    path: `/${page.slug}/`,
    title: `${page.title} | ${settings.name}`,
    description: page.seo?.metaDescription || settings.description,
    seo: page.seo,
    fallbackImage: settings.defaultOgImage,
  });
}

export default async function CmsPage({ params }: Params) {
  const { slug } = await params;
  const path = `/${slug.join("/")}/`;
  const page = slug.length === 1 ? await getPage(slug[0]) : undefined;
  if (!page) return notFoundOrRedirect(path);

  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: page.title, url: path },
  ]);
  const startsWithHero = page.layout?.[0]?.blockType === "hero";

  return (
    <>
      <JsonLd data={crumbs} />
      {/* Every page needs exactly one H1: a leading Hero block provides it. */}
      {!startsWithHero && <PageHeader eyebrow={page.kind === "legal" ? "Legal" : ""} title={page.title} />}
      <RenderBlocks blocks={page.layout} slug={page.slug} />
    </>
  );
}
