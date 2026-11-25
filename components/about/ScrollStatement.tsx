"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

/**
 * A single sentence that lights up word by word as it scrolls through the
 * viewport. Words listed in `accent` turn orange. The full sentence is always
 * in the DOM as plain text; only opacity changes.
 */
export default function ScrollStatement({
  id,
  label,
  text,
  accent = [],
}: {
  id: string;
  label: string;
  text: string;
  accent?: string[];
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const words = text.split(" ");

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className="on-dark relative bg-bg-ink py-28 text-white md:py-44">
      <div className="wrap-wide">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-2">{label}</p>
        <h2
          id={`${id}-title`}
          className="mt-8 max-w-[18ch] font-display font-medium leading-[0.98] tracking-[-0.05em] text-[clamp(40px,6.4vw,112px)]"
        >
          {words.map((w, i) => (
            <Word
              key={i}
              word={w}
              hot={accent.includes(w.replace(/[^\w]/g, "").toLowerCase())}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              still={reduce}
            />
          ))}
        </h2>
      </div>
    </section>
  );
}

function Word({
  word,
  hot,
  progress,
  range,
  still,
}: {
  word: string;
  hot: boolean;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={still ? undefined : { opacity }} className={hot ? "text-brand-2" : undefined}>
        {word}
      </motion.span>{" "}
    </>
  );
}
