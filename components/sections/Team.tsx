"use client";

import { motion } from "framer-motion";

const teamMembers = [
  { name: "Anil Alok", role: "Vice President", imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
  { name: "Devansh Khandelwal", role: "Technical Head", imgUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
  { name: "Prashant Rai", role: "Sports Head", imgUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
  { name: "", role: "Cultural Sec", imgUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" },
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
                
                <div className="flex space-x-12 mt-auto">
                  {/* LinkedIn */}
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-[#0077B5] transition-all duration-300 transform hover:scale-125 hover:shadow-[0_0_20px_rgba(0,119,181,0.4)]"
                    aria-label="LinkedIn"
                  >
                    <svg height="22" width="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>

                  {/* Gmail/Mail */}
                  <a 
                    href="#" 
                    className="text-gray-500 hover:text-[#EA4335] transition-all duration-300 transform hover:scale-125 hover:shadow-[0_0_20px_rgba(234,67,53,0.4)]"
                    aria-label="Gmail"
                  >
                    <svg height="22" width="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z"/>
                    </svg>
                  </a>
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
