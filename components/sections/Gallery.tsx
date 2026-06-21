"use client";

import { motion } from "framer-motion";
import { gallery, type GalleryItem } from "@/lib/content";
import { MediaImage } from "@/components/ui/MediaImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

const spanClass: Record<GalleryItem["span"], string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "",
};

export function Gallery() {
  return (
    <section id="gallery" className="relative py-28 sm:py-36 lg:py-44">
      <div className="container-px">
        <SectionHeading
          eyebrow={gallery.eyebrow}
          heading={gallery.heading}
          intro={gallery.intro}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="mt-16 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4"
        >
          {gallery.items.map((item) => (
            <TiltCard key={item.image} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TiltCard({ item }: { item: GalleryItem }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={{ y: -6, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      className={`group relative cursor-pointer overflow-hidden rounded-[2px] ${spanClass[item.span]}`}
    >
      <MediaImage
        src={item.image}
        alt={item.alt}
        sizes="(max-width: 1024px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-sm text-cream">{item.alt}</p>
      </div>
    </motion.div>
  );
}
