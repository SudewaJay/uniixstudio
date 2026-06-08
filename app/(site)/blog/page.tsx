import type { Metadata } from "next";
import { allPosts as posts } from "@/lib/blog-fs";
import BlogIndexClient from "@/components/BlogIndexClient";
import { site } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Digital Marketing & Design Blog Sri Lanka | Uniix Studio",
  description:
    "Field notes on design, growth, and digital marketing — learnings from shipping work for brands across Sri Lanka, Australia and the UK. The Uniix Studio blog.",
  alternates: { canonical: site.canonical("/blog/") },
};

export default function BlogIndexPage() {
  const published = posts.filter((p) => !p.isStub);

  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Insights", url: "/blog/" },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />
      {/* Hero header — server-rendered for SEO */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="wrap">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-brand-4">
              Our blog
            </span>
            <h1
              className="mt-4 font-display font-medium text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: "clamp(40px,5.5vw,72px)" }}
            >
              Resources and{" "}
              <span className="italic-display gradient-text">insights.</span>
            </h1>
            <p className="mt-5 md:mt-6 text-[17px] md:text-[20px] leading-[1.55] text-ink-2 max-w-[58ch]">
              The latest in design, technology, and growth — plus field notes
              from real client engagements across Sri Lanka, Australia, and
              the UK.
            </p>
          </div>
        </div>
      </section>

      <BlogIndexClient posts={published} />
    </>
  );
}
