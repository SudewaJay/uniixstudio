"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { nav } from "@/lib/content";
import Logo from "./Logo";
import clsx from "clsx";

const DESKTOP_BP = 1024;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const path = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // rAF-throttle so we do at most one state update per frame during scroll.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // rAF-throttle the resize handler too — it only flips a boolean breakpoint.
    let ticking = false;
    const check = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsDesktop(window.innerWidth >= DESKTOP_BP);
        ticking = false;
      });
    };
    setIsDesktop(window.innerWidth >= DESKTOP_BP);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus management for the mobile drawer: trap Tab within the panel, close
  // on Escape, and restore focus to the hamburger button when it closes.
  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
      if (focusable.length === 0) return;
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [open]);

  return (
    <>
      <nav
        className={clsx(
          "fixed inset-x-0 z-[100] bg-bg transition-all duration-300",
          scrolled
            ? "py-3 border-b border-line shadow-[0_1px_20px_-6px_rgba(26,20,16,0.10)]"
            : "py-4 border-b border-line-soft"
        )}
        style={{ top: 36 }}
      >
        <div className="wrap flex items-center justify-between gap-4">

          {/* Logo — left */}
          <Logo />

          {/* Nav links — center (desktop only) */}
          {isDesktop && (
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {nav.map((item) => {
                const active = path === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      position: "relative",
                      padding: "8px 14px",
                      fontSize: "14px",
                      fontWeight: 500,
                      borderRadius: "8px",
                      whiteSpace: "nowrap",
                      color: active ? "#1A1410" : "#3A2F26",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                  >
                    {item.label}
                    {active && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "2px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: "#E8621A",
                          display: "block",
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          {/* CTA + hamburger — right */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {isDesktop && (
              <Link
                href="/contact"
                className="btn btn-grad"
                style={{ fontSize: "14px", padding: "10px 20px", display: "inline-flex" }}
              >
                Let&apos;s talk ↗
              </Link>
            )}
            {!isDesktop && (
              <button
                ref={openerRef}
                onClick={() => setOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#1A1410",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="3" y1="8" x2="21" y2="8" />
                  <line x1="3" y1="16" x2="21" y2="16" />
                </svg>
              </button>
            )}
          </div>

        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[190] bg-ink/30 backdrop-blur-sm"
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
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[200] w-full max-w-sm bg-bg px-8 pt-20 pb-10 flex flex-col gap-1 shadow-[-8px_0_40px_rgba(26,20,16,0.12)]"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="absolute top-6 right-6 grid place-items-center w-10 h-10 rounded-full bg-ink text-white"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="flex flex-col gap-1 mb-8">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.055, duration: 0.28, ease: "easeOut" }}
                  >
                    <Link
                      href={item.href}
                      className={clsx(
                        "py-4 font-display text-3xl font-medium border-b border-line-soft block transition-colors duration-200",
                        path === item.href ? "text-brand-4" : "text-ink hover:text-brand-4"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.28, ease: "easeOut" }}
              >
                <Link href="/contact" className="btn btn-grad w-full justify-center">
                  Let&apos;s talk ↗
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="mt-auto font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute"
              >
                Colombo · Working globally
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
