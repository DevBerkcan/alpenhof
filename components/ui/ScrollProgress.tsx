"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Dünner goldener Fortschrittsbalken am oberen Rand, an den Scroll gekoppelt. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold-soft via-gold to-glacier"
    />
  );
}
