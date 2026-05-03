import Link from "next/link";
import { services } from "@/lib/content";
import { getServicesForPillar, type ServicePillar } from "@/lib/services";
import Reveal from "./Reveal";

export default function ServicesSection({
  showHead = true,
}: {
  showHead?: boolean;
}) {
  return (
    <section
      id="services"
      className="bg-bg-paper border-y border-line-soft py-24 md:py-32 relative"
    >
      <div className="wrap">
        {showHead && (
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end mb-16 lg:mb-20">
            <Reveal>
              <span className="eyebrow">What we do</span>
              <h2
                className="display mt-4"
                style={{ fontSize: "clamp(44px,6.5vw,88px)" }}
              >
                Three pillars.
                <br />
                <span className="italic-display gradient-text">
                  One creative partner.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="text-[clamp(17px,1.4vw,20px)] text-ink-2 max-w-[42ch] leading-[1.55]">
                Most agencies bolt services together. We unify Design, Growth and
                Technology under one strategic team — so your brand, site and
                marketing all pull in the same direction.
              </p>
            </Reveal>
          </div>
        )}

        <div className="grid lg:grid-cols-[1.3fr_1fr_1fr] gap-5 lg:gap-6">
          {services.map((s, i) => {
            const isDesign = s.slug === "design";
            const isGrowth = s.slug === "growth";
            const isTech = s.slug === "technology";

            return (
              <Reveal key={s.slug} delay={i as 0 | 1 | 2} className="h-full">
                <article
                  id={s.slug}
                  className={`service-card relative rounded-lg2 p-10 md:p-12 h-full flex flex-col overflow-hidden border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft cursor-default scroll-mt-28 ${
                    isDesign
                      ? "bg-brand-grad text-white border-transparent"
                      : isGrowth
                      ? "bg-bg-warm text-ink border-line"
                      : "bg-bg-ink text-white border-transparent"
                  }`}
                >
                  {isDesign && (
                    <div
                      className="absolute pointer-events-none"
                      style={{
                        top: "-40%",
                        right: "-30%",
                        width: "80%",
                        height: "140%",
                        background:
                          "radial-gradient(closest-side, rgba(255,255,255,.22), transparent)",
                      }}
                    />
                  )}
                  {isTech && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 10% 100%, rgba(248,200,74,.18), transparent 50%), radial-gradient(circle at 90% 0%, rgba(232,98,26,.12), transparent 50%)",
                      }}
                    />
                  )}

                  <div className="relative z-[2]">
                    <div className="flex justify-between items-start">
                      <div
                        className={`w-16 h-16 rounded-[18px] grid place-items-center ${
                          isGrowth
                            ? "bg-white shadow-sm2"
                            : "bg-white/[0.18] backdrop-blur-md"
                        }`}
                      >
                        <ServiceIcon slug={s.slug} growthColor={isGrowth} />
                      </div>
                      <span
                        className={`font-mono text-[11px] tracking-[0.18em] ${
                          isGrowth ? "text-ink-mute" : "opacity-70"
                        }`}
                      >
                        {s.num} / {s.title.toUpperCase()}
                      </span>
                    </div>

                    <h3
                      className="display mt-6 mb-4"
                      style={{
                        fontSize: "clamp(40px,4vw,56px)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.title === "Design" && (
                        <>
                          Design that
                          <br />
                          <em className="italic-display">moves</em> people.
                        </>
                      )}
                      {s.title === "Growth" && (
                        <>
                          Growth driven
                          <br />
                          by{" "}
                          <em className="italic-display gradient-text">
                            data.
                          </em>
                        </>
                      )}
                      {s.title === "Technology" && (
                        <>
                          Tech built
                          <br />
                          to{" "}
                          <em
                            className="italic-display"
                            style={{ color: "#F8C84A" }}
                          >
                            scale.
                          </em>
                        </>
                      )}
                    </h3>

                    <p
                      className={`text-[15px] leading-[1.55] max-w-[38ch] mb-7 ${
                        isGrowth ? "text-ink-2" : "text-white/88"
                      }`}
                    >
                      {s.positioning}
                    </p>
                  </div>

                  {/* Sub-service deep links — Masterplan §2.5 internal-link requirement */}
                  <ul
                    className={`service-list relative z-[2] list-none flex flex-col border-t mt-auto ${
                      isGrowth ? "border-line" : "border-white/[0.18]"
                    }`}
                  >
                    {getServicesForPillar(s.slug as ServicePillar).map((sub) => (
                      <li
                        key={sub.slug}
                        className={
                          isGrowth ? "border-line" : "border-white/[0.18]"
                        }
                        style={{ letterSpacing: "-0.005em" }}
                      >
                        <Link
                          href={`/services/${sub.pillar}/${sub.slug}/`}
                          className={`block w-full ${
                            isGrowth
                              ? "text-ink hover:text-brand-4"
                              : "text-white hover:text-white/100"
                          } transition-colors`}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                    <li
                      className={`pt-3 ${
                        isGrowth ? "border-line" : "border-white/[0.18]"
                      }`}
                    >
                      <Link
                        href={`/services/${s.slug}/`}
                        className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase ${
                          isGrowth
                            ? "text-brand-4 hover:text-brand-3"
                            : "text-white/85 hover:text-white"
                        } transition-colors`}
                      >
                        Explore {s.title.toLowerCase()}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({
  slug,
  growthColor,
}: {
  slug: string;
  growthColor: boolean;
}) {
  const stroke = growthColor ? "#E8621A" : "currentColor";
  if (slug === "design") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[30px] h-[30px]"
      >
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="10.5" r="2.5" />
        <circle cx="8.5" cy="7.5" r="2.5" />
        <circle cx="6.5" cy="12.5" r="2.5" />
        <path d="M12 22a10 10 0 0 1 0-20c5.5 0 10 4.5 9 9.5 0 2-1.5 3.5-3.5 3.5h-2c-1.5 0-2.5 1-2.5 2.5C13 19 13.5 22 12 22Z" />
      </svg>
    );
  }
  if (slug === "growth") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[30px] h-[30px]"
      >
        <polyline points="3 17 9 11 13 15 21 7" />
        <polyline points="14 7 21 7 21 14" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-[30px] h-[30px]"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
