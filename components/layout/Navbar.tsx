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

      {/* Mobile Backdrop & Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Full screen blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#030014]/60 backdrop-blur-md z-40 md:hidden"
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 w-full px-4 mt-2 md:hidden z-50"
            >
              <div className="glass-panel bg-[#030014]/90 flex flex-col gap-5 p-6 rounded-xl border-white/10 shadow-3xl overflow-hidden relative">
                {/* Decorative side glow */}
                <div className="absolute -right-10 top-0 w-20 h-full bg-nebula-core/10 blur-3xl pointer-events-none" />
                
                <Image src="/logo.jpeg" alt="Celestio 3.0" width={120} height={48} className="object-contain mb-2" />
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    onMouseEnter={playHover}
                    onClick={() => { setIsOpen(false); playClick(); }}
                    className="text-sm font-sans font-medium text-gray-300 hover:text-white transition-colors tracking-[0.2em] uppercase py-1"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
