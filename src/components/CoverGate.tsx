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
            {/* Banner "Revelación" with the perched bird (slightly tilted) */}
            <div className="relative w-[92%] max-w-[23rem] -rotate-3">
              <img
                src={asset("peach-watercolor-banner.png")}
                alt=""
                className="cutout w-full"
              />
              <span className="absolute inset-0 flex items-center justify-center pr-[14%]">
                <span className="font-display text-cocoa drop-shadow-sm text-[clamp(2rem,9.5vw,3.4rem)]">
                  {config.cover.bannerTop}
                </span>
              </span>
              <img
                src={asset("sleeping-baby-angel.png")}
                alt=""
                className="cutout absolute -right-[3%] -top-[8%] w-[27%] max-w-[6.5rem]"
              />
            </div>

            {/* Two aviator bears in the airplane */}
            <img
              src={asset("two-teddy-bears-airplane.png")}
              alt="Dos ositos aviadores en una avioneta"
              className="cutout -mt-[4%] w-[84%] max-w-[21rem]"
            />

            <h2 className="-mt-[2%] font-display text-cocoa text-[clamp(2.25rem,11vw,3.75rem)]">
              {config.cover.bannerBottom}
            </h2>

            {/* Real kraft envelope + gold teddy wax seal — tap to open */}
            <button
              type="button"
              onClick={open}
              className="env -mt-[2%] focus:outline-none"
              aria-label={config.cover.sealText}
            >
              <img
                src={asset("kraft-envelope-alt.png")}
                alt=""
                className="env__paper"
              />
              <svg className="env__arc" viewBox="0 0 200 80" aria-hidden="true">
                <defs>
                  <path id="env-arc" d="M20 70 A 112 112 0 0 1 180 70" fill="none" />
                </defs>
                <text
                  fontSize="20"
                  fontWeight="700"
                  letterSpacing="1.4"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  <textPath href="#env-arc" startOffset="50%" textAnchor="middle">
                    {config.cover.sealText}
                  </textPath>
                </text>
              </svg>
              <span className="env__seal-wrap">
                <img
                  src={asset("wax-seal-teddy.png")}
                  alt=""
                  className="env__seal"
                />
              </span>
            </button>
            <p className="mt-1 animate-pop text-sm text-cocoa/70">
              {config.cover.hint}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
