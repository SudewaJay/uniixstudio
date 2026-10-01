"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { PhoneFrame } from "./Frames";
import { bookingSequence } from "./data";

function Step({ s }: { s: (typeof bookingSequence)[number] }) {
  return (
    <>
      <PhoneFrame
        src={s.src}
        alt={`Step ${s.n}, ${s.title}: ${s.body}`}
        sizes="(min-width:1024px) 250px, 62vw"
      />
      <div className="mt-6">
        <p className="font-mono text-[11px] tracking-[0.18em] text-[#22E0A0]">{s.n}</p>
        <h3 className="mt-2 font-display text-[20px] md:text-[22px] font-medium tracking-[-0.02em] text-white">
          {s.title}
        </h3>
        <p className="mt-2 text-[14px] leading-[1.55] text-white/65 max-w-[26ch]">{s.body}</p>
      </div>
    </>
  );
}

/**
 * Desktop: the section pins and the eight screens travel horizontally with the
 * page scroll. Touch widths and reduced-motion get a native scroll-snap row —
 * scroll-jacking fights a thumb, and it's inaccessible without a pointer.
 */
export default function BookingSequence() {
  const reduce = useSafeReducedMotion();
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const pinned = desktop && !reduce;

  // Measure the travel distance once the pinned track is in the DOM.
  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);

  return (
    <div ref={pin} className="relative" style={pinned ? { height: `calc(100svh - var(--header-h) + ${distance}px)` } : undefined}>
      {pinned ? (
        <>
          <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] flex-col justify-center overflow-hidden">
            <motion.ol
              ref={track}
              style={{ x }}
              className="flex w-max gap-14 pl-[max(var(--gutter),calc((100vw_-_var(--container))/2_+_var(--gutter)))] pr-[12vw]"
            >
              {bookingSequence.map((s) => (
                <motion.li
                  key={s.n}
                  className="w-[250px] flex-none"
                  initial={{ opacity: 0.25, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ amount: 0.6, margin: "0px -10% 0px -10%" }}
                  transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <Step s={s} />
                </motion.li>
              ))}
            </motion.ol>
            {/* Progress */}
            <div aria-hidden="true" className="wrap mt-10">
              <div className="h-px w-full bg-white/15 overflow-hidden">
                <motion.span className="block h-full origin-left bg-[#22E0A0]" style={{ scaleX: smooth }} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="relative">
          <ol
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pl-[var(--gutter)] pr-[var(--gutter)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollPaddingInline: "var(--gutter)" }}
            aria-label="Booking steps — scroll horizontally"
            tabIndex={0}
          >
            {bookingSequence.map((s) => (
              <li key={s.n} className="w-[62vw] max-w-[250px] flex-none snap-start">
                <Step s={s} />
              </li>
            ))}
          </ol>
          <p className="wrap mt-2 font-mono text-[10px] tracking-[0.18em] uppercase text-white/45" aria-hidden="true">
            Swipe · 8 steps →
          </p>
        </div>
      )}
    </div>
  );
}
