"use client";

import { useState } from "react";
import { config } from "@/lib/config";
import type { Group } from "@/lib/groups";

// Per-group confirmation widget. Lists every member of the group with a
// checkbox (all preselected). The confirm button is a WhatsApp link with a
// prefilled message naming the group and the selected guests — confirmation
// happens in the chat, no backend or tokens involved.
export default function GroupConfirm({ group }: { group: Group }) {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    () => Object.fromEntries(group.members.map((m) => [m.id, true]))
  );

  const ids = group.members.map((m) => m.id);
  const chosen = group.members.filter((m) => selected[m.id]);
  const allChecked = chosen.length === ids.length;

  function toggle(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }
  function toggleAll() {
    const next = !allChecked;
    setSelected(Object.fromEntries(ids.map((id) => [id, next])));
  }

  const c = config.confirm;

  // Multi-line WhatsApp message listing who attends (and who doesn't):
  //   ¡Hola! 👋 Somos *Familia Ramirez Piamba*.
  //   Con mucha alegría confirmamos nuestra asistencia a la *Revelación de Género* 🧸✈️
  //
  //   ✅ Asistirán:
  //   • Tío Arturo
  //   • Tía Heidy
  //
  //   🚫 No podrán asistir:
  //   • Fabian
  //
  //   ¡Nos vemos! 💙💗
  const notChosen = group.members.filter((m) => !selected[m.id]);
  const lines = [
    c.waGreeting.replace("{group}", group.title),
    c.waIntro.replace("{event}", config.event.title),
    "",
    c.waAttending,
    ...chosen.map((m) => `• ${m.name}`),
  ];
  if (notChosen.length > 0) {
    lines.push("", c.waNotAttending, ...notChosen.map((m) => `• ${m.name}`));
  }
  lines.push("", c.waClosing);
  const href = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;

  // Decline ("can't attend") — label and message depend on group size.
  const many = group.members.length > 1;
  const declineLabel = many ? c.declineMany : c.declineOne;
  const declineMsg = (many ? c.waDeclineMany : c.waDeclineOne)
    .replace("{group}", group.title)
    .replace("{event}", config.event.title);
  const declineHref = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    declineMsg
  )}`;

  return (
    <div className="relative z-10 mx-auto mt-6 w-full max-w-[20rem] text-left">
      <p className="text-center font-display text-cocoa text-[clamp(1.25rem,5.5vw,1.6rem)]">
        {c.title}
      </p>

      {/* Checkbox list only makes sense for groups; a single guest just picks
          a button below. */}
      {many && (
        <>
          <p className="mt-1 text-center text-sm text-cocoa/70">{c.selectHint}</p>

          <ul className="mt-4 space-y-2">
            {group.members.map((m) => (
              <li key={m.id}>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-white/70 px-4 py-2.5 shadow-sm ring-1 ring-cocoa/10 transition hover:bg-white">
                  <input
                    type="checkbox"
                    checked={!!selected[m.id]}
                    onChange={() => toggle(m.id)}
                    className="h-5 w-5 shrink-0 accent-bubblegum"
                  />
                  <span className="text-cocoa text-[clamp(1rem,4.4vw,1.2rem)]">
                    {m.name}
                  </span>
                </label>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggleAll}
            className="mt-3 text-sm font-semibold text-cocoa/70 underline underline-offset-2"
          >
            {c.selectAll}
          </button>
        </>
      )}

      <div className="relative mt-5 flex flex-col items-stretch gap-3">
        {chosen.length > 0 ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pink animate-cta-glow w-full"
          >
            {c.idle}
          </a>
        ) : (
          <span className="btn-pink w-full opacity-50">{c.idle}</span>
        )}

        {/* Secondary decline action (warning variant). */}
        <a
          href={declineHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-warning w-full"
        >
          {declineLabel}
        </a>

        {/* Absolute so showing/hiding the hint never changes the widget height. */}
        {chosen.length === 0 && (
          <p className="absolute inset-x-0 top-full mt-2 text-center text-xs text-cocoa/60">
            {c.noneSelected}
          </p>
        )}
      </div>
    </div>
  );
}
