"use client";

import { motion } from "framer-motion";
import GlobeThreeJS from "@/components/ui/Globe";
import { useSpaceSound } from "@/hooks/use-space-sound";

export default function Hero() {
  const { playHover, playClick } = useSpaceSound();

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20">
      
      {/* ── Nebula Portal Backdrop ── */}
      <div className="absolute inset-x-0 h-full w-full pointer-events-none z-0">
         {/* Central energy pulse */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-nebula-core/10 rounded-full blur-[180px] animate-pulse-slow mix-blend-screen opacity-40 z-0" />
         <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-starlight-cyan/5 rounded-full blur-[140px] mix-blend-screen z-0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

        {/* ── Left Content: Wordmark & Tagline ── */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start max-w-2xl">
          
          {/* Badge Reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="px-6 py-2 rounded-full border border-nebula-core/30 bg-nebula-core/5 backdrop-blur-xl mb-10 w-max shadow-[0_0_20px_rgba(121,40,202,0.15)]"
          >
            <span className="text-starlight-cyan font-logo text-xs tracking-[0.4em] uppercase">
              ✦ IIIT Ranchi Presents
            </span>
          </motion.div>

          {/* Cinematic Wordmark Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="mb-8 relative"
          >
            {/* Glow under text */}
            <div className="absolute inset-0 bg-nebula-core/20 blur-[50px] mix-blend-screen opacity-50 z-[-1]" />
            
            <h1 className="text-6xl sm:text-7xl md:text-[8rem] font-heading font-black text-white leading-[0.85] tracking-tighter drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]">
              CELESTIO<br />
              <span className="text-gradient drop-shadow-[0_0_40px_rgba(121,40,202,0.5)]">3.0</span>
            </h1>
          </motion.div>

          {/* Tagline Reveal */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-400 font-sans text-sm md:text-base tracking-[0.35em] uppercase mb-12 leading-relaxed text-center lg:text-left"
          >
            WHERE <span className="text-white font-black italic">TECHNOLOGY</span> <br className="md:hidden" /> DANCES WITH <span className="text-white font-black italic">CULTURE</span>.
          </motion.p>

          {/* CTAs Staggered Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <button 
              onMouseEnter={playHover}
              onClick={playClick}
              className="glass-button px-10 py-5 rounded-full text-white font-heading font-black hover:scale-105 transition-all shadow-[0_0_30px_rgba(121,40,202,0.4)] border-white/20"
            >
              <span className="tracking-[0.2em] uppercase text-xs">Initialize Sequence</span>
            </button>
            <button 
              onMouseEnter={playHover}
              onClick={playClick}
              className="px-10 py-5 rounded-full text-[#b9d8ff] font-heading font-bold hover:text-white transition-all flex items-center justify-center gap-2 border border-white/10 hover:border-white/40 tracking-[0.2em] uppercase text-xs glass-panel"
            >
              Explore Timeline ↓
            </button>
          </motion.div>
        </div>

        {/* ── Right Content: 3D Dotted Core ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.4, ease: "circOut", delay: 0.4 }}
          className="flex-1 flex justify-center items-center relative aspect-square w-full max-w-[500px]"
        >
          {/* Intense Glow under Globe */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-starlight-cyan/25 rounded-full blur-[90px] mix-blend-screen z-0 animate-pulse-slow" />
          
          <div className="relative z-10 w-full h-full flex items-center justify-center scale-110">
            <GlobeThreeJS />
          </div>

          <div className="absolute inset-0 border border-white/5 rounded-full z-0 scale-[1.3] animate-spin-slow pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
