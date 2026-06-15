"use client";

import { useMusic } from "./MusicProvider";

// Floating play/pause button, fixed bottom-right.
export default function MusicToggle() {
  const m = useMusic();
  if (!m || !m.enabled) return null;

  return (
    <button
      type="button"
      onClick={m.toggle}
      aria-label={m.playing ? "Pausar música" : "Reproducir música"}
      className="fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-xl shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:scale-105"
    >
      <span className={m.playing ? "animate-floaty" : ""}>
        {m.playing ? "🔊" : "🔈"}
      </span>
    </button>
  );
}
