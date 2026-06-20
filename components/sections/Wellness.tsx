"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { wellness } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// 3D-Sphäre clientseitig laden
const WellnessSphere = dynamic(
  () => import("@/components/3d/WellnessSphere"),
  { ssr: false }
);

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
      {/* großflächiger Türkis-Schimmer im Hintergrund */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-glacier/10 blur-[120px]" />

      <div className="container-px relative">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Text + 3D-Sphäre */}
          <div className="relative">
            {/* 3D-Sphäre schwebt über dem Text */}
            <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 sm:h-80 sm:w-80 lg:-right-20 lg:-top-28">
              <WellnessSphere />
            </div>

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
