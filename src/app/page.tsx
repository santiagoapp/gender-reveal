import { config } from "@/lib/config";
import { asset } from "@/lib/assets";
import PlayButton from "@/components/PlayButton";
import CountdownBox from "@/components/CountdownBox";

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

export default function Home() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] overflow-hidden bg-cream font-body text-cocoa">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative px-6 pb-4 pt-10 text-center">
        <Decor src="blue-watercolor-stars.png" className="left-3 top-6 w-24 rotate-[-6deg]" />

        <p className="mx-auto max-w-[18rem] pt-16 text-xl leading-snug">
          {config.music.prompt}
        </p>

        <div className="mt-6 flex justify-center">
          <PlayButton />
        </div>

        {/* Banner "Revelación" with the little bird perched at the end */}
        <div className="relative mx-auto mt-8 w-full max-w-[24rem]">
          <img
            src={asset("peach-watercolor-banner.png")}
            alt=""
            className="cutout w-full"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-4xl font-semibold italic text-cocoa drop-shadow-sm sm:text-5xl">
              Revelación
            </span>
          </span>
          <Decor
            src="yellow-watercolor-bird.png"
            className="-right-2 -top-6 w-20"
          />
        </div>

        {/* Two aviator bears in the airplane */}
        <img
          src={asset("two-teddy-bears-airplane.png")}
          alt="Dos ositos aviadores en una avioneta"
          className="cutout mx-auto -mt-2 w-[88%]"
        />
        <Decor src="three-pink-stars.png" className="-left-2 bottom-24 w-20" />

        <h2 className="font-display text-5xl font-semibold italic text-cocoa">
          de Género
        </h2>

        <p className="mx-auto mt-6 max-w-[20rem] text-xl leading-snug">
          {ev.intro}
        </p>

        <p className="mx-auto mt-6 max-w-[22rem] text-lg leading-snug">
          <span className="font-semibold">{ev.question}</span> {ev.callToAction}
        </p>

        <h3 className="mt-7 font-display text-5xl font-bold italic text-cocoaDark">
          {ev.hosts}
        </h3>
      </section>

      {/* ─────────────── DATE / TIME (pink torn-paper band) ─────────────── */}
      <section className="relative mt-6">
        <img
          src={asset("pink-watercolor-torn-paper-border.png")}
          alt=""
          className="block w-full"
        />
        <div className="relative -mt-px bg-rosepanel px-6 py-8">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-6 text-white">
              <div className="flex flex-col items-center text-center">
                {/* Asset is white-on-black line art with two icons; blend out
                    the black and crop to a single calendar. */}
                <div className="h-16 w-16 overflow-hidden">
                  <img
                    src={asset("calendar-icons-with-hearts.png")}
                    alt=""
                    className="h-16 max-w-none mix-blend-screen"
                  />
                </div>
                <p className="mt-2 font-display text-2xl font-bold italic leading-tight">
                  {ev.dateLabel}
                  <br />
                  {ev.dateValue}
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-[3.2rem] overflow-hidden">
                  <img
                    src={asset("two-alarm-clocks-outline.png")}
                    alt=""
                    className="h-16 max-w-none mix-blend-screen"
                  />
                </div>
                <p className="mt-2 font-display text-2xl font-bold italic">
                  {ev.timeValue}
                </p>
              </div>
            </div>
            <img
              src={asset("aviator-bear-waving-closeup.png")}
              alt="Osito aviador saludando"
              className="cutout w-1/2 max-w-[12rem]"
            />
          </div>
        </div>
        <img
          src={asset("pink-watercolor-torn-paper-border.png")}
          alt=""
          className="block w-full -scale-y-100"
        />
      </section>

      {/* ─────────────── COUNTDOWN + LOCATION ─────────────── */}
      <section className="relative px-6 pb-8 pt-6 text-center">
        <p className="font-display text-3xl font-semibold italic text-cocoa">
          Sólo Faltan:
        </p>
        <div className="mt-4 flex justify-center">
          <CountdownBox dateISO={config.eventDateISO} />
        </div>

        <Decor src="three-pink-stars.png" className="right-2 top-28 w-24" />
        <Decor src="three-blue-stars.png" className="left-1 top-48 w-24" />

        {/* Girl bear waving over a soft blue watercolor splash */}
        <div className="relative mx-auto mt-6 w-[70%] max-w-[18rem]">
          <img
            src={asset("soft-blue-watercolor-circle.png")}
            alt=""
            className="absolute inset-0 m-auto w-full scale-125 opacity-90"
          />
          <img
            src={asset("waving-bear-pink-bow.png")}
            alt="Osita saludando con moño rosa"
            className="cutout relative w-full"
          />
        </div>

        <p className="mt-8 font-display text-2xl font-semibold italic leading-snug text-cocoa">
          Te esperamos en:
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
            Ver ubicación
          </a>
        )}
        <Decor src="blue-watercolor-star.png" className="-right-1 bottom-2 w-16" />
      </section>

      {/* ─────────────── GIFTS / DRESS CODE / RSVP ─────────────── */}
      <section className="relative px-6 pb-16 pt-2 text-center">
        {/* Aviator bear descending on a parachute, bird perched on top */}
        <div className="relative float-left mb-2 w-[42%] max-w-[12rem]">
          <Decor
            src="cute-yellow-bird.png"
            className="left-1/2 top-0 w-12 -translate-x-1/2"
          />
          <img
            src={asset("aviator-bear-blue-parachute.png")}
            alt="Osito aviador en paracaídas"
            className="cutout w-full pt-6"
          />
        </div>

        <div className="space-y-6 pt-6 text-xl leading-snug">
          <p className="mx-auto max-w-[16rem]">{ev.giftBoy}</p>
          <p className="mx-auto max-w-[16rem]">{ev.giftGirl}</p>
          <p className="mx-auto max-w-[18rem]">
            <span className="font-semibold">Código de Vestimenta:</span>
            <br />
            {ev.dressCode}
          </p>
        </div>

        <div className="clear-both" />

        <p className="mx-auto mt-10 max-w-[20rem] text-xl leading-snug">
          {ev.note}
        </p>

        {config.whatsappNumber ? (
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

        <Decor src="orange-watercolor-stars.png" className="left-1 bottom-24 w-20" />
        <Decor src="orange-watercolor-stars.png" className="right-1 bottom-28 w-20 -scale-x-100" />

        {/* Pink cloud + girl bear peeking from the bottom corner */}
        <Decor
          src="pink-watercolor-cloud.png"
          className="-left-4 bottom-0 w-28"
        />
        <Decor
          src="girl-teddy-bear-bow.png"
          className="-right-2 -bottom-2 w-28"
        />
      </section>
    </div>
  );
}
