"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import SmartImage from "../ui/SmartImage";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";

type Shot = { src: string; alt: string; position?: string };
type Tile = { href: string; width: string; shots: Shot[] };

/**
 * Mixed-width tiles in the 4thpark style: a single wide frame, a narrow one,
 * or two shots stacked in one column. Widths are in px at desktop and scale
 * down on small screens via the clamp on the track height.
 */
const tiles: Tile[] = [
  {
    href: "/portfolio/cricbook/",
    width: "basis-[78vw] sm:basis-[400px]",
    shots: [{ src: "/portfolio/cricbook/cover.webp", alt: "CricBook brand and booking app" }],
  },
  {
    href: "/portfolio/bilesma-natural/",
    width: "basis-[86vw] sm:basis-[600px]",
    shots: [{ src: "/portfolio/bilesma/cover.webp", alt: "Bilesma Ayurveda brand identity" }],
  },
  {
    href: "/portfolio/bilesma-natural-social-media/",
    width: "basis-[60vw] sm:basis-[210px]",
    shots: [
      { src: "/portfolio/bilesma-social/saffron-review.webp", alt: "Bilesma saffron cream social post" },
      { src: "/portfolio/bilesma-social/offer-orange.webp", alt: "Bilesma offer social post" },
    ],
  },
  {
    href: "/portfolio/st-lukes-medilab/",
    width: "basis-[86vw] sm:basis-[680px]",
    shots: [{ src: "/portfolio/st-lukes/d-home.webp", alt: "St. Luke's Hospitals website", position: "top" }],
  },
  {
    href: "/portfolio/cricbook/",
    width: "basis-[78vw] sm:basis-[460px]",
    shots: [{ src: "/portfolio/cricbook/console/hero.webp", alt: "CricBook venue console", position: "top" }],
  },
  {
    href: "/portfolio/bilesma-natural/",
    width: "basis-[60vw] sm:basis-[260px]",
    shots: [
      { src: "/portfolio/bilesma/bag-logo-studio.webp", alt: "Bilesma packaging" },
      { src: "/portfolio/bilesma/bookmarks.webp", alt: "Bilesma bookmarks" },
    ],
  },
  {
    href: "/portfolio/bilesma-natural/",
    width: "basis-[86vw] sm:basis-[560px]",
    shots: [{ src: "/portfolio/bilesma/x-banner.webp", alt: "Bilesma social banner" }],
  },
];

const AUTOPLAY_MS = 3800;

export default function WorkCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useSafeReducedMotion();

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  // Auto-advance one tile at a time; wrap to the start at the end.
  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      const items = Array.from(el.children) as HTMLElement[];
      const next = items.find((c) => c.offsetLeft - el.offsetLeft > el.scrollLeft + 4);
      el.scrollTo({ left: next ? next.offsetLeft - el.offsetLeft : max, behavior: "smooth" });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  // Thumb width mirrors how much of the track is visible.
  const [thumb, setThumb] = useState(0.2);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setThumb(Math.min(1, el.clientWidth / el.scrollWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        aria-label="Selected work"
        role="region"
        className="flex h-[clamp(300px,34vw,420px)] snap-x snap-mandatory gap-3 sm:gap-4 overflow-x-auto overscroll-x-contain px-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tiles.map((t, i) => (
          <Link
            key={i}
            href={t.href}
            className={clsx(
              "group flex shrink-0 snap-start flex-col gap-3 sm:gap-4 focus-visible:outline-2 focus-visible:outline-offset-4",
              t.width,
            )}
          >
            {t.shots.map((s) => (
              <span
                key={s.src}
                className="relative block min-h-0 flex-1 overflow-hidden rounded-[4px] bg-white/5"
              >
                <span className="absolute inset-0 transition-transform duration-700 ease-uniix group-hover:scale-[1.03]">
                  <SmartImage
                    src={s.src}
                    alt={s.alt}
                    sizes="(min-width:640px) 680px, 86vw"
                    position={s.position}
                  />
                </span>
              </span>
            ))}
          </Link>
        ))}
      </div>

      {/* Progress rail */}
      <div className="wrap mt-10 sm:mt-12">
        <div className="relative mx-auto h-px max-w-[960px] bg-white/15" aria-hidden="true">
          <div
            className="absolute top-[-1px] h-[3px] bg-white transition-[left] duration-300"
            style={{ width: `${thumb * 100}%`, left: `${progress * (1 - thumb) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
