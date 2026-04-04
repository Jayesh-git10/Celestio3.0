"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { useSpaceSound } from "@/hooks/use-space-sound";

const performers = [
  { name: "Anshika Pandey", type: "Singer", year: "2025", imgUrl: "/Anshika-pandey.jpg" },
  { name: "Ablaze Band", type: "Rock Band", year: "2025", imgUrl: "/ablaze.jpg" },
  { name: "DJ Tracer", type: "DJ", year: "2025", imgUrl: "/djtracer.JPG" }
];

function TiltCard({ performer, index }: { performer: typeof performers[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useSpaceSound();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX      = useTransform(mouseYSpring, [0, 1], ["10deg", "-10deg"]);
  const rotateY      = useTransform(mouseXSpring, [0, 1], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const newX = (e.clientX - rect.left) / rect.width;
    const newY = (e.clientY - rect.top) / rect.height;
    if (Math.abs(newX - x.get()) > 0.1 || Math.abs(newY - y.get()) > 0.1) {
       // Optional: play subtle sound on large movement
    }
    x.set(newX);
    y.set(newY);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="perspective-1000"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0.5); y.set(0.5); }}
        onMouseEnter={playHover}
        onClick={playClick}
        style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
        className="relative h-[30rem] w-full rounded-2xl overflow-hidden glass-panel border-white/5 hover:border-starlight-cyan/40 hover:shadow-[0_0_40px_rgba(0,255,255,0.15)] transition-all duration-500 group cursor-pointer"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${performer.imgUrl})`, transform: "translateZ(20px)" }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent group-hover:via-background/30 transition-all duration-500 z-10" />

        <div className="absolute inset-0 flex flex-col justify-end p-10 z-20" style={{ transform: "translateZ(50px)" }}>
          <span className="text-starlight-cyan font-sans tracking-[0.4em] text-[10px] mb-3 uppercase font-black">Archive {performer.year}</span>
          <h3 className="text-4xl font-heading font-black text-white text-glow mb-3 uppercase tracking-tighter group-hover:scale-105 transition-transform origin-left">{performer.name}</h3>
          <div className="flex items-center gap-3">
             <p className="text-xs font-sans text-gray-200 uppercase tracking-widest bg-nebula-core/30 py-1.5 px-5 rounded-full border border-nebula-core/40 backdrop-blur-xl hover:border-starlight-cyan transition-colors">{performer.type}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Performers() {
  return (
    <section id="performers" className="py-32 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="text-center mb-24 relative">
          <h2 className="text-4xl md:text-7xl font-heading font-black mb-6 text-white tracking-tighter uppercase px-2">Past <span className="text-gradient">Legends</span></h2>
          <p className="text-lg text-gray-500 font-sans max-w-2xl mx-auto uppercase tracking-[0.25em] text-xs">Witness the legacy of artists who set the stage ablaze.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          {performers.map((p, idx) => (
            <TiltCard key={idx} performer={p} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
