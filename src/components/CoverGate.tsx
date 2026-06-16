"use client";

import { useEffect, useState } from "react";
import { config } from "@/lib/config";
import { asset } from "@/lib/assets";
import { useMusic } from "./MusicProvider";

/* eslint-disable @next/next/no-img-element */

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
          <div className="cover__inner">
            {/* Banner "Revelación" with the perched bird */}
            <div className="relative w-[88%] max-w-[22rem]">
              <img
                src={asset("peach-watercolor-banner.png")}
                alt=""
                className="cutout w-full"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-semibold italic text-cocoa drop-shadow-sm text-[clamp(1.6rem,7vw,2.6rem)]">
                  {config.cover.bannerTop}
                </span>
              </span>
              <img
                src={asset("yellow-watercolor-bird.png")}
                alt=""
                className="cutout absolute -right-1 -top-[14%] w-[22%] max-w-[5rem]"
              />
            </div>

            {/* Two aviator bears in the airplane */}
            <img
              src={asset("two-teddy-bears-airplane.png")}
              alt="Dos ositos aviadores en una avioneta"
              className="cutout w-[78%] max-w-[19rem]"
            />

            <h2 className="font-display font-semibold italic text-cocoa text-[clamp(1.9rem,8vw,3rem)]">
              {config.cover.bannerBottom}
            </h2>

            {/* Real kraft envelope + gold teddy wax seal — tap to open */}
            <button
              type="button"
              onClick={open}
              className="env mt-2 focus:outline-none"
              aria-label={config.cover.sealText}
            >
              <img
                src={asset("kraft-envelope.png")}
                alt=""
                className="env__paper"
              />
              <svg className="env__arc" viewBox="0 0 200 80" aria-hidden="true">
                <defs>
                  <path id="env-arc" d="M20 70 A 112 112 0 0 1 180 70" fill="none" />
                </defs>
                <text
                  fontSize="18"
                  fontWeight="700"
                  letterSpacing="1.2"
                  style={{ fontFamily: "Quicksand, sans-serif" }}
                >
                  <textPath href="#env-arc" startOffset="50%" textAnchor="middle">
                    {config.cover.sealText}
                  </textPath>
                </text>
              </svg>
              <img
                src={asset("wax-seal-teddy.png")}
                alt=""
                className="env__seal"
              />
            </button>
            <p className="mt-1 animate-pop text-sm text-cocoa/70">
              Toca el sobre para abrir 👆
            </p>
          </div>
        </div>
      )}
    </>
  );
}
