"use client";

import type { JSX, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  /** Kept for API compatibility; rendering is always motion.div */
  as?: keyof JSX.IntrinsicElements;
  amount?: number | "some" | "all";
};

export default function Reveal({ children, delay = 0, className, amount = 0.12 }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={clsx(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px", amount }}
      transition={{
        duration: 0.65,
        delay: delay * 0.09,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}

