import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { locations } from "@/lib/locations";
import { site } from "@/lib/content";
import { breadcrumbSchema, schemaGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Web Design & Development Near You | Uniix Studio — Negombo, Ja-Ela, Wattala",
  description:
    "Uniix Studio designs and builds websites, e-commerce and brands for businesses across Negombo, Ja-Ela, Wattala and the Gampaha–Colombo corridor.",
  alternates: { canonical: site.canonical("/locations/") },
  openGraph: {
    title: "Web Design & Development Near You | Uniix Studio",
    description:
      "Local web design, development and branding for businesses across Negombo, Ja-Ela, Wattala and Greater Colombo.",
    url: site.canonical("/locations/"),
  },
};

export default function LocationsIndexPage() {
  const schema = schemaGraph(
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Locations", url: "/locations/" },
    ])
  );

  return (
    <>
      <JsonLd data={schema} />
      <PageHeader
        eyebrow="Locations"
        title={
          <>
            Design & build,{" "}
            <span className="italic-display gradient-text">close to home.</span>
          </>
        }
        lede="We work with businesses across the Gampaha–Colombo corridor. Pick your area to see how we help local companies win online."
      />

      <section className="pb-24 md:pb-32">
        <div className="wrap">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {locations.map((loc, i) => (
              <Reveal key={loc.slug} delay={(i % 3) as 0 | 1 | 2}>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="group relative block rounded-3xl overflow-hidden shadow-soft bg-gradient-to-br from-ink to-ink/80 p-7 md:p-8 min-h-[280px] flex flex-col justify-end border border-white/10"
                >
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/60 block mb-3">
                    {loc.district} District
                  </span>
                  <h2 className="font-display font-medium text-white text-[28px] md:text-[32px] leading-[1.05] tracking-[-0.02em] mb-3">
                    Web Design in {loc.name}
                  </h2>
                  <p className="text-white/75 text-[14px] leading-[1.55] mb-5">
                    {loc.lede}
                  </p>
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/80 group-hover:text-white transition-colors">
                    View {loc.name} &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
