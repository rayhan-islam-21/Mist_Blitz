import React from 'react';
import { Award, Trophy, Target, Zap, ChevronRight } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      year: "2025",
      title: "PR & Design Excellence",
      event: "International FS Competition",
      desc: "Dominated the static events with a flawless Engineering Design Report and a market-leading Business Plan.",
      icon: <Award className="w-8 h-8 text-blue-500" />,
      size: "lg", // Takes up more space
      tag: "Top Tier"
    },
    {
      year: "2024",
      title: "Global 1st Place",
      event: "FSAE Japan",
      desc: "Rookie category champions. Top marks in Acceleration and Endurance.",
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      size: "sm",
      tag: "Winner"
    },
    {
      year: "2024",
      title: "Furiosa 1.0",
      event: "Project Launch",
      desc: "MIST's first combustion prototype successfully cleared technical inspection.",
      icon: <Zap className="w-6 h-6 text-emerald-500" />,
      size: "sm",
      tag: "Milestone"
    },
    {
      year: "2023",
      title: "Concept Innovation",
      event: "Design Phase",
      desc: "Secured funding for the first carbon-fiber aero-package concept in MIST history.",
      icon: <Target className="w-6 h-6 text-purple-500" />,
      size: "md",
      tag: "Innovation"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Tech Grain / Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-blue-600 font-mono tracking-[0.4em] uppercase text-sm mb-4 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-blue-600"></span> Proven Excellence
            </h2>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
              Hall of <span className="text-blue-700 not-italic">Legacy</span>
            </h1>
          </div>
          <div className="text-left md:text-right">
            <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">Global Ranking Status</p>
            <p className="text-3xl font-bold text-white uppercase italic">Active Contender</p>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <div 
              key={index}
              className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900 to-black p-8 transition-all duration-500 hover:border-blue-500/50 
                ${item.size === 'lg' ? 'md:col-span-2 md:row-span-2 flex flex-col justify-between' : ''}
                ${item.size === 'md' ? 'md:col-span-1' : ''}`}
            >
              {/* Animated Glow on Hover */}
              <div className="absolute -inset-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity pointer-events-none"></div>

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-black rounded-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <span className="text-4xl font-black text-white/5 font-mono">{item.year}</span>
                </div>

                <div className="inline-block px-2 py-1 rounded-md bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                  {item.tag}
                </div>

                <h3 className={`font-bold text-white mb-3 group-hover:text-blue-400 transition-colors uppercase italic tracking-tight 
                  ${item.size === 'lg' ? 'text-4xl' : 'text-xl'}`}>
                  {item.title}
                </h3>
                
                <p className="text-blue-500 font-mono text-[10px] mb-4 uppercase tracking-[0.2em]">{item.event}</p>
                
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                  {item.desc}
                </p>
              </div>

              {item.size === 'lg' && (
                <div className="mt-12 flex items-center gap-2 text-white/30 text-xs font-mono group-hover:text-blue-500 transition-colors">
                  VIEW FULL CASE STUDY <ChevronRight size={14} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Total Stat Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {[
              { label: "Trophies", val: "12" },
              { label: "Design Score", val: "94%" },
              { label: "Podiums", val: "05" },
              { label: "Global Events", val: "03" }
            ].map((stat, i) => (
              <div key={i} className="bg-black p-6 text-center">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-white">{stat.val}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;