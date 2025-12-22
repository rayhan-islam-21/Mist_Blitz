"use client";
import React, { useState } from "react";
import { Linkedin, Shield, Zap, ChevronRight, Activity, Terminal, Cpu, Box } from "lucide-react";
import Image from "next/image";

// --- SEPARATE CARD UI COMPONENT ---
const MemberCard = ({ member, isLead, color }) => (
  <div className="group relative w-full h-[500px] bg-neutral-950 overflow-hidden rounded-sm transition-all duration-500 hover:shadow-[20px_20px_0px_rgba(220,38,38,0.2)]">
    
    {/* 1. THE DIAGONAL IMAGE CONTAINER */}
    <div 
      className="absolute top-0 left-0 w-full h-[65%] overflow-hidden z-10 transition-all duration-700 ease-in-out group-hover:h-[60%]"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)' }}
    >
      <Image 
        src={member.image} 
        fill 
        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
        alt={member.name} 
      />
      {/* Red Edge Highlight on the Diagonal */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-red-600 shadow-[0_0_20px_#ef4444] z-20" />
      
      {/* High-Speed Scanline */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-white/5 to-red-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] z-20" />
    </div>

    {/* 2. FLOATING CONTENT (The Spec Plate) */}
    <div className="absolute bottom-0 left-0 w-full h-[45%] bg-neutral-950 p-6 flex flex-col justify-end z-30">
      
      {/* Lead Indicator (Vertical Text) */}
      {isLead && (
        <div className="absolute top-4 right-4 flex items-center gap-2 rotate-90 origin-right translate-x-4 opacity-50 group-hover:opacity-100 transition-all">
          <div className="w-10 h-[1px] bg-red-600" />
          <span className="text-[8px] font-mono text-white uppercase tracking-[0.5em]">Command_Lead</span>
        </div>
      )}

      {/* Name and Role Block */}
      <div className="relative">
        {/* Dynamic Background Title (Ghost) */}
        <h3 className="absolute -top-12 left-0 text-7xl font-black text-white/[0.03] italic uppercase select-none group-hover:text-red-600/[0.05] transition-colors">
          {member.name.split(' ')[0]}
        </h3>

        <div className="flex flex-col gap-0">
          <span className="text-[10px] font-mono text-red-600 font-bold uppercase tracking-widest mb-1">
            UNIT // {member.role.split(' ')[0]}
          </span>
          <h4 className="text-4xl font-black uppercase italic tracking-tighter text-white leading-none">
            {member.name}
          </h4>
        </div>

        {/* Footer Interaction */}
        <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex flex-col gap-1">
            <span className="text-[7px] font-mono text-neutral-600 uppercase">Synchronicity_Index</span>
            <div className="flex gap-0.5">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`h-2 w-1.5 ${i < 9 ? 'bg-red-600' : 'bg-neutral-800'} group-hover:animate-pulse`} style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </div>

          <a href={member.linkedin} className="relative group/ln">
            <div className="absolute inset-0 bg-red-600 blur-md opacity-0 group-hover/ln:opacity-40 transition-opacity" />
            <div className="relative h-10 w-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <Linkedin size={16} />
            </div>
          </a>
        </div>
      </div>
    </div>

    {/* 3. CORNER TECH DETAIL */}
    <div className="absolute top-4 left-4 z-40 p-2 border-l border-t border-white/10 opacity-30 group-hover:opacity-100 transition-opacity">
       <div className="w-2 h-2 bg-red-600" />
    </div>
  </div>
);
// --- MAIN TEAM COMPONENT ---
const TeamMembers = () => {
  const [activeYear, setActiveYear] = useState("2025");

  const teamData = {
    "2025": {
      core: [
        { name: "Tahmid Rahman", role: "Team Captain", image: "/p1.jpg", linkedin: "#", icon: <Shield size={16}/> },
        { name: "Samiul Islam", role: "Vice Captain", image: "/p1.jpg", linkedin: "#", icon: <Zap size={16}/> },
      ],
      subsystems: [
        {
          id: "powertrain",
          name: "Powertrain",
          color: "from-orange-500 to-red-600",
          lead: { name: "Arif Hossain", role: "Subsystem Lead", image: "/p1.jpg", linkedin: "#" },
          members: [
            { name: "Rahat Bin", role: "Engine Tuning", image: "/p1.jpg", linkedin: "#" },
            { name: "Sifat Ali", role: "Drivetrain Engineer", image: "/p1.jpg", linkedin: "#" },
          ]
        },
        {
          id: "chassis",
          name: "Chassis & Dynamics",
          color: "from-blue-600 to-cyan-500",
          lead: { name: "Farhan Ahmed", role: "Subsystem Lead", image: "/p1.jpg", linkedin: "#" },
          members: [
            { name: "Adnan Sami", role: "Suspension", image: "/p1.jpg", linkedin: "#" },
            { name: "Zubayer Ahmed", role: "Frame Design", image: "/p1.jpg", linkedin: "#" },
          ]
        }
      ]
    }
  };

  const currentYearData = teamData[activeYear];

  return (
    <section className="py-24  text-white relative overflow-hidden font-sans">
      {/* Background Realism Layers */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-32 border-b border-white/5 pb-12">
          <div className="relative">
            <div className="absolute -top-8 left-0 flex items-center gap-2 text-red-500 font-mono text-[10px] tracking-[0.4em] uppercase">
              <Activity size={12} className="animate-pulse" /> Live Team Database
            </div>
            <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
              The <span className="text-red-600">Crew</span>
            </h1>
          </div>

          <div className="flex bg-neutral-900 border border-white/10 p-1.5 rounded-full">
            {Object.keys(teamData).map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-10 py-3 rounded-full text-xs font-black transition-all uppercase tracking-widest ${
                  activeYear === year ? "bg-red-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" : "text-neutral-500 hover:text-white"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* CORE LEADERS HUD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-48">
          {currentYearData.core.map((admin, i) => (
            <div key={i} className="group relative bg-gradient-to-b from-neutral-900 to-black border border-white/10 p-6 rounded-3xl hover:border-red-500/50 transition-all">
               <div className="flex justify-between items-start mb-6">
                 <div className="p-3 bg-red-600/10 rounded-xl text-red-500 border border-red-500/20">{admin.icon}</div>
                 <span className="text-[10px] font-mono text-neutral-600 tracking-tighter uppercase">CORE_{i}</span>
               </div>
               <h3 className="text-xl font-bold italic uppercase leading-none mb-1 group-hover:text-red-500 transition-colors">{admin.name}</h3>
               <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest">{admin.role}</p>
            </div>
          ))}

          {currentYearData.subsystems.map((sub) => (
            <button
              key={sub.id}
              onClick={() => document.getElementById(sub.id).scrollIntoView({ behavior: 'smooth' })}
              className="group relative p-6 rounded-3xl bg--900/50 border border-white/5 hover:border-red-500/40 transition-all text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 relative">
                   <Image src={sub.lead.image} fill className="object-cover grayscale group-hover:grayscale-0" alt={sub.lead.name} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase italic leading-none">{sub.name}</h4>
                  <p className="text-[10px] text-neutral-500 font-mono">Lead: {sub.lead.name.split(' ')[0]}</p>
                </div>
              </div>
              <ChevronRight size={14} className="ml-auto group-hover:translate-x-1 transition-transform text-red-500" />
            </button>
          ))}
        </div>

        {/* ROSTER SECTION */}
        <div className="space-y-64">
          {currentYearData.subsystems.map((sub) => (
            <div key={sub.id} id={sub.id} className="scroll-mt-32">
              <div className="relative mb-20">
                <div className="flex items-center gap-4">
                  <span className="p-2 bg-blue-600/10 rounded text-red-500 border border-red-500/20 uppercase font-mono text-[10px]">Dep_{sub.id.substring(0,3)}</span>
                  <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">{sub.name}</h2>
                </div>
                <div className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-red-600 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
                <MemberCard member={sub.lead} isLead={true} color={sub.color} />
                {sub.members.map((m, i) => (
                  <MemberCard key={i} member={m} isLead={false} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;