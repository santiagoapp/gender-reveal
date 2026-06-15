// Scattered watercolor-style stars + bears, gently floating.
// Server component (pure CSS animations, deterministic positions).

type Item = {
  c: string; // content (★ or emoji)
  cls: string; // color class
  top: string;
  left: string;
  size: string;
  anim: string;
};

const ITEMS: Item[] = [
  { c: "★", cls: "text-boy/70", top: "8%", left: "6%", size: "1.6rem", anim: "animate-floaty" },
  { c: "★", cls: "text-boy/60", top: "13%", left: "12%", size: "1.1rem", anim: "animate-sway" },
  { c: "★", cls: "text-girl/70", top: "30%", left: "4%", size: "1.4rem", anim: "animate-floaty" },
  { c: "★", cls: "text-girl/60", top: "36%", left: "9%", size: "0.9rem", anim: "animate-sway" },
  { c: "★", cls: "text-boy/60", top: "10%", left: "90%", size: "1.3rem", anim: "animate-sway" },
  { c: "★", cls: "text-girl/60", top: "22%", left: "94%", size: "1rem", anim: "animate-floaty" },
  { c: "★", cls: "text-girl/60", top: "62%", left: "92%", size: "1.4rem", anim: "animate-floaty" },
  { c: "★", cls: "text-boy/60", top: "78%", left: "6%", size: "1.2rem", anim: "animate-sway" },
  { c: "🐾", cls: "opacity-40", top: "52%", left: "3%", size: "1.2rem", anim: "animate-floaty" },
  { c: "🐾", cls: "opacity-40", top: "70%", left: "95%", size: "1.2rem", anim: "animate-sway" },
];

export default function FloatingDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
    >
      {ITEMS.map((it, i) => (
        <span
          key={i}
          className={`absolute ${it.cls} ${it.anim}`}
          style={{
            top: it.top,
            left: it.left,
            fontSize: it.size,
            animationDelay: `${(i % 5) * 0.7}s`,
          }}
        >
          {it.c}
        </span>
      ))}
    </div>
  );
}
