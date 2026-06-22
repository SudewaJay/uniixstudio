"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * testimonial-03 layout — a horizontal carousel of alternating cards:
 *  - text cards: quote glyph → quote → avatar / name / role
 *  - video cards: full-bleed portrait → name / role → play button (plays inline)
 *
 * `videoUrl`/`poster` are optional per item. When present the card renders as a
 * video card; otherwise it renders as a text card. With text-only data every
 * card is a text card and the video path is ready for client clips later.
 */
type Testimonial = {
  quote: string;
  headline?: string;
  name: string;
  role: string;
  initial: string;
  project?: string;
  year?: string;
  videoUrl?: string;
  poster?: string;
};

const items = testimonials as readonly Testimonial[];

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function Author({ initial, name, role }: { initial: string; name: string; role: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-grad font-display text-[15px] font-semibold text-white ring-2 ring-white/15">
        {initial}
      </div>
      <div>
        <p className="text-[15px] font-semibold text-white">{name}</p>
        <p className="text-[12px] text-white/55">{role}</p>
      </div>
    </div>
  );
}

function TextCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-8 rounded-lg2 border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm">
      <div className="flex flex-col gap-6">
        <span
          className="font-display leading-none text-brand-3"
          style={{ fontSize: "56px" }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        {t.headline && (
          <p className="font-display text-[19px] font-medium leading-snug text-white">
            {t.headline}
          </p>
        )}
        <blockquote className="text-[16px] leading-[1.6] text-white/75">
          {t.quote}
        </blockquote>
      </div>
      <figcaption>
        <Author initial={t.initial} name={t.name} role={t.role} />
      </figcaption>
    </figure>
  );
}

function VideoCard({ t }: { t: Testimonial }) {
  const [playing, setPlaying] = useState(false);
  const poster = t.poster;

  if (playing && t.videoUrl) {
    return (
      <div className="relative h-full overflow-hidden rounded-lg2 border border-white/10">
        <video
          src={t.videoUrl}
          poster={poster}
          controls
          autoPlay
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video testimonial from ${t.name}`}
      className="group relative block h-full overflow-hidden rounded-lg2 border border-white/10 text-left"
    >
      {poster ? (
        <Image
          src={poster}
          alt={`Video testimonial from ${t.name}`}
          fill
          sizes="(min-width:1024px) 33vw, 80vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-brand-grad opacity-90" aria-hidden="true" />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,20,16,0.10) 0%, rgba(26,20,16,0.75) 100%)",
        }}
        aria-hidden="true"
      />
      <span className="absolute right-5 top-5 grid size-14 place-items-center rounded-full bg-brand-grad text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
        <PlayGlyph />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-[16px] font-semibold text-white">{t.name}</p>
        <p className="text-[13px] text-white/70">{t.role}</p>
      </div>
    </button>
  );
}

function ArrowButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous testimonials" : "Next testimonials"}
      className="grid size-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-brand-4 hover:text-white"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dir === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  const scrollByCard = (dir: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth * 0.8;
    track.scrollBy({ left: dir === "prev" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      {/* Brand glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(45% 50% at 80% 15%, rgba(232,98,26,0.20), transparent 70%), radial-gradient(40% 50% at 10% 90%, rgba(248,200,74,0.10), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 grid items-end gap-8 md:mb-16 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <span className="eyebrow text-brand-3">Client stories</span>
            <h2 className="display mt-4 text-white" style={{ fontSize: "clamp(40px,5.5vw,72px)" }}>
              What our clients
              <br />
              <span className="italic-display gradient-text">actually say.</span>
            </h2>
          </Reveal>
          {items.length > 1 && (
            <Reveal delay={1}>
              <div className="flex gap-3">
                <ArrowButton dir="prev" onClick={() => scrollByCard("prev")} />
                <ArrowButton dir="next" onClick={() => scrollByCard("next")} />
              </div>
            </Reveal>
          )}
        </div>

        {/* Carousel */}
        <Reveal>
          <div
            ref={trackRef}
            className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-4 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((t) => (
              <div
                key={t.name}
                className="w-[82%] shrink-0 snap-start sm:w-[60%] lg:w-[calc((100%-3rem)/3)]"
              >
                {t.videoUrl ? <VideoCard t={t} /> : <TextCard t={t} />}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
