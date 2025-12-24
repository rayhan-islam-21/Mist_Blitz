"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern';

const PARTNERS_DATA = [
  {
    tier: 'Platinum',
    description: 'The foundation of our technical infrastructure.',
    gridCols: 'grid-cols-1 md:grid-cols-2',
    iconSize: 280,
    sponsors: [
      { id: 1, name: 'TechGiant Corp', logo: '/sponsers/sp1.png', link: '#' },
      { id: 2, name: 'Cloud Systems', logo: '/sponsers/sp2.png', link: '#' }
    ]
  },
  {
    tier: 'Diamond',
    description: 'Precision engineering and strategy partners.',
    gridCols: 'grid-cols-2 md:grid-cols-3',
    iconSize: 200,
    sponsors: [
      { id: 1, name: 'Diamond 1', logo: '/sponsers/sp3.png', link: '#' },
      { id: 2, name: 'Diamond 2', logo: '/sponsers/sp4.png', link: '#' },
      { id: 3, name: 'Diamond 3', logo: '/sponsers/sp5.png', link: '#' }
    ]
  }
];

const SponsorCard = ({ sponsor, size }) => (
  <motion.a
    href={sponsor.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -15, scale: 1.02 }}
    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    className="group relative flex items-center justify-center h-80 bg-white/40 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_50px_100px_rgba(239,68,68,0.1)] overflow-hidden"
  >
    {/* Realistic Light Reflection Layer */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    
    {/* Inner Subtle Glow */}
    <div className="absolute -inset-24 bg-red-600/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={size}
      height={size / 2}
      className="relative z-10 object-contain grayscale brightness-50 contrast-125 opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] px-12"
    />

    {/* Elegant Corner Detail */}
    <div className="absolute top-8 right-8 w-1 h-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.a>
);

export default function PartnersPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 selection:bg-red-600 selection:text-white font-sans">
      
      {/* 1. CINEMATIC HERO (REALISTIC VIBE) */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Parallax Image Background */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-40 scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#fcfcfc]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, tracking: "0.1em" }}
            animate={{ opacity: 1, tracking: "0.5em" }}
            className="mb-8 text-red-500 text-[11px] font-black uppercase"
          >
            Strategic Alliances // 2025
          </motion.div>
          
          <h1 className="text-[12vw] md:text-[11rem] font-bold text-white tracking-tighter leading-none mb-4">
            MIST <span className="text-red-600">BLITZ</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="text-white/40 font-medium tracking-[0.2em] uppercase text-xs md:text-sm"
          >
            Engineering the Future in Collaboration
          </motion.p>
        </div>

        {/* Realistic Ground Shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fcfcfc] to-transparent" />
      </section>

      {/* 2. ELEGANT TRANSITION (CENTER TEXT) */}
      <section className="relative z-20 py-52 bg-[#fcfcfc]">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="inline-block w-12 h-[1px] bg-red-600 mb-12" />
            <h2 className="text-4xl md:text-6xl font-normal text-slate-900 leading-[1.1] tracking-tight mb-12">
              Building a legacy with the world’s <br />
              <span className="font-bold italic">most innovative brands.</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              We don't just host sponsors; we build technical ecosystems. Join the vanguard of engineering excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. PARTNERS GRID (ELEGANT BENTO) */}
      <main className="relative z-10 max-w-[1400px] mx-auto px-6 pb-60">
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
            <InteractiveGridPattern squares={[20, 20]} className="[mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
        </div>

        {PARTNERS_DATA.map((tier, idx) => (
          <section key={tier.tier} className="mb-48 relative">
            <div className="flex flex-col items-start gap-4 mb-16 px-4">
               <div className="flex items-center gap-3">
                  <span className="text-red-600 font-bold text-sm">0{idx+1}</span>
                  <div className="w-8 h-[1px] bg-slate-200" />
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">Tier Level</span>
               </div>
               <h3 className="text-6xl font-bold tracking-tighter uppercase">{tier.tier}</h3>
               <p className="text-slate-500 text-sm tracking-wide uppercase font-medium">{tier.description}</p>
            </div>

            <div className={`grid gap-10 ${tier.gridCols}`}>
              {tier.sponsors.map((sponsor) => (
                <SponsorCard key={sponsor.id} sponsor={sponsor} size={tier.iconSize} />
              ))}
            </div>
          </section>
        ))}

        {/* REALISTIC CTA SECTION */}
        <section className="mt-80 px-4">
          <div className="relative group p-[1px] rounded-[3.5rem] bg-gradient-to-b from-slate-200 to-transparent">
            <div className="bg-white rounded-[3.4rem] py-32 px-10 text-center overflow-hidden relative shadow-2xl">
                {/* Animated Mesh Gradient Background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(239,68,68,0.08)_0%,_transparent_50%)]" />
                
                <h2 className="relative z-10 text-5xl md:text-8xl font-bold text-slate-900 mb-10 tracking-tighter uppercase">
                  Let&apos;s Build <br /> <span className="text-red-600 italic">History.</span>
                </h2>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative z-10 bg-slate-950 text-white px-14 py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-red-600 transition-colors duration-500"
                >
                  Request Partnership Prospectus
                </motion.button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}