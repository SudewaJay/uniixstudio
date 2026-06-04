"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { TechItem, ContentBlock, Wireframe } from "@/lib/projects";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* ---------------- Tech stack — staggered chip reveal ---------------- */

export function TechStackMotion({ items }: { items: TechItem[] }) {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.06,
        delayChildren: reduce ? 0 : 0.1,
      },
    },
  };
  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      };

  return (
    <motion.ul
      className="flex flex-wrap items-center gap-x-8 gap-y-4"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {items.map((t) => (
        <motion.li
          key={t.name}
          variants={item}
          className="font-display text-[16px] md:text-[18px] text-ink leading-none flex items-center gap-2"
        >
          {t.url ? (
            <Link
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-4 transition-colors"
            >
              {t.name}
            </Link>
          ) : (
            <span>{t.name}</span>
          )}
          {t.category && (
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-mute">
              · {t.category}
            </span>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
}

/* ---------------- Content block — image slides from outer edge, text fades up ---------------- */

export function ContentBlockMotion({
  block,
  projectTitle,
}: {
  block: ContentBlock;
  projectTitle: string;
}) {
  const reduce = useReducedMotion();
  const imageRight = block.imagePosition === "right";

  const imageInit = reduce
    ? { opacity: 1 }
    : { opacity: 0, x: imageRight ? 48 : -48, scale: 0.96 };
  const textInit = reduce ? { opacity: 1 } : { opacity: 0, y: 24 };

  return (
    <div
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
        imageRight ? "" : "md:[&>*:first-child]:order-2"
      }`}
    >
      {block.image && (
        <motion.figure
          className="relative w-full aspect-[4/3] rounded-lg2 overflow-hidden bg-bg-warm group"
          initial={imageInit}
          whileInView={reduce ? undefined : { opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={reduce ? undefined : { scale: 1.04 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Image
              src={block.image}
              alt={block.imageAlt ?? `${projectTitle} — ${block.heading}`}
              fill
              sizes="(min-width:768px) 540px, 100vw"
              className="object-cover"
              loading="lazy"
            />
          </motion.div>
        </motion.figure>
      )}
      <motion.div
        className={block.image ? "" : "md:col-span-2 max-w-[760px]"}
        initial={textInit}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
      >
        <h2
          className="font-display font-medium tracking-[-0.02em] leading-[1.15]"
          style={{ fontSize: "clamp(26px,3vw,40px)" }}
        >
          {block.heading}
        </h2>
        <p className="text-[clamp(16px,1.3vw,19px)] text-ink-2 leading-[1.6] mt-5">
          {block.body}
        </p>
      </motion.div>
    </div>
  );
}

/* ---------------- Wireframe card — staggered reveal + hover lift/zoom ---------------- */

export function WireframeGridMotion({
  items,
  projectTitle,
}: {
  items: Wireframe[];
  projectTitle: string;
}) {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08 },
    },
  };
  const card = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      };

  return (
    <motion.div
      className="grid sm:grid-cols-2 gap-5 md:gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {items.map((w, i) => (
        <motion.figure
          key={w.src}
          variants={card}
          whileHover={reduce ? undefined : { y: -6 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex flex-col gap-3 group"
        >
          <div className="relative w-full aspect-[4/3] rounded-lg2 overflow-hidden bg-bg-paper border border-line">
            <motion.div
              className="absolute inset-0"
              whileHover={reduce ? undefined : { scale: 1.05 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Image
                src={w.src}
                alt={w.alt ?? `${projectTitle} wireframe — ${w.caption ?? `view ${i + 1}`}`}
                fill
                sizes="(min-width:640px) 540px, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
          {w.caption && (
            <figcaption className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-2">
              {w.caption}
            </figcaption>
          )}
        </motion.figure>
      ))}
    </motion.div>
  );
}

/* ---------------- Hero overlay — slow ken-burns on image, title rises ---------------- */

export function HeroOverlayMotion({
  coverImage,
  title,
  overline,
  year,
  headline,
  industry,
  children,
}: {
  coverImage: string;
  title: string;
  overline: string;
  year: string;
  headline: string;
  industry?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full aspect-[21/9] rounded-lg2 overflow-hidden bg-bg-warm">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? undefined : { scale: 1.08 }}
        animate={reduce ? undefined : { scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image
          src={coverImage}
          alt={`${title} — ${industry ?? "case study"} hero`}
          fill
          priority
          sizes="(min-width:1024px) 1100px, 100vw"
          className="object-cover"
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
      />
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16 text-white"
        initial={reduce ? undefined : { opacity: 0, y: 28 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: EASE, delay: 0.25 }}
      >
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/80">
          {overline} · {year}
        </div>
        <h1
          className="font-display font-medium mt-3 tracking-[-0.02em] leading-[1.05]"
          style={{ fontSize: "clamp(32px,5.5vw,80px)" }}
        >
          {title}
        </h1>
        <p className="text-[clamp(16px,1.4vw,20px)] text-white/90 max-w-[60ch] leading-[1.5] mt-4">
          {headline}
        </p>
        {children}
      </motion.div>
    </div>
  );
}
