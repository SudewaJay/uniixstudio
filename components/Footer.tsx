"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FooterData, SiteSettings } from "@/lib/cms/site";
import type { Location } from "@/lib/locations";
import Wordmark from "./footer/Wordmark";
import { Magnetic, RollText } from "./home/studio/motion";

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

const SERVICE_LINKS = [
  { label: "Design", href: "/services/design/" },
  { label: "Technology", href: "/services/technology/" },
  { label: "Growth", href: "/services/growth/" },
  { label: "Industries", href: "/industries/" },
  { label: "Showreel", href: "/showreel/" },
];

/**
 * Site footer — the last frame of every page.
 *
 * Reads top to bottom as: a closing line with the one action that matters,
 * three columns of ways onward, the wordmark as an interactive point field,
 * and the small print with a live Colombo clock. Every CMS footer field the
 * previous footer used is still honoured (links, CTA text/href, description,
 * locations, legal links, copyright).
 */
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
  const [copied, setCopied] = useState(false);
  const ctaHref = footer.ctaHref ?? "/contact";
  const ctaText = "Start a project";
  const copyright = (footer.copyright ?? `${settings.name} © {year} · All rights reserved`).replace(
    "{year}",
    String(new Date().getFullYear()),
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(settings.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${settings.email}`;
    }
  };

  const colHead = "font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/45";
  const colLink = "group inline-flex min-h-[36px] items-center text-[15px] text-white/80 transition-colors duration-micro hover:text-white";

  return (
    <footer className="on-dark relative overflow-hidden bg-[#0B0A09] text-white">
      <h2 className="sr-only">{settings.name}</h2>

      <div className="wrap-wide pt-20 md:pt-28">
        {/* -------------------------------------------- Closing line + CTA */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <a
              href={`mailto:${settings.email}`}
              className="block w-fit font-display font-medium leading-[0.95] tracking-[-0.045em] text-[clamp(32px,4.6vw,76px)] transition-colors duration-std hover:text-brand-2"
            >
              {settings.email}
            </a>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link href={ctaHref} className="btn btn-light group" >
                  {ctaText} <span className="cta-arrow">↗</span>
                </Link>
              </Magnetic>
              <button
                type="button"
                onClick={copyEmail}
                className="group inline-flex min-h-[48px] items-center gap-3 px-2 text-[15px] text-white/75 hover:text-white"
                aria-label={`Copy email address ${settings.email}`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 group-hover:text-brand-2">
                  {copied ? "Copied" : "Copy email"}
                </span>
              </button>
              <span role="status" className="sr-only">
                {copied ? "Email address copied" : ""}
              </span>
            </div>
          </div>

          {/* ------------------------------------------------- Columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            <nav aria-label="Footer">
              <p className={colHead}>Studio</p>
              <ul className="mt-4">
                {footer.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      target={item.newTab ? "_blank" : undefined}
                      rel={item.newTab ? "noopener noreferrer" : undefined}
                      className={colLink}
                    >
                      <RollText>{item.label}</RollText>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Services">
              <p className={colHead}>Services</p>
              <ul className="mt-4">
                {SERVICE_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={colLink}>
                      <RollText>{item.label}</RollText>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className={colHead}>Follow</p>
              <ul className="mt-4">
                {settings.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={colLink}>
                      <RollText>{s.label}</RollText>
                      <span aria-hidden="true" className="ml-1.5 text-white/35 transition-colors group-hover:text-brand-2">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
                {settings.whatsappLink && (
                  <li>
                    <a href={settings.whatsappLink} target="_blank" rel="noopener noreferrer" className={colLink}>
                      <RollText>WhatsApp</RollText>
                      <span aria-hidden="true" className="ml-1.5 text-white/35 transition-colors group-hover:text-brand-2">
                        ↗
                      </span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* --------------------------------------------- Interactive wordmark */}
      <div className="wrap-wide mt-10 md:mt-14">
        <Wordmark />
      </div>

      <div className="wrap-wide pb-8">
        {/* Areas we serve */}
        {footer.showLocations && locations.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-white/10 py-5 sm:flex-row sm:items-center sm:gap-6">
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">{footer.locationsLabel}</span>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
              <li>
                <Link href="/locations" className="text-[13px] text-white/55 transition-colors hover:text-white">
                  All areas
                </Link>
              </li>
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link href={`/locations/${l.slug}`} className="text-[13px] text-white/55 transition-colors hover:text-white">
                    Web design {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Small print */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[12.5px] text-white/55">
            <span suppressHydrationWarning>{copyright}</span>
            {footer.legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-6 text-[12.5px] text-white/55 md:justify-end">
            <span className="flex items-center gap-3">
              <span>{settings.location}</span>
              <span suppressHydrationWarning className="min-w-[64px] font-mono tabular-nums tracking-wider text-white/75">
                {time || "—"}
              </span>
            </span>
            <button
              type="button"
              onClick={() => {
                const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
                document.getElementById("main-content")?.focus({ preventScroll: true });
              }}
              className="group inline-flex min-h-[44px] items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/60 hover:text-white"
            >
              Back to top
              <span aria-hidden="true" className="inline-block transition-transform duration-std ease-uniix group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
