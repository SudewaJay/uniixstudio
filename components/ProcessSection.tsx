import type { JSX } from "react";
import { process } from "@/lib/content";
import Reveal from "./Reveal";

const ICONS: Record<string, JSX.Element> = {
  "01": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  "02": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  "03": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
      <path d="m12 19-7-7 7-7" />
      <path d="M5 12h14" />
    </svg>
  ),
  "04": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
      <polyline points="3 17 9 11 13 15 21 7" />
      <polyline points="14 7 21 7 21 14" />
    </svg>
  ),
};

export default function ProcessSection() {
  return (
    <section id="process" className="bg-bg-warm py-24 md:py-32">
      <div className="wrap">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end mb-16 lg:mb-20">
          <Reveal>
            <span className="eyebrow">How we work</span>
            <h2 className="display mt-4" style={{ fontSize: "clamp(44px,6.5vw,88px)" }}>
              A process built
              <br />
              <span className="italic-display gradient-text">
                around outcomes.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="text-[clamp(17px,1.4vw,20px)] text-ink-2 max-w-[40ch] leading-[1.55]">
              Four stages. Clear deliverables at each. Fixed timelines, no scope
              creep — just steady forward motion from kickoff to launch.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col border-t border-line">
          {process.map((p) => (
            <Reveal key={p.num}>
              <div className="process-row grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr_1.4fr_auto] gap-4 md:gap-8 py-9 border-b border-line items-start md:items-center">
                <span
                  className="pr-num font-display font-normal italic-display"
                  style={{
                    fontSize: "42px",
                    color: "#7A6E64",
                  }}
                >
                  {p.num}
                </span>
                <div
                  className="font-display font-medium"
                  style={{
                    fontSize: "clamp(22px,2.4vw,30px)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {p.title}
                </div>
                <div className="text-ink-2 text-[15px] leading-[1.55] max-w-[54ch] col-span-2 md:col-span-1">
                  {p.desc}
                </div>
                <div className="pr-icon w-12 h-12 rounded-full border border-line grid place-items-center text-ink-2 transition-all duration-300 col-span-2 md:col-span-1">
                  {ICONS[p.num]}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
