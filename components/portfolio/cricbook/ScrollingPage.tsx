import NextImage from "next/image";

/**
 * A browser window holding the full CricBook homepage. On a fine pointer the
 * page glides from hero to footer on hover/focus (pure CSS — nothing runs
 * until asked); on touch the window is simply scrollable.
 *
 * Travel = 1 − (frame height ÷ page height): 16:10 frame over a 1200×7417 page.
 */
export default function ScrollingPage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="overflow-hidden rounded-[14px] md:rounded-[20px] border border-black/10 bg-white shadow-lift">
      <div className="flex items-center gap-3 px-4 h-10 border-b border-black/[.07] bg-[#F7F6FA]" aria-hidden="true">
        <span className="flex gap-1.5">
          <i className="block w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <i className="block w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <i className="block w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="mx-auto rounded-md bg-black/[.05] px-3 py-0.5 font-mono text-[11px] text-ink-mute">cricbook.lk</span>
        <span className="hidden sm:inline font-mono text-[10px] tracking-[0.16em] uppercase text-ink-mute">
          <span className="hidden [@media(pointer:fine)]:inline">Hover to scroll</span>
          <span className="[@media(pointer:fine)]:hidden">Scroll inside</span>
        </span>
      </div>
      <div
        tabIndex={0}
        aria-label="Full CricBook homepage — hover or focus to scroll through it"
        className="group relative aspect-[16/10] overflow-y-auto [@media(pointer:fine)]:overflow-hidden motion-reduce:!overflow-y-auto overscroll-contain focus-visible:outline-offset-[-4px]"
      >
        <NextImage
          src={src}
          alt={alt}
          width={1200}
          height={7417}
          sizes="(min-width:1280px) 1200px, 94vw"
          quality={70}
          loading="lazy"
          className="block h-auto w-full will-change-transform [@media(pointer:fine)]:transition-transform [@media(pointer:fine)]:duration-[14s] [@media(pointer:fine)]:ease-[cubic-bezier(.45,.05,.35,1)] [@media(pointer:fine)]:group-hover:-translate-y-[89.9%] [@media(pointer:fine)]:group-focus-visible:-translate-y-[89.9%] motion-reduce:!transform-none"
        />
      </div>
    </figure>
  );
}
