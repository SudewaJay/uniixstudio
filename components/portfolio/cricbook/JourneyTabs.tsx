"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import clsx from "clsx";
import { PhoneFrame } from "./Frames";
import { journey } from "./data";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * DISCOVER → CHOOSE → BOOK → PAY → PLAY. A WAI-ARIA tablist: arrow keys move
 * between stages, Home/End jump to the ends, and each panel is labelled by
 * its tab.
 */
export default function JourneyTabs() {
  const [active, setActive] = useState(0);
  const reduce = useSafeReducedMotion();
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = journey[active];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = journey.length - 1;
    let next = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      {/* Stage rail */}
      <div
        role="tablist"
        aria-label="Player journey stages"
        onKeyDown={onKey}
        className="relative grid grid-cols-5 border-y border-line"
      >
        {journey.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.key}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={clsx(
                "group relative flex flex-col items-start gap-1 py-4 md:py-6 pr-2 text-left min-h-[64px] transition-colors duration-micro",
                on ? "text-ink" : "text-ink-mute hover:text-ink",
              )}
            >
              <span className="font-mono text-[10px] tracking-[0.18em] text-brand-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display font-medium tracking-[-0.02em] text-[13px] sm:text-[17px] md:text-[clamp(18px,2vw,28px)] uppercase sm:normal-case">
                {s.key}
              </span>
              {i < journey.length - 1 && (
                <span aria-hidden="true" className="absolute right-3 top-1/2 hidden md:block text-ink-mute/50">
                  →
                </span>
              )}
            </button>
          );
        })}
        {/* Active indicator */}
        <motion.span
          aria-hidden="true"
          className="absolute -bottom-px left-0 h-[2px] bg-[#ED1C8E]"
          style={{ width: `${100 / journey.length}%` }}
          animate={{ x: `${active * 100}%` }}
          transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        />
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        tabIndex={0}
        className="mt-10 md:mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 items-center focus-visible:outline-offset-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage.key}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p className="t-meta text-ink-mute">
              Stage {String(active + 1).padStart(2, "0")} — {stage.key}
            </p>
            <h3 className="t-h3 mt-4 max-w-[22ch]">{stage.title}</h3>
            <p className="t-lead mt-4 text-ink-2 max-w-[46ch]">{stage.lead}</p>
            <ul className="mt-8 border-t border-line">
              {stage.decisions.map((d) => (
                <li key={d} className="flex gap-4 border-b border-line py-4 t-body text-ink-2">
                  <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-[#ED1C8E]" />
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <div className="relative mx-auto flex w-full max-w-[540px] items-start justify-center gap-4 sm:gap-6 rounded-[28px] bg-[#F4F3F8] px-6 py-10 sm:px-10 sm:py-14">
          <AnimatePresence mode="popLayout" initial={false}>
            {stage.screens.map((s, i) => (
              <motion.div
                key={`${stage.key}-${s.src}-${i}`}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: i === 1 ? 36 : 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: EASE, delay: reduce ? 0 : i * 0.08 }}
                className="w-1/2 max-w-[230px]"
              >
                <PhoneFrame src={s.src} alt={s.alt} sizes="(min-width:1024px) 230px, 42vw" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
