import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import SmartImage from "../ui/SmartImage";
import { finlandPartner as partner, isFinlandPlaceholder } from "@/lib/finland";
import styles from "./finland.module.css";

/**
 * 09 — Technical partner, Finland.
 *
 * Framed as the studio's Finland-side capability, not an employee card.
 * Every personal detail comes from `finlandPartner` in lib/finland.ts; with
 * no portrait set, a neutral monogram card stands in rather than a stock
 * face. Copy deliberately makes no claim about employment, citizenship or a
 * registered Finnish entity.
 */
export default function FinlandPartner() {
  const initials = isFinlandPlaceholder(partner.name)
    ? "FI"
    : partner.name
        .split(/\s+/)
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

  return (
    <section
      id="finland-team"
      aria-labelledby="fi-partner-heading"
      className="on-dark section relative overflow-hidden bg-bg-ink text-white"
    >
      <div aria-hidden="true" className={clsx(styles.grid, "absolute inset-0 opacity-60")} />

      <div className="wrap relative grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-20">
        {/* ------------------------------------------------ Portrait */}
        <Reveal className="order-2 lg:order-1">
          <figure className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:max-w-[460px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl2 border border-line-dark bg-bg-ink-2">
              {partner.portrait ? (
                <SmartImage
                  src={partner.portrait}
                  alt={`${partner.name}, ${partner.role}`}
                  sizes="(min-width:1024px) 460px, 90vw"
                  quality={78}
                  className="grayscale-[0.15]"
                />
              ) : (
                <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(60% 50% at 50% 38%, rgba(169,195,217,0.16), transparent 70%)",
                    }}
                  />
                  <span className="t-numeral relative text-[clamp(96px,14vw,168px)] text-white/[0.12]">
                    {initials}
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-ink/85 to-transparent" />
              <span
                className={clsx(
                  "absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-bg-ink/60 px-3 py-1.5 t-meta text-[10px] backdrop-blur-sm",
                  styles.iceText,
                )}
              >
                <span aria-hidden="true" className={styles.iceDot} />
                Finland
              </span>
            </div>
            <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-t border-line-dark pt-4">
              <span className="font-display text-[20px] font-medium tracking-[-0.02em]">{partner.name}</span>
              <span className="t-meta text-[10px] text-white/55">{partner.title}</span>
            </figcaption>
          </figure>
        </Reveal>

        {/* ------------------------------------------------ Copy (first on mobile) */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">Finland presence</span>
            <h2 id="fi-partner-heading" className="t-h2 mt-5">
              Technical expertise,
              <br />
              <span className="t-italic accent-grad-text">closer to the client.</span>
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <div className="mt-10 border-t border-line-dark pt-8">
              <h3 className="t-h3">{partner.name}</h3>
              <p className={clsx("t-meta mt-3", styles.iceText)}>{partner.role}</p>
              <p className="mt-1 text-[15px] text-white/70">{partner.title}</p>
              <p className="t-body mt-6 max-w-[56ch] text-white/75">{partner.bio}</p>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Areas of expertise">
              {partner.capabilities.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-line-dark px-3.5 py-1.5 text-[13px] text-white/80"
                >
                  {c}
                </li>
              ))}
            </ul>

            <p className="t-lead mt-10 max-w-[52ch] text-white/70">
              Uniix&apos;s Finland-side technical presence helps bridge client
              requirements, product thinking and engineering — while our
              multidisciplinary delivery team operates internationally.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/contact/" className="btn btn-light group">
                Talk to our team <span className="cta-arrow">↗</span>
              </Link>
              {partner.profileUrl && (
                <a href={partner.profileUrl} target="_blank" rel="noopener noreferrer" className="link-cta">
                  View profile <span className="cta-arrow">↗</span>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
