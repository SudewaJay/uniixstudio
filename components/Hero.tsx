"use client";

import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";

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
    <section className="pt-40 pb-20 md:pt-44 relative overflow-hidden">
      <div className="hero-grid-bg" />
      <div className="wrap">
        <motion.div
          variants={containerVariants}
          initial={initial}
          animate="show"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-6 flex-wrap mb-10"
          >
            <span className="eyebrow">Creative Digital Studio</span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-ink-mute">
              <span className="status-dot" />
              Colombo · Working globally
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-end">
            <div>
              <h1
                className="display"
                style={{ fontSize: "clamp(56px,9vw,128px)" }}
              >
                <span className="word">
                  <motion.span variants={wordRise} className="block">
                    We design
                  </motion.span>
                </span>
                <br />
                <span className="word">
                  <motion.span variants={wordRise} className="block">
                    brands that
                  </motion.span>
                </span>
                <br />
                <span className="word">
                  <motion.span
                    variants={wordRise}
                    className="block italic-display gradient-text"
                  >
                    perform.
                  </motion.span>
                </span>
              </h1>
              <motion.p
                variants={fadeUp}
                className="text-[clamp(17px,1.4vw,20px)] text-ink-2 max-w-[60ch] leading-[1.55] mt-7"
              >
                Uniix Studio is a creative digital agency building bold brand
                identities, conversion-focused websites, and growth systems for
                ambitious companies in Sri Lanka, Australia and beyond.
              </motion.p>
              <motion.div variants={fadeUp} className="flex gap-3.5 flex-wrap mt-8">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/contact" className="btn btn-primary">
                    Start a project ↗
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/portfolio" className="btn btn-ghost">
                    View our work
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-6">
              <motion.div
                variants={cardRise}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-brand-grad text-white rounded-lg2 p-8 relative overflow-hidden shadow-sm2"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(120% 80% at 100% 0%, rgba(255,255,255,.18), transparent 50%)",
                  }}
                />
                <div className="relative">
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-85 mb-3.5">
                    Selected since 2022
                  </div>
                  <div className="font-display font-medium text-[64px] leading-none tracking-[-0.03em]">
                    50<span className="opacity-70">+</span>
                  </div>
                  <div className="mt-2.5 text-[13px] leading-[1.45] text-white/90">
                    Projects shipped across branding, web and growth — from
                    Colombo founders to Australian-based companies.
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-3.5">
                <motion.div
                  variants={cardRise}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-bg-paper border border-line rounded-lg2 p-8 shadow-sm2"
                >
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-2 mb-3.5">
                    Avg. growth
                  </div>
                  <div className="font-display font-medium text-[64px] leading-none tracking-[-0.03em] gradient-text">
                    3×
                  </div>
                  <div className="mt-2.5 text-[13px] leading-[1.45] text-ink-2">
                    Average traffic lift in 90 days post-launch.
                  </div>
                </motion.div>
                <motion.div
                  variants={cardRise}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-bg-paper border border-line rounded-lg2 p-8 shadow-sm2"
                >
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-2 mb-3.5">
                    Client retention
                  </div>
                  <div className="font-display font-medium text-[64px] leading-none tracking-[-0.03em] gradient-text">
                    92<span className="opacity-70">%</span>
                  </div>
                  <div className="mt-2.5 text-[13px] leading-[1.45] text-ink-2">
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
                  <span className={i % 2 === 1 ? "italic-display text-brand-4" : ""}>
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
