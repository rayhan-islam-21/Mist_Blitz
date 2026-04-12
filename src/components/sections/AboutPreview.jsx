"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const carSpecs = [
  { label: "Power Unit", value: "KTM 390 Duke — 373.3cc" },
  { label: "Weight", value: "290 kg (40:60 dist.)" },
  { label: "Max Output", value: "33.8 kW @ 8,500 rpm" },
  { label: "Peak Torque", value: "39 Nm @ 6,500 rpm" },
  { label: "Chassis", value: "Steel Spaceframe" },
  { label: "Suspension", value: "Double Wishbone Pushrod" },
  { label: "Tyres", value: "Apollo Amazer 4G Life R13" },
];

const stats = [
  { value: "50+", label: "Engineers" },
  { value: "01", label: "Car Built" },
  { value: "76", label: "Teams Competed" },
  { value: "2025", label: "Debut Season" },
];

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const AboutPreview = () => {
  const [activeSpec, setActiveSpec] = useState(0);

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-red-600 selection:text-white overflow-hidden relative">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* ── SECTION 1: WHO WE ARE ── */}
      <section className="relative pt-24 pb-0 px-4 md:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: text */}
            <div>
              {/* Small label heading instead of giant text */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4"
              >
                Military Institute of Science &amp; Technology · Bangladesh
              </motion.p>

              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl font-black italic uppercase leading-tight tracking-tight mb-6 text-white"
              >
                Bangladesh&apos;s first Formula Student team to compete{" "}
                <span className="text-red-600">internationally.</span>
              </motion.h2>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 text-white/50 text-sm leading-relaxed max-w-md mb-10"
              >
                <p>
                  MIST BLITZ is the official Formula Student team of the Military
                  Institute of Science and Technology — designing, manufacturing,
                  and validating a single-seat open-wheel race car under
                  international Formula Student regulations.
                </p>
                <p>
                  In 2025, we became the first Bangladeshi team to pass full
                  technical scrutineering and complete endurance laps at Formula
                  Student China, among 76 international teams.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white/30 hover:text-red-500 transition-colors group"
                >
                  <span>Full Story</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            </div>

            {/* Right: image */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="relative overflow-hidden aspect-4/3 border border-white/10">
                <Image
                  src="/china4.jpg"
                  alt="MIST BLITZ at Formula Student China"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-1">
                      Formula Student China 2025
                    </p>
                    <p className="font-black italic uppercase text-white text-sm">
                      Zhuhai International Circuit
                    </p>
                  </div>
                  <div className="bg-red-600 px-3 py-1.5">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-white font-black">
                      FSC 2025
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-4"
          >
            {stats.map((s, i) => (
              <div key={i} className="py-8 px-6 border-r border-white/5 last:border-r-0">
                <p className="font-black italic text-3xl md:text-4xl text-white leading-none">{s.value}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mt-2">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: ORIGIN + PHILOSOPHY ── */}
      <section className="py-24 px-4 md:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-7xl font-black italic uppercase leading-none tracking-tighter mb-10"
            >
              OUR <span className="text-red-600">ORIGIN</span>
            </motion.h2>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid md:grid-cols-2 gap-10 text-white/50 text-sm leading-relaxed"
            >
              <p>
                Founded in 2024, MIST BLITZ was established to bridge the gap
                between academic theory and real-world motorsport engineering —
                giving MIST students hands-on experience in vehicle design,
                manufacturing, testing, and validation.
              </p>
              <p>
                Our debut at Formula Student China pushed the team to build a
                competition-ready car from scratch, mastering chassis design,
                vehicle dynamics, powertrain optimization, and systems
                integration to meet international competition standards.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THE MACHINE ── */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Heading above car */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-red-500 mb-2">Season 2025 · MB-F1.0</p>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter text-white">
                The <span className="text-red-600">Machine</span>
              </h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm md:text-right">
              Furiosa 1.0 — Bangladesh&apos;s first Formula Student car to pass
              full international scrutineering and complete endurance laps.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-12 border border-white/10 overflow-hidden"
          >
            {/* Car image */}
            <div
              className="lg:col-span-8 relative min-h-104 overflow-hidden"
              style={{
                backgroundImage: `url('/car2.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50 hover:bg-black/20 transition-all duration-[2s]" />
              <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                  MB-F1.0
                </span>
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white mb-2">
                  FURIOSA 1.0
                </h3>
                <p className="font-mono text-xs text-white/30 uppercase tracking-widest">
                  KTM 390 Duke · 33.8 kW · 290 kg
                </p>
              </div>
            </div>

            {/* Specs panel */}
            <div className="lg:col-span-4 flex flex-col border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="bg-red-600 px-6 py-4">
                <p className="text-white font-black uppercase text-[10px] tracking-widest">
                  Key Specifications
                </p>
              </div>
              {carSpecs.map((spec, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSpec(i)}
                  className={`relative w-full text-left px-6 py-4 border-b border-white/5 transition-all duration-300 ${
                    activeSpec === i ? "bg-red-600/10" : "hover:bg-white/3"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-0.5 bg-red-600 transition-opacity duration-300 ${
                      activeSpec === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <p className="text-[9px] uppercase tracking-widest text-white/30 font-mono mb-1">
                    {spec.label}
                  </p>
                  <p
                    className={`font-black uppercase text-sm transition-colors ${
                      activeSpec === i ? "text-white" : "text-white/60"
                    }`}
                  >
                    {spec.value}
                  </p>
                </button>
              ))}
              <div className="mt-auto p-6 border-t border-white/5">
                <Link
                  href="/our-cars"
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/30 hover:text-red-500 transition-colors group"
                >
                  <span>Full Specs</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="py-6 bg-red-600 -rotate-[0.95] w-[115%] -ml-[7.5%] border-y border-black/20 overflow-hidden">
        <div className="flex whitespace-nowrap gap-12 animate-marquee font-black italic uppercase text-xl text-white select-none">
          {[
            "FSC China 2025", "•", "Best Foreign Team", "•", "MIST BLITZ // DHAKA",
            "•", "Weight: 290kg", "•", "KTM 390 DUKE", "•", "373.3cc Engine",
            "•", "Peak Torque: 39Nm @ 6500rpm", "•", "Output: 33.8kW @ 8500rpm",
            "•", "Steel Spaceframe", "•", "Furiosa 1.0", "•",
            "FSC China 2025", "•", "Best Foreign Team", "•", "MIST BLITZ // DHAKA",
            "•", "Weight: 290kg", "•", "KTM 390 DUKE", "•", "373.3cc Engine",
            "•", "Peak Torque: 39Nm @ 6500rpm", "•", "Output: 33.8kW @ 8500rpm",
            "•", "Steel Spaceframe", "•", "Furiosa 1.0", "•",
          ].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutPreview;
