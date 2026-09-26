import Link from "next/link";
import clsx from "clsx";
import FinlandNetwork from "./FinlandNetwork";
import Snowfall from "./Snowfall";
import SmartImage from "../ui/SmartImage";
import { finlandImages } from "@/lib/finland";
import LocalClock from "./LocalClock";
import { finlandModel } from "@/lib/finland";
import styles from "./finland.module.css";

/**
 * 01 — Hero.
 *
 * Server-rendered copy with the site's CSS-only entrance (mask-line /
 * rise-in), so the headline — the LCP element — never waits on JavaScript.
 * The diagram is the only client island, and it reserves its box with a fixed
 * aspect ratio so nothing shifts when it hydrates.
 */
export default function FinlandHero() {
  const { finland, sriLanka } = finlandModel;

  return (
    <section
      data-nav-invert
      aria-labelledby="fi-hero-heading"
      className="on-dark relative isolate overflow-hidden bg-bg-ink text-white"
    >
      {/*
        Atmosphere: an early-morning misty forest behind everything, drifting
        almost imperceptibly (CSS scale over 40s). Heavy ink overlays keep it a
        mood, not a photograph — the headline stays the hero. On top: the quiet
        engineering grid, one cool and one warm light, and a few flakes.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
        <div className={clsx(styles.kenBurns, "absolute inset-0")}>
          <SmartImage
            src={finlandImages.heroForest.src}
            alt=""
            sizes="100vw"
            priority
            quality={60}
            position="center 35%"
            className={styles.photoCold}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(18,16,14,0.94) 0%, rgba(18,16,14,0.78) 42%, rgba(18,16,14,0.45) 100%), linear-gradient(180deg, rgba(18,16,14,0.55) 0%, rgba(18,16,14,0.1) 40%, rgba(18,16,14,0.92) 100%)",
          }}
        />
        <div className={clsx(styles.grain, "absolute inset-0")} />
      </div>
      <div aria-hidden="true" className={clsx(styles.grid, "absolute inset-0 -z-10 opacity-50")} />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(40% 36% at 78% 18%, rgba(169,195,217,0.14), transparent 70%), radial-gradient(44% 40% at 80% 92%, rgba(232,98,26,0.16), transparent 70%)",
        }}
      />
      <Snowfall count={18} className="-z-10" />

      <div className="h-[104px]" aria-hidden="true" />

      <div className="wrap grid items-center gap-14 pb-16 pt-8 md:pb-24 lg:min-h-[calc(100svh-104px)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-10 lg:pb-20 lg:pt-4">
        {/* ------------------------------------------------ Copy */}
        <div>
          <p className="rise-in flex flex-wrap items-center gap-x-4 gap-y-2 t-meta text-white/60">
            <span className="eyebrow !text-white/70">Uniix Studio · Finland</span>
            <span className="inline-flex items-center gap-3 text-white/55">
              <span>
                <span className={styles.iceText}>{finland.code}</span>{" "}
                <LocalClock timeZone={finland.timeZone} />
              </span>
              <span aria-hidden="true" className="opacity-40">/</span>
              <span>
                <span className="text-brand-2">{sriLanka.code}</span>{" "}
                <LocalClock timeZone={sriLanka.timeZone} />
              </span>
            </span>
          </p>

          <h1
            id="fi-hero-heading"
            className="t-display mt-7 text-[clamp(40px,5.6vw,84px)] leading-[0.95] tracking-[-0.052em]"
          >
            <span className="mask-line">
              <span style={{ animationDelay: "80ms" }}>Digital experiences</span>
            </span>
            <span className="mask-line">
              <span style={{ animationDelay: "180ms" }}>built for ambitious</span>
            </span>
            <span className="mask-line pb-[0.08em]">
              <span style={{ animationDelay: "280ms" }} className="t-italic accent-grad-text">
                Finnish businesses.
              </span>
            </span>
          </h1>

          <p
            className="rise-in t-lead mt-7 max-w-[50ch] text-white/75"
            style={{ animationDelay: "420ms" }}
          >
            Strategy, design, technology and growth — delivered by one
            international team with local technical presence in Finland.
          </p>

          <div
            className="rise-in mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "520ms" }}
          >
            <Link href="/contact/" className="btn btn-light group">
              Start a project <span className="cta-arrow">↗</span>
            </Link>
            <Link href="#work" className="btn btn-outline-light">
              Explore our work
            </Link>
          </div>

          {/* Three facts a visitor should grasp in the first seconds. */}
          <ul
            className="rise-in mt-12 grid max-w-[560px] grid-cols-1 gap-px overflow-hidden rounded-sm2 border border-line-dark bg-line-dark sm:grid-cols-3"
            style={{ animationDelay: "640ms" }}
          >
            {[
              { k: "Finland", v: "Technical presence", tone: styles.iceText },
              { k: "Sri Lanka", v: "Delivery team", tone: "text-brand-2" },
              { k: "One team", v: "Design + engineering", tone: "text-white" },
            ].map((f) => (
              <li key={f.k} className="bg-bg-ink px-4 py-3.5">
                <span className={clsx("t-meta block text-[10px]", f.tone)}>{f.k}</span>
                <span className="mt-1 block text-[14px] font-medium text-white/85">{f.v}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------ Diagram */}
        <div className="rise-in" style={{ animationDelay: "360ms" }}>
          <FinlandNetwork />
        </div>
      </div>
    </section>
  );
}
