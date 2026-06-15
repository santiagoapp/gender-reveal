"use client";

import { useRef, useState } from "react";
import { config } from "@/lib/config";

// Floating background-music button. Browsers block autoplay, so playback
// starts on the first tap. Hidden entirely if no musicUrl is configured.
export default function MusicToggle() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  if (!config.musicUrl) return null;

  const src = `${config.basePath}${config.musicUrl}`;

  function toggle() {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play().then(
        () => setPlaying(true),
        () => setPlaying(false)
      );
    }
  }

  return (
    <>
      <audio ref={ref} src={src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar música" : "Reproducir música"}
        className="fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-white/90 text-xl shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:scale-105"
      >
        <span className={playing ? "animate-floaty" : ""}>
          {playing ? "🔊" : "🔈"}
        </span>
      </button>
    </>
  );
}
