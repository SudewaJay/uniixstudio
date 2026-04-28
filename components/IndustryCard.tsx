"use client";

import Link from "next/link";
import type { Industry } from "@/lib/industries";

export default function IndustryCard({
  industry,
  index,
}: {
  industry: Industry;
  index: number;
}) {
  const num = String((index % 8) + 1).padStart(2, "0");

  return (
    <Link
      href={`/industries/${industry.slug}`}
      className={`group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] aspect-[4/5] rounded-[32px] overflow-hidden block bg-gradient-to-br ${industry.bg} border border-white/10 shadow-[0_20px_60px_-20px_rgba(26,20,16,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_80px_-20px_rgba(232,98,26,0.35)]`}
      aria-label={`${industry.name} — explore industry`}
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={industry.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
      />

      {/* Image readability — soft on top, deep at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/40" />

      {/* Subtle accent halo (top-right) */}
      <div
        className="absolute -top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full blur-3xl opacity-50 mix-blend-screen pointer-events-none transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: industry.accent }}
        aria-hidden="true"
      />

      {/* Top row — number + chip */}
      <div className="absolute inset-x-0 top-0 p-6 md:p-7 flex items-start justify-between">
        <span
          className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/85"
          style={{ color: industry.accent }}
        >
          {num} / Industry
        </span>
        <span className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 grid place-items-center text-white text-[14px] transition-all duration-500 group-hover:bg-white group-hover:text-ink group-hover:rotate-[-45deg]">
          ↗
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 lg:p-8 flex flex-col gap-3">
        <h3 className="font-display font-medium text-white text-[26px] md:text-[30px] lg:text-[34px] leading-[1.02] tracking-[-0.025em]">
          {industry.name}
        </h3>
        <p className="text-white/80 text-[13.5px] md:text-[14px] leading-[1.55] max-w-[34ch]">
          {industry.description}
        </p>
      </div>
    </Link>
  );
}
