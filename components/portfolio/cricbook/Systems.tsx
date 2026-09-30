"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import clsx from "clsx";
import { bigIdea, CB, ecosystem, layers } from "./data";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */
/* BRAND → PRODUCT → PLATFORM → MARKETING → GROWTH                              */
/* -------------------------------------------------------------------------- */

export function BigIdeaFlow() {
  const reduce = useSafeReducedMotion();
  return (
    <ol className="relative grid gap-0 lg:grid-cols-5">
      {/* Connector: horizontal on desktop, vertical on mobile */}
      <motion.span
        aria-hidden="true"
        className="absolute left-[11px] top-3 bottom-3 w-px origin-top bg-white/20 lg:hidden"
        initial={reduce ? false : { scaleY: 0 }}
        animate={reduce ? { opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1 } : undefined}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute left-0 right-0 top-[11px] hidden h-px origin-left lg:block"
        style={{ background: `linear-gradient(90deg, ${CB.mint}, ${CB.electric}, ${CB.magenta})` }}
        initial={reduce ? false : { scaleX: 0 }}
        animate={reduce ? { opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1 } : undefined}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.6, ease: EASE }}
      />
      {bigIdea.map((b, i) => (
        <motion.li
          key={b.key}
          className="relative pl-12 pb-10 lg:pl-0 lg:pr-6 lg:pb-0"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? { opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1 } : undefined}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: reduce ? 0 : 0.2 + i * 0.16 }}
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 grid h-[23px] w-[23px] place-items-center rounded-full border border-white/30 bg-bg-ink lg:relative"
          >
            <span className="h-2 w-2 rounded-full" style={{ background: i === 4 ? CB.magenta : CB.mint }} />
          </span>
          <p className="font-mono text-[11px] tracking-[0.18em] text-white/45 lg:mt-6">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 font-display text-[clamp(26px,2.3vw,36px)] font-medium uppercase leading-none tracking-[-0.03em] text-white">
            {b.key}
          </h3>
          <p className="mt-4 text-[15px] leading-[1.55] text-white/75 max-w-[28ch]">{b.line}</p>
          <ul className="mt-4 flex flex-col gap-1.5">
            {b.items.map((it) => (
              <li key={it} className="font-mono text-[11px] tracking-[0.06em] text-white/50">
                — {it}
              </li>
            ))}
          </ul>
        </motion.li>
      ))}
    </ol>
  );
}

/* -------------------------------------------------------------------------- */
/* PLAYER ↓ PLATFORM ↓ VENUE                                                   */
/* -------------------------------------------------------------------------- */

function Capability({ label, side, i }: { label: string; side: "left" | "right"; i: number }) {
  const reduce = useSafeReducedMotion();
  return (
    <motion.li
      className={clsx("relative flex items-center gap-3", side === "left" ? "lg:flex-row-reverse lg:text-right" : "")}
      initial={reduce ? false : { opacity: 0, x: side === "left" ? -14 : 14 }}
      animate={reduce ? { opacity: 1, x: 0, y: 0, scaleX: 1, scaleY: 1 } : undefined}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: EASE, delay: reduce ? 0 : 0.3 + i * 0.1 }}
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 flex-none rounded-full"
        style={{ background: side === "left" ? CB.mint : CB.magenta }}
      />
      <span className="rounded-full border border-line bg-white px-4 py-2 text-[14px] font-medium text-ink shadow-sm2">
        {label}
      </span>
      <span aria-hidden="true" className="hidden lg:block h-px flex-1 bg-line" />
    </motion.li>
  );
}

function Actor({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-2xl border border-line bg-white px-6 py-5 text-center shadow-sm2">
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute">{sub}</p>
      <p className="mt-1 font-display text-[22px] font-medium tracking-[-0.02em] text-ink">{title}</p>
    </div>
  );
}

function Pulse({ reverse }: { reverse?: boolean }) {
  return (
    <div aria-hidden="true" className="relative mx-auto h-14 w-px bg-line overflow-hidden">
      <span
        className={clsx("cb-pulse absolute left-1/2 h-4 w-[3px] -translate-x-1/2 rounded-full", reverse && "cb-pulse-rev")}
        style={{ background: reverse ? CB.magenta : CB.mint }}
      />
    </div>
  );
}

export function Ecosystem() {
  return (
    <div className="relative">
      <Actor title="Player" sub="Books" />
      <Pulse />
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,340px)_1fr] lg:gap-6">
        <ul className="order-2 grid grid-cols-2 gap-3 lg:order-1 lg:grid-cols-1 lg:gap-5" aria-label="Player-side capabilities">
          {ecosystem.left.map((c, i) => (
            <Capability key={c} label={c} side="left" i={i} />
          ))}
        </ul>

        <div
          className="order-1 lg:order-2 relative mx-auto aspect-square w-full max-w-[340px] rounded-full grid place-items-center text-center"
          style={{ background: `radial-gradient(circle at 50% 35%, #3A2FA0, ${CB.indigo} 60%, ${CB.indigoDeep})` }}
        >
          <span aria-hidden="true" className="absolute inset-[7%] rounded-full border border-white/15" />
          <span aria-hidden="true" className="cb-orbit absolute inset-[-4%] rounded-full border border-dashed border-[#22E0A0]/40" />
          <div className="relative px-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/portfolio/cricbook/brand/spark.svg" alt="" aria-hidden="true" className="mx-auto h-14 w-auto" />
            <p className="mt-4 font-mono text-[10px] tracking-[0.2em] uppercase text-white/55">One platform</p>
            <p className="mt-1 font-display text-[26px] font-medium tracking-[-0.02em] text-white">CricBook</p>
            <p className="mt-2 text-[13px] leading-[1.5] text-white/60">One source of truth for every court and slot.</p>
          </div>
        </div>

        <ul className="order-3 grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-5" aria-label="Venue-side capabilities">
          {ecosystem.right.map((c, i) => (
            <Capability key={c} label={c} side="right" i={i} />
          ))}
        </ul>
      </div>
      <Pulse reverse />
      <Actor title="Venue owner" sub="Operates" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* BRAND → UX → UI → WEB → PLATFORM → CONTENT → SEO → GROWTH                   */
/* -------------------------------------------------------------------------- */

export function LayersRail() {
  const reduce = useSafeReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const fill = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0, 1]);

  return (
    <div ref={ref} className="relative">
      <div aria-hidden="true" className="absolute left-0 right-0 top-[30px] hidden h-px bg-line md:block">
        <motion.span
          className="block h-full origin-left"
          style={{ scaleX: fill, background: `linear-gradient(90deg, ${CB.mint}, ${CB.electric}, ${CB.magenta})` }}
        />
      </div>
      <ol className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 md:grid-cols-8 md:gap-4">
        {layers.map((l, i) => (
          <LayerItem key={l} label={l} i={i} progress={fill} />
        ))}
      </ol>
    </div>
  );
}

function LayerItem({
  label,
  i,
  progress,
}: {
  label: string;
  i: number;
  progress: MotionValue<number>;
}) {
  const at = i / (layers.length - 1);
  const opacity = useTransform(progress, [Math.max(0, at - 0.12), at], [0.35, 1]);
  return (
    <motion.li style={{ opacity }} className="relative">
      <span className="relative z-[1] grid h-[60px] w-[60px] place-items-center rounded-full border border-line bg-bg font-mono text-[12px] text-ink">
        {String(i + 1).padStart(2, "0")}
      </span>
      <p className="mt-4 font-display text-[clamp(17px,1.55vw,24px)] font-medium uppercase tracking-[-0.02em] text-ink">
        {label}
      </p>
    </motion.li>
  );
}
