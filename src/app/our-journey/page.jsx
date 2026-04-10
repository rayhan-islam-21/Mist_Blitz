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
    milestones: [
      "Team formally founded",
      "Workshop established at MIST",
      "First CAD prototype complete",
      "Core crew of 12 engineers",
    ],
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
    milestones: [
      "Full chassis fabricated",
      "Electronics integrated",
      "30+ team members",
      "First driver trial runs",
    ],
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
    milestones: [
      "First international competition",
      "Design event recognition",
      "Strategic sponsors secured",
      "50+ member strong team",
    ],
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
    milestones: [
      "FURIOSA 1.0 launched",
      "Formula Student China entry",
      "Advanced DAQ system",
      "Best team result in history",
    ],
    stat1: { n: "39Nm", l: "Peak Torque" },
    stat2: { n: "290kg", l: "Car Weight" },
  },
];

export default function OurJourneyPage() {
  const [active, setActive] = useState(3);
  const cur = seasons[active];

  return (
    <div className="bg-[#080808] min-h-screen text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/china4.jpg" fill alt="hero" className="object-cover object-center scale-105" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/50" />
        </div>

        {/* Ghost watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 font-black italic text-[32vw] leading-none text-white/[0.03] select-none pointer-events-none uppercase tracking-tighter">
          OUR
        </div>

        <div className="relative z-10 px-8 md:px-20 pt-32 pb-24 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-[2px] bg-red-600" />
              <span className="font-mono text-red-500 text-xs uppercase tracking-[0.4em]">
                MIST Blitz · Formula Student
              </span>
            </div>

            <h1 className="font-black italic uppercase leading-none tracking-tighter text-white">
              <span className="block text-[16vw] md:text-[13vw] leading-none">Our</span>
              <span className="block text-[16vw] md:text-[13vw] leading-none text-red-600">Journey</span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl max-w-md font-light mt-6 leading-relaxed">
              Four seasons. One mission. Engineering Bangladesh&apos;s place on the global motorsport stage.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex gap-12 mt-16 border-t border-white/10 pt-10"
          >
            {[
              { n: "4", l: "Seasons" },
              { n: "3+", l: "Prototypes" },
              { n: "50+", l: "Engineers" },
              { n: "FSC", l: "China" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-3xl md:text-4xl font-black italic text-red-600 leading-none">{s.n}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 mt-1">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-10 right-12 flex flex-col items-center gap-2">
          <div className="w-px h-14 bg-gradient-to-b from-red-600 to-transparent" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">scroll</span>
        </div>
      </section>

      {/* ══ SEASON SELECTOR STRIP ══ */}
      <div className="sticky top-16 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex">
          {seasons.map((s, i) => (
            <button
              key={s.year}
              onClick={() => setActive(i)}
              className={`relative flex-1 flex flex-col items-center py-5 px-3 transition-all duration-300 group overflow-hidden ${
                active === i ? "bg-red-600/10" : "hover:bg-white/[0.02]"
              }`}
            >
              {active === i && (
                <motion.div layoutId="activePill" className="absolute top-0 left-0 w-full h-[3px] bg-red-600" />
              )}
              <span className={`font-mono text-[9px] uppercase tracking-[0.35em] mb-1 transition-colors ${active === i ? "text-red-500" : "text-white/20 group-hover:text-white/40"}`}>
                {s.round}
              </span>
              <span className={`font-black italic text-2xl md:text-3xl leading-none transition-colors ${active === i ? "text-white" : "text-white/20 group-hover:text-white/50"}`}>
                {s.year}
              </span>
              <span className={`font-mono text-[8px] uppercase tracking-wider mt-1 hidden md:block transition-colors ${active === i ? "text-white/50" : "text-white/10 group-hover:text-white/25"}`}>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Image hero */}
          <div className="relative h-[85vh] overflow-hidden">
            <Image src={cur.image} fill alt={cur.title} className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />

            {/* Ghost year */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 font-black italic text-[28vw] leading-none text-white/[0.04] select-none pointer-events-none">
              {cur.year}
            </div>

            <div className="absolute bottom-0 left-0 px-8 md:px-20 pb-16">
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                <span className="block font-mono text-red-500 text-xs uppercase tracking-[0.5em] mb-5">
                  {cur.round} / {cur.year}
                </span>
                <h2 className="text-5xl md:text-8xl font-black italic uppercase leading-none tracking-tighter text-white mb-3">
                  {cur.title}
                </h2>
                <p className="text-red-400 italic text-xl md:text-2xl font-black uppercase">
                  — {cur.tagline}
                </p>
              </motion.div>
            </div>

            <div className="absolute bottom-16 right-8 md:right-20 flex gap-10">
              {[cur.stat1, cur.stat2].map((s, i) => (
                <div key={i} className="text-right">
                  <p className="text-4xl md:text-5xl font-black italic text-white leading-none">{s.n}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/35 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Description + Milestones */}
          <div className="border-t-2 border-red-600/30 bg-[#080808]">
            <div className="max-w-7xl mx-auto px-8 md:px-20 py-20">
              <div className="grid md:grid-cols-2 gap-16 items-start">

                {/* Description side */}
                <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-[2px] bg-red-600" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">Season Overview</span>
                  </div>
                  <p className="text-2xl md:text-3xl text-white/80 leading-relaxed font-light">
                    {cur.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-10">
                    {["Design", "Analysis", "Manufacturing", "Testing"].map((phase, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 text-xs font-black uppercase tracking-widest border ${
                          i === 0
                            ? "bg-red-600 border-red-600 text-white"
                            : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70 transition-all"
                        }`}
                      >
                        {phase}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Milestones side */}
                <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-[2px] bg-red-600" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">Key Milestones</span>
                  </div>
                  <div className="space-y-0">
                    {cur.milestones.map((m, i) => (
                      <div key={i} className="flex items-center gap-5 py-5 border-b border-white/5 group cursor-default">
                        <span className="font-mono text-red-600 text-sm font-bold shrink-0 w-7">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="w-0 group-hover:w-5 h-px bg-red-600 transition-all duration-300 shrink-0" />
                        <span className="text-white/60 group-hover:text-white transition-colors text-sm uppercase tracking-wider font-bold">
                          {m}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Season nav */}
          <div className="border-t border-white/5 bg-[#080808]">
            <div className="max-w-7xl mx-auto px-8 md:px-20 py-12 flex items-center justify-between">
              <button
                onClick={() => setActive((p) => Math.max(0, p - 1))}
                disabled={active === 0}
                className="flex items-center gap-3 text-white/30 hover:text-white disabled:opacity-20 transition-colors group"
              >
                <span className="w-10 h-10 border border-white/20 group-hover:border-red-600 flex items-center justify-center transition-colors font-mono">←</span>
                <span className="font-mono text-xs uppercase tracking-wider hidden md:block">
                  {active > 0 ? seasons[active - 1].year : ""}
                </span>
              </button>

              <div className="flex gap-2">
                {seasons.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className={`transition-all duration-300 ${active === i ? "w-8 h-1 bg-red-600" : "w-2 h-1 bg-white/20 hover:bg-white/40"}`}
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
                <span className="w-10 h-10 border border-white/20 group-hover:border-red-600 flex items-center justify-center transition-colors font-mono">→</span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ══ TIMELINE ══ */}
      <section className="border-t border-white/5 bg-[#050505] py-24 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-8 h-[2px] bg-red-600" />
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/30">Full Timeline</span>
          </div>

          <div className="relative">
            <div className="absolute left-[7rem] top-0 bottom-0 w-px bg-white/5" />
            <div className="space-y-0">
              {seasons.map((s, i) => (
                <motion.div
                  key={s.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => {
                    setActive(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`relative flex gap-8 items-start py-10 border-b border-white/5 group cursor-pointer transition-all duration-300 ${
                    active === i ? "opacity-100" : "opacity-35 hover:opacity-70"
                  }`}
                >
                  <div className="shrink-0 w-24 text-right">
                    <span className={`font-black italic text-3xl leading-none transition-colors ${active === i ? "text-red-600" : "text-white/30"}`}>
                      {s.year}
                    </span>
                  </div>
                  <div className="relative shrink-0 mt-2 ml-4">
                    <div className={`w-3 h-3 border-2 transition-all duration-300 ${active === i ? "border-red-600 bg-red-600" : "border-white/30 bg-transparent group-hover:border-white/60"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-4 mb-1">
                      <h3 className="text-xl font-black italic uppercase tracking-tight text-white">{s.title}</h3>
                      <span className="font-mono text-[9px] text-white/25 uppercase tracking-widest">{s.round}</span>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">{s.tagline}</p>
                    {active === i && (
                      <div className="flex gap-6 mt-4">
                        {[s.stat1, s.stat2].map((st, j) => (
                          <div key={j}>
                            <p className="text-lg font-black italic text-red-600">{st.n}</p>
                            <p className="font-mono text-[8px] uppercase tracking-widest text-white/25">{st.l}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ SEASON 2025 CTA ══ */}
      <section className="border-t border-white/5 bg-[#080808] py-24 px-8 md:px-20 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[20vw] font-black italic uppercase text-white/[0.02] tracking-tighter">BLITZ</span>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <span className="font-mono text-red-500 text-xs uppercase tracking-[0.4em] block mb-4">The road ahead</span>
            <h2 className="text-5xl md:text-8xl font-black italic uppercase leading-none tracking-tighter text-white">
              Season <br /><span className="text-red-600">2025</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              The next chapter is being written. More power, more precision, and a stronger team pushing the limits of what&apos;s possible.
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">Coming soon</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
