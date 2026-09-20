"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/Reveal";

type Props = {
  images: string[];
  projectTitle: string;
  heading?: string;
  industry?: string;
};

export default function SelectedViewsGallery({
  images,
  projectTitle,
  heading = "Selected Views",
  industry,
}: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  // Keyboard controls: ArrowLeft, ArrowRight, Escape
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, prevImage, nextImage]);

  if (!images || images.length === 0) return null;

  return (
    <section className="py-24 md:py-36 bg-bg-warm/60 border-b border-line">
      <div className="wrap">
        <div className="max-w-[880px] mb-14 md:mb-20">
          <Reveal>
            <span className="eyebrow text-brand-ink">Visual Showcase</span>
            <h2 className="t-h2 mt-4 text-[clamp(34px,4.5vw,60px)]">{heading}</h2>
            <p className="t-lead mt-6 text-ink-2 text-[clamp(17px,1.35vw,21px)]">
              Curated perspectives of the final digital product, interfaces, and collateral across responsive viewports.
            </p>
          </Reveal>
        </div>

        {/* ---------------- Mixed Scale Gallery Composition ---------------- */}
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Row 1: Full-Width Lead View */}
          {images[0] && (
            <Reveal>
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="group w-full text-left relative aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden bg-bg-paper border border-line shadow-lift cursor-zoom-in"
              >
                <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.03]">
                  <SmartImage
                    src={images[0]}
                    alt={`${projectTitle} — View 01`}
                    sizes="100vw"
                  />
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px] tracking-[0.16em] uppercase">
                  Lead Perspective · 01
                </div>
              </button>
            </Reveal>
          )}

          {/* Row 2: Two-Column Split (if more than 1 image) */}
          {images.length > 1 && (
            <div className="grid md:grid-cols-2 gap-8">
              {images.slice(1, 3).map((img, i) => (
                <Reveal key={img} delay={(i % 2) as 0 | 1}>
                  <button
                    type="button"
                    onClick={() => openLightbox(i + 1)}
                    className="group w-full text-left relative aspect-[16/11] rounded-2xl overflow-hidden bg-bg-paper border border-line shadow-sm2 cursor-zoom-in"
                  >
                    <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04]">
                      <SmartImage
                        src={img}
                        alt={`${projectTitle} — View 0${i + 2}`}
                        sizes="(min-width:768px) 50vw, 100vw"
                      />
                    </div>
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[10px] tracking-[0.16em] uppercase">
                      Detail · 0{i + 2}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}

          {/* Row 3: Three-Column Details (if more than 3 images) */}
          {images.length > 3 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.slice(3).map((img, i) => (
                <Reveal key={img} delay={(i % 3) as 0 | 1 | 2}>
                  <button
                    type="button"
                    onClick={() => openLightbox(i + 4)}
                    className="group w-full text-left relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-paper border border-line shadow-sm2 cursor-zoom-in"
                  >
                    <div className="absolute inset-0 transition-transform duration-reveal ease-uniix group-hover:scale-[1.04]">
                      <SmartImage
                        src={img}
                        alt={`${projectTitle} — View 0${i + 4}`}
                        sizes="(min-width:1024px) 33vw, 50vw"
                      />
                    </div>
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white font-mono text-[10px] tracking-[0.14em] uppercase">
                      0{i + 4}
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ---------------- Studio Lightbox Modal ---------------- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
              <div>
                <div className="font-display font-medium text-[18px]">
                  {projectTitle}
                </div>
                {industry && (
                  <div className="font-mono text-[11px] text-white/50 tracking-[0.16em] uppercase">
                    {industry}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-[12px] tracking-[0.2em] text-brand-2">
                  {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close lightbox"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors font-mono text-[16px]"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Main Image Stage */}
            <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
              <button
                type="button"
                onClick={prevImage}
                aria-label="Previous view"
                className="absolute left-2 md:left-6 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-colors font-mono text-[18px]"
              >
                ←
              </button>

              <div className="relative w-full h-full max-w-6xl max-h-[75vh]">
                <SmartImage
                  src={images[lightboxIndex]}
                  alt={`${projectTitle} fullscreen view ${lightboxIndex + 1}`}
                  sizes="100vw"
                  fit="contain"
                  priority
                />
              </div>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next view"
                className="absolute right-2 md:right-6 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/20 flex items-center justify-center transition-colors font-mono text-[18px]"
              >
                →
              </button>
            </div>

            {/* Bottom Keyboard Hint */}
            <div className="text-center font-mono text-[11px] tracking-[0.16em] uppercase text-white/40 pt-2 border-t border-white/10">
              Use arrow keys (← / →) to browse · Escape to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
