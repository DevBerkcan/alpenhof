"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

/**
 * Dezente, langsam morphende „Wellness-Sphäre" – wie ein schwebender
 * Tropfen aus Bergquellwasser. 3D-Akzent in der Spa-Section.
 * Bewusst ohne <Environment> (kein Runtime-CDN-Request → schneller & offline-fest).
 */
function Sphere() {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.12;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.04;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.45} floatIntensity={1.1}>
      <mesh ref={mesh} scale={1.6}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial
          color="#8AB2B2"
          distort={0.38}
          speed={1.6}
          roughness={0.12}
          metalness={0.55}
          transparent
          opacity={0.95}
        />
      </mesh>
    </Float>
  );
}

export default function WellnessSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.6]}
      className="!touch-none"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 4, 5]} intensity={2.4} color="#F4F0E9" />
        <pointLight position={[-4, -2, 2]} intensity={1.8} color="#C9A86A" />
        <pointLight position={[3, -3, 4]} intensity={1.2} color="#8AB2B2" />
        <Sphere />
      </Suspense>
    </Canvas>
  );
}
