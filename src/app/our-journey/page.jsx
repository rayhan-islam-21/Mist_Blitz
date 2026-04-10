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
  const [active, setActive] = useState(3);

  const cur = seasons[active];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#080b12] text-white selection:bg-red-600 selection:text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-red-600/20 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage:
              "radial-gradient(circle at center, rgba(0,0,0,0.55), transparent 72%)",
          }}
        />
      </div>

      <Navbar />

      <section className="relative mx-auto flex min-h-[92vh] w-full max-w-7xl items-end px-6 pb-16 pt-36 md:px-10">
        <div className="absolute inset-x-6 top-28 h-[65vh] overflow-hidden rounded-[2.5rem] border border-white/10 md:inset-x-10">
          <Image src={cur.image} fill alt={cur.title} className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070910]/95 via-[#070910]/65 to-[#070910]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070910] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 grid w-full items-end gap-8 lg:grid-cols-[1fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              <span className="text-[11px] uppercase tracking-[0.26em] text-white/70">MIST Blitz Timeline</span>
            </div>
            <h1 className="mb-3 text-[13vw] font-black uppercase leading-[0.9] tracking-[-0.04em] text-white md:text-[8vw]">
              Journey
            </h1>
            <p className="max-w-xl text-base text-white/75 md:text-lg">
              Four seasons of relentless building, testing, and racing. Explore how the team evolved from a small workshop group into an international Formula Student competitor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="grid grid-cols-2 gap-3 md:min-w-[320px]"
          >
            {[cur.stat1, cur.stat2].map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/15 bg-black/35 p-4 backdrop-blur-sm">
                <p className="text-3xl font-black leading-none text-red-500">{s.n}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/55">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="sticky top-16 z-40 border-y border-white/10 bg-[#06080f]/85 backdrop-blur-xl">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 md:grid-cols-4">
          {seasons.map((s, i) => (
            <button
              key={s.year}
              onClick={() => setActive(i)}
              className={`group relative flex flex-col items-center overflow-hidden px-3 py-5 transition-all duration-300 ${
                active === i ? "bg-red-600/15" : "hover:bg-white/[0.04]"
              }`}
            >
              {active === i && (
                <motion.div layoutId="seasonActive" className="absolute inset-0 border-b-2 border-red-500" />
              )}
              <span
                className={`mb-1 text-[10px] uppercase tracking-[0.25em] ${
                  active === i ? "text-red-400" : "text-white/35"
                }`}
              >
                {s.round}
              </span>
              <span
                className={`text-2xl font-black leading-none ${
                  active === i ? "text-white" : "text-white/45 group-hover:text-white"
                }`}
              >
                {s.year}
              </span>
              <span
                className={`mt-1 hidden text-[10px] uppercase tracking-[0.18em] md:block ${
                  active === i ? "text-white/70" : "text-white/20"
                }`}
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cur.year}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="mx-auto w-full max-w-7xl px-6 py-14 md:px-10"
        >
          <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
              <div>
                <span className="mb-4 block text-[11px] uppercase tracking-[0.34em] text-red-400">
                  Season Focus
                </span>
                <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white md:text-6xl">
                  {cur.title}
                </h2>
                <p className="mt-3 text-lg uppercase tracking-[0.11em] text-red-300">{cur.tagline}</p>
                <p className="mt-6 max-w-2xl text-white/75">{cur.description}</p>
              </div>

              <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-white/10">
                <Image src={cur.image} fill alt={cur.title} className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-black/35 px-4 py-3 backdrop-blur">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-white/60">
                    {cur.round} / {cur.year}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-[#0b0f1a]/80 p-6 md:p-8">
              <div className="mb-8 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-white/65">Milestones</span>
              </div>

              <div className="space-y-5">
                {cur.milestones.map((m, i) => (
                  <div key={i} className="grid grid-cols-[22px_1fr] gap-4">
                    <div className="relative">
                      <span className="text-[10px] font-bold text-red-400">{String(i + 1).padStart(2, "0")}</span>
                      {i < cur.milestones.length - 1 && <div className="absolute left-[6px] top-5 h-8 w-px bg-white/20" />}
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm uppercase tracking-[0.08em] text-white/80">
                      {m}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-[#0b0f1a]/80 p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-white/65">Build Pipeline</span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-red-400">4 stages</span>
                </div>
                <div className="space-y-3">
                  {cur.phases.map((phase, i) => (
                    <div key={phase} className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <div
                        className="absolute inset-y-0 left-0 bg-red-600/90"
                        style={{ width: `${35 + i * 17}%` }}
                      />
                      <div className="relative flex items-center justify-between">
                        <p className="text-sm uppercase tracking-[0.11em] text-white">{phase}</p>
                        <span className="text-[10px] text-white/75">0{i + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-red-600/25 to-[#171b29] p-6 md:p-8">
                <span className="text-[11px] uppercase tracking-[0.24em] text-white/75">Season snapshot</span>
                <p className="mt-3 text-sm text-white/85">
                  {cur.year} was a key step in MIST Blitz growth, with stronger engineering workflow, broader team capability, and improved competitive confidence.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 md:px-6">
            <button
              onClick={() => setActive((p) => Math.max(0, p - 1))}
              disabled={active === 0}
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm uppercase tracking-[0.13em] text-white/70 transition hover:border-red-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              Prev
              <span className="text-red-400">{active > 0 ? seasons[active - 1].year : "-"}</span>
            </button>

            <div className="flex items-center gap-2">
              {seasons.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to season ${seasons[i].year}`}
                  className={`h-2 rounded-full transition-all ${
                    active === i ? "w-9 bg-red-500" : "w-2 bg-white/35 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActive((p) => Math.min(seasons.length - 1, p + 1))}
              disabled={active === seasons.length - 1}
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm uppercase tracking-[0.13em] text-white/70 transition hover:border-red-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span className="text-red-400">{active < seasons.length - 1 ? seasons[active + 1].year : "-"}</span>
              Next
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="border-t border-white/10 bg-[#06080f]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-x divide-y divide-white/10 md:grid-cols-4 md:divide-y-0">
          {[
            { n: "4", l: "Seasons", s: "2021 – 2024" },
            { n: "3+", l: "Prototypes", s: "100% in-house" },
            { n: "50+", l: "Engineers", s: "Peak team size" },
            { n: "FSC", l: "China", s: "International competition" },
          ].map((s, i) => (
            <div key={i} className="px-6 py-10 md:px-10">
              <p className="mb-2 text-5xl font-black leading-none text-red-500">{s.n}</p>
              <p className="mb-1 text-lg font-black uppercase tracking-[0.06em] text-white">{s.l}</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">{s.s}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
