"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Parts {
  const ms = Math.max(0, target - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Box({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="card w-16 sm:w-20 py-3 text-3xl sm:text-4xl font-display font-semibold tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-xs sm:text-sm uppercase tracking-widest text-ink/60">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ dateISO }: { dateISO: string }) {
  const target = new Date(dateISO).getTime();
  // Avoid hydration mismatch: render zeros on the server, real values on mount.
  const [parts, setParts] = useState<Parts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParts(diff(target));
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const done =
    mounted &&
    parts.days === 0 &&
    parts.hours === 0 &&
    parts.minutes === 0 &&
    parts.seconds === 0;

  if (done) {
    return (
      <p className="text-2xl font-display text-girl">¡Hoy es el gran día! 🎉</p>
    );
  }

  return (
    <div className="flex items-start justify-center gap-3 sm:gap-4">
      <Box value={parts.days} label="Días" />
      <Box value={parts.hours} label="Horas" />
      <Box value={parts.minutes} label="Min" />
      <Box value={parts.seconds} label="Seg" />
    </div>
  );
}
