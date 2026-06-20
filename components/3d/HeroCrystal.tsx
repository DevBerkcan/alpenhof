"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh, Group } from "three";

/**
 * Schwebender, facettierter „Bergkristall" als 3D-Akzent in der Hero.
 * Champagner-Gold-Metallic mit Gletscher-Türkis-Kanten. Bewusst leichtgewichtig
 * (Octahedron + Wireframe-Overlay), damit der Hero performant bleibt.
 */
function Crystal() {
  const core = useRef<Mesh>(null);
  const edges = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (core.current) {
      core.current.rotation.y = t * 0.25;
      core.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }
    if (edges.current) {
      edges.current.rotation.y = -t * 0.18;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.9}>
      <group>
        <mesh ref={core} scale={1.3}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#C9A86A"
            metalness={0.85}
            roughness={0.18}
            emissive="#3A2E1A"
            emissiveIntensity={0.35}
            flatShading
          />
        </mesh>
        <group ref={edges}>
          <mesh scale={1.55}>
            <icosahedronGeometry args={[1, 0]} />
            <meshBasicMaterial color="#8AB2B2" wireframe transparent opacity={0.25} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export default function HeroCrystal() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.6]}
      className="!touch-none"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 4]} intensity={2.6} color="#F4F0E9" />
        <pointLight position={[-4, -2, 3]} intensity={2.0} color="#C9A86A" />
        <pointLight position={[4, 2, -2]} intensity={1.4} color="#8AB2B2" />
        <Crystal />
      </Suspense>
    </Canvas>
  );
}
