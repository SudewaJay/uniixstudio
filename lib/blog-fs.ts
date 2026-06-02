import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { posts as generatedPosts, type BlogPost } from "./blog";

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
};

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
        name: fm.author?.name ?? "Sudewa Jayanath",
        role: fm.author?.role ?? "Founder · Uniix Studio",
        initial: fm.author?.initial ?? "S",
      },
      body: content,
      ctaBlock: fm.ctaBlock ?? "",
      isStub: words < 200,
    } satisfies BlogPost;
  });
}

const mdxPosts = readMdxPosts();

/** All posts: filesystem MDX (newest first) + Python-generated posts. */
export const allPosts: BlogPost[] = [...mdxPosts, ...generatedPosts].sort(
  (a, b) => +new Date(b.publishDate) - +new Date(a.publishDate),
);

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

export { type BlogPost, formatDate } from "./blog";
