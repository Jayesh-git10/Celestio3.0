"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-04-13T10:00:00").getTime();

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds }
  ];

  return (
    <div className="flex flex-row justify-center items-center gap-2 md:gap-8 mt-10 md:mt-16 relative z-10 w-full mx-auto px-2">
      {timeUnits.map((unit, idx) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
          className="relative group lg:w-[160px] w-[75px] aspect-square"
        >
          {/* 🛸 High-Density Space Box */}
          <div className="w-full h-full glass-panel p-2 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-3xl flex flex-col items-center justify-center shadow-2xl group-hover:border-starlight-cyan/50 transition-all duration-500">
            
            {/* Subtle Internal Glow */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/5 to-transparent rounded-t-2xl md:rounded-t-[2.5rem] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center justify-center">
              {/* Bold Cinematic Numerals */}
              <motion.span 
                key={unit.value}
                className="text-2xl md:text-6xl font-heading font-black text-white leading-none tracking-tighter mb-0.5 md:mb-3 select-none"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.span>
              
              {/* Thick High-Contrast Labels */}
              <span className="text-[8px] md:text-xs font-sans font-black uppercase tracking-[0.15em] md:tracking-[0.25em] text-gray-400 group-hover:text-white transition-colors">
                {unit.label}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
