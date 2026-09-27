import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Reveal from "@/components/Reveal";
import { formatDate } from "@/lib/format";
import { getPost, getPosts } from "@/lib/cms/blog";
import { getLocations } from "@/lib/cms/locations";
import { getServices } from "@/lib/cms/services";
import { getSiteSettings } from "@/lib/cms/site";
import { buildMetadata } from "@/lib/cms/seo";
import { notFoundOrRedirect } from "@/lib/cms/redirects";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  schemaGraph,
} from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import EditorialArticle from "@/components/blog/EditorialArticle";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article" };
  return buildMetadata({
    path: `/blog/${slug}/`,
    title: post.seoTitle ?? post.title,
    description: post.metaDescription,
    image: post.ogImage ?? post.coverImage,
    type: "article",
    publishedTime: post.publishDate,
    modifiedTime: post.updatedDate,
    seo: post.seo,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPublished, locations, allServices, settings] = await Promise.all([
    getPost(slug),
    getPosts(),
    getLocations(),
    getServices(),
    getSiteSettings(),
  ]);
  if (!post) return notFoundOrRedirect(`/blog/${slug}/`);

  // Rotate the published list to start right after the current post (wrapping
  // around) so every post is surfaced as "related" by the posts preceding it.
  // The previous `.slice(0, 3)` always linked the same first three posts,
  // leaving every other post with only its single blog-index link (Semrush:
  // "pages have only one incoming internal link"). Same-category posts are
  // preferred for relevance, then the rotated sequence fills the rest — which
  // guarantees no post is orphaned.
  const curIdx = allPublished.findIndex((p) => p.slug === slug);
  const rotated =
    curIdx >= 0
      ? [...allPublished.slice(curIdx + 1), ...allPublished.slice(0, curIdx)]
      : allPublished.filter((p) => p.slug !== slug);
  // Hand-picked cluster posts (frontmatter `relatedPosts`) lead; the rotation
  // fills any remaining slots.
  const picked = (post.relatedPosts ?? [])
    .map((s) => allPublished.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p) && p!.slug !== slug);
  const pickedSlugs = new Set(picked.map((p) => p.slug));
  const related = [
    ...picked,
    ...rotated.filter((p) => p.category === post.category && !pickedSlugs.has(p.slug)),
    ...rotated.filter((p) => p.category !== post.category && !pickedSlugs.has(p.slug)),
  ].slice(0, 3);

  // Location pages that reference this post → reverse internal link, so the
  // link equity flows both ways (post ↔ service-area page).
  const servingAreas = locations.filter((l) => l.relatedPosts.includes(slug));

  const schemas: object[] = [
    articleSchema(post),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Insights", url: "/blog/" },
      { name: post.title, url: `/blog/${post.slug}/` },
    ]),
  ];
  if (post.faqs && post.faqs.length > 0 && post.faqSchema !== false) {
    schemas.push(faqPageSchema(post.faqs));
  }
  const pageSchema = schemaGraph(...schemas);

  if (post.layout === "editorial") {
    return (
      <EditorialArticle
        post={post}
        schema={pageSchema}
        related={related}
        servingAreas={servingAreas.map(({ slug, name }) => ({ slug, name }))}
        allServices={allServices}
        contact={{ whatsappLink: settings.whatsappLink, phone: settings.phone }}
      />
    );
  }

  return (
    <article>
      <JsonLd data={pageSchema} />
      {/* Header */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="wrap">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 text-xs mb-6 flex-wrap">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                  {formatDate(post.publishDate)}
                </span>
                <span className="text-ink-mute">·</span>
                <span className="rounded-full border border-line bg-bg-warm px-3 py-1.5 font-medium text-ink-2 text-[11px]">
                  {post.category}
                </span>
                <span className="text-ink-mute">·</span>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                  {post.readTime}
                </span>
              </div>
              <h1
                className="font-display font-medium text-ink leading-[1.05] tracking-[-0.025em]"
                style={{ fontSize: "clamp(36px,5.5vw,72px)" }}
              >
                {post.title}
              </h1>
              <p className="mt-6 text-[18px] md:text-[20px] leading-[1.55] text-ink-2 max-w-[60ch] mx-auto">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-center gap-3 mt-10">
                <div className="size-12 rounded-full bg-brand-grad text-white grid place-items-center font-display font-semibold text-[18px]">
                  {post.author.initial}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-ink text-[14px]">
                    {post.author.name}
                  </p>
                  <p className="text-ink-mute text-[12px]">{post.author.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cover */}
      <section className="pb-12 md:pb-16">
        <div className="wrap">
          <Reveal>
            <div className="aspect-[16/8] rounded-lg2 overflow-hidden bg-bg-warm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.coverAlt ?? ""}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <div className="max-w-[68ch] mx-auto prose-uniix">
            <Reveal amount="some">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  img: ({ src, alt }) =>
                    typeof src === "string" ? (
                      <figure className="my-8">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt={alt ?? ""}
                          loading="lazy"
                          className="w-full rounded-xl border border-line bg-bg-warm"
                        />
                        {alt ? (
                          <figcaption className="mt-3 text-center text-sm text-ink-2/70">
                            {alt}
                          </figcaption>
                        ) : null}
                      </figure>
                    ) : null,
                  table: ({ children }) => (
                    <div className="my-8 overflow-x-auto rounded-xl border border-line">
                      <table className="w-full border-collapse text-[15px] text-ink-2">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-bg-warm text-ink">{children}</thead>
                  ),
                  th: ({ children }) => (
                    <th className="border-b border-line px-4 py-3 text-left font-semibold align-top">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border-b border-line px-4 py-3 align-top leading-[1.6]">
                      {children}
                    </td>
                  ),
                  iframe: ({ src, title, ...rest }) => (
                    <span className="block my-8 rounded-xl overflow-hidden border border-line bg-bg-warm">
                      <span
                        className="block relative w-full"
                        style={{ paddingTop: "56.25%" }}
                      >
                        <iframe
                          src={src}
                          title={title ?? "Embedded video"}
                          loading="lazy"
                          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                          {...rest}
                        />
                      </span>
                    </span>
                  ),
                  h1: ({ children }) => (
                    <h1
                      className="font-display font-medium text-ink mt-12 mb-6 leading-[1.1] tracking-[-0.02em]"
                      style={{ fontSize: "clamp(28px,3.4vw,40px)" }}
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2
                      className="font-display font-medium text-ink mt-12 mb-5 leading-[1.15] tracking-[-0.015em]"
                      style={{ fontSize: "clamp(24px,2.6vw,32px)" }}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-display font-medium text-ink mt-8 mb-3 text-[22px] leading-[1.2] tracking-[-0.01em]">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-[17px] leading-[1.75] text-ink-2 mb-5">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 my-5 text-[17px] leading-[1.75] text-ink-2 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 my-5 text-[17px] leading-[1.75] text-ink-2 space-y-2">
                      {children}
                    </ol>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-ink font-semibold">{children}</strong>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-brand-3 pl-5 my-7 italic text-ink-2 text-[18px] leading-[1.6]">
                      {children}
                    </blockquote>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-brand-4 underline underline-offset-4 hover:text-brand-3 transition-colors"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {post.body}
              </ReactMarkdown>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {post.faqs && post.faqs.length > 0 && (
        <section className="pb-20 md:pb-28">
          <div className="wrap">
            <div className="max-w-[68ch] mx-auto">
              <Reveal>
                <h2
                  className="font-display font-medium text-ink mb-8 leading-[1.15] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(28px,3.2vw,40px)" }}
                >
                  Frequently asked questions
                </h2>
              </Reveal>
              <dl className="flex flex-col gap-6">
                {post.faqs.map((f, i) => (
                  <Reveal key={f.question} delay={(i % 3) as 0 | 1 | 2}>
                    <div className="border-t border-line pt-6">
                      <dt className="font-display font-medium text-ink text-[20px] leading-[1.3] tracking-[-0.01em] mb-3">
                        {f.question}
                      </dt>
                      <dd className="text-[17px] leading-[1.7] text-ink-2">
                        {f.answer}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </section>
      )}

      {/* CTA block */}
      {post.ctaBlock && (
        <section className="bg-bg-paper border-y border-line-soft py-16 md:py-20">
          <div className="wrap">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-[20px] md:text-[24px] leading-[1.4] text-ink mb-6 font-display font-medium tracking-[-0.015em]">
                  {post.ctaBlock}
                </p>
                <Link href="/contact" className="btn btn-primary inline-flex">
                  Get a free brand audit ↗
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Serving local areas — reverse link to service-area pages */}
      {servingAreas.length > 0 && (
        <section className="py-14 md:py-16 border-t border-line-soft">
          <div className="wrap">
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute mb-3">
                Local web design & SEO
              </p>
              <p className="text-ink/75 text-[16px] leading-[1.6] mb-5">
                Uniix Studio puts these tactics to work for businesses across{" "}
                {servingAreas.map((a, i) => (
                  <span key={a.slug}>
                    <Link
                      href={`/locations/${a.slug}`}
                      className="font-medium text-ink underline underline-offset-4 decoration-line hover:decoration-ink transition-colors"
                    >
                      {a.name}
                    </Link>
                    {i < servingAreas.length - 2
                      ? ", "
                      : i === servingAreas.length - 2
                        ? " and "
                        : ""}
                  </span>
                ))}
                .
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="bg-bg py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <h2
              className="font-display font-medium text-ink mb-10 tracking-[-0.02em]"
              style={{ fontSize: "clamp(28px,3.5vw,42px)" }}
            >
              Continue reading
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {related.map((rp, i) => (
              <Reveal key={rp.slug} delay={i as 0 | 1 | 2}>
                <article className="group flex flex-col h-full">
                  <Link
                    href={`/blog/${rp.slug}`}
                    className="block w-full mb-4 overflow-hidden rounded-2xl aspect-[16/10] bg-bg-warm"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rp.coverImage}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex items-center gap-x-3 text-xs">
                    <time className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                      {formatDate(rp.publishDate)}
                    </time>
                    <span className="rounded-full border border-line bg-bg px-3 py-1 font-medium text-ink-2 text-[11px]">
                      {rp.category}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display font-medium text-ink text-[20px] leading-[1.2] tracking-[-0.015em] group-hover:text-brand-4 transition-colors">
                    <Link href={`/blog/${rp.slug}`}>{rp.title}</Link>
                  </h3>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/blog" className="btn btn-ghost">
              All insights ↗
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
