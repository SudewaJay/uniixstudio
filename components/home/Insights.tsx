import Link from "next/link";
import { getFeaturedPosts, formatDate } from "@/lib/blog-fs";
import SmartImage from "../ui/SmartImage";
import Reveal from "../Reveal";

/**
 * Section 10 — Insights.
 *
 * Editorial hierarchy: one lead article at feature scale, two secondary
 * articles stacked beside it. Replaces the three equal cards, where each card
 * carried two links to the same URL and the image link had no accessible name
 * (alt="" inside an <a> with no text — a WCAG 2.4.4 failure).
 *
 * Article URLs are untouched.
 */
export default function Insights() {
  const posts = getFeaturedPosts(3);
  if (posts.length === 0) return null;

  const [lead, ...rest] = posts;

  return (
    <section className="section bg-bg-paper">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <Reveal>
            <span className="eyebrow">Insights</span>
            <h2 className="t-h2 mt-5">
              Field notes for
              <br />
              <span className="t-italic accent-grad-text">ambitious teams.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <Link href="/blog" className="btn btn-secondary btn-sm group">
              All insights <span className="cta-arrow">↗</span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          {/* -------------------------------------------------- Lead story */}
          <Reveal>
            <article className="group relative flex flex-col">
              <div className="frame aspect-[16/10]">
                <SmartImage
                  src={lead.coverImage}
                  alt=""
                  sizes="(min-width:1024px) 55vw, 92vw"
                />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <time
                  dateTime={lead.publishDate}
                  className="t-meta text-ink-mute text-[10px]"
                >
                  {formatDate(lead.publishDate)}
                </time>
                <span className="rounded-full border border-line bg-bg-warm px-3 py-1.5 text-[11px] font-medium text-ink-2">
                  {lead.category}
                </span>
              </div>
              <h3 className="t-h3 mt-4 text-[clamp(24px,2.6vw,34px)] transition-colors duration-micro group-hover:text-brand-ink">
                {/* Single stretched link — one tab stop, one accessible name. */}
                <Link href={`/blog/${lead.slug}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {lead.title}
                </Link>
              </h3>
              <p className="t-body mt-4 max-w-[58ch] text-ink-2 line-clamp-3">
                {lead.excerpt}
              </p>
              <span className="link-cta mt-6 self-start">
                Read article <span className="cta-arrow">↗</span>
              </span>
            </article>
          </Reveal>

          {/* ------------------------------------------------- Secondaries */}
          <ul className="flex flex-col">
            {rest.map((post, i) => (
              <li key={post.slug} className="border-t border-line first:border-t-0 lg:first:border-t">
                <Reveal delay={((i + 1) % 3) as 0 | 1 | 2}>
                  <article className="group relative flex gap-5 py-7">
                    <div className="frame aspect-square w-24 shrink-0 sm:w-32">
                      <SmartImage
                        src={post.coverImage}
                        alt=""
                        sizes="(min-width:640px) 128px, 96px"
                      />
                    </div>
                    <div className="min-w-0">
                      <time
                        dateTime={post.publishDate}
                        className="t-meta text-ink-mute text-[10px]"
                      >
                        {formatDate(post.publishDate)}
                      </time>
                      <h3 className="t-h4 mt-2.5 transition-colors duration-micro group-hover:text-brand-ink">
                        <Link href={`/blog/${post.slug}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="t-body mt-2 text-ink-mute line-clamp-2 text-[14px]">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
