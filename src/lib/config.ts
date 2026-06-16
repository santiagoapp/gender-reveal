// ────────────────────────────────────────────────────────────────────────────
// EDIT ME — all event parameters live here (no backend, so this is the source
// of truth for everything that doesn't come from the Google Sheet).
// Tema: "Ositos" (teddy bear) gender reveal — osito azul 💙 / osito rosa 💗
// ────────────────────────────────────────────────────────────────────────────

export const config = {
  // Fixed event date/time used by the countdown. ISO 8601 with timezone offset.
  // Domingo 2 de Agosto, 3:00 p.m. (hora de Colombia, -05:00).
  eventDateISO: "2026-08-02T15:00:00-05:00",
  // Duración estimada (horas) — usada para el botón "Agregar al calendario".
  eventDurationHours: 4,

  event: {
    title: "Revelación de Género",
    subtitle: "Revelación de Género",
    hosts: "Leidy y Santiago",

    intro:
      "Nuestro corazón está lleno de ilusión y muy pronto descubriremos un gran secreto…",
    question: "¿Quién viene en camino?",
    callToAction:
      "Acompáñanos a celebrar esta dulce espera y a vivir juntos la emoción de conocer una nueva sorpresa que cambiará nuestras vidas para siempre.",

    // Fecha legible mostrada en la tarjeta rosa.
    dateLabel: "Domingo",
    dateValue: "2 de Agosto",
    timeValue: "3:00 p.m.",

    locationName: "Salón de Eventos Villa Isabella",
    locationAddress: "Calle 31 # 23-622",
    locationArea: "Barrio Acacías Norte",
    locationMapsUrl: "https://maps.google.com/?q=Salón+de+Eventos+Villa+Isabella+Acacías",

    giftBoy: "Si eres team niño trae pañales etapa 2 en adelante",
    giftGirl: "Si eres team niña trae pañitos",
    dressCode: "Prendas de color azul o rosado",
    note: "Para organizar todo con amor, agradecemos que nos confirmes tu asistencia hasta el 5 de diciembre.",
    rsvpLabel: "CON LA MAMÁ",
    // Kept for the legacy per-group RSVP route (src/app/[slug]).
    gift: "",
  },

  // Portada tipo "sobre" (envelope) que se abre al hacer clic en el sello.
  cover: {
    bannerTop: "Revelación",
    bannerBottom: "de Género",
    sealText: "VER INVITACIÓN",
  },

  // Ilustraciones (acuarela). Coloca TUS imágenes con licencia en /public y
  // pon la ruta, p. ej. "/img/osos-avion.png". Vacío = placeholder con emoji.
  assets: {
    heroImageUrl: "", // ilustración principal (osos en avioneta, etc.)
  },

  // Música de fondo (opcional). Coloca un archivo en /public, p. ej.
  // "/music/cancion.mp3". Déjalo vacío para ocultar el reproductor.
  musicUrl: "",
  music: {
    prompt:
      "Dale play y déjate envolver por la melodía que inspira este momento.",
  },

  // WhatsApp para dudas / confirmar por chat (opcional). Solo dígitos con
  // código de país, p. ej. "573001234567". Vacío = oculto.
  whatsappNumber: "",

  confirm: {
    idle: "Confirmar asistencia",
    loading: "Confirmando…",
    done: "¡Asistencia confirmada! 🎉",
    error: "Hubo un problema. Intenta de nuevo.",
  },

  appsScriptUrl: process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "",
  confirmToken: process.env.NEXT_PUBLIC_CONFIRM_TOKEN || "",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export type EventConfig = typeof config;
