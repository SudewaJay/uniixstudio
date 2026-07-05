"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";

type CampaignImage = {
  src: string;
  alt: string;
  label?: string;
};

/**
 * Auto-sliding marquee carousel — duplicates the image list once so a
 * 100% horizontal translate creates a seamless infinite loop. Pauses on
 * hover and collapses to a static row under `prefers-reduced-motion`.
 */
export default function SocialCampaignCarousel({
  title = "Social media campaign",
  description,
  images,
  durationSec = 50,
  eyebrow = "Selected creative",
  accent = "#FFB81C",
}: {
  title?: string;
  description?: string;
  images: CampaignImage[];
  durationSec?: number;
  eyebrow?: string;
  accent?: string;
}) {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false); // transient hover/touch pause
  const [userPaused, setUserPaused] = useState(false); // explicit toggle
  const controls = useAnimationControls();

  // Duplicate the list so the marquee loops without a visible seam
  const loop = [...images, ...images];

  useEffect(() => {
    if (reduce) return;
    if (paused || userPaused) {
      controls.stop();
      return;
    }
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: durationSec,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [paused, userPaused, reduce, durationSec, controls]);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-bg-warm border-y border-line overflow-hidden">
      <div className="wrap">
        <div className="max-w-[820px] mb-10 md:mb-14">
          <div
            className="font-mono text-[11px] tracking-[0.22em] uppercase mb-4"
            style={{ color: accent }}
          >
            {eyebrow}
          </div>
          <h2
            className="font-display font-medium leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px,3.6vw,52px)" }}
          >
            {title}
          </h2>
          {description && (
            <p className="text-[clamp(16px,1.3vw,18px)] text-ink-2 leading-[1.6] mt-5 max-w-[60ch]">
              {description}
            </p>
          )}
          {!reduce && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-pressed={userPaused}
              className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 border border-line rounded-full px-4 py-2 hover:text-ink transition-colors"
            >
              <span aria-hidden="true">{userPaused ? "▶" : "❚❚"}</span>
              {userPaused ? "Play animation" : "Pause animation"}
            </button>
          )}
        </div>
      </div>

      <div
        className="relative w-full"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Soft side fades */}
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--bg-warm, #F4F8F6) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--bg-warm, #F4F8F6) 0%, transparent 100%)",
          }}
        />

        {reduce ? (
          /* Reduced-motion fallback — static row, scroll-snap */
          <ul className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 pb-2">
            {images.map((img, i) => (
              <li
                key={`${img.src}-${i}`}
                className="flex-shrink-0 snap-start"
              >
                <Slide image={img} />
              </li>
            ))}
          </ul>
        ) : (
          <motion.ul
            className="flex gap-4 md:gap-6 will-change-transform"
            animate={controls}
          >
            {loop.map((img, i) => (
              <li
                key={`${img.src}-${i}`}
                className="flex-shrink-0"
              >
                <Slide image={img} />
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}

function Slide({ image }: { image: CampaignImage }) {
  return (
    <div className="w-[260px] md:w-[320px] lg:w-[360px] relative">
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-bg-paper shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {image.label && (
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mt-3 text-center">
          {image.label}
        </div>
      )}
    </div>
  );
}
