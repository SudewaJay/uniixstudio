"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Card data shape                                                    */
/* ------------------------------------------------------------------ */

export type AppleCard = {
  src: string;
  category: string;
  title: string;
  /** Rich modal content (rendered when card is clicked open) */
  content: ReactNode;
  /** Optional href — if present, modal also shows a "View" CTA pointing here */
  href?: string;
};

/* ------------------------------------------------------------------ */
/*  Carousel context — lets cards open the active modal               */
/* ------------------------------------------------------------------ */

type CarouselCtx = {
  onCardClose: (index: number) => void;
  currentIndex: number;
};

const CarouselContext = createContext<CarouselCtx>({
  onCardClose: () => {},
  currentIndex: 0,
});

/* ------------------------------------------------------------------ */
/*  Carousel — horizontal scroll with arrow buttons                   */
/* ------------------------------------------------------------------ */

export function Carousel({ items }: { items: ReactNode[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollability = useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
  }, []);

  useEffect(() => {
    checkScrollability();
  }, [checkScrollability]);

  const scrollByCard = (dir: "left" | "right") => {
    if (!carouselRef.current) return;
    // Card width + gap
    const card = carouselRef.current.querySelector<HTMLElement>("[data-aapcard]");
    const step = card ? card.offsetWidth + 24 : 360;
    carouselRef.current.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  const handleCardClose = (index: number) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.querySelectorAll<HTMLElement>("[data-aapcard]")[index];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          ref={carouselRef}
          onScroll={checkScrollability}
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-6 md:py-10 [scrollbar-width:none] [-ms-overflow-style:none]"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {/* WebKit scrollbar hide */}
          <style jsx>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>

          {/* Left padding so first card aligns with content margin */}
          <div className="flex flex-row gap-4 md:gap-6 pl-4 md:pl-[max(1rem,calc((100vw-1280px)/2))] pr-4 md:pr-[max(1rem,calc((100vw-1280px)/2))]">
            {items.map((item, idx) => (
              <div
                key={idx}
                data-aapcard
                style={{ scrollSnapAlign: "start" }}
                className="last:pr-[5%] md:last:pr-0"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Arrow controls — bottom-right, brand-styled */}
        <div className="flex items-center justify-end gap-2 px-4 md:px-[max(1rem,calc((100vw-1280px)/2))] mt-2">
          <button
            onClick={() => scrollByCard("left")}
            disabled={!canScrollLeft}
            aria-label="Previous card"
            className="grid place-items-center size-11 rounded-full border border-line bg-bg-paper hover:bg-bg-warm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => scrollByCard("right")}
            disabled={!canScrollRight}
            aria-label="Next card"
            className="grid place-items-center size-11 rounded-full border border-line bg-bg-paper hover:bg-bg-warm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Card — closed state + click-to-open modal with shared layoutId     */
/* ------------------------------------------------------------------ */

export function Card({ card, index }: { card: AppleCard; index: number }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const { onCardClose } = useContext(CarouselContext);

  // Body scroll lock while modal open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCard();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const closeCard = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[200] grid place-items-center overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/60 backdrop-blur-md"
              onClick={closeCard}
              aria-hidden
            />
            <motion.div
              ref={containerRef}
              layoutId={`card-${id}`}
              className="relative z-[10] my-10 mx-4 w-full max-w-4xl rounded-3xl bg-bg-paper p-6 md:p-12 shadow-soft"
              role="dialog"
              aria-modal="true"
              aria-label={card.title}
            >
              <button
                onClick={closeCard}
                aria-label="Close"
                className="absolute top-4 right-4 grid place-items-center size-10 rounded-full bg-ink text-white hover:scale-105 transition-transform"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <motion.p
                layoutId={`card-cat-${id}`}
                className="font-mono text-[11px] tracking-[0.22em] uppercase text-brand-4"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={`card-title-${id}`}
                className="mt-2 font-display font-medium text-ink text-[clamp(28px,4vw,48px)] leading-[1.1] tracking-[-0.02em]"
              >
                {card.title}
              </motion.p>
              <div className="mt-8 text-ink-2">{card.content}</div>
              {card.href && (
                <Link
                  href={card.href}
                  className="btn btn-primary mt-8 inline-flex"
                >
                  View industry ↗
                </Link>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        layoutId={`card-${id}`}
        onClick={() => setOpen(true)}
        className="relative z-[5] flex h-80 w-56 md:h-[40rem] md:w-96 flex-col items-start justify-start overflow-hidden rounded-3xl bg-bg-warm text-left transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_rgba(26,20,16,0.35)]"
      >
        {/* Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.src}
          alt={card.title}
          loading="lazy"
          className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
        />

        {/* Top-down gradient for legibility */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-[2] h-2/5 bg-gradient-to-b from-ink/65 via-ink/30 to-transparent"
        />

        {/* Top text */}
        <div className="relative z-[10] p-6 md:p-8">
          <motion.p
            layoutId={`card-cat-${id}`}
            className="font-mono text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-white/85"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={`card-title-${id}`}
            className="mt-2 max-w-xs font-display font-medium text-white text-[20px] md:text-[28px] leading-[1.1] tracking-[-0.02em]"
          >
            {card.title}
          </motion.p>
        </div>
      </motion.button>
    </>
  );
}
