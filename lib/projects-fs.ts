import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { projects as legacyProjects } from "./content";
import type { Project } from "./projects";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

type Frontmatter = Omit<Project, "body" | "hasDetail"> & { slug?: string };

function readMdxProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as Frontmatter;
    const slug = fm.slug ?? file.replace(/\.mdx?$/, "");

    return {
      ...fm,
      slug,
      body: content,
      hasDetail: true,
    } satisfies Project;
  });
}

const mdxProjects = readMdxProjects();
const mdxSlugs = new Set(mdxProjects.map((p) => p.slug));

/**
 * All projects, MDX first (richer content), then legacy inline projects
 * that don't yet have an MDX file. Feature flag controls ordering inside
 * the grid.
 */
export const allProjects: Project[] = [
  ...mdxProjects,
  ...legacyProjects
    .filter((p) => !mdxSlugs.has(p.slug))
    .map((p) => ({ ...p, hasDetail: false }) as Project),
];

export function getProject(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getDetailedProjects(): Project[] {
  return allProjects.filter((p) => p.hasDetail);
}
