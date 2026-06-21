"use client";

import { scrollStory } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ScrollStory() {
  return (
    <section id="story" className="relative py-28 sm:py-36 lg:py-44">
      {/* Dezenter Hintergrund-Glow oben */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-ink to-transparent" />

      <div className="container-px relative">
        <SectionHeading
          eyebrow={scrollStory.eyebrow}
          heading={scrollStory.heading}
        />

        <div className="mt-16 lg:mt-24">
          {scrollStory.beats.map((beat, i) => (
            <Reveal key={beat.num} delay={0} direction="up">
              <div className="grid grid-cols-[3rem_1fr] gap-6 border-t border-gold/20 py-12 sm:grid-cols-[4rem_1fr] lg:grid-cols-[6rem_1fr] lg:gap-16 lg:py-16">
                {/* Ziffer */}
                <span className="mt-1 font-display text-4xl font-light leading-none text-gold/25 sm:text-5xl lg:text-6xl">
                  {beat.num}
                </span>

                {/* Inhalt */}
                <div className="flex flex-col justify-center gap-4 lg:flex-row lg:items-start lg:gap-20">
                  <h3 className="min-w-[8rem] font-display text-3xl font-light text-cream sm:text-4xl lg:text-5xl">
                    {beat.title}
                  </h3>
                  <div className="lg:pt-2">
                    <p className="max-w-lg text-base leading-relaxed text-cream/60 sm:text-lg">
                      {beat.text}
                    </p>
                    {"cta" in beat && beat.cta && (
                      <div className="mt-6">
                        <MagneticButton href={beat.cta.href} variant="solid">
                          {beat.cta.label}
                        </MagneticButton>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
