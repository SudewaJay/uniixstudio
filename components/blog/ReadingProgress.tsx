"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin orange bar under the header that fills as the page is read. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-[var(--header-h)] z-40 h-[3px] origin-left bg-brand-3"
      style={{ scaleX }}
    />
  );
}
