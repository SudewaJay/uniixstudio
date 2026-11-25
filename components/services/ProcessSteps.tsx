import Reveal from "@/components/Reveal";
import type { ProcessStage } from "@/lib/cms/content";

/**
 * The four stages as one horizontal line: big numerals sit on a rule that
 * runs across the page, so the process reads left to right like a schedule.
 * Stacks into a vertical list on small screens.
 */
export default function ProcessSteps({ stages }: { stages: ProcessStage[] }) {
  return (
    <section id="process" aria-labelledby="process-title" className="bg-bg-paper py-24 md:py-32">
      <div className="wrap-wide">
        <h2
          id="process-title"
          className="font-display font-medium leading-[0.9] tracking-[-0.05em] text-ink text-[clamp(44px,6.6vw,112px)]"
        >
          How a project runs
        </h2>

        <ol className="mt-16 grid gap-y-12 md:mt-24 md:grid-cols-4 md:gap-x-0">
          {stages.map((s, i) => (
            <li key={s.num} className="relative border-t border-ink/20 pt-8 md:pr-8">
              <Reveal delay={(i % 4) as 0 | 1 | 2 | 3}>
                <span aria-hidden="true" className="absolute -top-[5px] left-0 size-[9px] rounded-full bg-brand-3" />
                <span className="block font-display font-medium leading-[0.8] tracking-[-0.06em] text-brand-ink text-[clamp(64px,7vw,112px)]">
                  {s.num}
                </span>
                <h3 className="mt-6 font-display text-[clamp(22px,2vw,30px)] font-medium leading-[1.05] tracking-[-0.03em] text-ink">
                  <span className="sr-only">Stage {s.num}: </span>
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-[15.5px] leading-[1.6] text-ink-2">{s.desc}</p>
                {s.deliverables.length > 0 && (
                  <ul className="mt-5 flex flex-col gap-1.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
