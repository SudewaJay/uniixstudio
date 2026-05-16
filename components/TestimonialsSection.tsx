"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Transition } from "framer-motion";
import { testimonials } from "@/lib/content";
import Reveal from "./Reveal";

const transition: Transition = {
  type: "spring",
  duration: 0.8,
  bounce: 0.2,
};

const AUTO_ROTATE_MS = 7000;

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2l2.95 6.97L22 10l-5.5 4.85L18.18 22 12 18.27 5.82 22l1.68-7.15L2 10l7.05-1.03L12 2z" />
    </svg>
  );
}

export default function TestimonialsSection() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => {
      setI((prev) => (prev + 1) % testimonials.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const review = testimonials[i];

  return (
    <section
      id="testimonials"
      className="bg-ink py-24 sm:py-32 relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background photograph — atmospheric, 30% opacity */}
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=70&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Vignette to keep text legible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,20,16,0.55) 0%, rgba(26,20,16,0.30) 35%, rgba(26,20,16,0.65) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Brand glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(45% 50% at 80% 20%, rgba(232,98,26,0.22), transparent 70%), radial-gradient(40% 50% at 10% 90%, rgba(248,200,74,0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
            <span className="w-10 h-px bg-brand-4" />
            <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-brand-4">
              Client stories
            </span>
            <span className="w-10 h-px bg-brand-4" />
          </div>
        </Reveal>

        <div className="flex flex-col items-center gap-12">
          <figure className="flex max-w-4xl flex-col gap-10 text-center min-h-[320px] md:min-h-[360px]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.blockquote
                key={i + "-quote"}
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { ...transition, delay: 0.4 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  y: 20,
                  transition: { ...transition, delay: 0.06 },
                }}
                className="origin-bottom font-display font-medium text-white tracking-[-0.02em] leading-[1.15] will-change-transform"
                style={{ fontSize: "clamp(28px,3.6vw,48px)" }}
              >
                <span className="text-brand-3">&ldquo;</span>
                {review.quote}
                <span className="text-brand-3">&rdquo;</span>
              </motion.blockquote>

              <motion.figcaption
                key={i + "-author"}
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { ...transition, delay: 0.5 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  y: 20,
                  transition,
                }}
                className="flex origin-bottom flex-col items-center gap-5 will-change-transform"
              >
                {/* Star row — staggered entrance */}
                <div className="flex gap-1.5 text-brand-3" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <motion.div
                      key={`${i}-star-${idx}`}
                      initial={{ opacity: 0, scale: 0.85, y: 6 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: { ...transition, delay: 0.5 + idx * 0.08 },
                      }}
                      exit={{ opacity: 0, scale: 0.85, y: 6, transition }}
                    >
                      <StarIcon />
                    </motion.div>
                  ))}
                </div>

                {/* Avatar (initial-based) + name + role */}
                <div className="flex items-center gap-4">
                  <div className="size-14 rounded-full bg-brand-grad text-white grid place-items-center font-display font-semibold text-[20px] ring-2 ring-white/15">
                    {review.initial}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white text-[16px]">
                      {review.name}
                    </p>
                    <cite className="text-white/65 text-[13px] mt-0.5 not-italic block">
                      {review.role}
                    </cite>
                  </div>
                </div>
              </motion.figcaption>
            </AnimatePresence>
          </figure>

          {/* Pagination dots */}
          <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((_, idx) => {
              const active = idx === i;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setI(idx)}
                  role="tab"
                  aria-selected={active}
                  aria-label={`Show testimonial ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${
                    active
                      ? "w-10 bg-brand-grad"
                      : "w-2 bg-white/30 hover:bg-white/55"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
