"use client";

import { Carousel, Card, type AppleCard } from "./ui/AppleCardsCarousel";
import { industries } from "@/lib/industries";
import Reveal from "./Reveal";

function IndustryModalContent({
  description,
  accent,
}: {
  description: string;
  accent: string;
}) {
  return (
    <div className="space-y-5">
      <p className="text-[17px] md:text-[19px] leading-[1.6] text-ink-2 max-w-[60ch]">
        {description}
      </p>
      <div
        className="flex items-center gap-3 pt-2"
        style={{ color: accent }}
      >
        <span className="size-2 rounded-full" style={{ background: accent }} />
        <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
          Selected work · Capabilities · Get in touch
        </span>
      </div>
    </div>
  );
}

export default function IndustriesSection() {
  const cards: React.ReactNode[] = industries.map((ind, i) => {
    const card: AppleCard = {
      src: ind.image,
      category: "Industry",
      title: ind.name,
      href: `/industries/${ind.slug}`,
      content: (
        <IndustryModalContent
          description={ind.description}
          accent={ind.accent}
        />
      ),
    };
    return <Card key={ind.slug} card={card} index={i} />;
  });

  return (
    <section className="relative bg-bg-warm border-y border-line-soft py-20 md:py-28 overflow-hidden">
      <div className="wrap mb-4 md:mb-6">
        <Reveal>
          <span className="eyebrow">Industries</span>
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-end mt-4">
            <h2
              className="display"
              style={{ fontSize: "clamp(36px,4.4vw,64px)", letterSpacing: "-0.025em" }}
            >
              Expanding across{" "}
              <span className="italic-display gradient-text">industries.</span>
            </h2>
            <p className="text-[clamp(15px,1.15vw,17px)] text-ink-2 max-w-[42ch] leading-[1.6]">
              Tailored digital solutions for diverse markets — from education
              and healthcare to fintech and SaaS. Tap any card for the full
              story.
            </p>
          </div>
        </Reveal>
      </div>

      <Carousel items={cards} />
    </section>
  );
}
