import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getPost, posts, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== params.slug).slice(0, 3);

  return (
    <article>
      {/* Header */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="wrap">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 text-xs mb-6">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                  {formatDate(post.date)}
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
          <div className="max-w-[68ch] mx-auto">
            {post.body.map((section, i) => (
              <Reveal key={i} delay={(i % 4) as 0 | 1 | 2 | 3}>
                {section.heading && (
                  <h2
                    className="font-display font-medium text-ink mt-12 mb-5 leading-[1.15] tracking-[-0.015em]"
                    style={{ fontSize: "clamp(24px,2.6vw,32px)" }}
                  >
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-[17px] leading-[1.75] text-ink-2 mb-5"
                  >
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="bg-bg-paper border-t border-line-soft py-20 md:py-28">
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
                      {formatDate(rp.date)}
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
