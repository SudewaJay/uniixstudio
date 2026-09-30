"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "@/lib/use-safe-reduced-motion";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { CB, img } from "./data";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Hero. The type is CSS-animated (`mask-line` / `rise-in`) so the first paint
 * never waits on hydration; framer-motion only drives the stage parallax.
 */
export default function CricBookHero() {
  const reduce = useSafeReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "end start"] });

  const browserY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const phoneAY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [110, -90]);
  const phoneBY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [150, -120]);
  const chipY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70]);
  const markRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-8, 10]);

  return (
    <section className="relative bg-bg pt-28 md:pt-36 overflow-hidden" aria-labelledby="cricbook-title">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line">
          <Link
            href="/portfolio/"
            className="inline-flex items-center gap-2 min-h-[44px] font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute hover:text-brand-ink transition-colors duration-micro"
          >
            <span className="text-brand-ink" aria-hidden="true">←</span> All work
          </Link>
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
            Flagship case study <span className="opacity-40 mx-1.5">·</span>
            <span className="text-brand-ink">2026</span>
          </p>
        </div>

        <div className="mt-10 md:mt-16 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="eyebrow rise-in">Digital product · Sports booking platform</p>
            <h1 id="cricbook-title" className="t-display mt-6 text-[clamp(56px,11vw,168px)] !leading-[0.86]">
              <span className="mask-line">
                <span>CricBook</span>
              </span>
            </h1>
          </div>
          <div className="lg:pb-4">
            <p
              className="rise-in t-h3 text-ink max-w-[22ch] text-[clamp(24px,2.5vw,36px)]"
              style={{ animationDelay: "140ms" }}
            >
              Building Sri Lanka&apos;s digital sports booking experience.
            </p>
            <ul
              className="rise-in mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute"
              style={{ animationDelay: "240ms" }}
              aria-label="Disciplines"
            >
              {["Branding", "Product Design", "Web", "Technology", "Growth"].map((d, i) => (
                <li key={d} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="text-brand-ink">·</span>}
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Stage */}
      <div className="wrap-wide mt-12 md:mt-16">
        <motion.div
          ref={stage}
          initial={reduce ? false : { clipPath: "inset(8% 6% 0% 6% round 32px)" }}
          animate={reduce ? undefined : { clipPath: "inset(0% 0% 0% 0% round 32px)" }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
          className="relative overflow-hidden rounded-[20px] md:rounded-[32px]"
          style={{ background: `radial-gradient(90% 70% at 70% 10%, #3A2FA0 0%, ${CB.indigo} 45%, ${CB.indigoDeep} 100%)` }}
        >
          {/* Brand spark, oversized and drifting */}
          <motion.img
            src={img.brand.spark}
            alt=""
            aria-hidden="true"
            style={{ rotate: markRotate }}
            className="pointer-events-none absolute -right-[8%] -top-[18%] w-[46%] max-w-[620px] opacity-[.16]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(70% 60% at 50% 40%, #000 20%, transparent 80%)",
            }}
          />

          <div className="relative px-4 sm:px-8 md:px-14 lg:px-20 pt-10 sm:pt-14 md:pt-20 pb-16 md:pb-24">
            <div className="relative mx-auto max-w-[1180px]">
              <motion.div style={{ y: browserY }} className="relative lg:w-[82%]">
                <BrowserFrame
                  src={img.web.home}
                  alt="CricBook homepage — Book the court. Not the phone call."
                  url="cricbook.lk"
                  sizes="(min-width:1280px) 980px, (min-width:1024px) 80vw, 94vw"
                  priority
                  tone="dark"
                />
              </motion.div>

              {/* Phones — desktop composition */}
              <motion.div
                style={{ y: phoneAY }}
                className="absolute right-[13%] top-[18%] hidden lg:block w-[20%] max-w-[230px]"
              >
                <PhoneFrame
                  src={img.app.slots}
                  alt="CricBook slot selection screen"
                  sizes="230px"
                  priority
                />
              </motion.div>
              <motion.div
                style={{ y: phoneBY }}
                className="absolute right-0 top-[34%] hidden lg:block w-[20%] max-w-[230px]"
              >
                <PhoneFrame
                  src={img.app.confirmed}
                  alt="CricBook booking confirmation screen with booking reference"
                  sizes="230px"
                  priority
                />
              </motion.div>

              {/* Phone — mobile/tablet composition */}
              <div className="lg:hidden absolute -bottom-12 right-3 sm:right-8 w-[24%] max-w-[180px]">
                <PhoneFrame src={img.app.confirmed} alt="" sizes="24vw" />
              </div>

              {/* Floating UI */}
              <motion.div
                style={{ y: chipY }}
                className="hidden md:flex absolute left-[-2%] lg:left-[-3%] bottom-[-6%] items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: CB.mint }} aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="#06302A" strokeWidth="2.6">
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="block font-mono text-[10px] tracking-[0.16em] uppercase text-ink-mute">Live per-court</span>
                  <span className="block text-[14px] font-medium text-ink">Slot held while you pay</span>
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
