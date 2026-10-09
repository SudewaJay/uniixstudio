"use client";

import Reveal from "@/components/Reveal";

export type ViewMode = "stories" | "archive";

type Props = {
  totalCount: number;
  filteredCount: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
};

export default function PortfolioHero({
  totalCount,
  filteredCount,
  viewMode,
  onViewModeChange,
}: Props) {
  return (
    <section className="pt-32 md:pt-44 pb-12 md:pb-16 bg-bg border-b border-line/60">
      <div className="wrap">
        <div className="flex flex-col gap-8">
          {/* Eyebrow strip */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="eyebrow">Work Archive</span>
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute">
                  / 2023 — 2026
                </span>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse2" />
                <span>
                  {filteredCount === totalCount
                    ? `${totalCount} Projects Documented`
                    : `${filteredCount} of ${totalCount} Projects`}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Main Editorial Headline */}
          <div className="max-w-[1080px]">
            <Reveal delay={1}>
              <h1 className="t-display text-[clamp(44px,7.2vw,104px)]">
                Work that moved
                <br />
                <span className="t-italic accent-grad-text">
                  brands &amp; experiences.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={2}>
              <p className="t-lead mt-7 max-w-[62ch] text-ink-2 text-[clamp(17px,1.4vw,22px)]">
                A curated archive of brand identities, web platforms, digital products,
                and performance systems built to solve high-stakes business problems
                across Sri Lanka, Australia, and the United Kingdom.
              </p>
            </Reveal>
          </div>

          {/* Stats Bar + View Mode Toggle */}
          <div className="mt-8 pt-8 border-t border-line/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <Reveal delay={3}>
              <div className="flex flex-wrap items-center gap-8 md:gap-14">
                <div>
                  <div className="t-numeral text-[clamp(28px,2.4vw,36px)] text-ink">
                    {String(totalCount).padStart(2, "0")}
                  </div>
                  <div className="t-meta text-ink-mute text-[10px] mt-1">
                    Featured Case Studies
                  </div>
                </div>
                <div className="h-8 w-px bg-line" aria-hidden="true" />
                <div>
                  <div className="t-numeral text-[clamp(28px,2.4vw,36px)] text-ink">
                    100%
                  </div>
                  <div className="t-meta text-ink-mute text-[10px] mt-1">
                    Custom Engineered
                  </div>
                </div>
                <div className="h-8 w-px bg-line hidden sm:block" aria-hidden="true" />
                <div className="hidden sm:block">
                  <div className="t-numeral text-[clamp(28px,2.4vw,36px)] text-ink">
                    25+
                  </div>
                  <div className="t-meta text-ink-mute text-[10px] mt-1">
                    Global Deployments
                  </div>
                </div>
              </div>
            </Reveal>

            {/* View Mode Switcher */}
            <Reveal delay={3}>
              <div
                role="group"
                aria-label="Archive view mode"
                className="inline-flex items-center p-1 rounded-full bg-bg-warm border border-line"
              >
                <button
                  type="button"
                  onClick={() => onViewModeChange("stories")}
                  aria-pressed={viewMode === "stories"}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-micro ease-uniix ${
                    viewMode === "stories"
                      ? "bg-ink text-white shadow-sm2"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <span>Curated Stories</span>
                </button>
                <button
                  type="button"
                  onClick={() => onViewModeChange("archive")}
                  aria-pressed={viewMode === "archive"}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-micro ease-uniix ${
                    viewMode === "archive"
                      ? "bg-ink text-white shadow-sm2"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  <span>Archive Index</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
