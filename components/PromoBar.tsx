"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/content";

export const PROMO_BAR_HEIGHT = 36;

const TAGLINES = [
  "Creative Digital Agency · Colombo · Working globally",
  "Brand identities · Performance websites · Growth systems",
  "50+ projects shipped · 3× average traffic lift in 90 days",
  "Available for Q3 2026 — 2 slots left",
];

const ROTATE_MS = 3800;

export default function PromoBar() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setI((prev) => (prev + 1) % TAGLINES.length);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div
      className="fixed top-0 inset-x-0 z-[110] bg-ink text-white text-[12px]"
      style={{ height: PROMO_BAR_HEIGHT }}
    >
      <div className="wrap h-full flex items-center justify-between gap-4">
        {/* Rotating tagline — fixed-height clip with vertical slide */}
        <div className="relative flex-1 min-w-0 overflow-hidden" style={{ height: 16 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={i}
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute inset-0 flex items-center font-mono tracking-[0.12em] uppercase text-white/85 whitespace-nowrap"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-4 mr-2.5 flex-shrink-0" />
              <span className="truncate">{TAGLINES[i]}</span>
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <Link
            href={site.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="grid place-items-center w-7 h-7 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </Link>
          <Link
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid place-items-center w-7 h-7 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </Link>
          <Link
            href={site.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="grid place-items-center w-7 h-7 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
