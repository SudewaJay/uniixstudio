"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { type BlogPost, formatDate } from "@/lib/blog";

const TABS = [
  { id: "all", label: "View all" },
  { id: "Design", label: "Design" },
  { id: "Technology", label: "Technology" },
  { id: "Growth", label: "Growth" },
];

const SORT_OPTIONS = [
  { id: "recent", label: "Most recent" },
  { id: "oldest", label: "Oldest first" },
  { id: "az", label: "A → Z" },
];

const PAGE_SIZE = 6;

export default function BlogIndexClient({ posts }: { posts: BlogPost[] }) {
  const [tab, setTab] = useState<string>("all");
  const [sort, setSort] = useState<string>("recent");
  const [page, setPage] = useState<number>(1);

  // Featured = newest in current filter (also first in default sort)
  const filtered = useMemo(() => {
    return tab === "all" ? posts : posts.filter((p) => p.category === tab);
  }, [posts, tab]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "recent") {
      arr.sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate));
    } else if (sort === "oldest") {
      arr.sort((a, b) => +new Date(a.publishDate) - +new Date(b.publishDate));
    } else if (sort === "az") {
      arr.sort((a, b) => a.title.localeCompare(b.title));
    }
    return arr;
  }, [filtered, sort]);

  const featured = sorted[0];
  const rest = sorted.slice(1);

  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = rest.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const onTab = (id: string) => {
    setTab(id);
    setPage(1);
  };
  const onSort = (id: string) => {
    setSort(id);
    setPage(1);
  };

  return (
    <main className="wrap pb-24 md:pb-32 flex flex-col gap-12 md:gap-16">
      {/* Featured article — large hero card with image + dark gradient overlay */}
      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group relative block w-full overflow-hidden rounded-lg2 aspect-[16/10] md:aspect-[16/7] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.coverImage}
            alt=""
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,20,16,0) 0%, rgba(26,20,16,0.15) 45%, rgba(26,20,16,0.85) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12 text-white">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-brand-3">
                Featured
              </span>
              <span className="rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-1 text-[11px] font-medium">
                {featured.category}
              </span>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/70">
                {formatDate(featured.publishDate)}
              </span>
            </div>
            <div className="flex items-end justify-between gap-6">
              <div className="max-w-3xl">
                <h2
                  className="font-display font-medium leading-[1.05] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(28px,3.4vw,48px)" }}
                >
                  {featured.title}
                </h2>
                <p className="mt-3 text-[15px] md:text-[17px] leading-[1.55] text-white/85 line-clamp-2 max-w-[58ch]">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="size-11 rounded-full bg-brand-grad text-white grid place-items-center font-display font-semibold text-[16px] ring-2 ring-white/20">
                    {featured.author.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-[14px]">
                      {featured.author.name}
                    </p>
                    <p className="text-white/70 text-[12px]">
                      {featured.readTime}
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden md:grid place-items-center size-14 rounded-full bg-white text-ink shrink-0 transition-transform duration-300 group-hover:rotate-[-45deg]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="w-[20px] h-[20px]"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Tabs + sort */}
      <div className="flex flex-col md:flex-row md:items-end gap-6 border-b border-line">
        <div
          role="tablist"
          aria-label="Filter by category"
          className="flex gap-1 overflow-x-auto -mb-px flex-1 scrollbar-none"
        >
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => onTab(t.id)}
                className={`relative whitespace-nowrap px-4 py-3 text-[14px] font-medium transition-colors ${
                  active
                    ? "text-ink"
                    : "text-ink-mute hover:text-ink-2"
                }`}
              >
                {t.label}
                {active && (
                  <motion.span
                    layoutId="blog-tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-brand-grad rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pb-2">
          <label
            htmlFor="blog-sort"
            className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute"
          >
            Sort
          </label>
          <div className="relative">
            <select
              id="blog-sort"
              value={sort}
              onChange={(e) => onSort(e.target.value)}
              className="appearance-none pr-8 pl-3 py-2 rounded-full border border-line bg-bg-paper text-[13px] font-medium text-ink hover:border-ink-mute transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-3 focus:ring-offset-2"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-mute"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* Article grid */}
      <AnimatePresence mode="wait">
        <motion.ul
          key={`${tab}-${sort}-${safePage}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {pageItems.length === 0 && (
            <li className="col-span-full text-center py-20 text-ink-mute">
              No posts in this category yet.
            </li>
          )}
          {pageItems.map((post) => (
            <li key={post.slug}>
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
                    dateTime={post.publishDate}
                    className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute"
                  >
                    {formatDate(post.publishDate)}
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
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="flex items-center justify-between gap-4 pt-10 border-t border-line"
          aria-label="Pagination"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-line text-[13px] font-medium text-ink hover:bg-bg-paper transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Previous
          </button>

          <div className="hidden sm:flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, n) => n + 1).map((n) => {
              const active = n === safePage;
              return (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  aria-current={active ? "page" : undefined}
                  className={`size-10 rounded-full text-[13px] font-medium transition-colors ${
                    active
                      ? "bg-ink text-white"
                      : "text-ink-2 hover:bg-bg-paper"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>

          <span className="sm:hidden font-mono text-[12px] text-ink-mute">
            Page {safePage} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-line text-[13px] font-medium text-ink hover:bg-bg-paper transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </nav>
      )}
    </main>
  );
}
