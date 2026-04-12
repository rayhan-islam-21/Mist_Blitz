"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  { value: "FSC", sub: "China 2025" },
  { value: "76", sub: "Teams Competed" },
  { value: "01", sub: "Car Built" },
  { value: "50+", sub: "Engineers" },
];

const Hero = () => {
  const [time, setTime] = useState("00:00.000");

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const mins = Math.floor(elapsed / 60000).toString().padStart(2, "0");
      const secs = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, "0");
      const ms = (elapsed % 1000).toString().padStart(3, "0");
      setTime(`${mins}:${secs}.${ms}`);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-0 min-h-screen flex flex-col justify-end w-full overflow-hidden bg-black">

      {/* Video Background */}
      <motion.div
        initial={{ clipPath: "inset(40% 40% 40% 40% rounded 100px)", scale: 1.1, opacity: 0 }}
        animate={{ clipPath: "inset(0% 0% 0% 0% rounded 0px)", scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <video className="w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata">
          <source src="https://res.cloudinary.com/dnrubj8x4/video/upload/f_mp4,q_auto/hero-viedo_yzq8zl" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-transparent to-transparent" />
      </motion.div>

      {/* Racing grid overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      {/* Top bar — telemetry */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/5"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">LIVE · Season 01</span>
        </div>
        <div className="font-mono text-[11px] text-white/30 tracking-widest tabular-nums">{time}</div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">MB-F1.0 · Furiosa</div>
      </motion.div>

      {/* Red diagonal accent */}
      <div className="absolute top-0 right-0 w-1 h-full bg-red-600 opacity-80 z-20" />

      {/* Main content */}
      <div className="relative z-30 px-6 md:px-12 pb-16 md:pb-20">

        {/* Main heading */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-[16vw] md:text-[12vw] font-black italic uppercase leading-none tracking-tighter text-white"
          >
            MIST
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-[16vw] md:text-[12vw] font-black italic uppercase leading-none tracking-tighter text-red-600"
          >
            BLITZ
          </motion.h1>
        </div>

        {/* Tagline + Stats row */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-md">
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
              Bangladesh&apos;s Formula Student team — engineering race cars from scratch at the
              Military Institute of Science and Technology.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/our-cars" className=" bg-red-600 text-white hover:bg-red-700">
                Explore Furiosa 1.0
              </Link>
              <Link href="/about" className=" border border-white/20 text-white hover:border-white/60">
                Our Story
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex gap-0 border border-white/10">
            {stats.map((s, i) => (
              <div key={i} className="px-5 py-4 border-r border-white/10 last:border-r-0 text-center">
                <p className="font-black italic uppercase text-white text-xl md:text-2xl leading-none">{s.value}</p>
                <p className="font-mono text-[8px] uppercase tracking-widest text-white/30 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 right-8 z-30 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-red-600"
          />
        </div>
        <span className="font-mono text-[8px] uppercase tracking-widest text-white/20 rotate-90 origin-center mt-2">Scroll</span>
      </motion.div>

    </section>
  );
};

export default Hero;
