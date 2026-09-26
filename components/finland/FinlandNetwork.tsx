"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useReducedMotion } from "framer-motion";
import styles from "./finland.module.css";

type Side = "fi" | "lk";

/*
  Geometry lives in one 500×600 viewBox. The HTML nodes are positioned by the
  same numbers expressed as percentages, and the wrapper holds the same 5:6
  aspect ratio — so lines and labels stay locked together at every width
  without measuring the DOM.
*/
const W = 500;
const H = 600;
const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

const HUB = { fi: { x: 250, y: 58 }, lk: { x: 250, y: 542 } };
const CORE = { x: 250, y: 300, r: 62 };

const NODES: Record<Side, { label: string; x: number; y: number }[]> = {
  fi: [
    { label: "Client", x: 92, y: 172 },
    { label: "Strategy", x: 250, y: 162 },
    { label: "Technology", x: 408, y: 172 },
  ],
  lk: [
    { label: "Design", x: 92, y: 428 },
    { label: "Engineering", x: 250, y: 438 },
    { label: "Growth", x: 408, y: 428 },
  ],
};

const DETAIL: Record<Side, { title: string; body: string }> = {
  fi: {
    title: "Finland — local presence",
    body: "Client communication, discovery, technical consultation and architecture.",
  },
  lk: {
    title: "Sri Lanka — digital delivery",
    body: "UX/UI, branding, engineering, SEO, growth, QA and ongoing support.",
  },
};

/** Soft S-curve between two points (vertical tangents). */
function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const my = (a.y + b.y) / 2;
  return `M${a.x} ${a.y} C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
}

function sidePaths(side: Side) {
  const hub = HUB[side];
  const coreEdge = { x: CORE.x, y: side === "fi" ? CORE.y - CORE.r : CORE.y + CORE.r };
  return NODES[side].flatMap((n, i) => [
    { id: `${side}-h${i}`, d: curve(hub, n) },
    { id: `${side}-c${i}`, d: curve(n, coreEdge) },
  ]);
}

const PATHS = { fi: sidePaths("fi"), lk: sidePaths("lk") };

/**
 * Hero visual — the Finland × Sri Lanka operating model as a live diagram.
 *
 * Pure SVG + CSS; no canvas, no WebGL. The only per-frame work is six SMIL
 * `animateMotion` dots, which are omitted entirely under reduced motion.
 * Hover, focus or tap a location to isolate its layer. Until the visitor
 * interacts, the diagram gently alternates between both layers so the idea
 * reads on touch screens too — paused off-screen and under reduced motion.
 */
export default function FinlandNetwork() {
  const reduce = useReducedMotion();
  const [side, setSide] = useState<Side | null>(null);
  const [touched, setTouched] = useState(false);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Idle demo: none → FI → LK → none …
  useEffect(() => {
    if (reduce || touched || !visible) return;
    const order: (Side | null)[] = [null, "fi", "lk"];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % order.length;
      setSide(order[i]);
    }, 2800);
    return () => clearInterval(id);
  }, [reduce, touched, visible]);

  const engage = (s: Side | null) => {
    setTouched(true);
    setSide(s);
  };

  const dim = (s: Side) => side !== null && side !== s;

  return (
    <div ref={rootRef} className="relative w-full" onPointerLeave={() => touched && setSide(null)}>
      <div className="relative mx-auto w-full max-w-[520px]" style={{ aspectRatio: `${W} / ${H}` }}>
        {/* ------------------------------------------------ Lines + dots */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
          fill="none"
        >
          {/* Core rings */}
          <circle cx={CORE.x} cy={CORE.y} r={CORE.r + 26} className={styles.netRing} />
          <circle cx={CORE.x} cy={CORE.y} r={CORE.r + 54} className={clsx(styles.netRing, styles.netRingFar)} />

          {(["fi", "lk"] as Side[]).map((s) => (
            <g
              key={s}
              className={clsx(
                styles.netLayer,
                s === "fi" ? styles.netFi : styles.netLk,
                side === s && styles.netOn,
                dim(s) && styles.netDim,
              )}
            >
              {PATHS[s].map((p) => (
                <path key={p.id} id={`fin-${p.id}`} d={p.d} className={styles.netPath} />
              ))}
              {PATHS[s].map((p) => (
                <path key={`${p.id}-flow`} d={p.d} className={styles.netFlow} />
              ))}
              {!reduce &&
                PATHS[s]
                  .filter((_, i) => i % 2 === (s === "fi" ? 0 : 1))
                  .map((p, i) => (
                    <circle key={`${p.id}-dot`} r="2.6" className={styles.netDot}>
                      <animateMotion
                        dur={`${3.2 + i * 0.7}s`}
                        begin={`-${(i * 0.9).toFixed(1)}s`}
                        repeatCount="indefinite"
                        keyPoints={s === "fi" ? "0;1" : "1;0"}
                        keyTimes="0;1"
                        calcMode="linear"
                      >
                        <mpath href={`#fin-${p.id}`} />
                      </animateMotion>
                    </circle>
                  ))}
            </g>
          ))}
        </svg>

        {/* ------------------------------------------------ Location hubs */}
        {(["fi", "lk"] as Side[]).map((s) => (
          <button
            key={s}
            type="button"
            onPointerEnter={(e) => e.pointerType === "mouse" && engage(s)}
            onFocus={() => engage(s)}
            onClick={() => engage(side === s && touched ? null : s)}
            aria-pressed={side === s}
            aria-controls="fin-network-detail"
            style={pct(HUB[s].x, HUB[s].y)}
            className={clsx(
              styles.netHub,
              s === "fi" ? styles.netHubFi : styles.netHubLk,
              side === s && styles.netHubOn,
              dim(s) && "opacity-40",
            )}
          >
            <span aria-hidden="true" className={styles.netHubDot} />
            {s === "fi" ? "Finland" : "Sri Lanka"}
          </button>
        ))}

        {/* ------------------------------------------------ Capability chips */}
        {(["fi", "lk"] as Side[]).map((s) =>
          NODES[s].map((n) => (
            <span
              key={n.label}
              aria-hidden="true"
              style={pct(n.x, n.y)}
              className={clsx(
                styles.netChip,
                s === "fi" ? styles.netChipFi : styles.netChipLk,
                side === s && styles.netChipOn,
                dim(s) && "opacity-30",
              )}
            >
              {n.label}
            </span>
          )),
        )}

        {/* ------------------------------------------------ Core */}
        <div
          aria-hidden="true"
          style={{
            ...pct(CORE.x, CORE.y),
            width: `${((CORE.r * 2) / W) * 100}%`,
          }}
          className={styles.netCore}
        >
          <span className="font-display text-[clamp(15px,2.4vw,22px)] font-medium tracking-[-0.03em] text-white">
            Uniix
          </span>
        </div>
      </div>

      {/* ------------------------------------------------ Caption / detail */}
      <div
        id="fin-network-detail"
        aria-live="polite"
        className="mx-auto mt-5 flex min-h-[64px] max-w-[520px] items-start justify-between gap-6 border-t border-line-dark pt-4"
      >
        {side ? (
          <p key={side} className={clsx(styles.fadeSwap, "text-[13.5px] leading-[1.5] text-white/70")}>
            <span className={clsx("block font-medium", side === "fi" ? styles.iceText : "text-brand-2")}>
              {DETAIL[side].title}
            </span>
            {DETAIL[side].body}
          </p>
        ) : (
          <p key="core" className={clsx(styles.fadeSwap, "text-[13.5px] leading-[1.5] text-white/70")}>
            <span className="block font-medium text-white">One team. Two perspectives.</span>
            Select a location to see who does what.
          </p>
        )}
      </div>
    </div>
  );
}
