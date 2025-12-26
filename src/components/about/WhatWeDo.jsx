"use client";

import React from "react";
import { Trophy, PenTool, Zap, ArrowRight, Cog, Gauge, Microscope } from "lucide-react";

const WhatWeDo = () => {
  const categories = [
    {
      title: "The Competition",
      tag: "GLOBAL_CIRCUIT",
      icon: <Trophy className="w-5 h-5" />,
      description: "Formula Student is the peak of educational motorsport. We design and manufacture formula-style prototypes to compete against the world's elite engineering institutions.",
      list: ["FSG Germany", "FSAE Japan", "FSUK Silverstone"],
      accent: "bg-red-600",
    },
    {
      title: "Static Events",
      tag: "ENGINEERING_LOGIC",
      icon: <PenTool className="w-5 h-5" />,
      description: "Speed is nothing without strategy. Our team is audited on engineering design, financial sustainability, and the commercial viability of our racing prototype.",
      list: ["Business Strategy", "Design Validation", "Cost Management"],
      accent: "bg-white",
    },
    {
      title: "Dynamic Events",
      tag: "KINETIC_VALIDATION",
      icon: <Zap className="w-5 h-5" />,
      description: "The ultimate physical stress test. Our car is pushed to its mechanical limits in five disciplines testing acceleration, lateral-G, and endurance reliability.",
      list: ["0-75m Acceleration", "Skidpad Cornering", "22km Endurance"],
      accent: "bg-red-600",
    },
  ];

  return (
    <section className="py-24 bg-black selection:text-white  text-white font-sans selection:bg-red-600">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER: RAW & BOLD */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 border-b-4 border-white pb-10">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-black  italic tracking-tighter uppercase leading-[0.85]">
              WHAT WE {" "}<span className="text-red-600">DO.</span>
            </h1>
          </div>
        </div>

        {/* CARDS: INDUSTRIAL BENTO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-white/20">
          {categories.map((item, index) => (
            <div 
              key={index} 
              className="group relative p-10 border-r border-b border-white/20 hover:bg-zinc-900 transition-all duration-500"
            >
              {/* TOP STRIP */}
              <div className="flex justify-between items-center mb-12">
                <div className={`px-3 py-1 text-[9px] font-black tracking-widest uppercase text-black ${item.accent}`}>
                  {item.tag}
                </div>
                <div className="text-white opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all">
                  {item.icon}
                </div>
              </div>

              {/* CONTENT */}
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 italic group-hover:translate-x-2 transition-transform">
                {item.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                {item.description}
              </p>

              {/* LIST: BLUEPRINT STYLE */}
              <div className="space-y-4">
                <div className="h-[1px] w-full bg-white/10" />
                <ul className="grid grid-cols-1 gap-3">
                  {item.list.map((li, i) => (
                    <li key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                      <span className="w-1 h-1 bg-red-600" />
                      {li}
                    </li>
                  ))}
                </ul>
              </div>

              {/* DECORATIVE BACKGROUND NUMBER */}
              <span className="absolute bottom-4 right-6 text-7xl font-black text-white/[0.02] pointer-events-none group-hover:text-red-600/10 transition-colors">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

        {/* FOOTER: THE QUOTE AS A TECHNICAL SPEC */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 items-center bg-zinc-900/50 p-8 border-l-8 border-red-600">
          <div className="md:col-span-3">
            <p className="text-xl md:text-2xl font-bold uppercase italic tracking-tighter leading-tight">
              “Formula Student is not just a race; it is an <span className="text-red-600">Engineering Crucible</span> where ingenuity meets the asphalt.”
            </p>
          </div>
          <div className="flex justify-end gap-4">
             <div className="flex flex-col items-center">
                <Cog className="animate-spin-slow opacity-20" size={32}/>
                <span className="text-[8px] mt-2 opacity-40 uppercase tracking-widest">Mechanical</span>
             </div>
             <div className="flex flex-col items-center">
                <Gauge className="opacity-20" size={32}/>
                <span className="text-[8px] mt-2 opacity-40 uppercase tracking-widest">Velocity</span>
             </div>
             <div className="flex flex-col items-center">
                <Microscope className="opacity-20" size={32}/>
                <span className="text-[8px] mt-2 opacity-40 uppercase tracking-widest">Analysis</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;