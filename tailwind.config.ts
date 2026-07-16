import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // "Ositos" (teddy bear) gender-reveal palette — matched to the
        // byyoya.com/revelaci-osi watercolor invitation.
        osito: "#b07d56", // caramel teddy brown
        ositoDark: "#8a5e3c",
        boy: "#9ec5ff", // osito azul
        girl: "#ffb3c8", // osito rosa
        cream: "#fbf4ea", // warm paper background
        ink: "#4a3a2c",
        cocoa: "#a25e3a", // terracotta brown used for body & heading text
        cocoaDark: "#8a4a2c",
        dusty: "#6f8db0", // dusty blue countdown box
        rosepanel: "#f1bdb9", // pink torn-paper panel
        bubblegum: "#f2afc1", // pink call-to-action buttons
      },
      fontFamily: {
        // Real fonts from the byyoya.com/revela-ositos Canva design.
        display: ['"Agbalumo"', "Georgia", "serif"], // bouncy rounded display headings
        body: ['"Lora"', "Georgia", "serif"], // elegant serif body
        ui: ['"Arimo"', "system-ui", "sans-serif"], // sans for countdown / labels
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.85)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        rise: {
          "0%": { transform: "translateY(110vh) scale(0.9)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "100%": { transform: "translateY(-15vh) scale(1.1)", opacity: "0" },
        },
        sway: {
          "0%,100%": { transform: "translateX(-8px)" },
          "50%": { transform: "translateX(8px)" },
        },
        // Gentle wandering flight, like the byyoya.com reference airplane.
        fly: {
          "0%,100%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(-2.5%, -3.5%) rotate(-2deg)" },
          "50%": { transform: "translate(2%, 2.5%) rotate(1.5deg)" },
          "75%": { transform: "translate(3%, -2.5%) rotate(2deg)" },
        },
        // Expanding, fading ring behind the play button (attention pulse).
        pingRing: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "100%": { transform: "scale(1.7)", opacity: "0" },
        },
        // Soft breathing scale for the play button.
        breathe: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.06)" },
        },
        // Pulsing glow on the pink CTA (shadow only, so hover-scale still works).
        ctaGlow: {
          "0%,100%": {
            boxShadow:
              "inset 0 0 0 2px rgba(255,255,255,0.85), 0 8px 18px rgba(242,175,193,0.45)",
          },
          "50%": {
            boxShadow:
              "inset 0 0 0 2px rgba(255,255,255,0.85), 0 10px 28px rgba(242,175,193,0.9)",
          },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pop: "pop 0.5s ease-out both",
        rise: "rise linear infinite",
        sway: "sway 5s ease-in-out infinite",
        fly: "fly 7s ease-in-out infinite",
        "ping-ring": "pingRing 2s cubic-bezier(0,0,0.2,1) infinite",
        breathe: "breathe 2.6s ease-in-out infinite",
        "cta-glow": "ctaGlow 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
