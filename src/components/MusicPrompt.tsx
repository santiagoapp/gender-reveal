"use client";

import { config } from "@/lib/config";
import { useMusic } from "./MusicProvider";

// "Dale play y déjate envolver…" prompt with a round play button.
export default function MusicPrompt() {
  const m = useMusic();
  if (!m || !m.enabled) return null;

  return (
    <section className="text-center">
      <p className="mx-auto max-w-sm text-lg text-ositoDark">
        {config.music.prompt}
      </p>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={m.toggle}
          aria-label={m.playing ? "Pausar música" : "Reproducir música"}
          className="play-btn"
        >
          {m.playing ? "❚❚" : "►"}
        </button>
      </div>
    </section>
  );
}
