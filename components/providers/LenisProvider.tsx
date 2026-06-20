"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Initialisiert Lenis Smooth-Scroll und koppelt es sauber an GSAP ScrollTrigger
 * (kanonische Integration: Lenis treibt den gsap-Ticker, ScrollTrigger.update
 * läuft bei jedem Lenis-Scroll). Anker-Links werden sanft angescrollt.
 * Respektiert prefers-reduced-motion.
 */
export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // ScrollTrigger bei jedem Lenis-Scroll aktualisieren
    lenis.on("scroll", ScrollTrigger.update);

    // Lenis über den gsap-Ticker treiben (ein rAF-Loop für alles)
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Sanftes Scrollen für alle internen Anker-Links
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    }
    document.addEventListener("click", onClick);

    return () => {
      gsap.ticker.remove(onTick);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
