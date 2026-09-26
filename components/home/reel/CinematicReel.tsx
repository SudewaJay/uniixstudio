"use client";

import { useCallback, useEffect, useReducer, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import NextImage from "next/image";
import clsx from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import FilmLayer, { type LayerRole } from "./FilmLayer";
import ReelControls from "./ReelControls";
import { preconnectVimeo, reelStartMode, type StartMode } from "./network";
import type { VimeoBridge, VimeoMessage } from "./vimeo-bridge";
import { filmLabels, formatDuration, pad2, type ReelFilm } from "./types";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Must match the `reel-wipe-in` animation in globals.css. */
const WIPE_MS = 900;
/** Start buffering the next film this many seconds before the current ends. */
const PRELOAD_LEAD_S = 10;
/** Cut to the next film just before `ended`, so Vimeo's end frame never shows. */
const HANDOFF_LEAD_S = 0.35;
/** A ready player that hasn't started by now was blocked by autoplay policy. */
const BLOCKED_AFTER_MS = 4000;
/** A player that hasn't booted by now is treated as failed. */
const LOAD_TIMEOUT_MS = 15000;
/** How long a failed film's poster holds before the reel moves on. */
const FAILED_HOLD_MS = 5000;

/* ==========================================================================
   State machine

   The reducer holds facts; the status shown to the user is *derived* from
   them (see `deriveStatus`), so there's no way for the two to disagree.

     IDLE ──arm──▶ LOADING ──ready──▶ READY ──play──▶ PLAYING ⇄ PAUSED
                     │                  │                 │
                     └──timeout──▶ ERROR└─no play─▶ BLOCKED└─near end─▶ TRANSITIONING ─▶ …

   At most two players exist at once: the current film, and either the next
   one (preloading) or the incoming one (mid-wipe).
   ========================================================================== */

type PlayerFacts = { ready: boolean; playing: boolean };

type State = {
  armed: boolean;
  current: number;
  incoming: number | null;
  preload: number | null;
  players: Record<number, PlayerFacts>;
  failed: Record<number, boolean>;
  blocked: boolean;
  userPaused: boolean;
  muted: boolean;
};

type Action =
  | { type: "ARM" }
  | { type: "PLAYER"; index: number; patch: Partial<PlayerFacts> }
  | { type: "PRELOAD"; index: number }
  | { type: "GO"; index: number }
  | { type: "SETTLE" }
  | { type: "BLOCKED" }
  | { type: "FAILED"; index: number }
  | { type: "USER_PLAY" }
  | { type: "USER_PAUSE" }
  | { type: "TOGGLE_MUTE" };

export type ReelStatus =
  | "idle"
  | "loading"
  | "ready"
  | "playing"
  | "paused"
  | "transitioning"
  | "blocked"
  | "error";

const initial: State = {
  armed: false,
  current: 0,
  incoming: null,
  preload: null,
  players: {},
  failed: {},
  blocked: false,
  userPaused: false,
  muted: true,
};

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "ARM":
      return s.armed ? s : { ...s, armed: true };

    case "PLAYER": {
      const prev = s.players[a.index] ?? { ready: false, playing: false };
      const next = { ...prev, ...a.patch };
      return {
        ...s,
        players: { ...s.players, [a.index]: next },
        blocked: a.index === s.current && next.playing ? false : s.blocked,
      };
    }

    case "PRELOAD":
      if (s.preload !== null || s.incoming !== null || a.index === s.current) return s;
      return { ...s, preload: a.index };

    case "GO": {
      if (a.index === s.current || s.incoming !== null) return s;
      // Drop a preloaded player that isn't the one we're going to — keeps the
      // two-player ceiling.
      const players = { ...s.players };
      if (s.preload !== null && s.preload !== a.index) delete players[s.preload];
      return { ...s, incoming: a.index, preload: null, players, blocked: false };
    }

    case "SETTLE": {
      if (s.incoming === null) return s;
      const players = { ...s.players };
      delete players[s.current];
      return { ...s, current: s.incoming, incoming: null, players };
    }

    case "BLOCKED":
      return { ...s, blocked: true };

    case "FAILED": {
      const players = { ...s.players };
      delete players[a.index];
      return {
        ...s,
        failed: { ...s.failed, [a.index]: true },
        players,
        preload: s.preload === a.index ? null : s.preload,
      };
    }

    case "USER_PLAY":
      return { ...s, armed: true, userPaused: false, blocked: false };

    case "USER_PAUSE":
      return { ...s, userPaused: true };

    case "TOGGLE_MUTE":
      return { ...s, muted: !s.muted };
  }
}

function deriveStatus(s: State): ReelStatus {
  if (!s.armed) return "idle";
  if (s.incoming !== null) return "transitioning";
  if (s.failed[s.current]) return "error";
  const p = s.players[s.current];
  if (p?.playing) return "playing";
  if (s.blocked) return "blocked";
  if (!p?.ready) return "loading";
  return s.userPaused ? "paused" : "ready";
}

/* ========================================================================== */

export default function CinematicReel({ films }: { films: ReelFilm[] }) {
  const reduce = useReducedMotion();
  const [state, dispatch] = useReducer(reducer, initial);
  const [mode, setMode] = useState<StartMode>("manual");
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [bridgeTick, setBridgeTick] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef<HTMLOListElement>(null);
  const bridges = useRef(new Map<number, VimeoBridge>());
  /** Standby players that have buffered their opening and parked at 0:00. */
  const primed = useRef(new Set<number>());
  const stateRef = useRef(state);
  stateRef.current = state;

  const n = films.length;
  const { current, incoming } = state;
  const status = deriveStatus(state);
  const shouldPlay =
    state.armed && inView && pageVisible && !state.userPaused && !state.failed[state.current];

  const nextIndex = useCallback(
    (from: number) => {
      for (let step = 1; step <= n; step++) {
        const i = (from + step) % n;
        if (!stateRef.current.failed[i]) return i;
      }
      return null;
    },
    [n],
  );

  // --- Device capability, decided once on the client ------------------------
  useEffect(() => setMode(reelStartMode()), []);

  // --- Viewport: preconnect early, arm near, play only when properly visible --
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const warm = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        warm.disconnect();
        preconnectVimeo();
      },
      { rootMargin: "1200px 0px" },
    );

    const arm = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || mode !== "auto") return;
        arm.disconnect();
        dispatch({ type: "ARM" });
      },
      { rootMargin: "300px 0px" },
    );

    // Hysteresis: start at 35% visible, stop below 12%, so the reel doesn't
    // flicker between play and pause while the edge of the stage is on screen.
    const view = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.35) setInView(true);
        else if (e.intersectionRatio < 0.12) setInView(false);
      },
      { threshold: [0, 0.12, 0.35, 0.6] },
    );

    warm.observe(el);
    arm.observe(el);
    view.observe(el);
    return () => {
      warm.disconnect();
      arm.disconnect();
      view.disconnect();
    };
  }, [mode]);

  // --- Tab visibility --------------------------------------------------------
  useEffect(() => {
    const onVis = () => setPageVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // --- Bridge registry -------------------------------------------------------
  const register = useCallback((index: number, bridge: VimeoBridge | null) => {
    if (bridge) {
      bridges.current.set(index, bridge);
      bridge.setMuted(stateRef.current.muted);
    } else {
      bridges.current.delete(index);
      primed.current.delete(index);
    }
    setBridgeTick((t) => t + 1);
  }, []);

  // --- Player events ---------------------------------------------------------
  const onMessage = useCallback(
    (index: number, msg: VimeoMessage) => {
      const s = stateRef.current;
      switch (msg.event) {
        case "ready":
          dispatch({ type: "PLAYER", index, patch: { ready: true } });
          // Prime a standby film: a muted play pulls its opening segment into
          // the buffer, then it parks on frame one (see timeupdate below).
          if (index === s.preload) bridges.current.get(index)?.play();
          break;
        case "play":
          dispatch({ type: "PLAYER", index, patch: { ready: true, playing: true } });
          break;
        case "pause":
          dispatch({ type: "PLAYER", index, patch: { playing: false } });
          break;
        case "timeupdate": {
          if (index === s.preload && !primed.current.has(index)) {
            primed.current.add(index);
            const b = bridges.current.get(index);
            b?.pause();
            b?.seek(0);
            break;
          }
          if (index !== s.current || s.incoming !== null) break;
          const { seconds = 0, duration = 0, percent = 0 } = msg.data ?? {};
          progressRef.current?.style.setProperty("--p", String(percent));
          if (n < 2 || !duration) break;
          const remaining = duration - seconds;
          const next = nextIndex(index);
          if (next === null) break;
          if (remaining <= PRELOAD_LEAD_S) dispatch({ type: "PRELOAD", index: next });
          if (remaining <= HANDOFF_LEAD_S) dispatch({ type: "GO", index: next });
          break;
        }
        case "ended": {
          if (index !== s.current || n < 2) break;
          const next = nextIndex(index);
          if (next !== null) dispatch({ type: "GO", index: next });
          break;
        }
        case "error": {
          const d = msg.data ?? {};
          if (d.method === "play" || d.name === "NotAllowedError") dispatch({ type: "BLOCKED" });
          else dispatch({ type: "FAILED", index });
          break;
        }
      }
    },
    [n, nextIndex],
  );

  // --- Drive playback from `shouldPlay` --------------------------------------
  useEffect(() => {
    for (const i of [current, incoming]) {
      if (i === null) continue;
      const b = bridges.current.get(i);
      if (!b) continue;
      if (shouldPlay) b.play();
      else b.pause();
    }
  }, [shouldPlay, current, incoming, bridgeTick]);

  // --- Mute follows the user across films -----------------------------------
  useEffect(() => {
    bridges.current.forEach((b) => b.setMuted(state.muted));
  }, [state.muted]);

  // --- Transition: wipe, then release the outgoing player -------------------
  useEffect(() => {
    if (incoming === null) return;
    const t = window.setTimeout(() => dispatch({ type: "SETTLE" }), reduce ? 0 : WIPE_MS);
    return () => window.clearTimeout(t);
  }, [incoming, reduce]);

  // Reset the progress bar for each new film.
  useEffect(() => {
    progressRef.current?.style.setProperty("--p", "0");
  }, [current]);

  // Keep the playing film's chip in view where the index scrolls (phones).
  // Scrolls the list only — never the page — and only while the reel is seen.
  const shownIndex = incoming ?? current;
  useEffect(() => {
    const list = indexRef.current;
    if (!list || !inView || list.scrollWidth <= list.clientWidth) return;
    const chip = list.children[shownIndex] as HTMLElement | undefined;
    if (!chip) return;
    const pad = parseFloat(getComputedStyle(list).paddingLeft) || 0;
    const left =
      list.scrollLeft + chip.getBoundingClientRect().left - list.getBoundingClientRect().left - pad;
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [shownIndex, inView, reduce]);

  // --- Autoplay rejection ----------------------------------------------------
  useEffect(() => {
    if (status !== "ready" || !shouldPlay) return;
    const t = window.setTimeout(() => dispatch({ type: "BLOCKED" }), BLOCKED_AFTER_MS);
    return () => window.clearTimeout(t);
  }, [status, shouldPlay]);

  // --- Load failure ----------------------------------------------------------
  useEffect(() => {
    if (status !== "loading" || !pageVisible) return;
    const t = window.setTimeout(() => dispatch({ type: "FAILED", index: current }), LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [status, pageVisible, current]);

  // A failed film holds its poster briefly, then the reel moves on.
  useEffect(() => {
    if (status !== "error" || !shouldPlayIgnoringFailure(state, inView, pageVisible)) return;
    const next = nextIndex(current);
    if (next === null) return;
    const t = window.setTimeout(() => dispatch({ type: "GO", index: next }), FAILED_HOLD_MS);
    return () => window.clearTimeout(t);
  }, [status, state, current, inView, pageVisible, nextIndex]);

  // --- Scroll entrance: the frame opens out to the viewport edges -----------
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "start 0.35"],
  });
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [4, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [20, 0]);
  const clipPath = useTransform(
    [inset, radius],
    ([i, r]) => `inset(0 ${i}vw round ${r}px)`,
  );

  if (!n) return null;

  // --- Layers ---------------------------------------------------------------
  const layers: Array<{ index: number; role: LayerRole }> = [
    { index: state.current, role: "current" },
  ];
  if (state.incoming !== null) layers.push({ index: state.incoming, role: "incoming" });
  if (state.preload !== null) layers.push({ index: state.preload, role: "standby" });

  const hasPlayer = (i: number) =>
    state.armed && !state.failed[i] && (i === state.current || i === state.incoming || i === state.preload);

  const shown = state.incoming ?? state.current;
  const film = films[shown];
  const { name, kind } = filmLabels(film);
  const playing = status === "playing" || (status === "transitioning" && shouldPlay);
  const allFailed = films.every((_, i) => state.failed[i]);
  const showStart = status === "idle" || status === "blocked";

  const togglePlay = () => {
    if (playing) {
      dispatch({ type: "USER_PAUSE" });
      return;
    }
    dispatch({ type: "USER_PLAY" });
    // Direct call as well as the effect, so the command is issued inside the
    // click's user-activation window where browsers are strictest.
    bridges.current.get(state.current)?.play();
  };

  const goTo = (i: number) => {
    if (i === state.current && state.incoming === null) {
      if (!playing) togglePlay();
      return;
    }
    dispatch({ type: "USER_PLAY" });
    dispatch({ type: "GO", index: i });
  };

  return (
    <section
      ref={sectionRef}
      id="reel"
      aria-labelledby="reel-heading"
      className="on-dark relative overflow-hidden bg-bg-ink text-white"
    >
      {/* ------------------------------------------------------------ Intro */}
      <div className="wrap pt-[88px] pb-10 md:pt-[128px] md:pb-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,30%)] lg:items-end">
          <h2
            id="reel-heading"
            className="font-display font-medium leading-[0.9] tracking-[-0.05em] text-[clamp(52px,9.4vw,156px)] [font-variation-settings:'opsz'_144]"
          >
            <RevealLine reduce={reduce}>We make</RevealLine>
            <RevealLine reduce={reduce} delay={0.09}>
              <span className="t-italic accent-grad-text">brands move.</span>
            </RevealLine>
          </h2>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            className="lg:pb-4"
          >
            <p className="t-meta text-white/50">
              {pad2(n)} films · Direction · Edit · Motion
            </p>
            <p className="t-body mt-3 max-w-[36ch] text-white/70">
              Commercials concepted, directed and cut in-studio for the brands below.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ------------------------------------------------------------ Stage */}
      <motion.div
        ref={stageRef}
        style={{ clipPath }}
        className="reel-stage relative w-full overflow-hidden bg-bg-ink-2"
        role="region"
        aria-roledescription="video reel"
        aria-label="Uniix Studio commercial reel"
      >
        {layers.map(({ index, role }) => (
          <FilmLayer
            key={films[index].vimeoId}
            film={films[index]}
            index={index}
            role={role}
            withPlayer={hasPlayer(index)}
            loop={n < 2}
            onMessage={onMessage}
            register={register}
          />
        ))}

        {/* Legibility — top and bottom only, the middle of the frame stays clean. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,16,14,0.62) 0%, rgba(18,16,14,0) 26%, rgba(18,16,14,0) 58%, rgba(18,16,14,0.78) 100%)",
          }}
        />

        {/* Click shield — keeps stray clicks off the chrome-less player. It
            steps aside only when autoplay is blocked, so a tap can reach the
            player directly as a last resort. */}
        <div
          aria-hidden="true"
          className={clsx("absolute inset-0 z-30", status === "blocked" && "pointer-events-none")}
        />

        {/* Top rail */}
        <div className="absolute inset-x-0 top-0 z-40 flex items-start justify-between gap-6 px-[var(--gutter)] pt-5 md:pt-7">
          <p className="t-meta text-[10px] text-white/80">
            Uniix Studio <span className="mx-2 text-white/35">—</span>
            <span key={kind} className="reel-swap inline-block">
              {kind}
            </span>
          </p>
          <p className="t-meta text-[10px] tabular-nums text-white/80" aria-hidden="true">
            <span className="reel-count">
              <span key={shown} className="reel-swap inline-block">
                {pad2(shown + 1)}
              </span>
            </span>
            <span className="mx-2 text-white/35">/</span>
            {pad2(n)}
          </p>
        </div>

        {/* Start / fallback affordance */}
        {(showStart || allFailed) && (
          <div className="absolute inset-0 z-40 grid place-items-center pointer-events-none">
            {allFailed ? (
              <Link href="/showreel/" className="reel-ctl reel-ctl-lg pointer-events-auto">
                Watch the showreel <span aria-hidden="true">↗</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={togglePlay}
                className="reel-play pointer-events-auto"
                aria-label={`Play reel, starting with ${film.title}`}
              >
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M2.2 1l7 4-7 4z" />
                </svg>
                <span>Play reel</span>
              </button>
            )}
          </div>
        )}

        {/* Bottom rail */}
        <div className="absolute inset-x-0 bottom-0 z-40 px-[var(--gutter)] pb-6 md:pb-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div aria-live="polite" aria-atomic="true" className="min-w-0">
              <p className="t-meta text-[10px] text-white/70">
                {film.client}
                {film.year ? ` · ${film.year}` : ""}
                {film.duration ? ` · ${formatDuration(film.duration)}` : ""}
              </p>
              <h3
                key={film.vimeoId}
                className="reel-swap mt-2 font-display font-medium leading-[1] tracking-[-0.035em] text-[clamp(28px,4.4vw,64px)]"
              >
                {name}
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end md:gap-6">
              <ReelControls
                playing={playing}
                muted={state.muted}
                onTogglePlay={togglePlay}
                onToggleMute={() => dispatch({ type: "TOGGLE_MUTE" })}
              />
              <Link href="/portfolio/" className="reel-cta group">
                View all work <span className="cta-arrow">→</span>
              </Link>
            </div>
          </div>

          {/* Segmented progress — one segment per film. */}
          <div aria-hidden="true" className="mt-5 flex gap-1.5 md:mt-6">
            {films.map((f, i) => (
              <span key={f.vimeoId} className="relative h-[2px] flex-1 overflow-hidden bg-white/20">
                <span
                  ref={i === state.current ? progressRef : undefined}
                  className={clsx(
                    "absolute inset-0 origin-left bg-white",
                    i < state.current && "scale-x-100",
                    i > state.current && "scale-x-0",
                    i === state.current && "reel-progress",
                  )}
                />
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ------------------------------------------------------ Film index */}
      <div className="wrap pt-8 md:pt-10">
        <div className="flex items-baseline justify-between gap-6">
          <p className="t-meta text-white/45">The reel</p>
          <Link href="/showreel/" className="t-meta text-white/60 transition-colors duration-micro hover:text-white">
            Full showreel ↗
          </Link>
        </div>
        <ol
          ref={indexRef}
          className="reel-index mt-5 -mx-[var(--gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:grid md:gap-4 md:overflow-visible md:px-0 md:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]"
          style={{ ["--n" as string]: n }}
        >
          {films.map((f, i) => {
            const labels = filmLabels(f);
            const on = i === shown;
            return (
              <li key={f.vimeoId} className="w-[62vw] shrink-0 snap-start sm:w-[40vw] md:w-auto">
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={on ? "true" : undefined}
                  className={clsx("reel-chip group w-full text-left", on && "is-on")}
                >
                  <span className="relative block aspect-video overflow-hidden rounded-sm2 bg-bg-ink-2">
                    <NextImage
                      src={f.poster}
                      alt=""
                      fill
                      sizes="(min-width:1024px) 18vw, (min-width:640px) 40vw, 62vw"
                      quality={60}
                      loading="lazy"
                      className="object-cover transition-[transform,opacity] duration-reveal ease-uniix group-hover:scale-[1.05]"
                    />
                  </span>
                  <span className="mt-3 flex items-baseline gap-3">
                    <span className={clsx("t-meta tabular-nums text-[10px]", on ? "accent" : "text-white/40")}>
                      {pad2(i + 1)}
                    </span>
                    <span className="min-w-0 truncate text-[14px] font-medium tracking-[-0.01em]">
                      {labels.name}
                    </span>
                  </span>
                  <span className="mt-1 block pl-[30px] text-[12px] text-white/50">
                    {labels.kind}
                    {f.duration ? ` · ${formatDuration(f.duration)}` : ""}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* --------------------------------------------------- Chapter close */}
      <div className="wrap pt-[88px] pb-[88px] md:pt-[128px] md:pb-[120px]">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <p className="font-display font-medium leading-[0.96] tracking-[-0.045em] text-[clamp(40px,6.4vw,96px)]">
            <RevealLine reduce={reduce}>From ideas</RevealLine>
            <RevealLine reduce={reduce} delay={0.09}>
              <span className="text-white/40">to experiences.</span>
            </RevealLine>
          </p>
          <a href="#process" className="link-cta group md:pb-3">
            See how we work <span className="cta-arrow">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function shouldPlayIgnoringFailure(s: State, inView: boolean, pageVisible: boolean) {
  return s.armed && inView && pageVisible && !s.userPaused;
}

/** Masked line rise, triggered on scroll. Static under reduced motion. */
function RevealLine({
  children,
  delay = 0,
  reduce,
}: {
  children: ReactNode;
  delay?: number;
  reduce: boolean | null;
}) {
  if (reduce) return <span className="block">{children}</span>;
  // The observer watches the mask, not the line: a line parked below its mask
  // is fully clipped, so observing it directly would never report it in view.
  return (
    <motion.span
      className="block overflow-hidden pb-[0.06em]"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.6 }}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: "105%" }, shown: { y: "0%" } }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
