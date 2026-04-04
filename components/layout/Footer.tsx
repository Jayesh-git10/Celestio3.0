"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-transparent pt-24 pb-8 relative overflow-hidden border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-nebula-core/8 blur-[150px] pointer-events-none rounded-full mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div className="flex flex-col space-y-6">
            <Link href="/#home">
              <Image
                src="/logo.jpeg"
                alt="Celestio 3.0"
                width={180}
                height={72}
                className="object-contain hover:opacity-80 transition-opacity cursor-pointer"
              />
            </Link>
            <p className="text-gray-500 font-sans text-sm max-w-xs leading-relaxed mt-2 tracking-widest uppercase text-[10px]">
              The annual Tech &amp; Cultural Fest of IIIT Ranchi — a cosmic collision of innovation and expression.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col space-y-3 md:ml-auto">
            <h3 className="text-white font-heading font-semibold text-base mb-2 tracking-widest uppercase text-xs text-gray-400">
              Explore
            </h3>
            {[
              ["Events Timeline", "/#events"],
              ["Past Performers", "/#performers"],
              ["Past Events", "/past-events"],
              // ["Sponsors", "/#sponsors"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-gray-400 hover:text-white transition-colors font-sans text-xs tracking-widest uppercase"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-heading font-semibold text-base mb-2 tracking-widest uppercase text-xs text-gray-400">
              Contact
            </h3>

            {/* Location */}
            <div className="flex items-center gap-3 text-gray-400 text-xs font-sans tracking-widest uppercase">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-starlight-cyan flex-shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span className="leading-tight text-[10px]">IIIT Ranchi
                ARTTC BSNL Campus, Getlatu,
                Near Jumar River Bridge,
                P.O.: Neori Vikas Vidyalaya SO,
                Hazaribagh Road, Ranchi -835217 (Jharkhand).</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-gray-400 text-xs font-sans tracking-widest uppercase">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-starlight-cyan flex-shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span className="leading-tight text-[10px]">celestio@iiitranchi.ac.in</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 text-gray-400 text-xs font-sans tracking-widest uppercase">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-starlight-cyan flex-shrink-0">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className="leading-tight text-[10px]">+91 99151 11034</span>
            </div>
          </div>
        </div>

        {/* Socials Column */}
        <div className="flex flex-col md:flex-row items-center justify-center py-8 border-t border-white/10 gap-8">
          <div className="flex gap-6">
            {/* GitHub */}
            <a href="#" className="p-2.5 rounded-full glass-panel text-gray-400 hover:text-white hover:border-nebula-core hover:shadow-[0_0_15px_rgba(121,40,202,0.4)] transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            {/* Twitter/X */}
            <a href="#" className="p-2.5 rounded-full glass-panel text-gray-400 hover:text-white hover:border-nebula-core hover:shadow-[0_0_15px_rgba(121,40,202,0.4)] transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            {/* Discord */}
            <a href="#" className="p-2.5 rounded-full glass-panel text-gray-400 hover:text-white hover:border-nebula-core hover:shadow-[0_0_15px_rgba(121,40,202,0.4)] transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
            </a>
          </div>
        </div>

        <p className="text-center mt-10 text-gray-700 font-sans text-[9px] tracking-[0.4em] uppercase">
          &copy; {new Date().getFullYear()} Celestio 3.0 · IIIT Ranchi · All rights reserved.
        </p>

        {/* 🛠️ Developer Credit */}
        <div className="flex items-center justify-center gap-2.5 mt-6 opacity-70 hover:opacity-100 transition-all duration-500 group pb-4">
          <svg height="14" width="14" viewBox="0 0 16 16" className="fill-gray-400 group-hover:fill-white transition-colors">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <a
            href="https://github.com/Jayesh-git10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white font-sans text-[10px] tracking-[0.3em] font-medium uppercase transition-colors"
          >
            Made by Jayesh Sharma
          </a>
        </div>
      </div>
    </footer>
  );
}
