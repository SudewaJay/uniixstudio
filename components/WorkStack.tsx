"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { projects } from "@/lib/content";

type Project = (typeof projects)[number];

// Each card pins for ~100vh of scroll. Total section height = N × CARD_VH.
const CARD_VH = 100;

// Spring config for the smoothed scroll progress. Lower stiffness = more
// damping = softer handoff between cards. Tuned for cinematic feel.
const SCROLL_SPRING = { stiffness: 90, damping: 22, mass: 0.4 };

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

  // This card's scroll range within the parent (0..1).
  const start = index / total;
  const end = (index + 1) / total;

  // Entry: card scales up from 0.96 → 1 as it becomes the focal one.
  // No exit fade — the NEXT card sits on top via higher z-index and covers
  // this one cleanly when scroll passes. Trying to fade the previous card
  // creates visible ghost-overlap because the deck is all sticky-stacked.
  const enterStart = Math.max(0, start - 0.5 / total);
  const scale = useTransform(
    scrollYProgress,
    [enterStart, start],
    reduce ? [1, 1] : [0.96, 1],
  );
  const opacity = useTransform(
    scrollYProgress,
    [enterStart, start],
    reduce ? [1, 1] : [0.85, 1],
  );

  return (
    <div
      className="sticky w-full"
      style={{
        top: "10vh",
        height: "80vh",
        // Newer cards layer ABOVE older ones so each new sticky card
        // cleanly covers the previous one. Previous version had this
        // reversed which caused the overlap mess.
        zIndex: index + 1,
        marginBottom: index === total - 1 ? 0 : "20vh",
      }}
    >
      <motion.div
        style={{ scale, opacity }}
        className="origin-top will-change-transform h-full"
      >
        <div
          className={`relative rounded-DEFAULT overflow-hidden flex items-end p-10 md:p-14 text-white bg-gradient-to-br ${p.bg} shadow-[0_30px_80px_-30px_rgba(26,20,16,0.45)] h-full`}
        >
          {/* Cover image — full-bleed background */}
          {p.coverImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={p.coverImage}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Image readability — soft on top, deep at bottom so headline reads */}
          {p.coverImage && (
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(26,20,16,0.45) 0%, rgba(26,20,16,0.20) 30%, rgba(26,20,16,0.55) 70%, rgba(26,20,16,0.85) 100%)",
              }}
            />
          )}

          {/* Index badge — top-left */}
          <div className="absolute top-8 left-8 md:top-10 md:left-10 z-[3] font-mono text-[11px] tracking-[0.18em] uppercase text-white/75">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>

          {/* Year + category — top-right */}
          <div className="absolute top-8 right-8 md:top-10 md:right-10 z-[3] font-mono text-[11px] tracking-[0.18em] uppercase text-white/75">
            {p.year} · {p.overline}
          </div>

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

  // Smooth the raw scroll signal via a spring before feeding it to per-card
  // transforms. Eliminates the micro-stutter on trackpad scroll and gives
  // the whole stack a cinematic, weighted feel.
  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);

  return (
    <div
      ref={containerRef}
      className="wrap relative"
      style={{ height: `${items.length * CARD_VH}vh` }}
    >
      {items.map((p, i) => (
        <StackCard
          key={p.slug}
          p={p}
          index={i}
          total={items.length}
          scrollYProgress={smoothProgress}
        />
      ))}
    </div>
  );
}
