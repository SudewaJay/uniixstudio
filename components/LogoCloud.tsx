import { clients } from "@/lib/content";
import Reveal from "./Reveal";

export default function LogoCloud() {
  return (
    <section className="bg-ink py-20 sm:py-24 relative overflow-hidden">
      {/* Soft brand glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(40% 60% at 50% 50%, rgba(232,98,26,0.14), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <h2 className="text-center font-mono text-[11px] tracking-[0.24em] uppercase text-white/55">
            Trusted by ambitious teams across Colombo, Sydney &amp; the UK
          </h2>
        </Reveal>

        {/*
          6 clients → 2 cols on mobile, 3 cols on tablet, 6 cols on desktop.
          Logos are pattern-fill SVGs; we use filter:invert+brightness to
          force a pure white silhouette that reads cleanly on the dark bg.
        */}
        <div className="mx-auto mt-12 grid max-w-md grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-3xl sm:grid-cols-3 sm:gap-x-12 lg:max-w-none lg:grid-cols-6 lg:gap-x-10">
          {clients.map((c, i) => (
            <Reveal key={c.name} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div
                className="group flex items-center justify-center h-12 md:h-14"
                title={c.name}
              >
                {c.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={c.logo}
                    alt={c.name}
                    loading="lazy"
                    className="max-h-full w-auto object-contain opacity-65 group-hover:opacity-100 transition-opacity duration-500 select-none"
                    style={{
                      // Force any logo color → pure white silhouette so it
                      // reads on the dark background regardless of source.
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                ) : (
                  <span
                    className={`${c.style} text-center text-white/70 text-[28px] md:text-[30px] lg:text-[32px] leading-none transition-all duration-500 group-hover:text-white group-hover:scale-[1.04] cursor-default select-none`}
                  >
                    {c.name}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
