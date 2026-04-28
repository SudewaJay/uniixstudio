"use client";

import { CSSProperties } from "react";

type Poster = {
  src: string;
  alt: string;
  title: string;
};

const posters: Poster[] = [
  {
    src: "/posters/bilesma-kasthuri-care.jpg",
    alt: "Bilesma Kasthuri Care Body Lotion",
    title: "Kasthuri Care · Body Lotion",
  },
  {
    src: "/posters/bilesma-rath-hadun-review.jpg",
    alt: "Bilesma Rath Hadun — Real Results",
    title: "Rath Hadun · Real Results",
  },
  {
    src: "/posters/bilesma-sinharaja-hair-oil.jpg",
    alt: "Bilesma Sinharaja Hair Oil — Ingredients",
    title: "Sinharaja · Hair Oil",
  },
  {
    src: "/posters/bilesma-saffron-face-cream.jpg",
    alt: "Bilesma Saffron Face Cream — Review",
    title: "Saffron · Face Cream",
  },
  {
    src: "/posters/bilesma-gooseberry-touch.jpg",
    alt: "Bilesma Gooseberry Touch Body Lotion",
    title: "Gooseberry Touch · Body Lotion",
  },
];

/**
 * Build a column of N posters by rotating the source list — so each column
 * shows a different sequence and the four columns never look identical.
 */
function buildColumn(offset: number, length = 8): Poster[] {
  return Array.from(
    { length },
    (_, i) => posters[(i + offset) % posters.length]
  );
}

type ColumnConfig = {
  items: Poster[];
  direction: "up" | "down";
  duration: number; // seconds
  visibility: string; // tailwind classes that toggle visibility per breakpoint
};

const columns: ColumnConfig[] = [
  { items: buildColumn(0), direction: "up", duration: 38, visibility: "block" },
  { items: buildColumn(1), direction: "down", duration: 46, visibility: "hidden sm:block" },
  { items: buildColumn(2), direction: "up", duration: 42, visibility: "hidden lg:block" },
  { items: buildColumn(3), direction: "down", duration: 50, visibility: "hidden lg:block" },
];

export default function VerticalTicker() {
  return (
    <section className="relative overflow-hidden bg-bg border-y border-line-soft py-16 md:py-20 lg:py-24">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] auto-rows-fr">
          {columns.map((col, i) => (
            <ScrollColumn
              key={i}
              items={col.items}
              direction={col.direction}
              duration={col.duration}
              visibility={col.visibility}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollColumn({
  items,
  direction,
  duration,
  visibility,
}: {
  items: Poster[];
  direction: "up" | "down";
  duration: number;
  visibility: string;
}) {
  // Duplicate the list so translating to ±50% wraps seamlessly
  const list = [...items, ...items];
  const trackClass =
    direction === "up" ? "scroll-col-up" : "scroll-col-down";

  return (
    <div
      className={`scroll-col-pause relative overflow-hidden h-[70vh] sm:h-[80vh] lg:h-[min(90vh,920px)] ${visibility}`}
    >
      <div
        className={`flex flex-col gap-5 md:gap-6 ${trackClass}`}
        style={{ "--scroll-duration": `${duration}s` } as CSSProperties}
      >
        {list.map((p, i) => (
          <PosterCard key={`${p.src}-${i}`} poster={p} />
        ))}
      </div>
    </div>
  );
}

function PosterCard({ poster }: { poster: Poster }) {
  return (
    <article className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-line-soft shadow-sm2 bg-bg-paper transition-shadow duration-500 hover:shadow-soft cursor-pointer">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster.src}
        alt={poster.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Hover overlay with project title */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5 md:p-6">
        <h3 className="font-display font-medium text-white text-[16px] md:text-[18px] tracking-[-0.01em] translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          {poster.title}
        </h3>
      </div>
    </article>
  );
}
