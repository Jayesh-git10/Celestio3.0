"use client";

import React, { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

function StarParticles(props: any) {
  const ref = useRef<any>(null);
  
  // Use 6000 to ensure a multiple of 3 (2000 points exactly)
  const sphere = useMemo(() => {
    const data = random.inSphere(new Float32Array(6000), { radius: 1.2 });
    // Sanity check: Ensure no NaNs remain in the buffer
    for (let i = 0; i < data.length; i++) {
       if (isNaN(data[i])) data[i] = 0;
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    ref.current.position.y = -scrollY * 0.0002;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00FFFF"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      {/* Second layer for depth */}
      <Points positions={sphere.slice().reverse()} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#7928CA"
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
      {/* Preload removed globally as it triggers CubeCamera updates that crash with NaN during dev reloads */}
    </Canvas>
  </div>
);

export default StarBackground;
