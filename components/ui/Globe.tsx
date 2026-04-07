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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interaction state
  const isDragging = useRef(false);
  const pointerPos = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current || !containerRef.current) return;

    const container = containerRef.current;
    
    // ──────────────────────────────────────────────
    // Scene + Camera + Renderer
    // ──────────────────────────────────────────────
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    if (mountRef.current) {
      mountRef.current.innerHTML = ''; // Force clear stale canvases from StrictMode
      mountRef.current.appendChild(renderer.domElement);
    }

    const updateSize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    const group = new THREE.Group();
    scene.add(group);

    const R = 1; // Globe radius

    // ──────────────────────────────────────────────
    // Interaction Handlers
    // ──────────────────────────────────────────────
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      pointerPos.current = { x: e.clientX, y: e.clientY };
      container.setPointerCapture(e.pointerId);
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging.current = false;
      container.releasePointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      
      const deltaX = e.clientX - pointerPos.current.x;
      const deltaY = e.clientY - pointerPos.current.y;
      
      const sensitivity = 0.005;
      rotationVelocity.current.y = deltaX * sensitivity;
      rotationVelocity.current.x = deltaY * sensitivity;
      
      pointerPos.current = { x: e.clientX, y: e.clientY };
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("pointermove", onPointerMove);

    // ──────────────────────────────────────────────
    // 1. Atmosphere
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
    scene.add(atmosphere);

    // ──────────────────────────────────────────────
    // 2. Base sphere
    // ──────────────────────────────────────────────
    const baseMesh = new THREE.Mesh(
      new THREE.SphereGeometry(R * 0.998, 64, 64),
      new THREE.MeshPhongMaterial({ color: 0x000510, shininess: 5 })
    );
    group.add(baseMesh);

    // ──────────────────────────────────────────────
    // 3. Ranchi Marker
    // ──────────────────────────────────────────────
    const ranchiPos = latLonToVec3(RANCHI_LAT, RANCHI_LON, R);
    const markerMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xff5500 })
    );
    markerMesh.position.copy(ranchiPos);
    group.add(markerMesh);

    const innerRing = new THREE.Mesh(
      new THREE.RingGeometry(0.029, 0.037, 32),
      new THREE.MeshBasicMaterial({ color: 0xff6600, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
    );
    innerRing.position.copy(ranchiPos);
    innerRing.lookAt(new THREE.Vector3(0, 0, 0));
    group.add(innerRing);

    const pulseRing = new THREE.Mesh(
      new THREE.RingGeometry(0.04, 0.046, 32),
      new THREE.MeshBasicMaterial({ color: 0xff9900, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
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
    // 5. Instanced Dots (High-Performance Rendering)
    // ──────────────────────────────────────────────
    const NUM_DOT_SAMPLES = 22000;
    const dotGeo = new THREE.CircleGeometry(0.006, 6);
    const dotMat = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      side: THREE.DoubleSide, 
      transparent: true, 
      opacity: 0.85 
    });

    const worldImg = new Image();
    worldImg.crossOrigin = "anonymous";
    worldImg.src = "https://cdn.jsdelivr.net/npm/three-globe@2.30.0/example/img/earth-dark.jpg";
    worldImg.onload = () => {
      const cvs = document.createElement("canvas");
      cvs.width = 1024; cvs.height = 512;
      const ctx = cvs.getContext("2d")!; ctx.drawImage(worldImg, 0, 0, 1024, 512);
      const pixels = ctx.getImageData(0, 0, 1024, 512).data;
      
      const brightness = (lat: number, lon: number): number => {
        const u = Math.floor(((lon + 180) / 360) * 1023);
        const v = Math.floor(((90 - lat) / 180) * 511);
        const i = (v * 1024 + u) * 4;
        return (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
      };

      const validDots: {x:number, y:number, z:number}[] = [];
      for (let i = 0; i < NUM_DOT_SAMPLES; i++) {
        const phi = Math.acos(1 - (2 * i) / NUM_DOT_SAMPLES);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);
        const lat = Math.asin(y) * (180 / Math.PI);
        const lon = Math.atan2(z, x) * (180 / Math.PI);
        if (brightness(lat, lon) > 18) {
          validDots.push({ x: x * R, y: y * R, z: z * R });
        }
      }

      // Create ONE single InstancedMesh instead of thousands of individual meshes
      const instancedDots = new THREE.InstancedMesh(dotGeo, dotMat, validDots.length);
      const dummy = new THREE.Object3D();

      validDots.forEach((pos, i) => {
        dummy.position.set(pos.x, pos.y, pos.z);
        dummy.lookAt(new THREE.Vector3(0, 0, 0));
        dummy.updateMatrix();
        instancedDots.setMatrixAt(i, dummy.matrix);
      });

      group.add(instancedDots);
    };

    // ──────────────────────────────────────────────
    // Initial Alignment
    // ──────────────────────────────────────────────
    const initialRotationY = -(RANCHI_LON * Math.PI / 180) - 1.55;
    const initialRotationX = -(RANCHI_LAT * Math.PI / 180) * 0.5;
    group.rotation.y = initialRotationY;
    group.rotation.x = initialRotationX;

    let raf: number;
    let pulseScale = 1; let pulsDir = 1;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      
      group.rotation.y += rotationVelocity.current.y;
      group.rotation.x += rotationVelocity.current.x;

      // Auto-rotation when not dragging
      if (!isDragging.current) {
        group.rotation.y += 0.003;
        rotationVelocity.current.y *= 0.95;
        rotationVelocity.current.x *= 0.95;
      }

      // Constrain vertical rotation
      group.rotation.x = Math.max(-1.1, Math.min(1.1, group.rotation.x));

      pulseScale += 0.015 * pulsDir;
      if (pulseScale > 1.8 || pulseScale < 1.0) pulsDir *= -1;
      pulseRing.scale.setScalar(pulseScale);
      (pulseRing.material as THREE.MeshBasicMaterial).opacity = 0.5 / pulseScale;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      window.removeEventListener("resize", updateSize);
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("pointermove", onPointerMove);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full aspect-square flex items-center justify-center max-w-[500px] mx-auto cursor-crosshair touch-none">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-4 right-4 md:bottom-8 md:right-0 glass-panel px-3 py-1.5 md:px-5 md:py-3 border border-orange-500/30 shadow-[0_0_20px_rgba(255,85,0,0.3)] pointer-events-none transform scale-75 md:scale-100 origin-bottom-right">
        <p className="text-orange-400 font-mono text-[8px] md:text-xs tracking-widest font-bold uppercase">📡 23.34°N · 85.30°E</p>
        <p className="text-white text-[10px] md:text-sm font-heading font-bold uppercase">IIIT Ranchi</p>
      </div>
    </div>
  );
}
