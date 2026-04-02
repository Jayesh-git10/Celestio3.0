"use client";

import { Mail, MapPin, Phone, Code, Hash, Disc } from "lucide-react";
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
              ["Past Events",    "/past-events"],
              ["Team",           "/#team"],
              ["Sponsors",       "/#sponsors"],
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
          <div className="flex flex-col space-y-3">
            <h3 className="text-white font-heading font-semibold text-base mb-2 tracking-widest uppercase text-xs text-gray-400">
              Contact
            </h3>
            {[
              [MapPin, "IIIT Ranchi, Jharkhand — 834010"],
              [Mail,   "celestio@iiitr.ac.in"],
              [Phone,  "+91 0000 000000"],
            ].map(([Icon, text], i) => (
              <div key={i} className="flex items-center gap-3 text-gray-400 text-xs font-sans tracking-widest uppercase">
                {/* @ts-ignore */}
                <Icon size={14} className="text-starlight-cyan flex-shrink-0" />
                <span className="leading-tight">{text as string}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Socials + Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-white/10 gap-6">
          <div className="flex gap-4">
            {[Code, Hash, Disc].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-3 rounded-full glass-panel text-gray-400 hover:text-white hover:border-nebula-core hover:shadow-[0_0_12px_rgba(121,40,202,0.4)] transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <form className="flex w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="bg-white/5 border border-white/10 text-white px-5 py-3 rounded-l-full focus:outline-none focus:border-starlight-cyan w-full md:w-60 transition-colors font-sans text-xs placeholder-gray-600 uppercase tracking-widest"
            />
            <button className="bg-gradient-to-r from-nebula-core to-starlight-cyan text-white font-heading font-bold px-6 py-3 rounded-r-full hover:opacity-90 transition-opacity tracking-widest uppercase text-xs">
              Subscribe
            </button>
          </form>
        </div>

        <p className="text-center mt-10 text-gray-700 font-sans text-[9px] tracking-[0.4em] uppercase">
          &copy; {new Date().getFullYear()} Celestio 3.0 · IIIT Ranchi · All rights reserved.
        </p>

        {/* 🛠️ Developer Credit */}
        <div className="flex items-center justify-center gap-2.5 mt-6 opacity-70 hover:opacity-100 transition-all duration-500 group pb-4">
          <svg 
            height="14" 
            width="14" 
            viewBox="0 0 16 16" 
            className="fill-gray-400 group-hover:fill-white transition-colors"
          >
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
