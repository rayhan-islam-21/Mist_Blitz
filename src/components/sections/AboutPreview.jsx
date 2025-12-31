"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  MoveRight,
  Activity,
  Zap,
  Shield,
  Globe,
  Cpu,
  Gauge,
} from "lucide-react";
import { Highlighter } from "../ui/highlighter";

const AboutPreview = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-red-600 selection:text-white overflow-hidden relative">
      {/* GLOBAL BACKGROUND GRID - Mimics blueprint paper */}
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* SECTION 1: THE MANIFESTO */}
      <section className="relative pt-40 pb-20 px-6 border-b border-white/5">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 right-10 text-[20rem] font-black text-white/[0.02] leading-none pointer-events-none italic select-none hidden lg:block"
        >
          BLITZ
        </motion.div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 mb-6 bg-red-600/10 px-4 py-1.5 border-l-2 border-red-600"
            >
              <Activity size={14} className="text-red-600 animate-pulse" />
              <span className="text-red-500 font-mono font-bold tracking-[0.3em] uppercase text-[10px]">
                Formula Student-MIST BLITZ
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-[9rem] font-black uppercase italic leading-[0.8] tracking-tighter mb-10">
              MIST <br />
              <span className=" text-red-600">BLITZ</span>!
            </h1>

            <div className="space-y-8">
              <p className="text-xl md:text-3xl text-balance font-bold leading-tight tracking-tight text-gray-100 uppercase italic">
                Bangladesh’s emerging force in{"  "}
                <span className="text-red-600  decoration-2 ">
                  Formula Student engineering.
                </span>{" "}
              </p>
              <p className="text-sm  text-gray-400 text-balance font-semibold italic leading-relaxed max-w-lg">
                MIST BLITZ is the official Formula Student team of the{" "}
                <span className="text-white font-semibold italic">
                  Military Institute of Science and Technology (MIST).
                </span>
                . The team designs, manufactures, and validates a single-seat,
                open-wheel race car in compliance with international Formula
                Student regulations, representing Bangladesh on a global
                motorsport platform.
              </p>
            </div>
          </div>

          <div className="relative group mt-16 lg:mt-0">
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-red-600 z-20" />
            <div className="absolute top-0 right-0 p-2 font-mono text-[8px] text-gray-500 uppercase tracking-widest hidden md:block">
              Ref_IMG: FS_COMPETITION_RUN
            </div>

            <div className="relative aspect-square overflow-hidden border border-white/10 group-hover:border-red-600/50 transition-all duration-500 shadow-2xl">
              <Image
                src="/china4.jpg"
                alt="Formula Student China Entry"
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={14} className="text-red-600" />
                  <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest block">
                    International Competition
                  </span>
                </div>
                <h3 className="text-3xl font-black italic uppercase">
                  Formula Student
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TECHNICAL PARAMETERS (THE STATS) */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 relative overflow-hidden">
        {[
          { label: "GENESIS", value: "APR 2024", icon: <Zap size={16} /> },
          {
            label: "DESIGN GOAL",
            value: "MAX AGILITY",
            icon: <Gauge size={16} />,
          },
          {
            label: "PROJECT PHASE",
            value: "PROTOTYPE",
            icon: <Activity size={16} />,
          },
          { label: "UNIT ID", value: "FURIOSA-1.0", icon: <Cpu size={16} /> },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-12 border-r border-white/10 hover:bg-red-600 transition-all group overflow-hidden relative"
          >
            <div className="relative z-10 transition-colors group-hover:text-white">
              <div className="mb-4 text-red-600 group-hover:text-white transition-colors">
                {stat.icon}
              </div>
              <p className="font-mono text-[10px] text-gray-500 mb-2 tracking-widest group-hover:text-white/70 uppercase">
                {stat.label}
              </p>
              <p className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter">
                {stat.value}
              </p>
            </div>
            <div className="absolute -bottom-4 -right-2 text-8xl font-black text-white/[0.02] group-hover:text-black/[0.1] italic transition-all group-hover:-translate-y-2">
              0{i + 1}
            </div>
          </div>
        ))}
      </section>

      {/* SECTION 3: THE GENESIS DEEP DIVE */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-red-600" />
                <span className="font-mono text-xs uppercase tracking-[0.5em] text-red-600">
                  The Blueprint
                </span>
              </div>
              <h2 className="text-5xl md:text-9xl font-black uppercase italic leading-none tracking-tighter mb-8">
                OUR <span className="text-red-600">ORIGIN</span>
              </h2>
              <div className="grid md:grid-cols-2 text-balance font-sans gap-10 text-gray-300 text-sm md:text-lg leading-relaxed font-normal">
                <p>
                  Founded in 2024, MIST BLITZ was established to bridge the gap
                  between academic theory and real-world motorsport engineering.
                  The team provides MIST students with hands-on experience in
                  vehicle design, manufacturing, testing, and validation.
                </p>
                <p>
                  Our first mission,{" "}
                  <span className="text-white">Formula Student China</span>,
                  Operating under Formula Student regulations, the team focuses
                  on chassis design, vehicle dynamics, powertrain optimization,
                  and systems integration to meet international competition
                  standards.
                </p>
              </div>
            </div>
            <div className="lg:w-1/3 w-full bg-gradient-to-br from-white/5 to-transparent p-10 border-l-4 border-red-600 backdrop-blur-md">
              <h4 className="font-black uppercase tracking-widest text-white text-xs mb-6">
                TEAM PHILOSOPHY
              </h4>
              <p className="text-2xl font-black italic leading-tight uppercase text-white mb-4">
                "DESIGN WITH PURPOSE. BUILD WITH <br />
                <span className="text-red-600">PRECISION.</span>"
              </p>
            </div>
          </div>

          {/* BRUTALIST GRID GRID */}
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 relative h-160 border border-white/10 group overflow-hidden bg-zinc-900">
              <Image
                src="/car2.jpg"
                alt="Furiosa 1.0 Prototype"
                fill
                className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
              <div className="absolute top-10 right-10 flex gap-2">
                <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                  FSC_China_2024_Entry
                </span>
              </div>
              <div className="absolute bottom-12 left-12">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-16 h-[2px] bg-red-600" />
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-300">
                    Power Unit: KTM 390 DUKE // 373.3cc
                  </span>
                </div>
                <h3 className="md:text-7xl text-5xl font-black italic uppercase mb-8 tracking-tighter text-white">
                  FURIOSA 1.0
                </h3>

                {/* New Data Overlay for Technical Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 border-l border-red-600 pl-6">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-mono">
                      Weight
                    </p>
                    <p className="text-xl font-bold text-white">
                      290kg (40:60)
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-mono">
                      Max Output
                    </p>
                    <p className="text-xl font-bold text-white">
                      33.8tkW @8.5k
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-mono">
                      Max Torque
                    </p>
                    <p className="text-xl font-bold text-white">39Nm @6.5k</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-mono">
                      Chassis
                    </p>
                    <p className="text-xl font-bold text-white">
                      Steel Spaceframe
                    </p>
                  </div>
                </div>
{/* 
                <button className="flex items-center gap-6 group/btn bg-white px-4 py-5 transition-all hover:bg-red-600 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none">
                  <span className="text-black font-black uppercase tracking-widest text-sm group-hover/btn:text-white transition-colors">
                    Full Specifications
                  </span>
                  <MoveRight className="text-black group-hover/btn:text-white group-hover/btn:translate-x-2 transition-all" />
                </button> */}
              </div>
            </div>

            <div className="lg:col-span-4 grid gap-8">
              {/* Structural Integrity Card */}
              <div className="bg-red-600 p-12 flex flex-col justify-between hover:translate-y-[-5px] transition-transform shadow-xl">
                <div className="space-y-4">
                  <h4 className="font-black text-4xl italic uppercase leading-none text-white tracking-tighter">
                    STEEL <br /> SPACEFRAME
                  </h4>
                  <p className="text-sm font-bold opacity-90 uppercase tracking-tight text-white leading-tight">
                    Node triangulation using graded carbon steel for optimal
                    strength-to-weight ratio.
                  </p>
                </div>
                <Shield size={48} className="self-end opacity-20 text-white" />
              </div>

              {/* Suspension & Dynamics Card */}
              <div className="bg-zinc-900 border border-white/10 p-12 flex flex-col justify-between hover:translate-y-[-5px] transition-transform shadow-xl">
                <div className="space-y-4">
                  <h4 className="font-black text-4xl italic uppercase leading-none text-white tracking-tighter">
                    KINETIC <br /> DYNAMICS
                  </h4>
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-tight leading-tight">
                    Double Wishbone pushrod suspension system for precision
                    handling and stability.
                  </p>
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-6">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest tracking-tighter">
                    Tires: Apollo Amazer 4G Life // R13
                  </span>
                  <Activity size={16} className="text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE TEXT DECORATION - Refined speed and weight */}
      <div className="py-8 bg-red-600  z-50 -rotate-[0.95] w-[115%] -ml-[7.5%] border-y-4 border-black group cursor-default">
        <div className="flex whitespace-nowrap z-50 gap-12 animate-marquee font-black italic uppercase text-5xl text-white select-none">
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
          <span>Output: 33.8tkW @ 8500rpm</span>
          <span>•</span>
          <span>Steel Spaceframe Chassis</span>
          <span>•</span>
          <span>Double Wishbone Geometry</span>
          <span>•</span>
          <span>Furiosa 1.0</span>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px white;
          color: transparent;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
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
