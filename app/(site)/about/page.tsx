import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { whyPoints, site } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About Uniix Studio | Creative Digital Agency Team in Sri Lanka",
  description:
    "Meet the team behind Uniix Studio — a Colombo-based creative agency working with ambitious companies across Sri Lanka, Australia and the UK. Senior people, no middlemen, real results.",
  alternates: { canonical: site.canonical("/about/") },
};

export default function AboutPage() {
  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about/" },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />
      <PageHeader
        eyebrow="About Uniix Studio"
        title={
          <>
            A studio for{" "}
            <span className="italic-display gradient-text">work that lasts.</span>
          </>
        }
        lede="We design brand identities, build performance websites, and grow businesses through data-driven marketing — all under one roof. Founded in Colombo, working globally, optimising for the long game."
      />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-24 items-start">
            <Reveal>
              <span className="eyebrow">Our story</span>
            </Reveal>
            <Reveal delay={1}>
              <div className="flex flex-col gap-6 text-[18px] leading-[1.65] text-ink-2 max-w-[60ch]">
                <p>
                  Uniix Studio started with a simple frustration: most agencies in our
                  market treat design, growth and tech as separate disciplines bolted
                  together at the invoice. The result is brands that look good but
                  don&apos;t convert, websites that win awards but lose revenue, and
                  campaigns that report impressions instead of outcomes.
                </p>
                <p>
                  We wanted to build something different — a studio where the strategist,
                  the designer, the developer and the marketer are talking to each other
                  every day, working from the same brief, optimising for the same
                  business goal.
                </p>
                <p>
                  Today we work with founders, marketers and operators across Sri Lanka,
                  Australia and the UK — from launch-stage startups to established
                  companies looking to modernise. The thread between every project: we
                  measure success in business outcomes, not deliverables.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-bg-warm">
        <div className="wrap">
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="bg-bg-paper border border-line rounded-lg2 p-10 md:p-12 h-full">
                <span className="eyebrow">Mission</span>
                <h3
                  className="display mt-5 mb-5"
                  style={{ fontSize: "clamp(32px,3.5vw,44px)" }}
                >
                  Make great design{" "}
                  <span className="italic-display gradient-text">accountable.</span>
                </h3>
                <p className="text-ink-2 text-[16px] leading-[1.6] max-w-[44ch]">
                  We exist to give ambitious companies a creative partner who treats
                  design and growth as the same conversation — and ties every output
                  back to a measurable business goal.
                </p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="bg-ink text-white rounded-lg2 p-10 md:p-12 h-full relative overflow-hidden">
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "-30%",
                    right: "-20%",
                    width: "70%",
                    height: "100%",
                    background:
                      "radial-gradient(closest-side, rgba(232,98,26,.4), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <span className="eyebrow text-white/70">Vision</span>
                  <h3
                    className="display mt-5 mb-5"
                    style={{ fontSize: "clamp(32px,3.5vw,44px)" }}
                  >
                    The studio brands{" "}
                    <span className="italic-display gradient-text">grow up with.</span>
                  </h3>
                  <p className="text-white/80 text-[16px] leading-[1.6] max-w-[44ch]">
                    To build a creative studio that South Asian and Australian companies
                    return to for every chapter of their growth — from first logo to
                    flagship product.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder / Team */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-14">
            <Reveal>
              <span className="eyebrow">The team</span>
              <h2 className="display mt-4" style={{ fontSize: "clamp(40px,5vw,72px)" }}>
                Senior people.
                <br />
                <span className="italic-display gradient-text">Direct lines.</span>
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="text-[clamp(16px,1.3vw,18px)] text-ink-2 max-w-[42ch] leading-[1.55]">
                A small, deliberately senior team. You work with the people building your
                project — not a sales team that hands you off after signing.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="bg-bg-paper border border-line rounded-lg2 p-8 md:p-12 grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-brand-grad text-white grid place-items-center font-display font-bold text-6xl shadow-soft">
                S
              </div>
              <div>
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-brand-4 mb-2">
                  Founder · Creative Director
                </div>
                <h3
                  className="font-display font-medium mb-3"
                  style={{ fontSize: "clamp(28px,3vw,36px)", letterSpacing: "-0.02em" }}
                >
                  Sudewa Jayanath
                </h3>
                <p className="text-ink-2 text-[16px] leading-[1.6] max-w-[60ch]">
                  Founder of Uniix Studio. Leads creative direction across brand identity,
                  web and digital strategy. Works directly with every client from kickoff
                  through launch.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 md:py-28 bg-bg-warm">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end mb-14">
            <Reveal>
              <span className="eyebrow">Why choose us</span>
              <h2 className="display mt-4" style={{ fontSize: "clamp(40px,5vw,72px)" }}>
                Five reasons{" "}
                <span className="italic-display gradient-text">clients stay.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyPoints.map((p, i) => (
              <Reveal key={p.num} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className="bg-bg-paper border border-line rounded-lg2 p-8 md:p-10 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-sm2">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-brand-4">
                    {p.num}
                  </span>
                  <h4
                    className="font-display font-medium mt-4 mb-3"
                    style={{ fontSize: "24px", letterSpacing: "-0.015em" }}
                  >
                    {p.title}
                  </h4>
                  <p className="text-ink-2 text-[15px] leading-[1.55]">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <CTASection />
    </>
  );
}
