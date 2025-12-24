"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Linkedin, Hexagon, Zap, Crown, SplitSquareVertical } from "lucide-react";

const DATA = [
  {
    id: "platinum",
    title: "Platinum",
    icon: <Crown className="text-yellow-400 w-4 h-4" />,
    color: "from-yellow-400 to-orange-500",
    sponsors: [
      { name: "OmniCore", logo: "/sponsers/sp1.png", tag: "Infrastructure", bio: "Leading the charge in quantum-ready server architectures." },
      { name: "Vanguard", logo: "/sponsers/sp2.png", tag: "Security", bio: "Zero-trust deployment protocols for the next billion users." }
    ]
  },
  {
    id: "diamond",
    title: "Diamond",
    icon: <Hexagon className="text-cyan-400 w-4 h-4" />,
    color: "from-cyan-400 to-blue-600",
    sponsors: [
      { name: "Precision", logo: "/sponsers/sp3.png", tag: "Logic", bio: "Advanced CAD optimization and material science." }
    ]
  },
  {
    id: "gold",
    title: "Gold",
    icon: <SplitSquareVertical className="text-red-600 w-4 h-4" />,
    color: "from-red-500 to-rose-700",
    sponsors: [
      { name: "Apex", logo: "/sponsers/sp3.png", tag: "Aerospace", bio: "Propelling orbital logistics with reusable propulsion systems." }
    ]
  }
];

export default function PremiumPartners() {
  const [activeTier, setActiveTier] = useState(DATA[0]);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 1. HERO SECTION */}
      <header className="pt-20 md:pt-32 pb-10 px-4 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-red-400 font-bold">Partnership Portal</span>
        </motion.div>
        
        <h1 className="text-[14vw] md:text-8xl font-black tracking-tighter mb-4 leading-none">
          THE <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/20">NETWORK.</span>
        </h1>
      </header>

      {/* 2. RESPONSIVE TIER SELECTOR */}
      <div className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-md py-4 mb-10 border-b border-white/5">
        <nav className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-3 px-6 lg:px-0 scroll-px-6">
          {DATA.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier)}
              className={`relative flex-shrink-0 px-5 py-2.5 rounded-xl transition-all duration-500 ${
                activeTier.id === tier.id ? "text-white" : "text-white/40 hover:text-white/60"
              }`}
            >
              <span className="relative z-10 font-bold uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-2">
                {tier.icon}
                {tier.title}
              </span>
              {activeTier.id === tier.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* 3. BENTO GRID CONTENT */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
          >
            {activeTier.sponsors.map((sponsor, idx) => (
              <div 
                key={sponsor.name}
                className={`${
                  idx === 0 ? "md:col-span-7" : "md:col-span-5"
                } group relative flex flex-col`}
              >
                <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-[1.5rem] md:rounded-[2rem] transition-opacity group-hover:opacity-100 opacity-40" />
                
                <div className="relative h-full bg-[#0A0A0A] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-12 overflow-hidden flex flex-col border border-white/5">
                  {/* Background Glow */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br ${activeTier.color} opacity-10 blur-[60px] md:blur-[80px] group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8 md:mb-12">
                      <div className="w-24 h-24 md:w-32 md:h-32 relative bg-white rounded-xl md:rounded-2xl p-3 border border-white/10 group-hover:scale-105 transition-transform duration-500">
                        <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain p-2" />
                      </div>
                      <div className="flex flex-col gap-3">
                         <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                            <Linkedin size={18} />
                         </div>
                         <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                            <ExternalLink size={18} />
                         </div>
                      </div>
                    </div>

                    <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] ${activeTier.id === 'platinum' ? 'text-yellow-500' : 'text-cyan-500'}`}>
                      {sponsor.tag}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-1 md:mt-2 mb-3 md:mb-4 tracking-tighter">
                      {sponsor.name}
                    </h2>
                    <p className="text-white/50 text-base md:text-lg max-w-sm leading-relaxed mb-8">
                      {sponsor.bio}
                    </p>
                  </div>

                  <div className="mt-auto relative z-10 flex items-center gap-4 pt-4">
                    <button className="flex-1 md:flex-none px-6 py-3.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95">
                      View Profile
                    </button>
                    <div className="hidden md:block h-[1px] flex-1 bg-white/10" />
                  </div>
                </div>
              </div>
            ))}

            {/* Responsive Stats Card */}
            <div className="md:col-span-12 mt-4">
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
                        <div className="p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl shrink-0">
                            <Zap className="text-cyan-400 w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-base md:text-xl font-bold leading-none mb-1">System Status: Active</h4>
                            <p className="text-white/40 text-[10px] md:text-sm uppercase tracking-wider font-medium">Tier {activeTier.title} Sync complete</p>
                        </div>
                    </div>
                    <button className="w-full md:w-auto px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest active:scale-95">
                        Technical Documentation
                    </button>
                </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. CTA FOOTER */}
      <footer className="relative py-24 md:py-40 px-6 overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
         <div className="text-center">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
              READY TO <br className="md:hidden" />
              <span className="italic text-cyan-500 underline decoration-1 underline-offset-8">INTEGRATE?</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
                <button className="w-full md:w-auto bg-white text-black px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">
                    Become a Partner
                </button>
                <button className="w-full md:w-auto bg-transparent border border-white/20 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all">
                    Inquire for 2026
                </button>
            </div>
         </div>
      </footer>
    </div>
  );
}