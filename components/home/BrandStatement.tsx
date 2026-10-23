import { clientLogos } from "@/lib/content";
import SmartImage from "../ui/SmartImage";
import Reveal from "../Reveal";
import WorkCarousel from "./WorkCarousel";

/**
 * Section 02 — the dark bridge between the hero and the pillars.
 *
 * The previous dark band was a logo strip acting purely as a separator. It now
 * carries the studio's positioning statement first and uses the client logos as
 * the evidence beneath it, so the colour shift earns its place.
 *
 * The colour logos are static artwork (lib/content `clientLogos`); the CMS
 * client logos are mono marks made for the old inverted dark strip.
 */
export default function BrandStatement({ trustLine }: { trustLine?: string }) {
  return (
    <>
    <section id="brand-statement" className="on-dark relative overflow-hidden bg-bg-ink text-white section-tight">
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
          <p className="mx-auto text-center font-display font-medium leading-[1.05] tracking-[-0.03em] text-[clamp(22px,6.2vw,76px)]">
            <span className="block whitespace-nowrap">
              Design <span className="accent font-normal t-italic">×</span> Technology{" "}
              <span className="accent font-normal t-italic">×</span> Growth
            </span>
            <span className="block text-white/45">— under one roof.</span>
          </p>
        </Reveal>
      </div>

      <Reveal delay={1} className="relative mt-12 md:mt-16">
        <WorkCarousel />
      </Reveal>
    </section>

    {/*
      Evidence — real client marks, in full colour. They sit on a light band
      rather than the ink one: several marks use navy or black type that would
      disappear on a dark background.

      Full-bleed marquee. The list is rendered twice and the track slides by
      exactly half its width, so the loop is seamless. The second copy is
      hidden from assistive tech.
    */}
    <section aria-label="Clients" className="bg-bg py-12 md:py-16 border-b border-line">
      <div className="wrap">
        <Reveal>
          <p className="t-meta text-ink-mute text-center">
            {trustLine ?? "Trusted by ambitious teams across Colombo, Sydney & the UK"}
          </p>
        </Reveal>
      </div>

      <div className="logo-marquee relative mt-9 md:mt-10">
        <ul className="logo-marquee-track items-center">
          {[...clientLogos, ...clientLogos].map((c, i) => {
            const duplicate = i >= clientLogos.length;
            return (
              <li
                key={`${c.name}-${i}`}
                aria-hidden={duplicate || undefined}
                className="mr-[55px] md:mr-[71px]"
              >
                <div className="relative h-14 w-32 md:h-16 md:w-40">
                  <SmartImage
                    src={c.logo}
                    alt={duplicate ? "" : c.name}
                    sizes="(min-width:768px) 160px, 128px"
                    fit="contain"
                    quality={85}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
    </>
  );
}
