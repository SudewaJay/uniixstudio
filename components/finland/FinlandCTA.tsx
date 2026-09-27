import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import SmartImage from "../ui/SmartImage";
import Snowfall from "./Snowfall";
import { site } from "@/lib/content";
import { finlandContact, finlandImages, isFinlandPlaceholder } from "@/lib/finland";
import type { FinlandUI } from "@/lib/finland-i18n";
import styles from "./finland.module.css";

/**
 * 11 — Final CTA. A cinematic last frame: footprints in the snow leading to a
 * warm-lit cabin at dusk, a few flakes, and the headline. Overlays weight the
 * area behind the type on each breakpoint.
 *
 * The contact row only lists details that are real — a placeholder Finland
 * email or phone is hidden rather than shown in brackets.
 */
export default function FinlandCTA({ t }: { t: FinlandUI["cta"] }) {
  const fiEmail = isFinlandPlaceholder(finlandContact.email) ? null : finlandContact.email;
  const fiPhone = isFinlandPlaceholder(finlandContact.phone) ? null : finlandContact.phone;
  const hasFinland = Boolean(fiEmail || fiPhone);

  return (
    <section
      id="start"
      aria-labelledby="fi-cta-heading"
      className="on-dark relative isolate overflow-hidden bg-bg-ink py-[88px] text-white md:py-[144px]"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <SmartImage
          src={finlandImages.cabinDusk.src}
          alt=""
          sizes="100vw"
          quality={64}
          position={finlandImages.cabinDusk.position}
          className={styles.photoCold}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(100deg, rgba(18,16,14,0.92) 0%, rgba(18,16,14,0.72) 45%, rgba(18,16,14,0.25) 100%), linear-gradient(180deg, rgba(18,16,14,0.6) 0%, rgba(18,16,14,0) 35%, rgba(18,16,14,0.2) 70%, rgba(18,16,14,0.9) 100%)",
          }}
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,16,14,0.9) 0%, rgba(18,16,14,0.8) 45%, rgba(18,16,14,0.35) 62%, rgba(18,16,14,0.45) 74%, rgba(18,16,14,0.95) 100%)",
          }}
        />
        <div className={clsx(styles.grain, "absolute inset-0")} />
      </div>
      <Snowfall count={20} className="-z-10" />

      <div className="wrap">
        <Reveal>
          <h2
            id="fi-cta-heading"
            className="t-display text-[clamp(38px,7.4vw,120px)] leading-[0.94] tracking-[-0.055em] md:max-w-[14ch]"
          >
            {t.title[0]}{" "}
            <span className="t-italic accent-grad-text">{t.title[1]}</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
          <Reveal delay={1}>
            <p className="t-lead max-w-[46ch] text-white/80">{t.lead}</p>
          </Reveal>
          <Reveal delay={2}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact/" className="btn btn-light group w-full sm:w-auto">
                {t.start} <span className="cta-arrow">↗</span>
              </Link>
              <Link href="#work" className="btn btn-outline-light w-full sm:w-auto">
                {t.work}
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={3}>
          <dl
            className={clsx(
              "mt-14 grid grid-cols-2 gap-6 border-t border-line-dark pt-8 md:mt-20",
              hasFinland ? "sm:grid-cols-3" : "sm:max-w-[560px]",
            )}
          >
            <div className="col-span-2 sm:col-span-1">
              <dt className="t-meta text-[10px] text-white/55">{t.email}</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-[32px] items-center text-[15px] font-medium text-white transition-colors duration-micro hover:text-brand-2"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            {hasFinland && (
              <div>
                <dt className={clsx("t-meta text-[10px]", styles.iceText)}>{t.finland}</dt>
                <dd className="mt-2 flex flex-col gap-1 text-[15px] font-medium text-white">
                  {fiEmail && (
                    <a href={`mailto:${fiEmail}`} className="transition-colors duration-micro hover:text-brand-2">
                      {fiEmail}
                    </a>
                  )}
                  {fiPhone && (
                    <a href={`tel:${fiPhone.replace(/\s+/g, "")}`} className="text-white/75 transition-colors duration-micro hover:text-brand-2">
                      {fiPhone}
                    </a>
                  )}
                </dd>
              </div>
            )}
            <div>
              <dt className="t-meta text-[10px] text-white/55">{t.response}</dt>
              <dd className="mt-2 text-[15px] font-medium text-white">{t.within}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
