import { config } from "@/lib/config";
import { asset } from "@/lib/assets";
import type { Group } from "@/lib/groups";
import PlayButton from "./PlayButton";
import CountdownBox from "./CountdownBox";
import GroupConfirm from "./GroupConfirm";

/* eslint-disable @next/next/no-img-element */

const ev = config.event;

// A single watercolor cut-out, absolutely positioned via `className`.
function Decor({
  src,
  alt = "",
  className,
  style,
}: {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={asset(src)}
      alt={alt}
      aria-hidden={alt === ""}
      className={`decor cutout ${className ?? ""}`}
      style={style}
    />
  );
}

// The full watercolor invitation. When `group` is provided (per-slug route),
// the RSVP section shows the per-person confirmation widget; otherwise it
// shows the generic contact button.
export default function Invitation({ group }: { group?: Group }) {
  return (
    <div className="bg-canvas relative mx-auto w-full max-w-[30rem] overflow-hidden font-body text-cocoa shadow-[0_0_60px_rgba(120,90,60,0.12)]">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative px-6 pb-4 pt-10 text-center">
        <Decor src="blue-watercolor-stars.webp" className="left-3 top-6 w-24 rotate-[-6deg]" />

        {/* Per-group greeting, e.g. "Para: Familia Ramirez Piamba" */}
        {group && (
          <h1 className="pt-[clamp(3rem,11vw,4.5rem)] font-display text-cocoaDark text-[clamp(1.5rem,6.5vw,2rem)]">
            {ev.guestLabel} {group.title}
          </h1>
        )}

        <p
          className={`mx-auto max-w-[20rem] leading-snug text-[clamp(1.05rem,4.6vw,1.3rem)] ${
            group ? "pt-5" : "pt-[clamp(3rem,11vw,4.5rem)]"
          }`}
        >
          {config.music.prompt}
        </p>

        <div className="mt-6 flex justify-center">
          <PlayButton />
        </div>

        {/* Banner "Revelación" with the little bird perched at the end */}
        <div className="relative mx-auto mt-8 w-[94%] max-w-[24rem]">
          <img src={asset("peach-watercolor-banner.webp")} alt="" className="cutout w-full" />
          <span className="absolute inset-0 flex items-center justify-center pr-[14%]">
            <span className="font-display text-cocoa drop-shadow-sm text-[clamp(2rem,9.5vw,3.4rem)]">
              {config.cover.bannerTop}
            </span>
          </span>
          <Decor src="sleeping-baby-angel.webp" className="-right-[3%] -top-[8%] z-10 w-[27%]" />
        </div>

        {/* Two aviator bears in the airplane */}
        <img
          src={asset("two-teddy-bears-airplane.webp")}
          alt="Dos ositos aviadores en una avioneta"
          className="cutout mx-auto -mt-2 w-[88%] animate-fly"
        />
        <Decor src="three-pink-stars.webp" className="-left-2 bottom-24 w-20" />

        <h2 className="font-display text-cocoa text-[clamp(2.25rem,11vw,3.75rem)]">
          {config.cover.bannerBottom}
        </h2>

        <p className="mx-auto mt-6 max-w-[22rem] leading-snug text-[clamp(1.05rem,4.6vw,1.3rem)]">
          {ev.intro}
        </p>

        <p className="mx-auto mt-6 max-w-[24rem] leading-snug text-[clamp(0.98rem,4.2vw,1.2rem)]">
          <span className="font-semibold">{ev.question}</span> {ev.callToAction}
        </p>

        <h3 className="mt-7 font-display text-cocoaDark text-[clamp(2.25rem,10vw,3.75rem)]">
          {ev.hosts}
        </h3>
      </section>

      {/* ─────────────── DATE / TIME (pink torn-paper band) ─────────────── */}
      <section className="relative mt-6">
        {/* Torn dusty-rose watercolor panel (same art as the reference site).
            Top slice is mirrored horizontally so the taller pink side sits on
            the right; the bottom slice is its exact vertical mirror. The
            rosefill band only shows if the content grows taller than the two
            slices. */}
        <div aria-hidden className="absolute inset-0">
          <div className="bg-rosefill absolute inset-x-0 bottom-[20%] top-[20%]" />
          <img
            src={asset("pink-torn-paper-edge-tight.webp")}
            alt=""
            className="absolute inset-x-0 top-0 w-full -scale-x-100"
          />
          <img
            src={asset("pink-torn-paper-edge-tight.webp")}
            alt=""
            className="absolute inset-x-0 bottom-0 w-full -scale-x-100 -scale-y-100"
          />
        </div>
        <div className="relative px-6 pb-[16%] pt-[18%]">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-4 text-white">
              <div className="flex flex-col items-center text-center">
                <img
                  src={asset("calendar-heart-single.webp")}
                  alt=""
                  className="h-11 w-auto"
                />
                <p className="mt-2 font-display leading-tight text-[clamp(1.25rem,5.5vw,1.7rem)]">
                  {ev.dateLabel}
                  <br />
                  {ev.dateValue}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src={asset("alarm-clock-single.webp")}
                  alt=""
                  className="h-12 w-auto"
                />
                <p className="mt-1 font-display text-[clamp(1.25rem,5.5vw,1.7rem)]">
                  {ev.timeValue}
                </p>
              </div>
            </div>
            <img
              src={asset("aviator-bear-waving-closeup.webp")}
              alt="Osito aviador saludando"
              className="cutout w-1/2 max-w-[12rem]"
            />
          </div>
        </div>
      </section>

      {/* ─────────────── COUNTDOWN + LOCATION ─────────────── */}
      <section className="relative px-6 pb-8 pt-6 text-center">
        <p className="font-display text-cocoa text-[clamp(1.6rem,7vw,2.25rem)]">
          {ev.countdownTitle}
        </p>
        <div className="mt-4 flex justify-center">
          <CountdownBox dateISO={config.eventDateISO} />
        </div>

        <Decor src="three-pink-stars.webp" className="right-2 top-28 w-24" />
        <Decor src="three-blue-stars.webp" className="left-1 top-48 w-24" />

        {/* Girl bear waving over a soft blue watercolor splash */}
        <div className="relative mx-auto mt-6 w-[70%] max-w-[18rem]">
          <img
            src={asset("soft-blue-watercolor-circle.webp")}
            alt=""
            className="absolute inset-0 m-auto w-full scale-125 opacity-90"
          />
          <img
            src={asset("girl-teddy-bear-bow.webp")}
            alt="Osita saludando con moño rosa"
            className="cutout relative w-full"
          />
        </div>

        <p className="mt-8 font-display leading-snug text-cocoa text-[clamp(1.25rem,5.5vw,1.7rem)]">
          {ev.locationIntro}
          <br />
          {ev.locationName}
          <br />
          {ev.locationAddress}
          <br />
          {ev.locationArea}
        </p>

        {ev.locationMapsUrl && (
          <a
            href={ev.locationMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pink mt-5"
          >
            {ev.locationButton}
          </a>
        )}
        <Decor src="blue-watercolor-star.webp" className="-right-1 bottom-2 w-16" />
      </section>

      {/* ─────────────── GIFTS / DRESS CODE / RSVP ─────────────── */}
      <section className="relative px-6 pb-16 pt-2 text-center">
        {/* Aviator bear descending on a parachute, bird perched on top */}
        <div className="relative float-left mb-2 w-[42%] max-w-[12rem]">
          <Decor src="cute-yellow-bird.webp" className="left-1/2 top-0 z-10 w-12 -translate-x-1/2" />
          <img
            src={asset("aviator-bear-blue-parachute.webp")}
            alt="Osito aviador en paracaídas"
            className="cutout w-full pt-6"
          />
        </div>

        <div className="space-y-6 pt-6 leading-snug text-[clamp(1.05rem,4.6vw,1.3rem)]">
          <p className="mx-auto max-w-[16rem]">{ev.giftBoy}</p>
          <p className="mx-auto max-w-[16rem]">{ev.giftGirl}</p>
          <p className="mx-auto max-w-[18rem]">
            <span className="font-semibold">{ev.dressCodeLabel}</span>
            <br />
            {ev.dressCode}
          </p>
        </div>

        <div className="clear-both" />

        <p className="mx-auto mt-10 max-w-[22rem] leading-snug text-[clamp(1.05rem,4.6vw,1.3rem)]">
          {ev.note.replace("{deadline}", ev.rsvpDeadline)}
        </p>

        {/* Per-group confirmation when a group is known; otherwise a contact CTA. */}
        {group ? (
          <GroupConfirm group={group} />
        ) : config.whatsappNumber ? (
          <a
            href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
              `¡Hola! Confirmo mi asistencia a la ${ev.title} de ${ev.hosts} 🧸`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pink mt-5"
          >
            {ev.rsvpLabel}
          </a>
        ) : (
          <span className="btn-pink mt-5 opacity-90">{ev.rsvpLabel}</span>
        )}

        <Decor src="orange-watercolor-stars.webp" className="left-1 bottom-24 w-20" />
        <Decor src="orange-watercolor-stars.webp" className="right-1 bottom-28 w-20 -scale-x-100" />
      </section>

      {/* ─────────────── CLOSING (blue torn-paper band) ─────────────── */}
      <section className="relative mt-14">
        <img
          src={asset("blue-watercolor-torn-paper-border.webp")}
          alt=""
          className="block w-full"
        />
        {/* Pink cloud straddling the torn edge */}
        <Decor src="pink-watercolor-cloud.webp" className="-left-5 -top-10 z-10 w-36" />
        {/* Big girl bear sitting on the bottom edge, mirrored to face the text */}
        <img
          src={asset("pink-bow-teddy-bear-scarf.webp")}
          alt="Osita con moño rosa"
          className="cutout absolute bottom-0 right-1 z-10 w-[44%] max-w-[14rem] -scale-x-100"
        />
        <div className="absolute bottom-[7%] left-0 z-10 w-[58%] px-5 text-center text-white">
          <p className="font-display leading-snug drop-shadow-sm text-[clamp(1.15rem,5vw,1.5rem)]">
            {ev.closingLine}
          </p>
          <p className="mt-1 font-display drop-shadow-sm text-[clamp(1.6rem,7vw,2.1rem)]">
            {ev.closingHighlight}
          </p>
        </div>
      </section>
    </div>
  );
}
