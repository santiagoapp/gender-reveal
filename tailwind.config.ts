import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Gender-reveal pastel palette (edit in src/lib/config.ts for runtime tints).
        boy: "#9ec5ff",
        girl: "#ffb3c8",
        cream: "#fff8f3",
        ink: "#3a2f3a",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Quicksand"', "system-ui", "sans-serif"],
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pop: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        pop: "pop 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
