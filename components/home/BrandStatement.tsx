import { clients } from "@/lib/content";
import SmartImage from "../ui/SmartImage";
import Reveal from "../Reveal";

/**
 * Section 02 — the dark bridge between the hero and the pillars.
 *
 * The previous dark band was a logo strip acting purely as a separator. It now
 * carries the studio's positioning statement first and uses the client logos as
 * the evidence beneath it, so the colour shift earns its place.
 */
export default function BrandStatement() {
  return (
    <section className="on-dark relative overflow-hidden bg-bg-ink text-white section-tight">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(42% 58% at 84% 6%, rgba(232,98,26,0.20), transparent 70%), radial-gradient(40% 50% at 4% 96%, rgba(248,200,74,0.10), transparent 70%)",
        }}
      />

      <div className="wrap relative">
        <Reveal>
          <p className="font-display font-medium leading-[1.05] tracking-[-0.03em] text-[clamp(32px,5.6vw,76px)] max-w-[18ch]">
            Design <span className="accent font-normal t-italic">×</span> Technology{" "}
            <span className="accent font-normal t-italic">×</span> Growth —{" "}
            <span className="text-white/45">under one roof.</span>
          </p>
        </Reveal>

        <Reveal delay={1}>
          <p className="t-lead mt-8 max-w-[58ch] text-white/70">
            Most agencies bolt these together from three different teams. We run them as
            one, so your brand, your site and your marketing all pull in the same
            direction — and nothing gets lost in the handoff.
          </p>
        </Reveal>

        {/* Evidence — real client marks. */}
        <div className="mt-14 md:mt-20 border-t border-line-dark pt-10">
          <Reveal>
            <p className="t-meta text-white/45 text-center">
              Trusted by ambitious teams across Colombo, Sydney &amp; the UK
            </p>
          </Reveal>
          <ul className="mt-9 grid grid-cols-3 items-center gap-x-8 gap-y-9 sm:gap-x-12 lg:grid-cols-6">
            {clients.map((c, i) => (
              <Reveal key={c.name} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <li className="relative h-10 md:h-11">
                  {c.logo ? (
                    <SmartImage
                      src={c.logo}
                      alt={c.name}
                      sizes="(min-width:1024px) 140px, 28vw"
                      fit="contain"
                      className="opacity-70 transition-opacity duration-std ease-uniix hover:opacity-100 [filter:brightness(0)_invert(1)]"
                    />
                  ) : (
                    <span className="grid h-full place-items-center text-white/70 text-[26px] leading-none">
                      {c.name}
                    </span>
                  )}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
