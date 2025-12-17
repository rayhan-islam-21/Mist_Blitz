"use client";

import React from "react";
import { motion } from "framer-motion";
import { DotPattern } from "../ui/dot-pattern";

export default function JoinCTA() {
  return (
    <section className="relative bg-yellow-300 py-20 flex flex-col items-center justify-center text-center overflow-hidden">
        <DotPattern/>
      
      {/* Comic-style Heading */}
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className="text-5xl md:text-6xl font-extrabold text-red-700 drop-shadow-md"
        style={{ textShadow: "2px 2px 0px #000000" }}
      >
        Become Our Partner!
      </motion.h2>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl text-lg md:text-xl font-semibold text-gray-800 mt-4 mb-8"
      >
        Support MIST BLITZ and help us race to the top of Formula Student competitions! Your partnership fuels innovation and teamwork.
      </motion.p>

      {/* CTA Button */}
      <motion.a
        href="#contact"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-red-600 text-yellow-100 font-bold py-3 px-8 rounded-full shadow-lg border-2 border-black text-2xl transition-all duration-300"
      >
        VROOM! Support Us
      </motion.a>

      {/* Optional comic accent: subtle burst behind button */}
      <div className="absolute -z-10 w-64 h-64 rounded-full bg-yellow-200 opacity-40 animate-pulse"></div>
    </section>
  );
}
