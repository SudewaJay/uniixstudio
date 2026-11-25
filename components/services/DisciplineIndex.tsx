"use client";

import { useId, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import SmartImage from "@/components/ui/SmartImage";

export type IndexService = {
  slug: string;
  name: string;
  desc: string;
  href: string;
  enquireHref: string;
  cover?: string;
  coverAlt?: string;
  deliverables: string[];
  proof?: { slug: string; title: string; cover: string; own: boolean };
};

type Tone = "light" | "dark" | "paper";
type Frame = "plain" | "browser" | "chart";

/**
 * One discipline as an index: the discipline name and a live preview hold
 * still on the left while the services list runs down the right. Pointing at
 * (or focusing) a service swaps the preview; opening it shows what it is, what
 * you get and the work that proves it.
 *
 * Below lg the preview moves inside each opened row, so phones get the same
 * information in one column.
 */
export default function DisciplineIndex({
  id,
  index,
  label,
  tagline,
  tools,
  services,
  tone,
  frame,
}: {
  id: string;
  index: string;
  label: string;
  tagline: string;
  tools: string[];
  services: IndexService[];
  tone: Tone;
  frame: Frame;
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();
  const dark = tone === "dark";
  const current = services[active];

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={clsx(
        "relative scroll-mt-[var(--header-h)] py-24 md:py-32",
        tone === "light" && "bg-bg text-ink",
        tone === "paper" && "bg-bg-paper text-ink",
        dark && "on-dark bg-bg-ink text-white",
      )}
    >
      <span id={`${id}-detail`} className="absolute top-0" aria-hidden="true" />
      <div className="wrap-wide grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
        {/* ------------------------------------------------ Left: name + preview */}
        <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:h-fit lg:self-start">
          <p className={clsx("font-mono text-[11px] uppercase tracking-[0.2em]", dark ? "text-brand-2" : "text-brand-ink")}>
            {index} / 03
          </p>
          <h2
            id={`${id}-title`}
            className="mt-4 font-display font-medium leading-[0.86] tracking-[-0.055em] text-[clamp(64px,8vw,128px)]"
          >
            {label}
          </h2>
          <p className={clsx("mt-5 max-w-[34ch] text-[clamp(17px,1.4vw,21px)] leading-[1.4]", dark ? "text-white/70" : "text-ink-2")}>
            {tagline}
          </p>

          <div className="mt-10 hidden lg:block">
            <Preview services={services} active={active} frame={frame} dark={dark} label={label} />
            <p className={clsx("mt-4 flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em]", dark ? "text-white/50" : "text-ink-mute")}>
              <span aria-live="polite">{current?.name}</span>
              <span>{tools.join(" · ")}</span>
            </p>
          </div>
        </div>

        {/* ------------------------------------------------ Right: services */}
        <ol className={clsx("border-t", dark ? "border-white/15" : "border-ink/15")}>
          {services.map((s, i) => {
            const isOpen = open === i;
            const panelId = `${uid}-panel-${i}`;
            const btnId = `${uid}-btn-${i}`;
            return (
              <li
                key={s.slug}
                className={clsx("border-b", dark ? "border-white/15" : "border-ink/15")}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => {
                      setActive(i);
                      setOpen(isOpen ? null : i);
                    }}
                    className="group grid w-full grid-cols-[40px_minmax(0,1fr)_auto] items-baseline gap-x-4 py-6 text-left md:grid-cols-[64px_minmax(0,1fr)_auto] md:py-7"
                  >
                    <span className={clsx("font-mono text-[12px] tabular-nums", dark ? "text-white/45" : "text-ink-mute")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={clsx(
                        "font-display font-medium leading-[1] tracking-[-0.035em] text-[clamp(26px,3vw,46px)] transition-colors duration-micro",
                        active === i || isOpen ? (dark ? "text-brand-2" : "text-brand-ink") : "",
                      )}
                    >
                      {s.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className={clsx(
                        "relative grid size-9 place-items-center rounded-full border transition-transform duration-std ease-uniix",
                        dark ? "border-white/25" : "border-ink/20",
                        isOpen && "rotate-45",
                      )}
                    >
                      <span className="absolute h-px w-3.5 bg-current" />
                      <span className="absolute h-3.5 w-px bg-current" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="svc-panel grid"
                  data-open={isOpen || undefined}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 pb-10 pl-[56px] md:pl-[80px]" inert={!isOpen}>
                      {s.cover && (
                        <div className="relative aspect-[16/10] overflow-hidden lg:hidden">
                          <SmartImage src={s.cover} alt={s.coverAlt ?? ""} sizes="90vw" />
                        </div>
                      )}
                      <p className={clsx("max-w-[52ch] text-[16.5px] leading-[1.6]", dark ? "text-white/75" : "text-ink-2")}>
                        {s.desc}
                      </p>

                      {s.deliverables.length > 0 && (
                        <div>
                          <p className={clsx("font-mono text-[10.5px] uppercase tracking-[0.2em]", dark ? "text-white/45" : "text-ink-mute")}>
                            You get
                          </p>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {s.deliverables.map((d) => (
                              <li
                                key={d}
                                className={clsx(
                                  "border px-3 py-1.5 text-[13px]",
                                  dark ? "border-white/15 text-white/80" : "border-ink/15 text-ink-2",
                                )}
                              >
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {s.proof && (
                        <Link
                          href={`/portfolio/${s.proof.slug}/`}
                          className={clsx(
                            "group/proof grid max-w-[460px] grid-cols-[96px_minmax(0,1fr)] items-center gap-4 border p-2 pr-4 transition-colors duration-micro",
                            dark ? "border-white/15 hover:border-brand-2" : "border-ink/15 hover:border-brand-ink",
                          )}
                        >
                          <span className="relative block aspect-[4/3] overflow-hidden">
                            <SmartImage src={s.proof.cover} alt="" sizes="96px" />
                          </span>
                          <span>
                            <span className={clsx("block font-mono text-[10px] uppercase tracking-[0.18em]", dark ? "text-white/45" : "text-ink-mute")}>
                              {s.proof.own ? "Our own product" : "See it in"}
                            </span>
                            <span className="mt-1 block font-display text-[18px] font-medium tracking-[-0.02em]">
                              {s.proof.title} <span aria-hidden="true">↗</span>
                            </span>
                          </span>
                        </Link>
                      )}

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <Link href={s.href} className={clsx("btn group", dark ? "btn-light" : "btn-primary")}>
                          About {s.name.replace(/ services?$/i, "")} <span className="cta-arrow">↗</span>
                        </Link>
                        <Link
                          href={s.enquireHref}
                          className={clsx(
                            "inline-flex min-h-[44px] items-center text-[15px] font-medium underline decoration-1 underline-offset-[6px]",
                            dark ? "decoration-white/40 hover:decoration-brand-2" : "decoration-ink/30 hover:decoration-brand-ink",
                          )}
                        >
                          Enquire about this
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Preview({
  services,
  active,
  frame,
  dark,
  label,
}: {
  services: IndexService[];
  active: number;
  frame: Frame;
  dark: boolean;
  label: string;
}) {
  const images = (
    <div className="relative aspect-[16/10] overflow-hidden">
      {services.map((s, i) => (
        <div
          key={s.slug}
          aria-hidden={i !== active}
          className={clsx("svc-shot absolute inset-0", i === active && "is-on")}
        >
          {s.cover ? (
            <SmartImage src={s.cover} alt={i === active ? s.coverAlt ?? `${s.name}, ${label}` : ""} sizes="(min-width:1024px) 44vw, 1px" />
          ) : (
            <div
              className={clsx(
                "flex size-full flex-col justify-between p-8",
                dark ? "bg-white/[0.04]" : "bg-brand-3",
              )}
            >
              <span className={clsx("font-mono text-[11px] uppercase tracking-[0.2em]", dark ? "text-brand-2" : "text-ink/70")}>
                {label}
              </span>
              <span
                className={clsx(
                  "font-display font-medium leading-[0.88] tracking-[-0.05em] text-[clamp(44px,5vw,84px)]",
                  dark ? "svc-outline text-transparent" : "text-ink",
                )}
              >
                {s.name}
              </span>
            </div>
          )}
        </div>
      ))}
      {frame === "chart" && services[active]?.cover && (
        <svg key={active} aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="none" className="svc-chart absolute inset-0 size-full">
          <path d="M0 270 C 60 262, 110 250, 160 222 S 250 150, 300 110 S 370 40, 400 26" pathLength={1} />
        </svg>
      )}
    </div>
  );

  if (frame !== "browser") return images;
  return (
    <div className={clsx("border", dark ? "border-white/15 bg-white/[0.03]" : "border-ink/15")}>
      <div className={clsx("flex items-center gap-2 border-b px-4 py-3", dark ? "border-white/15" : "border-ink/15")}>
        <span aria-hidden="true" className="size-2.5 rounded-full bg-white/25" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-white/25" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-brand-2" />
        <span className="ml-3 truncate font-mono text-[11px] text-white/50">uniixstudio.com/services/technology/{services[active]?.slug}</span>
      </div>
      {images}
    </div>
  );
}
