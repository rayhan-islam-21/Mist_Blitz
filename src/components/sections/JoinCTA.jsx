"use client";

import React from "react";
import { motion } from "framer-motion";
import { MoveRight, Zap, Target, Activity, ShieldAlert } from "lucide-react";

export default function JoinCTA() {
  return (
    <section className="relative py-40 bg-[#050505] border-t border-white/5 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* SECTION IDENTIFIER (HUD) */}
      <div className="absolute top-10 left-10 hidden md:flex items-center gap-3">
        <div className="w-1 h-6 bg-red-600" />
        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.5em]">
          Strategic // Alliance_Terminal
        </span>
      </div>

      {/* BACKGROUND DECORATIVE ELEMENT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/[0.01] italic select-none pointer-events-none uppercase tracking-tighter">
        FSC_2024
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TOP STATUS BAR */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-4 mb-8 bg-red-600/5 border border-red-600/20 px-6 py-2"
        >
          <Activity size={14} className="text-red-600 animate-pulse" />
          <span className="text-red-500 font-mono font-bold tracking-[0.3em] uppercase text-[10px]">
            Alliance Opportunities // Open
          </span>
        </motion.div>

        {/* HEADING: BRUTALIST STYLE */}
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-7xl font-sans tracking-tighter md:text-[11rem] font-black uppercase italic leading-[0.75]  mb-12"
        >
          FUEL THE <br />
          <span className="text-transparent stroke-text">FUTURE.</span>
        </motion.h2>

        {/* SUBHEADING: TECHNICAL COPY */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <p className="text-xl md:text-3xl font-bold italic text-gray-100 uppercase leading-tight mb-6">
            Join MIST BLITZ in engineering the next era of <span className="text-red-600">Global Motorsports.</span>
          </p>
          <p className="text-lg font-sans text-gray-500 font-medium leading-relaxed">
            Partner with the vanguard of the Military Institute of Science and Technology. 
            Invest in high-tier technical innovation and gain international visibility at the 
            <span className="text-white"> Formula Student China circuits.</span>
          </p>
        </motion.div>

        {/* THE CTA BUTTON: INDUSTRIAL BLOCK */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative inline-block group"
        >
          {/* HUD CORNER DECORATION */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-red-600 transition-all group-hover:-top-6 group-hover:-left-6" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-red-600 transition-all group-hover:-bottom-6 group-hover:-right-6" />

          <button className="relative bg-white text-black px-12 md:px-20 py-8 font-black uppercase tracking-[0.3em] italic text-xl md:text-2xl transition-all hover:bg-red-600 hover:text-white flex items-center gap-8 shadow-[20px_20px_0px_0px_rgba(220,38,38,0.1)] hover:shadow-none active:translate-y-2">
            SECURE PARTNERSHIP
            <MoveRight size={32} className="transition-transform group-hover:translate-x-4" />
          </button>
          
          <div className="mt-10 flex flex-wrap justify-center gap-8 opacity-30">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest">
              <Target size={12} /> GLOBAL_EXPOSURE
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest">
              <Zap size={12} /> TECH_INNOVATION
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest">
              <ShieldAlert size={12} /> EXCLUSIVE_ACCESS
            </div>
          </div>
        </motion.div>
      </div>

      {/* FOOTER STRIP: DATA STREAM */}
      <div className="absolute bottom-0 w-full bg-white text-black py-2 overflow-hidden select-none">
        <div className="flex whitespace-nowrap gap-10 animate-marquee font-mono text-[10px] font-black uppercase">
          {[1,2,3,4].map((i) => (
            <span key={i}>Initiating Alliance Protocol // FSC China 2024 // MIST Blitz Command Dhaka // Join the Revolution</span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px white;
          color: transparent;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}