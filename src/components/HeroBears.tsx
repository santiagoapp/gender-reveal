import { config } from "@/lib/config";

// Original hand-authored SVG illustration: a blue osito + a pink osita with
// sparkles. Swappable for a single licensed image via config.assets.heroImageUrl.
export default function HeroBears({ className = "" }: { className?: string }) {
  const b = config.basePath;

  if (config.assets.heroImageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${b}${config.assets.heroImageUrl}`}
        alt="Ositos"
        className={`mx-auto w-auto animate-floaty drop-shadow-md ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative mx-auto flex w-fit items-end justify-center gap-1 ${className}`}
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={`${b}/img/bear-boy.svg`}
        alt=""
        className="w-28 animate-floaty drop-shadow-md sm:w-32"
        style={{ animationDelay: "0.4s" }}
      />
      <img
        src={`${b}/img/bear-girl.svg`}
        alt=""
        className="w-28 animate-floaty drop-shadow-md sm:w-32"
      />
      <img
        src={`${b}/img/sparkle.svg`}
        alt=""
        className="pointer-events-none absolute -left-3 top-1 w-5 animate-pop opacity-80"
      />
      <img
        src={`${b}/img/sparkle.svg`}
        alt=""
        className="pointer-events-none absolute right-1 top-6 w-4 animate-pop opacity-80"
      />
      <img
        src={`${b}/img/sparkle.svg`}
        alt=""
        className="pointer-events-none absolute left-1/2 -bottom-1 w-3 animate-pop opacity-70"
      />
      {/* eslint-enable @next/next/no-img-element */}
    </div>
  );
}
