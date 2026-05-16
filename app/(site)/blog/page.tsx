import type { Metadata } from "next";
import { posts } from "@/lib/blog";
import BlogIndexClient from "@/components/BlogIndexClient";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Field notes on design, growth, and what we've learned shipping work for global brands. The Uniix Studio blog.",
};

export default function BlogIndexPage() {
  const published = posts.filter((p) => !p.isStub);

  return (
    <>
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
