"use client";

import type { AudienceTier } from "@/lib/projects";

export type DisciplineFilter =
  | "all"
  | "brand"
  | "web"
  | "seo"
  | "social";

export type TierFilter = "all" | AudienceTier;

const DISCIPLINES: { id: DisciplineFilter; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "brand", label: "Brand Identity" },
  { id: "web", label: "Digital & Web" },
  { id: "seo", label: "SEO & Growth" },
  { id: "social", label: "Social & Motion" },
];

const TIERS: { id: TierFilter; label: string }[] = [
  { id: "all", label: "All Tiers" },
  { id: "startup", label: "Startup" },
  { id: "smb", label: "Small Business" },
  { id: "midmarket", label: "Mid-Market" },
];

type Props = {
  discipline: DisciplineFilter;
  tier: TierFilter;
  onDisciplineChange: (d: DisciplineFilter) => void;
  onTierChange: (t: TierFilter) => void;
  onReset: () => void;
  filteredCount: number;
  totalCount: number;
};

export default function PortfolioFilterBar({
  discipline,
  tier,
  onDisciplineChange,
  onTierChange,
  onReset,
  filteredCount,
  totalCount,
}: Props) {
  const isFiltered = discipline !== "all" || tier !== "all";

  return (
    <div className="sticky top-[calc(var(--header-h)-1px)] z-40 bg-bg/90 backdrop-blur-xl border-b border-line py-4 transition-all duration-std">
      <div className="wrap">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Primary Discipline Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute mr-2 hidden sm:inline-block">
              Discipline
            </span>
            {DISCIPLINES.map((d) => {
              const active = discipline === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => onDisciplineChange(d.id)}
                  aria-pressed={active}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-micro ease-uniix ${
                    active
                      ? "bg-ink text-white shadow-sm2"
                      : "bg-transparent text-ink-2 hover:text-ink hover:bg-bg-warm"
                  }`}
                >
                  {d.label}
                </button>
              );
            })}
          </div>

          {/* Secondary Client Tier + Clear */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute mr-1 hidden sm:inline-block">
              Tier
            </span>
            {TIERS.map((t) => {
              const active = tier === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onTierChange(t.id)}
                  aria-pressed={active}
                  className={`px-3 py-1 rounded-full text-[12px] font-medium whitespace-nowrap border transition-all duration-micro ease-uniix ${
                    active
                      ? "border-brand-ink bg-brand-ink/10 text-brand-ink font-semibold"
                      : "border-line bg-transparent text-ink-mute hover:text-ink hover:border-ink/40"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}

            {isFiltered && (
              <button
                type="button"
                onClick={onReset}
                className="ml-2 font-mono text-[11px] tracking-[0.14em] uppercase text-brand-ink hover:underline inline-flex items-center gap-1 whitespace-nowrap"
              >
                Reset ✕
              </button>
            )}

            <div className="ml-auto pl-3 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute whitespace-nowrap">
              ({filteredCount} of {totalCount})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
