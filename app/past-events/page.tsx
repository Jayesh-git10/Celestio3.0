"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSpaceSound } from "@/hooks/use-space-sound";

const pastEvents = [
  {
    title: "Celestio 1.0: The Inception",
    year: "2023",
    description: "The spark that started it all. A pioneering journey that united over 2,000 students in a celebration of technology and culture.",
    imgUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Celestio 2.0: Cyber Pulse",
    year: "2024",
    description: "Raising the bar with cutting-edge tech battles and a high-octane EDM night that vibrated through the digital nebula.",
    imgUrl: "https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Digital Genesis",
    year: "2023",
    description: "A special edition focused on the emergence of AI and blockchain, featuring world-class hackathons and industry experts.",
    imgUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Cosmic Beats Night",
    year: "2024",
    description: "An ethereal musical experience under the stars, blending synthetic rhythms with traditional melodies.",
    imgUrl: "https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80&w=1200",
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
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 text-gray-400 font-sans text-sm leading-relaxed tracking-wider uppercase"
                >
                  {event.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
