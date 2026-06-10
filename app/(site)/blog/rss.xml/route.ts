import { allPosts } from "@/lib/blog-fs";
import { site } from "@/lib/content";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const published = allPosts
    .filter((p) => !p.isStub)
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));

  const feedUrl = site.canonical("/blog/rss.xml");
  const blogUrl = site.canonical("/blog/");
  const lastBuild = new Date(
    (published[0]?.publishDate ?? new Date().toISOString().slice(0, 10)) + "T00:00:00Z",
  ).toUTCString();

  const items = published
    .map((p) => {
      const link = site.canonical(`/blog/${p.slug}/`);
      const pubDate = new Date(p.publishDate + "T00:00:00Z").toUTCString();
      const image = p.coverImage?.startsWith("http")
        ? p.coverImage
        : p.coverImage
          ? site.canonical(p.coverImage)
          : "";
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(p.category)}</category>
      <dc:creator>${escapeXml(p.author.name)}</dc:creator>
      <description>${escapeXml(p.metaDescription || p.excerpt)}</description>${
        image ? `\n      <enclosure url="${escapeXml(image)}" type="image/jpeg" />` : ""
      }
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Uniix Studio Blog</title>
    <link>${blogUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>Field notes on design, growth, and digital marketing from Uniix Studio.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
