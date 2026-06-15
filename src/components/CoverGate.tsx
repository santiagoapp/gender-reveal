"use client";

import { useEffect, useState } from "react";
import { config } from "@/lib/config";
import { useMusic } from "./MusicProvider";

function HeroIllustration() {
  if (config.assets.heroImageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`${config.basePath}${config.assets.heroImageUrl}`}
        alt="Ositos"
        className="mx-auto max-h-56 w-auto animate-floaty drop-shadow-md"
      />
    );
  }
  // Placeholder until a licensed illustration is dropped into /public.
  return (
    <div className="animate-floaty text-7xl sm:text-8xl">🧸✈️🧸</div>
  );
}

function WaxSeal() {
  return (
    <svg
      className="seal h-28 w-28 drop-shadow-lg"
      viewBox="0 0 200 200"
      role="img"
      aria-label={config.cover.sealText}
    >
      <defs>
        <radialGradient id="gold" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#f5d98b" />
          <stop offset="55%" stopColor="#d9ab50" />
          <stop offset="100%" stopColor="#a9802f" />
        </radialGradient>
        <path id="arc" d="M 34 108 A 66 66 0 0 1 166 108" fill="none" />
      </defs>
      {/* scalloped gold disc */}
      <circle cx="100" cy="108" r="62" fill="url(#gold)" stroke="#8c6420" strokeWidth="3" />
      <circle cx="100" cy="108" r="50" fill="none" stroke="#8c6420" strokeWidth="2" opacity="0.5" />
      {/* teddy bear face */}
      <g fill="#7a571f">
        <circle cx="78" cy="88" r="13" />
        <circle cx="122" cy="88" r="13" />
        <circle cx="100" cy="112" r="30" />
        <circle cx="88" cy="106" r="4" fill="#5a3f12" />
        <circle cx="112" cy="106" r="4" fill="#5a3f12" />
        <circle cx="100" cy="118" r="5" fill="#5a3f12" />
      </g>
      {/* arched label */}
      <text
        fill="#fff"
        fontSize="17"
        fontWeight="700"
        letterSpacing="2"
        style={{ fontFamily: "Quicksand, sans-serif" }}
      >
        <textPath href="#arc" startOffset="50%" textAnchor="middle">
          {config.cover.sealText}
        </textPath>
      </text>
    </svg>
  );
}

export default function CoverGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);
  const music = useMusic();

  // Lock page scroll while the cover is up.
  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo({ top: 0 });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  function open() {
    if (opening) return;
    setOpening(true);
    // The click is a user gesture, so autoplay is allowed here.
    if (music?.enabled) music.play();
    window.setTimeout(() => setOpened(true), 1100);
  }

  return (
    <>
      <div className={`reveal-wrap ${opened ? "is-open" : ""}`}>{children}</div>

      {!opened && (
        <div
          className={`cover bg-paper ${opening ? "cover--opening" : ""}`}
          aria-hidden={opened}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-ink/50">
            {config.event.subtitle}
          </p>
          <h1 className="banner-script text-5xl sm:text-6xl leading-none">
            {config.cover.bannerTop}
          </h1>
          <HeroIllustration />
          <h2 className="banner-script text-4xl sm:text-5xl leading-none">
            {config.cover.bannerBottom}
          </h2>

          <button
            type="button"
            onClick={open}
            className="envelope mt-2 focus:outline-none"
            aria-label={config.cover.sealText}
          >
            <span className="envelope__body" />
            <span className="envelope__flap" />
            <WaxSeal />
          </button>
          <p className="mt-1 animate-pop text-sm text-ink/50">
            Toca el sello para abrir 👆
          </p>
        </div>
      )}
    </>
  );
}
