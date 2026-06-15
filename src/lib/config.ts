// ────────────────────────────────────────────────────────────────────────────
// EDIT ME — all event parameters live here (no backend, so this is the source
// of truth for everything that doesn't come from the Google Sheet).
// Tema: "Ositos" (teddy bear) gender reveal — osito azul 💙 / osito rosa 💗
// ────────────────────────────────────────────────────────────────────────────

export const config = {
  // Fixed event date/time used by the countdown. ISO 8601 with timezone offset.
  // Example below is Colombia time (-05:00). Change to your real date.
  eventDateISO: "2026-08-15T16:00:00-05:00",
  // Duración estimada (horas) — usada para el botón "Agregar al calendario".
  eventDurationHours: 4,

  event: {
    title: "Revela Ositos",
    subtitle: "Gender Reveal",
    hosts: "Santiago & Familia",
    intro:
      "Con mucha ilusión queremos compartir contigo un momento muy especial.",
    question: "¿Osito azul o osito rosa?",
    callToAction: "¡Ven a descubrirlo con nosotros!",

    // Detalles del evento
    locationName: "Por definir",
    locationAddress: "Dirección por definir",
    locationMapsUrl: "", // pega un enlace de Google Maps (opcional)

    dressCode: "Ven de azul 💙 o rosa 💗 según tu apuesta",
    gift: "Tu presencia es nuestro mejor regalo 🧸",
    note: "Confirma tu asistencia antes del evento. ¡Te esperamos!",
  },

  // Música de fondo (opcional). Coloca un archivo en /public y pon la ruta,
  // p. ej. "/music/cancion.mp3". Déjalo vacío para ocultar el botón.
  musicUrl: "",

  // WhatsApp para dudas / confirmar por chat (opcional). Solo dígitos con
  // código de país, p. ej. "573001234567". Vacío = oculto.
  whatsappNumber: "",

  // Texto del botón / estados de confirmación
  confirm: {
    idle: "Confirmar asistencia",
    loading: "Confirmando…",
    done: "¡Asistencia confirmada! 🎉",
    error: "Hubo un problema. Intenta de nuevo.",
  },

  // Endpoint de escritura (Google Apps Script Web App) — se inyecta por env.
  appsScriptUrl: process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "",
  confirmToken: process.env.NEXT_PUBLIC_CONFIRM_TOKEN || "",

  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export type EventConfig = typeof config;
