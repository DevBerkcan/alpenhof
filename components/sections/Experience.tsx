"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * SCROLL-EXPERIENCE (Higgsfield-Stil)
 * Gepinnte Sektion: beim Scrollen werden 16 Frames per GSAP ScrollTrigger
 * weich übergeblendet (Frame 1 → Frame 16). Caption & Fortschritt laufen mit.
 */
export function Experience() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<HTMLDivElement[]>([]);
  const total = experience.sequence.length;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Initialzustand: nur erstes Frame sichtbar
    frameRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const pos = self.progress * (total - 1); // 0 … total-1
        // Crossfade zwischen benachbarten Frames
        frameRefs.current.forEach((el, i) => {
          if (!el) return;
          const o = Math.max(0, 1 - Math.abs(i - pos));
          el.style.opacity = String(o);
        });
        const idx = Math.round(pos);
        setActiveIndex((prev) => (prev === idx ? prev : idx));
      },
    });

    return () => st.kill();
  }, [total]);

  const active = experience.sequence[activeIndex] ?? experience.sequence[0];

  return (
    <section id="experience" className="relative">
      {/* Intro */}
      <div className="container-px pb-16 pt-28 sm:pt-36 lg:pt-44">
        <SectionHeading
          eyebrow={experience.eyebrow}
          heading={experience.heading}
          intro={experience.intro}
        />
      </div>

      {/* Scroll-Bildsequenz – Sektion hoch, Inhalt sticky */}
      <div ref={wrapRef} style={{ height: `${total * 100}vh` }} className="relative">
        <div className="sticky top-0 grain h-[100svh] w-full overflow-hidden">
          {/* gestapelte Frames, per GSAP übergeblendet */}
          {experience.sequence.map((item, i) => (
            <div
              key={item.image}
              ref={(el) => {
                if (el) frameRefs.current[i] = el;
              }}
              className="absolute inset-0 will-change-[opacity]"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <MediaImage src={item.image} alt={item.title} zoomOnHover={false} sizes="100vw" />
            </div>
          ))}

          {/* Verlauf für Lesbarkeit */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

          {/* Caption-Overlay */}
          <div className="container-px relative flex h-full flex-col justify-end pb-24 sm:pb-28">
            <div key={activeIndex} className="max-w-2xl animate-[fadeUp_0.5s_ease]">
              <span className="text-sm uppercase tracking-[0.3em] text-gold">
                {active.caption}
              </span>
              <h3 className="mt-4 font-display text-4xl font-light leading-tight text-cream sm:text-6xl lg:text-7xl">
                {active.title}
              </h3>
            </div>

            {/* Fortschritts-Indikatoren */}
            <div className="mt-10 flex items-center gap-2">
              {experience.sequence.map((_, i) => (
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

      {/* Aktivitäten: Sommer / Winter */}
      <div className="container-px py-28 sm:py-36">
        <div className="grid gap-12 md:grid-cols-2 lg:gap-20">
          {experience.activities.map((group, gi) => (
            <Reveal key={group.season} delay={gi * 0.1}>
              <div className="border-t border-gold/30 pt-8">
                <h3 className="font-display text-3xl font-light text-cream">
                  {group.season}
                </h3>
                <ul className="mt-6 space-y-4">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-4 text-lg text-cream/70">
                      <span className="h-1 w-1 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
