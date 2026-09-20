"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";

export type ReelFilm = {
  vimeoId: string;
  title: string;
  client: string;
  poster: string;
};

/** How long each poster holds before cross-fading to the next. */
const HOLD_MS = 4200;

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/**
 * Decide whether this device should stream the background film at all.
 *
 * A hero background video is a luxury, not content — so it only loads where it
 * is genuinely free. Everywhere else the poster montage *is* the hero, and it
 * looks intentional rather than degraded.
 */
function shouldStream(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Phones pay the most for autoplay video (data, battery, thermals) and see
  // the least of a 16:9 frame behind a portrait layout.
  if (!window.matchMedia("(min-width: 768px)").matches) return false;
  const net = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (net?.saveData) return false;
  if (net?.effectiveType && /(^|-)2g$/.test(net.effectiveType)) return false;
  return true;
}

/**
 * Full-bleed hero background.
 *
 * Two layers, deliberately ordered:
 *
 *   1. A cross-fading montage of real poster frames. Ships in the HTML, is
 *      optimised by next/image, and carries the whole hero on mobile, on
 *      reduced-motion, on save-data, and for the first moment everywhere else.
 *      Only the first frame is `priority` — it is the LCP candidate.
 *
 *   2. The Vimeo film, in Vimeo's official `background=1` player mode (no
 *      chrome, no controls, muted, looping). It is mounted only after the page
 *      is idle AND the hero is on screen AND `shouldStream()` passes, then
 *      cross-faded in over the montage. It is never in the critical path, so it
 *      cannot affect LCP.
 *
 * `dnt=1` suppresses Vimeo's tracking cookies, which keeps the embed out of
 * consent-banner territory.
 */
export default function HeroShowreel({ films }: { films: ReelFilm[] }) {
  const [index, setIndex] = useState(0);
  const [montageReady, setMontageReady] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const featured = films[0];

  /**
   * Defer every poster but the first.
   *
   * They are absolutely positioned across the viewport, so `loading="lazy"`
   * does not hold them back — the browser sees them as in-view and fetches all
   * five during first paint. On mobile, where the montage *is* the hero, that
   * is four images of pure competition with LCP. Mounting them one tick after
   * the first paint costs nothing visually (the first hold is 4.2s) and takes
   * the hero's initial cost down to a single image.
   */
  useEffect(() => {
    const id = window.setTimeout(() => setMontageReady(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  // --- Poster montage ------------------------------------------------------
  // Runs only while the film is not yet covering it, and pauses when the hero
  // scrolls away so we are not repainting off-screen.
  useEffect(() => {
    if (films.length < 2 || playerReady) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = window.setInterval(
            () => setIndex((i) => (i + 1) % films.length),
            HOLD_MS,
          );
        } else if (timer) {
          window.clearInterval(timer);
          timer = undefined;
        }
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) window.clearInterval(timer);
    };
  }, [films.length, playerReady]);

  // --- Film: idle + in-view + capable device -------------------------------
  useEffect(() => {
    if (!featured || !shouldStream()) return;
    const el = rootRef.current;
    if (!el) return;

    let idleId: number | undefined;
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = () => {
          // Warm the connection only once we have committed to loading.
          const link = document.createElement("link");
          link.rel = "preconnect";
          link.href = "https://player.vimeo.com";
          document.head.appendChild(link);
          setStreaming(true);
        };
        idleId = w.requestIdleCallback
          ? w.requestIdleCallback(start, { timeout: 2500 })
          : window.setTimeout(start, 900);
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (idleId !== undefined) {
        if (w.cancelIdleCallback) w.cancelIdleCallback(idleId);
        else clearTimeout(idleId);
      }
    };
  }, [featured]);

  if (!featured) return null;

  return (
    <div ref={rootRef} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {/* 1 — poster montage */}
      {(montageReady ? films : films.slice(0, 1)).map((film, i) => (
        <NextImage
          key={film.vimeoId}
          src={film.poster}
          alt=""
          fill
          priority={i === 0}
          loading={i === 0 ? undefined : "lazy"}
          sizes="100vw"
          quality={70}
          className="object-cover transition-opacity duration-[1200ms] ease-uniix"
          style={{ opacity: i === index && !playerReady ? 1 : 0 }}
        />
      ))}

      {/* 2 — the film itself */}
      {streaming && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-[1200ms] ease-uniix"
          style={{
            // Cover a 16:9 frame across any viewport shape without distortion.
            width: "max(100vw, calc(100svh * 16 / 9))",
            height: "max(100svh, calc(100vw * 9 / 16))",
            opacity: playerReady ? 1 : 0,
          }}
        >
          <iframe
            src={`https://player.vimeo.com/video/${featured.vimeoId}?background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1`}
            title={`${featured.title} — background showreel`}
            tabIndex={-1}
            allow="autoplay; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setPlayerReady(true)}
            className="h-full w-full border-0"
          />
        </div>
      )}

      {/*
        Contrast floor. A uniform 82% ink wash guarantees the headline's
        contrast no matter what frame is on screen — against pure-white footage
        the backdrop still lands near #2E2A26, so white text holds ~13:1. The
        gradient on top only adds editorial depth; it never carries the
        legibility.
      */}
      <div className="absolute inset-0 bg-[rgba(14,11,8,0.82)]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(14,11,8,0.55) 0%, rgba(14,11,8,0.22) 52%, rgba(14,11,8,0.50) 100%), radial-gradient(120% 80% at 50% 120%, rgba(191,69,8,0.20), transparent 62%)",
        }}
      />
      {/* Hand off into the next section rather than stopping at a hard edge. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg-ink" />
    </div>
  );
}
