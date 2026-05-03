import Reveal from "./Reveal";

const STATS = [
  {
    value: "4+",
    label: "Years building",
    desc: "Selected since 2022 across Sri Lanka, Australia, and the UK.",
  },
  {
    value: "50+",
    label: "Projects shipped",
    desc: "Branding, web, and growth — from launch-stage founders to enterprise.",
  },
  {
    value: "30+",
    label: "Clients served",
    desc: "Founders, marketing teams, and operators across 8 industries.",
  },
  {
    value: "92%",
    label: "Client retention",
    desc: "Most clients return for a second engagement, then a third.",
  },
];

export default function StatsBar() {
  return (
    <section className="bg-bg-paper border-y border-line-soft py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-mute">
              By the numbers
            </span>
            <span className="flex-1 h-px bg-line" />
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="flex flex-col">
                <div
                  className="font-display font-medium leading-none tracking-[-0.03em] gradient-text"
                  style={{ fontSize: "clamp(56px,7vw,96px)" }}
                >
                  {s.value}
                </div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-2 mt-5">
                  {s.label}
                </div>
                <p className="text-[14px] leading-[1.55] text-ink-2 mt-3 max-w-[28ch]">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
