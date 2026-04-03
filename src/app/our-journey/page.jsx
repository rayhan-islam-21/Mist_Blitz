"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";

const journeyData = [
  {
    year: "2021",
    title: "The Beginning",
    tagline: "Where it all started.",
    milestones: ["Team formation", "Initial design concepts", "First workshop setup"],
    phases: [
      { label: "Design", detail: "Concept sketches and initial CAD models" },
      { label: "Analysis", detail: "Structural simulation and load calculations" },
      { label: "Manufacturing", detail: "First prototype frame fabrication" },
      { label: "Testing", detail: "Static load testing and component validation" },
    ],
    achievements: ["Team formally registered", "Workshop space secured at MIST"],
  },
  {
    year: "2022",
    title: "First Prototype",
    tagline: "Steel meets ambition.",
    milestones: ["First car chassis completed", "Electronics integration", "Team expanded to 30+ members"],
    phases: [
      { label: "Design", detail: "Full vehicle CAD finalized in SolidWorks" },
      { label: "Analysis", detail: "FEA on chassis & suspension geometry" },
      { label: "Manufacturing", detail: "Chassis welded, suspension assembled" },
      { label: "Testing", detail: "Dynamic testing on campus grounds" },
    ],
    achievements: ["Prototype 1.0 completed", "First internal driver trials"],
  },
  {
    year: "2023",
    title: "International Debut",
    tagline: "Racing beyond borders.",
    milestones: ["Formula Student competition entry", "International ranking achieved", "Sponsorship partnerships secured"],
    phases: [
      { label: "Design", detail: "Revised aero package and lighter chassis" },
      { label: "Analysis", detail: "Full vehicle dynamics simulation" },
      { label: "Manufacturing", detail: "Lightweight components, CNC-machined parts" },
      { label: "Testing", detail: "Endurance and acceleration tests" },
    ],
    achievements: ["Competed internationally", "Design event recognition", "Team of 50+ members"],
  },
  {
    year: "2024",
    title: "Evolution & Excellence",
    tagline: "Faster. Smarter. Stronger.",
    milestones: ["New powertrain system", "Advanced electronics suite", "Best result in team history"],
    phases: [
      { label: "Design", detail: "Ground-up redesign based on competition feedback" },
      { label: "Analysis", detail: "CFD analysis for improved downforce" },
      { label: "Manufacturing", detail: "Carbon fiber bodywork, upgraded drivetrain" },
      { label: "Testing", detail: "Full competition simulation week" },
    ],
    achievements: ["Personal best lap times", "Top performance in static events", "National recognition"],
  },
];

const OurJourneyPage = () => {
  const [activeYear, setActiveYear] = useState("2024");
  const active = journeyData.find((d) => d.year === activeYear);

  return (
    <div className="bg-black min-h-screen text-white selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 scale-105 animate-slow-zoom">
            <Image src="/bg2.jpg" fill alt="Journey" className="object-cover opacity-40" priority />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />
        <div className="relative z-10 text-center px-6">
          <p className="text-red-500 uppercase tracking-[0.4em] text-xs font-bold mb-4">MIST Blitz Formula Student</p>
          <h1 className="text-6xl md:text-9xl font-sans italic font-black uppercase tracking-tighter leading-none">
            Our <span className="text-red-600">Journey</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-xl mx-auto">
            From a blank page to the racetrack — every year a new chapter.
          </p>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Scroll to Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-red-600 to-transparent" />
          </div>
        </div>
      </section>

      {/* Timeline Tabs */}
      <section className="relative bg-black py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Timeline</h2>
          <p className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-12">
            Year by Year
          </p>

          {/* Year selector */}
          <div className="flex gap-4 mb-16 border-b border-white/10 pb-0 overflow-x-auto">
            {journeyData.map((item) => (
              <button
                key={item.year}
                onClick={() => setActiveYear(item.year)}
                className={`pb-4 px-2 text-sm font-black uppercase tracking-widest transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeYear === item.year
                    ? "border-red-600 text-white"
                    : "border-transparent text-white/30 hover:text-white/60"
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>

          {/* Active year content */}
          {active && (
            <div className="grid md:grid-cols-2 gap-16">
              {/* Left: Milestones & Achievements */}
              <div>
                <h3 className="text-4xl font-sans font-black italic uppercase text-white mb-1">
                  {active.title}
                </h3>
                <p className="text-red-500 italic text-sm mb-8">{active.tagline}</p>

                <div className="mb-10">
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-bold">Major Milestones</h4>
                  <ul className="space-y-3">
                    {active.milestones.map((m, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-red-600 mt-1 text-xs">▶</span>
                        <span className="text-sm">{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-bold">Achievements</h4>
                  <ul className="space-y-3">
                    {active.achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-300">
                        <span className="text-yellow-400 mt-1 text-xs">★</span>
                        <span className="text-sm">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Design → Manufacturing → Testing phases */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-white/40 mb-6 font-bold">
                  Design → Analysis → Manufacturing → Testing
                </h4>
                <div className="space-y-0">
                  {active.phases.map((phase, i) => (
                    <div key={i} className="relative pl-8 pb-8">
                      {/* vertical line */}
                      {i < active.phases.length - 1 && (
                        <div className="absolute left-[11px] top-5 w-px h-full bg-white/10" />
                      )}
                      <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-red-600 border-2 border-black flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                      <h5 className="text-white font-black uppercase text-sm tracking-wider mb-1">{phase.label}</h5>
                      <p className="text-gray-500 text-sm">{phase.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Awards Strip */}
      <section className="bg-zinc-950 border-y border-white/5 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xs uppercase tracking-widest text-red-500 mb-3 font-bold">Recognition</h2>
          <h3 className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-10">
            Awards & Milestones
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "4+", label: "Years Active" },
              { value: "3", label: "Prototypes Built" },
              { value: "50+", label: "Team Members" },
              { value: "1st", label: "International Entry" },
            ].map((stat, i) => (
              <div key={i} className="border border-white/10 p-6">
                <p className="text-4xl font-black text-red-600 font-sans italic">{stat.value}</p>
                <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate linear;
        }
      `}</style>
    </div>
  );
};

export default OurJourneyPage;
