import { testimonials } from "@/lib/content";
import Reveal from "./Reveal";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-ink py-24 sm:py-32 relative overflow-hidden"
    >
      {/* Atmospheric brand glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(45% 50% at 80% 20%, rgba(232,98,26,0.18), transparent 70%), radial-gradient(40% 50% at 10% 90%, rgba(248,200,74,0.10), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Reveal>
            <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-brand-4 mb-5">
              <span className="w-10 h-px bg-brand-4" />
              Client stories
            </span>
            <h2
              className="font-display font-medium text-white tracking-[-0.025em]"
              style={{ fontSize: "clamp(40px,5vw,64px)", lineHeight: 1.05 }}
            >
              Don&apos;t take{" "}
              <span className="italic-display gradient-text">
                our word for it.
              </span>
            </h2>
            <p className="mt-5 text-[17px] leading-[1.6] text-white/70 max-w-[52ch]">
              Real results from founders and operators we&apos;ve shipped work
              with — from Colombo retail brands to Sydney-based startups.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 border-t border-white/10 pt-12 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i as 0 | 1 | 2}>
              <article className="group flex flex-col items-start justify-between h-full">
                {/* Top meta — year + project chip */}
                <div className="flex items-center gap-x-4 text-xs">
                  <time className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/55">
                    {t.year}
                  </time>
                  <span className="relative z-10 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm px-3 py-1.5 font-medium text-white/80 text-[11px] tracking-wide hover:bg-white/10 transition-colors">
                    {t.project}
                  </span>
                </div>

                {/* Headline + quote */}
                <div className="relative grow">
                  <h3 className="mt-5 font-display font-medium text-white text-[22px] md:text-[24px] leading-[1.2] tracking-[-0.015em] group-hover:text-white transition-colors">
                    {t.headline}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.65] text-white/65">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <div className="relative mt-8 flex items-center gap-x-4 pt-6 border-t border-white/10 w-full">
                  <div className="size-11 rounded-full bg-brand-grad text-white grid place-items-center font-display font-semibold text-[17px] flex-shrink-0">
                    {t.initial}
                  </div>
                  <div className="text-sm/6">
                    <p className="font-semibold text-white text-[14px]">
                      {t.name}
                    </p>
                    <p className="text-white/55 text-[12.5px] mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
