"use client";

import Link from "next/link";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { clients } from "@/lib/content";
import { ContainerTextFlip } from "./ui/ContainerTextFlip";

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
    <section className="pt-24 pb-14 md:pt-36 md:pb-20 relative overflow-hidden">
      <div className="hero-grid-bg" />
      <div className="wrap relative z-10">
        <motion.div
          variants={containerVariants}
          initial={initial}
          animate="show"
        >
          {/* Scarcity status — replaces the redundant location eyebrow */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center mb-10"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-2 border border-line rounded-full px-3.5 py-1.5 bg-bg-paper/60 backdrop-blur-sm">
              <span className="status-dot" />
              Available for Q3 2026 — 2 slots left
            </span>
          </motion.div>

          {/* Floating side anchors — flank the centered headline so it doesn't read as empty */}
          <div className="relative">
            <motion.div
              variants={fadeUp}
              aria-hidden="true"
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute"
              style={{ writingMode: "vertical-rl", transform: "translateY(-50%) rotate(180deg)" }}
            >
              <span className="w-8 h-px bg-ink-mute/40" />
              Est. 2022 — Colombo
            </motion.div>

            <motion.div
              variants={fadeUp}
              aria-hidden="true"
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute"
              style={{ writingMode: "vertical-rl" }}
            >
              Scroll to explore
              <span className="w-8 h-px bg-ink-mute/40" />
            </motion.div>

            <div className="flex flex-col items-center text-center">
            {/* H1 — Masterplan §2.3 verbatim. Three lines, last line italic gradient. */}
            <h1
              className="px-2 md:px-0"
              style={{ fontSize: "clamp(28px,5.2vw,80px)" }}
            >
              <span className="word">
                <motion.span
                  variants={wordRise}
                  /* `text-balance` evens the wrap on mobile; `md:whitespace-nowrap`
                     keeps the single-line look on tablet+. `break-words` is
                     the safety net for ultra-narrow viewports (<320px). */
                  className="block font-display font-medium leading-[1.1] md:leading-[1.05] tracking-[-0.025em] text-ink text-balance break-words md:whitespace-nowrap"
                >
                  Sri Lanka&apos;s Creative Digital Agency
                </motion.span>
              </span>
              <br />
              <span className="word">
                <motion.span
                  variants={wordRise}
                  className="block italic-display font-display font-medium tracking-[-0.03em] leading-[1.0] mt-2"
                >
                  {/*
                    Each pillar word flips through brand-aligned alternates.
                    First word in each array stays SEO-anchored (renders SSR).
                    gradient-text-animated is applied INSIDE each flip so the
                    background-clip:text doesn't get broken by the nested 3D
                    transform contexts the flipper introduces.
                  */}
                  {[
                    {
                      base: "Design.",
                      words: ["Design.", "Branding.", "Identity."],
                    },
                    {
                      base: "Technology.",
                      words: ["Technology.", "Engineering.", "Code."],
                    },
                    {
                      base: "Growth.",
                      words: ["Growth.", "Marketing.", "Performance."],
                    },
                  ].map((p, i) => (
                    <motion.span
                      key={p.base}
                      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.21, 0.47, 0.32, 0.98],
                        delay: reduce ? 0 : 0.4 + i * 0.18,
                      }}
                      style={{ display: "inline-block", whiteSpace: "pre" }}
                    >
                      {i > 0 && " "}
                      <ContainerTextFlip
                        words={p.words}
                        interval={2400 + i * 350}
                        wordClassName="gradient-text-animated"
                      />
                    </motion.span>
                  ))}
                </motion.span>
              </span>
            </h1>
            <motion.p
              variants={fadeUp}
              className="text-[clamp(17px,1.4vw,20px)] text-ink-2 max-w-[60ch] leading-[1.55] mt-7 mx-auto"
            >
              Uniix Studio is a creative digital agency building bold brand
              identities, conversion-focused websites, and growth systems for
              ambitious companies in Sri Lanka, Australia and beyond.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-3.5 flex-wrap justify-center mt-8">
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link href="/contact" className="btn btn-primary">
                  Get a Quote ↗
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link href="/portfolio" className="btn btn-ghost">
                  View Our Work
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust strip — kills empty space below CTAs, adds proof above the fold */}
            <motion.div variants={fadeUp} className="mt-10 md:mt-14 w-full max-w-[820px]">
              <div className="flex items-center gap-4 mb-5">
                <span className="flex-1 h-px bg-line" />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute">
                  Trusted by
                </span>
                <span className="flex-1 h-px bg-line" />
              </div>
              <div className="flex items-center justify-center gap-x-6 gap-y-3 md:gap-x-10 md:gap-y-4 flex-wrap">
                {clients.map((c) => (
                  <span
                    key={c.name}
                    className={`${c.style} text-[17px] md:text-[22px] leading-none text-ink-mute/70 hover:text-ink-2 transition-colors duration-300 select-none`}
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 md:gap-4 mt-12 md:mt-16 w-full max-w-[960px]">
              <motion.div
                variants={cardRise}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-brand-grad text-white rounded-lg2 p-6 md:p-7 relative overflow-hidden shadow-sm2 text-left"
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
                  <div className="font-display font-medium text-[44px] md:text-[56px] leading-none tracking-[-0.03em]">
                    50<span className="opacity-70">+</span>
                  </div>
                  <div className="mt-2.5 text-[13px] leading-[1.45] text-white/90">
                    Projects shipped across branding, web and growth.
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardRise}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-bg-paper border border-line rounded-lg2 p-6 md:p-7 shadow-sm2 text-left"
              >
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-2 mb-3.5">
                  Avg. growth
                </div>
                <div className="font-display font-medium text-[44px] md:text-[56px] leading-none tracking-[-0.03em] gradient-text">
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
                className="bg-bg-paper border border-line rounded-lg2 p-6 md:p-7 shadow-sm2 text-left"
              >
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-2 mb-3.5">
                  Client retention
                </div>
                <div className="font-display font-medium text-[44px] md:text-[56px] leading-none tracking-[-0.03em] gradient-text">
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
