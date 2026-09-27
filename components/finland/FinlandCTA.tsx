import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import { site } from "@/lib/content";
import SmartImage from "../ui/SmartImage";
import Snowfall from "./Snowfall";
import { finlandContact, finlandImages, isFinlandPlaceholder } from "@/lib/finland";
import styles from "./finland.module.css";

/**
 * 11 — Final CTA. A cinematic last frame rather than a return to generic dark
 * UI: footprints in the snow leading to a warm-lit cabin at dusk, a few
 * flakes, and the headline. Overlays weight the left/top where the type sits,
 * leaving the warm window light visible on the right.
 */
export default function FinlandCTA() {
  const showPhone = !isFinlandPlaceholder(finlandContact.phone);

  return (
    <section
      id="start"
      aria-labelledby="fi-cta-heading"
      className="on-dark section-loose relative isolate overflow-hidden bg-bg-ink text-white"
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
        {/* Adaptive overlays: side-weighted on desktop (type left, cabin
            right); top/bottom-weighted on mobile so the lit windows show
            through between the headline and the contact details. */}
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
              "linear-gradient(180deg, rgba(18,16,14,0.92) 0%, rgba(18,16,14,0.78) 38%, rgba(18,16,14,0.2) 58%, rgba(18,16,14,0.35) 72%, rgba(18,16,14,0.94) 100%)",
          }}
        />
        <div className={clsx(styles.grain, "absolute inset-0")} />
      </div>
      <Snowfall count={20} className="-z-10" />

      <div className="wrap">
        <Reveal>
          <h2
            id="fi-cta-heading"
            className="t-display text-[clamp(44px,8vw,128px)] leading-[0.92] tracking-[-0.055em]"
          >
            Have something
            <br />
            <span className="t-italic accent-grad-text">worth building?</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <Reveal delay={1}>
            <p className="t-lead max-w-[54ch] text-white/70">
              Tell us what you&apos;re working on. We&apos;ll help you figure
              out what comes next.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact/" className="btn btn-light group w-full sm:w-auto">
                Start a project <span className="cta-arrow">↗</span>
              </Link>
              <Link href="#work" className="btn btn-outline-light w-full sm:w-auto">
                View our work
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={3}>
          <dl className="mt-16 grid gap-8 border-t border-line-dark pt-10 sm:grid-cols-3">
            <div>
              <dt className="t-meta text-[10px] text-white/50">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${site.email}`} className="text-[15px] font-medium text-white transition-colors duration-micro hover:text-brand-2">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className={clsx("t-meta text-[10px]", styles.iceText)}>Finland</dt>
              <dd className="mt-2 flex flex-col gap-1 text-[15px] font-medium text-white">
                {isFinlandPlaceholder(finlandContact.email) ? (
                  <span>{finlandContact.email}</span>
                ) : (
                  <a href={`mailto:${finlandContact.email}`} className="transition-colors duration-micro hover:text-brand-2">
                    {finlandContact.email}
                  </a>
                )}
                {showPhone && (
                  <a href={`tel:${finlandContact.phone.replace(/\s+/g, "")}`} className="text-white/70 transition-colors duration-micro hover:text-brand-2">
                    {finlandContact.phone}
                  </a>
                )}
              </dd>
            </div>
            <div>
              <dt className="t-meta text-[10px] text-white/50">Response</dt>
              <dd className="mt-2 text-[15px] font-medium text-white">Within 24 hours</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
