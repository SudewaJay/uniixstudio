import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { posts as generatedPosts, type BlogPost as BaseBlogPost } from "./blog";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

type Frontmatter = {
  title: string;
  slug?: string;
  excerpt?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  category?: string;
  publishDate: string; // ISO YYYY-MM-DD
  coverImage?: string;
  author?: { name?: string; role?: string; initial?: string };
  ctaBlock?: string;
  faqs?: { question: string; answer: string }[];
} & EditorialFields;

/**
 * Optional fields for hand-written MDX posts. All are opt-in: posts that don't
 * set them render exactly as before. `layout: "editorial"` switches the post
 * page to the long-form template (sticky contents, related services, contextual
 * CTA) — see components/blog/EditorialArticle.tsx.
 */
export type EditorialFields = {
  layout?: "editorial";
  /** <title> / OG title when the H1 is too long for a SERP title. */
  seoTitle?: string;
  /** ISO date of the last substantive revision → dateModified. */
  updatedDate?: string;
  coverAlt?: string;
  coverCaption?: string;
  /** 1200×630 JPG for social cards when the cover isn't suitable. */
  ogImage?: string;
  secondaryKeywords?: string[];
  /** Short "in brief" answers shown beside the intro. */
  keyTakeaways?: string[];
  /** Service pages to feature, as "pillar/slug" (validated at render). */
  relatedServices?: string[];
  /** Blog slugs to feature first under "Continue reading". */
  relatedPosts?: string[];
  ctaHeading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /**
   * Set false to omit FAQPage JSON-LD while still rendering the FAQ. Google
   * stopped showing FAQ rich results in May 2026, so new posts don't emit it.
   */
  faqSchema?: boolean;
};

export type BlogPost = BaseBlogPost & EditorialFields;

const EDITORIAL_KEYS = [
  "layout",
  "seoTitle",
  "updatedDate",
  "coverAlt",
  "coverCaption",
  "ogImage",
  "secondaryKeywords",
  "keyTakeaways",
  "relatedServices",
  "relatedPosts",
  "ctaHeading",
  "ctaLabel",
  "ctaHref",
  "faqSchema",
] as const satisfies readonly (keyof EditorialFields)[];

function pickEditorial(fm: Frontmatter): EditorialFields {
  const out: Record<string, unknown> = {};
  for (const k of EDITORIAL_KEYS) if (fm[k] !== undefined) out[k] = fm[k];
  return out as EditorialFields;
}

function readMdxPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files.map((file, idx) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as Frontmatter;

    const slug = fm.slug ?? file.replace(/\.mdx?$/, "");
    const words = content.trim().split(/\s+/).length;
    const readMin = Math.max(1, Math.round(words / 220));

    return {
      // Negative IDs to avoid collision with generated posts
      id: -(idx + 1),
      slug,
      title: fm.title,
      excerpt: fm.excerpt ?? content.trim().slice(0, 200) + "…",
      metaDescription: fm.metaDescription ?? fm.excerpt ?? fm.title,
      primaryKeyword: fm.primaryKeyword ?? slug.replace(/-/g, " "),
      category: fm.category ?? "Insights",
      publishDate: fm.publishDate,
      wordCount: words,
      readTime: `${readMin} min read`,
      coverImage:
        fm.coverImage ??
        "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1600&q=80&auto=format&fit=crop",
      author: {
        name: fm.author?.name ?? "Uniix Studio",
        role: fm.author?.role ?? "Founder · Uniix Studio",
        initial: fm.author?.initial ?? "S",
      },
      body: content,
      ctaBlock: fm.ctaBlock ?? "",
      isStub: words < 200,
      faqs: fm.faqs,
      ...pickEditorial(fm),
    } satisfies BlogPost;
  });
}

const mdxPosts = readMdxPosts();

/**
 * All posts: MDX files override generated posts by slug (so a hand-written
 * MDX with the same slug as a stub replaces the stub entirely), then sorted
 * newest-first.
 */
const mdxSlugs = new Set(mdxPosts.map((p) => p.slug));
export const allPosts: BlogPost[] = [
  ...mdxPosts,
  ...generatedPosts.filter((p) => !mdxSlugs.has(p.slug)),
].sort((a, b) => +new Date(b.publishDate) - +new Date(a.publishDate));

export function getPost(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(limit = 3): BlogPost[] {
  return allPosts.filter((p) => !p.isStub).slice(0, limit);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return allPosts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase(),
  );
}

export { formatDate } from "./blog";
