"use client";

import React, { useState, useEffect, useRef } from "react";
import api from "@/lib/axios";
import { Linkedin, ChevronRight, Wind, Settings, Layers, Zap, Star } from "lucide-react";
import Image from "next/image";

const TOP_MANAGEMENT = {
  advisor: {
    name: "Shah Md. Ahasan Siddique, CSCA™, CSWA",
    position: "Technical Advisor",
    image: "https://res.cloudinary.com/dnrubj8x4/image/upload/v1769771833/Ahasan_Siddique_-_Picture_nw2wxi.jpg",
  },
  hod: {
    name: "Brigadier General Md Awal Khan",
    position: "Head of Dept (ME)",
    image: "https://res.cloudinary.com/dnrubj8x4/image/upload/v1769771833/Awal_Sir_phhwav.jpg",
  },
  cmdt: {
    name: "Maj Gen Md Nasim Parvez, BSP, ndc",
    position: "Commandant",
    image: "https://res.cloudinary.com/dnrubj8x4/image/upload/v1769771824/cmdt_20241_xttjzj.jpg",
  },
};

const CAPTAIN_DATA = {
  _id: "static-captain",
  name: "Tahmid Muntasir Auhin", 
  position: "Team Captain",
  image: "https://res.cloudinary.com/dnrubj8x4/image/upload/v1767011897/yk1c0zmijihgaumufgxl.jpg",
  linkedin: "auhin",
};

// ===================== MEMBER CARD COMPONENT =====================
const MemberCard = ({ member, isLead, isCaptain, subsystemId, onCardClick, variant = "default" }) => {
  const isAdmin = variant === "admin";
  const linkedinUrl = member.linkedin
    ? member.linkedin.startsWith("http")
      ? member.linkedin
      : `https://www.linkedin.com/in/${member.linkedin}`
    : null;

  return (
    <div
      onClick={() => {
        if (onCardClick) {
          onCardClick();
          return;
        }
        if (subsystemId) document.getElementById(subsystemId)?.scrollIntoView({ behavior: "smooth" });
      }}
      className={`group relative w-full overflow-hidden transition-all duration-700 cursor-pointer border border-white/5
      ${isAdmin ? "h-[500px] md:h-[550px] bg-zinc-950 shadow-2xl" : "h-[420px] md:h-[480px] bg-zinc-900 shadow-xl"}
      ${isCaptain ? "ring-1 ring-red-600/50 shadow-[0_0_40px_rgba(220,38,38,0.15)]" : ""}
      ${isAdmin ? "hover:border-red-600/50" : "hover:shadow-[8px_8px_0px_rgba(220,38,38,1)]"}`}
    >
      <Image
        src={member.image || "/placeholder.jpg"}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000 ease-in-out"
        alt={member.name}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-red-950/40 transition-colors duration-700" />

      <div className="absolute bottom-0 left-0 p-6 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
        <p className="text-red-600 font-mono text-[10px] uppercase tracking-[0.4em] mb-2 font-bold">
          {member.position || member.role}
        </p>
        <h3 className={`${isAdmin ? "text-2xl md:text-3xl" : "text-lg md:text-xl"} font-black uppercase italic text-white leading-[0.9] tracking-tighter mb-4`}>
          {member.name}
        </h3>

        <div className="flex items-center justify-between pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
              <Linkedin size={14} />
            </a>
          )}
          {subsystemId && (
            <span className="text-[9px] font-black text-red-600 uppercase italic flex items-center gap-1">
              VIEW UNIT <ChevronRight size={12} />
            </span>
          )}
        </div>
      </div>

      {(isLead || isCaptain) && (
        <div className={`absolute top-4 left-4 z-20 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest italic flex items-center gap-2 ${isCaptain ? "bg-white text-black" : "bg-red-600"}`}>
          {isCaptain ? <><Star size={10} fill="currentColor" /> Team Captain</> : "Unit Lead"}
        </div>
      )}
    </div>
  );
};

// ===================== MAIN COMPONENT =====================
const TeamMembers = () => {
  const [loading, setLoading] = useState(true);
  const [activeSubsystemId, setActiveSubsystemId] = useState(null);
  const teamPanelRef = useRef(null);
  const [currentYearData, setCurrentYearData] = useState({ 
    captain: CAPTAIN_DATA, 
    core: [], 
    subsystems: [] 
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/members");
        const data = Array.isArray(response.data) ? response.data : [];
        const subsystemsMap = {
          Powertrain: { id: "powertrain", name: "Powertrain", icon: <Settings size={20} /> },
          "Chassis and Aerodynamics": { id: "chassis", name: "Chassis & Aero", icon: <Wind size={20} /> },
          "Suspension, Steering and Braking": { id: "ssb", name: "Dynamics & Braking", icon: <Layers size={20} /> },
          Electronics: { id: "electronics", name: "Electronics", icon: <Zap size={20} /> },
        };
        const coreLeads = [];
        const processed = {};

        data.forEach((m) => {
          const isLeadVal = m.isLead === true || String(m.isLead).toLowerCase() === "true";
          const position = (m.position || "").toLowerCase();
          if (isLeadVal && !position.includes("captain")) {
            coreLeads.push({ ...m, role: m.position, subId: subsystemsMap[m.techDept?.[0]]?.id || null });
          }
          m.techDept?.forEach((dept) => {
            if (subsystemsMap[dept]) {
              if (!processed[dept]) processed[dept] = { ...subsystemsMap[dept], lead: null, members: [] };
              if (isLeadVal) processed[dept].lead = { ...m, role: m.position };
              else processed[dept].members.push({ ...m, role: m.position });
            }
          });
        });

        const orderedSubsystems = ["Powertrain", "Chassis and Aerodynamics", "Suspension, Steering and Braking", "Electronics"]
          .filter((k) => processed[k])
          .map((k) => processed[k]);

        setCurrentYearData(prev => ({ ...prev, core: coreLeads, subsystems: orderedSubsystems }));
        if (coreLeads[0]?.subId) setActiveSubsystemId(coreLeads[0].subId);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const activeSubsystem = currentYearData.subsystems.find((sub) => sub.id === activeSubsystemId);

  const openTeamPanel = (subId) => {
    if (!subId) return;
    setActiveSubsystemId(subId);
    requestAnimationFrame(() => {
      teamPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-zinc-900 border-t-red-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <section className="bg-black py-10 md:py-20 px-4 md:px-6 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* DIRECTORATE SECTION */}
        <div className="relative mb-32 md:mb-64 pt-10 md:pt-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[14vw] md:text-[15vw] font-black text-white/[0.02] uppercase italic pointer-events-none select-none text-center w-full">Directorate</div>
          
          {/* order- utilities handle the stacking sequence on mobile */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-10 md:gap-6 relative z-10">
            
            {/* AHASAN SIR - Last on mobile (order-3), First on desktop (md:order-1) */}
            <div className="w-full md:w-1/3 group order-3 md:order-1">
              <div className="mb-4 pl-4 border-l-2 border-zinc-800 group-hover:border-red-600 transition-colors">
              </div>
              <MemberCard member={TOP_MANAGEMENT.advisor} variant="admin" />
            </div>

            {/* COMMANDANT - First on mobile (order-1), Center on desktop (md:order-2) */}
            <div className="w-full md:w-[38%] z-20 transform md:-translate-y-16 md:scale-105 order-1 md:order-2">
              <div className="bg-red-600 text-center py-1 mb-1 shadow-lg">
                <p className="text-[9px] font-black text-white uppercase tracking-[0.4em] italic">Supreme Command</p>
              </div>
              <MemberCard member={TOP_MANAGEMENT.cmdt} variant="admin" />
            </div>

            {/* HOD - Second on mobile (order-2), Last on desktop (md:order-3) */}
            <div className="w-full md:w-1/3 group order-2 md:order-3">
              <div className="mb-4 text-left md:text-right md:pr-4 md:border-r-2 border-l-2 md:border-l-0 border-zinc-800 group-hover:border-red-600 transition-colors pl-4 md:pl-0">
              </div>
              <MemberCard member={TOP_MANAGEMENT.hod} variant="admin" />
            </div>

          </div>
        </div>

        {/* CREW HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8 mb-16 md:mb-24 border-b border-white/5 pb-8 md:pb-12">
          <h1 className="text-5xl md:text-9xl font-black uppercase italic leading-[0.8] tracking-tighter text-white">
            THE <span className="text-red-600">CREW</span>
          </h1>
        </div>

        {/* ========== BESPOKE CAPTAIN SECTION ========== */}
        <div className="relative mb-32 md:mb-64 flex flex-col items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-[600px] h-[300px] md:h-[600px] bg-red-600/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />

          <div className="relative z-10 text-center mb-10">
            <div className="inline-flex items-center gap-3 border border-red-600/40 bg-red-600/10 px-5 py-2">
              <div className="h-2 w-2 bg-red-600 rounded-full" />
              <h2 className="text-xs md:text-sm font-black text-white uppercase tracking-[0.22em] italic">Team Captain</h2>
            </div>
          </div>

          <div className="w-full max-w-lg relative group">
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-red-600 z-20 transition-all duration-500 group-hover:-top-2 group-hover:-left-2" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-red-600 z-20 transition-all duration-500 group-hover:-bottom-2 group-hover:-right-2" />
            
            <div className="relative h-[480px] md:h-[650px] w-full bg-zinc-950 overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]" />
              
              <Image
                src={currentYearData.captain.image}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out opacity-60 group-hover:opacity-100"
                alt="Captain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full z-20">
                <h2 className="text-4xl md:text-6xl font-black uppercase italic text-white tracking-tighter leading-[0.85] mb-6 md:mb-8">
                  {currentYearData.captain.name.split(' ')[0]} <br />
                  <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)', color: 'transparent' }}>
                    {currentYearData.captain.name.split(' ').slice(1).join(' ')}
                  </span>
                </h2>
                
                <div className="flex items-center gap-6 pt-6 md:pt-8 border-t border-white/20">
                  <a 
                    href={`https://www.linkedin.com/in/${currentYearData.captain.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest hover:text-red-600 transition-colors"
                  >
                    <Linkedin size={16} /> Connect
                  </a>
                </div>
              </div>

              <div className="absolute top-6 right-6 p-2 md:p-3 border border-white/20 backdrop-blur-md z-20">
                <Star size={18} className="text-red-600 fill-red-600" />
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 flex flex-col items-center">
            <div className="w-px h-16 md:h-24 bg-gradient-to-b from-red-600 to-transparent relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full animate-ping" />
            </div>
          </div>
        </div>

        {/* COMMAND CENTER GRID */}
        <div className="mb-32 md:mb-48">
          <div className="flex items-center gap-4 mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">Team Lead</h2>
            <div className="h-px flex-grow bg-gradient-to-r from-red-600 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {currentYearData.core.map((admin) => (
              <MemberCard
                key={admin._id}
                member={admin}
                variant="admin"
                subsystemId={admin.subId}
                isLead={true}
                onCardClick={() => openTeamPanel(admin.subId)}
              />
            ))}
          </div>
        </div>

        {/* TEAMMATES TAB PANEL (shown after clicking a leader) */}
        <div ref={teamPanelRef} className="mb-20 md:mb-28 border border-white/10 bg-zinc-950/50 p-5 md:p-8 scroll-mt-28">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white">
              Team Unit View
            </h2>
            <div className="h-px grow bg-gradient-to-r from-red-600 to-transparent" />
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {currentYearData.core.map((leader) => (
              <button
                key={`${leader._id}-tab`}
                onClick={() => openTeamPanel(leader.subId)}
                className={`px-4 py-2 text-xs md:text-sm font-black uppercase tracking-wider border transition-all ${
                  activeSubsystemId === leader.subId
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-transparent text-zinc-300 border-white/20 hover:border-red-600 hover:text-white"
                }`}
              >
                {leader.techDept?.[0] || leader.role || "Team"}
              </button>
            ))}
          </div>

          {!activeSubsystem && (
            <div className="border border-white/10 bg-zinc-900/40 p-8 text-zinc-400 uppercase text-xs tracking-[0.2em]">
              Select a team leader to view teammates.
            </div>
          )}

          {activeSubsystem && (
            <div className="space-y-8">
              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="bg-red-600 text-white p-3 md:p-4 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-all">
                  {activeSubsystem.icon}
                </div>
                <h3 className="text-2xl md:text-5xl text-white font-black uppercase italic tracking-tighter">
                  {activeSubsystem.name}
                </h3>
              </div>

              {activeSubsystem.members.length === 0 && !activeSubsystem.lead ? (
                <div className="border border-white/10 bg-zinc-900/40 p-8 text-zinc-400 uppercase text-xs tracking-[0.2em]">
                  No teammates found for this unit yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {activeSubsystem.lead && (
                    <MemberCard
                      key={`${activeSubsystem.id}-lead-card`}
                      member={activeSubsystem.lead}
                      isLead={true}
                    />
                  )}
                  {activeSubsystem.members.map((member) => (
                    <MemberCard key={member._id} member={member} isLead={false} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;