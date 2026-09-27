import type { ReactNode } from "react";
import clsx from "clsx";
import Reveal from "@/components/Reveal";

export type Tone = "light" | "warm" | "dark" | null | undefined;

export const toneClass = (tone: Tone) =>
  tone === "dark" ? "on-dark bg-bg-ink text-white" : tone === "warm" ? "bg-bg-warm" : "";

/** Section shell shared by every block — spacing and background from the design system. */
export function BlockSection({ tone, children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return <section className={clsx("section", toneClass(tone), className)}>{children}</section>;
}

/** Eyebrow + "heading *accent*" + intro — the site's standard section intro. */
export function BlockIntro({
  eyebrow,
  heading,
  headingAccent,
  intro,
  dark,
}: {
  eyebrow?: string | null;
  heading?: string | null;
  headingAccent?: string | null;
  intro?: string | null;
  dark?: boolean;
}) {
  if (!eyebrow && !heading && !intro) return null;
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:items-end mb-12 md:mb-16">
      <Reveal>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        {heading && (
          <h2 className="t-h2 mt-5">
            {heading}
            {headingAccent && (
              <>
                <br />
                <span className="t-italic accent-grad-text">{headingAccent}</span>
              </>
            )}
          </h2>
        )}
      </Reveal>
      {intro && (
        <Reveal delay={1}>
          <p className={clsx("t-lead", dark ? "text-white/70" : "text-ink-2")}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Markdown styling for CMS rich text inside blocks and legal pages. */
export const proseClass =
  "text-ink-2 text-[17px] leading-[1.7] [&_h2]:font-display [&_h2]:font-medium [&_h2]:text-ink [&_h2]:tracking-[-0.02em] [&_h2]:text-[clamp(26px,3vw,36px)] [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:font-medium [&_h3]:text-ink [&_h3]:text-[22px] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:mb-1.5 [&_a]:text-brand-ink [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-2 [&_blockquote]:border-brand-4 [&_blockquote]:pl-5 [&_blockquote]:italic [&_table]:w-full [&_table]:text-[15px] [&_th]:text-left [&_th]:border-b [&_th]:border-line [&_th]:py-2 [&_td]:border-b [&_td]:border-line-soft [&_td]:py-2 [&_strong]:text-ink";
