"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Hexagon,
  Crown,
  SplitSquareVertical,
  Target,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import SponsorButton from "@/components/ui/sponser-btn";
const DATA = [
  {
    id: "platinum",
    title: "Level_01: Platinum",
    icon: <Crown className="text-red-600 w-3 h-3 md:w-4 md:h-4" />,
    color: "from-red-600/20 to-transparent",
    sponsors: [
      {
        name: "DONGFENG MOTOR",
        logo: "/sponsers/sp1.png",
        tag: "Automotive & Infrastructure",
        website: "https://www.dongfeng-global.com/",
        bio: "Global automotive leader focused on innovative vehicle manufacturing, sustainable infrastructure solutions, and smart mobility technologies.",
      },
      {
        name: "Radiant Pharmaceuticals",
        logo: "/sponsers/sp2.png",
        tag: "Healthcare & Security",
        website: "https://www.radiantpharmabd.com/",
        bio: "Leading pharmaceutical company specializing in high-quality medicine production, healthcare solutions, and supply chain security for the medical sector.",
      },
    ],
  },
  {
    id: "diamond",
    title: "Level_02: Diamond",
    icon: <Hexagon className="text-white w-3 h-3 md:w-4 md:h-4" />,
    color: "from-white/10 to-transparent",
    sponsors: [
      {
        name: "SEVEN RINGS CEMENT",
        logo: "/sponsers/sp3.png",
        tag: "Construction & Materials",
        website: "https://sevenringscement.com/",
        bio: "A premier cement manufacturer delivering innovative construction materials and sustainable building solutions across international markets.",
      },
      {
        name: "Dassault Systèmes",
        logo: "/sponsers/sp4.png",
        tag: "Software & Cloud Solutions",
        website: "https://www.3ds.com/",
        bio: "Global leader in 3D design, engineering software, and cloud-based simulation solutions enabling next-generation product development.",
      },
    ],
  },
  {
    id: "gold",
    title: "Level_03: Gold",
    icon: (
      <SplitSquareVertical className="text-white/40 w-3 h-3 md:w-4 md:h-4" />
    ),
    color: "from-white/5 to-transparent",
    sponsors: [
      {
        name: "RAPID HARNESS",
        logo: "/sponsers/sp5.png",
        tag: "Electrical & Aerospace",
        website: "https://rapidharness.com/",
        bio: "Specializes in high-performance wiring harnesses for aerospace and industrial applications, ensuring reliability in critical systems.",
      },
      {
        name: "VENTRA INTERNATIONAL",
        logo: "/sponsers/sp6.png",
        tag: "Energy & Industrial Solutions",
        website: "https://ventra-international.com/",
        bio: "Global energy solutions provider focused on renewable energy systems, industrial efficiency, and innovative power management technologies.",
      },
    ],
  },
];

export default function PremiumPartners() {
  const [activeTier, setActiveTier] = useState(DATA[0]);

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-red-500/30 font-mono overflow-x-hidden">
      {/* 1. STICKY TIER NAV */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a] border-y border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar">
          {DATA.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier)}
              className={`flex-1 min-w-37.5 py-6 px-8 border-r border-white/5 transition-all relative group overflow-hidden ${
                activeTier.id === tier.id
                  ? "bg-white/2"
                  : "hover:bg-white/1"
              }`}
            >
              <div className="relative z-10 flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${
                    activeTier.id === tier.id ? "text-red-500" : "text-white/40"
                  }`}
                >
                  {tier.title}
                </span>
                {tier.icon}
              </div>
              {activeTier.id === tier.id && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 shadow-[0_0_15px_#ef4444]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PARTNER GRID */}
      <main className="max-w-7xl mx-auto border-x border-white/5 min-h-screen p-6 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-1"
          >
            {activeTier.sponsors.map((sponsor) => (
              <div
                key={sponsor.name}
                className="group relative border border-white/5 bg-[#080808] p-8 md:p-12 hover:bg-white/2 transition-colors"
              >
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-red-600/0 group-hover:border-red-600/50 transition-all" />

                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-12">
                    <div className="relative rounded ml-4 scale-140 bg-white w-20 h-20 md:w-24 md:h-24  transition-all">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={sponsor.website}
                        className="p-2 border border-white/10 rounded-sm hover:border-red-500 hover:text-red-500 transition-all"
                      >
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-4xl font-black tracking-tighter uppercase group-hover:text-red-500 transition-colors">
                      {sponsor.name}
                    </h2>
                    <p className="text-white/40 text-xs leading-relaxed max-w-sm font-sans">
                      {sponsor.bio} This partner provides critical support for
                      network performance and infrastructure optimization.
                    </p>
                  </div>

                  <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between">
                    {/* <span className="text-[8px] text-white/20 uppercase">Registry_UID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span> */}
                    <Link
                      href={sponsor.website}
                      className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:text-white transition-colors"
                    >
                      Access_Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* 4. CTA BANNER */}
      <section className="bg-red-600 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-red-200 text-xs uppercase tracking-widest font-black mb-3">Partner With Us</p>
            <h3 className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white leading-tight mb-4">
              Become a<br />Sponsor
            </h3>
            <ul className="space-y-2 text-red-100 text-sm">
              <li className="flex items-center gap-2"><span className="text-white text-xs">▶</span> Brand visibility on car &amp; team kit</li>
              <li className="flex items-center gap-2"><span className="text-white text-xs">▶</span> Direct access to top engineering talent</li>
              <li className="flex items-center gap-2"><span className="text-white text-xs">▶</span> Long-term strategic collaboration</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-red-100 text-sm max-w-sm">
              Sponsorship tiers are limited. Applications are reviewed based on strategic alignment and impact potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href="/sponsorship-proposal.pdf"
                download
                className="cta-btn bg-white text-red-600 hover:bg-red-50"
              >
                Download Proposal (PDF)
              </a>
              <SponsorButton />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
