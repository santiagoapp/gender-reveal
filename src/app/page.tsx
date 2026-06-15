import { config } from "@/lib/config";
import { getGroups } from "@/lib/sheet";

// Landing / fallback page. Each guest group gets its own URL at /<slug>/.
// This page is mostly a friendly placeholder for anyone hitting the root.
export default async function Home() {
  const groups = await getGroups();
  const showIndex = process.env.NODE_ENV !== "production";

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="text-6xl animate-floaty">🧸</div>
      <h1 className="mt-6 font-display text-4xl sm:text-5xl font-bold">
        {config.event.title}
      </h1>
      <p className="mt-4 text-lg text-ink/70">{config.event.intro}</p>
      <p className="mt-8 text-ink/60">
        Esta es una invitación personalizada. Abre el enlace que recibiste para
        ver tu invitación. 💖💙
      </p>

      {showIndex && groups.length > 0 && (
        <div className="card mt-10 p-6 text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-ink/50">
            Grupos (solo visible en desarrollo)
          </p>
          <ul className="space-y-1">
            {groups.map((g) => (
              <li key={g.slug}>
                <a
                  className="text-boy underline"
                  href={`${config.basePath}/${g.slug}/`}
                >
                  /{g.slug}/
                </a>{" "}
                <span className="text-ink/50">— {g.names.join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
