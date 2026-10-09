import clsx from "clsx";
import SmartImage from "@/components/ui/SmartImage";

/**
 * Device frames for the CricBook case study. Pure markup — no hooks — so they
 * render on the server and inside client sections alike. Every frame sizes its
 * image box from an aspect ratio, so nothing shifts while images load.
 */

export function BrowserFrame({
  src,
  alt,
  url = "cricbook.lk",
  sizes,
  ratio = "16/10",
  priority,
  tone = "light",
  className,
  position = "top",
}: {
  src: string;
  alt: string;
  url?: string;
  sizes: string;
  ratio?: string;
  priority?: boolean;
  tone?: "light" | "dark";
  className?: string;
  position?: string;
}) {
  const dark = tone === "dark";
  return (
    <figure
      className={clsx(
        "overflow-hidden rounded-[14px] md:rounded-[18px] border shadow-lift",
        dark ? "bg-[#100C2A] border-white/10" : "bg-white border-black/10",
        className,
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-3 px-3 md:px-4 h-8 md:h-10 border-b",
          dark ? "border-white/10" : "border-black/[.07] bg-[#F7F6FA]",
        )}
        aria-hidden="true"
      >
        <span className="flex gap-1.5">
          <i className="block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FF5F57]" />
          <i className="block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FEBC2E]" />
          <i className="block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span
          className={clsx(
            "mx-auto max-w-[60%] truncate rounded-md px-3 py-0.5 font-mono text-[9px] md:text-[11px] tracking-[0.02em]",
            dark ? "bg-white/[.06] text-white/55" : "bg-black/[.05] text-ink-mute",
          )}
        >
          {url}
        </span>
        <span className="w-10 md:w-12" />
      </div>
      <div className="relative w-full" style={{ aspectRatio: ratio }}>
        <SmartImage src={src} alt={alt} sizes={sizes} priority={priority} position={position} />
      </div>
    </figure>
  );
}

export function PhoneFrame({
  src,
  alt,
  sizes = "(min-width:1024px) 280px, 60vw",
  priority,
  className,
  position = "top",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  position?: string;
}) {
  return (
    <figure
      className={clsx(
        "relative rounded-[18%/8.4%] bg-[#0B0920] p-[3.2%] shadow-lift ring-1 ring-black/20",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[15%/7%] bg-white" style={{ aspectRatio: "390/844" }}>
        <SmartImage src={src} alt={alt} sizes={sizes} priority={priority} position={position} quality={80} />
        {/* Dynamic island */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[1.6%] h-[3.4%] w-[30%] -translate-x-1/2 rounded-full bg-[#0B0920]"
        />
      </div>
    </figure>
  );
}

export function TabletFrame({
  src,
  alt,
  sizes = "(min-width:1024px) 420px, 70vw",
  className,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure
      className={clsx(
        "relative rounded-[6%/4.4%] bg-[#0B0920] p-[3%] shadow-lift ring-1 ring-black/20",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[3.2%/2.3%] bg-white" style={{ aspectRatio: "1200/1727" }}>
        <SmartImage src={src} alt={alt} sizes={sizes} position="top" />
      </div>
    </figure>
  );
}

/** Section kicker in the Uniix eyebrow style, with an optional index. */
export function Kicker({ index, children, dark }: { index?: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={clsx("eyebrow", dark && "!text-white/60")}>
      {index && <span className={dark ? "text-[#22E0A0]" : "text-brand-ink"}>{index}</span>}
      {children}
    </p>
  );
}
