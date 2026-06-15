// Pure-CSS animated background decor (teddy bears, balloons, hearts).
// Server component — no JS shipped; positions/delays are deterministic so the
// static export is stable (no Math.random()).

const ITEMS = [
  { e: "🧸", left: "6%", size: "2.2rem", dur: "16s", delay: "0s" },
  { e: "🎈", left: "16%", size: "1.8rem", dur: "20s", delay: "3s" },
  { e: "💙", left: "28%", size: "1.4rem", dur: "14s", delay: "6s" },
  { e: "🐾", left: "40%", size: "1.5rem", dur: "22s", delay: "1s" },
  { e: "💗", left: "54%", size: "1.4rem", dur: "15s", delay: "4s" },
  { e: "🎈", left: "66%", size: "1.8rem", dur: "19s", delay: "8s" },
  { e: "🧸", left: "78%", size: "2rem", dur: "17s", delay: "2s" },
  { e: "💙", left: "88%", size: "1.4rem", dur: "13s", delay: "5s" },
  { e: "💗", left: "94%", size: "1.6rem", dur: "21s", delay: "9s" },
];

export default function FloatingDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden -z-0 opacity-70"
    >
      {ITEMS.map((it, i) => (
        <span
          key={i}
          className="absolute bottom-0 animate-rise"
          style={{
            left: it.left,
            fontSize: it.size,
            animationDuration: it.dur,
            animationDelay: it.delay,
          }}
        >
          {it.e}
        </span>
      ))}
    </div>
  );
}
