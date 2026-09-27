"use client";

import { useRef } from "react";
import clsx from "clsx";
import { useInView } from "framer-motion";
import { whyPoints } from "@/lib/content";
import Reveal from "../Reveal";

/**
 * Section 07 — Why Uniix.
 *
 * Each differentiator is set against the agency habit it answers. As a row
 * scrolls in, a brand-orange rule strikes through "the usual", then the
 * Uniix claim rises beside it — the argument is made by the typography, not
 * by another paragraph.
 *
 * The struck phrase is real text (so it's read out and indexed), and the
 * strike is a decorative pseudo-element. With reduced motion the rows render
 * in their finished state.
 */
export default function WhyUniix() {
  return (
    <section id="about" className="section bg-bg">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:items-end lg:gap-20">
          <Reveal>
            <span className="eyebrow">Why Uniix</span>
            <h2 className="t-h2 mt-5">
              A studio built
              <br />
              <span className="t-italic accent-grad-text">for serious work.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead text-ink-2">
              A small, senior team in Colombo working with clients across South Asia,
              Australia and the UK.
            </p>
          </Reveal>
        </div>

        {/* Column labels — desktop only; on mobile each row labels itself. */}
        <div
          aria-hidden="true"
          className="mt-14 hidden grid-cols-[48px_minmax(0,30%)_minmax(0,1fr)] gap-x-8 pb-4 md:grid"
        >
          <span />
          <span className="t-meta text-ink-mute">The usual</span>
          <span className="t-meta accent">Uniix</span>
        </div>

        <ol className="mt-10 border-t border-line md:mt-0">
          {whyPoints.map((p) => (
            <WhyRow key={p.num} point={p} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function WhyRow({ point }: { point: (typeof whyPoints)[number] }) {
  const ref = useRef<HTMLLIElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -18% 0px" });

  return (
    <li
      ref={ref}
      className={clsx(
        "why-row group grid grid-cols-[36px_minmax(0,1fr)] gap-x-4 gap-y-3 border-b border-line py-6 md:grid-cols-[48px_minmax(0,30%)_minmax(0,1fr)] md:gap-x-8 md:py-7",
        seen && "is-in",
      )}
    >
      <span className="t-meta pt-1 tabular-nums text-ink-mute transition-colors duration-micro group-hover:text-brand-ink md:pt-2">
        {point.num}
      </span>

      {"instead" in point && point.instead ? (
        <p className="md:pt-1.5">
          <span className="t-meta mr-2 text-[9px] text-ink-mute md:hidden">The usual —</span>
          <span className="why-strike text-[15px] text-ink-mute md:text-[17px]">
            {point.instead}
          </span>
        </p>
      ) : (
        <span className="hidden md:block" />
      )}

      <div className="why-claim col-start-2 md:col-start-auto">
        <h3 className="font-display text-[clamp(24px,2.9vw,38px)] font-medium leading-[1.1] tracking-[-0.028em] text-balance">
          {point.title}
        </h3>
        <p className="t-body mt-3 max-w-[52ch] text-ink-2">{point.desc}</p>
      </div>
    </li>
  );
}
