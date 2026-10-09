"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FooterData, SiteSettings } from "@/lib/cms/site";
import type { Location } from "@/lib/locations";

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

export default function Footer({
  footer,
  settings,
  locations,
}: {
  footer: FooterData;
  settings: SiteSettings;
  locations: Pick<Location, "slug" | "name">[];
}) {
  const time = useColomboClock();
  const socials = settings.socials;
  const primaryNav = footer.links;
  const ctaHref = footer.ctaHref ?? "/contact";
  const ctaText = [footer.ctaHeading ?? "Get in Touch", footer.ctaHeadingAccent].filter(Boolean).join(" ");
  const copyright = (footer.copyright ?? `${settings.name} © {year} · All rights reserved`).replace(
    "{year}",
    String(new Date().getFullYear()),
  );

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
            href={`mailto:${settings.email}`}
            className="inline-flex items-center min-h-[24px] text-[14px] md:text-[15px] font-medium text-white/55 hover:text-white transition-colors"
          >
            {settings.email}
          </a>
        </div>

        <div className="h-px bg-white/12" />

        {/* Middle row — logo + nav + tagline */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-8 md:gap-10 py-10 md:py-16">
          <Link
            href="/"
            className="inline-flex items-center group w-fit"
            aria-label="Uniix Studio home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uniix-logo.svg"
              alt="Uniix Studio"
              width={778}
              height={346}
              className="h-10 md:h-12 w-auto group-hover:opacity-90 transition-opacity"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Link>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-1.5">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    className="font-display font-medium text-white/55 hover:text-white text-[22px] md:text-[26px] tracking-[-0.02em] leading-tight transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-white/55 text-[14px] md:text-[15px] leading-relaxed max-w-[34ch] md:text-right md:ml-auto">
            {footer.description}
          </p>
        </div>

        <div className="h-px bg-white/12" />

        {/* Massive "Get in Touch" — clickable, sends to /contact */}
        <Link
          href={ctaHref}
          className="block py-8 md:py-12 group"
          aria-label={`${ctaText} — contact ${settings.name}`}
        >
          <div
            className="font-display font-medium text-white whitespace-nowrap tracking-[-0.045em] leading-[0.85] group-hover:tracking-[-0.04em] transition-all duration-500 select-none"
            style={{ fontSize: "clamp(40px, 15vw, 220px)" }}
          >
            {ctaText}
          </div>
        </Link>

        <div className="h-px bg-white/12" />

        {/* Areas we serve — sitewide internal links to location pages */}
        {footer.showLocations && locations.length > 0 && (<>
        <div className="pt-5 md:pt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 shrink-0">
            {footer.locationsLabel}
          </span>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <li>
              <Link
                href="/locations"
                className="text-[13px] text-white/55 hover:text-white transition-colors"
              >
                All areas
              </Link>
            </li>
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/locations/${l.slug}`}
                  className="text-[13px] text-white/55 hover:text-white transition-colors"
                >
                  Web design {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 md:mt-6 h-px bg-white/12" />
        </>)}

        {/* Bottom row — copyright + location + live clock */}
        <div className="pt-5 md:pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px] md:text-[13px] text-white/60">
            <span suppressHydrationWarning>{copyright}</span>
            {footer.legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 text-[12px] md:text-[13px] text-white/55">
            <span>{settings.location}</span>
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
