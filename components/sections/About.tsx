"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { about } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // gegenläufige Parallax für die beiden Bilder
  const yPrimary = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const ySecondary = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="about" className="relative py-28 sm:py-36 lg:py-44">
      <div className="container-px">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Bild-Komposition */}
          <div ref={ref} className="relative order-2 lg:order-1">
            <motion.div
              style={{ y: yPrimary }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[2px]"
            >
              <MediaImage
                src={about.images.primary}
                alt="Architektur des Alpenhof"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              style={{ y: ySecondary }}
              className="group absolute -bottom-12 -right-4 hidden aspect-square w-2/5 overflow-hidden rounded-[2px] border-4 border-ink sm:block lg:-right-12"
            >
              <MediaImage
                src={about.images.secondary}
                alt="Detail aus Altholz und Naturstein"
                sizes="20vw"
              />
            </motion.div>

            {/* Jahres-Badge */}
            <div className="absolute -left-3 top-8 z-10 rotate-[-4deg] bg-gold px-5 py-3 lg:-left-8">
              <span className="font-display text-sm text-ink">Seit 1924</span>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 flex flex-col justify-center lg:order-2">
            <SectionHeading eyebrow={about.eyebrow} heading={about.heading} />

            <div className="mt-8 space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-base leading-relaxed text-cream/70 sm:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-8">
              <p className="font-display text-lg italic text-gold">
                {about.signature}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Pfeiler */}
        <div className="mt-28 grid gap-px overflow-hidden rounded-[2px] border border-cream/10 sm:grid-cols-3">
          {about.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 0.1}
              className="bg-coal/40 p-8 transition-colors hover:bg-coal lg:p-10"
            >
              <span className="font-display text-sm text-gold">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-light text-cream">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60">
                {pillar.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
