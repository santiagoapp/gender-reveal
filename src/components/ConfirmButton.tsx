"use client";

import { useState } from "react";
import { config } from "@/lib/config";

type Status = "idle" | "loading" | "done" | "error";

export default function ConfirmButton({ slug }: { slug: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function confirm() {
    if (status === "loading" || status === "done") return;
    setStatus("loading");

    if (!config.appsScriptUrl) {
      // Endpoint not configured yet (e.g. local dev) — fail loudly but softly.
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
          slug,
          confirm: true,
          token: config.confirmToken,
        }),
        redirect: "follow",
      });
      const data = await res.json().catch(() => null);
      if (data && data.ok) {
        setStatus("done");
      } else if (data && !data.ok) {
        console.warn("Apps Script:", data.error);
        setStatus("error");
      } else {
        // Response unreadable due to CORS but request likely succeeded.
        setStatus("done");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  const label =
    status === "loading"
      ? config.confirm.loading
      : status === "done"
        ? config.confirm.done
        : status === "error"
          ? config.confirm.error
          : config.confirm.idle;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={confirm}
        disabled={status === "loading" || status === "done"}
        className={[
          "px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition",
          "focus:outline-none focus:ring-4 focus:ring-girl/40",
          status === "done"
            ? "bg-green-500 text-white cursor-default"
            : status === "error"
              ? "bg-red-400 text-white hover:bg-red-500"
              : "bg-gradient-to-r from-girl to-boy text-ink hover:scale-[1.03] active:scale-100",
          status === "loading" ? "opacity-70 cursor-wait" : "",
        ].join(" ")}
      >
        {label}
      </button>
      {status === "error" && (
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm text-ink/60 underline"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
