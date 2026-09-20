"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/Reveal";

type Props = {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
};

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Legacy System",
  afterLabel = "Uniix Studio Redesign",
  title = "Transformation Comparison",
  description = "Drag the slider to compare the legacy baseline against the newly deployed experience.",
}: Props) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPos(percentage);
    },
    [],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    },
    [isDragging, handleMove],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    },
    [isDragging, handleMove],
  );

  const handleStopDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleStopDrag);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleStopDrag);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleStopDrag);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleStopDrag);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleStopDrag]);

  return (
    <section className="py-20 md:py-32 bg-bg-warm/60 border-b border-line">
      <div className="wrap">
        <div className="max-w-[800px] mb-12">
          <Reveal>
            <span className="eyebrow text-brand-ink">Evolutionary Shift</span>
            <h2 className="t-h2 mt-4 text-[clamp(30px,3.8vw,52px)]">{title}</h2>
            {description && (
              <p className="t-lead mt-4 text-ink-2">{description}</p>
            )}
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:rounded-3xl border border-line select-none shadow-lift cursor-ew-resize"
          >
            {/* After Image (Full Base) */}
            <div className="absolute inset-0">
              <SmartImage src={afterImage} alt={afterLabel} sizes="100vw" />
              <div className="absolute bottom-5 right-5 px-3 py-1.5 rounded-full bg-black/70 text-white backdrop-blur-md font-mono text-[11px] tracking-[0.16em] uppercase">
                {afterLabel}
              </div>
            </div>

            {/* Before Image (Clipped Overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <SmartImage src={beforeImage} alt={beforeLabel} sizes="100vw" />
              <div className="absolute bottom-5 left-5 px-3 py-1.5 rounded-full bg-black/70 text-white backdrop-blur-md font-mono text-[11px] tracking-[0.16em] uppercase">
                {beforeLabel}
              </div>
            </div>

            {/* Divider Handle Line */}
            <div
              aria-hidden="true"
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-ink shadow-lift flex items-center justify-center border border-black/10">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="15 18 9 12 15 6" />
                  <polyline points="9 18 3 12 9 6" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
