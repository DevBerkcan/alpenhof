"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** dezenter Zoom beim Hover des Eltern-.group-Containers */
  zoomOnHover?: boolean;
  priority?: boolean;
  sizes?: string;
};

/**
 * Bild-Wrapper auf Basis von next/image (fill-Layout).
 * Zeigt während des Ladens einen schimmernden Platzhalter und
 * blendet das Bild weich ein. Container muss `relative` + Höhe haben.
 */
export function MediaImage({
  src,
  alt,
  className,
  zoomOnHover = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: MediaImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div
        className={cn(
          "absolute inset-0 bg-coal transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100"
        )}
        aria-hidden
      >
        <div className="h-full w-full animate-shimmer bg-[linear-gradient(100deg,transparent_20%,rgba(201,168,106,0.08)_40%,rgba(201,168,106,0.12)_50%,transparent_70%)] bg-[length:200%_100%]" />
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-[transform,opacity] duration-[1.2s] ease-smooth",
          loaded ? "opacity-100" : "opacity-0",
          zoomOnHover && "group-hover:scale-[1.06]",
          className
        )}
      />
    </>
  );
}
