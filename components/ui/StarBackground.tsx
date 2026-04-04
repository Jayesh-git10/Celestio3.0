"use client";

import React, { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

function StarParticles(props: any) {
  const ref = useRef<any>(null);
  
  const layer1 = useMemo(() => {
    const data = random.inSphere(new Float32Array(6000), { radius: 1.2 });
    for (let i = 0; i < data.length; i++) if (isNaN(data[i])) data[i] = 0;
    return data;
  }, []);

  const layer2 = useMemo(() => {
    const data = random.inSphere(new Float32Array(3000), { radius: 1.5 });
    for (let i = 0; i < data.length; i++) if (isNaN(data[i])) data[i] = 0;
    return data;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    ref.current.position.y = -scrollY * 0.00015;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={layer1} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00FFFF"
          size={0.0025}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
      {/* Second layer for depth */}
      <Points positions={layer2} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#7928CA"
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

const StarBackground = () => (
  <div className="w-full h-auto fixed inset-0 z-[-1] pointer-events-none bg-background">
    <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <StarParticles />
      </Suspense>
      {/* Preload removed globally as it triggers CubeCamera updates that crash with NaN during dev reloads */}
    </Canvas>
  </div>
);

export default StarBackground;
