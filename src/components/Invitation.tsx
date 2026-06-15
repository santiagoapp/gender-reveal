import { config } from "@/lib/config";
import type { Group } from "@/lib/sheet";
import Countdown from "./Countdown";
import ConfirmButton from "./ConfirmButton";
import FloatingDecor from "./FloatingDecor";
import MusicToggle from "./MusicToggle";
import MusicPrompt from "./MusicPrompt";
import HeroBears from "./HeroBears";

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("es-CO", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function googleCalendarUrl(): string {
  const start = new Date(config.eventDateISO);
  const end = new Date(
    start.getTime() + config.eventDurationHours * 3600 * 1000
  );
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${config.event.title} · ${config.event.hosts}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: config.event.callToAction,
    location: `${config.event.locationName} ${config.event.locationAddress}`.trim(),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function Invitation({ group }: { group: Group }) {
  const ev = config.event;
  const whatsappUrl = config.whatsappNumber
    ? `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
        `¡Hola! Confirmo mi asistencia a ${ev.title} 🧸`
      )}`
    : "";

  return (
    <div className="relative">
      <FloatingDecor />
      <MusicToggle />

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-10 sm:py-16">
        {/* Music prompt (only if a track is configured) */}
        <div className="mb-8">
          <MusicPrompt />
        </div>

        {/* Hero / banner */}
        <header className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-ink/50">
            {ev.subtitle} · {ev.hosts}
          </p>
          <h1 className="banner-script mt-2 text-5xl sm:text-6xl leading-none">
            {config.cover.bannerTop}
          </h1>
          <div className="my-3">
            <HeroBears className="max-h-56" />
          </div>
          <h2 className="banner-script text-4xl sm:text-5xl leading-none">
            {config.cover.bannerBottom}
          </h2>
          <p className="mt-5 font-display text-2xl sm:text-3xl">
            <span className="text-boy">💙</span>{" "}
            <span className="text-ink/80">{ev.question}</span>{" "}
            <span className="text-girl">💗</span>
          </p>
        </header>

        {/* Greeting to the group */}
        <section className="card mt-10 p-6 sm:p-8 text-center animate-pop">
          <p className="text-lg text-ink/80">{ev.intro}</p>
          <div className="mt-5">
            <p className="text-sm uppercase tracking-widest text-ink/50">
              Invitación para
            </p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2">
              {group.names.map((name) => (
                <li
                  key={name}
                  className="rounded-full bg-gradient-to-r from-girl/40 to-boy/40 px-4 py-1.5 text-sm font-semibold"
                >
                  🧸 {name}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-lg font-semibold">{ev.callToAction}</p>
        </section>

        {/* Countdown */}
        <section className="mt-12">
          <h2 className="section-title">Faltan</h2>
          <div className="mt-5">
            <Countdown dateISO={config.eventDateISO} />
          </div>
        </section>

        {/* Event details */}
        <section className="card mt-12 p-6 sm:p-8">
          <h2 className="section-title mb-5">Detalles</h2>
          <dl className="space-y-4">
            <Detail label="📅 Fecha" value={formatDate(config.eventDateISO)} />
            <Detail label="📍 Lugar" value={ev.locationName} />
            {ev.locationAddress && (
              <Detail label="🏠 Dirección" value={ev.locationAddress} />
            )}
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            {ev.locationMapsUrl && (
              <a
                href={ev.locationMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-boy/60 px-5 py-2 text-sm font-semibold hover:bg-boy"
              >
                📍 Ver en Maps
              </a>
            )}
            <a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-girl/60 px-5 py-2 text-sm font-semibold hover:bg-girl"
            >
              🗓️ Agregar al calendario
            </a>
          </div>
        </section>

        {/* Dress code */}
        {ev.dressCode && (
          <section className="card mt-8 p-6 sm:p-8 text-center">
            <h2 className="section-title mb-3">Código de vestimenta</h2>
            <p className="text-lg">{ev.dressCode}</p>
            <div className="mt-4 flex justify-center gap-4 text-3xl">
              <span className="animate-sway">💙</span>
              <span className="animate-floaty">🧸</span>
              <span className="animate-sway">💗</span>
            </div>
          </section>
        )}

        {/* Gift */}
        {ev.gift && (
          <section className="mt-8 text-center text-ink/70">
            <p>🎁 {ev.gift}</p>
          </section>
        )}

        {/* Confirmation */}
        <section className="mt-12 text-center">
          <h2 className="section-title mb-4">Confirma tu asistencia</h2>
          <p className="mb-5 text-ink/70">{ev.note}</p>
          <ConfirmButton slug={group.slug} />
          {whatsappUrl && (
            <div className="mt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-700 underline"
              >
                o confírmanos por WhatsApp
              </a>
            </div>
          )}
        </section>

        <footer className="mt-14 text-center text-xs text-ink/40">
          Hecho con 💙🧸💗 · {ev.title}
        </footer>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
      <dt className="w-32 shrink-0 text-sm font-semibold uppercase tracking-wide text-ink/50">
        {label}
      </dt>
      <dd className="text-lg">{value}</dd>
    </div>
  );
}
