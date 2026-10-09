"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useReducedMotion } from "framer-motion";
import styles from "./finland.module.css";

/**
 * Sparse, slow snow for a few chosen moments — never page-wide.
 *
 * Pure CSS flakes (transform + opacity only). Positions come from a fixed
 * formula rather than Math.random so server and client markup match. The
 * animation pauses whenever the host section is off-screen, and nothing
 * renders at all under reduced motion.
 */
export default function Snowfall({ count = 22, className }: { count?: number; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (reduce) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={clsx(styles.snow, !running && styles.snowPaused, className)}
    >
      {Array.from({ length: count }, (_, i) => {
        // Golden-ratio spread: even horizontal coverage without clumping.
        const x = ((i * 61.8) % 100).toFixed(2);
        const size = 1.4 + ((i * 37) % 10) / 6; // 1.4–3px
        const dur = 16 + ((i * 53) % 14); // 16–29s
        const delay = -((i * 97) % 30); // start mid-fall
        const drift = ((i % 2 ? 1 : -1) * (12 + ((i * 29) % 30))).toFixed(0);
        const opacity = 0.25 + ((i * 17) % 50) / 100; // .25–.74
        return (
          <span
            key={i}
            style={{
              left: `${x}%`,
              width: size,
              height: size,
              opacity,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              ["--drift" as string]: `${drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}
