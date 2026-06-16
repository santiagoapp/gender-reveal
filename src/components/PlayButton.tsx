"use client";

import { useMusic } from "./MusicProvider";

// Round pink play/pause button shown under the music prompt. Falls back to a
// decorative (disabled) button when no track is configured.
export default function PlayButton() {
  const music = useMusic();
  const playing = music?.playing ?? false;

  return (
    <button
      type="button"
      onClick={() => music?.toggle()}
      aria-label={playing ? "Pausar música" : "Reproducir música"}
      className="group grid h-20 w-20 place-items-center rounded-full bg-bubblegum text-white shadow-[0_10px_24px_rgba(242,175,193,0.55)] transition hover:scale-105 active:scale-95"
    >
      {playing ? (
        <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1.2" />
          <rect x="14" y="5" width="4" height="14" rx="1.2" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="ml-1 h-9 w-9 fill-white" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z" />
        </svg>
      )}
    </button>
  );
}
