import type { ReactNode } from "react";
import { LOGO_VIEWBOX, MEDIA_GRADIENT, logoPaths } from "./paths";
import type { AnatomyPartId } from "./data";

type Part = "c1" | "c2" | "m" | "wordmark" | "media";

const PART_GROUPS: Record<AnatomyPartId, Part[]> = {
  all: ["c1", "c2", "m", "wordmark", "media"],
  cs: ["c1", "c2"],
  m: ["m"],
  wordmark: ["wordmark"],
  media: ["media"],
};

/**
 * Renders the Cinecraft Media lock-up from its original vector outlines.
 * `tone` swaps between the supplied black and white versions (the MEDIA
 * gradient fades to that tone exactly as in the source files). `highlight`
 * dims every part outside the chosen group; `viewBox` crops to a region of
 * the 752 × 453 artwork without rescaling it unevenly.
 */
export default function LogoArt({
  id,
  tone = "black",
  highlight = "all",
  viewBox = `0 0 ${LOGO_VIEWBOX.w} ${LOGO_VIEWBOX.h}`,
  title,
  className,
  children,
}: {
  /** Unique per instance: scopes the gradient id. */
  id: string;
  tone?: "black" | "white";
  highlight?: AnatomyPartId;
  viewBox?: string;
  /** Accessible name. Omit to mark the drawing decorative. */
  title?: string;
  className?: string;
  /** Annotation layers drawn in the artwork's own coordinate space. */
  children?: ReactNode;
}) {
  const fill = tone === "black" ? "#000000" : "#FFFFFF";
  const active = new Set(PART_GROUPS[highlight]);
  const style = (p: Part) => ({
    opacity: active.has(p) ? 1 : 0.1,
    transition: "opacity 420ms cubic-bezier(.22,.61,.36,1)",
  });
  const grad = `${id}-media`;

  return (
    <svg
      viewBox={viewBox}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id={grad}
          x1={MEDIA_GRADIENT.x}
          y1={MEDIA_GRADIENT.y1}
          x2={MEDIA_GRADIENT.x}
          y2={MEDIA_GRADIENT.y2}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={MEDIA_GRADIENT.gold} />
          <stop offset="1" stopColor={fill} />
        </linearGradient>
      </defs>
      <g fill={fill} style={style("wordmark")}>
        {logoPaths.wordmark.map((d) => (
          <path key={d.slice(0, 24)} d={d} />
        ))}
      </g>
      <g fill={`url(#${grad})`} style={style("media")}>
        {logoPaths.media.map((d) => (
          <path key={d.slice(0, 24)} d={d} />
        ))}
      </g>
      <path d={logoPaths.m} fill={fill} style={style("m")} />
      <path d={logoPaths.c1} fill={fill} style={style("c1")} />
      <path d={logoPaths.c2} fill={fill} style={style("c2")} />
      {children}
    </svg>
  );
}
