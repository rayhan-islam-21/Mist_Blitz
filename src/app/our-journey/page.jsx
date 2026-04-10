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
  const [active, setActive] = useState(seasons.length - 1);

  const cur = seasons[active];
  const progress = ((active + 1) / seasons.length) * 100;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07090f] text-white selection:bg-red-600 selection:text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-8 h-80 w-80 rounded-full bg-red-600/25 blur-3xl" />
        <div className="absolute right-10 top-1/3 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.75), transparent 70%)",
          }}
        />
      </div>

      <Navbar />

      <section className="relative mx-auto w-full max-w-7xl px-6 pb-12 pt-32 md:px-10 md:pt-40">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-black/35 p-6 backdrop-blur-sm md:p-10">
          <div className="absolute inset-0">
            <Image src={cur.image} fill alt={cur.title} className="object-cover object-center opacity-35" priority />
            <div className="absolute inset-0 bg-linear-to-r from-[#05060a] via-[#080b12]/85 to-[#080b12]/70" />
          </div>

          <div className="relative z-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/25 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-white/75">OUR JOURNEY</span>
            </div>
            <h1 className="text-[12vw] font-black uppercase leading-[0.88] tracking-[-0.04em] text-white md:text-[7vw]">
              Built Through
            </h1>
            <h1 className="mb-4 text-[12vw] font-black uppercase leading-[0.88] tracking-[-0.04em] text-red-500 md:text-[7vw]">
              Every Season
            </h1>
            <p className="max-w-xl text-base text-white/75 md:text-lg">
              This is our race-development timeline from first concept to international competition. Select a season to explore the milestones and technical progress.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="grid grid-cols-2 gap-3 md:min-w-85"
          >
            {[cur.stat1, cur.stat2].map((s, i) => (
              <div key={i} className="rounded-2xl border border-white/20 bg-black/45 p-4 backdrop-blur-sm">
                <p className="text-3xl font-black leading-none text-red-500">{s.n}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/55">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-3xl border border-white/10 bg-[#0a0d16]/85 p-5 backdrop-blur-sm">
              <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-white/60">Season selector</p>
              <div className="relative">
                <div className="absolute left-2.75 top-2 h-[calc(100%-10px)] w-px bg-white/15" />
                {seasons.map((s, i) => (
                  <button
                    key={s.year}
                    onClick={() => setActive(i)}
                    className="group relative mb-4 flex w-full items-center gap-3 text-left"
                  >
                    <span
                      className={`relative z-10 h-5 w-5 rounded-full border-2 transition ${
                        active === i
                          ? "border-red-500 bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,0.2)]"
                          : "border-white/35 bg-[#0a0d16] group-hover:border-white"
                      }`}
                    />
                    <span className="flex-1 rounded-xl border border-white/10 bg-white/2 px-3 py-2 transition group-hover:border-white/20">
                      <span className={`block text-xl font-black leading-none ${active === i ? "text-white" : "text-white/65"}`}>
                        {s.year}
                      </span>
                      <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-white/50">{s.title}</span>
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-3">
                <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <motion.div
                    className="h-2 rounded-full bg-red-500"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35 }}
                  />
                </div>
              </div>
            </div>
          </aside>

          <AnimatePresence mode="wait">
            <motion.div
              key={cur.year}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-7"
            >
              <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0d16]/85 backdrop-blur-sm">
                <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
                  <div className="p-6 md:p-8">
                    <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-red-400">
                      {cur.round} / {cur.year}
                    </p>
                    <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-white md:text-6xl">
                      {cur.title}
                    </h2>
                    <p className="mt-3 text-lg uppercase tracking-widest text-red-300">{cur.tagline}</p>
                    <p className="mt-6 text-white/75">{cur.description}</p>

                    <div className="mt-7 grid grid-cols-2 gap-3">
                      {[cur.stat1, cur.stat2].map((s, i) => (
                        <div key={i} className="rounded-xl border border-white/15 bg-black/35 p-4">
                          <p className="text-3xl font-black leading-none text-red-500">{s.n}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/55">{s.l}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative min-h-75 md:min-h-full">
                    <Image src={cur.image} fill alt={cur.title} className="object-cover object-center" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 right-4 rounded-lg border border-white/15 bg-black/45 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-white/70 backdrop-blur">
                      Season {active + 1}
                    </div>
                  </div>
                </div>
              </article>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-[#0a0d16]/85 p-6 backdrop-blur-sm">
                  <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-white/60">Key Milestones</p>
                  <div className="space-y-3">
                    {cur.milestones.map((m, i) => (
                      <div key={m} className="rounded-xl border border-white/10 bg-white/2 px-4 py-3">
                        <p className="text-[10px] uppercase tracking-[0.23em] text-red-400">M{i + 1}</p>
                        <p className="mt-1 text-sm uppercase tracking-[0.08em] text-white/80">{m}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#0a0d16]/85 p-6 backdrop-blur-sm">
                  <p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-white/60">Engineering Flow</p>
                  <div className="space-y-3">
                    {cur.phases.map((phase, i) => (
                      <div key={phase} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/3 px-4 py-3">
                        <span
                          className="absolute inset-y-0 left-0 bg-red-600/85 transition-all"
                          style={{ width: `${30 + i * 18}%` }}
                        />
                        <div className="relative flex items-center justify-between">
                          <p className="text-sm uppercase tracking-[0.11em] text-white">{phase}</p>
                          <span className="text-[10px] uppercase tracking-[0.15em] text-white/70">0{i + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-red-500/35 bg-red-500/10 p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-red-300">Season Snapshot</p>
                    <p className="mt-1 text-sm text-white/80">
                      {cur.year} marked a clear improvement in team capability, technical depth, and race-readiness.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <button
                  onClick={() => setActive((p) => Math.max(0, p - 1))}
                  disabled={active === 0}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-red-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Prev Season
                </button>

                <div className="flex items-center gap-2">
                  {seasons.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Go to season ${seasons[i].year}`}
                      className={`h-2 rounded-full transition-all ${
                        active === i ? "w-8 bg-red-500" : "w-2 bg-white/35 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActive((p) => Math.min(seasons.length - 1, p + 1))}
                  disabled={active === seasons.length - 1}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-red-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Next Season
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

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
