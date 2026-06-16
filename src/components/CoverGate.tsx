"use client";

import { useEffect, useState } from "react";
import { config } from "@/lib/config";
import { asset } from "@/lib/assets";
import { useMusic } from "./MusicProvider";

/* eslint-disable @next/next/no-img-element */

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
          className={`cover bg-cream bg-paper font-body text-cocoa ${
            opening ? "cover--opening" : ""
          }`}
          aria-hidden={opened}
        >
          {/* Banner "Revelación" with the perched bird */}
          <div className="relative w-full max-w-[20rem]">
            <img src={asset("peach-watercolor-banner.png")} alt="" className="cutout w-full" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-3xl font-semibold italic text-cocoa drop-shadow-sm sm:text-4xl">
                {config.cover.bannerTop}
              </span>
            </span>
            <img
              src={asset("yellow-watercolor-bird.png")}
              alt=""
              className="cutout absolute -right-2 -top-5 w-16"
            />
          </div>

          {/* Two aviator bears in the airplane */}
          <img
            src={asset("two-teddy-bears-airplane.png")}
            alt="Dos ositos aviadores en una avioneta"
            className="cutout -my-2 w-[78%] max-w-[20rem]"
          />

          <h2 className="font-display text-4xl font-semibold italic text-cocoa">
            {config.cover.bannerBottom}
          </h2>

          {/* Envelope + wax seal — tap to open */}
          <button
            type="button"
            onClick={open}
            className="envelope mt-3 focus:outline-none"
            aria-label={config.cover.sealText}
          >
            <span className="envelope__body" />
            <span className="envelope__flap" />
            <WaxSeal />
          </button>
          <p className="mt-1 animate-pop text-sm text-cocoa/70">
            Toca el sobre para abrir 👆
          </p>
        </div>
      )}
    </>
  );
}
