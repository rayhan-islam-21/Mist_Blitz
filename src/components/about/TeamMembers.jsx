"use client";
import React, { useState } from "react";
import { Linkedin, Cpu, Shield, Zap, ChevronRight, Activity, Box, Database } from "lucide-react";
import Image from "next/image";

const TeamMembers = () => {
  const [activeYear, setActiveYear] = useState("2025");
  const [hoveredDept, setHoveredDept] = useState(null);

  const teamData = {
    "2025": {
      core: [
        { name: "Tahmid Rahman", role: "Team Captain", image: "/p1.jpg", linkedin: "#", icon: <Shield size={16}/>, spec: "Strategic Ops" },
        { name: "Samiul Islam", role: "Vice Captain", image: "/p1.jpg", linkedin: "#", icon: <Zap size={16}/>, spec: "Technical Dir." },
      ],
      subsystems: [
        {
          id: "powertrain",
          name: "Powertrain",
          color: "from-orange-500 to-red-600",
          glow: "shadow-orange-500/20",
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
          glow: "shadow-blue-500/20",
          lead: { name: "Farhan Ahmed", role: "Subsystem Lead", image: "/p1.jpg", linkedin: "#" },
          members: [
            { name: "Adnan Sami", role: "Suspension", image: "/p1.jpg", linkedin: "#" },
            { name: "Zubayer Ahmed", role: "Frame Design", image: "/p1.jpg", linkedin: "#" },
          ]
        },
        {
          id: "electrical",
          name: "Electrical Systems",
          color: "from-emerald-500 to-teal-400",
          glow: "shadow-emerald-500/20",
          lead: { name: "Ayesha Siddiqua", role: "Subsystem Lead", image: "/p1.jpg", linkedin: "#" },
          members: [
            { name: "Imtiaz Ahmed", role: "DAE Engineer", image: "/p1.jpg", linkedin: "#" },
          ]
        }
      ]
    }
  };

  const currentYearData = teamData[activeYear];

  return (
    <section className="py-24 bg-[#080808] text-white relative overflow-hidden font-sans">
      {/* REALISM LAYER: Carbon Fiber Overlay & Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TOP HUD: TITLE & YEAR */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-32 border-b border-white/5 pb-12">
          <div className="relative">
            <div className="absolute -top-8 left-0 flex items-center gap-2 text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase">
              <Activity size={12} className="animate-pulse" /> Live Team Database
            </div>
            <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none">
              The <span className="text-blue-600">Crew</span>
            </h1>
            <p className="text-neutral-500 font-mono text-sm mt-4 max-w-md">
              High-performance minds behind the MIST Formula Student prototype. Engineered for precision, driven by data.
            </p>
          </div>

          <div className="flex bg-neutral-900 border border-white/10 p-1.5 rounded-full backdrop-blur-xl">
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

        {/* INTERACTIVE LEAD HUB: "THE COMMAND CENTER" */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-48">
          {currentYearData.core.map((admin, i) => (
            <div key={i} className="group relative bg-gradient-to-b from-neutral-900 to-black border border-white/10 p-6 rounded-3xl hover:border-blue-500/50 transition-all duration-500 overflow-hidden">
               <div className="flex justify-between items-start mb-6">
                 <div className="p-3 bg-blue-600/10 rounded-xl text-blue-500 border border-blue-500/20">{admin.icon}</div>
                 <span className="text-[10px] font-mono text-neutral-600 tracking-tighter uppercase">CORE_REF_{i}</span>
               </div>
               <h3 className="text-xl font-bold italic uppercase leading-none mb-1 group-hover:text-blue-500 transition-colors">{admin.name}</h3>
               <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest mb-4">{admin.role}</p>
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-1/3 group-hover:w-full transition-all duration-1000"></div>
               </div>
            </div>
          ))}

          {currentYearData.subsystems.map((sub) => (
            <button
              key={sub.id}
              onClick={() => document.getElementById(sub.id).scrollIntoView({ behavior: 'smooth' })}
              className={`group relative p-6 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-blue-500/40 transition-all duration-500 text-left`}
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
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                 <span className="text-[9px] font-mono text-blue-500 uppercase tracking-widest">Access Dept</span>
                 <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>

        {/* THE ROSTER: DEPARTMENT VIEW */}
        <div className="space-y-64">
          {currentYearData.subsystems.map((sub) => (
            <div key={sub.id} id={sub.id} className="scroll-mt-32">
              <div className="relative mb-20">
                <div className="flex items-center gap-4">
                  <span className="p-2 bg-blue-600/10 rounded text-blue-500 border border-blue-500/20 uppercase font-mono text-[10px]">Unit-0{sub.id.length}</span>
                  <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">{sub.name}</h2>
                </div>
                <div className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-blue-600 to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                <MemberCard member={sub.lead} isLead color={sub.color} glow={sub.glow} />
                {sub.members.map((m, i) => <MemberCard key={i} member={m} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MemberCard = ({ member, isLead, color, glow }) => (
  <div className="group relative">
    {/* OUTER FRAME DECORATION */}
    <div className="absolute -top-2 -right-2 w-16 h-16 border-t border-r border-white/10 group-hover:border-blue-500/50 transition-all duration-500 z-0"></div>
    <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b border-l border-white/10 group-hover:border-blue-500/50 transition-all duration-500 z-0"></div>

    <div className="relative z-10 bg-[#0A0A0A] overflow-hidden transition-all duration-500 shadow-2xl">
      
      {/* IMAGE CONTAINER WITH ASYMMETRIC MASK */}
      <div className="relative h-[420px] w-full overflow-hidden bg-neutral-900">
        {/* Subtle Engineering Grid Overlay on Image */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        
        <Image 
          src={member.image} 
          fill 
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out" 
          alt={member.name} 
        />

        {/* HUD DATA OVERLAY */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 z-20">
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-1 border-l-2 border-blue-500">
            <span className="text-[8px] font-mono text-blue-400 tracking-tighter uppercase">ID // {member.name.substring(0,3).toUpperCase()}_01</span>
          </div>
          {isLead && (
            <div className={`mt-1 bg-gradient-to-r ${color} px-3 py-1 skew-x-[-15deg] shadow-lg`}>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white skew-x-[15deg]">Lead_Unit</p>
            </div>
          )}
        </div>

        {/* BOTTOM IMAGE GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90"></div>
      </div>

      {/* CONTENT BOX - FLUSH DESIGN */}
      <div className="p-6 relative border-x border-b border-white/5 group-hover:border-blue-500/20 transition-colors">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-none group-hover:text-blue-500 transition-colors">
              {member.name}
            </h4>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-[2px] ${isLead ? 'bg-blue-500' : 'bg-neutral-700'}`}></div>
              <p className="text-neutral-500 font-mono text-[9px] uppercase tracking-[0.3em] font-bold">
                {member.role}
              </p>
            </div>
          </div>
          
          <a 
            href={member.linkedin} 
            className="group/icon relative w-10 h-10 flex items-center justify-center border border-white/10 rounded-full hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
          >
            <Linkedin size={16} className="text-neutral-400 group-hover/icon:text-white" />
          </a>
        </div>

        {/* DECORATIVE SLOT ACCENTS (Industrial feel) */}
        <div className="flex gap-1 mt-6">
           <div className={`h-1 flex-1 ${isLead ? 'bg-blue-600/40' : 'bg-white/5'} group-hover:bg-blue-600/60 transition-all`}></div>
           <div className={`h-1 w-4 ${isLead ? 'bg-blue-600/40' : 'bg-white/5'} group-hover:bg-blue-600/60 transition-all`}></div>
           <div className={`h-1 w-2 ${isLead ? 'bg-blue-600/40' : 'bg-white/5'} group-hover:bg-blue-600/60 transition-all`}></div>
        </div>
      </div>
    </div>
    
    {/* MOUSE HOVER GLOW EFFECT */}
    <div className={`absolute inset-0 ${isLead ? 'bg-blue-500/10' : 'bg-blue-500/5'} blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
  </div>
);

export default TeamMembers;