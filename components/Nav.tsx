"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/content";
import { PROMO_BAR_HEIGHT } from "./PromoBar";
import Logo from "./Logo";
import clsx from "clsx";

/**
 * Header.
 *
 * Desktop/mobile split is done with CSS breakpoints, NOT a JS `isDesktop`
 * boolean. The previous implementation initialised that flag to `false`, so
 * the server rendered only a hamburger — the entire primary navigation was
 * absent from the HTML (invisible to crawlers and no-JS) and visibly swapped
 * in after hydration on every page load.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Drawer focus management: move focus in, trap Tab, Escape closes, focus
  // returns to the opener.
  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    const panel = panelRef.current;
    const sel = 'a[href], button:not([disabled])';
    panel?.querySelector<HTMLElement>(sel)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const f = Array.from(panel.querySelectorAll<HTMLElement>(sel));
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [open]);

  const isActive = (href: string) => path === href || path === `${href}/`;

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 z-[100] transition-all duration-std ease-uniix",
          scrolled
            ? "bg-bg/85 backdrop-blur-xl border-b border-line py-3"
            : "bg-transparent border-b border-transparent py-4",
        )}
        style={{ top: PROMO_BAR_HEIGHT }}
      >
        <nav aria-label="Primary" className="wrap flex items-center gap-6">
          <Logo />

          {/* Desktop links — server-rendered, hidden by CSS under 1024px. */}
          <ul className="hidden lg:flex items-center gap-1 ml-auto">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={clsx(
                    "relative inline-flex items-center px-4 py-2.5 rounded-full text-[14.5px] font-medium",
                    "transition-colors duration-micro ease-uniix",
                    isActive(item.href)
                      ? "text-ink"
                      : "text-ink-2 hover:text-ink",
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 -translate-x-1/2 bottom-0.5 w-1 h-1 rounded-full bg-brand-ink"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 ml-auto lg:ml-4">
            <Link href="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Start a project <span className="cta-arrow">↗</span>
            </Link>

            {/* Mobile opener — hidden by CSS at >=1024px. */}
            <button
              ref={openerRef}
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="lg:hidden grid place-items-center w-11 h-11 rounded-full bg-ink text-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="3" y1="8" x2="21" y2="8" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[190] bg-ink/40 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              ref={panelRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[200] w-full max-w-sm bg-bg px-7 pt-20 pb-8 flex flex-col shadow-[-8px_0_40px_rgba(18,16,14,0.16)] lg:hidden overflow-y-auto"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="absolute top-6 right-6 grid place-items-center w-11 h-11 rounded-full bg-ink text-white"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <ul className="flex flex-col">
                {[...nav, { href: "/contact", label: "Contact" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.28, ease: "easeOut" }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={clsx(
                        "py-4 font-display text-[30px] font-medium border-b border-line-soft block tracking-[-0.02em] transition-colors duration-micro",
                        isActive(item.href) ? "text-brand-ink" : "text-ink hover:text-brand-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.28, ease: "easeOut" }}
                className="mt-8"
              >
                <Link href="/contact" className="btn btn-accent w-full">
                  Start a project <span className="cta-arrow">↗</span>
                </Link>
              </motion.div>

              <div className="mt-auto pt-10 t-meta text-ink-mute">
                Colombo · Working globally
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
