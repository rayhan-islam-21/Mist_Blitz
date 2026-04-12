"use client";

import { motion } from "framer-motion";
import { Trophy, Flag, Users, Wrench, Timer, CheckCircle } from "lucide-react";

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show:   { y: 0, opacity: 1 },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

const achievements = [
  {
    icon: Flag,
    stat: "#1",
    label: "Bangladeshi Team",
    detail: "First Formula Student team from Bangladesh to compete on the international stage.",
    accent: true,
  },
  {
    icon: Trophy,
    stat: "FSC",
    label: "China 2025",
    detail: "Competed at Formula Student China at the Zhuhai International Circuit.",
    accent: false,
  },
  {
    icon: CheckCircle,
    stat: "100%",
    label: "Scrutineering Pass",
    detail: "Passed full technical scrutineering — the toughest gate in any Formula Student event.",
    accent: false,
  },
  {
    icon: Timer,
    stat: "22km",
    label: "Endurance Run",
    detail: "Completed the grueling 22km endurance event against 76 international teams.",
    accent: false,
  },
  {
    icon: Users,
    stat: "50+",
    label: "Engineers",
    detail: "Cross-disciplinary team spanning mechanical, electronics, and software divisions.",
    accent: false,
  },
  {
    icon: Wrench,
    stat: "<1yr",
    label: "Build Time",
    detail: "Designed, manufactured, and validated a full race car in under one year.",
    accent: false,
  },
];

export default function KeyHighlights() {
  return (
    <section className="bg-[#050505] border-t border-white/5 py-24 px-4 md:px-8 selection:bg-red-600 selection:text-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16"
        >
          <div>
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }}
              className="font-mono text-[10px] uppercase tracking-widest text-red-500 mb-3"
            >
              Milestones &amp; Records
            </motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-black italic uppercase leading-none tracking-tighter text-white"
            >
              Key <span className="text-red-600">Highlights</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }}
            className="text-white/30 text-sm font-mono uppercase tracking-wider max-w-xs md:text-right"
          >
            What we&apos;ve accomplished in our debut season.
          </motion.p>
        </motion.div>

        {/* Featured banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative border border-white/10 overflow-hidden mb-4 p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-16"
        >
          {/* Red left bar */}
          <div className="absolute left-0 top-0 h-full w-1 bg-red-600" />

          {/* Bg glow */}
          <div className="absolute left-0 top-0 w-64 h-full bg-red-600/5 pointer-events-none" />

          <div className="shrink-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-red-500 mb-2">Historic Achievement</p>
            <p className="font-black italic uppercase text-5xl md:text-7xl text-white leading-none tracking-tighter">
              MIST<br />BLITZ
            </p>
          </div>

          <div className="w-px h-16 bg-white/10 hidden md:block" />

          <div className="flex-1">
            <p className="text-white/80 text-base md:text-lg font-medium leading-relaxed mb-4">
              Bangladesh&apos;s first Formula Student team to pass full technical
              scrutineering and complete endurance laps at an international Formula
              Student competition — FSC China 2025, Zhuhai International Circuit.
            </p>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                Formula Student China · Zhuhai · 2025
              </span>
            </div>
          </div>

          {/* Corner label */}
          <div className="shrink-0 hidden md:flex flex-col items-end gap-1 self-end">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">Competing Against</span>
            <span className="font-black italic text-4xl text-white/10">76</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">International Teams</span>
          </div>
        </motion.div>

        {/* Achievement grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5"
        >
          {achievements.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className={`group relative flex flex-col p-6 md:p-8 transition-colors duration-300 ${
                  item.accent ? "bg-red-600 hover:bg-red-700" : "bg-[#050505] hover:bg-white/3"
                }`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                  <Icon
                    size={18}
                    className={item.accent ? "text-white/70" : "text-red-600"}
                  />
                  <span className={`font-mono text-[9px] uppercase tracking-widest ${
                    item.accent ? "text-white/50" : "text-white/20"
                  }`}>
                    0{i + 1}
                  </span>
                </div>

                {/* Stat */}
                <p className={`font-black italic text-4xl md:text-5xl leading-none tracking-tighter mb-2 ${
                  item.accent ? "text-white" : "text-white"
                }`}>
                  {item.stat}
                </p>

                {/* Label */}
                <p className={`font-mono text-[10px] uppercase tracking-widest mb-4 ${
                  item.accent ? "text-white/70" : "text-red-500"
                }`}>
                  {item.label}
                </p>

                {/* Detail */}
                <p className={`text-xs leading-relaxed mt-auto ${
                  item.accent ? "text-white/60" : "text-white/30"
                }`}>
                  {item.detail}
                </p>

                {/* Hover accent line (non-featured cards) */}
                {!item.accent && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
