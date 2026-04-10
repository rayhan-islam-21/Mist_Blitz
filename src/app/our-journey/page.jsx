"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, ChevronRight } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const journeyData = {
  2023: {
    year: "2023",
    round: "Season 01",
    heroImage: "/team.jpg",
    contentImage: "/team.jpg",
    tagline: "From a dream to a blueprint.",

    teamFormation: {
      founded: "2023",
      totalMembers: 20,
      summary:
        "MIST Blitz was born from the ambition of a group of engineering students at the Military Institute of Science and Technology (MIST). In 2023, the founding team began recruiting members, establishing departments, and laying the groundwork for Bangladesh's first internationally competing Formula Student team.",
      departments: [
        { name: "Chassis & Frame", count: 4 },
        { name: "Powertrain", count: 4 },
        { name: "Electronics", count: 4 },
        { name: "Management & Finance", count: 4 },
        { name: "Media & Documentation", count: 4 },
      ],
      leadership: [
        { role: "Team Principal", name: "—" },
        { role: "Chief Engineer", name: "—" },
      ],
    },

    milestones: [
      "Team concept established at MIST Mechanical Engineering dept.",
      "Initial recruitment — first 20 members onboarded",
      "Workshop space secured on MIST campus",
      "Departmental structure defined and assigned",
      "First design review sessions conducted",
      "Feasibility study and competition target set — FSC China",
    ],

    fabrication: {
      car: "Concept Phase",
      summary:
        "2023 was entirely dedicated to research, concept design, and team building. No physical car was fabricated — the team spent the year studying Formula Student regulations, benchmarking other teams, and producing initial design concepts for Furiosa 1.0.",
      phases: [
        {
          name: "Design",
          status: "partial",
          details: "Early concept sketches and initial CAD layouts. Chassis geometry and packaging studies conducted in SolidWorks.",
        },
        {
          name: "Analysis",
          status: "not-started",
          details: "No formal simulation conducted. Literature review of suspension kinematics and chassis FEA started.",
        },
        {
          name: "Manufacturing",
          status: "not-started",
          details: "No manufacturing this season. Workshop setup and tooling acquisition began.",
        },
        {
          name: "Testing",
          status: "not-started",
          details: "No vehicle to test. Team visited and studied other FS teams' testing procedures.",
        },
      ],
    },

    competitions: {
      participated: [],
      note: "No competition entries in the founding season. Team focused on planning, design, and preparation.",
    },

    achievements: [
      { type: "recognition", title: "Official Recognition by MIST Authorities", desc: "MIST Blitz was officially recognized as an engineering team under the Department of Mechanical Engineering, MIST." },
      { type: "recognition", title: "First Formula Student Team from Bangladesh", desc: "Established as the first team in Bangladesh to pursue an international Formula Student campaign." },
    ],
  },

  2024: {
    year: "2024",
    round: "Season 02",
    heroImage: "/improve.jpg",
    contentImage: "/improve.jpg",
    tagline: "Furiosa 1.0 — built from scratch.",

    teamFormation: {
      founded: "April 2024",
      totalMembers: 31,
      summary:
        "Officially founded in April 2024, MIST Blitz formalized its 31-member team with defined sub-leads for each department. This season was defined by the complete design and fabrication of Furiosa 1.0 — the team's debut race car — and preparation for international competition.",
      departments: [
        { name: "Chassis & Aerodynamics", count: 6 },
        { name: "Suspension, Steering & Braking", count: 6 },
        { name: "Powertrain", count: 6 },
        { name: "Electronics & DAQ", count: 5 },
        { name: "Management & Finance", count: 5 },
        { name: "Media & Documentation", count: 3 },
      ],
      leadership: [
        { role: "Team Principal", name: "—" },
        { role: "Chief Engineer", name: "—" },
        { role: "Technical Director", name: "—" },
      ],
    },

    milestones: [
      "Officially founded — April 2024",
      "Full design of Furiosa 1.0 completed in SolidWorks",
      "Steel spaceframe chassis TIG-welded in-house",
      "KTM 390 Duke engine successfully integrated",
      "Independent double wishbone suspension fabricated",
      "Anti-Ackermann steering system designed and built",
      "1st place — Engineering Design CRM at Formula Bharat 2025",
    ],

    fabrication: {
      car: "FURIOSA 1.0",
      summary:
        "Furiosa 1.0 is MIST Blitz's debut Formula Student race car — designed and built entirely in-house. It features a triangulated steel spaceframe, independent double wishbone suspension front and rear, an anti-Ackermann steering system, and a KTM 390 Duke single-cylinder engine.",
      specs: [
        { label: "Engine", value: "KTM 390 Duke — 373.3cc Single" },
        { label: "Chassis", value: "Steel Spaceframe (Triangulated)" },
        { label: "Suspension", value: "Independent Double Wishbone (F&R)" },
        { label: "Steering", value: "Anti-Ackermann System" },
        { label: "Brakes", value: "Hydraulic Disc — 4 Wheel" },
        { label: "Build", value: "100% In-house Fabrication" },
      ],
      phases: [
        {
          name: "Design",
          status: "completed",
          details: "Full vehicle CAD completed in SolidWorks. Chassis geometry, suspension kinematics, and packaging all validated against FSC regulations.",
        },
        {
          name: "Analysis",
          status: "completed",
          details: "Chassis FEA and suspension kinematics simulation completed. Structural integrity and driver safety verified.",
        },
        {
          name: "Manufacturing",
          status: "completed",
          details: "Steel spaceframe TIG-welded by student team. All suspension components fabricated in MIST workshop. Engine integrated with custom mounts.",
        },
        {
          name: "Testing",
          status: "completed",
          details: "Multiple shakedown runs conducted on campus. Vehicle dynamics evaluated and setup refined before competition.",
        },
      ],
    },

    competitions: {
      participated: [
        {
          name: "Formula Bharat 2025",
          location: "India",
          date: "2025",
          events: ["Engineering Design — CRM (Combustion)"],
          result: "1st Place — Engineering Design Concept Resources Management (CRM) Combustion Category",
          ranking: "1st Place",
        },
      ],
    },

    achievements: [
      { type: "award", title: "1st Place — Formula Bharat 2025 Engineering Design CRM", desc: "MIST Blitz secured first place in the Engineering Design Concept Resources Management Combustion category at Formula Bharat 2025." },
      { type: "recognition", title: "First Formula Student Car Built in Bangladesh", desc: "Furiosa 1.0 is the first Formula Student specification race car to be designed and built entirely within Bangladesh." },
    ],
  },

  2025: {
    year: "2025",
    round: "Season 03",
    heroImage: "/china4.jpg",
    contentImage: "/china.JPG",
    tagline: "Bangladesh meets the world.",

    teamFormation: {
      founded: "Ongoing",
      totalMembers: 31,
      summary:
        "Season 03 marked MIST Blitz's debut on the international Formula Student stage. The team competed at Formula Student Combustion China 2025 against 76 teams from China, Japan, Russia, Kazakhstan, and Bangladesh — becoming the first Bangladeshi team to pass technical inspection and complete laps on a foreign circuit.",
      departments: [
        { name: "Chassis & Aerodynamics", count: 6 },
        { name: "Suspension, Steering & Braking", count: 6 },
        { name: "Powertrain", count: 6 },
        { name: "Electronics & DAQ", count: 5 },
        { name: "Management & Finance", count: 5 },
        { name: "Media & Documentation", count: 3 },
      ],
      leadership: [
        { role: "Team Principal", name: "—" },
        { role: "Chief Engineer", name: "—" },
        { role: "Competition Manager", name: "—" },
      ],
    },

    milestones: [
      "Selected to compete at Formula Student Combustion China 2025",
      "Passed all technical inspections at FSC China — first Bangladeshi team to do so",
      "Completed two laps on the endurance track — unprecedented for Bangladesh",
      "Competed against 76 teams from 5 countries",
      "Best Foreign Team Award (Leading Convoy Award)",
      "Best Presentation Performance — Static Events",
      "4th Place — Business Plan Presentation",
    ],

    fabrication: {
      car: "FURIOSA 1.0",
      summary:
        "Furiosa 1.0 was refined and prepared for international scrutineering ahead of FSC China 2025. The car passed all technical inspections and completed two laps of the endurance circuit — a milestone never achieved before by a Bangladeshi team at an international Formula Student event.",
      phases: [
        {
          name: "Design",
          status: "completed",
          details: "Pre-competition design review completed. Documentation package prepared for FSC China Design Event judges.",
        },
        {
          name: "Analysis",
          status: "completed",
          details: "Final analysis and validation runs completed. All competition documentation submitted and reviewed.",
        },
        {
          name: "Manufacturing",
          status: "completed",
          details: "Pre-competition car preparation, final assembly checks, and safety compliance verified against FSC regulations.",
        },
        {
          name: "Testing",
          status: "completed",
          details: "Final test sessions completed before shipping. Car passed all technical scrutineering at FSC China 2025 on first attempt.",
        },
      ],
    },

    competitions: {
      participated: [
        {
          name: "Formula Student Combustion China (FSC) 2025",
          location: "China",
          date: "2025",
          events: [
            "Engineering Design Event",
            "Cost & Manufacturing Analysis",
            "Business Plan Presentation",
            "Technical Scrutineering",
            "Acceleration",
            "Skidpad",
            "Autocross",
            "Endurance",
          ],
          result: "Passed all technical inspections · Completed 2 endurance laps · Competed among 76 international teams",
          ranking: "Best Foreign Team (Leading Convoy Award)",
        },
      ],
    },

    achievements: [
      { type: "award", title: "Best Foreign Team — FSC China 2025 (Leading Convoy Award)", desc: "MIST Blitz was awarded the Leading Convoy Award for being the best-performing foreign team at Formula Student Combustion China 2025." },
      { type: "award", title: "Best Presentation Performance — Static Events", desc: "Recognized for outstanding presentation quality in the static events at FSC China 2025." },
      { type: "award", title: "4th Place — Business Plan Presentation", desc: "Finished 4th overall in the Business Plan Presentation event among all competing teams." },
      { type: "recognition", title: "First Bangladeshi Team to Pass FSC Technical Inspection", desc: "MIST Blitz became the first Bangladeshi team in history to pass all technical scrutineering checks at an international Formula Student event." },
      { type: "recognition", title: "First Bangladeshi Team to Complete Endurance Laps Abroad", desc: "Completed two laps on the FSC China endurance circuit — the first time any Bangladeshi team has driven on a foreign Formula Student track." },
    ],
  },
};

const years = [2023, 2024, 2025];

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    completed: { label: "Completed", cls: "bg-green-900/40 text-green-400 border-green-700/40" },
    partial: { label: "In Progress", cls: "bg-yellow-900/40 text-yellow-400 border-yellow-700/40" },
    "not-started": { label: "Not Started", cls: "bg-zinc-800 text-white/30 border-white/10" },
  };
  const { label, cls } = map[status] || map["not-started"];
  return (
    <span className={`inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border ${cls}`}>
      {label}
    </span>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ label, title }) {
  return (
    <div className="mb-8 border-l-2 border-red-600 pl-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-500 mb-1">{label}</p>
      <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-white">{title}</h3>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function OurJourneyPage() {
  const [activeYear, setActiveYear] = useState(2025);
  const data = journeyData[activeYear];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[70vh] flex flex-col justify-end overflow-hidden">
        <Image
          src={data.heroImage}
          fill
          alt="journey"
          className="object-cover opacity-50 transition-all duration-700"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/60 via-transparent to-transparent" />

        <div className="relative z-10 px-6 md:px-16 pb-12">
          <motion.div key={activeYear} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="text-[12vw] md:text-[9vw] font-black italic uppercase leading-none tracking-tighter text-white">
              Our <span className="text-red-600">Journey</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg mt-4 max-w-lg">{data.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* ── YEAR TABS ── */}
      <div className="sticky top-16 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex gap-0">
            {years.map((yr) => (
              <button
                key={yr}
                onClick={() => setActiveYear(yr)}
                className={`relative px-6 md:px-10 py-5 font-black italic text-xl md:text-2xl tracking-tight transition-all duration-200 ${
                  activeYear === yr ? "text-white" : "text-white/25 hover:text-white/60"
                }`}
              >
                {yr}
                {activeYear === yr && (
                  <motion.div layoutId="tabBar" className="absolute bottom-0 left-0 right-0 h-0.75 bg-red-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeYear}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 space-y-20">

            {/* ── 1. TEAM FORMATION ── */}
            <section>
              <SectionHeader label="01 · Team Formation" title="The People Behind the Machine" />
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <p className="text-white/60 leading-relaxed text-base">{data.teamFormation.summary}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-white/10 p-5">
                      <p className="text-4xl font-black italic text-red-600">{data.teamFormation.totalMembers}+</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-1">Total Members</p>
                    </div>
                    <div className="border border-white/10 p-5">
                      <p className="text-2xl font-black italic text-white">{data.teamFormation.founded}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-1">Founded</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25 mb-3">Leadership</p>
                    <div className="space-y-2">
                      {data.teamFormation.leadership.map((l, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-white/6 py-3">
                          <span className="font-mono text-xs uppercase tracking-wider text-white/35">{l.role}</span>
                          <span className="text-sm font-bold text-white">{l.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Departments */}
                <div className="border border-white/10 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25 mb-4">Departments</p>
                  <div className="space-y-3">
                    {data.teamFormation.departments.map((d, i) => (
                      <div key={i} className="flex items-center justify-between gap-4 group">
                        <span className="text-sm text-white/50 group-hover:text-white/80 transition-colors">{d.name}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="h-px bg-red-600/40" style={{ width: `${d.count * 7}px` }} />
                          <span className="font-mono text-xs text-red-600 font-bold">{d.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── CAR / TEAM IMAGE ── */}
            <div className="relative w-full h-64 md:h-96 overflow-hidden border border-white/10">
              <Image
                src={data.contentImage}
                fill
                alt={`MIST Blitz ${data.year}`}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/60" />
              <div className="absolute bottom-4 left-6">
                <span className="font-mono text-xs uppercase tracking-widest text-white/40">{data.round} · {data.year}</span>
              </div>
            </div>

            {/* ── 2. MAJOR MILESTONES ── */}
            <section>
              <SectionHeader label="02 · Major Milestones" title="Defining Moments" />
              <div className="grid md:grid-cols-2 gap-0 border border-white/10">
                {data.milestones.map((m, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-5 p-6 border-white/[0.07] group hover:bg-red-600/5 transition-colors
                      ${i % 2 === 0 ? "border-r" : ""}
                      ${i < data.milestones.length - 2 ? "border-b" : ""}
                    `}
                  >
                    <span className="font-mono text-red-600 font-black text-sm shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/60 group-hover:text-white transition-colors text-sm leading-snug uppercase tracking-wide font-bold">
                      {m}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 3. FABRICATION ── */}
            <section>
              <SectionHeader label="03 · Fabrication & Build" title={`Car: ${data.fabrication.car}`} />
              <div className="space-y-8">
                <p className="text-white/60 leading-relaxed text-base max-w-3xl">{data.fabrication.summary}</p>

                {/* Specs */}
                {data.fabrication.specs && (
                  <div className="border border-white/10 overflow-hidden">
                    <div className="bg-red-600 px-6 py-3">
                      <p className="font-mono text-xs uppercase tracking-widest text-white/80">Technical Specifications — FURIOSA 1.0</p>
                    </div>
                    <div className="grid md:grid-cols-2">
                      {data.fabrication.specs.map((sp, i) => (
                        <div key={i} className={`flex items-center justify-between px-6 py-4 border-white/[0.07] ${i % 2 === 0 ? "border-r" : ""} ${i < data.fabrication.specs.length - 2 ? "border-b" : ""}`}>
                          <span className="font-mono text-xs uppercase tracking-wider text-white/30">{sp.label}</span>
                          <span className="text-sm font-bold text-white">{sp.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Phases */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/25 mb-5">Build Process</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                    {data.fabrication.phases.map((phase, i) => (
                      <div key={i} className={`relative border border-white/10 p-6 group hover:border-red-600/40 transition-colors ${i > 0 ? "md:border-l-0" : ""}`}>
                        {i < data.fabrication.phases.length - 1 && (
                          <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-[#0a0a0a] border border-red-600/30 items-center justify-center">
                            <ChevronRight size={12} className="text-red-600" />
                          </div>
                        )}
                        <span className="absolute top-3 right-4 font-black text-5xl text-white/4 leading-none select-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="mb-4">
                          <StatusBadge status={phase.status} />
                        </div>
                        <h4 className="font-black italic uppercase text-lg text-white mb-3 tracking-tight">{phase.name}</h4>
                        <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors">{phase.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── 4. COMPETITIONS ── */}
            <section>
              <SectionHeader label="04 · Competitions" title="Events & Results" />
              {data.competitions.participated.length === 0 ? (
                <div className="border border-white/10 p-8 text-center">
                  <p className="text-white/30 text-sm font-mono uppercase tracking-wider">{data.competitions.note}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {data.competitions.participated.map((comp, i) => (
                    <div key={i} className="border border-white/10 hover:border-red-600/30 transition-colors overflow-hidden">
                      <div className="bg-zinc-900 px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-black italic uppercase text-xl text-white tracking-tight">{comp.name}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="font-mono text-xs text-white/35 uppercase tracking-wider">{comp.location}</span>
                            <span className="font-mono text-xs text-white/35">·</span>
                            <span className="font-mono text-xs text-white/35 uppercase tracking-wider">{comp.date}</span>
                          </div>
                        </div>
                        <div className="shrink-0">
                          <p className="text-red-500 font-mono text-xs uppercase tracking-widest">{comp.ranking}</p>
                        </div>
                      </div>
                      <div className="px-6 py-6 grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25 mb-3">Events Participated</p>
                          <div className="flex flex-wrap gap-2">
                            {comp.events.map((ev, j) => (
                              <span key={j} className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 border border-white/10 text-white/50 hover:border-red-600/40 hover:text-white/80 transition-all">
                                {ev}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25 mb-3">Result</p>
                          <p className="text-white/70 text-sm leading-relaxed">{comp.result}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* ── 5. ACHIEVEMENTS ── */}
            <section>
              <SectionHeader label="05 · Achievements" title="Awards & Recognition" />
              <div className="grid md:grid-cols-2 gap-4">
                {data.achievements.map((ach, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className={`flex gap-5 p-6 border transition-all hover:border-red-600/30 ${
                      ach.type === "award" ? "border-red-600/20 bg-red-600/5" : "border-white/10 bg-white/2"
                    }`}
                  >
                    <div className={`shrink-0 w-10 h-10 flex items-center justify-center mt-0.5 ${ach.type === "award" ? "bg-red-600" : "bg-white/5"}`}>
                      {ach.type === "award" ? (
                        <Trophy size={16} className="text-white" />
                      ) : (
                        <Medal size={16} className="text-white/40" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-sm tracking-wide text-white mb-2 leading-snug">{ach.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{ach.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

          </div>

          {/* ── SEASON NAV ── */}
          <div className="border-t border-white/5 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 flex items-center justify-between">
              <button
                onClick={() => setActiveYear(y => { const i = years.indexOf(y); return i > 0 ? years[i - 1] : y; })}
                disabled={activeYear === years[0]}
                className="flex items-center gap-3 text-white/30 hover:text-white disabled:opacity-20 transition-colors group"
              >
                <span className="w-9 h-9 border border-white/15 group-hover:border-red-600 flex items-center justify-center transition-colors font-mono text-sm">←</span>
                <span className="font-mono text-xs uppercase tracking-wider hidden md:block">
                  {years[years.indexOf(activeYear) - 1] ?? ""}
                </span>
              </button>

              <div className="flex gap-2">
                {years.map(y => (
                  <button key={y} onClick={() => setActiveYear(y)}
                    className={`transition-all duration-300 ${activeYear === y ? "w-7 h-1 bg-red-600" : "w-2 h-1 bg-white/15 hover:bg-white/35"}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveYear(y => { const i = years.indexOf(y); return i < years.length - 1 ? years[i + 1] : y; })}
                disabled={activeYear === years[years.length - 1]}
                className="flex items-center gap-3 text-white/30 hover:text-white disabled:opacity-20 transition-colors group"
              >
                <span className="font-mono text-xs uppercase tracking-wider hidden md:block">
                  {years[years.indexOf(activeYear) + 1] ?? ""}
                </span>
                <span className="w-9 h-9 border border-white/15 group-hover:border-red-600 flex items-center justify-center transition-colors font-mono text-sm">→</span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Footer />
    </div>
  );
}
