import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand identity, web design and development, performance marketing, SEO and digital strategy — all under one roof. Explore Uniix Studio's three service pillars: Design, Growth, Technology.",
};

const benefits: Record<string, string[]> = {
  design: [
    "Brand systems that scale across every touchpoint",
    "Conversion-focused web and product UI",
    "Style guides your team can actually use",
  ],
  growth: [
    "Campaigns measured in revenue, not impressions",
    "Local + technical SEO that compounds month-over-month",
    "Funnels rebuilt around real conversion data",
  ],
  technology: [
    "Modern stacks (Next.js, React) tuned for Core Web Vitals",
    "Custom apps and dashboards built for your workflow",
    "Long-term maintenance and uptime monitoring",
  ],
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
            <span className="italic-display gradient-text">One creative partner.</span>
          </>
        }
        lede="Design, Growth and Technology — unified under one strategic team. Pick a single service or combine them. Either way, you get the same senior team and the same standard of work."
      />

      <ServicesSection showHead={false} />

      {/* Detailed sub-services */}
      <section className="py-20 md:py-28">
        <div className="wrap flex flex-col gap-20 md:gap-28">
          {services.map((pillar) => (
            <div key={pillar.slug} id={`${pillar.slug}-detail`} className="scroll-mt-28">
              <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-20 items-start mb-12">
                <Reveal>
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-brand-4">
                    {pillar.num} / {pillar.title}
                  </span>
                  <h2
                    className="display mt-4"
                    style={{ fontSize: "clamp(40px,5vw,72px)" }}
                  >
                    {pillar.title === "Design" && (
                      <>
                        Design that{" "}
                        <span className="italic-display gradient-text">moves people.</span>
                      </>
                    )}
                    {pillar.title === "Growth" && (
                      <>
                        Growth driven{" "}
                        <span className="italic-display gradient-text">by data.</span>
                      </>
                    )}
                    {pillar.title === "Technology" && (
                      <>
                        Tech built{" "}
                        <span className="italic-display gradient-text">to scale.</span>
                      </>
                    )}
                  </h2>
                </Reveal>
                <Reveal delay={1}>
                  <div className="flex flex-col gap-5">
                    <p className="text-[18px] leading-[1.6] text-ink-2 max-w-[60ch]">
                      {pillar.positioning}
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {benefits[pillar.slug].map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-[15px] text-ink-2"
                        >
                          <span className="w-5 h-5 rounded-full bg-brand-grad text-white grid place-items-center text-[10px] mt-0.5 flex-shrink-0">
                            ✓
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {pillar.items.map((item, i) => (
                  <Reveal key={item.name} delay={(i % 3) as 0 | 1 | 2}>
                    <div className="bg-bg-paper border border-line rounded-lg2 p-7 md:p-8 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-sm2 hover:border-brand-3/40">
                      <h4
                        className="font-display font-medium mb-3"
                        style={{ fontSize: "20px", letterSpacing: "-0.015em" }}
                      >
                        {item.name}
                      </h4>
                      <p className="text-ink-2 text-[14.5px] leading-[1.55]">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProcessSection />
      <CTASection />
    </>
  );
}
