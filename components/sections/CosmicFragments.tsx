"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const shards = [
  { id: 1, top: "10%", left: "15%", size: "w-24 h-40", delay: 0.1, speed: -100 },
  { id: 2, top: "40%", left: "75%", size: "w-32 h-32", delay: 0.3, speed: 150 },
  { id: 3, top: "70%", left: "25%", size: "w-20 h-56", delay: 0.2, speed: -200 },
  { id: 4, top: "20%", left: "60%", size: "w-44 h-24", delay: 0.4, speed: 120 },
  { id: 5, top: "50%", left: "10%", size: "w-28 h-28", delay: 0.5, speed: -80 },
];

export default function CosmicFragments() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-transparent py-20 pointer-events-none">
      
      {/* 🌌 Background Nebula Mist */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-nebula-core/10 rounded-full blur-[150px] opacity-30 animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto h-full relative z-10 flex items-center justify-center">
        
        {/* 🌠 Abstract Geometric Shards */}
        {shards.map((shard) => {
          const y = useTransform(scrollYProgress, [0, 1], [0, shard.speed]);
          const rotate = useTransform(scrollYProgress, [0, 1], [0, shard.speed / 2]);

          return (
            <motion.div
              key={shard.id}
              style={{ top: shard.top, left: shard.left, y, rotate }}
              className={`absolute ${shard.size} glass-panel border-white/10 rounded-3xl shadow-2xl backdrop-blur-3xl overflow-hidden`}
            >
              {/* Internal Refraction Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-starlight-cyan/10 to-transparent opacity-50" />
              <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-nebula-core/10 blur-2xl rounded-full" />
              
              {/* Cinematic Scanline */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10 animate-scanline" />
            </motion.div>
          );
        })}

        {/* ⚡ Energy Constellations (Animated SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0">
           <motion.path
             d="M 100,200 L 300,500 L 800,300 M 200,600 L 900,100"
             fill="none"
             stroke="url(#energyGradient)"
             strokeWidth="1.5"
             strokeDasharray="10 20"
             initial={{ pathLength: 0 }}
             whileInView={{ pathLength: 1 }}
             viewport={{ once: false }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
           />
           <defs>
             <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#00FFFF" />
               <stop offset="100%" stopColor="#7928CA" />
             </linearGradient>
           </defs>
        </svg>

      </div>

    </section>
  );
}
