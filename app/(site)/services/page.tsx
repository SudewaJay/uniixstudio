import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { pillars, getServicesForPillar } from "@/lib/services";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Brand, Web & Digital Marketing | Uniix Studio",
  description:
    "Brand identity, web design, performance marketing and SEO — all under one roof. Explore Uniix Studio's three pillars: Design, Technology, Growth.",
  alternates: { canonical: site.canonical("/services/") },
};

const pillarHeadlines: Record<string, { headline: string; accentText: string }> =
  {
    design: { headline: "Design that", accentText: "moves people." },
    technology: { headline: "Technology built", accentText: "to scale." },
    growth: { headline: "Growth driven", accentText: "by data." },
  };

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Three pillars.
            <br />
            <span className="italic-display gradient-text">
              One creative partner.
            </span>
          </>
        }
        lede="Design, Technology and Growth — unified under one strategic team. Pick a single service or combine them. Either way, you get the same senior team and the same standard of work."
      />

      {/* Pillar deep-dives */}
      <section className="py-16 md:py-24">
        <div className="wrap flex flex-col gap-20 md:gap-28">
          {pillars.map((pillar, idx) => {
            const services = getServicesForPillar(pillar.slug);
            const head = pillarHeadlines[pillar.slug];
            return (
              <div
                key={pillar.slug}
                id={`${pillar.slug}-detail`}
                className="scroll-mt-28"
              >
                <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-start mb-12">
                  <Reveal>
                    <span
                      className="font-mono text-[11px] tracking-[0.22em] uppercase"
                      style={{ color: pillar.accent }}
                    >
                      {String(idx + 1).padStart(2, "0")} / {pillar.label}
                    </span>
                    <h2
                      className="display mt-4"
                      style={{ fontSize: "clamp(40px,5vw,72px)" }}
                    >
                      {head.headline}{" "}
                      <span className="italic-display gradient-text">
                        {head.accentText}
                      </span>
                    </h2>
                  </Reveal>
                  <Reveal delay={1}>
                    <div className="flex flex-col gap-5">
                      <p className="text-[18px] leading-[1.6] text-ink-2 max-w-[60ch]">
                        {pillar.description}
                      </p>
                      <Link
                        href={`/services/${pillar.slug}/`}
                        className="inline-flex items-center gap-2 text-[14px] font-medium text-brand-4 hover:translate-x-1 transition-transform duration-300 self-start"
                      >
                        Explore the {pillar.label.toLowerCase()} pillar
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </Reveal>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {services.map((s, i) => (
                    <Reveal key={s.slug} delay={(i % 3) as 0 | 1 | 2}>
                      <Link
                        href={`/services/${pillar.slug}/${s.slug}/`}
                        className="group block bg-bg-paper border border-line rounded-lg2 p-7 md:p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-sm2 hover:border-transparent"
                      >
                        <span
                          className="font-mono text-[10px] tracking-[0.22em] uppercase block mb-3"
                          style={{ color: pillar.accent }}
                        >
                          Service
                        </span>
                        <h4
                          className="font-display font-medium text-ink mb-3 group-hover:text-brand-4 transition-colors"
                          style={{ fontSize: "20px", letterSpacing: "-0.015em" }}
                        >
                          {s.name}
                        </h4>
                        <p className="text-ink-2 text-[14.5px] leading-[1.55] line-clamp-3">
                          {s.metaDescription}
                        </p>
                        <span className="inline-flex items-center gap-1.5 mt-4 text-[12px] font-medium text-brand-4 transition-transform duration-300 group-hover:translate-x-1">
                          Learn more
                          <span aria-hidden="true">→</span>
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ProcessSection />
      <CTASection />
    </>
  );
}
