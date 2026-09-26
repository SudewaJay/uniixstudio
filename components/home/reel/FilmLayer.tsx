"use client";

import { memo, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import clsx from "clsx";
import { createVimeoBridge, vimeoEmbedSrc, type VimeoBridge, type VimeoMessage } from "./vimeo-bridge";
import type { ReelFilm } from "./types";

export type LayerRole = "current" | "incoming" | "standby";

/**
 * One film in the stage: its poster, and — only while `withPlayer` is true —
 * its Vimeo player.
 *
 * The poster is always the bottom of the stack, so the frame is never an empty
 * black box: before the player mounts, while it boots, and if it fails. The
 * iframe stays at opacity 0 until the player reports real playback time, then
 * fades over the poster. Since the poster *is* a frame of the film, the
 * handover reads as the image starting to move.
 *
 * Unmounting the layer (or flipping `withPlayer` off) removes the iframe, which
 * is what actually releases the decoder, buffers and network stream.
 */
function FilmLayer({
  film,
  index,
  role,
  withPlayer,
  loop,
  onMessage,
  register,
}: {
  film: ReelFilm;
  index: number;
  role: LayerRole;
  withPlayer: boolean;
  loop: boolean;
  onMessage: (index: number, msg: VimeoMessage) => void;
  register: (index: number, bridge: VimeoBridge | null) => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [rendering, setRendering] = useState(false);

  // Keep the latest callbacks without re-creating the bridge on every render.
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!withPlayer || !iframe) return;
    const bridge = createVimeoBridge(iframe, (msg) => {
      if (msg.event === "timeupdate" && (msg.data?.seconds ?? 0) > 0.05) setRendering(true);
      onMessageRef.current(index, msg);
    });
    register(index, bridge);
    return () => {
      register(index, null);
      bridge.destroy();
      setRendering(false);
    };
  }, [withPlayer, index, register]);

  return (
    <div
      aria-hidden="true"
      className={clsx(
        "absolute inset-0 overflow-hidden",
        role === "current" && "z-10",
        role === "incoming" && "z-20 reel-wipe-in",
        role === "standby" && "z-0 opacity-0",
      )}
    >
      <div className={clsx("absolute inset-0", role === "incoming" && "reel-settle")}>
        <NextImage
          src={film.poster}
          alt=""
          fill
          sizes="100vw"
          quality={70}
          loading="lazy"
          className="object-cover"
        />

        {withPlayer && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-reveal ease-uniix"
            style={{
              // Cover the stage with a 16:9 frame at any aspect, no distortion.
              width: "max(100cqw, calc(100cqh * 16 / 9))",
              height: "max(100cqh, calc(100cqw * 9 / 16))",
              opacity: rendering ? 1 : 0,
            }}
          >
            <iframe
              ref={iframeRef}
              src={vimeoEmbedSrc(film.vimeoId, { loop })}
              title={`${film.title} — ${film.client}`}
              tabIndex={-1}
              allow="autoplay; fullscreen; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(FilmLayer);
