#!/usr/bin/env python3
"""
Ingest pre-generated SEO content from ~/Desktop/Uniix/uniix_seo/
into TypeScript data files at lib/services.ts and lib/blog.ts.

Sources:
  - 20 blog posts in generated_blogs/post_NN_*.json
  - 13 service pages in generated_service_pages/{pillar}_{slug}.json

Outputs:
  - lib/blog.ts       (replaces existing fictional posts)
  - lib/services.ts   (new file, drives nested service routes)
"""

import json
import os
import re
import glob
from pathlib import Path

SOURCE = Path.home() / "Desktop/Uniix/uniix_seo"
ROOT = Path(__file__).resolve().parent.parent
LIB = ROOT / "lib"

# ---------- helpers ----------
def js_string(s: str) -> str:
    """Escape a string for safe embedding inside a JS template literal."""
    if s is None:
        return ""
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

def clean_slug(s: str) -> str:
    """Strip stray markdown / whitespace from generated slugs."""
    s = s.strip()
    s = re.sub(r"^[\W_]+|[\W_]+$", "", s)
    return re.sub(r"[^a-z0-9-]+", "-", s.lower()).strip("-")

def first_paragraph(body: str, max_chars: int = 300) -> str:
    """Pull the first paragraph from a markdown body — used for excerpts."""
    paragraphs = [p.strip() for p in body.split("\n\n") if p.strip()]
    if not paragraphs:
        return ""
    p = paragraphs[0]
    # Strip markdown bold/italic markers for clean excerpts
    p = re.sub(r"\*\*(.+?)\*\*", r"\1", p)
    p = re.sub(r"\*(.+?)\*", r"\1", p)
    if len(p) > max_chars:
        p = p[: max_chars - 1].rsplit(" ", 1)[0] + "…"
    return p

def cover_image_for_pillar(pillar: str) -> str:
    """Map pillar to a representative Unsplash cover image."""
    pillar = pillar.lower()
    return {
        "design": "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1600&q=80&auto=format&fit=crop",
        "technology": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80&auto=format&fit=crop",
        "growth": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&auto=format&fit=crop",
    }.get(pillar, "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80&auto=format&fit=crop")

def author_for_pillar(pillar: str) -> dict:
    """Map pillar to a default author."""
    if pillar.lower() == "growth":
        return {"name": "Nadeesha Perera", "role": "Growth Lead", "initial": "N"}
    return {"name": "Sudewa Jayanath", "role": "Founder · Uniix Studio", "initial": "S"}

def estimate_read_time(word_count: int) -> str:
    minutes = max(1, round(word_count / 220))
    return f"{minutes} min read"

# ---------- BLOG INGESTION ----------
def ingest_blog():
    posts = []
    for f in sorted(glob.glob(str(SOURCE / "generated_blogs/post_*.json"))):
        d = json.load(open(f))
        body = d.get("blog_body", "").strip()
        excerpt = first_paragraph(body, 220)
        word_count = d.get("word_count", 0)

        posts.append({
            "id": d["id"],
            "slug": clean_slug(d["slug"]),
            "title": d["seo_title"],
            "excerpt": excerpt or d["meta_description"],
            "metaDescription": d["meta_description"],
            "primaryKeyword": d.get("primary_keyword", ""),
            "category": d["pillar"],
            "publishDate": d["publish_date"],
            "wordCount": word_count,
            "readTime": estimate_read_time(word_count),
            "coverImage": cover_image_for_pillar(d["pillar"]),
            "author": author_for_pillar(d["pillar"]),
            "body": body,
            "ctaBlock": d.get("cta_block", "").strip(),
            "isStub": word_count < 200,  # flag near-empty failed generations
        })

    # Render TypeScript
    out = ROOT / "lib/blog.ts"
    lines = [
        "// AUTO-GENERATED from ~/Desktop/Uniix/uniix_seo/generated_blogs/",
        "// Edit the source JSON and re-run scripts/ingest-content.py to update.",
        "",
        "export type BlogAuthor = {",
        "  name: string;",
        "  role: string;",
        "  initial: string;",
        "};",
        "",
        "export type BlogPost = {",
        "  id: number;",
        "  slug: string;",
        "  title: string;",
        "  excerpt: string;",
        "  metaDescription: string;",
        "  primaryKeyword: string;",
        "  category: string;",
        "  publishDate: string;",
        "  wordCount: number;",
        "  readTime: string;",
        "  coverImage: string;",
        "  author: BlogAuthor;",
        "  /** Markdown body — render with react-markdown */",
        "  body: string;",
        "  ctaBlock: string;",
        "  /** Flag for posts under 200 words that need regeneration */",
        "  isStub: boolean;",
        "};",
        "",
        "export const posts: BlogPost[] = [",
    ]
    for p in posts:
        lines.append("  {")
        lines.append(f"    id: {p['id']},")
        lines.append(f"    slug: `{js_string(p['slug'])}`,")
        lines.append(f"    title: `{js_string(p['title'])}`,")
        lines.append(f"    excerpt: `{js_string(p['excerpt'])}`,")
        lines.append(f"    metaDescription: `{js_string(p['metaDescription'])}`,")
        lines.append(f"    primaryKeyword: `{js_string(p['primaryKeyword'])}`,")
        lines.append(f"    category: `{js_string(p['category'])}`,")
        lines.append(f"    publishDate: `{js_string(p['publishDate'])}`,")
        lines.append(f"    wordCount: {p['wordCount']},")
        lines.append(f"    readTime: `{js_string(p['readTime'])}`,")
        lines.append(f"    coverImage: `{js_string(p['coverImage'])}`,")
        lines.append(f"    author: {{ name: `{js_string(p['author']['name'])}`, role: `{js_string(p['author']['role'])}`, initial: `{js_string(p['author']['initial'])}` }},")
        lines.append(f"    body: `{js_string(p['body'])}`,")
        lines.append(f"    ctaBlock: `{js_string(p['ctaBlock'])}`,")
        lines.append(f"    isStub: {'true' if p['isStub'] else 'false'},")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export function getPost(slug: string): BlogPost | undefined {")
    lines.append("  return posts.find((p) => p.slug === slug);")
    lines.append("}")
    lines.append("")
    lines.append("export function getFeaturedPosts(limit = 3): BlogPost[] {")
    lines.append("  return posts.filter((p) => !p.isStub).slice(0, limit);")
    lines.append("}")
    lines.append("")
    lines.append("export function getPostsByCategory(category: string): BlogPost[] {")
    lines.append("  return posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());")
    lines.append("}")
    lines.append("")
    lines.append("export function formatDate(iso: string): string {")
    lines.append("  return new Date(iso).toLocaleDateString(\"en-US\", {")
    lines.append("    year: \"numeric\",")
    lines.append("    month: \"short\",")
    lines.append("    day: \"numeric\",")
    lines.append("  });")
    lines.append("}")
    lines.append("")

    out.write_text("\n".join(lines))
    print(f"✓ Wrote {len(posts)} blog posts → {out.relative_to(ROOT)}")
    stubs = [p for p in posts if p["isStub"]]
    if stubs:
        print(f"  ⚠ {len(stubs)} stub posts (need regeneration): {[p['slug'] for p in stubs]}")

# ---------- SERVICE INGESTION ----------
def parse_service_content(content: str) -> dict:
    """Parse the service page content string into structured fields."""
    # PAGE_TITLE: ...
    title_match = re.search(r"PAGE_TITLE:\s*(.+?)(?:\n|$)", content)
    meta_match = re.search(r"META_DESCRIPTION:\s*(.+?)(?:\n|$)", content)
    # Body sits between ---PAGE CONTENT START--- and ---PAGE CONTENT END--- (or EOF)
    body_match = re.search(
        r"---PAGE CONTENT START---\s*(.+?)(?:---PAGE CONTENT END---|\Z)",
        content, re.DOTALL,
    )
    body = body_match.group(1).strip() if body_match else content.strip()

    return {
        "pageTitle": title_match.group(1).strip() if title_match else "",
        "metaDescription": meta_match.group(1).strip() if meta_match else "",
        "body": body,
    }

# Display names for sub-services (capitalized labels for UI)
SERVICE_LABELS = {
    "brand-identity": "Brand Identity",
    "logo-design": "Logo Design",
    "ui-ux-design": "UI/UX Design",
    "web-development": "Web Development",
    "web-design": "Web Design",
    "ecommerce": "E-Commerce",
    "wordpress": "WordPress Development",
    "mobile-apps": "Mobile App Development",
    "seo": "SEO Services",
    "social-media": "Social Media Management",
    "content-marketing": "Content Marketing",
    "ppc-advertising": "PPC Advertising",
    "analytics": "Analytics & Reporting",
}

# Pillar-level metadata
PILLAR_META = {
    "design": {
        "label": "Design",
        "tagline": "Identity that makes you unforgettable.",
        "description": "Brand systems, logos, and UI/UX work that turns first impressions into loyal customers.",
        "accent": "#F8C84A",
    },
    "technology": {
        "label": "Technology",
        "tagline": "Engineering that scales.",
        "description": "Performance-led websites, e-commerce, and apps built on modern stacks.",
        "accent": "#F07B20",
    },
    "growth": {
        "label": "Growth",
        "tagline": "Marketing that compounds.",
        "description": "SEO, content, and paid media systems that turn traffic into measurable revenue.",
        "accent": "#E8621A",
    },
}

def ingest_services():
    services = []
    for f in sorted(glob.glob(str(SOURCE / "generated_service_pages/*.json"))):
        d = json.load(open(f))
        parsed = parse_service_content(d["content"])
        slug = d["slug"]
        pillar = d["pillar"].lower()
        services.append({
            "slug": slug,
            "pillar": pillar,
            "name": SERVICE_LABELS.get(slug, d["name"]),
            "rawName": d["name"],
            "pageTitle": parsed["pageTitle"],
            "metaDescription": parsed["metaDescription"],
            "body": parsed["body"],
        })

    # Render TypeScript
    out = LIB / "services.ts"
    lines = [
        "// AUTO-GENERATED from ~/Desktop/Uniix/uniix_seo/generated_service_pages/",
        "// Edit the source JSON and re-run scripts/ingest-content.py to update.",
        "",
        "export type ServicePillar = \"design\" | \"technology\" | \"growth\";",
        "",
        "export type Service = {",
        "  slug: string;",
        "  pillar: ServicePillar;",
        "  name: string;",
        "  rawName: string;",
        "  pageTitle: string;",
        "  metaDescription: string;",
        "  /** Markdown body — render with react-markdown */",
        "  body: string;",
        "};",
        "",
        "export type Pillar = {",
        "  slug: ServicePillar;",
        "  label: string;",
        "  tagline: string;",
        "  description: string;",
        "  accent: string;",
        "};",
        "",
        "export const pillars: Pillar[] = [",
    ]
    for p_slug, p in PILLAR_META.items():
        lines.append("  {")
        lines.append(f"    slug: `{p_slug}`,")
        lines.append(f"    label: `{js_string(p['label'])}`,")
        lines.append(f"    tagline: `{js_string(p['tagline'])}`,")
        lines.append(f"    description: `{js_string(p['description'])}`,")
        lines.append(f"    accent: `{p['accent']}`,")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export const services: Service[] = [")
    for s in services:
        lines.append("  {")
        lines.append(f"    slug: `{js_string(s['slug'])}`,")
        lines.append(f"    pillar: `{js_string(s['pillar'])}`,")
        lines.append(f"    name: `{js_string(s['name'])}`,")
        lines.append(f"    rawName: `{js_string(s['rawName'])}`,")
        lines.append(f"    pageTitle: `{js_string(s['pageTitle'])}`,")
        lines.append(f"    metaDescription: `{js_string(s['metaDescription'])}`,")
        lines.append(f"    body: `{js_string(s['body'])}`,")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append("export function getService(pillar: string, slug: string): Service | undefined {")
    lines.append("  return services.find((s) => s.pillar === pillar && s.slug === slug);")
    lines.append("}")
    lines.append("")
    lines.append("export function getServicesForPillar(pillar: string): Service[] {")
    lines.append("  return services.filter((s) => s.pillar === pillar);")
    lines.append("}")
    lines.append("")
    lines.append("export function getPillar(slug: string): Pillar | undefined {")
    lines.append("  return pillars.find((p) => p.slug === slug);")
    lines.append("}")
    lines.append("")

    out.write_text("\n".join(lines))
    print(f"✓ Wrote {len(services)} service pages → {out.relative_to(ROOT)}")

if __name__ == "__main__":
    ingest_blog()
    ingest_services()
    print("\nDone. Re-run any time the source JSON changes.")
