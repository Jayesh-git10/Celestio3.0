"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const events = [
  { time: "Day 1", title: "Technical Fiesta", desc: "Arcanum Event , AI/ML Contest , CP Rumble , Code Hurdel", color: "starlight-cyan" },
  { time: "Day 2", title: "Cultural Night I", desc: "Lit Club Event , Opening Ceremony , Alfaaz Club Event , Nrityarashi Dance Event , Flashmob , Buffer Time , Main artist program", color: "nebula-core" },
  { time: "Day 3", title: "Cultural Night II", desc: "Saaz Club Event , Abhinay Club Event , Estillio Ramp Walk Event , Main Artist Performances , Photography and treasure Events", color: "starlight-cyan" },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="events" ref={containerRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.3 }}
           className="text-left md:text-center mb-24 md:mb-32 md:px-20"
        >
          <h2 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter uppercase mb-4">
            Cosmic <span className="text-gradient">Timeline</span>
          </h2>
          <p className="text-gray-400 font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-black">
            The chronological journey of Celestio 3.0.
          </p>
        </motion.div>

        {/* ── Timeline Container ── */}
        <div className="relative">
          
          {/* Animated SVG Path (Adaptive Line) */}
          {/* Mobile: 9px (center of 18px dot) | Desktop: Centered alternating line */}
          <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 h-full w-[2px] md:w-[3px] bg-white/5 z-0" />
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 h-full w-[2px] md:w-[3px] bg-gradient-to-b from-starlight-cyan via-nebula-core to-starlight-cyan z-0 shadow-[0_0_15px_rgba(0,255,255,0.4)]"
          />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-16 md:gap-32">
            {events.map((event, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row items-center w-full ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : ""
                } relative`}
              >
                
                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="w-full md:w-[42%] pl-12 md:pl-0"
                >
                  <div className={`glass-panel p-6 md:p-8 rounded-2xl border-white/5 hover:border-${event.color}/30 transition-all duration-500 group cursor-default relative overflow-hidden shadow-2xl`}>
                    {/* Corner energy bloom */}
                    <div className={`absolute -top-10 -right-10 w-20 h-20 bg-${event.color}/10 blur-2xl group-hover:bg-${event.color}/20 transition-all`} />
                    
                    <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest text-${event.color} mb-3 block`}>
                      {event.time}
                    </span>
                    <h3 className="text-xl md:text-3xl font-heading font-black text-white uppercase tracking-tighter mb-4 group-hover:text-glow transition-all">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 font-sans text-[11px] md:text-sm leading-relaxed tracking-wide uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                      {event.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Timeline Dot (Adaptive Alignment) */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                   <div className="relative flex items-center justify-center w-[18px] md:w-[24px]">
                      {/* High-fidelity Energy Ball: Aqua over Purple glow */}
                      <div className={`w-3.5 h-3.5 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-[#00FFFF] to-[#7928CA] shadow-[0_0_15px_#00FFFF,0_0_30px_#7928CA] animate-pulse transition-all duration-500`} />
                   </div>
                </div>

                {/* Spacer (Desktop Only) */}
                <div className="hidden md:block w-[42%]" />

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
