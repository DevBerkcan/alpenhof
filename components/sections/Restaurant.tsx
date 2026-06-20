"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { restaurant } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Restaurant() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const dishScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const dishRotate = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section
      id="restaurant"
      ref={ref}
      className="relative bg-coal/30 py-28 sm:py-36 lg:py-44"
    >
      <div className="container-px">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* großes Bild */}
          <Reveal direction="right" className="order-2 lg:order-1">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[2px]">
              <MediaImage
                src={restaurant.image}
                alt="Restaurant am Alpenhof"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Stern-Plakette */}
              <div className="absolute right-5 top-5 flex items-center gap-2 glass rounded-full px-4 py-2">
                <svg className="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                </svg>
                <span className="text-xs uppercase tracking-[0.2em] text-cream">
                  Michelin
                </span>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div className="order-1 flex flex-col justify-center lg:order-2">
            <SectionHeading
              eyebrow={restaurant.eyebrow}
              heading={restaurant.heading}
              intro={restaurant.intro}
            />

            <div className="mt-10 space-y-px overflow-hidden rounded-[2px] border border-cream/10">
              {restaurant.highlights.map((h, i) => (
                <Reveal
                  key={h.title}
                  delay={i * 0.08}
                  className="flex items-baseline gap-5 bg-coal/40 p-6 transition-colors hover:bg-coal"
                >
                  <span className="w-16 shrink-0 text-xs uppercase tracking-[0.2em] text-gold">
                    {h.kicker}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-light text-cream">
                      {h.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-cream/60">
                      {h.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Zitat-Bereich mit rotierendem Detailbild */}
        <div className="mt-28 grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <motion.div
            style={{ scale: dishScale, rotate: dishRotate }}
            className="group relative mx-auto aspect-square w-3/4 overflow-hidden rounded-full lg:w-full"
          >
            <MediaImage
              src={restaurant.detailImage}
              alt="Signature-Gericht"
              zoomOnHover={false}
              sizes="40vw"
            />
          </motion.div>

          <Reveal>
            <blockquote className="font-display text-2xl font-light italic leading-snug text-cream sm:text-3xl lg:text-4xl">
              „{restaurant.quote}"
            </blockquote>
            <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gold">
              {restaurant.quoteAuthor}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
