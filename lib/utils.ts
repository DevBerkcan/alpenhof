import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Verbindet Klassennamen und löst Tailwind-Konflikte sauber auf. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
