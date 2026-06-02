"use client";

import { motion, useReducedMotion } from "framer-motion";
import type {
  ColorSwatch,
  DesignPrinciple,
  TypeFace,
} from "@/lib/projects";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length !== 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  // perceived luminance
  return r * 0.299 + g * 0.587 + b * 0.114 > 186;
}

function fadeUp(delay = 0, reduce = false) {
  return {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.75, ease: EASE, delay },
  };
}

export default function DesignRationaleSection({
  rationale,
  palette,
  typography,
  uiPrinciples,
  motionPrinciples,
}: {
  rationale?: string;
  palette?: ColorSwatch[];
  typography?: TypeFace[];
  uiPrinciples?: DesignPrinciple[];
  motionPrinciples?: DesignPrinciple[];
}) {
  const reduce = useReducedMotion() ?? false;

  const hasAny =
    rationale ||
    (palette && palette.length) ||
    (typography && typography.length) ||
    (uiPrinciples && uiPrinciples.length) ||
    (motionPrinciples && motionPrinciples.length);

  if (!hasAny) return null;

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Subtle gradient backdrop for premium feel */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 20%, rgba(232,140,42,0.06), transparent 70%), radial-gradient(50% 50% at 10% 90%, rgba(248,200,74,0.05), transparent 70%)",
        }}
      />

      <div className="wrap relative">
        {/* Section heading */}
        <motion.div {...fadeUp(0, reduce)} className="max-w-[820px] mb-16 md:mb-24">
          <div className="eyebrow text-brand-4">Design rationale</div>
          <h2
            className="display mt-4"
            style={{ fontSize: "clamp(36px,5vw,68px)", letterSpacing: "-0.02em" }}
          >
            Every pixel had{" "}
            <span className="italic-display gradient-text">a reason.</span>
          </h2>
          {rationale && (
            <p className="text-[clamp(17px,1.4vw,21px)] text-ink-2 leading-[1.55] mt-7">
              {rationale}
            </p>
          )}
        </motion.div>

        {/* Color palette */}
        {palette && palette.length > 0 && (
          <div className="mb-20 md:mb-28">
            <motion.div
              {...fadeUp(0, reduce)}
              className="flex items-baseline justify-between gap-6 flex-wrap mb-8 md:mb-10"
            >
              <h3
                className="font-display font-medium"
                style={{ fontSize: "clamp(24px,2.8vw,36px)", letterSpacing: "-0.02em" }}
              >
                Colour palette
              </h3>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
                {palette.length} tokens
              </span>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {palette.map((c, i) => {
                const light = isLight(c.hex);
                return (
                  <motion.div
                    key={c.hex + c.name}
                    {...fadeUp(0.06 * i, reduce)}
                    whileHover={reduce ? {} : { y: -4 }}
                    className="rounded-lg2 overflow-hidden border border-line transition-shadow hover:shadow-sm2"
                  >
                    <div
                      className="aspect-[16/10] relative flex items-end p-5"
                      style={{ backgroundColor: c.hex }}
                    >
                      <span
                        className="font-mono text-[10px] tracking-[0.18em] uppercase"
                        style={{ color: light ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.85)" }}
                      >
                        {c.hex.toUpperCase()}
                      </span>
                    </div>
                    <div className="p-5 bg-bg-paper">
                      <div className="font-display text-[17px] font-medium tracking-[-0.01em]">
                        {c.name}
                      </div>
                      <p className="text-[13.5px] text-ink-2 leading-[1.5] mt-1.5">
                        {c.role}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Typography */}
        {typography && typography.length > 0 && (
          <div className="mb-20 md:mb-28">
            <motion.h3
              {...fadeUp(0, reduce)}
              className="font-display font-medium mb-8 md:mb-10"
              style={{ fontSize: "clamp(24px,2.8vw,36px)", letterSpacing: "-0.02em" }}
            >
              Typography
            </motion.h3>

            <div className="flex flex-col gap-5 md:gap-6">
              {typography.map((t, i) => (
                <motion.div
                  key={t.family + t.role}
                  {...fadeUp(0.08 * i, reduce)}
                  className="bg-bg-paper border border-line rounded-lg2 p-7 md:p-10"
                >
                  <div className="grid lg:grid-cols-[180px_1fr] gap-6 lg:gap-12 items-start">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-brand-4 mb-2">
                        {t.role}
                      </div>
                      <div className="font-display text-[24px] font-medium tracking-[-0.02em]">
                        {t.family}
                      </div>
                      {t.weights && (
                        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-mute mt-2">
                          {t.weights}
                        </div>
                      )}
                    </div>
                    <div>
                      {t.sample && (
                        <div
                          className="leading-[1.15] tracking-[-0.02em] text-ink mb-4"
                          style={{
                            fontFamily: `'${t.family}', system-ui`,
                            fontSize:
                              t.role === "display"
                                ? "clamp(28px,3.6vw,52px)"
                                : t.role === "mono"
                                ? "clamp(14px,1.4vw,18px)"
                                : "clamp(18px,1.7vw,24px)",
                            fontWeight: t.role === "display" ? 600 : 400,
                            letterSpacing: t.role === "mono" ? "0.12em" : undefined,
                            textTransform: t.role === "mono" ? "uppercase" : undefined,
                          }}
                        >
                          {t.sample}
                        </div>
                      )}
                      {t.rationale && (
                        <p className="text-[14.5px] text-ink-2 leading-[1.6]">
                          {t.rationale}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* UI Principles */}
        {uiPrinciples && uiPrinciples.length > 0 && (
          <div className="mb-20 md:mb-28">
            <motion.h3
              {...fadeUp(0, reduce)}
              className="font-display font-medium mb-8 md:mb-10"
              style={{ fontSize: "clamp(24px,2.8vw,36px)", letterSpacing: "-0.02em" }}
            >
              UI principles
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              {uiPrinciples.map((p, i) => (
                <motion.div
                  key={p.title}
                  {...fadeUp(0.06 * i, reduce)}
                  whileHover={reduce ? {} : { y: -3 }}
                  className="bg-bg-paper border border-line rounded-lg2 p-7 transition-all"
                >
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-brand-4 mb-3">
                    Principle {String(i + 1).padStart(2, "0")}
                  </div>
                  <h4 className="font-display font-medium text-[20px] tracking-[-0.01em] leading-[1.3]">
                    {p.title}
                  </h4>
                  <p className="text-[14.5px] text-ink-2 leading-[1.6] mt-3">
                    {p.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Motion Principles */}
        {motionPrinciples && motionPrinciples.length > 0 && (
          <div>
            <motion.h3
              {...fadeUp(0, reduce)}
              className="font-display font-medium mb-8 md:mb-10"
              style={{ fontSize: "clamp(24px,2.8vw,36px)", letterSpacing: "-0.02em" }}
            >
              Motion principles
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-5 md:gap-6">
              {motionPrinciples.map((p, i) => (
                <motion.div
                  key={p.title}
                  {...fadeUp(0.07 * i, reduce)}
                  className="border-l-2 border-brand-4 pl-5 py-2"
                >
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-mute mb-2">
                    {String(i + 1).padStart(2, "0")} / {String(motionPrinciples.length).padStart(2, "0")}
                  </div>
                  <h4 className="font-display font-medium text-[18px] tracking-[-0.01em] leading-[1.3]">
                    {p.title}
                  </h4>
                  <p className="text-[14px] text-ink-2 leading-[1.6] mt-2.5">
                    {p.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
