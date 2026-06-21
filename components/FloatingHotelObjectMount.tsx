"use client";

import dynamic from "next/dynamic";

const FloatingHotelObject = dynamic(
  () => import("@/components/3d/FloatingHotelObject"),
  { ssr: false }
);

export default function FloatingHotelObjectMount() {
  return <FloatingHotelObject />;
}
