"use client";

import { useState } from "react";
import { config } from "@/lib/config";
import type { Group } from "@/lib/groups";

type Status = "idle" | "loading" | "done" | "error";

// Per-group confirmation widget. Lists every member of the group with a
// checkbox (all preselected). The guest can confirm everyone or pick only
// some, then submit. The POST hits the Apps Script web app, which writes
// "Confirmado" / "No asiste" per person into the public Google Sheet.
export default function GroupConfirm({ group }: { group: Group }) {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    () => Object.fromEntries(group.members.map((m) => [m.id, true]))
  );
  const [status, setStatus] = useState<Status>("idle");

  const ids = group.members.map((m) => m.id);
  const chosen = ids.filter((id) => selected[id]);
  const allChecked = chosen.length === ids.length;

  function toggle(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  }
  function toggleAll() {
    const next = !allChecked;
    setSelected(Object.fromEntries(ids.map((id) => [id, next])));
  }

  async function submit() {
    if (status === "loading" || status === "done") return;
    if (chosen.length === 0) return;
    setStatus("loading");

    if (!config.appsScriptUrl) {
      console.warn("NEXT_PUBLIC_APPS_SCRIPT_URL no configurado.");
      setStatus("error");
      return;
    }

    try {
      // text/plain avoids a CORS preflight (Apps Script can't answer OPTIONS).
      const res = await fetch(config.appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          slug: group.slug,
          token: config.confirmToken,
          confirmed: chosen, // ids (column A "No.") of attending guests
        }),
        redirect: "follow",
      });
      const data = await res.json().catch(() => null);
      if (data && data.ok === false) {
        console.warn("Apps Script:", data.error);
        setStatus("error");
      } else {
        // ok:true, or response unreadable due to CORS but request likely sent.
        setStatus("done");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  const c = config.confirm;

  if (status === "done") {
    return (
      <div className="mx-auto mt-6 max-w-[20rem] rounded-2xl bg-bubblegum/20 px-5 py-5 text-center">
        <p className="font-display text-cocoa text-[clamp(1.25rem,5.5vw,1.6rem)]">
          {c.done}
        </p>
        <p className="mt-2 text-sm text-cocoa/70">
          {chosen.length}/{ids.length}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-[20rem] text-left">
      <p className="text-center font-display text-cocoa text-[clamp(1.25rem,5.5vw,1.6rem)]">
        {c.title}
      </p>
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

      {group.members.length > 1 && (
        <button
          type="button"
          onClick={toggleAll}
          className="mt-3 text-sm font-semibold text-cocoa/70 underline underline-offset-2"
        >
          {c.selectAll}
        </button>
      )}

      <div className="mt-5 flex flex-col items-center">
        <button
          type="button"
          onClick={submit}
          disabled={status === "loading" || chosen.length === 0}
          className="btn-pink disabled:opacity-50"
        >
          {status === "loading" ? c.loading : c.idle}
        </button>
        {chosen.length === 0 && (
          <p className="mt-2 text-xs text-cocoa/60">{c.noneSelected}</p>
        )}
        {status === "error" && (
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-2 text-sm text-cocoa/70 underline"
          >
            {c.retry}
          </button>
        )}
      </div>
    </div>
  );
}
