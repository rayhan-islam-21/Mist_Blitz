"use client";

import React from "react";
import { motion } from "framer-motion";
import { DotPattern } from "../ui/dot-pattern";
import Button from "../ui/retro-btn";
import { Highlighter } from "../ui/highlighter";

export default function JoinCTA() {
  return (
    <section className="relative bg-white py-28 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Dot Pattern */}
      <DotPattern className="absolute inset-0 bg-white opacity-20" />

      {/* Floating shapes for depth */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-200 rounded-full opacity-20 animate-pulse"></div>

      {/* Heading */}
      <motion.h1
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="text-6xl tracking-wide md:text-7xl font-extrabold text-yellow-300 drop-shadow-[4px_4px_0px_black]  leading-tight"
      >
        <Highlighter action="underline" color="#FF9800">
          Become 
        </Highlighter>
        {" "}a
        {"  "}
        <Highlighter action="highlight" color="#E4013A">
          Sponsor
        </Highlighter>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 max-w-3xl text-xl md:text-2xl text-gray-700 font-medium tracking-wide leading-relaxed z-20"
      >
        Join MIST BLITZ in shaping the future of engineering excellence. Gain
        exposure, drive innovation, and connect with top talent in Formula
        Student competitions.
      </motion.p>

      <Button className="mt-12 w-52 -rotate-2 hover:rotate-0 transform transition-all delay-100 bg-yellow-300 p-4 text-xl z-40">
        Join Us
      </Button>

      {/* Optional spark accents */}
      <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-yellow-300 rounded-full opacity-40 animate-bounce"></div>
      <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-red-500 rounded-full opacity-30 animate-bounce"></div>
    </section>
  );
}
