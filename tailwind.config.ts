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
        display: ['"Fraunces"', "Georgia", "serif"], // soft retro serif headings
        body: ['"Gabriela"', "Georgia", "serif"], // warm storybook body serif
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
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pop: "pop 0.5s ease-out both",
        rise: "rise linear infinite",
        sway: "sway 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
