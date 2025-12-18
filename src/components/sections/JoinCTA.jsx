"use client";

import React from "react";
import { motion } from "framer-motion";
import { DotPattern } from "../ui/dot-pattern";

export default function SponsorHero() {
  return (
    <section className="relative bg-linear-to-b from-gray-50 to-white py-28 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Dot Pattern */}
      <DotPattern className="absolute inset-0 opacity-20" />

      {/* Floating shapes for depth */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-200 rounded-full opacity-20 animate-pulse"></div>

      {/* Heading */}
      <motion.h1
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="text-6xl md:text-7xl font-extrabold text-yellow-300 drop-shadow-[4px_4px_0px_black]  leading-tight"
      >
        Become a Sponsor
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 max-w-3xl text-xl md:text-2xl text-gray-700 font-medium tracking-wide leading-relaxed z-20"
      >
        Join MIST BLITZ in shaping the future of engineering excellence. 
        Gain exposure, drive innovation, and connect with top talent in Formula Student competitions.
      </motion.p>

      {/* CTA Button */}
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.25)" }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 relative inline-block bg-yellow-300 text-black font-bold py-4 px-14 rounded-xl shadow-[0_6px_0_0_black] border-2 border-black overflow-hidden text-2xl transition-all duration-200 z-30"
      >
        <span className="absolute -inset-1 bg-yellow-300 blur-xl opacity-40 -z-10 animate-pulse"></span>
        Partner With Us
      </motion.a>

      {/* Optional spark accents */}
      <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-yellow-300 rounded-full opacity-40 animate-ping"></div>
      <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-red-300 rounded-full opacity-30 animate-ping"></div>
    </section>
  );
}
