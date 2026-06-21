"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { navLinks, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 200 && !menuOpen);
    setScrolled(latest > 40);
  });

  return (
    <>
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-px">
          <div
            className={cn(
              "mt-4 flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 sm:px-6 sm:py-3",
              scrolled
                ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
                : "border-transparent bg-transparent"
            )}
          >
            {/* Logo */}
            <a href="#top" className="group flex items-center">
              <Image
                src="/images/logo_hotel_alpenhof.png"
                alt={site.name}
                width={140}
                height={56}
                className="h-10 w-auto object-contain brightness-0 invert transition-opacity duration-300 group-hover:opacity-80 sm:h-12"
                priority
              />
            </a>

            {/* Desktop-Links */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative text-sm font-sans text-cream/75 transition-colors hover:text-cream"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* CTA + Burger */}
            <div className="flex items-center gap-3">
              <a
                href="#booking"
                className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-sans font-medium text-ink transition-colors hover:bg-cream md:inline-flex"
              >
                Anfragen
              </a>
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Menü öffnen"
                className="flex h-11 w-11 items-center justify-center rounded-full glass lg:hidden"
              >
                <div className="flex flex-col gap-[5px]">
                  <span className="h-px w-5 bg-cream" />
                  <span className="h-px w-5 bg-cream" />
                  <span className="h-px w-3 bg-gold" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

/* --------------------------------------------------------------------------
   MOBILE MENU – Vollbild-Overlay mit gestaffelten Link-Reveals
   -------------------------------------------------------------------------- */
function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] lg:hidden"
        >
          {/* Hintergrund */}
          <div className="absolute inset-0 bg-ink/95 backdrop-blur-xl" />

          <div className="relative flex h-full flex-col px-8 pt-8">
            {/* Kopf */}
            <div className="flex items-center justify-between">
              <Image
                src="/images/logo_hotel_alpenhof.png"
                alt={site.name}
                width={120}
                height={48}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
              <button
                onClick={onClose}
                aria-label="Menü schließen"
                className="flex h-11 w-11 items-center justify-center rounded-full glass"
              >
                <svg
                  className="h-5 w-5 text-cream"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Links */}
            <motion.nav
              className="mt-16 flex flex-col gap-2"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  variants={{
                    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center gap-4 border-b border-cream/10 py-4 font-display text-3xl font-light text-cream"
                >
                  <span className="text-xs font-sans text-gold/60">
                    0{i + 1}
                  </span>
                  <span className="transition-colors group-hover:text-gold">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </motion.nav>

            <div className="mt-auto pb-10">
              <a
                href="#booking"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-full bg-gold px-6 py-4 font-sans font-medium text-ink"
              >
                Aufenthalt anfragen
              </a>
              <p className="mt-6 text-center text-sm text-stone">
                {site.phone}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
