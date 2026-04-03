"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const journeyData = [
  {
    year: "2021",
    number: "01",
    title: "The Beginning",
    tagline: "Where it all started.",
    color: "from-white/5",
    image: "/team.jpg",
    milestones: [
      "Team formally founded at MIST",
      "Initial design concepts drafted",
      "First workshop space secured",
      "Core founding members recruited",
    ],
    phases: [
      { label: "Design", detail: "Concept sketches & initial CAD models" },
      { label: "Analysis", detail: "Structural simulation & load calculations" },
      { label: "Manufacturing", detail: "First prototype frame fabrication" },
      { label: "Testing", detail: "Static load testing & validation" },
    ],
    achievements: ["Team formally registered", "Workshop secured at MIST", "First CAD prototype complete"],
    stat: { value: "12", label: "Founding Members" },
  },
  {
    year: "2022",
    number: "02",
    title: "First Prototype",
    tagline: "Steel meets ambition.",
    color: "from-red-900/10",
    image: "/car2.jpg",
    milestones: [
      "First car chassis fabricated",
      "Electronics integration complete",
      "Team expanded to 30+ members",
      "First internal driver trials",
    ],
    phases: [
      { label: "Design", detail: "Full vehicle CAD finalized in SolidWorks" },
      { label: "Analysis", detail: "FEA on chassis & suspension geometry" },
      { label: "Manufacturing", detail: "Chassis welded, suspension assembled" },
      { label: "Testing", detail: "Dynamic testing on campus grounds" },
    ],
    achievements: ["Prototype 1.0 complete", "First driver trials", "30+ active members"],
    stat: { value: "30+", label: "Team Members" },
  },
  {
    year: "2023",
    number: "03",
    title: "International Debut",
    tagline: "Racing beyond borders.",
    color: "from-red-600/10",
    image: "/china4.jpg",
    milestones: [
      "Formula Student competition entry",
      "International ranking achieved",
      "Sponsorship partnerships secured",
      "Media coverage & recognition",
    ],
    phases: [
      { label: "Design", detail: "Revised aero package & lighter chassis" },
      { label: "Analysis", detail: "Full vehicle dynamics simulation" },
      { label: "Manufacturing", detail: "Lightweight CNC-machined components" },
      { label: "Testing", detail: "Endurance & acceleration tests" },
    ],
    achievements: ["Competed internationally", "Design event recognition", "50+ members strong"],
    stat: { value: "50+", label: "Team Members" },
  },
  {
    year: "2024",
    number: "04",
    title: "Evolution & Excellence",
    tagline: "Faster. Smarter. Stronger.",
    color: "from-red-600/20",
    image: "/car2.jpg",
    milestones: [
      "Ground-up powertrain redesign",
      "Advanced electronics & DAQ suite",
      "Best competition result in history",
      "Formula Student China — FURIOSA 1.0",
    ],
    phases: [
      { label: "Design", detail: "Ground-up redesign from competition feedback" },
      { label: "Analysis", detail: "CFD analysis for improved aero & downforce" },
      { label: "Manufacturing", detail: "Carbon fiber bodywork, upgraded drivetrain" },
      { label: "Testing", detail: "Full competition simulation week" },
    ],
    achievements: ["Personal best lap times", "Top static event scores", "National recognition"],
    stat: { value: "FSC", label: "China 2024" },
  },
];

const OurJourneyPage = () => {
  const [activeYear, setActiveYear] = useState("2024");
  const activeIdx = journeyData.findIndex((d) => d.year === activeYear);
  const active = journeyData[activeIdx];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-end justify-start overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/china4.jpg" fill alt="Journey" className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </div>

        {/* Big ghost year */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[30vw] font-sans font-black italic text-white/[0.03] leading-none select-none pointer-events-none pr-4">
          2024
        </div>

        <div className="relative z-10 px-8 md:px-20 pb-24 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-red-500 font-mono uppercase tracking-[0.4em] text-xs mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-red-600" /> MIST Blitz Formula Student
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-7xl md:text-[10rem] font-sans font-black italic uppercase leading-none tracking-tighter mb-6"
          >
            Our<br /><span className="text-red-600">Journey</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-gray-400 text-lg max-w-lg"
          >
            Four years of engineering, sacrifice, and speed. Every lap a lesson. Every season a chapter.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 right-12 flex flex-col items-center gap-3">
          <div className="w-px h-16 bg-gradient-to-b from-red-600 to-transparent" />
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600 rotate-90 origin-center mt-4">scroll</span>
        </div>
      </section>

      {/* ── TIMELINE TRACK ── */}
      <section className="bg-black py-0 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4">
            {journeyData.map((item, i) => (
              <button
                key={item.year}
                onClick={() => setActiveYear(item.year)}
                className={`relative group text-left px-8 py-8 border-r border-white/5 transition-all duration-500 overflow-hidden ${
                  activeYear === item.year ? "bg-red-600/10" : "hover:bg-white/[0.02]"
                }`}
              >
                {/* Active indicator line */}
                {activeYear === item.year && (
                  <motion.div layoutId="track" className="absolute top-0 left-0 w-full h-1 bg-red-600" />
                )}
                <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 mb-1">
                  Season {item.number}
                </span>
                <span className={`block text-4xl md:text-5xl font-sans font-black italic leading-none mb-2 transition-colors ${
                  activeYear === item.year ? "text-white" : "text-white/30 group-hover:text-white/60"
                }`}>
                  {item.year}
                </span>
                <span className={`block text-xs uppercase tracking-wider font-bold transition-colors ${
                  activeYear === item.year ? "text-red-500" : "text-white/20 group-hover:text-white/40"
                }`}>
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVE YEAR CONTENT ── */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.section
            key={active.year}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative bg-black"
          >
            {/* Giant ghost year background */}
            <div className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
              <div className="text-[25vw] font-sans font-black italic leading-none text-white/[0.025] -mt-8 -ml-4">
                {active.year}
              </div>
            </div>

            {/* Main content grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-0">
              {/* Top row: title + tagline + stat */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <p className="text-red-500 font-mono text-xs uppercase tracking-[0.4em] mb-3 flex items-center gap-3">
                    <span className="w-6 h-px bg-red-600" />{active.year}
                  </p>
                  <h2 className="text-5xl md:text-8xl font-sans font-black italic uppercase leading-none tracking-tighter text-white">
                    {active.title}
                  </h2>
                  <p className="text-gray-500 text-xl italic mt-3">{active.tagline}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-7xl md:text-8xl font-sans font-black italic text-red-600 leading-none">
                    {active.stat.value}
                  </p>
                  <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mt-1">
                    {active.stat.label}
                  </p>
                </div>
              </div>

              {/* Full-width image */}
              <div className="relative w-full h-[40vh] mb-16 overflow-hidden">
                <Image
                  src={active.image}
                  fill
                  alt={active.title}
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                {/* Diagonal accent */}
                <div className="absolute top-0 left-0 w-2 h-full bg-red-600" />
              </div>

              {/* Three column content */}
              <div className="grid md:grid-cols-3 gap-0 mb-0">

                {/* Col 1: Milestones */}
                <div className="border-r border-white/5 pr-8 pb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-px bg-red-600" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-500">Milestones</span>
                  </div>
                  <ul className="space-y-5">
                    {active.milestones.map((m, i) => (
                      <li key={i} className="flex gap-4 items-start group">
                        <span className="text-red-600 font-mono text-xs mt-1 shrink-0 font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                          {m}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 2: Phases */}
                <div className="border-r border-white/5 px-8 pb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-px bg-red-600" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-500">Process</span>
                  </div>
                  <div className="space-y-0">
                    {active.phases.map((phase, i) => (
                      <div key={i} className="relative">
                        <div className={`flex gap-4 items-stretch ${i < active.phases.length - 1 ? "mb-0" : ""}`}>
                          {/* Step marker */}
                          <div className="flex flex-col items-center shrink-0 w-6">
                            <div className="w-3 h-3 rounded-full bg-red-600 shrink-0 mt-1 z-10" />
                            {i < active.phases.length - 1 && (
                              <div className="w-px flex-1 bg-red-600/20 mt-1" style={{ minHeight: "40px" }} />
                            )}
                          </div>
                          <div className="pb-7">
                            <p className="text-white font-sans font-black italic uppercase text-sm tracking-wide mb-1">
                              {phase.label}
                            </p>
                            <p className="text-gray-500 text-xs leading-relaxed">{phase.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Col 3: Achievements */}
                <div className="pl-8 pb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-px bg-red-600" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-red-500">Achievements</span>
                  </div>
                  <ul className="space-y-4">
                    {active.achievements.map((a, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span className="text-red-600 text-lg leading-none mt-0.5 shrink-0">◆</span>
                        <span className="text-gray-300 text-sm leading-relaxed">{a}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Nav arrows */}
                  <div className="flex gap-3 mt-12">
                    <button
                      onClick={() => {
                        const prev = journeyData[activeIdx - 1];
                        if (prev) setActiveYear(prev.year);
                      }}
                      disabled={activeIdx === 0}
                      className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/40 hover:border-red-600 hover:text-red-600 disabled:opacity-20 transition-all"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => {
                        const next = journeyData[activeIdx + 1];
                        if (next) setActiveYear(next.year);
                      }}
                      disabled={activeIdx === journeyData.length - 1}
                      className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/40 hover:border-red-600 hover:text-red-600 disabled:opacity-20 transition-all"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Red marquee strip */}
            <div className="bg-red-600 py-4 overflow-hidden -rotate-[0.5deg] w-[102%] -ml-[1%]">
              <div className="flex gap-12 whitespace-nowrap animate-marquee font-sans font-black italic uppercase text-white text-sm tracking-widest">
                {[...Array(6)].map((_, i) => (
                  <React.Fragment key={i}>
                    <span>{active.year}</span>
                    <span>•</span>
                    <span>{active.title}</span>
                    <span>•</span>
                    <span>MIST BLITZ</span>
                    <span>•</span>
                    <span>Formula Student</span>
                    <span>•</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── STATS STRIP ── */}
      <section className="bg-zinc-950 border-t border-white/5 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {[
              { value: "4", label: "Seasons", sub: "2021 – 2024" },
              { value: "3+", label: "Prototypes", sub: "Fully in-house" },
              { value: "50+", label: "Engineers", sub: "Peak team size" },
              { value: "FSC", label: "Competition", sub: "Formula Student China" },
            ].map((s, i) => (
              <div key={i} className={`px-10 py-10 ${i < 3 ? "border-r border-white/5" : ""}`}>
                <p className="text-5xl md:text-6xl font-sans font-black italic text-red-600 leading-none mb-2">
                  {s.value}
                </p>
                <p className="text-white font-sans font-black italic uppercase text-lg tracking-tight mb-1">
                  {s.label}
                </p>
                <p className="text-white/30 text-xs font-mono uppercase tracking-widest">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate linear;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OurJourneyPage;
