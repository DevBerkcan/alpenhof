"use client";

import Image from "next/image";
import { footer, navLinks, site } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-cream/10 bg-coal/40">
      <div className="container-px py-20 sm:py-24">
        {/* Claim + Kontakt */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            <Image
              src="/images/logo_hotel_alpenhof.png"
              alt={site.name}
              width={160}
              height={64}
              className="mb-8 h-12 w-auto object-contain brightness-0 invert opacity-70"
            />
            <p className="font-display text-3xl font-light leading-snug text-cream sm:text-4xl lg:text-5xl">
              {footer.claim}
            </p>
            <a
              href="#booking"
              className="mt-8 inline-flex items-center gap-3 text-gold transition-colors hover:text-cream"
            >
              <span className="text-lg">Aufenthalt anfragen</span>
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                <path
                  d="M1 8h13M9 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-2 text-sm text-cream/60 lg:text-right">
              <p className="text-cream">{site.name}</p>
              <p>{site.address.street}</p>
              <p>
                {site.address.zip} {site.address.city}
              </p>
              <p>{site.address.country}</p>
              <div className="pt-4">
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="block transition-colors hover:text-gold"
                >
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="block transition-colors hover:text-gold"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="hairline my-14" />

        {/* Link-Spalten */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-stone">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-cream/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-stone">
              Folgen
            </h4>
            <ul className="mt-5 space-y-3">
              {footer.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Riesige Wortmarke als Abschluss */}
      <div className="relative select-none overflow-hidden">
        <div className="mask-fade-b container-px pb-8">
          <p className="font-display text-[22vw] font-light leading-none tracking-tightest text-cream/[0.04]">
            {site.name}
          </p>
        </div>
      </div>

      <div className="container-px flex flex-col items-center justify-between gap-4 border-t border-cream/10 py-6 text-xs text-stone sm:flex-row">
        <p>
          © {year} {site.name}. Alle Rechte vorbehalten.
        </p>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {navLinks.slice(0, 4).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
