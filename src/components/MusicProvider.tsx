"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { config } from "@/lib/config";

type MusicCtx = {
  enabled: boolean;
  playing: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
};

const Ctx = createContext<MusicCtx | null>(null);

// Shared <audio> so the cover seal, the "Dale play" prompt, and the floating
// toggle all control the same track.
export default function MusicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const enabled = !!config.musicUrl;
  const src = enabled ? `${config.basePath}${config.musicUrl}` : "";

  const play = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.play().then(
      () => setPlaying(true),
      () => setPlaying(false)
    );
  }, []);

  const pause = useCallback(() => {
    ref.current?.pause();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, play, pause]);

  return (
    <Ctx.Provider value={{ enabled, playing, play, pause, toggle }}>
      {enabled && <audio ref={ref} src={src} loop preload="none" />}
      {children}
    </Ctx.Provider>
  );
}

export function useMusic() {
  return useContext(Ctx);
}
