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

        <div className="mx-auto mt-12 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-12 lg:mx-0 lg:max-w-none lg:grid-cols-5 lg:gap-x-16">
          {clients.map((c, i) => (
            <Reveal
              key={c.name}
              delay={(i % 4) as 0 | 1 | 2 | 3}
              className={
                i === 3
                  ? "col-span-2 sm:col-start-2 lg:col-span-1 lg:col-start-auto"
                  : i === 4
                  ? "col-span-2 col-start-2 sm:col-start-auto lg:col-span-1"
                  : "col-span-2 lg:col-span-1"
              }
            >
              <div
                className={`${c.style} text-center text-white/70 text-[28px] md:text-[30px] lg:text-[32px] leading-none transition-all duration-500 hover:text-white hover:scale-[1.04] cursor-default select-none`}
              >
                {c.name}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
