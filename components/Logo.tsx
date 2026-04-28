"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Uniix Studio — Home"
      className="inline-flex items-center"
    >
      <motion.img
        src="/uniix-logo.svg"
        alt="Uniix Studio"
        width={778}
        height={346}
        className="h-8 w-auto md:h-9 origin-left"
        style={light ? { filter: "brightness(0) invert(1)" } : undefined}
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      />
    </Link>
  );
}
