import { config } from "@/lib/config";
import type { Group } from "@/lib/sheet";
import Countdown from "./Countdown";
import ConfirmButton from "./ConfirmButton";

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

export default function Invitation({ group }: { group: Group }) {
  const ev = config.event;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      {/* Hero */}
      <header className="text-center">
        <div className="text-5xl sm:text-6xl animate-floaty">🎈</div>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-ink/50">
          {ev.hosts}
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-6xl font-bold">
          {ev.title}
        </h1>
        <p className="mt-4 font-display text-2xl sm:text-3xl text-girl">
          {ev.question}
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
                {name}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-lg font-semibold">{ev.callToAction}</p>
      </section>

      {/* Countdown */}
      <section className="mt-10 text-center">
        <h2 className="font-display text-xl text-ink/70">Faltan</h2>
        <div className="mt-4">
          <Countdown dateISO={config.eventDateISO} />
        </div>
      </section>

      {/* Event details */}
      <section className="card mt-10 p-6 sm:p-8">
        <dl className="space-y-4">
          <Detail label="📅 Fecha" value={formatDate(config.eventDateISO)} />
          <Detail label="📍 Lugar" value={ev.locationName} />
          {ev.locationAddress && (
            <Detail label="🏠 Dirección" value={ev.locationAddress} />
          )}
          {ev.dressCode && (
            <Detail label="👗 Código" value={ev.dressCode} />
          )}
        </dl>
        {ev.locationMapsUrl && (
          <a
            href={ev.locationMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-boy/60 px-5 py-2 text-sm font-semibold hover:bg-boy"
          >
            Ver en Google Maps
          </a>
        )}
      </section>

      {/* Confirmation */}
      <section className="mt-10 text-center">
        <p className="mb-5 text-ink/70">{ev.note}</p>
        <ConfirmButton slug={group.slug} />
      </section>

      <footer className="mt-12 text-center text-xs text-ink/40">
        Hecho con 💖💙 · {ev.title}
      </footer>
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
