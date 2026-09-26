import clsx from "clsx";
import Reveal from "../Reveal";
import SmartImage from "../ui/SmartImage";
import ClipReveal from "./ClipReveal";
import { finlandImages } from "@/lib/finland";
import styles from "./finland.module.css";

const PILLARS = [
  { name: "Design", line: "How it feels." },
  { name: "Technology", line: "How it works." },
  { name: "Growth", line: "How it lasts." },
];

/**
 * Human × Technology — the page's first human moment, placed right after the
 * operating-model diagram so the "who" follows the "how". A single cinematic
 * photograph (cold blue outside, warm lamp inside), one sentence, three words.
 */
export default function FinlandHuman() {
  const img = finlandImages.windowStudio;

  return (
    <section aria-labelledby="fi-human-heading" className="section relative overflow-hidden bg-bg-warm">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
        <ClipReveal className="relative">
          <figure className="relative aspect-[4/5] overflow-hidden rounded-xl2 sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/6]">
            <div className={clsx(styles.clipImg, "absolute inset-0")}>
              <SmartImage
                src={img.src}
                alt={img.alt}
                sizes="(min-width:1024px) 58vw, 92vw"
                quality={72}
                position={img.position}
                className={styles.photoWarm}
              />
            </div>
            <div aria-hidden="true" className={clsx(styles.grain, "absolute inset-0")} />
            <figcaption className="on-dark absolute bottom-4 left-4 rounded-full bg-ink/55 px-3 py-1.5 t-meta text-[9px] text-white/80 backdrop-blur-sm">
              Winter evening · the work begins
            </figcaption>
          </figure>
        </ClipReveal>

        <div>
          <Reveal>
            <span className="eyebrow">People first</span>
            <h2 id="fi-human-heading" className="t-h2 mt-5">
              We build for people,
              <br />
              <span className="t-italic accent-grad-text">not just screens.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead mt-7 max-w-[34ch] text-ink-2">
              We use technology to create experiences people remember.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <ul className="mt-12 border-t border-line">
              {PILLARS.map((p) => (
                <li key={p.name} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                  <span className="font-display text-[clamp(24px,2.4vw,32px)] font-medium tracking-[-0.03em]">
                    {p.name}
                  </span>
                  <span className="t-meta text-[10px] text-ink-mute">{p.line}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
