"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";

const furiosa = {
  id: "MB-F1.0",
  year: "2025",
  name: "Furiosa 1.0",
  tagline: "Bangladesh's first Formula Student car to complete international scrutineering and endurance laps.",
  specs: [
    { label: "Power Unit", value: "KTM 390 Duke — 373.3cc" },
    { label: "Weight", value: "290 kg (40:60 dist.)" },
    { label: "Max Output", value: "33.8 kW @ 8,500 rpm" },
    { label: "Peak Torque", value: "39 Nm @ 6,500 rpm" },
    { label: "Chassis", value: "Steel Spaceframe" },
    { label: "Suspension", value: "Double Wishbone Pushrod" },
    { label: "Steering", value: "Anti-Ackermann Geometry" },
    { label: "Braking", value: "4-Wheel Hydraulic Disc" },
    { label: "Tyres", value: "Apollo Amazer 4G Life R13" },
    { label: "Team Size", value: "31 Engineers" },
  ],
  highlights: [
    "First Bangladeshi Formula Student car to pass full technical scrutineering internationally",
    "Completed endurance laps at Formula Student China 2025, Zhuhai — among 76 international teams",
    "Fully in-house fabricated steel spaceframe chassis",
    "Anti-Ackermann steering geometry for optimized cornering",
    "KTM 390 Duke engine with custom intake and exhaust tuning",
    "Double wishbone pushrod suspension, front and rear",
  ],
};

const competitions = [
  {
    name: "Formula Student China 2025",
    location: "Zhuhai International Circuit, China",
    date: "August 2025",
    result: "Completed",
    awards: [
      "Best Foreign Team & Leading Convoy Award",
      "Best Presentation Performance",
      "4th Place — Business Plan Presentation",
    ],
    note: "First Bangladeshi team to pass full scrutineering and complete endurance laps among 76 international teams.",
    flag: "🇨🇳",
  },
  {
    name: "Formula Bharat 2025",
    location: "India",
    date: "2025",
    result: "Completed",
    awards: [
      "1st Place — Engineering Design CRM",
    ],
    note: "Recognized for outstanding engineering design and technical presentation.",
    flag: "🇮🇳",
  },
];

const fadeUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const OurCarsPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="bg-[#0a0a0a]">

        {/* Hero */}
        <section className="relative w-full h-[70vh] overflow-hidden flex flex-col justify-end">
          <Image src="/improve.jpg" fill alt="Our Cars" className="object-cover opacity-50 transition-all duration-700" priority />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/60 via-transparent to-transparent" />
          <div className="relative z-10 px-6 md:px-16 pb-12">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <h1 className="text-[12vw] md:text-[9vw] font-black italic uppercase leading-none tracking-tighter text-white">
                Our <span className="text-red-600">Cars</span>
              </h1>
              <p className="text-white/50 text-base md:text-lg mt-4 max-w-lg">
                Formula Student machines, built entirely in-house at MIST.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Car Feature */}
        <section className="bg-[#0a0a0a] py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp}>
              <p className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Season 2025</p>
              <h2 className="text-3xl md:text-6xl font-sans font-black italic uppercase text-white mb-12 leading-none">
                {furiosa.name}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-stretch">
              {/* Left: Car Image */}
              <motion.div {...fadeUp}
                className="relative rounded-sm overflow-hidden border border-white/10 min-h-96"
                style={{ backgroundImage: `url('/car2.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs text-red-500 uppercase tracking-widest font-bold font-mono">{furiosa.id}</span>
                  <h3 className="text-4xl font-sans font-black italic uppercase text-white mt-1">{furiosa.name}</h3>
                  <p className="text-white/50 text-sm mt-2 leading-relaxed max-w-sm">{furiosa.tagline}</p>
                </div>
                <div className="absolute top-4 right-4 bg-red-600 px-3 py-1">
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">{furiosa.year}</span>
                </div>
              </motion.div>

              {/* Right: Specs */}
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5 font-bold">Key Specifications</h4>
                <div className="divide-y divide-white/5 mb-10">
                  {furiosa.specs.map(({ label, value }) => (
                    <div key={label} className="flex items-center gap-4 py-3">
                      <span className="text-white/40 text-xs uppercase tracking-wider w-28 shrink-0 font-mono">{label}</span>
                      <span className="text-gray-200 text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-bold">Engineering Highlights</h4>
                <ul className="space-y-3">
                  {furiosa.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="text-red-600 mt-1 text-xs shrink-0">▶</span>
                      <span className="text-sm leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Competition Results */}
        <section className="bg-[#111111] border-y border-white/5 py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeUp}>
              <p className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Track Record</p>
              <h2 className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-12">
                Competition Results
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {competitions.map((comp, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                  className="border border-white/10 p-8 hover:border-red-600/30 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-1">{comp.date} · {comp.location}</p>
                      <h3 className="text-xl font-black italic uppercase text-white leading-tight">{comp.name}</h3>
                    </div>
                    <span className="text-3xl">{comp.flag}</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {comp.awards.map((award, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <span className="text-red-500 text-xs shrink-0">★</span>
                        <span className="text-white font-black italic uppercase text-sm">{award}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-white/40 text-xs leading-relaxed border-t border-white/5 pt-4">{comp.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default OurCarsPage;
