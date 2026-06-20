"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Bewegungsrichtung der Einblendung */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Soll nur einmal animiert werden? (Standard: ja) */
  once?: boolean;
  as?: "div" | "section" | "li" | "span";
};

const offset = 56;

/**
 * Universeller Scroll-Reveal: blendet Inhalt mit Blur + Versatz ein,
 * sobald er ins Viewport scrollt. Respektiert prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  as = "div",
}: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const reduce = useReducedMotion();

  const axis =
    direction === "up"
      ? { y: offset }
      : direction === "down"
      ? { y: -offset }
      : direction === "left"
      ? { x: offset }
      : direction === "right"
      ? { x: -offset }
      : {};

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(10px)", ...axis },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}
