"use client";

import type { JSX, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  /** Kept for API compatibility with existing call sites. */
  as?: keyof JSX.IntrinsicElements;
  amount?: number | "some" | "all";
};

/**
 * Scroll reveal. One motion vocabulary for the whole site: 16px rise + fade,
 * 650ms, house easing, 90ms stagger step, fires once.
 *
 * Under `prefers-reduced-motion` this renders a plain div — no opacity:0
 * initial state at all, so the content is never dependent on an observer.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  amount = 0.15,
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={clsx(className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px", amount }}
      transition={{ duration: 0.65, delay: delay * 0.09, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
