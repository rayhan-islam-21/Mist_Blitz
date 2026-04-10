"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const seasons = [
  {
    id: "S01",
    year: "2021",
    title: "The Beginning",
    tagline: "From blueprint to reality",
    description:
      "MIST Blitz was founded with a single goal — to put Bangladesh on the global Formula Student map. A small group of driven engineers laid the groundwork, established the workshop, and started designing from scratch.",
    image: "/team.jpg",
    stat1: { n: "12", l: "Founders" },
    stat2: { n: "0→1", l: "Cars Built" },
    stat3: { n: "2021", l: "Founded" },
    milestones: ["Team formally founded", "Workshop established at MIST", "First CAD prototype complete", "Core crew of 12 engineers"],
    color: "from-white/5",
  },
  {
    id: "S02",
    year: "2022",
    title: "First Machine",
    tagline: "Steel welded. Engine fired",
    description:
      "The team completed its first full race car — designed, manufactured, and tested entirely in-house. Every weld, every wire, every component built by students pushing past midnight to meet their own deadline.",
    image: "/car2.jpg",
    stat1: { n: "30+", l: "Team Size" },
    stat2: { n: "1st", l: "Car Built" },
    stat3: { n: "2022", l: "Season" },
    milestones: ["Full chassis fabricated", "Electronics integrated", "30+ team members", "First driver trial runs"],
    color: "from-red-600/10",
  },
  {
    id: "S03",
    year: "2023",
    title: "World Stage",
    tagline: "Bangladesh on the global stage",
    description:
      "MIST Blitz entered its first international Formula Student competition. Competing against teams from across the globe, the team earned recognition in design events and returned with invaluable experience.",
    image: "/china4.jpg",
    stat1: { n: "50+", l: "Team Size" },
    stat2: { n: "FSC", l: "Competed" },
    stat3: { n: "2023", l: "Season" },
    milestones: ["First international competition", "Design event recognition", "Strategic sponsors secured", "50+ member strong team"],
    color: "from-red-900/10",
  },
  {
    id: "S04",
    year: "2024",
    title: "Furiosa 1.0",
    tagline: "Our fastest machine yet",
    description:
      "A ground-up redesign produced FURIOSA 1.0 — the most technically advanced car the team has ever built. KTM 390 Duke power, steel spaceframe chassis, double wishbone suspension, and a full data acquisition system.",
    image: "/car2.jpg",
    stat1: { n: "39Nm", l: "Peak Torque" },
    stat2: { n: "290kg", l: "Car Weight" },
    stat3: { n: "33.8kW", l: "Peak Power" },
    milestones: ["FURIOSA 1.0 launched", "Formula Student China entry", "Advanced DAQ system", "Best result in history"],
    color: "from-red-600/15",
  },
];

export default function OurJourneyPage() {
  const [active, setActive] = useState(3);
  const cur = seasons[active];

  return (
    <div className="bg-black min-h-screen text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden bg-black">
        {/* Full background image */}
        <div className="absolute inset-0">
          <Image src="/china4.jpg" fill alt="hero" className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>

        {/* Racing stripes top accent */}
        <div className="absolute top-0 left-0 right-0 flex h-1.5">
          <div className="flex-1 bg-red-600" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-red-600" />
        </div>

        <div className="relative z-10 px-6 md:px-16 pb-16 pt-36">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-px bg-red-600" />
            <span className="text-red-500 font-mono text-xs uppercase tracking-[0.4em]">MIST Blitz · Formula Student</span>
          </motion.div>

          {/* Giant heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="font-black italic uppercase leading-none tracking-tighter">
              <span className="block text-[18vw] md:text-[14vw] text-white leading-[0.85]">Four</span>
              <span className="block text-[18vw] md:text-[14vw] text-red-600 leading-[0.85]">Seasons.</span>
            </h1>
          </motion.div>

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-10 pt-8 border-t border-white/10"
          >
            <p className="text-white/50 text-lg max-w-md leading-relaxed font-light">
              One mission. Engineering Bangladesh&apos;s place on the global motorsport stage — season by season.
            </p>
            <div className="flex gap-10 shrink-0">
              {[{ n: "4", l: "Seasons" }, { n: "3+", l: "Prototypes" }, { n: "50+", l: "Engineers" }, { n: "FSC", l: "Competition" }].map(s => (
                <div key={s.l} className="text-center">
                  <p className="text-2xl md:text-3xl font-black italic text-white leading-none">{s.n}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/25 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ SEASON SELECTOR — Bold cards ══ */}
      <section className="bg-black border-y border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {seasons.map((s, i) => (
            <button
              key={s.year}
              onClick={() => setActive(i)}
              className={`relative group text-left overflow-hidden transition-all duration-300 ${
                active === i ? "bg-red-600" : "bg-black hover:bg-zinc-900"
              }`}
            >
              {/* Noise texture */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
              />
              <div className="px-6 md:px-8 py-8 md:py-10 relative z-10">
                <p className={`font-mono text-[9px] uppercase tracking-[0.4em] mb-3 ${active === i ? "text-white/60" : "text-white/20"}`}>
                  {s.id}
                </p>
                <p className={`font-black italic text-5xl md:text-6xl leading-none mb-3 ${active === i ? "text-white" : "text-white/20 group-hover:text-white/50"} transition-colors`}>
                  {s.year}
                </p>
                <p className={`font-black uppercase text-xs tracking-wider ${active === i ? "text-white/80" : "text-white/15 group-hover:text-white/35"} transition-colors`}>
                  {s.title}
                </p>
              </div>
              {/* Bottom border indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${active === i ? "bg-white/30" : "bg-transparent"} transition-all`} />
            </button>
          ))}
        </div>
      </section>

      {/* ══ SEASON DETAIL ══ */}
      <AnimatePresence mode="wait">
        <motion.section
          key={cur.year}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-black"
        >
          {/* Top — image + title block */}
          <div className="grid md:grid-cols-2 min-h-[75vh]">
            {/* Left: Info */}
            <div className="flex flex-col justify-between px-8 md:px-16 py-16 border-r border-white/5">
              <div>
                {/* Season badge */}
                <div className="inline-flex items-center gap-3 mb-10">
                  <span className="bg-red-600 text-white font-mono text-[10px] uppercase tracking-widest px-3 py-1">
                    {cur.id}
                  </span>
                  <span className="text-white/30 font-mono text-[10px] uppercase tracking-widest">{cur.year}</span>
                </div>

                {/* Title */}
                <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter text-white mb-4">
                  {cur.title}
                </h2>
                <p className="text-red-500 font-mono text-sm uppercase tracking-widest mb-10">
                  — {cur.tagline}
                </p>

                {/* Description */}
                <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                  {cur.description}
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-0 mt-12 border border-white/10">
                {[cur.stat1, cur.stat2, cur.stat3].map((s, i) => (
                  <div key={i} className={`px-5 py-5 ${i < 2 ? "border-r border-white/10" : ""}`}>
                    <p className="text-2xl md:text-3xl font-black italic text-white leading-none">{s.n}</p>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/25 mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative min-h-[50vh] md:min-h-0 overflow-hidden">
              <Image src={cur.image} fill alt={cur.title} className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

              {/* Year ghost */}
              <div className="absolute bottom-0 right-0 font-black italic text-[22vw] md:text-[12vw] leading-none text-white/[0.07] select-none pointer-events-none tracking-tighter pr-4 pb-0">
                {cur.year}
              </div>
            </div>
          </div>

          {/* Bottom — milestones + phases */}
          <div className="border-t border-white/5 bg-zinc-950">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Milestones */}
              <div className="px-8 md:px-16 py-14 border-r border-white/5">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-5 h-[2px] bg-red-600" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">Key Milestones</span>
                </div>
                <div>
                  {cur.milestones.map((m, i) => (
                    <div key={i} className="flex items-start gap-5 py-5 border-b border-white/[0.06] group">
                      <span className="text-red-600 font-mono text-xs font-bold shrink-0 mt-0.5 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/55 group-hover:text-white text-sm uppercase tracking-wider font-bold transition-colors leading-snug">
                        {m}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phases */}
              <div className="px-8 md:px-16 py-14">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-5 h-[2px] bg-red-600" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">Season Process</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {["Design", "Analysis", "Manufacturing", "Testing"].map((phase, i) => (
                    <div key={i} className={`relative p-6 border overflow-hidden ${i === 0 ? "bg-red-600 border-red-600" : "border-white/10 hover:border-white/25 transition-colors"}`}>
                      <span className="absolute top-3 right-4 font-black text-3xl text-white/[0.07] leading-none select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/40 mb-2">Phase {i + 1}</p>
                      <p className="font-black italic uppercase text-lg text-white leading-none">{phase}</p>
                    </div>
                  ))}
                </div>

                {/* Season nav */}
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/5">
                  <button
                    onClick={() => setActive(p => Math.max(0, p - 1))}
                    disabled={active === 0}
                    className="flex items-center gap-2 text-white/30 hover:text-white disabled:opacity-20 transition-colors group text-sm font-mono uppercase tracking-wider"
                  >
                    <span className="w-8 h-8 border border-white/20 group-hover:border-red-600 flex items-center justify-center transition-colors text-xs">←</span>
                    {active > 0 ? seasons[active - 1].year : ""}
                  </button>
                  <div className="flex gap-2">
                    {seasons.map((_, i) => (
                      <button key={i} onClick={() => setActive(i)}
                        className={`transition-all duration-300 ${active === i ? "w-6 h-1 bg-red-600" : "w-2 h-1 bg-white/20 hover:bg-white/40"}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setActive(p => Math.min(seasons.length - 1, p + 1))}
                    disabled={active === seasons.length - 1}
                    className="flex items-center gap-2 text-white/30 hover:text-white disabled:opacity-20 transition-colors group text-sm font-mono uppercase tracking-wider"
                  >
                    {active < seasons.length - 1 ? seasons[active + 1].year : ""}
                    <span className="w-8 h-8 border border-white/20 group-hover:border-red-600 flex items-center justify-center transition-colors text-xs">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* ══ MARQUEE RACE STRIP ══ */}
      <div className="py-5 bg-red-600 overflow-hidden border-y-4 border-black -rotate-[0.5deg] w-[104%] -ml-[2%]">
        <div className="flex whitespace-nowrap gap-12 animate-marquee font-black italic uppercase text-xl text-white select-none">
          {[...Array(3)].flatMap(() => [
            "FSC CHINA 2024", "•", "MIST BLITZ", "•",
            "KTM 390 DUKE", "•", "290kg RACE CAR", "•",
            "39Nm TORQUE", "•", "STEEL SPACEFRAME", "•",
            "DOUBLE WISHBONE", "•", "FURIOSA 1.0", "•",
          ]).map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ══ FULL SEASON OVERVIEW ══ */}
      <section className="bg-black py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px bg-red-600" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">All Seasons</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter">
                Race <span className="text-red-600">History</span>
              </h2>
            </div>
          </div>

          {/* Alternating season blocks */}
          <div className="space-y-0">
            {seasons.map((s, i) => (
              <motion.div
                key={s.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => {
                  setActive(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`group relative flex flex-col md:flex-row items-stretch border border-white/[0.06] cursor-pointer transition-all duration-300 overflow-hidden ${
                  active === i ? "border-red-600/40 bg-red-600/5" : "hover:border-white/15 hover:bg-white/[0.02]"
                }`}
              >
                {/* Year block */}
                <div className={`shrink-0 flex items-center justify-center px-8 py-8 md:py-0 md:w-36 ${active === i ? "bg-red-600" : "bg-zinc-950 group-hover:bg-zinc-900"} transition-colors`}>
                  <span className="font-black italic text-4xl text-white leading-none">{s.year}</span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-4 px-8 py-7 border-l border-white/5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-red-500">{s.id}</span>
                    </div>
                    <h3 className="text-xl font-black italic uppercase tracking-tight text-white">{s.title}</h3>
                    <p className="text-white/35 text-sm mt-1 group-hover:text-white/55 transition-colors">{s.tagline}</p>
                  </div>

                  {/* Key stats */}
                  <div className="flex gap-8 shrink-0">
                    {[s.stat1, s.stat2].map((st, j) => (
                      <div key={j} className="text-right">
                        <p className="text-xl font-black italic text-white leading-none">{st.n}</p>
                        <p className="font-mono text-[8px] uppercase tracking-widest text-white/25 mt-0.5">{st.l}</p>
                      </div>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className={`shrink-0 w-8 h-8 border flex items-center justify-center font-mono text-xs transition-all ${
                    active === i ? "border-red-600 text-red-600" : "border-white/15 text-white/20 group-hover:border-white/40 group-hover:text-white/60"
                  }`}>
                    ↑
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2025 TEASER ══ */}
      <section className="relative bg-zinc-950 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-end">
            <div>
              <span className="font-mono text-red-500 text-xs uppercase tracking-[0.4em] block mb-6">The road ahead</span>
              <h2 className="text-6xl md:text-9xl font-black italic uppercase leading-none tracking-tighter">
                2025
              </h2>
              <p className="text-white/30 text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter mt-1">
                Season 05
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-white/45 text-base leading-relaxed max-w-sm">
                The next chapter is being engineered. More power, more precision, and a stronger team pushing the limits of what&apos;s possible.
              </p>
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-red-600/50 to-transparent" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">Coming soon</span>
              </div>
              {/* Progress dots */}
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`h-1 flex-1 ${i < 4 ? "bg-red-600" : "bg-white/10"}`} />
                ))}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">4 of 5 seasons complete</p>
            </div>
          </div>
        </div>

        {/* Racing stripes bottom */}
        <div className="flex h-1.5">
          <div className="flex-1 bg-red-600" />
          <div className="flex-1 bg-white/20" />
          <div className="flex-1 bg-red-600" />
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
