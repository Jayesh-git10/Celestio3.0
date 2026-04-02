"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

function StarParticles(props: any) {
  const ref = useRef<any>();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // Add subtle responsiveness to scroll/mouse indirectly
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    ref.current.position.y = -scrollY * 0.0002;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#00FFFF" // Starlight Cyan
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      {/* Second layer for depth */}
      <Points positions={sphere.slice().reverse()} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#7928CA" // Nebula Purple
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

const StarBackground = () => (
  <div className="w-full h-auto fixed inset-0 z-[-1] pointer-events-none bg-background">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarParticles />
      </Suspense>
      <Preload all />
    </Canvas>
  </div>
);

export default StarBackground;
