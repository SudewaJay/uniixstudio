"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { projects as legacyProjects } from "@/lib/content";
import type { Project } from "@/lib/projects";
import Reveal from "./Reveal";

function WorkCard({ p }: { p: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const bigY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const fgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-12, 12]);
  const bigScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.05, 1.0, 1.05]);

  /* Cursor-follow circle (Eight25-style) */
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { stiffness: 350, damping: 28, mass: 0.4 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - r.left);
    cursorY.set(e.clientY - r.top);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={(e) => {
        setHover(true);
        // Seed the cursor position to where the mouse entered to avoid a "fly-in"
        const r = e.currentTarget.getBoundingClientRect();
        cursorX.jump(e.clientX - r.left);
        cursorY.jump(e.clientY - r.top);
      }}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMove}
      className={`relative rounded-DEFAULT overflow-hidden flex items-end p-8 text-white transition-transform duration-700 group-hover:-translate-y-2 bg-gradient-to-br ${p.bg} md:cursor-none w-full max-w-[1050px] mx-auto`}
      style={{ aspectRatio: "1050 / 640" }}
    >
      {p.coverImage && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={p.coverImage}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
      )}

      {p.coverImage && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,20,16,0.30) 0%, rgba(26,20,16,0.15) 35%, rgba(26,20,16,0.55) 75%, rgba(26,20,16,0.85) 100%)",
          }}
        />
      )}

      {!p.coverImage && (
        <motion.span
          style={{ y: bigY, scale: bigScale }}
          className={`absolute inset-0 grid place-items-center pointer-events-none will-change-transform ${p.bigClass}`}
          aria-hidden
        >
          <span
            style={{
              fontSize: p.feature
                ? "clamp(80px,12vw,180px)"
                : "clamp(100px,14vw,220px)",
            }}
          >
            {p.bigText}
          </span>
        </motion.span>
      )}

      <motion.div
        style={{ y: fgY }}
        className="relative z-[2] w-full flex justify-between items-end gap-4 will-change-transform"
      >
        <div>
          <span className="inline-block px-3 py-1.5 bg-white/12 backdrop-blur-md border border-white/[0.18] rounded-full font-mono text-[10px] tracking-[0.12em] uppercase mb-2.5">
            {p.overline}
          </span>
          <h3
            className="font-display font-medium leading-[1.1]"
            style={{
              fontSize: "clamp(22px,2.4vw,32px)",
              letterSpacing: "-0.02em",
            }}
          >
            {p.headline}
          </h3>
        </div>
        <div className="w-12 h-12 rounded-full bg-white text-ink grid place-items-center flex-shrink-0 transition-all duration-300 md:opacity-0 md:group-hover:opacity-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="w-[18px] h-[18px]"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      </motion.div>

      {/* Cursor-follow circle — desktop only, hidden when reduced-motion */}
      <motion.div
        aria-hidden
        className="hidden md:grid pointer-events-none absolute top-0 left-0 z-[3] place-items-center rounded-full bg-white text-ink will-change-transform"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 88,
          height: 88,
          opacity: hover ? 1 : 0,
          scale: hover ? 1 : 0.6,
          transition: "opacity 220ms ease, scale 220ms ease",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="w-6 h-6"
        >
          <path d="M7 17L17 7M17 7H8M17 7v9" />
        </svg>
      </motion.div>
    </div>
  );
}

export default function WorkGrid({
  items,
  limit,
}: {
  items?: Project[];
  limit?: number;
}) {
  // Fallback to legacy projects (with hasDetail:false) when no items prop
  // is provided — keeps server-less consumers (e.g. marketing pages) working.
  const source: Project[] =
    items ??
    (legacyProjects.map((p) => ({ ...p, hasDetail: false })) as Project[]);
  const list = limit ? source.slice(0, limit) : source;

  return (
    <div className="flex flex-col gap-16 md:gap-20">
      {list.map((p, i) => {
        const card = (
          <>
            <WorkCard p={p} />
            <div className="mt-5 flex justify-between gap-6 items-start max-w-[1050px] mx-auto w-full">
              <div>
                <div
                  className="font-display font-medium"
                  style={{
                    fontSize: "22px",
                    letterSpacing: "-0.015em",
                    marginBottom: "6px",
                  }}
                >
                  {p.title}
                </div>
                <div className="text-sm text-ink-mute leading-[1.55] max-w-[60ch]">
                  {p.summary}
                </div>
                {p.hasDetail && (
                  <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-brand-4 mt-3 inline-flex items-center gap-1.5">
                    Read case study
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                )}
              </div>
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-brand-4 whitespace-nowrap pt-1.5">
                {p.year} · {p.overline.split(" ")[0]}
              </div>
            </div>
          </>
        );

        const wrapperClass = "work-card group";

        return (
          <Reveal
            key={p.slug}
            delay={(i % 3) as 0 | 1 | 2}
            className={wrapperClass}
          >
            {p.hasDetail ? (
              <Link href={`/portfolio/${p.slug}`} className="block">
                {card}
              </Link>
            ) : (
              card
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
