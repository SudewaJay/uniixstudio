"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { projects } from "@/lib/content";

type Project = (typeof projects)[number];

// Each card pins for ~100vh of scroll. Total section height = (N+1) × 100vh
// (the +1 gives the last card breathing room before the next section).
const CARD_VH = 100;

function StackCard({
  p,
  index,
  total,
  scrollYProgress,
}: {
  p: Project;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();

  // This card's "active" range within the parent's scrollYProgress (0..1).
  // Card i becomes the focal one between i/(total) and (i+1)/(total).
  const start = index / total;
  const end = (index + 1) / total;

  // Scale: stays full-size while card is the active one,
  // shrinks slightly as the next card slides over it.
  const scale = useTransform(
    scrollYProgress,
    [start, end, Math.min(end + 1 / total, 1)],
    reduce ? [1, 1, 1] : [1, 1, 0.92]
  );

  // Opacity: fade older cards slightly as they recede in the stack.
  const opacity = useTransform(
    scrollYProgress,
    [start, end, Math.min(end + 0.5 / total, 1)],
    reduce ? [1, 1, 1] : [1, 1, 0.7]
  );

  // Big background letter parallax — drifts as card progresses through pin.
  const bigY = useTransform(
    scrollYProgress,
    [start, end],
    reduce ? ["0%", "0%"] : ["12%", "-12%"]
  );

  return (
    <div
      className="sticky"
      style={{
        top: "10vh",
        // Stacking offset — each card sits a tiny bit lower than the previous,
        // so when scaled-down older cards peek out, you see a deck of cards.
        marginTop: index === 0 ? 0 : "-80vh",
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="origin-top will-change-transform"
      >
        <div
          className={`relative rounded-DEFAULT overflow-hidden flex items-end p-10 md:p-14 text-white bg-gradient-to-br ${p.bg} shadow-[0_30px_80px_-30px_rgba(26,20,16,0.45)]`}
          style={{ height: "80vh" }}
        >
          {/* Index badge — top-left */}
          <div className="absolute top-8 left-8 md:top-10 md:left-10 font-mono text-[11px] tracking-[0.18em] uppercase text-white/60">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>

          {/* Year + category — top-right */}
          <div className="absolute top-8 right-8 md:top-10 md:right-10 font-mono text-[11px] tracking-[0.18em] uppercase text-white/60">
            {p.year} · {p.overline}
          </div>

          {/* Big background letterform — parallax */}
          <motion.span
            style={{ y: bigY }}
            className={`absolute inset-0 grid place-items-center pointer-events-none will-change-transform ${p.bigClass}`}
            aria-hidden
          >
            <span style={{ fontSize: "clamp(120px, 18vw, 280px)" }}>
              {p.bigText}
            </span>
          </motion.span>

          {/* Foreground content — bottom */}
          <div className="relative z-[2] w-full flex justify-between items-end gap-6">
            <div className="max-w-[60ch]">
              <span className="inline-block px-3 py-1.5 bg-white/12 backdrop-blur-md border border-white/[0.18] rounded-full font-mono text-[10px] tracking-[0.12em] uppercase mb-4">
                {p.overline}
              </span>
              <h3
                className="font-display font-medium leading-[1.05]"
                style={{
                  fontSize: "clamp(32px, 4.2vw, 64px)",
                  letterSpacing: "-0.025em",
                }}
              >
                {p.headline}
              </h3>
              <p className="mt-4 text-[15px] md:text-[16px] leading-[1.55] text-white/80 max-w-[55ch]">
                {p.summary}
              </p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white text-ink grid place-items-center flex-shrink-0 transition-transform duration-300 hover:rotate-[-45deg] hover:scale-105">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="w-[20px] h-[20px]"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function WorkStack({ limit }: { limit?: number }) {
  const items = limit ? projects.slice(0, limit) : projects;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className="wrap relative"
      style={{ height: `${(items.length + 1) * CARD_VH}vh` }}
    >
      {items.map((p, i) => (
        <StackCard
          key={p.slug}
          p={p}
          index={i}
          total={items.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}
