import clsx from "clsx";
import Reveal from "../Reveal";
import LocalClock from "./LocalClock";
import { finlandModel } from "@/lib/finland";
import styles from "./finland.module.css";

type Place = (typeof finlandModel)["finland"] | (typeof finlandModel)["sriLanka"];

function PlaceColumn({ place, tone }: { place: Place; tone: "fi" | "lk" }) {
  return (
    <div className="relative flex flex-col p-7 md:p-10 lg:p-12">
      <div className="flex items-baseline justify-between gap-4">
        <span className={clsx("t-meta", tone === "fi" ? styles.iceInk : "accent")}>
          {place.code} · {place.label}
        </span>
        <span className="t-meta text-ink-mute">
          <LocalClock timeZone={place.timeZone} />
        </span>
      </div>

      <h3 className="mt-8 font-display font-medium text-[clamp(44px,6vw,84px)] leading-[0.9] tracking-[-0.05em]">
        {place.country}
      </h3>

      <ul className="mt-10 border-t border-line">
        {place.items.map((item, i) => (
          <li
            key={item}
            className="flex items-baseline gap-4 border-b border-line py-3.5 text-[16px] text-ink-2"
          >
            <span className="t-meta w-6 shrink-0 text-[10px] text-ink-mute tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * 02 — Finland × Sri Lanka.
 *
 * An editorial split: two locations, one relationship. The connector is a
 * single CSS-animated pulse travelling a hairline — horizontal on desktop,
 * vertical on mobile, static under reduced motion.
 */
export default function FinlandBridge() {
  const { finland, sriLanka } = finlandModel;

  return (
    <section id="model" aria-labelledby="fi-model-heading" className="section bg-bg">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,40%)] lg:items-end lg:gap-16">
          <Reveal>
            <span className="eyebrow">The model</span>
            <h2 id="fi-model-heading" className="t-h2 mt-5">
              Local when it matters.
              <br />
              <span className="t-italic accent-grad-text">Global when it scales.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead max-w-[46ch] text-ink-2">
              Uniix brings together Finland-side technical expertise and a
              multidisciplinary digital team in Sri Lanka — giving ambitious
              businesses access to both local context and deep delivery capability.
            </p>
          </Reveal>
        </div>

        <Reveal delay={1}>
          <div className="mt-14 grid overflow-hidden rounded-xl2 border border-line bg-bg-paper md:mt-20 lg:grid-cols-[minmax(0,1fr)_176px_minmax(0,1fr)]">
            <PlaceColumn place={finland} tone="fi" />

            {/* ------------------------------------------ Connector */}
            <div
              className="relative flex flex-col items-center justify-center gap-2 border-y border-line bg-bg px-7 py-5 lg:flex-row lg:border-x lg:border-y-0 lg:px-4 lg:py-12"
              aria-label="Finland and Sri Lanka work as one team"
              role="img"
            >
              <span className={clsx("t-meta shrink-0", styles.iceInk)}>FI</span>
              <span aria-hidden="true" className={styles.bridgeTrack}>
                <span className={styles.bridgePulse} />
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 rounded-full border border-line bg-bg-paper px-3 py-1.5 t-meta text-[10px] text-ink"
              >
                ↔
              </span>
              <span aria-hidden="true" className={styles.bridgeTrack}>
                <span className={clsx(styles.bridgePulse, styles.bridgePulseLate)} />
              </span>
              <span className="t-meta shrink-0 accent">LK</span>
            </div>

            <PlaceColumn place={sriLanka} tone="lk" />
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-8 flex flex-col gap-3 text-[14px] text-ink-mute sm:flex-row sm:items-center sm:justify-between">
            <p className="font-display text-[18px] font-medium tracking-[-0.02em] text-ink">
              One distributed team. Two perspectives. Global execution.
            </p>
            <p className="t-meta text-[10px]">
              Time difference 2.5–3.5 h · Shared working day
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
