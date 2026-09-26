import clsx from "clsx";
import SmartImage from "../ui/SmartImage";
import Snowfall from "./Snowfall";
import { finlandImages } from "@/lib/finland";
import styles from "./finland.module.css";

/**
 * A visual breath between the technical sections: one full-bleed winter
 * landscape, one quiet line, nothing to click. ~55vh. The image drifts with
 * a CSS scroll-driven parallax where supported (no JS; static elsewhere and
 * under reduced motion).
 */
export default function FinlandBreak() {
  const img = finlandImages.frozenLake;

  return (
    <section
      aria-label="Quietly creating what's next"
      className="on-dark relative isolate flex min-h-[420px] items-end overflow-hidden bg-bg-ink text-white h-[55svh] md:h-[60svh]"
    >
      <div aria-hidden="true" className={clsx(styles.parallax, "absolute inset-x-0 -top-[12%] -z-10 h-[124%]")}>
        <SmartImage
          src={img.src}
          alt=""
          sizes="100vw"
          quality={62}
          position={img.position}
          className={styles.photoCold}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,16,14,0.55) 0%, rgba(18,16,14,0.05) 35%, rgba(18,16,14,0.2) 60%, rgba(18,16,14,0.82) 100%)",
        }}
      />
      <div aria-hidden="true" className={clsx(styles.grain, "absolute inset-0 -z-10")} />
      <Snowfall count={14} className="-z-10" />

      <div className="wrap pb-10 md:pb-14">
        <p className={clsx("t-meta text-[10px]", styles.iceText)}>Between the work</p>
        <p className="mt-4 font-display font-medium text-[clamp(32px,4.6vw,64px)] leading-[1] tracking-[-0.04em]">
          Quietly creating
          <br />
          <span className="t-italic text-white/85">what&apos;s next.</span>
        </p>
      </div>
    </section>
  );
}
