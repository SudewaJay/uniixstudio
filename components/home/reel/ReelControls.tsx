"use client";

import clsx from "clsx";

/**
 * Two small text buttons, not a player skin. They sit in the stage's own
 * typographic system (mono, uppercase, tracked) so they read as part of the
 * editorial frame rather than as a UI bolted onto a video.
 */
export default function ReelControls({
  playing,
  muted,
  onTogglePlay,
  onToggleMute,
}: {
  playing: boolean;
  muted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onToggleMute}
        aria-pressed={!muted}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        className="reel-ctl"
      >
        <span aria-hidden="true" className={clsx("reel-eq", !muted && playing && "is-live")}>
          <i />
          <i />
          <i />
          <i />
        </span>
        <span aria-hidden="true">{muted ? "Sound off" : "Sound on"}</span>
      </button>

      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={playing ? "Pause reel" : "Play reel"}
        className="reel-ctl"
      >
        <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
          {playing ? (
            <>
              <rect x="1.5" y="1" width="2.4" height="8" />
              <rect x="6.1" y="1" width="2.4" height="8" />
            </>
          ) : (
            <path d="M2 1l7 4-7 4z" />
          )}
        </svg>
        <span aria-hidden="true">{playing ? "Pause" : "Play"}</span>
      </button>
    </div>
  );
}
