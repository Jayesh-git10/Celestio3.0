"use client";

import { motion } from "framer-motion";
import { useSpaceSound } from "@/hooks/use-space-sound";

const activeEvents = [
  {
    name: "Gen-AI Sprint Hackathon",
    category: "Technical",
    link: "https://unstop.com/hackathons/gen-ai-sprint-hackathon-celestio-30-indian-institute-of-information-technology-iiit-ranchi-1671573",
    icon: "/clubs/ml.png",
    description: "Build the future with generative AI in this high-octane sprint challenge."
  },
  {
    name: "Ramp Walk by Estillo",
    category: "Cultural",
    link: "https://unstop.com/events/ramp-walk-celestio-30-indian-institute-of-information-technology-iiit-ranchi-1670523",
    icon: "/clubs/estillo.jpeg",
    description: "Showcase your style and charisma on the interstellar runway."
  },
  {
    name: "Dance Competition",
    category: "Cultural",
    link: "https://unstop.com/events/dance-completion-celestio-30-indian-institute-of-information-technology-iiit-ranchi-1670537",
    icon: "/clubs/nrityarashi.jpeg",
    description: "Express your rhythm and energy in this universe-wide battle."
  },
  {
    name: "Singing Competition by SAAZ",
    category: "Cultural",
    link: "https://unstop.com/events/singing-competition-celestio-30-indian-institute-of-information-technology-iiit-ranchi-1670529",
    icon: "/clubs/saaz.jpeg",
    description: "Let your voice resonate through the cosmos in this vocal showdown."
  },
  {
    name: "MUN-Lit Club",
    category: "Academic",
    link: "https://unstop.com/events/celestio-30-mun-lit-club-iiit-ranchi-celestio-30-indian-institute-of-information-technology-iiit-ranchi-1667438",
    icon: "/clubs/lit-club.jpeg",
    description: "Diplomacy, debate, and literary excellence on a grand stage."
  },
  {
    name: "Poetry Competition",
    category: "Cultural",
    link: "https://unstop.com/events/poetry-competition-celestio-30-indian-institute-of-information-technology-iiit-ranchi-1671588",
    icon: "/clubs/alfaaz.jpeg",
    description: "Spin verses that capture the essence of the digital nebula."
  },
  {
    name: "BrandQuest",
    category: "Technical",
    link: "https://unstop.com/hackathons/brandquest-celestio-30-indian-institute-of-information-technology-iiit-ranchi-1672195",
    icon: "/clubs/arcanum.jpeg",
    description: "Unleash your creativity and strategic thinking to conquer the world of branding."
  }
];

export default function Events() {
  const { playHover, playClick } = useSpaceSound();

  return (
    <section id="registrations" className="py-24 md:py-32 bg-transparent relative z-10 overflow-hidden">

      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-starlight-cyan/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-20"
        >
          <span className="text-starlight-cyan font-logo text-xs tracking-[0.4em] uppercase mb-4 block">
            ✦ Mission Control
          </span>
          <h2 className="text-4xl md:text-7xl font-heading font-black text-white tracking-tighter uppercase mb-6 px-2">
            Cosmic <span className="text-gradient">Challenges</span>
          </h2>
          <p className="text-gray-400 font-sans text-xs md:text-sm uppercase tracking-[0.25em] max-w-2xl mx-auto">
            Ignite your potential. Join the most anticipated competitions of Celestio 3.0.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {activeEvents.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: idx * 0.1 }}
              className={`group perspective-1000 transform-gpu will-change-transform
                ${activeEvents.length === 7 && idx === activeEvents.length - 1 ? "lg:col-start-2" : ""}
              `}
            >
              <div
                className="relative glass-panel p-8 rounded-3xl border-white/5 hover:border-starlight-cyan/30 transition-all duration-500 h-full flex flex-col justify-between hover:shadow-[0_0_40px_rgba(0,255,255,0.1)] group-hover:-translate-y-2"
                onMouseEnter={playHover}
              >
                {/* Icon FIXED */}
                <div className="absolute top-0 right-0 p-6 opacity-80 md:opacity-20 md:group-hover:opacity-100 transition-opacity duration-500 text-3xl">
                  {typeof event.icon === "string" ? (
                    <img
                      src={event.icon}
                      alt={event.name}
                      className="w-14 h-14 object-contain"
                    />
                  ) : (
                    event.icon
                  )}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <span className="text-starlight-cyan font-sans text-[10px] font-black uppercase tracking-[0.3em] mb-4 block opacity-100 md:opacity-60 md:group-hover:opacity-100 transition-opacity">
                    {event.category}
                  </span>
                  <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tighter mb-4 pr-10">
                    {event.name}
                  </h3>
                  <p className="text-gray-400 font-sans text-sm leading-relaxed mb-8 opacity-100 md:opacity-80 md:group-hover:opacity-100 transition-opacity">
                    {event.description}
                  </p>
                </div>

                {/* Button */}
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="w-full py-4 rounded-xl border border-white/10 hover:border-starlight-cyan bg-white/5 hover:bg-starlight-cyan/10 text-white font-heading font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                >
                  Register on Unstop ↗
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}