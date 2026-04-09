"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/car2.jpg",
    tag: "Engineering",
    code: "ENG-01",
    title: "Furiosa 1.0",
    sub: "Performance validation & track testing",
    stat: { n: "290kg", l: "Car Weight" },
  },
  {
    id: 2,
    image: "/improve.jpg",
    tag: "Fabrication",
    code: "FAB-02",
    title: "Built By Hand",
    sub: "Precision chassis manufacturing in-house",
    stat: { n: "100%", l: "In-House" },
  },
  {
    id: 3,
    image: "/china4.jpg",
    tag: "Competition",
    code: "FSC-03",
    title: "China 2024",
    sub: "Formula Student China — global stage",
    stat: { n: "FSC", l: "Competed" },
  },
  {
    id: 4,
    image: "/team.jpg",
    tag: "Team",
    code: "TMB-04",
    title: "50+ Engineers",
    sub: "One team. One mission. One car.",
    stat: { n: "50+", l: "Members" },
  },
  {
    id: 5,
    image: "/china3.jpg",
    tag: "Racing",
    code: "DYN-05",
    title: "On The Track",
    sub: "Dynamic events — acceleration & endurance",
    stat: { n: "39Nm", l: "Peak Torque" },
  },
];

export default function FormulaGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const cur = slides[active];
  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setActive((p) => (p + 1) % slides.length);

  return (
    <section
      className="relative bg-[#050505] text-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── FULL BLEED IMAGE ── */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={cur.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Image
              src={cur.image}
              fill
              alt={cur.title}
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-linear-to-r from-[#050505]/80 via-transparent to-transparent z-10" />

        {/* Speed lines top-right */}
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden z-10 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-linear-to-l from-transparent via-red-600/20 to-transparent"
              style={{ top: `${25 + i * 18}%`, width: "80%", right: 0 }}
            />
          ))}
        </div>

        {/* Slide code — top left */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-3">
          <div className="w-2 h-2 bg-red-600 rotate-45" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
            {cur.code}
          </span>
        </div>

        {/* Progress bar — top */}
        <div className="absolute top-0 left-0 w-full h-0.5 z-20">
          <motion.div
            className="h-full bg-red-600"
            key={active}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: paused ? 0 : 5, ease: "linear" }}
          />
        </div>

        {/* Slide counter */}
        <div className="absolute top-8 right-8 z-20 font-mono text-xs text-white/30 tracking-widest">
          {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>

        {/* Bottom left: main content */}
        <div className="absolute bottom-0 left-0 z-20 px-8 md:px-16 pb-12 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 mb-4">
                <span className="w-4 h-0.5 bg-red-600" />
                <span className="font-mono text-red-500 text-[10px] uppercase tracking-[0.4em]">
                  {cur.tag}
                </span>
              </span>
              <h3 className="text-5xl md:text-7xl font-sans font-black italic uppercase leading-none tracking-tighter text-white mb-3">
                {cur.title}
              </h3>
              <p className="text-white/50 text-sm uppercase tracking-[0.2em] font-mono">
                {cur.sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom right: stat + arrows */}
        <div className="absolute bottom-0 right-0 z-20 px-8 md:px-16 pb-12 flex items-end gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-right mr-6"
            >
              <p className="font-sans font-black italic text-4xl text-white leading-none">
                {cur.stat.n}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mt-1">
                {cur.stat.l}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-12 h-12 border border-white/20 hover:border-red-600 hover:bg-red-600/10 flex items-center justify-center transition-all duration-200 text-white/60 hover:text-white"
            >
              ←
            </button>
            <button
              onClick={next}
              className="w-12 h-12 border border-white/20 hover:border-red-600 hover:bg-red-600/10 flex items-center justify-center transition-all duration-200 text-white/60 hover:text-white"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex items-stretch">

          {/* Title block */}
          <div className="px-10 py-8 border-r border-white/5 shrink-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/25 mb-1">Section</p>
            <h2 className="font-sans font-black italic uppercase text-3xl leading-none text-white">
              Our <span className="text-red-600">Journey</span>
            </h2>
          </div>

          {/* Slide thumbnails */}
          <div className="flex flex-1 overflow-x-auto no-scrollbar">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`relative shrink-0 h-full min-w-25 md:min-w-35 overflow-hidden transition-all duration-300 ${
                  active === i ? "opacity-100" : "opacity-30 hover:opacity-60"
                }`}
              >
                <Image src={s.image} fill alt={s.title} className="object-cover" />
                <div className="absolute inset-0 bg-black/40" />
                {active === i && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600" />
                )}
                <span className="absolute bottom-2 left-2 font-mono text-[8px] uppercase tracking-wider text-white/70">
                  {s.tag}
                </span>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="px-8 py-8 border-l border-white/5 shrink-0 flex items-center">
            <Link
              href="/our-journey"
              className="cta-btn border border-white/20 text-white/70 hover:text-white hover:border-red-600 group"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 group-hover:text-white transition-colors">
                Full Story
              </span>
              <span className="w-8 h-8 border border-white/20 group-hover:border-red-600 group-hover:bg-red-600/10 flex items-center justify-center transition-all text-white/50 group-hover:text-white">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
