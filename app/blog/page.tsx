import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { posts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Field notes on design, growth, and what we've learned shipping work for global brands. The Uniix Studio blog.",
};

export default function BlogIndexPage() {
  const [feature, ...rest] = posts;

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title={
          <>
            Field notes on design,{" "}
            <span className="italic-display gradient-text">growth, craft.</span>
          </>
        }
        lede="Honest writing about what's actually working — drawn from real client engagements, controlled tests, and a decade of agency operating."
      />

      {/* Featured post */}
      <section className="pb-12 md:pb-16">
        <div className="wrap">
          <Reveal>
            <Link
              href={`/blog/${feature.slug}`}
              className="group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-bg-paper border border-line rounded-lg2 overflow-hidden hover:shadow-soft transition-shadow duration-500"
            >
              <div className="aspect-[16/11] lg:aspect-[5/4] overflow-hidden bg-bg-warm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={feature.coverImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-10 lg:p-12 flex flex-col gap-5">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand-4">
                    Featured
                  </span>
                  <span className="text-ink-mute">·</span>
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                    {formatDate(feature.date)}
                  </span>
                  <span className="rounded-full border border-line bg-bg-warm px-3 py-1 font-medium text-ink-2 text-[11px]">
                    {feature.category}
                  </span>
                </div>
                <h2
                  className="font-display font-medium text-ink leading-[1.05] tracking-[-0.025em] group-hover:text-brand-4 transition-colors"
                  style={{ fontSize: "clamp(28px,3.6vw,46px)" }}
                >
                  {feature.title}
                </h2>
                <p className="text-[16px] leading-[1.65] text-ink-2 max-w-[58ch]">
                  {feature.excerpt}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="size-10 rounded-full bg-brand-grad text-white grid place-items-center font-display font-semibold text-[15px]">
                    {feature.author.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-[14px]">
                      {feature.author.name}
                    </p>
                    <p className="text-ink-mute text-[12px]">
                      {feature.readTime}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Rest of the posts */}
      <section className="pb-24 md:pb-32">
        <div className="wrap">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <article className="group flex flex-col h-full">
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
                      dateTime={post.date}
                      className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute"
                    >
                      {formatDate(post.date)}
                    </time>
                    <span className="rounded-full border border-line bg-bg-warm px-3 py-1.5 font-medium text-ink-2 text-[11px]">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display font-medium text-ink text-[22px] leading-[1.2] tracking-[-0.015em] group-hover:text-brand-4 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-[14.5px] leading-[1.6] text-ink-2 grow">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 pt-5 border-t border-line-soft flex items-center gap-3">
                    <div className="size-9 rounded-full bg-brand-grad text-white grid place-items-center font-display font-semibold text-[14px]">
                      {post.author.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-ink text-[13px]">
                        {post.author.name}
                      </p>
                      <p className="text-ink-mute text-[11.5px]">
                        {post.readTime}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
