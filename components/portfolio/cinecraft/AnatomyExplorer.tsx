"use client";

import { useState } from "react";
import clsx from "clsx";
import LogoArt from "./LogoArt";
import { anatomyParts, type AnatomyPartId } from "./data";

const LINE = "#A88A45";
const LABEL = "#5C554D";

/** Dimension line with end ticks, in artwork units. */
function Dim({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g>
      <line x1={x1} x2={x2} y1={y} y2={y} stroke={LINE} strokeWidth={1.5} />
      <line x1={x1} x2={x1} y1={y - 8} y2={y + 8} stroke={LINE} strokeWidth={1.5} />
      <line x1={x2} x2={x2} y1={y - 8} y2={y + 8} stroke={LINE} strokeWidth={1.5} />
      <text x={(x1 + x2) / 2} y={y - 14} textAnchor="middle" fontSize={20} fill={LABEL} className="font-mono">
        {label}
      </text>
    </g>
  );
}

/** Vertical bracket on the right, marking one tier's height. */
function Tier({ y1, y2, label }: { y1: number; y2: number; label: string }) {
  const x = 784;
  return (
    <g>
      <path d={`M${x - 10} ${y1} H${x} V${y2} H${x - 10}`} fill="none" stroke={LINE} strokeWidth={1.5} />
      <text x={x + 12} y={(y1 + y2) / 2 + 7} fontSize={20} fill={LABEL} className="font-mono">
        {label}
      </text>
    </g>
  );
}

function Annotations({ part }: { part: AnatomyPartId }) {
  switch (part) {
    case "all":
      return (
        <g>
          <Tier y1={0} y2={248.4} label="248.4" />
          <Tier y1={301.2} y2={381.9} label="80.7" />
          <Tier y1={404.6} y2={453} label="48.4" />
        </g>
      );
    case "cs":
      return <Dim x1={157.9} x2={265.7} y={-30} label="offset 107.8" />;
    case "m":
      return (
        <g>
          <rect x={340} y={20} width={62} height={196} rx={6} fill="none" stroke={LINE} strokeWidth={1.5} strokeDasharray="6 6" />
          <text x={371} y={-24} textAnchor="middle" fontSize={20} fill={LABEL} className="font-mono">
            stem inside the C
          </text>
        </g>
      );
    case "wordmark":
      return (
        <g>
          <Dim x1={157.9} x2={589.6} y={-30} label="monogram 431.7" />
          <Dim x1={0} x2={751.8} y={282} label="wordmark 751.8" />
        </g>
      );
    case "media":
      return (
        <g>
          <line x1={157.9} x2={157.9} y1={-40} y2={470} stroke={LINE} strokeWidth={1.5} strokeDasharray="6 6" />
          <line x1={589.6} x2={589.6} y1={-40} y2={470} stroke={LINE} strokeWidth={1.5} strokeDasharray="6 6" />
          <text x={150} y={445} textAnchor="end" fontSize={20} fill={LABEL} className="font-mono">
            Δ 0.15
          </text>
        </g>
      );
  }
}

/**
 * Interactive anatomy of the lock-up. Each button isolates a part of the
 * original vector artwork and overlays measurements taken from the file.
 */
export default function AnatomyExplorer() {
  const [part, setPart] = useState<AnatomyPartId>("all");
  const active = anatomyParts.find((p) => p.id === part) ?? anatomyParts[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-14 lg:items-center">
      <div className="relative rounded-[28px] bg-white ring-1 ring-line px-[4%] py-[6%]">
        <LogoArt
          id="cc-anatomy"
          highlight={part}
          viewBox="-30 -70 910 560"
          title={`Cinecraft Media logo anatomy: ${active.label} highlighted`}
          className="block w-full h-auto"
        >
          <Annotations part={part} />
        </LogoArt>
      </div>

      <div>
        <div role="group" aria-label="Highlight part of the logo" className="flex flex-wrap gap-2">
          {anatomyParts.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={part === p.id}
              onClick={() => setPart(p.id)}
              className={clsx(
                "min-h-[44px] rounded-full border px-4 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-micro",
                part === p.id
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-transparent text-ink-2 hover:border-ink",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div aria-live="polite" className="mt-8 border-t border-line pt-6">
          <h3 className="t-h3 text-ink">{active.title}</h3>
          <p className="t-body mt-3 text-ink-2 max-w-[46ch]">{active.body}</p>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
          Measurements in source units · 752 × 453 vector master
        </p>
      </div>
    </div>
  );
}
