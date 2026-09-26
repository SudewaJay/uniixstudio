"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SmartImage from "../ui/SmartImage";
import { finlandImages, finlandJourney } from "@/lib/finland";
import styles from "./finland.module.css";

export type JourneyScreen = { src: string; title: string; slug: string };

/** Clip-path wipe for layer i (1-based after the base layer). */
function useWipe(p: MotionValue<number>, from: number, to: number) {
  return useTransform(p, [from, to], ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"], { clamp: true });
}

/**
 * Outside → Inside → Screen. The page's signature interaction.
 *
 * A pinned frame (the section is ~280vh tall, nothing is scroll-jacked — the
 * page scrolls normally) in which a snowy path is wiped away by a warm
 * interior, which is in turn wiped by real Uniix work on screen: nature →
 * human → technology. Two clip-path transforms driven by scroll progress.
 *
 * Reduced motion: no pin, three stacked frames.
 */
export default function FinlandJourney({ screen }: { screen: JourneyScreen }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const wipe1 = useWipe(scrollYProgress, 0.22, 0.42);
  const wipe2 = useWipe(scrollYProgress, 0.6, 0.8);
  const drift = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => setStage(v < 0.32 ? 0 : v < 0.7 ? 1 : 2));

  const layers = [
    { img: finlandImages.snowWalk, cls: styles.photoCold },
    { img: finlandImages.warmTable, cls: styles.photoWarm },
  ];

  if (reduce) {
    return (
      <section aria-labelledby="fi-journey-heading" className="on-dark section bg-bg-ink text-white">
        <div className="wrap">
          <Heading />
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {finlandJourney.map((j, i) => (
              <li key={j.key}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg2">
                  {i < 2 ? (
                    <SmartImage src={layers[i].img.src} alt={layers[i].img.alt} sizes="(min-width:768px) 30vw, 92vw" position={layers[i].img.position} />
                  ) : (
                    <SmartImage src={screen.src} alt={`${screen.title} — case study`} sizes="(min-width:768px) 30vw, 92vw" />
                  )}
                </div>
                <p className="t-meta mt-4 text-[10px] text-white/60">0{i + 1} · {j.label}</p>
                <p className="mt-2 text-[15px] text-white/80">{j.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="fi-journey-heading" className="on-dark relative bg-bg-ink text-white">
      <div ref={ref} className="relative h-[280vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* ---------------------------------------- Frames */}
          <motion.div aria-hidden="true" className="absolute inset-0" style={{ scale: drift }}>
            <SmartImage
              src={layers[0].img.src}
              alt=""
              sizes="100vw"
              quality={62}
              position={layers[0].img.position}
              className={layers[0].cls}
            />
          </motion.div>
          <motion.div aria-hidden="true" className="absolute inset-0" style={{ clipPath: wipe1 }}>
            <SmartImage
              src={layers[1].img.src}
              alt=""
              sizes="100vw"
              quality={62}
              position={layers[1].img.position}
              className={layers[1].cls}
            />
          </motion.div>
          <motion.div className="absolute inset-0 bg-bg-ink" style={{ clipPath: wipe2 }}>
            <div className="absolute inset-0 grid place-items-center p-[6vw] pt-[18vh] md:pt-[6vw]">
              <Link
                href={`/portfolio/${screen.slug}/`}
                tabIndex={stage === 2 ? undefined : -1}
                className="group relative block aspect-[16/10] w-full max-w-[1100px] overflow-hidden rounded-xl2 shadow-lift ring-1 ring-white/10"
              >
                <SmartImage src={screen.src} alt={`${screen.title} — case study`} sizes="(min-width:1024px) 1100px, 90vw" />
                <span className="absolute bottom-4 right-4 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-ink transition-transform duration-std ease-uniix group-hover:-translate-y-0.5">
                  {screen.title} — view case study ↗
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Adaptive overlay so type stays legible on every frame. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(18,16,14,0.88) 0%, rgba(18,16,14,0.55) 26%, rgba(18,16,14,0) 52%, rgba(18,16,14,0.78) 100%)",
            }}
          />
          <div aria-hidden="true" className={clsx(styles.grain, "pointer-events-none absolute inset-0")} />

          {/* ---------------------------------------- Type */}
          <div className="pointer-events-none absolute inset-x-0 top-0 pt-[calc(var(--header-h)+24px)]">
            <div className="wrap">
              <Heading />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-8 md:pb-12">
            <div className="wrap flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <p aria-live="polite" className="min-h-[3em] max-w-[36ch] text-[clamp(16px,1.4vw,19px)] leading-[1.45] text-white/90">
                <span key={stage} className={clsx(styles.fadeSwap, "block")}>{finlandJourney[stage].line}</span>
              </p>
              <ol className="flex items-center gap-3" aria-label="Story stages">
                {finlandJourney.map((j, i) => (
                  <li key={j.key} className="flex items-center gap-3">
                    <span
                      aria-current={i === stage ? "step" : undefined}
                      className={clsx(
                        "t-meta text-[10px] transition-colors duration-std ease-uniix",
                        i === stage ? "text-white" : "text-white/45",
                      )}
                    >
                      {j.label}
                    </span>
                    {i < finlandJourney.length - 1 && (
                      <span aria-hidden="true" className="h-px w-6 bg-white/30 md:w-10" />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Heading() {
  return (
    <>
      <span className="eyebrow">Outside · Inside · On screen</span>
      <h2 id="fi-journey-heading" className="t-h2 mt-4 max-w-[16ch] text-[clamp(30px,4vw,54px)]">
        The best digital experiences{" "}
        <span className="t-italic accent-grad-text">still begin with people.</span>
      </h2>
    </>
  );
}
