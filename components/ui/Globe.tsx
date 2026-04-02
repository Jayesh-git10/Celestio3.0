"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const RANCHI_LAT = 23.3441;
const RANCHI_LON = 85.3096;

/** Convert lat/lon to a 3D point on surface of a sphere of given radius */
function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
     radius * Math.cos(phi),
     radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function GlobeThreeJS() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const SIZE = Math.min(container.clientWidth || 500, 500);

    // ──────────────────────────────────────────────
    // Scene + Camera + Renderer
    // ──────────────────────────────────────────────
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 2.8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(SIZE, SIZE);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const R = 1; // Globe radius

    // ──────────────────────────────────────────────
    // 1. Atmospheric Fresnel glow (outer shell)
    // ──────────────────────────────────────────────
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor   = vec4(0.15, 0.45, 1.0, 0.9) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.13, 64, 64),
      atmosphereMat
    );
    scene.add(atmosphere); // Atmosphere is NOT part of group — stays fixed

    // ──────────────────────────────────────────────
    // 2. Dark base sphere (ocean)
    // ──────────────────────────────────────────────
    const baseMesh = new THREE.Mesh(
      new THREE.SphereGeometry(R * 0.998, 64, 64),
      new THREE.MeshPhongMaterial({ color: 0x000510, shininess: 5 })
    );
    group.add(baseMesh);

    // ──────────────────────────────────────────────
    // 3. Ranchi Marker — add BEFORE async dots so it's visible right away
    // ──────────────────────────────────────────────
    const ranchiPos = latLonToVec3(RANCHI_LAT, RANCHI_LON, R);

    // Glowing core sphere
    const markerMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff5500 })
    );
    markerMesh.position.copy(ranchiPos);
    group.add(markerMesh);

    // Inner ring
    const innerRing = new THREE.Mesh(
      new THREE.RingGeometry(0.029, 0.037, 32),
      new THREE.MeshBasicMaterial({
        color: 0xff6600, transparent: true, opacity: 0.8, side: THREE.DoubleSide,
      })
    );
    innerRing.position.copy(ranchiPos);
    innerRing.lookAt(new THREE.Vector3(0, 0, 0));
    group.add(innerRing);

    // Outer animated pulse ring
    const pulseRing = new THREE.Mesh(
      new THREE.RingGeometry(0.04, 0.046, 32),
      new THREE.MeshBasicMaterial({
        color: 0xff9900, transparent: true, opacity: 0.5, side: THREE.DoubleSide,
      })
    );
    pulseRing.position.copy(ranchiPos);
    pulseRing.lookAt(new THREE.Vector3(0, 0, 0));
    group.add(pulseRing);

    // ──────────────────────────────────────────────
    // 4. Lights
    // ──────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x223366, 3));
    const pLight = new THREE.PointLight(0x4488ff, 2.5, 20);
    pLight.position.set(4, 3, 5);
    scene.add(pLight);

    // ──────────────────────────────────────────────
    // 5. Sample world-map texture → place billboard dots on land
    // ──────────────────────────────────────────────
    // Shared geometry & material for instancing all dots
    const dotGeo = new THREE.CircleGeometry(0.006, 6);
    const dotMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });

    const NUM_DOTS = 22000;

    const worldImg = new Image();
    worldImg.crossOrigin = "anonymous";
    // Earth night map from jsdelivr (city lights = land)
    worldImg.src = "https://cdn.jsdelivr.net/npm/three-globe@2.30.0/example/img/earth-dark.jpg";

    worldImg.onload = () => {
      const cvs = document.createElement("canvas");
      cvs.width  = 1024;
      cvs.height = 512;
      const ctx  = cvs.getContext("2d")!;
      ctx.drawImage(worldImg, 0, 0, 1024, 512);
      const pixels = ctx.getImageData(0, 0, 1024, 512).data;

      /** Brightness at a lat/lon */
      const brightness = (lat: number, lon: number): number => {
        const u = Math.floor(((lon + 180) / 360) * 1023);
        const v = Math.floor(((90 - lat) / 180) * 511);
        const i = (v * 1024 + u) * 4;
        return (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
      };

      for (let i = 0; i < NUM_DOTS; i++) {
        // Fibonacci sphere — evenly distributed points
        const phi   = Math.acos(1 - (2 * i) / NUM_DOTS);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);

        const lat = Math.asin(y) * (180 / Math.PI);
        const lon = Math.atan2(z, x) * (180 / Math.PI);

        // Only place dot if the world map shows land (city lights threshold)
        if (brightness(lat, lon) > 18) {
          const dot = new THREE.Mesh(dotGeo, dotMat);
          dot.position.set(x * R, y * R, z * R);
          dot.lookAt(new THREE.Vector3(0, 0, 0)); // Billboard face outward
          group.add(dot);
        }
      }
    };

    // ──────────────────────────────────────────────
    // 6. Start globe facing India
    // ──────────────────────────────────────────────
    group.rotation.y = -1.55;

    // ──────────────────────────────────────────────
    // 7. Animation loop
    // ──────────────────────────────────────────────
    let raf: number;
    let pulseScale = 1;
    let pulsDir    = 1;
    const pulseMat = pulseRing.material as THREE.MeshBasicMaterial;

    const animate = () => {
      raf = requestAnimationFrame(animate);

      group.rotation.y += 0.003;

      // Pulse the outer ring
      pulseScale    += 0.015 * pulsDir;
      if (pulseScale > 1.8 || pulseScale < 1.0) pulsDir *= -1;
      pulseRing.scale.setScalar(pulseScale);
      pulseMat.opacity = 0.5 / pulseScale;

      renderer.render(scene, camera);
    };
    animate();

    // ──────────────────────────────────────────────
    // Cleanup
    // ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: 500, height: 500 }}>
      {/* Three.js canvas mount */}
      <div ref={mountRef} style={{ width: 500, height: 500 }} />

      {/* Cosmetic IIIT Ranchi label card */}
      <div className="absolute bottom-8 right-0 glass-panel px-5 py-3 border border-orange-500/30 shadow-[0_0_20px_rgba(255,85,0,0.3)] pointer-events-none">
        <p className="text-orange-400 font-mono text-xs tracking-widest font-bold">📡 23.34°N · 85.30°E</p>
        <p className="text-white text-sm font-heading font-bold">IIIT Ranchi</p>
      </div>
    </div>
  );
}
