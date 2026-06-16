"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";

const socials = [
  { label: "Instagram", href: site.socials.instagram },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Facebook", href: site.socials.facebook },
  { label: "Behance", href: "https://www.behance.net/sudewajayanath" },
  { label: "Dribbble", href: "https://dribbble.com/uniixstudio" },
];

const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/portfolio" },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function useColomboClock() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Colombo",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const time = useColomboClock();

  return (
    <footer className="relative bg-[#0A0A0A] text-white overflow-hidden">
      {/* Organic amber/orange gradient blob — Uniix brand palette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 78% 70%, rgba(248,200,74,0.55) 0%, rgba(240,123,32,0.42) 25%, rgba(232,98,26,0.22) 50%, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-[40%] -right-[10%] w-[85vw] h-[80vh] rounded-full blur-[120px] opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(248,200,74,0.65) 0%, rgba(232,98,26,0.32) 55%, transparent 100%)",
        }}
      />

      <div className="relative wrap pt-10 md:pt-12 pb-6 md:pb-8">
        {/* Top row — socials + email */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 md:pb-6">
          <ul className="flex flex-wrap items-center gap-x-7 md:gap-x-10 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] md:text-[15px] font-medium text-white/55 hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${site.email}`}
            className="text-[14px] md:text-[15px] font-medium text-white/55 hover:text-white transition-colors"
          >
            {site.email}
          </a>
        </div>

        <div className="h-px bg-white/12" />

        {/* Middle row — logo + nav + tagline */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-8 md:gap-10 py-10 md:py-16">
          <Link
            href="/"
            className="inline-flex items-baseline gap-1 group"
            aria-label="Uniix Studio home"
          >
            <span className="font-display font-medium text-white text-[28px] md:text-[30px] tracking-[-0.02em] leading-none group-hover:opacity-90 transition-opacity">
              uniix
            </span>
            <span
              aria-hidden
              className="inline-grid place-items-center w-3.5 h-3.5 rounded-full border border-[#F07B20] text-[8px] font-bold text-[#F07B20] leading-none -translate-y-2.5"
            >
              ®
            </span>
          </Link>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-1.5">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-display font-medium text-white/55 hover:text-white text-[22px] md:text-[26px] tracking-[-0.02em] leading-tight transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-white/55 text-[14px] md:text-[15px] leading-relaxed max-w-[34ch] md:text-right md:ml-auto">
            Studio based in Colombo — we design brands that perform across
            Sri Lanka, Australia and the UK.
          </p>
        </div>

        <div className="h-px bg-white/12" />

        {/* Massive "Get in Touch" — clickable, sends to /contact */}
        <Link
          href="/contact"
          className="block py-8 md:py-12 group"
          aria-label="Get in touch — contact Uniix Studio"
        >
          <div
            className="font-display font-medium text-white tracking-[-0.045em] leading-[0.85] group-hover:tracking-[-0.04em] transition-all duration-500 select-none"
            style={{ fontSize: "clamp(72px, 17vw, 280px)" }}
          >
            Get in Touch
          </div>
        </Link>

        <div className="h-px bg-white/12" />

        {/* Bottom row — copyright + location + live clock */}
        <div className="pt-5 md:pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
          <div className="text-[12px] md:text-[13px] text-white/45">
            Uniix Studio © {new Date().getFullYear()} · All rights reserved
          </div>
          <div className="flex items-center gap-3 text-[12px] md:text-[13px] text-white/55">
            <span>{site.location}</span>
            <span
              suppressHydrationWarning
              className="font-mono tabular-nums tracking-wider text-white/70 min-w-[64px]"
            >
              {time || "—"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
