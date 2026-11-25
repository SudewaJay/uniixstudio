"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import SmartImage from "@/components/ui/SmartImage";
import { formatDate } from "@/lib/format";

export type ArchivePost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: string;
  coverImage: string;
  author: string;
};

const PAGE = 12;
const SORTS = [
  { id: "new", label: "Newest" },
  { id: "old", label: "Oldest" },
  { id: "az", label: "A–Z" },
] as const;
type Sort = (typeof SORTS)[number]["id"];

/**
 * The full archive. Every post is rendered into the HTML (so all of them are
 * linked and crawlable); filters, search and "show more" only toggle which
 * ones are visible. The chosen category is kept in the URL (?category=) so a
 * filtered view can be shared.
 *
 * Composition: the first two visible posts are large picture-led entries,
 * the rest an editorial list with the thumbnail on the right.
 */
export default function BlogArchive({
  posts,
  categories,
  featuredSlug,
}: {
  posts: ArchivePost[];
  categories: string[];
  /** Shown above the archive; left out of the default (unfiltered) view. */
  featuredSlug?: string;
}) {
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("new");
  const [shown, setShown] = useState(PAGE);

  // Read and write ?category= without a navigation.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("category");
    if (c && categories.some((x) => x.toLowerCase() === c.toLowerCase())) {
      setCat(categories.find((x) => x.toLowerCase() === c.toLowerCase())!);
    }
  }, [categories]);
  const choose = (c: string) => {
    setCat(c);
    setShown(PAGE);
    const url = new URL(window.location.href);
    if (c === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", c.toLowerCase());
    window.history.replaceState(null, "", url);
  };

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const untouched = cat === "all" && !needle && sort === "new";
    const list = posts.filter(
      (p) =>
        !(untouched && p.slug === featuredSlug) &&
        (cat === "all" || p.category === cat) &&
        (!needle || p.title.toLowerCase().includes(needle) || p.excerpt.toLowerCase().includes(needle)),
    );
    list.sort((a, b) =>
      sort === "az"
        ? a.title.localeCompare(b.title)
        : (+new Date(b.publishDate) - +new Date(a.publishDate)) * (sort === "new" ? 1 : -1),
    );
    return list;
  }, [posts, cat, q, sort, featuredSlug]);

  const order = new Map(visible.map((p, i) => [p.slug, i]));
  const count = (c: string) => (c === "all" ? posts.length : posts.filter((p) => p.category === c).length);

  return (
    <section id="archive" aria-labelledby="archive-title" className="bg-bg pb-24 md:pb-32">
      <h2 id="archive-title" className="sr-only">
        All articles
      </h2>

      {/* Controls */}
      <div className="sticky top-[calc(var(--header-h)-1px)] z-30 border-y border-ink/10 bg-bg/90 backdrop-blur-xl">
        <div className="wrap-wide flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by category" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">
            {["all", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => choose(c)}
                className={clsx(
                  "inline-flex min-h-[40px] items-baseline gap-1.5 whitespace-nowrap px-4 pt-[10px] text-[14px] font-medium transition-colors duration-micro",
                  cat === c ? "bg-ink text-white" : "text-ink-2 hover:bg-ink/5 hover:text-ink",
                )}
              >
                {c === "all" ? "All" : c}
                <span className={clsx("font-mono text-[10px]", cat === c ? "text-white/60" : "text-ink-mute")}>{count(c)}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label className="relative flex-1 lg:w-[280px] lg:flex-none">
              <span className="sr-only">Search articles</span>
              <input
                type="search"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setShown(PAGE);
                }}
                placeholder="Search articles"
                className="h-10 w-full border border-ink/15 bg-transparent px-3 text-[14px] text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none"
              />
            </label>
            <label>
              <span className="sr-only">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-10 border border-ink/15 bg-transparent px-2 text-[14px] text-ink focus:border-ink focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="wrap-wide">
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute" aria-live="polite">
          {visible.length} {visible.length === 1 ? "article" : "articles"}
          {q.trim() ? ` matching “${q.trim()}”` : ""}
        </p>

        {/* Every post is in the DOM; order and visibility follow the filters. */}
        <ol className="mt-8 grid gap-x-10 md:grid-cols-2">
          {posts.map((p) => {
            const i = order.get(p.slug);
            const hidden = i === undefined || i >= shown;
            const lead = i !== undefined && i < 2;
            return (
              <li
                key={p.slug}
                hidden={hidden}
                style={{ order: i ?? 9999 }}
                className={clsx(lead ? "mb-14 md:mb-20" : "md:col-span-2")}
              >
                {lead ? <Lead p={p} /> : <Row p={p} />}
              </li>
            );
          })}
        </ol>

        {visible.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-[28px] font-medium tracking-[-0.03em] text-ink">No articles match that.</p>
            <button
              type="button"
              className="btn btn-ghost mt-6"
              onClick={() => {
                setQ("");
                choose("all");
              }}
            >
              Show all articles
            </button>
          </div>
        )}

        {visible.length > shown && (
          <div className="mt-14 flex justify-center">
            <button type="button" onClick={() => setShown((n) => n + PAGE)} className="btn btn-primary">
              Show more <span className="font-mono text-[11px] opacity-70">({visible.length - shown} left)</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function Meta({ p }: { p: ArchivePost }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">
      <span className="text-brand-ink">{p.category}</span>
      <time dateTime={p.publishDate}>{formatDate(p.publishDate)}</time>
      <span>{p.readTime}</span>
    </p>
  );
}

function Lead({ p }: { p: ArchivePost }) {
  return (
    <article className="group">
      <Link href={`/blog/${p.slug}/`} className="block">
        <span className="relative block aspect-[16/10] overflow-hidden bg-bg-warm">
          {p.coverImage && (
            <span className="proof-img absolute inset-0 block">
              <SmartImage src={p.coverImage} alt="" sizes="(min-width:768px) 48vw, 100vw" />
            </span>
          )}
        </span>
        <span className="mt-6 block">
          <Meta p={p} />
          <span className="mt-3 block font-display text-[clamp(26px,2.6vw,40px)] font-medium leading-[1.05] tracking-[-0.035em] text-ink transition-colors duration-micro group-hover:text-brand-ink">
            {p.title}
          </span>
          <span className="mt-3 line-clamp-2 block max-w-[56ch] text-[15.5px] leading-[1.55] text-ink-2">{p.excerpt}</span>
        </span>
      </Link>
    </article>
  );
}

function Row({ p }: { p: ArchivePost }) {
  return (
    <article className="group border-t border-ink/12">
      <Link href={`/blog/${p.slug}/`} className="grid grid-cols-[minmax(0,1fr)_88px] items-center gap-6 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_160px] md:gap-10">
        <span>
          <Meta p={p} />
          <span className="mt-3 block font-display text-[clamp(20px,2vw,30px)] font-medium leading-[1.1] tracking-[-0.03em] text-ink transition-colors duration-micro group-hover:text-brand-ink">
            {p.title}
          </span>
        </span>
        <span className="hidden md:block">
          <span className="line-clamp-3 text-[15px] leading-[1.55] text-ink-2">{p.excerpt}</span>
        </span>
        <span className="relative block aspect-square overflow-hidden bg-bg-warm md:aspect-[4/3]">
          {p.coverImage && (
            <span className="proof-img absolute inset-0 block">
              <SmartImage src={p.coverImage} alt="" sizes="(min-width:768px) 160px, 88px" />
            </span>
          )}
        </span>
      </Link>
    </article>
  );
}
