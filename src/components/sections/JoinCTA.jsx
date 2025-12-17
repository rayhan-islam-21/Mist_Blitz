"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Zap, Handshake, Star } from "lucide-react";

export default function ComicPartnerCTA() {
  return (
    <section className="relative bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 py-32 flex flex-col items-center justify-center text-center overflow-hidden border-y-8 border-black">
      
      {/* 1. Halftone Dot Overlay (The "Comic" Print Look) */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(black 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      ></div>

      {/* 2. Floating Decorative Icons */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-12 left-[10%] text-yellow-300 hidden md:block"
      >
        <Rocket size={80} strokeWidth={3} fill="currentColor" className="text-red-700" />
      </motion.div>

      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-12 right-[10%] text-white hidden md:block"
      >
        <Zap size={100} strokeWidth={3} fill="yellow" className="text-black" />
      </motion.div>

      {/* 3. Main Content Container */}
      <div className="relative z-10 px-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <h2 
            className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter"
            style={{ 
              textShadow: "6px 6px 0px #991b1b, 12px 12px 0px #000",
              WebkitTextStroke: "2px black"
            }}
          >
            Join the <br /> 
            <span className="text-yellow-300">Fast Lane!</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-xl md:text-2xl font-black text-black bg-white border-4 border-black px-6 py-2 mt-8 transform -rotate-1 shadow-[8px_8px_0px_rgba(0,0,0,1)]"
        >
          HELP MIST BLITZ RACE TO THE TOP! YOUR SUPPORT FUELS THE FIRE! 🏁
        </motion.p>

        {/* 4. The Action Button */}
        <div className="mt-16 relative inline-block">
          {/* Background decorative star behind button */}
          <div className="absolute -inset-12 flex items-center justify-center opacity-30 animate-spin-slow">
            <Star size={200} fill="white" stroke="none" />
          </div>

          <motion.a
            href="#contact"
            whileHover={{ 
              scale: 1.1, 
              rotate: 2,
              boxShadow: "0px 0px 0px rgba(0,0,0,1)" 
            }}
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center gap-4 bg-red-600 text-white font-black px-12 py-6 rounded-none border-4 border-black text-3xl shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all uppercase"
          >
            <Handshake size={40} strokeWidth={3} />
            Partner Now!
          </motion.a>
        </div>
      </div>

      {/* 5. Comic Action Bursts (Text based) */}
      <div className="absolute top-1/4 right-1/4 font-black text-4xl text-yellow-300 -rotate-12 mix-blend-difference hidden lg:block">
        POW!
      </div>
      <div className="absolute bottom-1/4 left-1/4 font-black text-5xl text-red-500 rotate-12 mix-blend-overlay hidden lg:block">
        BAM!
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </section>
  );
}