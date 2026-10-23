"use client";

import { useRef } from "react";
import clsx from "clsx";
import { useInView } from "framer-motion";
import type { WhyPoint } from "@/lib/cms/content";
import type { SectionCopy } from "@/lib/cms/site";
import Reveal from "../Reveal";

/**
 * Section 07 — Why Uniix.
 *
 * Each differentiator is set against the agency habit it answers. As a point
 * scrolls in, an ink rule strikes through "the usual", then the Uniix claim
 * rises beneath it — the argument is made by the typography, not by another
 * paragraph.
 *
 * Set on the lime surface (`.why-lime`). On large screens the five points sit
 * side by side so the whole section reads in one viewport; below that they
 * stack as a list.
 *
 * The struck phrase is real text (so it's read out and indexed), and the
 * strike is a decorative background rule. With reduced motion the points
 * render in their finished state.
 */
export default function WhyUniix({ whyPoints, copy }: { whyPoints: WhyPoint[]; copy?: SectionCopy }) {
  return (
    <section
      id="about"
      className="why-lime section lg:flex lg:min-h-[calc(100svh-var(--header-h))] lg:flex-col lg:justify-center lg:py-16"
    >
      <div className="wrap w-full">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:items-end lg:gap-20">
          <Reveal>
            <span className="eyebrow">{copy?.eyebrow ?? "Why Uniix"}</span>
            <h2 className="t-h2 mt-5">
              {copy?.heading ?? "A studio built"}
              <br />
              {copy?.headingAccent ?? "for serious work."}
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead text-ink-2">
              {copy?.support ??
                "A small, senior team in Colombo working with clients across South Asia, Australia and the UK."}
            </p>
          </Reveal>
        </div>

        <ol className="mt-10 border-t border-ink/20 lg:mt-14 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:border-t-0">
          {whyPoints.map((p) => (
            <WhyItem key={p.num} point={p} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function WhyItem({ point }: { point: WhyPoint }) {
  const ref = useRef<HTMLLIElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  return (
    <li
      ref={ref}
      className={clsx(
        "why-row grid grid-cols-[36px_minmax(0,1fr)] gap-x-4 border-b border-ink/20 py-6 md:grid-cols-[48px_minmax(0,1fr)] md:gap-x-8",
        "lg:flex lg:flex-col lg:border-b-0 lg:border-t lg:border-ink/30 lg:pt-5 lg:pb-0",
        seen && "is-in",
      )}
    >
      <span className="t-meta pt-1 tabular-nums text-ink-2 lg:pt-0">{point.num}</span>

      <div className="col-start-2 lg:mt-5">
        {point.instead && (
          <p className="mb-3">
            <span className="t-meta mr-2 text-[9px] text-ink-2">The usual —</span>
            <span className="why-strike text-[15px] text-ink-2">{point.instead}</span>
          </p>
        )}

        <div className="why-claim">
          <h3 className="font-display text-[clamp(22px,2.6vw,32px)] font-medium leading-[1.12] tracking-[-0.028em] text-balance lg:text-[clamp(20px,1.55vw,24px)]">
            {point.title}
          </h3>
          <p className="t-body mt-3 max-w-[52ch] text-ink-2 lg:text-[14px] lg:leading-[1.55]">
            {point.desc}
          </p>
        </div>
      </div>
    </li>
  );
}
