import { config } from "@/lib/config";

// Scattered soft stars (original SVG assets), gently floating.
// Server component — pure CSS animations, deterministic positions.

type Item = {
  src: "star-blue" | "star-pink";
  top: string;
  left: string;
  size: string;
  anim: string;
};

const ITEMS: Item[] = [
  { src: "star-blue", top: "8%", left: "5%", size: "2rem", anim: "animate-floaty" },
  { src: "star-blue", top: "13%", left: "12%", size: "1.3rem", anim: "animate-sway" },
  { src: "star-pink", top: "29%", left: "4%", size: "1.7rem", anim: "animate-floaty" },
  { src: "star-pink", top: "35%", left: "10%", size: "1.1rem", anim: "animate-sway" },
  { src: "star-blue", top: "9%", left: "90%", size: "1.6rem", anim: "animate-sway" },
  { src: "star-pink", top: "21%", left: "94%", size: "1.2rem", anim: "animate-floaty" },
  { src: "star-pink", top: "60%", left: "92%", size: "1.8rem", anim: "animate-floaty" },
  { src: "star-blue", top: "75%", left: "5%", size: "1.5rem", anim: "animate-sway" },
];

export default function FloatingDecor() {
  const b = config.basePath;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
    >
      {ITEMS.map((it, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={`${b}/img/${it.src}.svg`}
          alt=""
          className={`absolute opacity-70 ${it.anim}`}
          style={{
            top: it.top,
            left: it.left,
            width: it.size,
            animationDelay: `${(i % 5) * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}
