import Link from "next/link";
import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import ServicesSection from "@/components/ServicesSection";
import WorkStack from "@/components/WorkStack";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsBar from "@/components/StatsBar";
import CTASection from "@/components/CTASection";
import VerticalTicker from "@/components/VerticalTicker";
import IndustriesSection from "@/components/IndustriesSection";
import BlogSection from "@/components/BlogSection";
import Reveal from "@/components/Reveal";
import { whyPoints } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      <LogoCloud />

      <ServicesSection />

      {/* Selected work — pinned scroll-stack */}
      <section id="work" className="pt-24 md:pt-32">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end mb-16 lg:mb-20">
            <Reveal>
              <span className="eyebrow">Selected work</span>
              <h2 className="display mt-4" style={{ fontSize: "clamp(44px,6.5vw,88px)" }}>
                Brands we&apos;re
                <br />
                <span className="italic-display gradient-text">proud of.</span>
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <Link href="/portfolio" className="btn btn-ghost">
                All projects ↗
              </Link>
            </Reveal>
          </div>
        </div>
        <WorkStack limit={4} />
      </section>

      <IndustriesSection />

      <ProcessSection />

      <VerticalTicker />

      {/* Why us */}
      <section id="about" className="py-24 md:py-32">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end mb-16 lg:mb-20">
            <Reveal>
              <span className="eyebrow">Why Uniix</span>
              <h2 className="display mt-4" style={{ fontSize: "clamp(44px,6.5vw,88px)" }}>
                A studio built
                <br />
                <span className="italic-display gradient-text">for serious work.</span>
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="text-[clamp(17px,1.4vw,20px)] text-ink-2 max-w-[42ch] leading-[1.55]">
                We&apos;re a small, senior team based in Colombo working with clients across
                South Asia, Australia and the UK. No middlemen. No fluff. Just design and
                engineering that compounds.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 items-start">
            <Reveal className="lg:sticky lg:top-28">
              <div className="bg-ink text-white rounded-lg2 p-12 relative overflow-hidden">
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "-50%",
                    right: "-50%",
                    width: "120%",
                    height: "120%",
                    background:
                      "radial-gradient(closest-side, rgba(232,98,26,.35), transparent 70%)",
                  }}
                />
                <div
                  className="font-display font-normal leading-[0.9] tracking-[-0.04em] gradient-text relative z-[2]"
                  style={{ fontSize: "clamp(72px,8vw,128px)" }}
                >
                  3×
                </div>
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-70 mt-6 relative z-[2]">
                  Average traffic lift in 90 days
                </div>
                <p className="mt-4 text-[15px] leading-[1.55] text-white/85 max-w-[40ch] relative z-[2]">
                  Every project ties creative work back to measurable business outcomes —
                  not just impressions and likes.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col">
              {whyPoints.map((p, i) => (
                <Reveal key={p.num} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <div
                    className={`py-8 border-b border-line flex gap-6 items-start ${
                      i === 0 ? "border-t" : ""
                    }`}
                  >
                    <span className="font-mono text-[11px] tracking-[0.18em] text-brand-4 min-w-[36px] pt-1.5">
                      {p.num}
                    </span>
                    <div>
                      <h4
                        className="font-display font-medium mb-2"
                        style={{ fontSize: "24px", letterSpacing: "-0.015em" }}
                      >
                        {p.title}
                      </h4>
                      <p className="text-ink-2 text-[15px] leading-[1.55] max-w-[60ch]">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <StatsBar />
      <BlogSection />
      <CTASection />
    </>
  );
}
