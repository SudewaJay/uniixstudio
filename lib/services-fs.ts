import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  services as generatedServices,
  pillars,
  type Service,
  type ServicePillar,
  type ServiceProcessStep,
  type ServiceDeliverable,
  type ServicePricingTier,
  type ServiceRelatedLink,
} from "./services";

const CONTENT_DIR = path.join(process.cwd(), "content", "services");

type Frontmatter = {
  slug?: string;
  pillar: ServicePillar;
  name: string;
  rawName?: string;
  pageTitle: string;
  metaDescription: string;
  coverImage?: string;
  faqs?: Array<{ question: string; answer: string }>;
  process?: ServiceProcessStep[];
  deliverables?: ServiceDeliverable[];
  pricingTiers?: ServicePricingTier[];
  relatedReading?: ServiceRelatedLink[];
};

function readMdxServices(): Service[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const pillarDirs = fs.readdirSync(CONTENT_DIR).filter((d) => {
    const full = path.join(CONTENT_DIR, d);
    return fs.statSync(full).isDirectory();
  });

  const out: Service[] = [];
  for (const dir of pillarDirs) {
    const pillarPath = path.join(CONTENT_DIR, dir);
    const files = fs
      .readdirSync(pillarPath)
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(pillarPath, file), "utf8");
      const { data, content } = matter(raw);
      const fm = data as Frontmatter;
      const slug = fm.slug ?? file.replace(/\.mdx?$/, "");
      out.push({
        slug,
        pillar: fm.pillar,
        name: fm.name,
        rawName: fm.rawName ?? fm.name,
        pageTitle: fm.pageTitle,
        metaDescription: fm.metaDescription,
        body: content,
        faqs: fm.faqs,
        coverImage: fm.coverImage,
        process: fm.process,
        deliverables: fm.deliverables,
        pricingTiers: fm.pricingTiers,
        relatedReading: fm.relatedReading,
      });
    }
  }
  return out;
}

const mdxServices = readMdxServices();
const mdxKeys = new Set(mdxServices.map((s) => `${s.pillar}:${s.slug}`));

/** MDX wins by `pillar:slug` key; generated services fill the rest. */
export const allServices: Service[] = [
  ...mdxServices,
  ...generatedServices.filter((s) => !mdxKeys.has(`${s.pillar}:${s.slug}`)),
];

export function getServiceFs(pillar: string, slug: string): Service | undefined {
  return allServices.find((s) => s.pillar === pillar && s.slug === slug);
}

export function getServicesForPillarFs(pillar: string): Service[] {
  return allServices.filter((s) => s.pillar === pillar);
}

export { pillars };
export type {
  Service,
  ServicePillar,
  ServiceProcessStep,
  ServiceDeliverable,
  ServicePricingTier,
  ServiceRelatedLink,
};
