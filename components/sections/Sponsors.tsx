"use client";

import { motion } from "framer-motion";

const sponsors = [
  { name: "AlphaTech", tier: "Core", logo: "🚀" },
  { name: "Nexus AI", tier: "Platinum", logo: "🧠" },
  { name: "CyberG", tier: "Gold", logo: "💻" },
  { name: "MetaVerse", tier: "Silver", logo: "🌐" },
  { name: "CryptoPay", tier: "Bronze", logo: "💳" },
  { name: "RoboticsInc", tier: "Core", logo: "🤖" },
  { name: "CloudSync", tier: "Platinum", logo: "☁️" },
  { name: "AlphaTech", tier: "Core", logo: "🚀" },
  { name: "Nexus AI", tier: "Platinum", logo: "🧠" },
  { name: "CyberG", tier: "Gold", logo: "💻" },
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-24 bg-transparent relative overflow-hidden">
      
      {/* ── Section Dividers with Glowing Lines ── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nebula-core/40 to-transparent mx-12 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-20 mb-20 text-center">
        
        {/* Title Reveal */}
        <motion.div
           initial={{ opacity: 0, y: -20, filter: "blur(4px)" }}
           whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
           viewport={{ once: false, amount: 0.3 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-heading font-black py-2 tracking-tighter text-white mb-6 uppercase">
            Our <span className="text-gradient">Sponsors</span>
          </h2>
          <p className="text-gray-400 font-sans text-xs uppercase tracking-[0.3em] font-black">
             Powered by the giants of the digital cosmos.
          </p>
        </motion.div>
      </div>

      {/* ── Scrolling Marquee mit Staggered Entrance ── */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.95 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: false, amount: 0.3 }}
         transition={{ duration: 1, delay: 0.2 }}
         className="relative flex overflow-x-hidden w-full group py-8 z-0 cursor-pointer"
      >
        <motion.div
          animate={{ x: "-100%" }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 space-x-10 pr-10"
        >
          {sponsors.map((sponsor, idx) => (
            <div
              key={idx}
              className="group/item flex items-center space-x-6 glass-panel px-10 py-5 rounded-2xl border-white/5 hover:border-starlight-cyan/40 transition-all duration-500 min-w-[260px] justify-center hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Internal Glow on Hover */}
              <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-starlight-cyan/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
              
              <span className="text-4xl grayscale group-hover/item:grayscale-0 transition-all duration-700 opacity-40 group-hover/item:opacity-100 transform group-hover/item:scale-125">{sponsor.logo}</span>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-heading font-black text-white group-hover/item:text-glow uppercase tracking-tighter transition-all">{sponsor.name}</span>
                <span className="text-[10px] text-starlight-cyan uppercase tracking-[0.2em] font-sans font-black">{sponsor.tier}</span>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Duplicated Marquee for Loop */}
        <motion.div
          animate={{ x: "-100%" }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0 space-x-10 pr-10"
        >
          {sponsors.map((sponsor, idx) => (
            <div
              key={`dup-${idx}`}
              className="group/item flex items-center space-x-6 glass-panel px-10 py-5 rounded-2xl border-white/5 hover:border-starlight-cyan/40 transition-all duration-500 min-w-[260px] justify-center hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-starlight-cyan/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity" />
              
              <span className="text-4xl grayscale group-hover/item:grayscale-0 transition-all duration-700 opacity-40 group-hover/item:opacity-100 transform group-hover/item:scale-125">{sponsor.logo}</span>
              <div className="flex flex-col gap-1">
                <span className="text-xl font-heading font-black text-white group-hover/item:text-glow uppercase tracking-tighter transition-all">{sponsor.name}</span>
                <span className="text-[10px] text-starlight-cyan uppercase tracking-[0.2em] font-sans font-black">{sponsor.tier}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-starlight-cyan/40 to-transparent mx-12 z-10" />
    </section>
  );
}
