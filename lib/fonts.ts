import localFont from "next/font/local";

/**
 * Display-Schrift: Fraunces – warme, edle Variable-Serif mit optischen Größen.
 * Lokal eingebunden (DSGVO-freundlich: kein externer Google-Request beim Besucher).
 * Die .ttf-Dateien liegen in /public/fonts und können bei Bedarf ausgetauscht werden.
 */
export const fraunces = localFont({
  src: [
    {
      path: "../public/fonts/Fraunces.ttf",
      style: "normal",
      weight: "300 600",
    },
    {
      path: "../public/fonts/Fraunces-Italic.ttf",
      style: "italic",
      weight: "300 600",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

/**
 * Body-Schrift: Outfit – geometrische, klare Variable-Sans für Fließtext & UI.
 * Ebenfalls lokal eingebunden.
 */
export const outfit = localFont({
  src: [
    {
      path: "../public/fonts/Outfit.ttf",
      style: "normal",
      weight: "300 600",
    },
  ],
  variable: "--font-outfit",
  display: "swap",
});
