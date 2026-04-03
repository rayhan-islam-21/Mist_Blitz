"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const seasons = [
  {
    year: "2021",
    round: "S01",
    title: "The Beginning",
    tagline: "From blueprint to reality.",
    description:
      "MIST Blitz was founded with a single goal — to put Bangladesh on the global Formula Student map. A small group of driven engineers laid the groundwork, established the workshop, and started designing from scratch.",
    image: "/team.jpg",
    accent: "#ffffff",
    milestones: ["Team formally founded", "Workshop established at MIST", "First CAD prototype complete", "Core crew of 12 engineers"],
    phases: ["Design", "Analysis", "Manufacturing", "Testing"],
    stat1: { n: "12", l: "Founders" },
    stat2: { n: "0→1", l: "Prototype" },
  },
  {
    year: "2022",
    round: "S02",
    title: "First Machine",
    tagline: "Steel welded. Engine fired.",
    description:
      "The team completed its first full race car — designed, manufactured, and tested entirely in-house. Every weld, every wire, every component built by students pushing past midnight to meet their own deadline.",
    image: "/car2.jpg",
    accent: "#e53e3e",
    milestones: ["Full chassis fabricated", "Electronics integrated", "30+ team members", "First driver trial runs"],
    phases: ["Design", "Analysis", "Manufacturing", "Testing"],
    stat1: { n: "30+", l: "Team Size" },
    stat2: { n: "#1", l: "Prototype" },
  },
  {
    year: "2023",
    round: "S03",
    title: "International Debut",
    tagline: "Bangladesh on the world stage.",
    description:
      "MIST Blitz entered its first international Formula Student competition. Competing against teams from across the globe, the team earned recognition in design events and returned with invaluable experience.",
    image: "/china4.jpg",
    accent: "#e53e3e",
    milestones: ["First international competition", "Design event recognition", "Strategic sponsors secured", "50+ member strong team"],
    phases: ["Design", "Analysis", "Manufacturing", "Testing"],
    stat1: { n: "50+", l: "Team Size" },
    stat2: { n: "FSC", l: "Competed" },
  },
  {
    year: "2024",
    round: "S04",
    title: "Furiosa 1.0",
    tagline: "Our fastest machine yet.",
    description:
      "A ground-up redesign produced FURIOSA 1.0 — the most technically advanced car the team has ever built. KTM 390 Duke power, steel spaceframe chassis, double wishbone suspension, and a full data acquisition system.",
    image: "/car2.jpg",
    accent: "#e53e3e",
    milestones: ["FURIOSA 1.0 launched", "Formula Student China entry", "Advanced DAQ system", "Best team result in history"],
    phases: ["Design", "Analysis", "Manufacturing", "Testing"],
    stat1: { n: "39Nm", l: "Peak Torque" },
    stat2: { n: "290kg", l: "Car Weight" },
  },
];

export default function OurJourneyPage() {
  const [active, setActive] = useState(3); // default 2024

  const cur = seasons[active];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src="/china4.jpg" fill alt="hero" className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />
        </div>

        {/* Speed lines decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent"
              style={{ top: `${20 + i * 15}%`, width: "60%", left: "40%" }}
            />
          ))}
        </div>

        <div className="relative z-10 px-8 md:px-20 pb-20 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-red-600" />
              <span className="font-mono text-red-500 text-xs uppercase tracking-[0.4em]">
                MIST Blitz Formula Student
              </span>
            </div>
            <h1 className="text-[13vw] md:text-[11vw] font-sans font-black italic uppercase leading-none tracking-tighter text-white mb-2">
              Our
            </h1>
            <h1 className="text-[13vw] md:text-[11vw] font-sans font-black italic uppercase leading-none tracking-tighter text-red-600 mb-10">
              Journey
            </h1>
            <p className="text-gray-400 text-lg max-w-lg font-light">
              Four seasons. One mission. Engineering Bangladesh&apos;s place on the global motorsport stage.
            </p>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-16 flex flex-col items-center gap-2">
          <div className="w-[1px] h-14 bg-gradient-to-b from-red-600 to-transparent" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">scroll</span>
        </div>
      </section>

      {/* ══ SEASON SELECTOR STRIP ══ */}
      <div className="sticky top-16 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex">
          {seasons.map((s, i) => (
            <button
              key={s.year}
              onClick={() => setActive(i)}
              className={`relative flex-1 flex flex-col items-center py-5 px-4 transition-all duration-300 group overflow-hidden ${
                active === i ? "bg-red-600/10" : "hover:bg-white/[0.02]"
              }`}
            >
              {active === i && (
                <motion.div
                  layoutId="pill"
                  className="absolute top-0 left-0 w-full h-[3px] bg-red-600"
                />
              )}
              <span className={`font-mono text-[9px] uppercase tracking-[0.3em] mb-1 ${active === i ? "text-red-500" : "text-white/20"}`}>
                {s.round}
              </span>
              <span className={`font-sans font-black italic text-2xl md:text-3xl leading-none ${active === i ? "text-white" : "text-white/20 group-hover:text-white/50"}`}>
                {s.year}
              </span>
              <span className={`font-mono text-[9px] uppercase tracking-wider mt-1 hidden md:block ${active === i ? "text-white/60" : "text-white/10"}`}>
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ══ SEASON CONTENT ══ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cur.year}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* SECTION A — Full bleed photo + title */}
          <div className="relative h-[70vh] overflow-hidden">
            <Image src={cur.image} fill alt={cur.title} className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

            {/* Giant ghost year */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 font-sans font-black italic text-[22vw] leading-none text-white/[0.04] select-none pointer-events-none">
              {cur.year}
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 px-8 md:px-20 pb-14">
              <span className="block font-mono text-red-500 text-xs uppercase tracking-[0.5em] mb-4">
                {cur.round} / {cur.year}
              </span>
              <h2 className="text-5xl md:text-8xl font-sans font-black italic uppercase leading-none tracking-tighter text-white mb-3">
                {cur.title}
              </h2>
              <p className="text-red-400 italic text-xl md:text-2xl font-sans font-black uppercase">
                {cur.tagline}
              </p>
            </div>

            {/* Right side stats */}
            <div className="absolute bottom-14 right-8 md:right-20 flex gap-12">
              {[cur.stat1, cur.stat2].map((s, i) => (
                <div key={i} className="text-right">
                  <p className="text-4xl md:text-5xl font-sans font-black italic text-white leading-none">
                    {s.n}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION B — Description + milestones */}
          <div className="bg-[#0a0a0a]">
            {/* Red accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-600/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-8 md:px-20 py-20">
              <div className="grid md:grid-cols-2 gap-16 mb-20">
                {/* Description */}
                <div>
                  <p className="text-2xl md:text-3xl text-white/80 leading-relaxed font-light">
                    {cur.description}
                  </p>
                </div>
                {/* Milestones */}
                <div className="space-y-0">
                  {cur.milestones.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-5 py-5 border-b border-white/5 group"
                    >
                      <span className="font-mono text-red-600 text-xs font-bold shrink-0 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="w-0 group-hover:w-4 h-px bg-red-600 transition-all duration-300 shrink-0" />
                      <span className="text-white/70 group-hover:text-white transition-colors text-sm uppercase tracking-wider font-sans font-bold">
                        {m}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phases — horizontal race track style */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-6 h-[2px] bg-red-600" />
                  <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/30">
                    Season Process
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                  {cur.phases.map((phase, i) => (
                    <div
                      key={i}
                      className={`relative p-8 border border-white/5 group overflow-hidden ${
                        i === 0 ? "bg-red-600" : "bg-white/[0.02] hover:bg-white/[0.04]"
                      } transition-all duration-300`}
                    >
                      {/* Phase number watermark */}
                      <span className="absolute top-4 right-5 font-mono text-[40px] font-black text-white/[0.06] leading-none select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {i > 0 && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
                          <div className="w-4 h-4 bg-[#0a0a0a] border border-red-600/30 rotate-45" />
                        </div>
                      )}
                      <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40 mb-3">
                        Phase {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="font-sans font-black italic uppercase text-xl text-white leading-none">
                        {phase}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Season nav */}
            <div className="max-w-7xl mx-auto px-8 md:px-20 pb-16 flex items-center justify-between">
              <button
                onClick={() => setActive((p) => Math.max(0, p - 1))}
                disabled={active === 0}
                className="flex items-center gap-3 text-white/30 hover:text-white disabled:opacity-20 transition-colors group"
              >
                <span className="w-10 h-10 border border-white/20 group-hover:border-red-600 flex items-center justify-center transition-colors">
                  ←
                </span>
                <span className="font-mono text-xs uppercase tracking-wider hidden md:block">
                  {active > 0 ? seasons[active - 1].year : ""}
                </span>
              </button>

              <div className="flex gap-2">
                {seasons.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`transition-all duration-300 ${
                      active === i ? "w-8 h-1 bg-red-600" : "w-2 h-1 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActive((p) => Math.min(seasons.length - 1, p + 1))}
                disabled={active === seasons.length - 1}
                className="flex items-center gap-3 text-white/30 hover:text-white disabled:opacity-20 transition-colors group"
              >
                <span className="font-mono text-xs uppercase tracking-wider hidden md:block">
                  {active < seasons.length - 1 ? seasons[active + 1].year : ""}
                </span>
                <span className="w-10 h-10 border border-white/20 group-hover:border-red-600 flex items-center justify-center transition-colors">
                  →
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ══ STATS STRIP ══ */}
      <div className="border-t border-white/5 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {[
            { n: "4", l: "Seasons", s: "2021 – 2024" },
            { n: "3+", l: "Prototypes", s: "100% in-house" },
            { n: "50+", l: "Engineers", s: "Peak team size" },
            { n: "FSC", l: "China", s: "International competition" },
          ].map((s, i) => (
            <div key={i} className="px-10 py-12">
              <p className="font-sans font-black italic text-5xl text-red-600 leading-none mb-2">{s.n}</p>
              <p className="font-sans font-black italic uppercase text-lg text-white mb-1">{s.l}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/25">{s.s}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
