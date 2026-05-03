"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type ContainerTextFlipProps = {
  words: string[];
  /** Time each word stays visible before flipping (ms). Default 2400. */
  interval?: number;
  /** Optional className applied to the inner word span (gradient, italic, etc). */
  wordClassName?: string;
  /** Optional className applied to the outer flipping container. */
  className?: string;
};

/**
 * Aceternity-style 3D word flipper. Words rotate through on a loop with a
 * rotateX swap and width auto-sizing so the layout doesn't jump.
 *
 * SEO note: only the first word in `words` is rendered server-side. Place
 * the keyword you want indexed at index 0.
 */
export function ContainerTextFlip({
  words,
  interval = 2400,
  wordClassName = "",
  className = "",
}: ContainerTextFlipProps) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const t = setInterval(() => {
      setI((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(t);
  }, [reduce, words.length, interval]);

  return (
    <motion.span
      layout
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className={`inline-block align-baseline ${className}`}
      style={{ perspective: "800px" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={
            reduce
              ? { opacity: 1, rotateX: 0 }
              : { opacity: 0, rotateX: -90, y: "-30%" }
          }
          animate={{
            opacity: 1,
            rotateX: 0,
            y: "0%",
            transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
          }}
          exit={
            reduce
              ? { opacity: 1, rotateX: 0 }
              : {
                  opacity: 0,
                  rotateX: 90,
                  y: "30%",
                  transition: { duration: 0.4, ease: [0.55, 0, 0.35, 1] },
                }
          }
          className={`inline-block ${wordClassName}`}
          style={{
            transformOrigin: "50% 50%",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            whiteSpace: "pre",
          }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
