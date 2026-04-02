"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const events = [
  { time: "Day 1 - 09:00 AM", title: "Gateway Opening", category: "Core", desc: "Initialize the Celestio cosmic network. Welcome address." },
  { time: "Day 1 - 11:00 AM", title: "AI Hackathon", category: "Tech", desc: "24-hour algorithmic battle in the digital nebula." },
  { time: "Day 2 - 02:00 PM", title: "RoboWars", category: "Cyber", desc: "Heavy metal combat inside the containment arena." },
  { time: "Day 3 - 05:00 PM", title: "Astral Art", category: "Design", desc: "Digital art and NFT synth-creation." },
  { time: "Day 3 - 08:00 PM", title: "Supernova EDM", category: "Music", desc: "Live DJ and core meltdown to end the fest." },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="events" ref={containerRef} className="py-32 bg-transparent relative overflow-hidden min-h-[180vh]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Title Reveal */}
        <motion.div
           initial={{ opacity: 0, y: -30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false, amount: 0.3 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-7xl font-heading font-black text-white mb-6 tracking-tighter uppercase">
             Event <span className="text-gradient">Timeline</span>
          </h2>
          <p className="text-gray-400 font-sans max-w-2xl mx-auto text-lg uppercase tracking-[0.25em] text-xs">Explore the choreographed journey of Celestio 3.0.</p>
        </motion.div>

        <div className="relative w-full h-[1400px]">
          {/* Central Energy Path */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] hidden md:block">
            {/* Dark track */}
            <div className="absolute inset-0 bg-white/5 w-full h-full" />
            {/* Filling energy */}
            <motion.div 
               className="w-full bg-gradient-to-b from-nebula-core via-starlight-cyan to-nebula-core shadow-[0_0_20px_rgba(0,255,255,0.4)]"
               style={{ height: '100%', scaleY: pathLength, originY: 0 }}
            />
          </div>

          <div className="flex flex-col h-full justify-between py-12">
            {events.map((event, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={i} className={`flex w-full items-center relative z-10 ${isLeft ? 'justify-start' : 'justify-end md:justify-end justify-start'}`}>
                  
                  {/* Glowing Node Reveal */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-starlight-cyan rounded-full shadow-[0_0_15px_rgba(0,255,255,0.6)] z-20 border-2 border-white"
                  />

                  {/* Content Card Reveal */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -80 : 80, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                    className={`w-full md:w-5/12 glass-panel p-10 hover:-translate-y-2 transition-transform duration-500 border-white/5 relative overflow-hidden group shadow-2xl`}
                  >
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-nebula-core/5 to-starlight-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <header className="mb-4 flex flex-col gap-2">
                       <p className="font-sans font-bold text-xs text-starlight-cyan tracking-widest uppercase">
                          {event.time}
                       </p>
                       <h3 className="font-heading font-black text-white text-3xl tracking-tighter uppercase leading-none group-hover:text-glow transition-all">{event.title}</h3>
                    </header>
                    
                    <span className="inline-block px-4 py-1 mb-6 text-[11px] font-sans font-black uppercase rounded-full bg-nebula-core/20 border border-nebula-core/30 text-white tracking-[0.1em]">
                      {event.category}
                    </span>
                    
                    <p className="text-sm font-sans text-gray-400 leading-relaxed uppercase tracking-wider group-hover:text-gray-200 transition-colors">
                      {event.desc}
                    </p>

                    {/* Bottom Energy Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-starlight-cyan/30 w-0 group-hover:w-full transition-all duration-700" />
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
