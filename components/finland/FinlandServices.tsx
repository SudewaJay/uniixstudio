import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import ServiceGlyph from "./ServiceGlyph";
import { finlandServices } from "@/lib/finland";
import styles from "./finland.module.css";

/**
 * 04 — Services. A hairline grid (1px gaps over the line colour) rather than
 * floating cards — quieter, more Nordic, and it reads as one system. Each
 * cell is a real link into the matching service page.
 */
export default function FinlandServices() {
  return (
    <section id="services" aria-labelledby="fi-services-heading" className="section bg-bg">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,36%)] lg:items-end lg:gap-16">
          <Reveal>
            <span className="eyebrow">Services</span>
            <h2 id="fi-services-heading" className="t-h2 mt-5">
              What we can
              <br />
              <span className="t-italic accent-grad-text">build together.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead max-w-[42ch] text-ink-2">
              Web design, web development, product engineering and growth for
              companies in Helsinki and across Finland — designed to perform.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl2 border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {finlandServices.map((s, i) => (
            <li key={s.num} className="bg-bg">
              <Reveal delay={((i % 3) as 0 | 1 | 2)} className="h-full">
                <Link
                  href={s.href}
                  className={clsx(styles.svcCard, "group flex h-full flex-col p-7 md:p-9")}
                >
                  <div className="flex items-start justify-between">
                    <span className="t-meta text-ink-mute tabular-nums">{s.num}</span>
                    <span
                      aria-hidden="true"
                      className="cta-arrow text-[18px] text-ink-mute transition-colors duration-micro group-hover:text-brand-ink"
                    >
                      ↗
                    </span>
                  </div>

                  <div className="mt-8 h-[96px] w-[160px] text-ink">
                    <ServiceGlyph kind={s.visual} />
                  </div>

                  <h3 className="t-h3 mt-8">{s.title}</h3>
                  <p className="t-body mt-3 max-w-[34ch] text-ink-2">{s.desc}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
