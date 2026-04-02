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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        scrolled ? "py-3" : "py-5"
      }`}
    >
      {/* ── Scroll Progress Bar ── */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "glass-panel bg-[#030014]/70 backdrop-blur-xl border-white/10"
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
               width={120}
               height={48}
               className="object-contain h-10 w-auto"
               priority
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-sans font-medium text-gray-300">
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
            <button 
              onMouseEnter={playHover}
              onClick={playClick}
              className="glass-button px-6 py-2.5 rounded-full text-white font-semibold hover:scale-105 transition-transform tracking-wide text-xs uppercase shadow-[0_0_15px_rgba(121,40,202,0.3)]"
            >
              Register
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onMouseEnter={playHover}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => { setIsOpen(!isOpen); playClick(); }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            className="absolute top-full left-0 w-full px-6 mt-2 md:hidden"
          >
            <div className="glass-panel bg-[#030014]/95 flex flex-col gap-6 p-8 rounded-2xl border-white/10 shadow-3xl">
              <Image src="/logo.jpeg" alt="Celestio 3.0" width={140} height={56} className="object-contain" />
              <hr className="border-white/10" />
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onMouseEnter={playHover}
                  onClick={() => { setIsOpen(false); playClick(); }}
                  className="text-base font-sans font-medium text-gray-300 hover:text-white transition-colors tracking-wide"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onMouseEnter={playHover}
                onClick={playClick}
                className="glass-button w-full py-4 rounded-full text-white font-semibold tracking-widest uppercase text-xs"
              >
                Register
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
