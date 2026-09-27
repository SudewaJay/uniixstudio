import Link from "next/link";
import clsx from "clsx";
import Reveal from "../Reveal";
import SmartImage from "../ui/SmartImage";
import LocalClock from "./LocalClock";
import {
  finlandImages,
  finlandPartner as partner,
  finlandPresence,
  isFinlandPlaceholder,
} from "@/lib/finland";
import styles from "./finland.module.css";

/**
 * 10 — Finland presence. The only place the Finland story becomes prominent,
 * and it stays a credibility detail: one atmospheric frame, two short lists
 * joined by a hairline, and the technical partner. Copy makes no claim of a
 * Finnish office, company, employee or legal entity.
 */
export default function FinlandPresence() {
  const { finland, team } = finlandPresence;
  const initials = isFinlandPlaceholder(partner.name)
    ? "FI"
    : partner.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <section id="finland" aria-labelledby="fi-presence-heading" className="on-dark relative overflow-hidden bg-bg-ink text-white">
      {/* Atmospheric frame — cold daylight, a lot of quiet. */}
      <div className="relative h-[34svh] min-h-[240px] md:h-[42svh]">
        <div aria-hidden="true" className={clsx(styles.parallax, "absolute inset-x-0 -top-[10%] h-[120%]")}>
          <SmartImage src={finlandImages.frozenLake.src} alt="" sizes="100vw" quality={60} position={finlandImages.frozenLake.position} className={styles.photoCold} />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-bg-ink/40 via-transparent to-bg-ink" />
        <div aria-hidden="true" className={clsx(styles.grain, "absolute inset-0")} />
      </div>

      <div className="wrap relative -mt-20 pb-20 md:-mt-28 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,40%)] lg:items-end lg:gap-16">
          <Reveal>
            <span className="eyebrow">Finland</span>
            <h2 id="fi-presence-heading" className="t-h2 mt-5 max-w-[16ch]">
              Now working with ambitious{" "}
              <span className="t-italic accent-grad-text">businesses in Finland.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead max-w-[46ch] text-white/75">
              Uniix is extending its international client work into Finland,
              bringing together strong design, product and engineering
              capabilities with Finland-side technical collaboration.
            </p>
          </Reveal>
        </div>

        {/* Two lists, one hairline between them */}
        <Reveal delay={1}>
          <div className="mt-14 grid gap-8 md:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)] md:items-start md:gap-0">
            <PlaceList label={finland.label} tz={finland.timeZone} items={finland.items} tone="fi" />
            <div aria-hidden="true" className="flex items-center justify-center md:h-full md:pt-3">
              <span className={styles.bridgeTrack}>
                <span className={styles.bridgePulse} />
              </span>
            </div>
            <PlaceList label={team.label} tz={team.timeZone} items={team.items} tone="team" />
          </div>
        </Reveal>

        {/* Technical partner */}
        <Reveal delay={2}>
          <div className="mt-16 grid gap-8 rounded-xl2 border border-line-dark bg-bg-ink-2/80 p-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10 md:p-8">
            <div className="relative aspect-[4/5] w-full max-w-[180px] overflow-hidden rounded-lg2 bg-bg-ink">
              {partner.portrait ? (
                <SmartImage src={partner.portrait} alt={`${partner.name}, ${partner.role}`} sizes="180px" quality={78} />
              ) : (
                <span aria-hidden="true" className="t-numeral absolute inset-0 grid place-items-center text-[64px] text-white/[0.14]">
                  {initials}
                </span>
              )}
              <span className={clsx("absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-bg-ink/70 px-2.5 py-1 t-meta text-[9px] backdrop-blur-sm", styles.iceText)}>
                <span aria-hidden="true" className={styles.iceDot} /> Finland
              </span>
            </div>
            <div>
              <p className={clsx("t-meta text-[10px]", styles.iceText)}>{partner.role}</p>
              <h3 className="t-h3 mt-2">{partner.name}</h3>
              <p className="mt-1 text-[14px] text-white/65">{partner.title}</p>
              <p className="t-body mt-4 max-w-[60ch] text-white/75">{partner.bio}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Areas of expertise">
                {partner.capabilities.map((c) => (
                  <li key={c} className="rounded-full border border-line-dark px-3 py-1 text-[12.5px] text-white/80">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link href="/contact/" className="btn btn-light btn-sm group">
                  Talk to our team <span className="cta-arrow">↗</span>
                </Link>
                {partner.profileUrl && (
                  <a href={partner.profileUrl} target="_blank" rel="noopener noreferrer" className="link-cta">
                    View profile <span className="cta-arrow">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlaceList({ label, tz, items, tone }: { label: string; tz: string; items: string[]; tone: "fi" | "team" }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b border-line-dark pb-3">
        <h3 className={clsx("t-meta", tone === "fi" ? styles.iceText : "text-brand-2")}>{label}</h3>
        <span className="t-meta text-[10px] text-white/45">
          <LocalClock timeZone={tz} />
        </span>
      </div>
      <ul className="mt-2">
        {items.map((it) => (
          <li key={it} className="border-b border-line-dark-soft py-3 text-[15px] text-white/85">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
