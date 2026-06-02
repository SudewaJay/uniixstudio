import Link from "next/link";
import { getFeaturedPosts, formatDate } from "@/lib/blog-fs";
import Reveal from "./Reveal";

export default function BlogSection() {
  const posts = getFeaturedPosts(3);

  return (
    <section className="bg-bg-paper border-t border-line-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-brand-4 mb-5">
              <span className="w-10 h-px bg-brand-4" />
              Insights
            </span>
            <h2
              className="font-display font-medium text-ink tracking-[-0.025em]"
              style={{ fontSize: "clamp(40px,5vw,64px)", lineHeight: 1.05 }}
            >
              Insights for{" "}
              <span className="italic-display gradient-text">
                ambitious teams.
              </span>
            </h2>
            <p className="mt-5 text-[17px] leading-[1.6] text-ink-2 max-w-[52ch]">
              Field notes on design, growth, and what we&apos;ve learned
              shipping work for global brands.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-line pt-12 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i as 0 | 1 | 2}>
              <article className="group flex max-w-xl flex-col items-start justify-between h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block w-full mb-5 overflow-hidden rounded-2xl aspect-[16/10] bg-bg-warm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>

                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={post.publishDate}
                    className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute"
                  >
                    {formatDate(post.publishDate)}
                  </time>
                  <span className="rounded-full border border-line bg-bg-warm px-3 py-1.5 font-medium text-ink-2 text-[11px] tracking-wide hover:bg-bg transition-colors">
                    {post.category}
                  </span>
                </div>

                <div className="relative grow">
                  <h3 className="mt-4 font-display font-medium text-ink text-[22px] md:text-[24px] leading-[1.2] tracking-[-0.015em] group-hover:text-brand-4 transition-colors duration-300">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 line-clamp-3 text-[14.5px] leading-[1.6] text-ink-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="relative mt-6 flex items-center gap-x-4 pt-6 border-t border-line-soft w-full">
                  <div className="size-10 rounded-full bg-brand-grad text-white grid place-items-center font-display font-semibold text-[15px] flex-shrink-0">
                    {post.author.initial}
                  </div>
                  <div className="text-sm/6">
                    <p className="font-semibold text-ink text-[13.5px]">
                      {post.author.name}
                    </p>
                    <p className="text-ink-mute text-[12px] mt-0.5">
                      {post.author.role}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/blog" className="btn btn-ghost">
            Read all insights ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
