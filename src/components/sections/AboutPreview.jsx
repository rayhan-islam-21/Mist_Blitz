"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const carSpecs = [
  { label: "Power Unit", value: "KTM 390 Duke — 373.3cc" },
  { label: "Weight", value: "290 kg (40:60 dist.)" },
  { label: "Max Output", value: "33.8 kW @ 8,500 rpm" },
  { label: "Peak Torque", value: "39 Nm @ 6,500 rpm" },
  { label: "Chassis", value: "Steel Spaceframe" },
  { label: "Suspension", value: "Double Wishbone Pushrod" },
  { label: "Tyres", value: "Apollo Amazer 4G Life R13" },
];

const AboutPreview = () => {
  const [activeSpec, setActiveSpec] = useState(0);

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-red-600 selection:text-white overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* SECTION 1: INTRO */}
      <section className="relative pt-32 pb-20 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
              className="text-5xl md:text-[9rem] font-black uppercase italic leading-none tracking-tighter mb-10"
            >
              MIST <br />
              <span className="text-red-600">BLITZ</span>!
            </motion.h1>

            <div className="space-y-8">
              <p className="text-xl md:text-3xl text-balance font-bold leading-tight tracking-tight text-gray-100 uppercase italic">
                Bangladesh&apos;s emerging force in{" "}
                <span className="text-red-600">Formula Student engineering.</span>
              </p>
              <p className="text-sm text-balance font-sans text-gray-300 md:text-lg font-normal leading-relaxed max-w-lg">
                MIST BLITZ is the official Formula Student team of the{" "}
                <span className="text-white font-semibold italic">
                  Military Institute of Science and Technology (MIST).
                </span>{" "}
                The team designs, manufactures, and validates a single-seat,
                open-wheel race car in compliance with international Formula
                Student regulations, representing Bangladesh on a global
                motorsport platform.
              </p>
            </div>
          </div>

          <div className="relative group mt-16 lg:mt-0">
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-red-600 z-20" />
            <div className="relative aspect-square overflow-hidden border border-white/10 group-hover:border-red-600/50 transition-all duration-500 shadow-2xl">
              <Image
                src="/china4.jpg"
                alt="Formula Student Competition"
                fill
                className="object-cover group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR ORIGIN + TEAM PHILOSOPHY (moved up, no stats section above) */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
            <div className="lg:w-2/3">
              <motion.h2
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="text-5xl md:text-9xl font-black uppercase italic leading-tight tracking-tighter mb-8"
              >
                OUR <span className="text-red-600">ORIGIN</span>
              </motion.h2>
              <div className="grid md:grid-cols-2 text-balance gap-10 text-gray-300">
                <p className="body-copy text-gray-300">
                  Founded in 2024, MIST BLITZ was established to bridge the gap
                  between academic theory and real-world motorsport engineering.
                  The team provides MIST students with hands-on experience in
                  vehicle design, manufacturing, testing, and validation.
                </p>
                <p className="body-copy text-gray-300">
                  Our first mission,{" "}
                  <span className="text-white">Formula Student China</span>,
                  operating under Formula Student regulations, the team focuses
                  on chassis design, vehicle dynamics, powertrain optimization,
                  and systems integration to meet international competition
                  standards.
                </p>
              </div>
            </div>
            <div className="lg:w-1/3 w-full bg-linear-to-br from-white/5 to-transparent p-10 border-l-4 border-red-600 backdrop-blur-md">
              <h4 className="font-black uppercase tracking-widest text-white text-xs mb-6">
                TEAM PHILOSOPHY
              </h4>
              <p className="text-2xl font-black italic leading-tight uppercase text-white mb-4">
                &ldquo;DESIGN WITH PURPOSE. BUILD WITH <br />
                <span className="text-red-600">PRECISION.&rdquo;</span>
              </p>
            </div>
          </div>

          {/* CAR SECTION: Photo + Sliding Specs */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Large car image */}
            <div className="lg:col-span-8 relative h-160 border border-white/10 group overflow-hidden bg-zinc-900">
              <Image
                src="/car2.jpg"
                alt="Furiosa 1.0 Prototype"
                fill
                className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-[2s]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <h3 className="md:text-7xl text-4xl font-black italic uppercase mb-8 tracking-tighter text-white">
                  FURIOSA 1.0
                </h3>
                <span className="font-mono text-xs uppercase tracking-widest text-gray-400">
                  Power Unit: KTM 390 DUKE || 373.3cc
                </span>
              </div>
            </div>

            {/* Sliding specs panel */}
            <div className="lg:col-span-4 flex flex-col gap-0 overflow-hidden">
              <div className="bg-red-600 px-6 py-4">
                <p className="text-white font-black uppercase text-xs tracking-widest">
                  Key Specifications
                </p>
              </div>
              {carSpecs.map((spec, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSpec(i)}
                  className={`group relative w-full text-left px-6 py-5 border-b border-white/5 transition-all duration-300 overflow-hidden ${
                    activeSpec === i ? "bg-red-600/10" : "bg-zinc-900/60 hover:bg-white/5"
                  }`}
                >
                  {/* sliding red bar */}
                  <span
                    className={`absolute left-0 top-0 h-full w-1 bg-red-600 transition-all duration-300 ${
                      activeSpec === i ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                    }`}
                  />
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">
                    {spec.label}
                  </p>
                  <p
                    className={`font-black uppercase tracking-tight transition-colors duration-200 ${
                      activeSpec === i ? "text-white text-lg" : "text-white/70 text-base"
                    }`}
                  >
                    {spec.value}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-8 bg-red-600 z-50 -rotate-[0.95] w-[115%] -ml-[7.5%] border-y-4 border-black group cursor-default">
        <div className="flex whitespace-nowrap z-50 gap-12 animate-marquee font-black italic uppercase text-2xl text-white select-none">
          <span>FSC CHINA 2024 ENTRY</span>
          <span>•</span>
          <span>MIST BLITZ // DHAKA</span>
          <span>•</span>
          <span>Weight: 290kg (40:60)</span>
          <span>•</span>
          <span>KTM 390 DUKE POWER UNIT</span>
          <span>•</span>
          <span>373.3cc Engine</span>
          <span>•</span>
          <span>Peak Torque: 39Nm @ 6500rpm</span>
          <span>•</span>
          <span>Output: 33.8kW @ 8500rpm</span>
          <span>•</span>
          <span>Steel Spaceframe Chassis</span>
          <span>•</span>
          <span>Double Wishbone Geometry</span>
          <span>•</span>
          <span>Furiosa 1.0</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutPreview;
