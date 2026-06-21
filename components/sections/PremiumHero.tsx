"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import { hero } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function PremiumHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Bild: langsamer Zoom + leichter Y-Drift
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.12]);
  const imgY     = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "8%"]);

  // Parallax-Layer: Himmel (langsamer als Bild)
  const skyY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "-4%"]);

  // Parallax-Layer: Berge (zwischen Bild und Text)
  const mountainY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "3%"]);

  // Sonnenlicht-Glow: aufleuchten, dann ausblenden
  const sunGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.65, 1],
    reduce ? [0.25, 0.25, 0.25, 0] : [0.25, 0.55, 0.2, 0]
  );
  const sunGlowScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8],
    reduce ? [1, 1, 1] : [1, 1.15, 0.9]
  );

  // Overlay: beim Scrollen dunkler
  const overlayDarkness = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    reduce ? [0.65, 0.65, 0.65] : [0.5, 0.8, 1.0]
  );

  // Nebel Layer 1 (nur Desktop, via CSS hidden md:block)
  const fog1X = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fog1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  // Nebel Layer 2
  const fog2X = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const fog2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);

  // Text: steigt auf und blendet aus
  const textY       = useTransform(scrollYProgress, [0, 0.7],  reduce ? ["0%", "0%"] : ["0%", "-28%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65], [1, 0.5, 0]);

  // Scroll-Hint: früh verschwinden
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Hero verlässt Viewport: leicht nach oben gleiten
  const heroExitY = useTransform(
    scrollYProgress,
    [0.8, 1],
    reduce ? ["0%", "0%"] : ["0%", "-6%"]
  );

  // Übergangsmaske: blendet am Ende weich aus
  const maskOpacity = useTransform(scrollYProgress, [0.72, 1], [0, 1]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    // Äußere Section: 200vh Desktop, 100vh Mobile
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] md:h-[200vh]"
    >
      {/* Sticky Container – pinned für die gesamte 200vh-Reise */}
      <motion.div
        style={{ y: heroExitY }}
        className="grain sticky top-0 h-[100svh] min-h-[640px] overflow-hidden"
      >
        {/* 1. Hero-Bild: Zoom + Y-Drift */}
        <motion.div
          style={{ scale: imgScale, y: imgY }}
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
              alt="Alpenhof – Blick auf das Hotel"
              priority
              zoomOnHover={false}
              sizes="100vw"
            />
          )}
        </motion.div>

        {/* 2. Himmel-Overlay – langsamster Parallax-Layer */}
        <motion.div
          style={{ y: skyY }}
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-ink/65 to-transparent"
        />

        {/* 3. Sonnenlicht Glow – links oben, scroll-gekoppelt */}
        <motion.div
          style={{ opacity: sunGlowOpacity, scale: sunGlowScale }}
          className="pointer-events-none absolute left-[-5%] top-[-10%] h-[70%] w-[55%] origin-top-left bg-[radial-gradient(ellipse_at_20%_20%,rgba(201,168,106,0.22)_0%,transparent_60%)]"
        />

        {/* 4. Haupt-Overlay: wird dunkler beim Scrollen */}
        <motion.div
          style={{ opacity: overlayDarkness }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/20 to-ink"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />

        {/* 5. Nebel Layer 1 – nur Desktop, driftet rechts */}
        <motion.div
          style={{ x: fog1X, y: fog1Y }}
          className="pointer-events-none absolute inset-x-[-10%] bottom-0 hidden h-52 bg-gradient-to-t from-cream/[0.06] via-cream/[0.02] to-transparent md:block"
        />

        {/* 6. Nebel Layer 2 – nur Desktop, driftet links */}
        <motion.div
          style={{ x: fog2X, y: fog2Y }}
          className="pointer-events-none absolute inset-x-[-10%] bottom-16 hidden h-40 bg-gradient-to-t from-cream/[0.04] to-transparent md:block"
        />

        {/* 7. Bergsilhouetten – eigener Y-Speed (zwischen Bild und Text) */}
        <motion.div
          style={{ y: mountainY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%]"
        >
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-full w-full opacity-20"
          >
            <path
              d="M0,320L120,220L240,260L360,160L480,200L600,120L720,180L840,100L960,160L1080,80L1200,140L1320,60L1440,100L1440,320Z"
              fill="rgb(244 240 233)"
            />
          </svg>
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-[80%] w-full opacity-25"
          >
            <path
              d="M0,320L180,200L300,240L420,140L540,190L660,80L780,160L900,60L1020,130L1140,40L1260,110L1380,50L1440,80L1440,320Z"
              fill="rgb(18 16 14)"
            />
          </svg>
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="absolute inset-x-0 bottom-0 h-[55%] w-full opacity-90"
          >
            <path
              d="M0,320L200,240L360,270L480,200L600,230L720,160L840,210L1000,150L1140,200L1280,140L1440,180L1440,320Z"
              fill="rgb(18 16 14)"
            />
          </svg>
        </motion.div>

        {/* 8. Text-Inhalt: steigt auf und blendet aus */}
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
                <motion.span key={i} variants={item} className="block">
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

        {/* 9. Scroll-Hinweis – verschwindet früh */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone">
              Scrollen
            </span>
            <div className="flex h-9 w-5 justify-center rounded-full border border-cream/25 pt-1.5">
              <span className="h-1.5 w-1 animate-scroll-hint rounded-full bg-gold" />
            </div>
          </div>
        </motion.div>

        {/* 10. Übergangsmaske – blendet am Ende weich nach oben aus */}
        <motion.div
          style={{ opacity: maskOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-ink via-ink/80 to-transparent"
        />
      </motion.div>
    </section>
  );
}
