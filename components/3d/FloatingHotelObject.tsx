"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import type { Group } from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function HotelModel({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollProgress.current;
    const t = state.clock.elapsedTime;

    // Dezente Rotation – hotelnah, nicht tech-artig
    groupRef.current.rotation.y = t * 0.06 + p * Math.PI * 0.4;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.04;

    // Leichte Y-Bewegung: sanfter Float + leichtes Sinken beim Scrollen
    groupRef.current.position.y = Math.sin(t * 0.35) * 0.1 - p * 0.25;

    // Kleine Skalierung: beim Scrollen minimal kleiner
    groupRef.current.scale.setScalar(Math.max(0.5, 1 - p * 0.12));
  });

  return (
    <Float speed={0.8} rotationIntensity={0.06} floatIntensity={0.25}>
      <group ref={groupRef} rotation={[0.08, -0.55, 0]}>
        <mesh position={[0, -0.15, 0]} castShadow>
          <boxGeometry args={[2.15, 1.25, 1.25]} />
          <meshStandardMaterial color="#E8E0D2" roughness={0.72} />
        </mesh>

        <mesh position={[0, 0.78, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[1.55, 0.78, 4]} />
          <meshStandardMaterial color="#51483F" roughness={0.8} />
        </mesh>

        <mesh position={[0, -0.58, 0.64]}>
          <boxGeometry args={[0.42, 0.7, 0.08]} />
          <meshStandardMaterial color="#493A2D" roughness={0.62} />
        </mesh>

        {[-0.72, 0, 0.72].map((x) => (
          <mesh key={x} position={[x, 0.03, 0.655]}>
            <boxGeometry args={[0.3, 0.32, 0.06]} />
            <meshStandardMaterial
              color="#D7B56D"
              emissive="#A9772F"
              emissiveIntensity={0.55}
              roughness={0.35}
            />
          </mesh>
        ))}

        <mesh position={[0, -0.84, 0]} receiveShadow>
          <cylinderGeometry args={[1.55, 1.75, 0.18, 6]} />
          <meshStandardMaterial color="#AFA38F" roughness={0.95} />
        </mesh>
      </group>
    </Float>
  );
}

export default function FloatingHotelObject() {
  const reduced = useReducedMotion();
  const scrollProgress = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-0 top-1/2 z-[1] hidden -translate-y-1/2 md:block"
      style={{ width: "min(22vw, 260px)", height: "min(22vw, 260px)" }}
    >
      <Canvas
        camera={{ position: [0, 0, 4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 3]} intensity={1.8} color="#F4F0E9" />
          <pointLight position={[-2, -1, 2]} intensity={1.0} color="#C9A86A" />
          <HotelModel scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
