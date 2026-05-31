"use client";

import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";
import HeroSilkBackground from "./HeroSilkBackground";

const EASE_OUT = [0.21, 0.47, 0.32, 0.98] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const wordRise: Variants = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.85, ease: EASE_OUT } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const cardRise: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const initial = reduce ? "show" : "hidden";

  return (
    <section className="pt-24 pb-20 md:pt-36 md:pb-28 relative overflow-hidden">
      <HeroSilkBackground />
      <div className="wrap relative z-10">
        <motion.div
          variants={containerVariants}
          initial={initial}
          animate="show"
        >
          {/* Scarcity status — replaces the redundant location eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center mb-12"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-2 border border-line rounded-full px-3.5 py-1.5 bg-white backdrop-blur-sm">
              <span className="status-dot" />
              Available for Q3 2026 — 2 slots left
            </span>
          </motion.div>

          {/* Floating side anchors — flank the centered headline so it doesn't read as empty */}
          <div className="relative">
            <motion.div
              variants={fadeUp}
              aria-hidden="true"
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/80"
              style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
            >
              <span className="w-8 h-px bg-white/50" />
              Est. 2022 — Colombo
            </motion.div>

            <motion.div
              variants={fadeUp}
              aria-hidden="true"
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/80"
              style={{ writingMode: "vertical-rl" }}
            >
              Scroll to explore
              <span className="w-8 h-px bg-white/50" />
            </motion.div>

            <div className="flex flex-col items-center text-center">
            {/* H1 — concise SEO title, two lines, 112px on desktop */}
            <h1
              className="px-2 md:px-0"
              style={{ fontSize: "clamp(48px,9vw,112px)" }}
            >
              <span className="word">
                <motion.span
                  variants={wordRise}
                  className="block font-display font-medium leading-[0.8] tracking-[-0.03em] text-white"
                >
                  Creative Digital Agency
                </motion.span>
              </span>
              <span className="word" style={{ display: "block", marginTop: "-0.35em" }}>
                <motion.span
                  variants={wordRise}
                  className="block italic-display font-display font-medium tracking-[-0.03em] leading-[0.8] shimmer-text"
                >
                  for Bold Brands.
                </motion.span>
              </span>
            </h1>
            <motion.p
              variants={fadeUp}
              className="text-[clamp(17px,1.4vw,20px)] text-ink-2 max-w-[68ch] leading-[1.55] mx-auto"
              style={{ marginTop: "-0.4em" }}
            >
              Bold brand identities, conversion-focused websites, and growth
              systems for ambitious companies in Sri Lanka and beyond.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-4 flex-wrap justify-center mt-8">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="btn btn-primary">
                  Get a Quote ↗
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link href="/portfolio" className="btn bg-white text-ink hover:bg-white/90">
                  View Our Work
                </Link>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-16 md:mt-20 w-full max-w-[960px]">
              <motion.div
                variants={cardRise}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-brand-grad text-white rounded-lg2 p-7 md:p-8 relative overflow-hidden shadow-sm2 text-left"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,.18), transparent 50%)",
                  }}
                />
                <div className="relative">
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-85 mb-4">
                    Selected since 2022
                  </div>
                  <div className="font-display font-medium text-[44px] md:text-[56px] leading-none tracking-[-0.03em]">
                    50<span className="opacity-70">+</span>
                  </div>
                  <div className="mt-3 text-[13px] leading-[1.5] text-white/90">
                    Projects shipped across branding, web and growth.
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardRise}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-bg-paper border border-line rounded-lg2 p-7 md:p-8 shadow-sm2 text-left"
              >
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-2 mb-4">
                  Avg. growth
                </div>
                <div className="font-display font-medium text-[44px] md:text-[56px] leading-none tracking-[-0.03em] gradient-text">
                  3×
                </div>
                <div className="mt-3 text-[13px] leading-[1.5] text-ink-2">
                  Average traffic lift in 90 days post-launch.
                </div>
              </motion.div>

              <motion.div
                variants={cardRise}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-bg-paper border border-line rounded-lg2 p-7 md:p-8 shadow-sm2 text-left"
              >
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-2 mb-4">
                  Client retention
                </div>
                <div className="font-display font-medium text-[44px] md:text-[56px] leading-none tracking-[-0.03em] gradient-text">
                  92<span className="opacity-70">%</span>
                </div>
                <div className="mt-3 text-[13px] leading-[1.5] text-ink-2">
                  Of clients return for a second engagement.
                </div>
              </motion.div>
            </div>
          </div>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="mt-20 overflow-hidden border-y border-line-soft py-6 bg-bg-warm">
        <div className="marquee-track">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-16 items-center">
              {[
                "Brand Identity",
                "Web Design",
                "UI/UX",
                "Performance Marketing",
                "SEO",
                "Web Development",
                "Strategy",
                "Conversion Design",
              ].map((label, i) => (
                <span
                  key={`${k}-${i}`}
                  className="font-display text-[32px] tracking-[-0.02em] text-ink-2 flex items-center gap-16 whitespace-nowrap"
                >
                  <span className={i % 2 === 1 ? "italic-display text-white" : ""}>
                    {label}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-brand-grad flex-shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
