"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import type { Mesh } from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * FLOATING GUIDE
 * Ein global schwebendes 3D-Objekt, das den Nutzer durch die Seite „führt":
 * Beim Scrollen rotiert, wandert, skaliert und morpht es. Liegt fixiert über
 * dem Hintergrund (pointer-events-none), stört also keine Interaktion.
 *
 * Performance: nur EIN Mesh, niedrige DPR, kein Environment. Bei
 * prefers-reduced-motion oder ohne WebGL wird nichts gerendert.
 */

function GuideObject({ progress }: { progress: React.MutableRefObject<number> }) {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const p = progress.current; // 0..1 Scroll-Fortschritt
    const t = state.clock.elapsedTime;

    // Rotation: Eigendrehung + scroll-gekoppelt
    mesh.current.rotation.y = t * 0.1 + p * Math.PI * 3;
    mesh.current.rotation.x = Math.sin(t * 0.2) * 0.2 + p * 0.6;

    // Wandern: von oben-rechts nach unten-links über den Scroll
    mesh.current.position.x = 2.6 - p * 5.2;
    mesh.current.position.y = 1.6 - p * 3.2 + Math.sin(t * 0.6) * 0.15;

    // Skalierung: in der Mitte am größten
    const s = 0.7 + Math.sin(p * Math.PI) * 0.5;
    mesh.current.scale.setScalar(s);
  });

  // Farbe wandert subtil von Gold (oben) zu Türkis (unten) – via emissive
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#C9A86A"
          emissive="#2A2418"
          emissiveIntensity={0.3}
          distort={0.32}
          speed={1.3}
          roughness={0.15}
          metalness={0.7}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingGuide() {
  const reduced = useReducedMotion();
  const progress = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden opacity-70 mix-blend-screen md:block"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.4]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 4, 5]} intensity={2.2} color="#F4F0E9" />
          <pointLight position={[-4, -2, 2]} intensity={1.6} color="#8AB2B2" />
          <GuideObject progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
