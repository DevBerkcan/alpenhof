import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cinematic Alpine Luxury – Farbsystem über CSS-Variablen (siehe globals.css)
        ink: "rgb(var(--ink) / <alpha-value>)",          // tiefes warmes Anthrazit (Background)
        coal: "rgb(var(--coal) / <alpha-value>)",        // etwas helleres Panel-Schwarz
        cream: "rgb(var(--cream) / <alpha-value>)",      // cremiges Off-White (Text auf dunkel)
        gold: "rgb(var(--gold) / <alpha-value>)",        // Champagner-Gold (Akzent)
        "gold-soft": "rgb(var(--gold-soft) / <alpha-value>)",
        glacier: "rgb(var(--glacier) / <alpha-value>)",  // alpines Gletscher-Türkis (Wellness-Akzent)
        stone: "rgb(var(--stone) / <alpha-value>)",      // gedämpftes Stein-Grau (Muted-Text)
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "10xl": "11rem",
        "11xl": "13rem",
      },
      letterSpacing: {
        tightest: "-0.06em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.77, 0, 0.175, 1)",
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        "scroll-hint": "scroll-hint 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
