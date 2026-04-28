import { projects } from "@/lib/content";
import Reveal from "./Reveal";

export default function WorkGrid({ limit }: { limit?: number }) {
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
      {items.map((p, i) => (
        <Reveal
          key={p.slug}
          delay={(i % 3) as 0 | 1 | 2}
          className={`work-card group cursor-pointer ${
            p.feature ? "md:col-span-2" : ""
          }`}
        >
          <div
            className={`relative rounded-DEFAULT overflow-hidden flex items-end p-8 text-white transition-transform duration-700 group-hover:-translate-y-2 bg-gradient-to-br ${p.bg}`}
            style={{
              aspectRatio: p.feature ? "16/10" : "4/3",
            }}
          >
            <span
              className={`absolute inset-0 grid place-items-center pointer-events-none ${p.bigClass}`}
              style={{
                fontSize: p.feature
                  ? "clamp(80px,12vw,180px)"
                  : "clamp(100px,14vw,220px)",
              }}
              aria-hidden
            >
              {p.bigText}
            </span>

            <div className="relative z-[2] w-full flex justify-between items-end gap-4">
              <div>
                <span className="inline-block px-3 py-1.5 bg-white/12 backdrop-blur-md border border-white/[0.18] rounded-full font-mono text-[10px] tracking-[0.12em] uppercase mb-2.5">
                  {p.overline}
                </span>
                <h3
                  className="font-display font-medium leading-[1.1]"
                  style={{
                    fontSize: "clamp(22px,2.4vw,32px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {p.headline}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-white text-ink grid place-items-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="w-[18px] h-[18px]"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-between gap-6 items-start">
            <div>
              <div
                className="font-display font-medium"
                style={{
                  fontSize: "22px",
                  letterSpacing: "-0.015em",
                  marginBottom: "6px",
                }}
              >
                {p.title}
              </div>
              <div className="text-sm text-ink-mute leading-[1.55] max-w-[60ch]">
                {p.summary}
              </div>
            </div>
            <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-brand-4 whitespace-nowrap pt-1.5">
              {p.year} · {p.overline.split(" ")[0]}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
