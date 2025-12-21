"use client";
import React, { useState } from "react";
import { Linkedin, Shield, Zap, ChevronRight, Activity, Terminal, Cpu, Box } from "lucide-react";
import Image from "next/image";

// --- SEPARATE CARD UI COMPONENT ---
const MemberCard = ({ member, isLead, color }) => (
  <div className="group relative w-full h-[450px]">
    {/* 1. THE REAR CONNECTING ROD (Decorative Line) */}
    <div className="absolute top-1/2 -left-4 w-8 h-[2px] bg-blue-600/50 z-0 group-hover:w-12 transition-all duration-500" />
    
    <div className="relative h-full w-full flex flex-col">
      
      {/* 2. THE IMAGE MODULE (Top Section) */}
      <div className="relative h-[70%] w-full overflow-hidden">
        {/* Angular Cut (The "Aero" look) */}
        <div 
          className="absolute inset-0 z-20 border-2 border-white/5 group-hover:border-blue-500/30 transition-colors duration-500"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}
        />
        
        <div className="relative w-full h-full" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}>
          <Image 
            src={member.image} 
            fill 
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out" 
            alt={member.name} 
          />
          {/* Scanline / HUD Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />
        </div>

        {/* Floating Lead Identifier */}
        {isLead && (
          <div className="absolute top-4 right-4 z-30 flex flex-col items-end">
            <span className="text-[7px] font-mono text-blue-500 tracking-[0.3em] uppercase mb-1">Status: Lead</span>
            <div className="w-12 h-1 bg-blue-600 shadow-[0_0_10px_#3b82f6]" />
          </div>
        )}
      </div>

      {/* 3. THE SPEC-PLATE (Bottom Section) */}
      <div className="relative flex-1 -mt-10 ml-6 mr-2 bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-5 z-30 group-hover:border-blue-500/40 transition-all duration-500">
        {/* Tiny Industrial Screws/Grommets */}
        <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-white/10" />
        <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-white/10" />
        
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">MIST_FS_MODULE_0{Math.floor(Math.random()*9)}</span>
            </div>
            <h4 className="text-xl font-black uppercase italic tracking-tighter text-white group-hover:text-blue-500 transition-colors">
              {member.name}
            </h4>
            <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-1">
              {member.role}
            </p>
          </div>

          <div className="flex justify-between items-end mt-4">
            {/* Functional Data Bar */}
            <div className="flex flex-col gap-1 w-2/3">
              <div className="flex justify-between text-[6px] font-mono text-neutral-600 uppercase">
                <span>Engage_Rate</span>
                <span>98%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-3/4 group-hover:w-full transition-all duration-700" />
              </div>
            </div>

            <a href={member.linkedin} className="text-neutral-500 hover:text-white transition-all transform hover:-translate-y-1">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
    
    {/* 4. UNDERGLOW - Visualizing the "Chassis" lighting */}
    <div className="absolute -z-10 bottom-10 left-10 right-10 h-20 bg-blue-600/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
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
    <section className="py-24 bg-[#080808] text-white relative overflow-hidden font-sans">
      {/* Background Realism Layers */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-32 border-b border-white/5 pb-12">
          <div className="relative">
            <div className="absolute -top-8 left-0 flex items-center gap-2 text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase">
              <Activity size={12} className="animate-pulse" /> Live Team Database
            </div>
            <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
              The <span className="text-blue-600">Crew</span>
            </h1>
          </div>

          <div className="flex bg-neutral-900 border border-white/10 p-1.5 rounded-full">
            {Object.keys(teamData).map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-10 py-3 rounded-full text-xs font-black transition-all uppercase tracking-widest ${
                  activeYear === year ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]" : "text-neutral-500 hover:text-white"
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
            <div key={i} className="group relative bg-gradient-to-b from-neutral-900 to-black border border-white/10 p-6 rounded-3xl hover:border-blue-500/50 transition-all">
               <div className="flex justify-between items-start mb-6">
                 <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500 border border-blue-500/20">{admin.icon}</div>
                 <span className="text-[10px] font-mono text-neutral-600 tracking-tighter uppercase">CORE_{i}</span>
               </div>
               <h3 className="text-xl font-bold italic uppercase leading-none mb-1 group-hover:text-blue-500 transition-colors">{admin.name}</h3>
               <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest">{admin.role}</p>
            </div>
          ))}

          {currentYearData.subsystems.map((sub) => (
            <button
              key={sub.id}
              onClick={() => document.getElementById(sub.id).scrollIntoView({ behavior: 'smooth' })}
              className="group relative p-6 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-blue-500/40 transition-all text-left"
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
              <ChevronRight size={14} className="ml-auto group-hover:translate-x-1 transition-transform text-blue-500" />
            </button>
          ))}
        </div>

        {/* ROSTER SECTION */}
        <div className="space-y-64">
          {currentYearData.subsystems.map((sub) => (
            <div key={sub.id} id={sub.id} className="scroll-mt-32">
              <div className="relative mb-20">
                <div className="flex items-center gap-4">
                  <span className="p-2 bg-blue-600/10 rounded text-blue-500 border border-blue-500/20 uppercase font-mono text-[10px]">Dep_{sub.id.substring(0,3)}</span>
                  <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">{sub.name}</h2>
                </div>
                <div className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-blue-600 to-transparent"></div>
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