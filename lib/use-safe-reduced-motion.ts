"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * framer-motion's `useReducedMotion()` is `null` on the server but reads
 * `matchMedia` synchronously on the client, so under prefers-reduced-motion the
 * first client render differs from the server HTML. React then refuses to
 * patch the mismatched attributes and the SSR `opacity: 0` styles stick —
 * content stays invisible.
 *
 * This reports `false` until after mount (matching the server), then the real
 * preference, so the switch happens as an ordinary re-render.
 */
export function useSafeReducedMotion(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? Boolean(reduce) : false;
}
