"use client";

import clsx from "clsx";
import { FI_LANG_COOKIE, finlandPaths, type FiLang } from "@/lib/finland-i18n";

/**
 * FI / EN switch for the Finland page only. Choosing a language stores it in
 * a cookie, so the middleware's automatic Finnish redirect (for visitors in
 * Finland or with a Finnish browser) never overrides an explicit choice.
 * Real links with hreflang, so it works without JavaScript and crawlers see
 * both versions. Plain <a> (a full page load) on purpose: next/link would
 * prefetch /finland/ and could replay a cached language redirect from before
 * the choice was saved.
 */
export default function LangSwitch({ lang, label, className }: { lang: FiLang; label: string; className?: string }) {
  const remember = (l: FiLang) => {
    try {
      document.cookie = `${FI_LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      /* cookies blocked — the link still navigates */
    }
  };

  return (
    <nav aria-label={label} className={clsx("inline-flex rounded-full border border-white/20 bg-black/20 p-1 backdrop-blur-sm", className)}>
      {(["fi", "en"] as FiLang[]).map((l) => {
        const on = l === lang;
        return (
          <a
            key={l}
            href={finlandPaths[l]}
            hrefLang={l}
            lang={l}
            aria-label={l === "fi" ? "Suomi" : "English"}
            aria-current={on ? "page" : undefined}
            onClick={() => remember(l)}
            className={clsx(
              "inline-flex min-h-[32px] min-w-[44px] items-center justify-center rounded-full px-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-micro",
              on ? "bg-white text-ink" : "text-white/70 hover:text-white",
            )}
          >
            {l}
          </a>
        );
      })}
    </nav>
  );
}
