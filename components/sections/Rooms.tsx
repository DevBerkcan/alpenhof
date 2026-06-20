"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { rooms, type Room } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Rooms() {
  const [active, setActive] = useState(0);

  return (
    <section id="rooms" className="relative bg-coal/30 py-28 sm:py-36 lg:py-44">
      <div className="container-px">
        <SectionHeading
          eyebrow={rooms.eyebrow}
          heading={rooms.heading}
          intro={rooms.intro}
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* Sticky-Bild (wechselt mit aktivem Zimmer) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[2px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <MediaImage
                      src={rooms.items[active].image}
                      alt={rooms.items[active].name}
                      zoomOnHover={false}
                      sizes="50vw"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />

                {/* Preis-Badge */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`price-${active}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-6 left-6 glass rounded-full px-5 py-2.5"
                  >
                    <span className="text-sm text-cream">
                      {rooms.items[active].priceFrom}
                      <span className="text-stone"> / Nacht</span>
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Scrollende Liste */}
          <div className="flex flex-col">
            {rooms.items.map((room, i) => (
              <RoomItem
                key={room.id}
                room={room}
                index={i}
                onActivate={() => setActive(i)}
                isActive={active === i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoomItem({
  room,
  index,
  onActivate,
  isActive,
}: {
  room: Room;
  index: number;
  onActivate: () => void;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  // Aktiviert das passende Bild, sobald dieses Item mittig im Viewport ist
  if (inView && !isActive) onActivate();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`border-t border-cream/10 py-10 transition-opacity duration-500 lg:py-14 ${
        isActive ? "opacity-100" : "lg:opacity-45"
      }`}
    >
      {/* Mobiles Bild (nur unter lg sichtbar) */}
      <div className="group relative mb-6 aspect-[16/11] overflow-hidden rounded-[2px] lg:hidden">
        <MediaImage src={room.image} alt={room.name} sizes="100vw" />
        <div className="absolute bottom-4 left-4 glass rounded-full px-4 py-2 text-sm text-cream">
          {room.priceFrom} / Nacht
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-display text-sm text-gold">
          0{index + 1}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-stone">
          {room.category}
        </span>
      </div>

      <h3 className="mt-3 font-display text-3xl font-light text-cream sm:text-4xl">
        {room.name}
      </h3>

      <p className="mt-4 max-w-md text-base leading-relaxed text-cream/65">
        {room.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {room.features.map((f) => (
          <span
            key={f}
            className="rounded-full border border-cream/15 px-3.5 py-1.5 text-xs text-cream/70"
          >
            {f}
          </span>
        ))}
      </div>

      <div className="mt-7 flex items-center gap-8">
        <div className="flex gap-6 text-sm text-stone">
          <span>{room.size}</span>
          <span>{room.guests}</span>
        </div>
        <MagneticButton href="#booking" variant="ghost" className="px-0">
          Anfragen
        </MagneticButton>
      </div>
    </motion.div>
  );
}
