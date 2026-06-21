"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { wellness } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Wellness() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="wellness"
      ref={ref}
      className="relative overflow-hidden py-28 sm:py-36 lg:py-44"
    >
      {/* Kaminlicht-Glow – ruhige Wärme statt Neon-Blob */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(ellipse,rgba(201,168,106,0.07)_0%,transparent_70%)] blur-[60px] animate-[breathe_6s_ease-in-out_infinite]" />
      {/* Wasser-Schimmer – dezent rechts */}
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-[20rem] w-[20rem] rounded-full bg-[radial-gradient(ellipse,rgba(138,178,178,0.05)_0%,transparent_70%)] blur-[60px] animate-[breathe_8s_ease-in-out_infinite_1s]" />

      <div className="container-px relative">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Text */}
          <div className="relative">
            <SectionHeading
              eyebrow={wellness.eyebrow}
              heading={wellness.heading}
              intro={wellness.intro}
            />

            <div className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-cream/10 sm:grid-cols-2">
              {wellness.experiences.map((exp, i) => (
                <Reveal
                  key={exp.title}
                  delay={i * 0.08}
                  className="bg-coal/40 p-6 transition-colors hover:bg-coal"
                >
                  <h3 className="font-display text-xl font-light text-glacier">
                    {exp.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">
                    {exp.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Bild mit Parallax */}
          <Reveal direction="left">
            <div className="group relative aspect-[3/4] overflow-hidden rounded-[2px]">
              <motion.div style={{ y: imgY }} className="absolute inset-[-6%]">
                <MediaImage
                  src={wellness.image}
                  alt="Spa & Wellness am Alpenhof"
                  zoomOnHover={false}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
