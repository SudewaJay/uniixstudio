"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import type { NarrativeBlock } from "@/lib/projects";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const BRAND = {
  green: "#1FA64A",
  red: "#E63946",
  ink: "#0F1B2D",
  mist: "#F4F8F6",
  gold: "#F5B500",
  cyan: "#22D3EE",
};

function Eyebrow({ children, color = BRAND.green }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      className="font-mono text-[11px] tracking-[0.18em] uppercase mb-4"
      style={{ color }}
    >
      {children}
    </div>
  );
}

function Headline({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className={`font-display font-medium tracking-[-0.02em] leading-[1.1] ${light ? "text-white" : ""}`}
      style={{ fontSize: "clamp(28px,3.6vw,52px)" }}
    >
      {children}
    </h2>
  );
}

/* ---------------- Brief — three problem cards + red footnote ---------------- */

function BriefBlock(props: Extract<NarrativeBlock, { kind: "brief" }>) {
  const reduce = useReducedMotion();
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: BRAND.mist }}>
      <div className="wrap">
        <div className="max-w-[820px]">
          {props.eyebrow && <Eyebrow>{props.eyebrow}</Eyebrow>}
          <Headline>{props.headline}</Headline>
          {props.lead && (
            <p className="text-[clamp(17px,1.4vw,21px)] text-ink-2 leading-[1.6] mt-6 max-w-[60ch]">
              {props.lead}
            </p>
          )}
        </div>
        <motion.ul
          className="grid md:grid-cols-3 gap-5 md:gap-6 mt-12 md:mt-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
          }}
        >
          {props.problems.map((p, i) => (
            <motion.li
              key={p.title}
              variants={
                reduce
                  ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
                  : {
                      hidden: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }
              }
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="bg-white rounded-lg2 p-6 md:p-7 border border-line"
            >
              <div
                className="font-mono text-[12px] tracking-[0.16em] font-medium"
                style={{ color: BRAND.green }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-[20px] md:text-[22px] mt-3 leading-[1.3]">
                {p.title}
              </h3>
              <p className="text-[15px] text-ink-2 leading-[1.55] mt-3">{p.body}</p>
            </motion.li>
          ))}
        </motion.ul>
        {props.footnote && (
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mt-10 p-5 md:p-6 rounded-lg2 border-l-2 max-w-[820px]"
            style={{ borderColor: BRAND.red, backgroundColor: "#FFF1F2" }}
          >
            <div
              className="font-mono text-[11px] tracking-[0.16em] uppercase mb-2"
              style={{ color: BRAND.red }}
            >
              The cost
            </div>
            <p className="text-[15px] md:text-[16px] text-ink leading-[1.55]">{props.footnote}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ---------------- Approach — pull-quote + proof rows ---------------- */

function ApproachBlock(props: Extract<NarrativeBlock, { kind: "approach" }>) {
  const reduce = useReducedMotion();
  return (
    <section className="py-20 md:py-28">
      <div className="wrap max-w-[920px] mx-auto">
        {props.eyebrow && <Eyebrow>{props.eyebrow}</Eyebrow>}
        <Headline>{props.headline}</Headline>
        <motion.blockquote
          initial={reduce ? undefined : { opacity: 0, scale: 0.97 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-12 md:mt-14 pl-6 md:pl-8 border-l-[3px]"
          style={{ borderColor: BRAND.green }}
        >
          <p
            className="font-display italic-display tracking-[-0.01em] leading-[1.25]"
            style={{ fontSize: "clamp(26px,3.2vw,44px)" }}
          >
            “{props.pullQuote}”
          </p>
        </motion.blockquote>
        <motion.ul
          className="grid gap-5 md:gap-6 mt-12 md:mt-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
          }}
        >
          {props.proofs.map((p) => (
            <motion.li
              key={p.claim}
              variants={
                reduce
                  ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
                  : {
                      hidden: { opacity: 0, x: -16 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
                    }
              }
              className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-8 items-baseline border-t border-line pt-5 md:pt-6"
            >
              <div className="font-display text-[18px] md:text-[20px] leading-[1.3]" style={{ color: BRAND.ink }}>
                {p.claim}
              </div>
              <p className="text-[15px] md:text-[16px] text-ink-2 leading-[1.6]">{p.evidence}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ---------------- IA — interactive 2x2 grid ---------------- */

const IA_COLORS = [BRAND.green, BRAND.cyan, BRAND.gold, BRAND.red];

function IAGridBlock(props: Extract<NarrativeBlock, { kind: "ia" }>) {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: BRAND.mist }}>
      <div className="wrap">
        <div className="max-w-[820px]">
          {props.eyebrow && <Eyebrow color={BRAND.cyan}>{props.eyebrow}</Eyebrow>}
          <Headline>{props.headline}</Headline>
          {props.lead && (
            <p className="text-[clamp(17px,1.4vw,21px)] text-ink-2 leading-[1.6] mt-6 max-w-[60ch]">
              {props.lead}
            </p>
          )}
        </div>
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mt-12 md:mt-16">
          {props.quadrants.map((q, i) => {
            const color = IA_COLORS[i % IA_COLORS.length];
            const isActive = activeIdx === i;
            return (
              <motion.button
                key={q.title}
                type="button"
                onMouseEnter={() => setActiveIdx(i)}
                onFocus={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(isActive ? null : i)}
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
                whileHover={reduce ? undefined : { y: -4 }}
                className="text-left bg-white rounded-lg2 p-6 md:p-8 border relative overflow-hidden transition-shadow"
                style={{
                  borderColor: isActive ? color : "var(--line, #E5E7EB)",
                  boxShadow: isActive ? `0 8px 24px -12px ${color}55` : "none",
                }}
                aria-expanded={isActive}
              >
                <div
                  aria-hidden
                  className="absolute top-0 left-0 h-1 transition-all"
                  style={{
                    width: isActive ? "100%" : "32px",
                    backgroundColor: color,
                  }}
                />
                <div
                  className="font-mono text-[11px] tracking-[0.18em] uppercase mb-3"
                  style={{ color }}
                >
                  {q.label}
                </div>
                <h3 className="font-display text-[22px] md:text-[26px] leading-[1.25]">
                  {q.title}
                </h3>
                <p className="text-[15px] text-ink-2 leading-[1.55] mt-3">{q.description}</p>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="query"
                      initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { height: "auto", opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 pt-4 border-t border-line">
                        <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-mute mb-2">
                          Patient query
                        </div>
                        <div
                          className="font-mono text-[14px] md:text-[15px]"
                          style={{ color: BRAND.ink }}
                        >
                          “{q.query}”
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute mt-6">
          Tap or hover a card to see the query it ranks for
        </p>
      </div>
    </section>
  );
}

/* ---------------- Pillars — vertical numbered list with draw-in line ---------------- */

function PillarsBlock(props: Extract<NarrativeBlock, { kind: "pillars" }>) {
  const reduce = useReducedMotion();
  return (
    <section className="py-20 md:py-28">
      <div className="wrap max-w-[920px] mx-auto">
        {props.eyebrow && <Eyebrow>{props.eyebrow}</Eyebrow>}
        <Headline>{props.headline}</Headline>
        {props.lead && (
          <p className="text-[clamp(17px,1.4vw,21px)] text-ink-2 leading-[1.6] mt-6 max-w-[60ch]">
            {props.lead}
          </p>
        )}
        <div className="relative mt-12 md:mt-16 pl-8 md:pl-12">
          <motion.div
            aria-hidden
            className="absolute left-2 md:left-3 top-2 bottom-2 w-px origin-top"
            style={{ backgroundColor: BRAND.green }}
            initial={reduce ? undefined : { scaleY: 0 }}
            whileInView={reduce ? undefined : { scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: EASE }}
          />
          <ul className="flex flex-col gap-10 md:gap-14">
            {props.items.map((item, i) => (
              <motion.li
                key={item.title}
                initial={reduce ? undefined : { opacity: 0, x: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.15 + i * 0.1 }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="absolute -left-8 md:-left-12 top-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 bg-white"
                  style={{ borderColor: BRAND.green }}
                />
                <div
                  className="font-mono text-[11px] tracking-[0.16em] uppercase mb-2"
                  style={{ color: BRAND.green }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-[20px] md:text-[24px] leading-[1.3]">
                  {item.title}
                </h3>
                <p className="text-[15px] md:text-[16px] text-ink-2 leading-[1.6] mt-2">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Outcome — dark Clinical Ink section ---------------- */

function OutcomeBlock(props: Extract<NarrativeBlock, { kind: "outcome" }>) {
  const reduce = useReducedMotion();
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: BRAND.ink }}>
      <div className="wrap">
        <div className="max-w-[820px]">
          {props.eyebrow && <Eyebrow color={BRAND.cyan}>{props.eyebrow}</Eyebrow>}
          <Headline light>{props.headline}</Headline>
        </div>
        <motion.ul
          className="grid md:grid-cols-3 gap-5 md:gap-6 mt-12 md:mt-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
          }}
        >
          {props.stats.map((s) => (
            <motion.li
              key={s.label}
              variants={
                reduce
                  ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
                  : {
                      hidden: { opacity: 0, y: 24 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }
              }
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="p-6 md:p-7 rounded-lg2 border"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              <div
                className="font-display font-medium tracking-[-0.02em] leading-[1.05]"
                style={{ fontSize: "clamp(34px,3.6vw,52px)", color: BRAND.green }}
              >
                {s.value}
              </div>
              <div
                className="font-mono text-[11px] tracking-[0.18em] uppercase mt-3"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {s.label}
              </div>
              {s.body && (
                <p
                  className="text-[15px] leading-[1.55] mt-4"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {s.body}
                </p>
              )}
            </motion.li>
          ))}
        </motion.ul>
        {props.closing && (
          <motion.p
            initial={reduce ? undefined : { opacity: 0 }}
            whileInView={reduce ? undefined : { opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="font-display italic-display mt-12 md:mt-16 max-w-[760px]"
            style={{
              color: BRAND.cyan,
              fontSize: "clamp(18px,1.6vw,22px)",
              lineHeight: 1.5,
            }}
          >
            {props.closing}
          </motion.p>
        )}
      </div>
    </section>
  );
}

/* ---------------- Dispatcher ---------------- */

export default function CaseStudyNarrative({ blocks }: { blocks: NarrativeBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        const key = `${block.kind}-${i}`;
        switch (block.kind) {
          case "brief":
            return <BriefBlock key={key} {...block} />;
          case "approach":
            return <ApproachBlock key={key} {...block} />;
          case "ia":
            return <IAGridBlock key={key} {...block} />;
          case "pillars":
            return <PillarsBlock key={key} {...block} />;
          case "outcome":
            return <OutcomeBlock key={key} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
