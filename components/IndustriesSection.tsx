"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import IndustryCard from "./IndustryCard";
import { industries } from "@/lib/industries";
import Reveal from "./Reveal";

const SCROLL_SPEED = 45; // pixels per second

export default function IndustriesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotion();

  const cards = [...industries, ...industries];

  useAnimationFrame((_t, delta) => {
    if (paused || dragging || reduce) return;
    const track = trackRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    if (!halfWidth) return;
    let next = x.get() - (SCROLL_SPEED * delta) / 1000;
    if (next <= -halfWidth) next += halfWidth;
    if (next > 0) next -= halfWidth;
    x.set(next);
  });

  return (
    <section className="relative bg-bg-warm border-y border-line-soft py-24 md:py-28 overflow-hidden">
      <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 lg:gap-0 items-center">
        {/* LEFT — copy block */}
        <Reveal className="px-6 md:px-10 lg:px-0 lg:pl-[max(2rem,calc((100vw-1280px)/2))] lg:pr-12">
          <span className="eyebrow">Industries</span>
          <h2
            className="display mt-4"
            style={{ fontSize: "clamp(36px,4.4vw,64px)", letterSpacing: "-0.025em" }}
          >
            Expanding across
            <br />
            <span className="italic-display gradient-text">industries.</span>
          </h2>
          <p className="text-[clamp(15px,1.15vw,17px)] text-ink-2 max-w-[42ch] leading-[1.6] mt-5">
            Tailored digital solutions for diverse markets — from education and
            healthcare to fintech and SaaS.
          </p>
          <div className="flex items-center gap-5 mt-7 flex-wrap">
            <Link href="/industries" className="btn btn-primary">
              Explore all industries ↗
            </Link>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-mute">
              {industries.length} verticals
            </span>
          </div>
        </Reveal>

        {/* RIGHT — auto-sliding cards */}
        <div
          className="relative overflow-hidden [mask-image:linear-gradient(to_right,black,black_88%,transparent)] py-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <motion.div
            ref={trackRef}
            className="flex gap-5 md:gap-6 cursor-grab active:cursor-grabbing select-none px-6 lg:px-0"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -10000, right: 10000 }}
            dragElastic={0.05}
            dragMomentum={false}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
          >
            {cards.map((ind, i) => (
              <IndustryCard
                key={`${ind.slug}-${i}`}
                industry={ind}
                index={i}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
