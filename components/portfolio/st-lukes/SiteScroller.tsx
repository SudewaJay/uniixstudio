"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { BrowserFrame } from "./Frames";

type Page = { id: string; label: string; url: string; src: string; w: number; h: number };

/**
 * Full-length captures of the live site inside a browser window. Scroll inside
 * the frame, or switch pages; a progress rail shows how far down you are.
 */
export default function SiteScroller({ pages }: { pages: Page[] }) {
  const [id, setId] = useState(pages[0].id);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const page = pages.find((p) => p.id === id)!;

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
    setProgress(0);
  }, [id]);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);
  };

  return (
    <div>
      <div role="group" aria-label="Page to scroll" className="mb-5 flex flex-wrap justify-center gap-2">
        {pages.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={p.id === id}
            onClick={() => setId(p.id)}
            className={clsx(
              "min-h-[40px] rounded-full border px-4 text-[13px] transition-colors duration-micro",
              p.id === id ? "border-white bg-white text-ink" : "border-white/20 text-white/70 hover:border-white/50",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="relative mx-auto max-w-[1000px]">
        <BrowserFrame url={page.url}>
          <div
            ref={ref}
            onScroll={onScroll}
            tabIndex={0}
            aria-label={`${page.label}, full-length capture of the live page. Scroll to explore.`}
            className="h-[min(70vh,620px)] overflow-y-auto overscroll-contain bg-white [scrollbar-width:thin] focus-visible:outline-none"
          >
            <Image
              key={page.src}
              src={page.src}
              alt={`Full-length capture of ${page.url}`}
              width={page.w}
              height={page.h}
              sizes="(min-width:1040px) 1000px, 100vw"
              className="block h-auto w-full"
            />
          </div>
        </BrowserFrame>
        {/* Progress rail */}
        <div aria-hidden="true" className="absolute -right-4 top-12 bottom-0 hidden w-[3px] rounded-full bg-white/10 md:block">
          <span className="block w-full rounded-full bg-[#58B330]" style={{ height: `${Math.max(4, progress * 100)}%` }} />
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[10px] tracking-[0.2em] uppercase text-white/45">Scroll inside the window</p>
    </div>
  );
}
