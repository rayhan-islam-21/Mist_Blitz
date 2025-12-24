"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern';

const PARTNERS_DATA = [
  {
    tier: 'Platinum',
    description: 'Premier infrastructure partners shaping the future.',
    gridCols: 'grid-cols-1 md:grid-cols-2',
    iconSize: 280,
    sponsors: [
      { id: 1, name: 'TechGiant Corp', logo: '/sponsers/sp1.png', link: '#' },
      { id: 2, name: 'Cloud Systems', logo: '/sponsers/sp2.png', link: '#' }
    ]
  },
  {
    tier: 'Diamond',
    description: 'Technical collaborators in engineering excellence.',
    gridCols: 'grid-cols-2 md:grid-cols-3',
    iconSize: 200,
    sponsors: [
      { id: 1, name: 'Diamond 1', logo: '/sponsers/sp3.png', link: '#' },
      { id: 2, name: 'Diamond 2', logo: '/sponsers/sp4.png', link: '#' },
      { id: 3, name: 'Diamond 3', logo: '/sponsers/sp5.png', link: '#' }
    ]
  }
];

const SponsorCard = ({ sponsor, size }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.a
      href={sponsor.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.01 }}
      className="group relative flex items-center justify-center h-80 bg-white/[0.03] backdrop-blur-2xl rounded-[3rem] border border-white/[0.08] overflow-hidden transition-all duration-500 hover:border-red-500/50 shadow-2xl"
    >
      {/* Dynamic Spotlight Follower */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(239,68,68,0.1), transparent 40%)`
        }}
      />

      {/* Glossy Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] via-transparent to-transparent opacity-100" />
      
      <Image
        src={sponsor.logo}
        alt={sponsor.name}
        width={size}
        height={size / 2}
        className="relative z-10 object-contain grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] px-12"
      />

      {/* Technical Metadata Footer */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 font-mono text-[9px] uppercase tracking-[0.3em] text-red-500 font-bold">
        Established // Partner_0{sponsor.id}
      </div>
    </motion.a>
  );
};

export default function PartnersPage() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div className="min-h-screen bg-white text-white selection:bg-red-600 font-sans selection:text-white">
      
      {/* 1. IMMERSIVE HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Parallax Background with Deep Shadow */}
        <motion.div style={{ y: yBg, opacity: opacityHero }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/china3.jpg')] bg-cover bg-center opacity-30 scale-110 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-[#050505]/60 to-[#050505]" />
          {/* Central Red Volumetric Light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/10 blur-[150px] rounded-full" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/60 font-mono">Operations // 2025</span>
          </motion.div>
          
          <h1 className="text-[14vw] md:text-[13rem] font-black tracking-tighter leading-[0.75] mb-6 italic italic-none">
            MIST <br />
            <span className="text-red-600">BLITZ</span>
          </h1>
          
          <p className="text-white/30 font-medium tracking-[0.4em] uppercase text-[10px] md:text-xs max-w-2xl mx-auto leading-relaxed">
            Uniting industry titans and technical visionaries <br /> 
            in a pursuit of <span className="text-white font-bold">unmatched engineering</span>.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="w-[1px] h-24 bg-gradient-to-b from-red-600 to-transparent opacity-50" />
        </div>
      </section>

      {/* 2. THE GRID (CONTENT) */}
      <main className="relative z-10 max-w-[1440px] mx-auto px-6 py-40">
        
        {/* Dynamic Grid Background Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
            <InteractiveGridPattern squares={[25, 25]} className="[mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]" />
        </div>

        {PARTNERS_DATA.map((tier, idx) => (
          <section key={tier.tier} className="mb-60 last:mb-20 relative">
            {/* Tier Header: High-End Swiss Style */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
              <div className="max-w-xl">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-red-600 font-mono font-bold">0{idx + 1}</span>
                    <div className="h-[1px] w-12 bg-red-600/30" />
                    <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em]">Network Tier</span>
                </div>
                <h3 className="text-7xl md:text-9xl font-black tracking-tighter uppercase mb-4 leading-none">
                    {tier.tier}
                </h3>
                <p className="text-white/40 text-sm font-medium uppercase tracking-[0.2em] leading-relaxed">
                    {tier.description}
                </p>
              </div>
              <div className="hidden md:block">
                 <span className="text-[12rem] font-black text-white/[0.02] select-none leading-none -mb-8">T0{idx+1}</span>
              </div>
            </div>

            <div className={`grid gap-10 ${tier.gridCols}`}>
              {tier.sponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} size={tier.iconSize} />
              ))}
            </div>
          </section>
        ))}

        {/* 3. PREMIUM CALL TO ACTION */}
        <section className="mt-60">
           <div className="relative group p-[1px] rounded-[4rem] overflow-hidden">
              {/* Animated Gradient Border */}
              <div className="absolute inset-[-1000%] animate-[spin_15s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#000_40%,#dc2626_50%,#000_60%,#000_100%)] opacity-20 group-hover:opacity-40 transition-opacity" />
              
              <div className="relative bg-[#080808] rounded-[3.9rem] py-32 px-10 text-center shadow-2xl">
                 <h4 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-10 text-white">
                    JOIN THE <span className="text-red-600 not-italic">ELITE.</span>
                 </h4>
                 <p className="max-w-xl mx-auto text-white/30 text-xs md:text-sm uppercase tracking-[0.5em] font-bold mb-16 leading-loose">
                    Request the 2025 Partnership Prospectus <br /> & Enlist in the movement.
                 </p>
                 <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-600 hover:bg-white hover:text-black text-white px-16 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all duration-500 shadow-[0_20px_40px_rgba(239,68,68,0.2)]"
                 >
                    Apply for Partnership
                 </motion.button>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}