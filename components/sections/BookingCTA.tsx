"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { booking } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function BookingCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section id="booking" ref={ref} className="relative overflow-hidden">
      {/* Parallax-Hintergrund */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-[-10%]">
        <MediaImage
          src={booking.image}
          alt="Bergpanorama in der Dämmerung"
          zoomOnHover={false}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink" />

      <div className="container-px relative py-32 sm:py-40 lg:py-52">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">{booking.eyebrow}</span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tightest text-cream sm:text-6xl lg:text-7xl">
              {booking.heading}
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
              {booking.intro}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton href={booking.primaryCta.href} variant="solid">
                {booking.primaryCta.label}
              </MagneticButton>
              <MagneticButton href={booking.phoneCta.href} variant="outline">
                {booking.phoneCta.label}
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {booking.perks.map((perk) => (
                <div
                  key={perk}
                  className="flex items-center gap-2 text-sm text-cream/60"
                >
                  <svg
                    className="h-4 w-4 text-gold"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {perk}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
