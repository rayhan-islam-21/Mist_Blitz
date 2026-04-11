"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";

const carsData = [
  {
    id: "MB-01",
    year: "2022",
    name: "Blitz Mk.I",
    tagline: "The first machine. Raw. Ambitious.",
    specs: {
      Engine: "Honda CBR600 — 600cc",
      Weight: "~280 kg",
      Suspension: "Double wishbone (front & rear)",
      Chassis: "Steel space frame",
      Drivetrain: "Chain-driven, RWD",
      Braking: "Hydraulic disc brakes (4-wheel)",
    },
    highlights: ["Fully in-house fabricated chassis", "First functional prototype by the team", "Competed in static events"],
    image: "/car2.jpg",
  },
  {
    id: "MB-02",
    year: "2023",
    name: "Blitz Mk.II",
    tagline: "Refined. Lighter. Faster.",
    specs: {
      Engine: "Honda CBR600RR — 600cc (tuned)",
      Weight: "~260 kg",
      Suspension: "Optimized double wishbone, adjustable ARB",
      Chassis: "Improved steel space frame — reduced mass",
      Drivetrain: "Torque-biased limited slip differential",
      Braking: "Upgraded 4-wheel hydraulic, balanced bias",
    },
    highlights: ["15% weight reduction from Mk.I", "Improved aerodynamic body panels", "International competition debut"],
    image: "/car2.jpg",
  },
  {
    id: "MB-03",
    year: "2024",
    name: "Blitz Mk.III",
    tagline: "Ground-up redesign. Competition-ready.",
    specs: {
      Engine: "Honda CBR600RR — extensively tuned",
      Weight: "~240 kg",
      Suspension: "Fully adjustable pushrod, inboard coilovers",
      Chassis: "High-strength steel, optimized tube layout",
      Drivetrain: "Custom-ratio gearbox, LSD",
      Braking: "Carbon-ceramic hybrid discs",
    },
    highlights: ["Best lap times in team history", "Carbon fiber composite bodywork", "CFD-optimized front wing", "Advanced data acquisition system"],
    image: "/car2.jpg",
  },
];

const OurCarsPage = () => {
  const [activeCar, setActiveCar] = useState(carsData[2].id);
  const car = carsData.find((c) => c.id === activeCar);

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

      {/* Car Lineup Selector */}
      <section className="bg-[#0a0a0a] py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Car Lineup</h2>
          <p className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-12">
            The Machines
          </p>

          {/* Car tabs */}
          <div className="flex gap-4 mb-12 overflow-x-auto border-b border-white/10">
            {carsData.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCar(c.id)}
                className={`pb-4 px-2 text-sm font-black uppercase tracking-widest transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeCar === c.id
                    ? "border-red-600 text-white"
                    : "border-transparent text-white/30 hover:text-white/60"
                }`}
              >
                {c.year} — {c.name}
              </button>
            ))}
          </div>

          {car && (
            <div className="grid md:grid-cols-2 gap-16 items-stretch">
              {/* Left: Image */}
              <div className="relative rounded-sm overflow-hidden border border-white/10" style={{ minHeight: '24rem' }}>
                <Image src={car.image} fill alt={car.name} className="object-cover object-center" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-xs text-red-500 uppercase tracking-widest font-bold">{car.id}</span>
                  <h3 className="text-3xl font-sans font-black italic uppercase text-white">{car.name}</h3>
                  <p className="text-gray-400 text-sm italic mt-1">{car.tagline}</p>
                </div>
              </div>

              {/* Right: Specs & Highlights */}
              <div>
                {/* Specs */}
                <div className="mb-10">
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5 font-bold">Key Specifications</h4>
                  <div className="divide-y divide-white/5">
                    {Object.entries(car.specs).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-4 py-3">
                        <span className="text-white/40 text-xs uppercase tracking-wider w-28 shrink-0">{key}</span>
                        <span className="text-gray-200 text-sm">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-bold">Design Highlights</h4>
                  <ul className="space-y-3">
                    {car.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-red-600 mt-1 text-xs">▶</span>
                        <span className="text-sm">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Evolution Comparison */}
      <section className="bg-[#111111] border-y border-white/5 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Evolution</h2>
          <p className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-10">
            Car by Car
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carsData.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveCar(c.id)}
                className={`border p-6 cursor-pointer transition-all duration-300 ${
                  activeCar === c.id ? "border-red-600 bg-red-600/5" : "border-white/10 hover:border-white/30"
                }`}
              >
                <p className="text-red-500 text-xs uppercase tracking-widest font-bold mb-1">{c.year}</p>
                <h4 className="text-xl font-sans font-black italic uppercase text-white mb-2">{c.name}</h4>
                <p className="text-gray-500 text-xs">{c.tagline}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-white/30 uppercase tracking-widest">{c.specs.Weight}</span>
                </div>
              </div>
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
