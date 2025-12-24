"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { InteractiveGridPattern } from '@/components/ui/interactive-grid-pattern';

const PARTNERS_DATA = [
  {
    tier: 'Platinum',
    description: 'Core infrastructure visionaries.',
    gridCols: 'grid-cols-1 md:grid-cols-2',
    iconSize: 220,
    sponsers: [
      { id: 1, name: 'TechGiant Corp', logo: '/sponsers/sp1.png', link: '#' },
      { id: 2, name: 'Cloud Systems', logo: '/sponsers/sp2.png', link: '#' }
    ]
  },
  {
    tier: 'Diamond',
    description: 'Technical excellence collaborators.',
    gridCols: 'grid-cols-2 md:grid-cols-3',
    iconSize: 160,
    sponsers: [
      { id: 1, name: 'Diamond 1', logo: '/sponsers/sp3.png', link: '#' },
      { id: 2, name: 'Diamond 2', logo: '/sponsers/sp4.png', link: '#' },
      { id: 3, name: 'Diamond 3', logo: '/sponsers/sp5.png', link: '#' }
    ]
  },
  {
    tier: 'Gold',
    description: 'Community growth accelerators.',
    gridCols: 'grid-cols-2 lg:grid-cols-4',
    iconSize: 130,
    sponsers: Array(4).fill(0).map((_, i) => ({ id: i, name: `Gold ${i+1}`, logo: `/sponsers/gold${i+1}.png`, link: '#' }))
  }
];

const SponsorCard = ({ sponsor, size }) => (
  <motion.a
    href={sponsor.link}
    target="_blank"
    rel="noopener noreferrer"
    className="relative flex items-center justify-center p-20 border-r border-b border-slate-100 group overflow-hidden transition-colors hover:bg-slate-50/50"
  >
    {/* Subtle Red Scan-line */}
    <motion.div 
      initial={{ top: "-100%" }}
      whileHover={{ top: "100%" }}
      transition={{ duration: 1, ease: "linear", repeat: Infinity }}
      className="absolute left-0 right-0 h-[1px] bg-red-600/30 z-20 pointer-events-none"
    />
    
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={size}
      height={size / 2}
      className="relative z-10 object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
    />
  </motion.a>
);

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-red-600 selection:text-white">
      
      {/* Structural Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <InteractiveGridPattern 
          squares={[20, 20]}
          className="opacity-[0.05] [mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]" 
        />
      </div>

      <main className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* Header Section: Architectural & Bold */}
        <header className="pt-32 pb-64 border-l border-slate-100 ml-12 pl-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-12"
          >
            <span className="w-2 h-2 bg-red-600" />
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-slate-400">Official Partnership Portal</span>
          </motion.div>

          <h1 className="text-[clamp(4rem,12vw,12rem)] font-light leading-[0.8] tracking-tighter mb-16">
            MIST <br />
            <span className="font-black text-red-600">BLITZ</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-24 items-end">
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-md">
              A curated ecosystem of industry leaders driving the next evolution of <span className="text-slate-900 font-medium">engineering excellence</span>.
            </p>
            <div className="text-right hidden md:block">
              <span className="text-[10rem] font-black text-slate-50 leading-none select-none">2025</span>
            </div>
          </div>
        </header>

        {/* Dynamic Tiers with Integrated Labels */}
        {PARTNERS_DATA.map((tier, idx) => (
          <section key={tier.tier} className="relative border-t border-slate-100">
            {/* Tier Label Floating on the left border */}
            <div className="absolute -left-12 top-0 h-full border-l border-slate-100 flex flex-col items-center pt-8">
                <span className="rotate-90 origin-center text-[10px] font-bold tracking-[0.4em] uppercase text-slate-300 whitespace-nowrap">
                   Phase // 0{idx + 1}
                </span>
            </div>

            <div className="py-24 ml-12">
              <div className="flex flex-col md:flex-row md:items-baseline gap-6 mb-16">
                <h2 className="text-5xl font-black uppercase tracking-tighter italic">
                  {tier.tier} <span className="text-red-600 not-italic">Tier</span>
                </h2>
                <div className="h-[1px] flex-grow bg-slate-100" />
                <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">
                  {tier.description}
                </p>
              </div>

              <div className={`grid border-t border-l border-slate-100 ${tier.gridCols}`}>
                {tier.sponsers.map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} size={tier.iconSize} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Executive Call to Action */}
        <section className="mt-40 border-t border-slate-100 ml-12 pt-32 pb-64">
          <div className="max-w-4xl">
            <h3 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-12 leading-none">
              Fuel the <br /> <span className="text-red-600">Ambition.</span>
            </h3>
            <p className="text-xl text-slate-500 mb-16 max-w-xl font-light">
              We invite forward-thinking organizations to join our mission. Request the 2025 Partnership Prospectus to explore opportunities.
            </p>
            <motion.button 
              whileHover={{ x: 20 }}
              className="flex items-center gap-8 group"
            >
              <span className="w-20 h-20 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:stroke-white stroke-slate-900 transition-colors">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="text-sm font-bold tracking-[0.3em] uppercase group-hover:text-red-600 transition-colors">
                Apply for Partnership
              </span>
            </motion.button>
          </div>
        </section>
      </main>

      {/* Ultra-Minimal Footer */}
      <footer className="py-12 border-t border-slate-100 px-12 ml-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">
          &copy; 2025 MIST Blitz Ecosystem
        </p>
        <div className="flex gap-12">
          {['Privacy', 'Prospectus', 'Contact'].map((item) => (
            <a key={item} href="#" className="text-[10px] font-bold text-slate-900 tracking-widest uppercase hover:text-red-600 transition-colors">
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}