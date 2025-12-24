"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Linkedin, ExternalLink, ShieldCheck, Zap } from "lucide-react";

// --- Color Mapping to fix Tailwind JIT issues ---
const TIER_STYLES = {
  red: {
    text: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
    hoverBg: "hover:bg-red-600",
    shadow: "hover:shadow-red-200/50",
    accent: "bg-red-600",
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    hoverBg: "hover:bg-blue-600",
    shadow: "hover:shadow-blue-200/50",
    accent: "bg-blue-600",
  },
};

const PARTNERS_DATA = [
  {
    tier: "Platinum",
    description: "The cornerstone organizations powering our technical vision.",
    gridCols: "grid-cols-1 lg:grid-cols-2",
    tierColor: "red",
    sponsors: [
      {
        id: 1,
        name: "TechGiant Corp",
        logo: "/sponsers/sp1.png",
        website: "https://techgiant.com",
        linkedin: "https://linkedin.com/company/techgiant",
        bio: "A global leader in sustainable high-performance computing and hardware engineering.",
        relationship:
          "Official hardware partner providing specialized micro-controllers.",
      },
      {
        id: 2,
        name: "Cloud Systems",
        logo: "/sponsers/sp2.png",
        website: "https://cloudsys.io",
        linkedin: "https://linkedin.com/company/cloudsys",
        bio: "Specializing in decentralized infrastructure and rapid-deployment dev-ops.",
        relationship: "Exclusive cloud-credit provider for student projects.",
      },
    ],
  },
  {
    tier: "Diamond",
    description: "Elite technical collaborators driving innovation.",
    gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    tierColor: "blue",
    sponsors: [
      {
        id: 3,
        name: "Precision Eng",
        logo: "/sponsers/sp3.png",
        website: "#",
        linkedin: "#",
        bio: "Precision manufacturing and aerospace consultancy specializing in CAD optimization.",
        relationship: "Technical mentors for design tracks.",
      },
    ],
  },
];

const SponsorCard = ({ sponsor, tierColor }) => {
  const styles = TIER_STYLES[tierColor] || TIER_STYLES.red;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm transition-all duration-500 ${styles.shadow}`}
    >
      <div className="relative h-56 flex items-center justify-center bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
          <InteractiveGridPattern squares={[10, 10]} />
        </div>
        <div
          className={`absolute top-4 left-4 w-2 h-2 rounded-full ${styles.accent} opacity-20`}
        />

        <div className="relative z-10 w-full p-12">
          <div className="relative h-20 w-full transition-transform duration-700 group-hover:scale-110">
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              fill
              className="object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col grow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-2xl font-black text-slate-900 leading-none">
              {sponsor.name}
            </h4>
            <div
              className={`mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md ${styles.bg} ${styles.text} text-[10px] font-bold uppercase tracking-tighter`}
            >
              <ShieldCheck size={10} /> {tierColor} Partner
            </div>
          </div>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
          {sponsor.bio}
        </p>

        <div className="mt-auto space-y-6">
          <div className="relative p-4 rounded-xl bg-slate-50/80 border border-slate-100 italic">
            <span className="absolute -top-2 -left-1 text-3xl text-slate-200 font-serif leading-none">
              “
            </span>
            <p className="text-slate-600 text-xs leading-snug relative z-10 uppercase tracking-wide font-semibold">
              {sponsor.relationship}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={sponsor.website}
              target="_blank"
              className={`grow h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${styles.hoverBg} active:scale-95`}
            >
              Portal <ExternalLink size={14} />
            </a>
            <a
              href={sponsor.linkedin}
              className="w-12 h-12 inline-flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-blue-50 transition-all"
            >
              <Linkedin size={18} fill="currentColor" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-950 selection:bg-red-600 selection:text-white">
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/carhero.png"
            alt="MIST Blitz Car"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-red-950 via-slate-950/20 to-transparent" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/70">
              Partnership Program 2025
            </span>
          </motion.div>

          <h1 className="text-[12vw] lg:text-[10rem] font-black tracking-[ -0.05em] leading-[0.8] mb-8 text-white uppercase">
            POWERING <br />
            <span className="text-red-600 italic">THE GRID</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base font-medium tracking-wide leading-relaxed">
            Bridging the gap between{" "}
            <span className="text-white">academic brilliance</span> and
            <span className="text-white">
              {" "}
              industrial powerhouse engineering
            </span>
            .
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="w-1 h-20 bg-linear-to-b from-red-600 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 80] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </div>
      </section>
      <main className="max-w-7xl mx-auto px-6 py-32">
        {PARTNERS_DATA.map((tier, idx) => {
          const styles = TIER_STYLES[tier.tierColor];
          return (
            <section key={tier.tier} className="mb-48 last:mb-0">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="max-w-2xl">
                  <div
                    className={`flex items-center gap-2 ${styles.text} font-mono text-sm font-bold mb-4`}
                  >
                    <Zap size={16} fill="currentColor" /> Tier 0{idx + 1}
                  </div>
                  <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-slate-900 mb-6">
                    {tier.tier}
                  </h3>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed">
                    {tier.description}
                  </p>
                </div>
                <div className="hidden lg:block h-px grow bg-slate-200 mx-12 mb-6" />
              </div>
              <div className={`grid gap-8 ${tier.gridCols}`}>
                {tier.sponsors.map((sponsor) => (
                  <SponsorCard
                    key={sponsor.id}
                    sponsor={sponsor}
                    tierColor={tier.tierColor}
                  />
                ))}
              </div>
            </section>
          );
        })}
        <section className="mt-60 relative group">
          <div className="absolute inset-0 bg-red-600 rounded-[3rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="relative bg-slate-950 rounded-[3rem] p-12 md:p-24 overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <InteractiveGridPattern />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <h4 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-10 leading-[0.9]">
                DRIVE THE <br />
                <span className="text-red-600 italic">FUTURE.</span>
              </h4>
              <p className="text-slate-400 max-w-lg mb-12 text-sm md:text-base font-medium">
                Join our ecosystem and gain exclusive access to the next
                generation of mechanical and robotics talent.
              </p>
              <button className="group/btn relative px-12 py-6 bg-red-600 hover:bg-white text-white hover:text-slate-950 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-2xl shadow-red-900/20">
                Request Prospectus
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
