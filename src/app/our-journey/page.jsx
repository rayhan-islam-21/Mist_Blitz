"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Users, Wrench, Flag, Medal, Star, ChevronRight } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const journeyData = {
  2021: {
    year: "2021",
    round: "Season 01",
    heroImage: "/team.jpg",
    tagline: "Where it all began.",

    teamFormation: {
      founded: "April 2021",
      totalMembers: 12,
      summary:
        "MIST Blitz was conceived by a group of 12 passionate engineering students at the Military Institute of Science and Technology (MIST). The founding team established the core structure, secured a dedicated workshop space, and laid down the operational framework for Bangladesh's first Formula Student team.",
      departments: [
        { name: "Chassis & Frame", count: 3 },
        { name: "Powertrain", count: 2 },
        { name: "Electronics", count: 2 },
        { name: "Management", count: 3 },
        { name: "Documentation", count: 2 },
      ],
      leadership: [
        { role: "Team Principal", name: "—" },
        { role: "Chief Engineer", name: "—" },
        { role: "Technical Director", name: "—" },
      ],
    },

    milestones: [
      "Official team registration at MIST",
      "Secured dedicated workshop space on campus",
      "Completed first full CAD model of race car",
      "Established 5 core technical departments",
      "First team presentation to faculty sponsors",
      "Began procurement of raw materials",
    ],

    fabrication: {
      car: "Concept Prototype (Unnamed)",
      summary: "The first season focused entirely on design validation and concept development. No physical car was completed — the team spent the year establishing workflows, learning tools, and validating their design approach.",
      phases: [
        {
          name: "Design",
          status: "completed",
          details: "Full vehicle CAD model designed in SolidWorks. Chassis geometry and suspension pickup points defined.",
        },
        {
          name: "Analysis",
          status: "completed",
          details: "Basic FEA on chassis tubes. Suspension kinematics simulated in OptimumKinematics.",
        },
        {
          name: "Manufacturing",
          status: "partial",
          details: "Chassis jig fabricated. Steel tube cutting and bending began. Full car not completed this season.",
        },
        {
          name: "Testing",
          status: "not-started",
          details: "No vehicle testing conducted. Dynamic testing planned for next season.",
        },
      ],
    },

    competitions: {
      participated: [],
      note: "No competition entries in the founding season. Team focused entirely on preparation and design.",
    },

    achievements: [
      { type: "recognition", title: "Official MIST Motorsport Club Recognition", desc: "Formally recognized by MIST authorities as an official engineering club." },
      { type: "award", title: "Best New Initiative — MIST Engineering Fest 2021", desc: "Awarded best new technical initiative among student clubs." },
    ],
  },

  2022: {
    year: "2022",
    round: "Season 02",
    heroImage: "/car2.jpg",
    tagline: "The first machine rolls.",

    teamFormation: {
      founded: "Ongoing (2021)",
      totalMembers: 30,
      summary:
        "The team grew from 12 to 30+ members as MIST Blitz completed its first full race car. New recruits joined the chassis, powertrain, and electronics teams. The management and media departments were formally established this season.",
      departments: [
        { name: "Chassis & Aerodynamics", count: 6 },
        { name: "Suspension, Steering & Braking", count: 5 },
        { name: "Powertrain", count: 5 },
        { name: "Electronics & DAQ", count: 4 },
        { name: "Management & Finance", count: 5 },
        { name: "Media & Documentation", count: 5 },
      ],
      leadership: [
        { role: "Team Principal", name: "—" },
        { role: "Chief Engineer", name: "—" },
        { role: "Vehicle Dynamics Lead", name: "—" },
      ],
    },

    milestones: [
      "First complete race car fabricated in-house",
      "Team size grew to 30+ members",
      "Successful engine start — KTM 450 powerplant",
      "First driver seat fitting and ergonomics validation",
      "Full suspension geometry finalized and built",
      "Completed first shakedown run on campus",
    ],

    fabrication: {
      car: "Blitz Mk.I",
      summary:
        "Blitz Mk.I was the team's first complete race car, built entirely in-house using a steel spaceframe chassis. The car featured a KTM single-cylinder engine, double wishbone suspension, and basic electronics.",
      phases: [
        {
          name: "Design",
          status: "completed",
          details: "Full vehicle redesigned with driver ergonomics. Suspension pickup points optimized. Chassis tubes sized through FEA.",
        },
        {
          name: "Analysis",
          status: "completed",
          details: "Full chassis FEA completed. Suspension kinematics validated. Weight distribution calculated at 42:58 F:R.",
        },
        {
          name: "Manufacturing",
          status: "completed",
          details: "Steel spaceframe TIG welded by student team. Custom suspension uprights machined in MIST workshop. Brake system assembled.",
        },
        {
          name: "Testing",
          status: "completed",
          details: "Shakedown run completed on campus. Brake bias adjusted. Driver comfort validated through 4 test sessions.",
        },
      ],
    },

    competitions: {
      participated: [],
      note: "No international competition this season. Team focused on completing and testing the first car. Local demonstration run held at MIST campus.",
    },

    achievements: [
      { type: "award", title: "1st Formula Student Car in Bangladesh", desc: "Blitz Mk.I became the first Formula Student specification car ever built in Bangladesh." },
      { type: "recognition", title: "MIST Best Technical Project 2022", desc: "Recognized as the best technical student project at MIST annual presentation." },
      { type: "recognition", title: "Featured in National Engineering News", desc: "Coverage by national engineering publications for pioneering motorsport in Bangladesh." },
    ],
  },

  2023: {
    year: "2023",
    round: "Season 03",
    heroImage: "/china4.jpg",
    tagline: "Bangladesh meets the world.",

    teamFormation: {
      founded: "Ongoing (2021)",
      totalMembers: 50,
      summary:
        "Season 03 saw the team scale to over 50 members with dedicated sub-teams for each competition discipline. International competition preparation drove major structural improvements. A dedicated Business Plan Presentation (BPP) team was formed to prepare for static events.",
      departments: [
        { name: "Chassis & Aerodynamics", count: 8 },
        { name: "Suspension, Steering & Braking", count: 7 },
        { name: "Powertrain", count: 8 },
        { name: "Electronics & DAQ", count: 7 },
        { name: "Management & Finance", count: 8 },
        { name: "Media & Documentation", count: 6 },
        { name: "Business Plan Presentation", count: 6 },
      ],
      leadership: [
        { role: "Team Principal", name: "—" },
        { role: "Chief Engineer", name: "—" },
        { role: "Competition Manager", name: "—" },
      ],
    },

    milestones: [
      "First international competition entry confirmed — FSC China",
      "Team expanded to 50+ members",
      "Blitz Mk.II completed ahead of schedule",
      "Design Event documentation submitted to Formula Student China",
      "Secured major sponsorship from 3 corporate partners",
      "International travel logistics managed for first time",
    ],

    fabrication: {
      car: "Blitz Mk.II",
      summary:
        "Blitz Mk.II was a refined evolution of Mk.I with a lighter chassis, improved suspension geometry, and upgraded braking system. Weight was reduced by 15% through optimized tube layout and component selection.",
      phases: [
        {
          name: "Design",
          status: "completed",
          details: "Chassis redesigned with optimized triangulation. Reduced tube count while improving structural rigidity. Aerodynamic bodywork added.",
        },
        {
          name: "Analysis",
          status: "completed",
          details: "Full multibody dynamics simulation in ADAMS. CFD analysis on body panels. Brake thermal analysis completed.",
        },
        {
          name: "Manufacturing",
          status: "completed",
          details: "15% weight reduction achieved. Suspension arms CNC machined. Brake calipers upgraded. Wiring harness redesigned from scratch.",
        },
        {
          name: "Testing",
          status: "completed",
          details: "8 test sessions completed. Skidpad and acceleration tests benchmarked. 500km total test mileage logged.",
        },
      ],
    },

    competitions: {
      participated: [
        {
          name: "Formula Student China (FSC) 2023",
          location: "Xiangyang, China",
          date: "July 2023",
          events: ["Engineering Design Event", "Cost & Manufacturing Analysis", "Business Plan Presentation", "Acceleration", "Skidpad", "Autocross"],
          result: "Competed — Design event recognized",
          ranking: "Classified Finisher",
        },
      ],
    },

    achievements: [
      { type: "award", title: "Design Event Recognition — FSC China 2023", desc: "MIST Blitz received recognition from international judges for engineering design quality." },
      { type: "recognition", title: "First Bangladeshi Team at Formula Student China", desc: "Became the first team from Bangladesh to compete at an international Formula Student event." },
      { type: "award", title: "Best Newcomer — FSC 2023", desc: "Acknowledged among best-performing first-year teams at Formula Student China." },
    ],
  },

  2024: {
    year: "2024",
    round: "Season 04",
    heroImage: "/car2.jpg",
    tagline: "Furiosa 1.0 — engineered to race.",

    teamFormation: {
      founded: "Ongoing (2021)",
      totalMembers: 55,
      summary:
        "Season 04 brought the most mature team structure yet. Each department operated with defined sub-leads, clear deliverables, and a competition-grade documentation system. The team trained in scrutineering procedures and ran mock static events internally before the competition.",
      departments: [
        { name: "Chassis & Aerodynamics", count: 9 },
        { name: "Suspension, Steering & Braking", count: 8 },
        { name: "Powertrain", count: 9 },
        { name: "Electronics, DAQ & Software", count: 8 },
        { name: "Management & Finance", count: 9 },
        { name: "Media & Documentation", count: 6 },
        { name: "Business Plan Presentation", count: 6 },
      ],
      leadership: [
        { role: "Team Principal", name: "—" },
        { role: "Chief Engineer", name: "—" },
        { role: "Technical Director", name: "—" },
        { role: "Competition Manager", name: "—" },
      ],
    },

    milestones: [
      "FURIOSA 1.0 — ground-up redesign completed",
      "KTM 390 Duke engine selected and integrated",
      "Full data acquisition system installed and tested",
      "Best shakedown results in team history",
      "Passed international scrutineering at FSC China 2024",
      "Achieved peak power output of 33.8kW at 8,500rpm",
    ],

    fabrication: {
      car: "FURIOSA 1.0",
      summary:
        "FURIOSA 1.0 is a ground-up redesign and the most technically advanced car the team has ever built. Powered by a KTM 390 Duke engine, the car features a steel spaceframe chassis, double wishbone pushrod suspension, and a full data acquisition system.",
      specs: [
        { label: "Engine", value: "KTM 390 Duke — 373.3cc Single" },
        { label: "Peak Power", value: "33.8 kW @ 8,500 rpm" },
        { label: "Peak Torque", value: "39 Nm @ 6,500 rpm" },
        { label: "Chassis", value: "Steel Spaceframe" },
        { label: "Suspension", value: "Double Wishbone Pushrod (F&R)" },
        { label: "Brakes", value: "Hydraulic Disc — 4 Wheel" },
        { label: "Tyres", value: "Apollo Amazer 4G Life R13" },
        { label: "Weight", value: "290 kg (40:60 F:R Distribution)" },
      ],
      phases: [
        {
          name: "Design",
          status: "completed",
          details: "Complete vehicle redesign. Chassis optimized for KTM 390 Duke packaging. New suspension geometry with pushrod actuation. Ergonomics verified against 95th percentile driver.",
        },
        {
          name: "Analysis",
          status: "completed",
          details: "Full FEA on chassis and suspension. CFD on body panels. Brake thermal analysis. ADAMS simulation with 6-DOF dynamics model.",
        },
        {
          name: "Manufacturing",
          status: "completed",
          details: "All chassis tubes TIG welded in-house. CNC machined uprights and hubs. Custom wiring harness. Full DAQ system integration.",
        },
        {
          name: "Testing",
          status: "completed",
          details: "12 test sessions. Full competition simulation runs. DAQ data analysis after each run. Final setup locked before shipping to China.",
        },
      ],
    },

    competitions: {
      participated: [
        {
          name: "Formula Student China (FSC) 2024",
          location: "Xiangyang, China",
          date: "July 2024",
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
          result: "Passed Scrutineering · Competed in all dynamic events",
          ranking: "Best result in team history",
        },
      ],
    },

    achievements: [
      { type: "award", title: "Best Dynamic Result in Team History — FSC China 2024", desc: "FURIOSA 1.0 posted the best dynamic event scores ever recorded by the team." },
      { type: "recognition", title: "Passed International Scrutineering", desc: "First time MIST Blitz passed all scrutineering checks on first attempt at an international event." },
      { type: "award", title: "Design Event Commendation — FSC 2024", desc: "International judges commended the engineering quality and documentation of FURIOSA 1.0." },
      { type: "recognition", title: "Featured in Formula Student Official Media", desc: "MIST Blitz featured by Formula Student China official channels as a noteworthy team." },
    ],
  },
};

const years = [2021, 2022, 2023, 2024];

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    completed: { label: "Completed", cls: "bg-green-900/40 text-green-400 border-green-700/40" },
    partial: { label: "Partial", cls: "bg-yellow-900/40 text-yellow-400 border-yellow-700/40" },
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
function SectionHeader({ icon: Icon, label, title }) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="w-10 h-10 bg-red-600 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-500 mb-1">{label}</p>
        <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-white">{title}</h3>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function OurJourneyPage() {
  const [activeYear, setActiveYear] = useState(2024);
  const data = journeyData[activeYear];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-[70vh] flex flex-col justify-end overflow-hidden">
        <Image src={data.heroImage} fill alt="journey" className="object-cover opacity-35 transition-all duration-700" priority />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />

        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />

        <div className="relative z-10 px-6 md:px-16 pb-0 pt-28">
          <motion.div key={activeYear} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-red-600" />
              <span className="font-mono text-red-500 text-xs uppercase tracking-[0.4em]">MIST Blitz · Our Journey</span>
            </div>
            <h1 className="text-[12vw] md:text-[9vw] font-black italic uppercase leading-none tracking-tighter text-white">
              Our <span className="text-red-600">Journey</span>
            </h1>
            <p className="text-white/40 text-base md:text-lg mt-4 max-w-lg font-light">{data.tagline}</p>
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
                  activeYear === yr
                    ? "text-white"
                    : "text-white/25 hover:text-white/60"
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
              <SectionHeader icon={Users} label="01 · Team Formation" title="The People Behind the Machine" />
              <div className="grid md:grid-cols-3 gap-6">
                {/* Summary + leadership */}
                <div className="md:col-span-2 space-y-6">
                  <p className="text-white/60 leading-relaxed text-base">{data.teamFormation.summary}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-white/10 p-5">
                      <p className="text-4xl font-black italic text-red-600">{data.teamFormation.totalMembers}+</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-1">Total Members</p>
                    </div>
                    <div className="border border-white/10 p-5">
                      <p className="text-4xl font-black italic text-white">{data.teamFormation.founded}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-1">Season Start</p>
                    </div>
                  </div>
                  {/* Leadership */}
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
                          <div className="h-px w-10 bg-red-600/40" style={{ width: `${d.count * 6}px` }} />
                          <span className="font-mono text-xs text-red-600 font-bold">{d.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── 2. MAJOR MILESTONES ── */}
            <section>
              <SectionHeader icon={Star} label="02 · Major Milestones" title="Defining Moments" />
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
              <SectionHeader icon={Wrench} label="03 · Fabrication & Build" title={`Car: ${data.fabrication.car}`} />
              <div className="space-y-8">
                <p className="text-white/60 leading-relaxed text-base max-w-3xl">{data.fabrication.summary}</p>

                {/* Specs (2024 only) */}
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

                {/* Design → Analysis → Manufacturing → Testing */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/25 mb-5">Build Process</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                    {data.fabrication.phases.map((phase, i) => (
                      <div key={i} className={`relative border border-white/10 p-6 group hover:border-red-600/40 transition-colors ${i > 0 ? "md:border-l-0" : ""}`}>
                        {/* Arrow connector */}
                        {i < data.fabrication.phases.length - 1 && (
                          <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-[#0a0a0a] border border-red-600/30 items-center justify-center">
                            <ChevronRight size={12} className="text-red-600" />
                          </div>
                        )}
                        {/* Phase number watermark */}
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
              <SectionHeader icon={Flag} label="04 · Competitions" title="Events & Results" />
              {data.competitions.participated.length === 0 ? (
                <div className="border border-white/10 p-8 text-center">
                  <Flag size={32} className="text-white/10 mx-auto mb-4" />
                  <p className="text-white/30 text-sm font-mono uppercase tracking-wider">{data.competitions.note}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {data.competitions.participated.map((comp, i) => (
                    <div key={i} className="border border-white/10 hover:border-red-600/30 transition-colors overflow-hidden">
                      {/* Header */}
                      <div className="bg-zinc-900 px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="font-black italic uppercase text-xl text-white tracking-tight">{comp.name}</h4>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="font-mono text-xs text-white/35 uppercase tracking-wider">{comp.location}</span>
                            <span className="font-mono text-xs text-white/35">·</span>
                            <span className="font-mono text-xs text-white/35 uppercase tracking-wider">{comp.date}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-red-500 font-mono text-xs uppercase tracking-widest">{comp.ranking}</p>
                        </div>
                      </div>
                      {/* Body */}
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
                  {data.competitions.note && (
                    <p className="text-white/25 font-mono text-xs uppercase tracking-wider">{data.competitions.note}</p>
                  )}
                </div>
              )}
            </section>

            {/* ── 5. ACHIEVEMENTS ── */}
            <section>
              <SectionHeader icon={Trophy} label="05 · Achievements" title="Awards & Recognition" />
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

          {/* ── SEASON NAV BAR ── */}
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
