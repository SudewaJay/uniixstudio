import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Reveal from "@/components/Reveal";
import { getPost, allPosts as posts, formatDate } from "@/lib/blog-fs";
import { articleSchema, breadcrumbSchema, schemaGraph } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/content";
import { ogImageUrl, ogImageMeta } from "@/lib/og-image";

export function generateStaticParams() {
  return posts.filter((p) => !p.isStub).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article" };
  const canonical = site.canonical(`/blog/${slug}/`);
  const ogImages = ogImageMeta(post.coverImage);
  const twitterImage = ogImageUrl(post.coverImage);
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: canonical,
      images: ogImages,
      type: "article",
      publishedTime: post.publishDate,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: twitterImage ? [twitterImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || post.isStub) notFound();

  const related = posts
    .filter((p) => !p.isStub && p.slug !== slug)
    .slice(0, 3);

  const pageSchema = schemaGraph(
    articleSchema(post),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Insights", url: "/blog/" },
      { name: post.title, url: `/blog/${post.slug}/` },
    ]),
  );

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
                alt=""
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
            <Reveal>
              <ReactMarkdown
                components={{
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
