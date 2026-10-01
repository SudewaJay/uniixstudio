"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./finland.module.css";

/**
 * Slow masked image reveal: the frame opens upward with a soft clip-path while
 * the image settles from a slight scale. Fires once. Content is fully visible
 * without JS and under reduced motion (the CSS only hides it once hydrated and
 * motion is allowed).
 */
export default function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at hydration? Don't hide it just to re-show it.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={clsx(styles.clip, armed && styles.clipArmed, shown && styles.clipShown, className)}>
      {children}
    </div>
  );
}
