"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

/**
 * Muted, looping, inline video that downloads nothing (poster included) until it is near the
 * viewport, plays only while visible, and never autoplays under
 * prefers-reduced-motion (the poster stands in, with a play control).
 */
export default function LazyVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  /** Accessible description of what the clip shows. */
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [playing, setPlaying] = useState(false);
  const visible = useRef(false);
  const [near, setNear] = useState(false);

  // Posters are fetched eagerly by the browser, so attach them only when the
  // clip is within ~1.5 viewports.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setArmed(true);
          if (!reduce && el.currentSrc) el.play().then(() => setPlaying(true)).catch(() => {});
        } else if (!el.paused) {
          el.pause();
          setPlaying(false);
        }
      },
      { rootMargin: "200px 0px", threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  // First arm: the src attribute has just been set, so start once it can play.
  useEffect(() => {
    const el = ref.current;
    if (!armed || reduce || !el) return;
    if (visible.current) el.play().then(() => setPlaying(true)).catch(() => {});
  }, [armed, reduce]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    setArmed(true);
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => {});
    else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={clsx("group relative overflow-hidden", className)}>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster={near ? poster : undefined}
        muted
        loop
        playsInline
        preload="none"
        src={armed ? src : undefined}
        aria-label={label}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-3 right-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm opacity-80 hover:opacity-100 focus-visible:opacity-100 transition-opacity"
        aria-label={playing ? `Pause: ${label}` : `Play: ${label}`}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
