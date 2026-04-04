"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSpaceSound } from "@/hooks/use-space-sound";

const pastEvents = [
  {
    title: "Yantra",
    year: "2026",
    description: "Yantra is an IoT-powered fest that brings innovation to life by seamlessly connecting technology, creativity, and real-world solutions.",
    imgUrl: "/yantra.jpg",
    driveUrl: "https://photos.app.goo.gl/A7HEXYA4nntUE1pu7",
  },
  {
    title: "Quasar X AI",
    year: "2026",
    description: "Qusar x AI is a cutting-edge hackathon by IIIT Ranchi that brings together innovators to build impactful solutions at the intersection of artificial intelligence and real-world challenges.",
    imgUrl: "/quasarxai.JPG",
    driveUrl: "https://photos.app.goo.gl/ejeWU1XKsP4bU2YT7",
  },
  {
    title: "Celestio 2.0",
    year: "2025",
    description: "A special edition focused on the emergence of AI and blockchain, featuring world-class hackathons and industry experts.",
    imgUrl: "/celestio2.0.jpg",
    driveUrl: "https://photos.app.goo.gl/AznWayxvJkoR5dpF8",
  },
  {
    title: "Quasar 2.0",
    year: "2025",
    description: "Quasar 2.0 is an electrifying hackathon that brings together passionate innovators to build cutting-edge solutions, push technological boundaries, and turn bold ideas into reality.",
    imgUrl: "/qusar2.0.jpg",
    driveUrl: "https://photos.app.goo.gl/AznWayxvJkoR5dpF8",
  },
];

export default function PastEventsPage() {
  const { playHover, playClick } = useSpaceSound();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Backdrop Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[600px] bg-nebula-core/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <h1 className="text-6xl md:text-8xl font-heading font-black text-white mb-6 uppercase tracking-tighter">
              Past <span className="text-gradient">Events</span>
            </h1>
            <p className="text-gray-400 font-sans text-sm md:text-base tracking-[0.4em] uppercase max-w-2xl mx-auto">
              Witness the legacy of previous editions that paved the way for Celestio 3.0.
            </p>
          </motion.div>

          {/* Events Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {pastEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="group relative"
              >
                {/* Image Card */}
                <div 
                  className="relative h-[400px] w-full rounded-2xl overflow-hidden glass-panel border-white/5 group-hover:border-starlight-cyan/40 transition-all duration-700 shadow-2xl cursor-pointer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  <Image
                    src={event.imgUrl}
                    alt={event.title}
                    fill
                    className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Content on Image */}
                  <div className="absolute inset-x-8 bottom-8 z-20">
                    <span className="text-starlight-cyan font-black text-[10px] tracking-[0.4em] uppercase mb-2 block">
                      ARCHIVE {event.year}
                    </span>
                    <h3 className="text-3xl font-heading font-black text-white uppercase tracking-tighter group-hover:text-glow transition-all">
                      {event.title}
                    </h3>
                  </div>
                </div>

                {/* Description below image */}
                <div className="mt-6 space-y-6">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400 font-sans text-sm leading-relaxed tracking-wider uppercase"
                  >
                    {event.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <a
                      href={event.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      onClick={playClick}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 glass-panel text-starlight-cyan font-sans text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 hover:border-starlight-cyan/40 hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all group/btn"
                    >
                      View Memories
                      <svg 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
                      >
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
