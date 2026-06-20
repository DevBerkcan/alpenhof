"use client";

import { useEffect, useState } from "react";

/**
 * Liefert `true`, wenn der Nutzer reduzierte Bewegung bevorzugt.
 * Wird genutzt, um aufwändige Animationen/3D zurückzufahren (Accessibility).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
