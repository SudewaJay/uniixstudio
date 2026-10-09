"use client";

import type { JSX, ReactNode } from "react";
import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
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
 * Under `prefers-reduced-motion` the content is shown immediately, without
 * waiting on an observer. The element type never changes between server and
 * client (swapping to a plain div broke hydration and left SSR `opacity: 0`
 * in place), and the preference is only read after mount.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  amount = 0.15,
}: Props) {
  const reduce = useSafeReducedMotion();

  return (
    <motion.div
      className={clsx(className)}
      initial={{ opacity: 0, y: 16 }}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px", amount }}
      transition={reduce ? { duration: 0 } : { duration: 0.65, delay: delay * 0.09, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
