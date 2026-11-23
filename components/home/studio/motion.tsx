"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

/**
 * Shared motion primitives for the homepage, What We Do → footer.
 *
 * Motion language: "wipe and pin". Content is revealed by clip masks that
 * travel in reading direction, and long ideas are pinned while their content
 * moves through them. Every primitive here honours prefers-reduced-motion and
 * renders its finished state on the server, so nothing depends on JS to be
 * readable.
 */

export const EASE = [0.22, 0.61, 0.36, 1] as const;

/** `true` once mounted on a viewport at least `px` wide. Server: false. */
export function useMinWidth(px: number): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${px}px)`);
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [px]);
  return ok;
}

/** `true` when the primary pointer can hover (mouse / trackpad). */
export function useFinePointer(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setOk(mq.matches);
  }, []);
  return ok;
}

/**
 * Magnetic — the child leans toward the pointer while it is near, then springs
 * back. Pointer-fine only; touch and reduced-motion users get a plain element.
 * Uses a CSS transform on a wrapper so the child keeps its own hover styles.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={clsx("magnetic inline-block", className)}>
      {children}
    </span>
  );
}

/**
 * RollText — on hover, the label rolls up and an identical copy rolls in from
 * below. The copy is aria-hidden so the label is announced once.
 */
export function RollText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={clsx("roll", className)}>
      <span className="roll-a">{children}</span>
      <span className="roll-b" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
