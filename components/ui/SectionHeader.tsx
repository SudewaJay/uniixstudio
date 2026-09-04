import type { ReactNode } from "react";
import clsx from "clsx";
import Reveal from "../Reveal";

/**
 * The one section-header component.
 *
 * Deliberately supports three *compositions* rather than one, so sections can
 * differ in rhythm without each re-inventing its own markup:
 *   - "split"   headline left, support copy right (default, desktop)
 *   - "stacked" headline over support copy, left aligned
 *   - "center"  centred — reserved for the final CTA
 *
 * The eyebrow/headline/support typography stays identical across all three so
 * the page still reads as one system.
 */
export default function SectionHeader({
  eyebrow,
  title,
  support,
  action,
  layout = "split",
  className,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: ReactNode;
  support?: ReactNode;
  action?: ReactNode;
  layout?: "split" | "stacked" | "center";
  className?: string;
  as?: "h2" | "h3";
}) {
  const heading = (
    <>
      <span className="eyebrow">{eyebrow}</span>
      <Tag className={clsx("t-h2", "mt-5")}>{title}</Tag>
    </>
  );

  if (layout === "center") {
    return (
      <div className={clsx("text-center flex flex-col items-center", className)}>
        <Reveal>{heading}</Reveal>
        {support && (
          <Reveal delay={1}>
            <p className="t-lead mt-6 max-w-[54ch] mx-auto opacity-80">{support}</p>
          </Reveal>
        )}
        {action && (
          <Reveal delay={2}>
            <div className="mt-9">{action}</div>
          </Reveal>
        )}
      </div>
    );
  }

  if (layout === "stacked") {
    return (
      <div className={clsx("max-w-[46ch]", className)}>
        <Reveal>{heading}</Reveal>
        {support && (
          <Reveal delay={1}>
            <p className="t-lead mt-6 opacity-80">{support}</p>
          </Reveal>
        )}
        {action && (
          <Reveal delay={2}>
            <div className="mt-8">{action}</div>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)] lg:gap-16 lg:items-end",
        className,
      )}
    >
      <Reveal>{heading}</Reveal>
      {(support || action) && (
        <Reveal delay={1}>
          {support && <p className="t-lead opacity-80 max-w-[42ch]">{support}</p>}
          {action && <div className={clsx(support && "mt-7")}>{action}</div>}
        </Reveal>
      )}
    </div>
  );
}
