"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/Reveal";
import type {
  ColorSwatch,
  TypeFace,
  DesignPrinciple,
} from "@/lib/projects";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type RationalePoint = {
  num: string;
  title: string;
  detail: string;
  visual?: string;
  tag?: string;
};

type Props = {
  rationale?: string;
  points?: RationalePoint[];
  palette?: ColorSwatch[];
  typography?: TypeFace[];
  uiPrinciples?: DesignPrinciple[];
  motionPrinciples?: DesignPrinciple[];
  defaultImage?: string;
};

export default function InteractiveDesignRationale({
  rationale,
  points,
  palette,
  typography,
  uiPrinciples,
  motionPrinciples,
  defaultImage,
}: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const reduce = useReducedMotion();

  // If points aren't explicitly provided, derive them from uiPrinciples or fallback
  const items: RationalePoint[] =
    points && points.length > 0
      ? points
      : uiPrinciples && uiPrinciples.length > 0
      ? uiPrinciples.map((p, idx) => ({
          num: String(idx + 1).padStart(2, "0"),
          title: p.title,
          detail: p.detail,
          visual: defaultImage,
          tag: `Principle 0${idx + 1}`,
        }))
      : [];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const hasAny =
    rationale ||
    items.length > 0 ||
    (palette && palette.length > 0) ||
    (typography && typography.length > 0) ||
    (motionPrinciples && motionPrinciples.length > 0);

  if (!hasAny) return null;

  return (
    <section className="py-24 md:py-36 bg-bg border-b border-line overflow-hidden">
      <div className="wrap">
        {/* Section Header */}
        <div className="max-w-[840px] mb-16 md:mb-24">
          <Reveal>
            <span className="eyebrow text-brand-ink">Design Rationale</span>
            <h2 className="t-h2 mt-4 text-[clamp(34px,4.5vw,62px)]">
              Every pixel had{" "}
              <span className="t-italic accent-grad-text">a reason.</span>
            </h2>
            {rationale && (
              <p className="t-lead mt-6 text-ink-2 text-[clamp(17px,1.35vw,21px)]">
                {rationale}
              </p>
            )}
          </Reveal>
        </div>

        {/* ---------------- Signature Interactive Rationale ---------------- */}
        {items.length > 0 && (
          <div className="mb-24 md:mb-32">
            {/* Desktop: Interactive Split Stage (hidden on mobile) */}
            <div className="hidden lg:grid grid-cols-[1.1fr_1.2fr] gap-14 items-start">
              {/* Left Column: Interactive Points List */}
              <div className="flex flex-col divide-y divide-line border-y border-line">
                {items.map((item, idx) => {
                  const isActive = activeIdx === idx;
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      onFocus={() => setActiveIdx(idx)}
                      className={`text-left py-6 px-4 -mx-4 rounded-xl transition-all duration-micro ease-uniix ${
                        isActive
                          ? "bg-bg-warm"
                          : "hover:bg-bg-warm/50"
                      }`}
                      aria-pressed={isActive}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-mono text-[11px] tracking-[0.2em] font-semibold transition-colors ${
                            isActive ? "text-brand-ink" : "text-ink-mute"
                          }`}
                        >
                          {item.num}
                        </span>
                        {item.tag && (
                          <span className="px-2 py-0.5 rounded-full bg-white border border-line text-[10px] font-mono tracking-[0.12em] uppercase text-ink-mute">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <h3
                        className={`font-display text-[22px] md:text-[24px] font-medium mt-2 transition-colors ${
                          isActive ? "text-brand-ink" : "text-ink"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-[15px] text-ink-2 mt-2 leading-[1.6]">
                        {item.detail}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Dynamic Visual Area */}
              <div className="sticky top-[calc(var(--header-h)+24px)]">
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-bg-paper border border-line shadow-lift">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={items[activeIdx]?.title ?? activeIdx}
                      initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute inset-0"
                    >
                      {items[activeIdx]?.visual ? (
                        <SmartImage
                          src={items[activeIdx].visual!}
                          alt={items[activeIdx].title}
                          sizes="600px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-bg-warm to-bg-paper text-center">
                          <div>
                            <div className="font-mono text-[12px] tracking-[0.2em] uppercase text-brand-ink mb-2">
                              {items[activeIdx]?.num}
                            </div>
                            <div className="font-display font-medium text-[20px] text-ink max-w-[30ch]">
                              {items[activeIdx]?.title}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-4 flex items-center justify-between font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute">
                  <span>Visual Preview</span>
                  <span>Point {items[activeIdx]?.num} / 0{items.length}</span>
                </div>
              </div>
            </div>

            {/* Mobile / Tablet: Elegant Accordion */}
            <div className="lg:hidden flex flex-col divide-y divide-line border-y border-line">
              {items.map((item, idx) => {
                const isOpen = activeIdx === idx;
                return (
                  <div key={item.title} className="py-5">
                    <button
                      type="button"
                      onClick={() => setActiveIdx(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3 pr-4">
                        <span className="font-mono text-[11px] text-brand-ink">
                          {item.num}
                        </span>
                        <span className="font-display font-medium text-[19px] text-ink">
                          {item.title}
                        </span>
                      </div>
                      <span className="font-mono text-[14px] text-brand-ink">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="mt-4 pt-2">
                        <p className="text-[15px] text-ink-2 leading-[1.6]">
                          {item.detail}
                        </p>
                        {item.visual && (
                          <div className="relative aspect-[16/10] w-full mt-4 rounded-xl overflow-hidden border border-line">
                            <SmartImage
                              src={item.visual}
                              alt={item.title}
                              sizes="100vw"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------- Color Tokens Palette ---------------- */}
        {palette && palette.length > 0 && (
          <div className="mt-20 md:mt-28">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4 flex-wrap mb-8 border-b border-line pb-4">
                <h3 className="t-h3 text-[clamp(22px,2.4vw,32px)]">
                  Color Token Architecture
                </h3>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                  {palette.length} Documented Swatches · Tap to Copy
                </span>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {palette.map((swatch, i) => {
                const isCopied = copiedHex === swatch.hex;
                return (
                  <Reveal key={swatch.name + swatch.hex} delay={(i % 4) as 0 | 1 | 2 | 3}>
                    <button
                      type="button"
                      onClick={() => handleCopyHex(swatch.hex)}
                      className="group w-full text-left rounded-2xl overflow-hidden border border-line bg-bg-paper hover:shadow-sm2 hover:-translate-y-1 transition-all duration-micro"
                    >
                      <div
                        className="aspect-[16/9] w-full relative flex items-end p-4 transition-transform group-hover:scale-[1.02]"
                        style={{ backgroundColor: swatch.hex }}
                      >
                        <span className="font-mono text-[10px] tracking-[0.16em] uppercase px-2 py-1 rounded bg-black/60 text-white backdrop-blur-sm">
                          {isCopied ? "Copied! ✓" : swatch.hex.toUpperCase()}
                        </span>
                      </div>
                      <div className="p-4 bg-bg-paper">
                        <div className="font-display font-medium text-[15px] text-ink">
                          {swatch.name}
                        </div>
                        <div className="text-[13px] text-ink-2 mt-1 leading-[1.4] line-clamp-2">
                          {swatch.role}
                        </div>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------------- Typography Specimen ---------------- */}
        {typography && typography.length > 0 && (
          <div className="mt-20 md:mt-28">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4 flex-wrap mb-8 border-b border-line pb-4">
                <h3 className="t-h3 text-[clamp(22px,2.4vw,32px)]">
                  Typography Hierarchy
                </h3>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                  Typeface Pairings
                </span>
              </div>
            </Reveal>

            <div className="flex flex-col gap-6">
              {typography.map((type, i) => (
                <Reveal key={type.family + type.role} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="p-7 md:p-10 rounded-2xl bg-bg-paper border border-line">
                    <div className="grid lg:grid-cols-[200px_1fr] gap-6 lg:gap-10 items-baseline">
                      <div>
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-brand-ink">
                          {type.role}
                        </span>
                        <div className="font-display font-medium text-[24px] text-ink mt-1">
                          {type.family}
                        </div>
                        {type.weights && (
                          <div className="font-mono text-[11px] text-ink-mute mt-1">
                            {type.weights}
                          </div>
                        )}
                      </div>

                      <div>
                        {type.sample && (
                          <div
                            className="font-medium text-[clamp(24px,3.2vw,44px)] tracking-[-0.02em] leading-[1.2] text-ink mb-4"
                            style={{ fontFamily: `'${type.family}', sans-serif` }}
                          >
                            {type.sample}
                          </div>
                        )}
                        {type.rationale && (
                          <p className="text-[14.5px] text-ink-2 leading-[1.6]">
                            {type.rationale}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- Motion Principles ---------------- */}
        {motionPrinciples && motionPrinciples.length > 0 && (
          <div className="mt-20 md:mt-28">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4 flex-wrap mb-8 border-b border-line pb-4">
                <h3 className="t-h3 text-[clamp(22px,2.4vw,32px)]">
                  Motion &amp; Choreography
                </h3>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                  Interaction Standards
                </span>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {motionPrinciples.map((m, i) => (
                <Reveal key={m.title} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="p-6 rounded-2xl bg-bg-warm border border-line">
                    <div className="font-mono text-[11px] text-brand-ink mb-2">
                      0{i + 1}
                    </div>
                    <div className="font-display font-medium text-[18px] text-ink">
                      {m.title}
                    </div>
                    <p className="text-[14px] text-ink-2 mt-2 leading-[1.55]">
                      {m.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
