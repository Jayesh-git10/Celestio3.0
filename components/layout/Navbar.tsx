"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useSpaceSound } from "@/hooks/use-space-sound";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen]     = useState(false);
  const { playHover, playClick } = useSpaceSound();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home",        href: "/#home" },
    { name: "Timeline",    href: "/#events" },
    { name: "Archives",    href: "/#performers" },
    { name: "Past Events", href: "/past-events" },
    { name: "About",       href: "/#about" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 md:py-3" : "py-4 md:py-5"
      }`}
    >
      {/* ── Scroll Progress Bar ── */}
      <motion.div className="scroll-progress h-[2px] md:h-[3px]" style={{ scaleX }} />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-50">
        <div
          className={`flex items-center justify-between px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl transition-all duration-500 ${
            scrolled || isOpen
              ? "glass-panel bg-[#030014]/80 backdrop-blur-xl border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <a 
            href="/#home" 
            onMouseEnter={playHover}
            onClick={playClick}
            className="block hover:opacity-80 transition-opacity"
          >
            <Image
               src="/logo.jpeg"
               alt="Celestio 3.0"
               width={110}
               height={44}
               className="object-contain h-7 md:h-10 w-auto"
               priority
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 text-[13px] font-sans font-medium text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={playHover}
                onClick={playClick}
                className="relative group hover:text-white transition-all tracking-wide py-2"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-starlight-cyan group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#00FFFF]" />
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onMouseEnter={playHover}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => { setIsOpen(!isOpen); playClick(); }}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 min-h-screen bg-[#030014]/95 backdrop-blur-2xl z-[100] md:hidden flex flex-col"
          >
            {/* Background Nebula Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-nebula-core/10 blur-[120px] animate-pulse-slow" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-starlight-cyan/10 blur-[100px]" />
            </div>

            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 relative z-10">
              <Image 
                src="/logo.jpeg" 
                alt="Celestio 3.0" 
                width={100} 
                height={40} 
                className="object-contain h-8 w-auto" 
              />
              <button
                onClick={() => { setIsOpen(false); playClick(); }}
                className="p-3 glass-panel rounded-full border-white/10 hover:border-starlight-cyan/50 transition-all text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links Container */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 relative z-10 px-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <a
                    href={link.href}
                    onClick={() => { setIsOpen(false); playClick(); }}
                    className="group flex flex-col items-center"
                  >
                    <span 
                      className="text-4xl sm:text-5xl font-heading font-black text-white hover:text-starlight-cyan transition-colors tracking-tighter uppercase"
                      onMouseEnter={playHover}
                    >
                      {link.name}
                    </span>
                    <span className="h-px w-0 bg-starlight-cyan group-hover:w-full transition-all duration-300 shadow-[0_0_10px_#00FFFF] mt-2" />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Footer / Social Info in Menu */}
            <div className="p-10 text-center relative z-10">
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black mb-4">
                ✦ IIIT Ranchi Presents ✦
              </p>
              <div className="flex justify-center gap-6">
                 {/* Placeholder for social icons if needed */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
