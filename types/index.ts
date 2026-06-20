/**
 * Gemeinsame Typen für den Alpenhof-Relaunch.
 * (Inhaltstypen leben direkt in lib/content.ts; hier nur projektweite Helfer.)
 */

export type Season = "Sommer" | "Winter";

export interface SequenceFrame {
  image: string;
  caption: string;
  title: string;
}

export interface CtaLink {
  label: string;
  href: string;
}
