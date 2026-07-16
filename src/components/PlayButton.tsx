"use client";

import { useMusic } from "./MusicProvider";

// Round pink play/pause button shown under the music prompt. Falls back to a
// decorative (disabled) button when no track is configured.
export default function PlayButton() {
  const music = useMusic();
  const playing = music?.playing ?? false;

  return (
    <span className="relative grid place-items-center">
      {/* Expanding pulse ring — draws the eye while the track is paused. */}
      {!playing && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute h-20 w-20 rounded-full bg-bubblegum animate-ping-ring"
        />
      )}
      <button
        type="button"
        onClick={() => music?.toggle()}
        aria-label={playing ? "Pausar música" : "Reproducir música"}
        className={`relative grid h-20 w-20 place-items-center rounded-full bg-bubblegum text-white shadow-[0_10px_24px_rgba(242,175,193,0.55)] transition hover:brightness-105 active:brightness-95 ${
          playing ? "" : "animate-breathe"
        }`}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1.2" />
            <rect x="14" y="5" width="4" height="14" rx="1.2" />
          </svg>
        ) : (
          // Triangle vertices (9,6.5) (18,12) (9,17.5) → centroid exactly
          // (12,12), so it's centered with no margin nudge.
          <svg viewBox="0 0 24 24" className="h-9 w-9 fill-white" aria-hidden="true">
            <path
              d="M9 6.5 L18 12 L9 17.5 Z"
              strokeLinejoin="round"
              strokeWidth="2.4"
              stroke="white"
            />
          </svg>
        )}
      </button>
    </span>
  );
}
