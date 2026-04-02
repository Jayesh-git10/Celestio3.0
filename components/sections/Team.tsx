"use client";

import { motion } from "framer-motion";
import { Code, MessageSquare, Briefcase } from "lucide-react";

const teamMembers = [
  { name: "Alex Mercer", role: "Lead Organizer", imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Sarah Connor", role: "Tech Head", imgUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
  { name: "David Kim", role: "Design Lead", imgUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
  { name: "Elena Roth", role: "Cultural Sec", imgUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" },
];

export default function Team() {
  return (
    <section id="team" className="py-32 bg-transparent relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Reveal */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: false }}
           className="text-center mb-24 relative"
        >
          <h2 className="text-4xl md:text-7xl font-heading font-black mb-6 py-2 tracking-tighter text-white uppercase">
            Meet the <span className="text-gradient">Architects</span>
          </h2>
          <p className="text-lg text-gray-500 font-sans max-w-2xl mx-auto uppercase tracking-[0.3em] text-xs">
            The masterminds building the cosmic reality of Celestio 3.0.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-nebula-core/30 to-starlight-cyan/20 hover:from-nebula-core hover:to-starlight-cyan transition-all duration-700 overflow-hidden shadow-2xl"
            >
              <div className="glass-panel relative w-full h-full p-10 flex flex-col items-center bg-[#030014]/95 z-10 text-center transition-transform duration-700 group-hover:-translate-y-3 border-none">
                
                {/* Image Reveal */}
                <div className="w-36 h-36 rounded-full mb-8 overflow-hidden border-4 border-white/5 group-hover:border-starlight-cyan/40 transition-colors duration-700 relative">
                   <div className="absolute inset-0 bg-nebula-core/20 mix-blend-screen opacity-0 group-hover:opacity-60 transition-opacity blur-[50px] z-0" />
                   <img src={member.imgUrl} alt={member.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 relative z-10" />
                </div>
                
                <h3 className="text-2xl font-heading font-black text-white mb-2 group-hover:text-glow transition-all uppercase tracking-tighter">{member.name}</h3>
                <p className="text-[11px] font-sans text-starlight-cyan/80 mb-8 uppercase tracking-[0.4em] font-black">{member.role}</p>
                
                <div className="flex space-x-8 mt-auto">
                  <a href="#" className="text-gray-600 hover:text-white transition-all transform hover:scale-150"><Code size={20} /></a>
                  <a href="#" className="text-gray-600 hover:text-white transition-all transform hover:scale-150"><MessageSquare size={20} /></a>
                  <a href="#" className="text-gray-600 hover:text-white transition-all transform hover:scale-150"><Briefcase size={20} /></a>
                </div>
              </div>

              {/* Radiant Bloom on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-nebula-core/30 to-starlight-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl z-0" />
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
