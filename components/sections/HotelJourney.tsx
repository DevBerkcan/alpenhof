"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hotelJourney } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";

const SCROLL_PER_SCENE = 120; // vh pro Szene

export function HotelJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scenes = hotelJourney.scenes;
  const total = scenes.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Initial-State
    sceneRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });
    imgRefs.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { scale: 1.08 });
    });

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const pos = self.progress * (total - 1);

        // Crossfade zwischen Szenen
        sceneRefs.current.forEach((el, i) => {
          if (!el) return;
          el.style.opacity = String(Math.max(0, 1 - Math.abs(i - pos)));
        });

        // Ken-Burns: aktive Szene zoomt von 1.08 → 1.0
        imgRefs.current.forEach((el, i) => {
          if (!el) return;
          const dist = Math.abs(i - pos);
          const s = 1.08 - dist * 0.08;
          el.style.transform = `scale(${Math.max(1.0, Math.min(1.08, s))})`;
        });

        const idx = Math.round(pos);
        setActiveIndex((prev) => (prev === idx ? prev : idx));
      },
    });

    return () => st.kill();
  }, [total]);

  const active = scenes[activeIndex] ?? scenes[0];

  return (
    <div
      ref={wrapRef}
      style={{ height: `${total * SCROLL_PER_SCENE}vh` }}
      className="relative"
    >
      {/* Sticky pinned Viewport */}
      <div className="grain sticky top-0 h-[100svh] w-full overflow-hidden">

        {/* Gestapelte Szenen */}
        {scenes.map((scene, i) => (
          <div
            key={scene.label}
            ref={(el) => { if (el) sceneRefs.current[i] = el; }}
            className="absolute inset-0 will-change-[opacity]"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            {/* Bild mit Ken-Burns */}
            <div
              ref={(el) => { if (el) imgRefs.current[i] = el; }}
              className="absolute inset-[-6%] will-change-transform"
              style={{ scale: "1.08" }}
            >
              <MediaImage
                src={scene.image}
                alt={scene.title}
                zoomOnHover={false}
                sizes="100vw"
                priority={i === 0}
              />
            </div>

            {/* Gradient-Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
          </div>
        ))}

        {/* Szenen-Labels (Desktop, rechts) */}
        <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 md:flex">
          {scenes.map((scene, i) => (
            <div key={scene.label} className="flex items-center gap-2.5 justify-end">
              <span
                className={`text-xs uppercase tracking-[0.25em] transition-all duration-500 ${
                  i === activeIndex ? "text-gold" : "text-stone/50"
                }`}
              >
                {scene.label}
              </span>
              <span
                className={`h-px transition-all duration-500 ${
                  i === activeIndex ? "w-8 bg-gold" : "w-3 bg-stone/30"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Caption-Overlay (wechselt mit activeIndex → fadeUp) */}
        <div
          key={activeIndex}
          className="container-px absolute bottom-0 left-0 right-0 z-20 animate-[fadeUp_0.5s_ease] pb-24 sm:pb-28"
        >
          <div className="max-w-2xl">
            <span className="eyebrow">{active.label}</span>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight tracking-tightest text-cream sm:text-6xl lg:text-7xl">
              {active.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-cream/65 sm:text-lg">
              {active.caption}
            </p>
          </div>

          {/* Fortschritts-Balken + Zähler */}
          <div className="mt-10 flex items-center gap-2">
            {scenes.map((_, i) => (
              <div key={i} className="h-px flex-1 overflow-hidden bg-cream/15">
                <div
                  className="h-full origin-left bg-gold transition-transform duration-300 ease-out"
                  style={{ transform: `scaleX(${i <= activeIndex ? 1 : 0})` }}
                />
              </div>
            ))}
            <span className="ml-3 font-display text-sm text-stone">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
