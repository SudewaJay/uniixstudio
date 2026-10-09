/**
 * A minimal bridge to Vimeo's embedded player over `postMessage`.
 *
 * The official `@vimeo/player` SDK does the same thing but ships ~25 KB for
 * features we don't use. The reel needs five commands and six events, so this
 * speaks the player's wire protocol directly:
 *
 *   → { method: "play" | "pause" | "setMuted" | "setVolume" | "addEventListener", value? }
 *   ← { event: "ready" | "play" | "pause" | "ended" | "timeupdate" | "error", data? }
 *
 * Commands sent before the player announces `ready` are queued, because the
 * player silently drops anything it receives while still booting.
 */

export const VIMEO_ORIGIN = "https://player.vimeo.com";

export type VimeoEvent = "ready" | "play" | "pause" | "ended" | "timeupdate" | "error";

export type VimeoTime = { seconds: number; percent: number; duration: number };

export type VimeoMessage = {
  event: VimeoEvent;
  data?: Partial<VimeoTime> & { method?: string; name?: string; message?: string };
};

const LISTEN: VimeoEvent[] = ["play", "pause", "ended", "timeupdate", "error"];
const LEGACY: Record<string, VimeoEvent> = { playProgress: "timeupdate", finish: "ended" };

export type VimeoBridge = {
  play(): void;
  pause(): void;
  setMuted(muted: boolean): void;
  seek(seconds: number): void;
  destroy(): void;
};

export function createVimeoBridge(
  iframe: HTMLIFrameElement,
  onMessage: (msg: VimeoMessage) => void,
): VimeoBridge {
  let ready = false;
  let queue: Array<Record<string, unknown>> = [];

  const post = (payload: Record<string, unknown>) => {
    if (!ready) {
      queue.push(payload);
      return;
    }
    iframe.contentWindow?.postMessage(JSON.stringify(payload), VIMEO_ORIGIN);
  };

  const handle = (e: MessageEvent) => {
    if (e.origin !== VIMEO_ORIGIN || e.source !== iframe.contentWindow) return;
    let msg: VimeoMessage;
    try {
      msg = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
    } catch {
      return;
    }
    if (!msg || typeof msg.event !== "string") return;
    // The player answers a `timeupdate` subscription with its legacy event
    // names; normalise so callers only deal with the modern ones.
    const legacy = LEGACY[msg.event as string];
    if (legacy) msg = { ...msg, event: legacy };

    if (msg.event === "ready" && !ready) {
      ready = true;
      for (const ev of LISTEN) post({ method: "addEventListener", value: ev });
      const pending = queue;
      queue = [];
      pending.forEach(post);
    }
    onMessage(msg);
  };

  window.addEventListener("message", handle);

  return {
    play: () => post({ method: "play" }),
    pause: () => post({ method: "pause" }),
    setMuted: (muted) => {
      post({ method: "setMuted", value: muted });
      // Older player builds ignore setMuted; volume is the belt-and-braces path.
      post({ method: "setVolume", value: muted ? 0 : 1 });
    },
    seek: (seconds) => post({ method: "setCurrentTime", value: seconds }),
    destroy: () => {
      window.removeEventListener("message", handle);
      queue = [];
    },
  };
}

/**
 * Embed URL for a chrome-less, muted, non-looping player. Rotation is driven
 * by our own `ended` handling, so `loop` stays off unless there is only one
 * film. `dnt=1` keeps Vimeo's analytics cookies out of consent territory.
 */
export function vimeoEmbedSrc(vimeoId: string, { loop = false } = {}) {
  const params = new URLSearchParams({
    autoplay: "0",
    muted: "1",
    loop: loop ? "1" : "0",
    controls: "0",
    title: "0",
    byline: "0",
    portrait: "0",
    badge: "0",
    autopause: "0",
    playsinline: "1",
    keyboard: "0",
    pip: "0",
    dnt: "1",
    transparent: "0",
  });
  return `${VIMEO_ORIGIN}/video/${vimeoId}?${params.toString()}`;
}
