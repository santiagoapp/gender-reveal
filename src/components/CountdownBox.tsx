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

function pad(n: number, width = 2): string {
  return String(n).padStart(width, "0");
}

// Dusty-blue countdown chip with a dashed border, e.g.
//   180 : 05 : 05 : 20
//   DÍAS  HOR  MIN  SEG
export default function CountdownBox({ dateISO }: { dateISO: string }) {
  const target = new Date(dateISO).getTime();
  const [parts, setParts] = useState<Parts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setParts(diff(target));
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: Array<[string, string]> = [
    [pad(parts.days, 3), "DÍAS"],
    [pad(parts.hours), "HOR"],
    [pad(parts.minutes), "MIN"],
    [pad(parts.seconds), "SEG"],
  ];

  return (
    <div className="inline-flex flex-col rounded-2xl bg-dusty px-5 py-3 font-ui text-white shadow-lg ring-1 ring-white/30 [box-shadow:inset_0_0_0_2px_rgba(255,255,255,0.85)]">
      <div className="flex items-center justify-center gap-2 text-3xl font-bold tabular-nums sm:text-4xl">
        {cells.map(([value], i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="opacity-80">:</span>}
            {value}
          </span>
        ))}
      </div>
      <div className="mt-1 flex items-center justify-center gap-2 text-xs tracking-[0.2em] sm:text-sm">
        {cells.map(([, label], i) => (
          <span key={i} className="w-12 text-center">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
