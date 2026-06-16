import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { VideoShowcase } from "@/components/VideoShowcase";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbSchema,
  videoObjectSchema,
  schemaGraph,
} from "@/lib/schema";
import { allServices } from "@/lib/services-fs";
import { site } from "@/lib/content";
import type { ServiceVideo } from "@/lib/services-fs";

export const dynamic = "force-static";

const canonical = site.canonical("/showreel/");

export const metadata: Metadata = {
  title: "Showreel — Commercial Video Work | Uniix Studio",
  description:
    "Selected commercial videos directed, edited and motion-led by Uniix Studio for client brands across Sri Lanka, Australia and the UK.",
  alternates: { canonical },
  openGraph: {
    title: "Uniix Studio Showreel — Commercial Video Work",
    description:
      "Selected commercial videos directed, edited and motion-led by Uniix Studio.",
    url: canonical,
    type: "website",
  },
};

/** Aggregate every video declared on every service MDX. */
function getAllVideos(): ServiceVideo[] {
  const seen = new Set<string>();
  const out: ServiceVideo[] = [];
  for (const s of allServices) {
    if (!s.videos) continue;
    for (const v of s.videos) {
      if (seen.has(v.vimeoId)) continue;
      seen.add(v.vimeoId);
      out.push(v);
    }
  }
  return out;
}

export default function ShowreelPage() {
  const videos = getAllVideos();

  const pageSchema = schemaGraph(
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Showreel", url: "/showreel/" },
    ]),
    ...videos.map((v) => videoObjectSchema(v)),
  );

  return (
    <>
      <JsonLd data={pageSchema} />
      <PageHeader
        eyebrow="Showreel"
        title={
          <>
            Commercial video{" "}
            <span className="italic-display gradient-text">work.</span>
          </>
        }
        lede="Selected brand films, promos and motion-led commercial work for client brands across Sri Lanka, Australia and the UK."
      />

      {videos.length > 0 ? (
        <VideoShowcase
          videos={videos}
          accent="#F8C84A"
          heading="Selected commercial videos"
          subheading="Click any video to play. Want this kind of work for your brand? Talk to our video editing and motion graphics teams."
        />
      ) : (
        <section className="py-20 md:py-28">
          <div className="wrap">
            <p className="text-ink-2 text-[16px]">
              New showreel coming soon.
            </p>
          </div>
        </section>
      )}

      {/* Related services */}
      <section className="py-16 md:py-20 bg-bg-warm border-t border-line">
        <div className="wrap">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-brand-4 mb-4">
            Services behind the work
          </div>
          <h2
            className="font-display font-medium mb-8 tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px,3vw,40px)" }}
          >
            Hire the team that made these
          </h2>
          <ul className="flex flex-wrap gap-3">
            {[
              { label: "Video Editing", href: "/services/design/video-editing/" },
              { label: "Motion Graphics", href: "/services/design/motion-graphics/" },
              { label: "Social Media Creatives", href: "/services/design/social-media-creatives/" },
              { label: "Brand Identity", href: "/services/design/brand-identity/" },
            ].map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-bg-paper border border-line text-[14px] text-ink hover:border-brand-3 hover:text-brand-4 transition-colors"
                >
                  {s.label}
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
