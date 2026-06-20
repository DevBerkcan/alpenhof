"use client";

import dynamic from "next/dynamic";

// FloatingGuide nutzt WebGL → nur clientseitig laden (kein SSR).
const FloatingGuide = dynamic(() => import("@/components/FloatingGuide"), {
  ssr: false,
});

export default function FloatingGuideMount() {
  return <FloatingGuide />;
}
