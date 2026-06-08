"use client";

import { motion, useReducedMotion } from "framer-motion";
import type {
  ServiceProcessStep,
  ServiceDeliverable,
  ServicePricingTier,
} from "@/lib/services-fs";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* ---------------- Process timeline — vertical, draws a line as you scroll ---------------- */

export function ServiceProcessTimeline({
  steps,
  accent,
}: {
  steps: ServiceProcessStep[];
  accent: string;
}) {
  const reduce = useReducedMotion();
  if (!steps || steps.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-bg-warm border-y border-line">
      <div className="wrap">
        <div className="max-w-[820px] mx-auto">
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-12 md:mb-16"
          >
            <div
              className="font-mono text-[11px] tracking-[0.22em] uppercase mb-4"
              style={{ color: accent }}
            >
              Process
            </div>
            <h2
              className="font-display font-medium leading-[1.1] tracking-[-0.02em]"
              style={{ fontSize: "clamp(28px,3.6vw,52px)" }}
            >
              How an engagement actually runs.
            </h2>
          </motion.div>

          <div className="relative pl-8 md:pl-12">
            <motion.div
              aria-hidden
              className="absolute left-2 md:left-3 top-1 bottom-1 w-px origin-top"
              style={{ backgroundColor: accent }}
              initial={reduce ? undefined : { scaleY: 0 }}
              whileInView={reduce ? undefined : { scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.4, ease: EASE }}
            />
            <ol className="flex flex-col gap-10 md:gap-14">
              {steps.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={reduce ? undefined : { opacity: 0, x: 18 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.55,
                    ease: EASE,
                    delay: 0.15 + i * 0.1,
                  }}
                  className="relative"
                >
                  <span
                    aria-hidden
                    className="absolute -left-8 md:-left-12 top-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-white border-2"
                    style={{ borderColor: accent }}
                  />
                  <div
                    className="font-mono text-[11px] tracking-[0.18em] uppercase mb-2"
                    style={{ color: accent }}
                  >
                    Step {String(i + 1).padStart(2, "0")}
                    {step.duration ? ` · ${step.duration}` : ""}
                  </div>
                  <h3 className="font-display font-medium text-ink text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="text-ink-2 text-[15px] md:text-[16px] leading-[1.6] mt-2 max-w-[60ch]">
                    {step.detail}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Deliverables grid — staggered reveal + hover lift ---------------- */

export function ServiceDeliverablesGrid({
  items,
  accent,
}: {
  items: ServiceDeliverable[];
  accent: string;
}) {
  const reduce = useReducedMotion();
  if (!items || items.length === 0) return null;

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.07,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };
  const card = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      };

  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 md:mb-16 max-w-[820px]"
        >
          <div
            className="font-mono text-[11px] tracking-[0.22em] uppercase mb-4"
            style={{ color: accent }}
          >
            What you get
          </div>
          <h2
            className="font-display font-medium leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px,3.6vw,52px)" }}
          >
            Concrete deliverables, not promises.
          </h2>
        </motion.div>
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {items.map((d) => (
            <motion.li
              key={d.name}
              variants={card}
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="bg-bg-paper border border-line rounded-3xl p-6 md:p-7"
              style={{ borderTopColor: accent, borderTopWidth: "3px" }}
            >
              <h3 className="font-display font-medium text-ink text-[18px] md:text-[19px] leading-[1.3]">
                {d.name}
              </h3>
              <p className="text-ink-2 text-[14px] md:text-[15px] leading-[1.6] mt-3">
                {d.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ---------------- Pricing tiers — comparison cards ---------------- */

export function ServicePricingTiers({
  tiers,
  accent,
}: {
  tiers: ServicePricingTier[];
  accent: string;
}) {
  const reduce = useReducedMotion();
  if (!tiers || tiers.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-bg-warm border-y border-line">
      <div className="wrap">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 md:mb-16 max-w-[820px]"
        >
          <div
            className="font-mono text-[11px] tracking-[0.22em] uppercase mb-4"
            style={{ color: accent }}
          >
            Engagement tiers
          </div>
          <h2
            className="font-display font-medium leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px,3.6vw,52px)" }}
          >
            Find the shape that fits your stage.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: 0.1 + i * 0.08,
              }}
              className={`bg-white rounded-3xl p-7 md:p-8 border ${
                t.highlight ? "border-2" : "border-line"
              }`}
              style={t.highlight ? { borderColor: accent } : undefined}
            >
              {t.highlight && (
                <div
                  className="inline-block font-mono text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full mb-4"
                  style={{
                    backgroundColor: `${accent}22`,
                    color: accent,
                  }}
                >
                  Most chosen
                </div>
              )}
              <div className="font-display text-[20px] md:text-[22px] leading-[1.2] text-ink tracking-[-0.01em]">
                {t.name}
              </div>
              <div
                className="font-display font-medium mt-3 mb-1"
                style={{ fontSize: "clamp(28px,3vw,36px)", letterSpacing: "-0.02em" }}
              >
                {t.price}
              </div>
              <p className="text-ink-2 text-[14px] leading-[1.55] mt-3 mb-5">
                {t.summary}
              </p>
              <ul className="flex flex-col gap-2.5">
                {t.includes.map((line) => (
                  <li key={line} className="text-[14px] leading-[1.55] text-ink flex gap-2">
                    <span
                      aria-hidden
                      className="flex-shrink-0 mt-0.5 text-[14px]"
                      style={{ color: accent }}
                    >
                      ✓
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
