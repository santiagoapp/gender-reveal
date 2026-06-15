// ────────────────────────────────────────────────────────────────────────────
// EDIT ME — all event parameters live here (no backend, so this is the source
// of truth for everything that doesn't come from the Google Sheet).
// ────────────────────────────────────────────────────────────────────────────

export const config = {
  // Fixed event date/time used by the countdown. ISO 8601 with timezone offset.
  // Example below is Colombia time (-05:00). Change to your real date.
  eventDateISO: "2026-08-15T16:00:00-05:00",

  event: {
    title: "Gender Reveal",
    // Quién invita / encabezado
    hosts: "Santiago & Familia",
    intro:
      "Con mucha ilusión queremos compartir contigo un momento muy especial.",
    question: "¿Será niño o niña?",
    callToAction: "¡Ven a descubrirlo con nosotros!",
    // Detalles del evento
    locationName: "Por definir",
    locationAddress: "Dirección por definir",
    // Pega aquí un enlace de Google Maps (opcional, se muestra un botón)
    locationMapsUrl: "",
    dressCode: "Trae algo rosa o azul según tu apuesta 💖💙",
    note: "Confirma tu asistencia antes del evento. ¡Te esperamos!",
  },

  // Texto del botón / estados de confirmación
  confirm: {
    idle: "Confirmar asistencia",
    loading: "Confirmando…",
    done: "¡Asistencia confirmada! 🎉",
    error: "Hubo un problema. Intenta de nuevo.",
  },

  // Endpoint de escritura (Google Apps Script Web App) — se inyecta por env.
  appsScriptUrl: process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "",
  // Token compartido (guard ligero) — debe coincidir con el del Apps Script.
  confirmToken: process.env.NEXT_PUBLIC_CONFIRM_TOKEN || "",

  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export type EventConfig = typeof config;
