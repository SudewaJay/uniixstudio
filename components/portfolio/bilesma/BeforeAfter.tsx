"use client";

import { useState } from "react";
import SmartImage from "@/components/ui/SmartImage";

/**
 * Drag-to-compare frame. A native range input sits over the whole stage, so
 * it works with mouse, touch and keyboard (arrow keys) without custom
 * pointer handling, and screen readers announce the split as a percentage.
 */
export default function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[28px] bg-white ring-1 ring-line select-none">
      {/* After: full frame */}
      <div className="absolute inset-0">
        <SmartImage src={after} alt={afterAlt} sizes="(min-width:1024px) 52vw, 94vw" fit="contain" />
      </div>

      {/* Before: clipped to the left of the handle. Both sources share one canvas, so the bags overlap exactly. */}
      <div className="absolute inset-0 bg-white" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <SmartImage src={before} alt={beforeAlt} sizes="(min-width:1024px) 52vw, 94vw" fit="contain" />
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare the old kraft bag with the new botanical bag"
        aria-valuetext={`${pos}% old bag, ${100 - pos}% new bag`}
        className="peer absolute inset-0 z-0 h-full w-full cursor-ew-resize opacity-0"
      />

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-[#7A5A3A] px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#6A9670] px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-white">
        After
      </span>

      {/* Handle */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-px bg-ink/70 [&>span]:ring-brand-ink [&>span]:ring-offset-2 peer-focus-visible:[&>span]:ring-2" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-white shadow-lift">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
