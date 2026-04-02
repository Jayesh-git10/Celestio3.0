"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section id="about" ref={containerRef} className="relative min-h-screen py-32 flex items-center justify-center overflow-hidden">
      
      {/* ── Dynamic Ambient Glows ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-nebula-core/8 rounded-full blur-[140px] mix-blend-screen" />
        <motion.div style={{ y: y2 }} className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-starlight-cyan/4 rounded-full blur-[140px] mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Title Reveal */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
           whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
           viewport={{ once: false, amount: 0.3 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="mb-14"
        >
          <h2 className="text-4xl md:text-7xl font-heading font-black mb-4 tracking-tighter text-white leading-tight uppercase">
            A Cosmic Convergence<br />
            <span className="text-gradient drop-shadow-[0_0_20px_rgba(0,255,255,0.2)]">
               DANCES WITH CULTURE.
            </span>
          </h2>
        </motion.div>

        {/* Card Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-10 text-lg md:text-2xl text-gray-400 font-sans font-light leading-relaxed tracking-wide text-justify md:text-center mt-12 glass-panel p-10 md:p-16 relative overflow-hidden"
        >
          {/* Internal Glowing Lines */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-starlight-cyan/40 to-transparent" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-nebula-core/40 to-transparent" />
          
          <p className="relative z-10">
            Welcome to <strong className="text-white font-heading tracking-[0.2em] uppercase text-sm">Celestio 3.0</strong>. The annual Tech & Cultural Fest of IIIT Ranchi where raw intelligence meets unbridled digital expression.
          </p>
          <p className="relative z-10">
            A dimension where the precision of code harmonizes with the soul of art. From the strategic depth of algorithmic battles to the hypnotic rhythms on the main stage—this is the ultimate cosmic celebration.
          </p>

          <footer className="pt-6 relative z-10 border-t border-white/5 space-y-4">
             <div className="flex items-center justify-center gap-4 text-xs tracking-[0.3em] font-black uppercase text-starlight-cyan/60">
                 <span>2026 EDITION</span>
                 <span className="w-1.5 h-1.5 bg-nebula-core rounded-full shadow-[0_0_8px_rgba(121,40,202,0.8)]" />
                 <span>IIIT RANCHI</span>
             </div>
          </footer>
        </motion.div>

      </div>
    </section>
  );
}
