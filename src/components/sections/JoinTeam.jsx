"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, Zap, Settings, DollarSign, Package, FileText, Presentation, Camera, Users } from "lucide-react";

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show:   { y: 0, opacity: 1 },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

const TECH_DEPTS = [
  {
    icon: Settings,
    title: "Chassis & Aerodynamics",
    desc: "Engineering lightweight spaceframes and aero packages for peak cornering performance.",
    skills: ["SolidWorks", "FEA", "TIG Welding", "CFD"],
  },
  {
    icon: Wrench,
    title: "Suspension, Steering & Braking",
    desc: "Optimizing vehicle kinematics through damping, precision steering, and thermal braking systems.",
    skills: ["Vehicle Dynamics", "Kinematics", "CAD", "Testing"],
  },
  {
    icon: Settings,
    title: "Powertrain",
    desc: "Managing power delivery, engine calibration, transmission efficiency, and cooling cycles.",
    skills: ["Engine Tuning", "Thermodynamics", "Fabrication", "Dyno Testing"],
  },
  {
    icon: Zap,
    title: "Electronics & DAQ",
    desc: "Implementing sensor fusion, live telemetry, and custom wire harness architecture.",
    skills: ["PCB Design", "Embedded C", "CAN Bus", "MATLAB"],
  },
];

const MGMT_DEPTS = [
  { icon: Users,        title: "Management",               desc: "Strategic oversight and cross-departmental coordination." },
  { icon: DollarSign,   title: "Finance",                  desc: "Budget management, sponsorship inflows, and procurement." },
  { icon: Package,      title: "Logistics",                desc: "Supply chain and international vehicle transit operations." },
  { icon: FileText,     title: "Documentation",            desc: "Engineering design reports and regulatory compliance." },
  { icon: Presentation, title: "Business Plan",            desc: "Engineering value translated into viable market models." },
  { icon: Camera,       title: "Media",                    desc: "Brand identity, visual storytelling, and social content." },
];

export default function JoinBlitzTeam() {
  return (
    <section className="relative bg-[#050505] border-t border-white/5 py-24 px-4 md:px-8 selection:bg-red-600 selection:text-white overflow-hidden">

      {/* Dot grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-widest text-red-500 mb-3"
            >
              Open Positions
            </motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter text-white"
            >
              TEAM <span className="text-red-600">BLITZ</span>
            </motion.h2>
          </div>

          <motion.p variants={fadeUp} transition={{ duration: 0.6 }}
            className="text-white/30 text-sm font-mono uppercase tracking-wider max-w-xs md:text-right leading-relaxed"
          >
            We recruit across engineering and management. Find your division.
          </motion.p>
        </motion.div>

        {/* Technical Teams */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-red-500">Technical Divisions</span>
            <div className="h-px w-12 bg-red-600/40" />
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5"
          >
            {TECH_DEPTS.map((dept, i) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={dept.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="group bg-[#050505] hover:bg-white/3 p-7 flex flex-col gap-5 transition-colors duration-300 relative"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border border-red-600/30 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                      <Icon size={16} className="text-red-500 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-mono text-[9px] text-white/15 uppercase tracking-widest">
                      0{i + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black italic uppercase text-white text-base tracking-tight leading-snug mb-2 group-hover:text-red-500 transition-colors duration-200">
                      {dept.title}
                    </h3>
                    <p className="text-white/35 text-xs leading-relaxed">
                      {dept.desc}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {dept.skills.map((s) => (
                      <span key={s} className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 border border-white/10 text-white/25 group-hover:border-red-600/30 group-hover:text-white/40 transition-colors">
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Management Teams */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-white/5" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">Management Divisions</span>
            <div className="h-px w-12 bg-white/10" />
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5"
          >
            {MGMT_DEPTS.map((dept) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={dept.title}
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  className="group bg-[#050505] hover:bg-white/3 p-5 flex flex-col gap-4 transition-colors duration-300"
                >
                  <Icon size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
                  <div>
                    <h4 className="font-black italic uppercase text-white text-xs tracking-tight mb-1.5 group-hover:text-white transition-colors">
                      {dept.title}
                    </h4>
                    <p className="text-white/25 text-[11px] leading-relaxed group-hover:text-white/40 transition-colors">
                      {dept.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="border border-white/8 p-10 md:p-14 relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 h-full w-1 bg-red-600" />
          <div className="absolute left-0 top-0 w-64 h-full bg-red-600/5 pointer-events-none" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-red-500 mb-4">Applications Open</p>
              <h3 className="text-3xl md:text-5xl font-black italic uppercase leading-none tracking-tighter text-white mb-4">
                Ready to <span className="text-red-600">Join?</span>
              </h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                Become part of Bangladesh&apos;s premier Formula Student team. Applications are open across all divisions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 md:justify-end">
              <Link
                href="/join-us"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest px-8 py-4 transition-colors"
              >
                Apply Now →
              </Link>
              <a
                href="mailto:info@mistblitz.com"
                className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-red-600 text-white/50 hover:text-white font-black text-xs uppercase tracking-widest px-8 py-4 transition-all"
              >
                Email Us
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
