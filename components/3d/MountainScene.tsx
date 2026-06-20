"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Animierte „Linienlandschaft": ein Wireframe-Gitter, das sanft wie ein
 * Bergkamm im Wind wogt. Sehr dezent – atmosphärischer Layer hinter Hero/Footer.
 */
function WavingTerrain() {
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  const base = useMemo(() => {
    const g = new THREE.PlaneGeometry(26, 14, 60, 34);
    return g.attributes.position.array.slice(0) as Float32Array;
  }, []);

  useFrame((state) => {
    const geom = geomRef.current;
    if (!geom) return;
    const pos = geom.attributes.position;
    const t = state.clock.elapsedTime * 0.45;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const z =
        Math.sin(x * 0.4 + t) * 0.6 +
        Math.cos(y * 0.5 + t * 0.8) * 0.5 +
        Math.sin((x + y) * 0.25 + t * 0.5) * 0.7;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -1.4, 0]}>
      <planeGeometry ref={geomRef} args={[26, 14, 60, 34]} />
      <meshBasicMaterial color="#C9A86A" wireframe transparent opacity={0.22} />
    </mesh>
  );
}

export default function MountainScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.4, 9], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      className="!touch-none"
    >
      <Suspense fallback={null}>
        <WavingTerrain />
      </Suspense>
    </Canvas>
  );
}
