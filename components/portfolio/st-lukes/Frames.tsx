import clsx from "clsx";
import SmartImage from "@/components/ui/SmartImage";

/** Desktop browser chrome around a 16:10 live-site screenshot. */
export function BrowserFrame({
  src,
  alt,
  url,
  sizes,
  priority,
  className,
  children,
}: {
  src?: string;
  alt?: string;
  url: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[14px] border border-black/10 bg-white shadow-[0_40px_80px_-30px_rgba(15,23,42,.45)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-black/[0.07] bg-[#F3F4F6] px-3.5 py-2.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-white px-3 py-1 text-center font-mono text-[11px] text-ink-mute">
          {url}
        </span>
      </div>
      {children ?? (
        <div className="relative aspect-[16/10] bg-[#F4FBF0]">
          <SmartImage src={src!} alt={alt ?? ""} sizes={sizes ?? "(min-width:1024px) 60vw, 100vw"} priority={priority} fit="cover" position="top" />
        </div>
      )}
    </div>
  );
}

/** Phone bezel around a 390×844 mobile screenshot. */
export function PhoneFrame({
  src,
  alt,
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-[34px] bg-[#0F172A] p-[7px] shadow-[0_40px_70px_-25px_rgba(15,23,42,.6)] ring-1 ring-white/10",
        className,
      )}
    >
      <div className="relative aspect-[390/844] overflow-hidden rounded-[27px] bg-white">
        <SmartImage src={src} alt={alt} sizes={sizes ?? "260px"} priority={priority} fit="cover" position="top" />
        <span aria-hidden="true" className="absolute left-1/2 top-2 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-[#0F172A]" />
      </div>
    </div>
  );
}
