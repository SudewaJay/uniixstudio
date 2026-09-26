type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/**
 * How the reel should start on this device.
 *
 *   "auto"   — stream and autoplay once the section is on screen.
 *   "manual" — show the poster and wait for an explicit Play. Used for
 *              reduced motion, Save-Data and slow links. The section is
 *              designed to look finished in this state, not degraded.
 *
 * `navigator.connection` is Chromium-only; everywhere else we assume a
 * capable connection and let Vimeo's adaptive streaming pick the rendition.
 */
export type StartMode = "auto" | "manual";

export function reelStartMode(): StartMode {
  if (typeof window === "undefined") return "manual";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "manual";
  if (window.matchMedia("(prefers-reduced-data: reduce)").matches) return "manual";

  const net = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (net?.saveData) return "manual";
  const type = net?.effectiveType ?? "";
  if (/(^|-)2g$/.test(type)) return "manual";
  // 3G is fine for a 1080p-capable desktop link-up but not for a phone on the
  // move; hold phones back and let the poster carry the section.
  if (type === "3g" && !window.matchMedia("(min-width: 768px)").matches) return "manual";
  return "auto";
}

/** Warm DNS/TLS for the player the moment we commit to loading it. */
export function preconnectVimeo() {
  if (document.querySelector('link[data-reel-preconnect]')) return;
  for (const href of ["https://player.vimeo.com", "https://i.vimeocdn.com", "https://f.vimeocdn.com"]) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = href;
    link.crossOrigin = "";
    link.dataset.reelPreconnect = "";
    document.head.appendChild(link);
  }
}
