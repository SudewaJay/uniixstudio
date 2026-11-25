import type { Metadata } from "next";
import { getPosts } from "@/lib/cms/blog";
import { buildMetadata } from "@/lib/cms/seo";
import Link from "next/link";
import BlogArchive, { type ArchivePost } from "@/components/blog/BlogArchive";
import SmartImage from "@/components/ui/SmartImage";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

const base = buildMetadata({
  path: "/blog/",
  title: "Digital Marketing & Design Blog Sri Lanka | Uniix Studio",
  description:
    "Field notes on design, growth, and digital marketing — learnings from shipping work for brands across Sri Lanka, Australia and the UK. The Uniix Studio blog.",
});

export const metadata: Metadata = {
  ...base,
  alternates: { ...base.alternates, types: { "application/rss+xml": site.canonical("/blog/rss.xml") } },
};

const PILLAR_ORDER = ["Design", "Technology", "Growth"];

export default async function BlogIndexPage() {
  // Published, non-future posts only. Only the fields the archive renders
  // cross to the client (bodies would add ~280KB to the RSC payload).
  const all = await getPosts();
  const featured = all.find((p) => p.featured) ?? all[0];
  const posts: ArchivePost[] = all.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    publishDate: p.publishDate,
    readTime: p.readTime,
    coverImage: p.coverImage,
    author: p.author.name,
  }));
  const categories = [
    ...PILLAR_ORDER.filter((c) => posts.some((p) => p.category === c)),
    ...[...new Set(posts.map((p) => p.category))].filter((c) => !PILLAR_ORDER.includes(c)).sort(),
  ];

  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Insights", url: "/blog/" },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />

      {/* ------------------------------------------------ Masthead */}
      <section aria-labelledby="blog-title" className="bg-bg pb-14 pt-[calc(var(--header-h)+56px)] md:pb-20 md:pt-[calc(var(--header-h)+80px)]">
        <div className="wrap-wide">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-ink pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">
            <span>The Uniix Studio journal</span>
            <span>{posts.length} articles</span>
          </div>
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end">
            <h1
              id="blog-title"
              className="font-display font-medium leading-[0.82] tracking-[-0.065em] text-ink text-[clamp(88px,17vw,290px)]"
            >
              <span className="mask-line block">
                <span className="block" style={{ animationDelay: "100ms" }}>
                  Insights
                </span>
              </span>
            </h1>
            <div className="rise-in lg:pb-6" style={{ animationDelay: "380ms" }}>
              <p className="max-w-[32ch] text-[clamp(17px,1.4vw,21px)] leading-[1.45] text-ink-2">
                Notes on design, technology and growth, from the projects we work on.
              </p>
              <ul className="mt-6 border-t border-ink/15">
                {categories.filter((c) => PILLAR_ORDER.includes(c)).map((c) => (
                  <li key={c} className="border-b border-ink/15">
                    <Link
                      href={`/blog/?category=${c.toLowerCase()}#archive`}
                      className="group flex items-baseline justify-between py-3 text-[15px] text-ink hover:text-brand-ink"
                    >
                      <span className="font-display text-[20px] font-medium tracking-[-0.02em]">{c}</span>
                      <span className="font-mono text-[11px] text-ink-mute">{posts.filter((p) => p.category === c).length}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ Featured */}
      {featured && (
        <section aria-labelledby="featured-post" className="bg-bg pb-20 md:pb-28">
          <div className="wrap-wide">
            <article className="group grid gap-8 lg:grid-cols-12 lg:gap-10">
              <Link href={`/blog/${featured.slug}/`} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden bg-bg-warm lg:col-span-8">
                <span className="relative block aspect-[16/10]">
                  {featured.coverImage && (
                    <span className="proof-img absolute inset-0 block">
                      <SmartImage src={featured.coverImage} alt="" sizes="(min-width:1024px) 64vw, 100vw" priority />
                    </span>
                  )}
                </span>
              </Link>
              <div className="flex flex-col justify-between gap-8 lg:col-span-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-ink">Latest · {featured.category}</p>
                  <h2 id="featured-post" className="mt-4 font-display text-[clamp(32px,3.4vw,56px)] font-medium leading-[1] tracking-[-0.04em] text-ink">
                    <Link href={`/blog/${featured.slug}/`} className="hover:text-brand-ink">
                      {featured.title}
                    </Link>
                  </h2>
                  <p className="mt-5 text-[16.5px] leading-[1.6] text-ink-2">{featured.excerpt}</p>
                </div>
                <div className="flex items-center gap-4 border-t border-ink/15 pt-5">
                  <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-ink font-display text-[16px] font-semibold text-white">
                    {featured.author.initial}
                  </span>
                  <span className="text-[14px] leading-[1.4]">
                    <span className="block font-medium text-ink">{featured.author.name}</span>
                    <span className="block text-ink-mute">
                      <time dateTime={featured.publishDate}>{formatDate(featured.publishDate)}</time> · {featured.readTime}
                    </span>
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      <BlogArchive posts={posts} categories={categories} featuredSlug={featured?.slug} />

      {/* ------------------------------------------------ Onward */}
      <section aria-labelledby="blog-next" className="on-dark bg-bg-ink py-20 text-white md:py-28">
        <div className="wrap-wide grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <h2 id="blog-next" className="max-w-[16ch] font-display text-[clamp(40px,5vw,84px)] font-medium leading-[0.92] tracking-[-0.05em]">
            Want this applied to your business?
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Link href="/services/" className="btn btn-outline-light group">
              Explore services <span className="cta-arrow">↗</span>
            </Link>
            <Link href="/contact/" className="btn btn-light group">
              Discuss a project <span className="cta-arrow">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
