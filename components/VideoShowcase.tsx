"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ServiceVideo } from "@/lib/services-fs";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Vimeo thumbnail via the public vumbnail.com proxy — always reachable,
 * always-current, no Vimeo API token required. Falls back gracefully if
 * the service is ever unavailable.
 */
function posterUrl(vimeoId: string): string {
  return `https://vumbnail.com/${vimeoId}_large.jpg`;
}

/**
 * Click-to-play preserves Core Web Vitals: the iframe (which loads
 * 700-900 KB of Vimeo player JS) only mounts after a user gesture.
 * Until then we render a poster image + play button = ~30 KB total.
 */
export function VideoShowcase({
  videos,
  accent = "#F8C84A",
  heading = "Commercial work",
  subheading = "Selected commercial videos we've directed, edited or motion-led for client brands.",
}: {
  videos: ServiceVideo[];
  accent?: string;
  heading?: string;
  subheading?: string;
}) {
  const reduce = useReducedMotion();
  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-20 md:py-28" aria-label="Commercial video showcase">
      <div className="wrap">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 md:mb-16 max-w-[820px]"
        >
          <div
            className="font-mono text-[11px] tracking-[0.22em] uppercase mb-4"
            style={{ color: accent }}
          >
            Showreel
          </div>
          <h2
            className="font-display font-medium leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px,3.6vw,52px)" }}
          >
            {heading}
          </h2>
          {subheading && (
            <p className="text-[clamp(16px,1.3vw,18px)] text-ink-2 leading-[1.6] mt-5 max-w-[60ch]">
              {subheading}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {videos.map((v, i) => (
            <VideoCard key={v.vimeoId} video={v} accent={accent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({
  video,
  accent,
  index,
}: {
  video: ServiceVideo;
  accent: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const iframeSrc = `https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`;

  return (
    <motion.figure
      initial={reduce ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 + index * 0.08 }}
      className="flex flex-col gap-4 group"
    >
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-ink">
        {playing ? (
          /* eslint-disable-next-line jsx-a11y/iframe-has-title */
          <iframe
            src={iframeSrc}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
            className="absolute inset-0 w-full h-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterUrl(video.vimeoId)}
              alt={`${video.title} — ${video.client} commercial preview`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
            />
            <span
              aria-hidden
              className="absolute inset-0 grid place-items-center"
            >
              <span
                className="grid place-items-center w-16 h-16 md:w-20 md:h-20 rounded-full backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: `${accent}EE`,
                  boxShadow: `0 8px 32px -8px ${accent}88`,
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-ink translate-x-[2px]"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
            <div className="absolute left-4 bottom-4 right-4 text-white text-left">
              <div
                className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-85"
                style={{ color: accent }}
              >
                {video.client}
                {video.year ? ` · ${video.year}` : ""}
              </div>
              <div className="font-display font-medium text-[18px] md:text-[20px] leading-[1.25] mt-1">
                {video.title}
              </div>
            </div>
          </button>
        )}
      </div>

      <figcaption>
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
          {video.client}
          {video.year ? ` · ${video.year}` : ""}
        </div>
        <div className="font-display text-[18px] md:text-[20px] text-ink mt-1 leading-[1.3]">
          {video.title}
        </div>
        {video.description && (
          <p className="text-[14px] md:text-[15px] text-ink-2 leading-[1.6] mt-2 max-w-[58ch]">
            {video.description}
          </p>
        )}
      </figcaption>
    </motion.figure>
  );
}
