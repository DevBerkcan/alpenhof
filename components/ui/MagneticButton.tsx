"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
};

/**
 * Premium-CTA mit magnetischem Cursor-Folgeeffekt (Desktop).
 * Auf Touch / reduced-motion bleibt der Button statisch.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const x = useSpring(mvX, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(mvY, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mvX.set((e.clientX - (rect.left + rect.width / 2)) * 0.12);
    mvY.set((e.clientY - (rect.top + rect.height / 2)) * 0.12);
  }
  function reset() {
    mvX.set(0);
    mvY.set(0);
  }

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 rounded-[3px] px-8 py-3.5 text-xs font-sans font-medium tracking-widest uppercase transition-colors duration-300 will-change-transform";
  const variants = {
    solid: "bg-gold text-ink hover:bg-cream",
    outline:
      "border border-cream/40 text-cream hover:border-gold hover:text-gold",
    ghost: "text-cream/80 hover:text-gold",
  } as const;

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <svg
        className="relative z-10 h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
      >
        <path
          d="M1 8h13M9 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  const commonProps = {
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className: cn(base, variants[variant], className),
    style: { x, y },
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        {...commonProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      {...commonProps}
    >
      {inner}
    </motion.button>
  );
}
