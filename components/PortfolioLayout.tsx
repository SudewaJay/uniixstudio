"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project, AudienceTier } from "@/lib/projects";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* ---------------- Logo cloud strip (top of portfolio) ---------------- */

export type ClientLogo = {
  name: string;
  logo: string;
  style?: string;
};

export function PortfolioLogoCloud({ clients }: { clients: ClientLogo[] }) {
  return (
    <section className="py-8 md:py-10 bg-ink text-white border-b border-white/10">
      <div className="wrap">
        <ul className="flex flex-wrap items-center justify-center gap-x-10 md:gap-x-16 gap-y-5 opacity-85">
          {clients.map((c) => (
            <li
              key={c.name}
              className={`text-[16px] md:text-[18px] text-white/85 ${c.style ?? ""}`}
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Featured projects — 2-col staggered grid ---------------- */

export function PortfolioFeatured({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const featured = projects.filter((p) => p.feature).slice(0, 4);
  if (featured.length === 0) return null;

  return (
    <section className="bg-ink text-white py-16 md:py-24">
      <div className="wrap">
        <div className="flex items-center gap-3 mb-10 md:mb-14">
          <span
            aria-hidden
            className="w-2.5 h-2.5 rounded-full bg-brand-1"
          />
          <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/60">
            Featured projects
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-14">
          {featured.map((p, i) => {
            // Stagger: even-index cards offset down on md+ for asymmetric layout
            const offset = i % 2 === 1 ? "md:mt-20" : "";
            return (
              <motion.div
                key={p.slug}
                initial={reduce ? undefined : { opacity: 0, y: 32 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.05 + i * 0.08 }}
                className={offset}
              >
                <FeaturedCard project={p} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const card = (
    <article className="group block">
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-3xl bg-bg-warm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.coverImage}
          alt={`${project.title} — ${project.overline}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-5">
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/55">
          {project.overline}
        </div>
        <h3 className="font-display font-medium text-white text-[20px] md:text-[24px] leading-[1.25] tracking-[-0.015em] mt-2 group-hover:opacity-90 transition-opacity">
          {project.headline ?? project.title}
        </h3>
        {project.tags && project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-4">
            {project.tags.slice(0, 4).map((t) => (
              <li
                key={t}
                className="px-3 py-1 rounded-full bg-white/10 text-white/75 text-[11px] font-medium tracking-[0.04em]"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );

  if (project.hasDetail) {
    return (
      <Link href={`/portfolio/${project.slug}`} className="block">
        {card}
      </Link>
    );
  }
  return card;
}

/* ---------------- All projects — 3-col with multi-select filters ---------------- */

const TIER_LABELS: Record<AudienceTier, string> = {
  enterprise: "Enterprise",
  midmarket: "Mid Market",
  smb: "Small Business",
  startup: "Startup",
  nonprofit: "Non Profit",
};

const TIER_ORDER: AudienceTier[] = [
  "enterprise",
  "midmarket",
  "startup",
  "smb",
  "nonprofit",
];

export function PortfolioFilterableGrid({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const [tiers, setTiers] = useState<Set<AudienceTier>>(new Set());
  const [services, setServices] = useState<Set<string>>(new Set());

  // Build the universe of available filter values from the actual data
  const availableTiers = useMemo(() => {
    const seen = new Set<AudienceTier>();
    for (const p of projects) if (p.audienceTier) seen.add(p.audienceTier);
    return TIER_ORDER.filter((t) => seen.has(t));
  }, [projects]);

  const availableServices = useMemo(() => {
    const seen = new Set<string>();
    for (const p of projects) {
      if (p.tags) for (const t of p.tags) seen.add(t);
    }
    return Array.from(seen).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (tiers.size > 0 && (!p.audienceTier || !tiers.has(p.audienceTier))) {
        return false;
      }
      if (services.size > 0) {
        const projectTags = p.tags ?? [];
        const hasAny = projectTags.some((t) => services.has(t));
        if (!hasAny) return false;
      }
      return true;
    });
  }, [projects, tiers, services]);

  const toggle = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  return (
    <section className="py-20 md:py-28">
      <div className="wrap">
        <div className="max-w-[860px]">
          <h2
            className="font-display font-medium tracking-[-0.02em] leading-[1.05]"
            style={{ fontSize: "clamp(40px,5.5vw,72px)" }}
          >
            Our Projects
          </h2>
          <p className="text-[clamp(16px,1.3vw,18px)] text-ink-2 leading-[1.6] mt-5 max-w-[58ch]">
            We build meaningful partnerships across industries, helping
            businesses drive impact aligned with their objectives.
          </p>
        </div>

        {/* Filter rows */}
        <div className="mt-10 md:mt-12 flex flex-col gap-5">
          {availableTiers.length > 0 && (
            <FilterRow
              label="Filter by Business Type"
              options={availableTiers}
              labelFor={(t) => TIER_LABELS[t]}
              selected={tiers}
              onToggle={(t) => toggle(tiers, t, setTiers)}
            />
          )}
          {availableServices.length > 0 && (
            <FilterRow
              label="Or by Services"
              options={availableServices}
              labelFor={(s) => s}
              selected={services}
              onToggle={(s) => toggle(services, s, setServices)}
            />
          )}
          {(tiers.size > 0 || services.size > 0) && (
            <button
              type="button"
              onClick={() => {
                setTiers(new Set());
                setServices(new Set());
              }}
              className="self-start text-[12px] font-mono tracking-[0.18em] uppercase text-brand-4 hover:text-brand-3 transition-colors"
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                ease: EASE,
                delay: 0.04 + (i % 6) * 0.05,
              }}
            >
              <GridCard project={p} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-ink-2">
            <p className="text-[18px]">No projects match those filters.</p>
            <p className="text-[14px] mt-2 text-ink-mute">
              Try removing one or two pills.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function FilterRow<T>({
  label,
  options,
  labelFor,
  selected,
  onToggle,
}: {
  label: string;
  options: T[];
  labelFor: (v: T) => string;
  selected: Set<T>;
  onToggle: (v: T) => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute pt-1.5 min-w-[160px]">
        {label}
      </div>
      <ul className="flex flex-wrap gap-x-2 gap-y-2 items-center">
        {options.map((opt, i) => {
          const active = selected.has(opt);
          return (
            <li key={String(opt)} className="flex items-center">
              <button
                type="button"
                onClick={() => onToggle(opt)}
                aria-pressed={active}
                className={`text-[14px] md:text-[15px] font-medium px-2 py-1 rounded-md transition-colors ${
                  active
                    ? "bg-ink text-white"
                    : "text-ink hover:text-brand-4"
                }`}
              >
                {labelFor(opt)}
              </button>
              {i < options.length - 1 && (
                <span aria-hidden className="text-ink-mute text-[14px] mx-1">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function GridCard({ project }: { project: Project }) {
  const card = (
    <article className="group block">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-bg-warm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.coverImage}
          alt={`${project.title} — ${project.overline}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4">
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-mute">
          {project.overline}
        </div>
        <h3 className="font-display font-medium text-ink text-[18px] md:text-[20px] leading-[1.3] tracking-[-0.01em] mt-2 group-hover:text-brand-4 transition-colors">
          {project.headline ?? project.title}
        </h3>
      </div>
    </article>
  );

  if (project.hasDetail) {
    return (
      <Link href={`/portfolio/${project.slug}`} className="block">
        {card}
      </Link>
    );
  }
  return card;
}
