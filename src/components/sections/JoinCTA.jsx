"use client";

import React from "react";
import { motion } from "framer-motion";
import { DotPattern } from "../ui/dot-pattern";
import Button from "../ui/retro-btn";
import { Highlighter } from "../ui/highlighter";
import Image from "next/image";

export default function JoinCTA() {
  return (
    <section className="relative py-32 bg-white border-t-0 border-black  flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Dot Pattern */}
      <DotPattern className="absolute inset-0 bg-white opacity-10" />

      {/* Floating shapes for depth */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>

      {/* Heading */}
      <motion.h1
        initial={{ y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }} // animate when 50% in view, only once
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="text-6xl tracking-wide md:text-7xl font-extrabold text-yellow-300  leading-tight"
      >
         <span className="text-5xl uppercase md:text-8xl font-black text-black italic ">
          <Highlighter>Join {" "}<span className="text-red-600">Sponsers</span></Highlighter>
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-6 max-w-3xl text-xl md:text-2xl text-gray-700 font-medium tracking-wide leading-relaxed z-20"
      >
        Join MIST BLITZ in shaping the future of engineering excellence. Gain
        exposure, drive innovation, and connect with top talent in Formula
        Student competitions.
      </motion.p>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
      >
        <Button
          size="lg"
          className="px-12 mt-12 -rotate-2 hover:rotate-0 transition-all delay-75 py-5 bg-red-600 text-white border-b-4 border-red-900 active:translate-y-1"
        >
          <span className="font-black uppercase tracking-widest italic">
            Join us as a Sponsor
          </span>
        </Button>
      </motion.div>

      {/* Optional spark accents */}
      <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-yellow-300 rounded-full opacity-40 animate-bounce"></div>
      <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-red-500 rounded-full opacity-30 animate-bounce"></div>
    </section>
  );
}
