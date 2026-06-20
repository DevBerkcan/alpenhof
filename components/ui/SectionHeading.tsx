"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean; // dunkler Text (auf hellem Grund)
};

/**
 * Wiederkehrender Section-Kopf: Eyebrow-Label + Wort-für-Wort animierte
 * Headline (Fraunces) + optionaler Intro-Text.
 */
export function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = "left",
  className,
  dark = false,
}: SectionHeadingProps) {
  const reduce = useReducedMotion();
  const words = heading.split(" ");

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <span className={cn("eyebrow", align === "center" && "justify-center")}>
        {eyebrow}
      </span>

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        className={cn(
          "mt-6 font-display text-4xl font-light leading-[1.08] tracking-tightest sm:text-5xl lg:text-6xl",
          dark ? "text-ink" : "text-cream"
        )}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="mr-[0.25em] inline-block"
            variants={{
              hidden: reduce
                ? { opacity: 0 }
                : { opacity: 0, y: 24, filter: "blur(8px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>

      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mt-6 max-w-xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            dark ? "text-ink/70" : "text-cream/65"
          )}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}
