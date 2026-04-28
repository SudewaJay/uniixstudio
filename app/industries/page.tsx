import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { industries } from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Tailored digital solutions across education, healthcare, e-commerce, finance, real estate, travel, corporate and SaaS — delivered globally by Uniix Studio.",
};

export default function IndustriesIndexPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title={
          <>
            Expanding across{" "}
            <span className="italic-display gradient-text">industries.</span>
          </>
        }
        lede="We design, ship and scale digital products across eight verticals — each engagement starts with deep industry context, not generic templates."
      />

      <section className="pb-24 md:pb-32">
        <div className="wrap">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {industries.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className={`group relative block aspect-[3/4] rounded-3xl overflow-hidden shadow-soft bg-gradient-to-br ${ind.bg}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ind.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/10 transition-opacity duration-500 group-hover:via-ink/65" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <span
                      className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-90 block mb-2"
                      style={{ color: ind.accent }}
                    >
                      Industry
                    </span>
                    <h3 className="font-display font-medium text-white text-[24px] md:text-[28px] leading-[1.05] tracking-[-0.02em] mb-2">
                      {ind.name}
                    </h3>
                    <p className="text-white/85 text-[13.5px] leading-[1.55]">
                      {ind.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
