"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { hero } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { MagneticButton } from "@/components/ui/MagneticButton";

// 3D nur clientseitig laden (kein SSR für Three.js)
const MountainScene = dynamic(() => import("@/components/3d/MountainScene"), {
  ssr: false,
});
const HeroCrystal = dynamic(() => import("@/components/3d/HeroCrystal"), {
  ssr: false,
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: Bild zoomt & wandert, Text steigt nach oben und blendet aus
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Hintergrund: Video (falls gesetzt) oder Bild, mit Parallax */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 will-change-transform"
      >
        {hero.video ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={hero.image}
          >
            <source src={hero.video} type="video/mp4" />
          </video>
        ) : (
          <MediaImage
            src={hero.image}
            alt="Alpenhof – Bergpanorama"
            priority
            zoomOnHover={false}
            sizes="100vw"
          />
        )}
      </motion.div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

      {/* 3D-Linienlandschaft als dezenter Layer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-70">
        <MountainScene />
      </div>

      {/* Schwebender Bergkristall (3D-Akzent, oben rechts) */}
      <div className="pointer-events-none absolute right-[-4%] top-[8%] hidden h-[42vh] w-[42vh] opacity-90 md:block">
        <HeroCrystal />
      </div>

      {/* Inhalt */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="container-px relative z-10 flex h-full flex-col justify-end pb-24 sm:pb-28"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.span variants={item} className="eyebrow">
            {hero.eyebrow}
          </motion.span>

          <h1 className="mt-7 font-display text-5xl font-light leading-[0.98] tracking-tightest text-cream sm:text-7xl lg:text-8xl xl:text-[7.5rem]">
            {hero.headlineLines.map((line, i) => (
              <motion.span
                key={i}
                variants={item}
                className="block"
              >
                {i === hero.headlineLines.length - 1 ? (
                  <em className="not-italic text-shimmer">{line}</em>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg"
          >
            {hero.subline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <MagneticButton href={hero.primaryCta.href} variant="solid">
              {hero.primaryCta.label}
            </MagneticButton>
            <MagneticButton href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Stats-Leiste */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="visible"
          className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/10 pt-7"
        >
          {hero.stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2.5">
              <span className="font-display text-2xl text-gold sm:text-3xl">
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-stone">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll-Hinweis */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone">
            Scrollen
          </span>
          <div className="flex h-9 w-5 justify-center rounded-full border border-cream/25 pt-1.5">
            <span className="h-1.5 w-1 animate-scroll-hint rounded-full bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
