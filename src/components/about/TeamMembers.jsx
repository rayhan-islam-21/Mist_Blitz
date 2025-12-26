"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import {
  Linkedin,
  Shield,
  Zap,
  ChevronRight,
  Wind,
  FileText,
  Settings,
  Briefcase,
  Layers
} from "lucide-react";
import Image from "next/image";

/* ================= MEMBER CARD COMPONENT ================= */
// (Keep this component exactly as you have it)
const MemberCard = ({ member, isLead, subsystemId, variant = "default" }) => {
  const handleClick = () => {
    if (isLead && subsystemId) {
      const element = document.getElementById(subsystemId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  if (variant === "admin") {
    return (
      <div className="group relative w-full h-125 bg-black overflow-hidden transition-all duration-500 hover:shadow-[15px_15px_0px_rgba(220,38,38,1)]">
        <Image src={member.image} fill className="object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={member.name} />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-red-600 text-white">{member.icon}</div>
            <span className="font-mono text-[10px] text-red-500 font-bold tracking-widest uppercase">Command_Level_01</span>
          </div>
          <h3 className="text-4xl font-black uppercase italic text-white leading-none mb-2">{member.name}</h3>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">{member.role}</p>
          <a href={member.linkedin} target="_blank" className="inline-block mt-4 p-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleClick}
      className={`group relative w-full h-125 bg-white overflow-hidden border border-black/10 transition-all duration-500 
        ${isLead ? "cursor-pointer hover:border-red-600" : "cursor-default"}
        hover:shadow-[10px_10px_0px_rgba(220,38,38,1)]`}
    >
      <div className="relative w-full h-[70%] overflow-hidden bg-gray-100">
        <Image src={member.image} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={member.name} />
        {isLead && (
          <div className="absolute top-4 left-4 z-20 bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest italic shadow-lg">
            Sub_Lead
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6 bg-white">
        <div className="flex flex-col gap-1">
          <h4 className="text-2xl font-black uppercase italic tracking-tight text-black leading-none">{member.name}</h4>
          <p className="text-gray-500 text-xs font-medium uppercase mt-1">{member.role}</p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 border border-black/10 hover:bg-black hover:text-white transition-colors">
            <Linkedin size={14} />
          </a>
          {isLead && (
            <div className="flex items-center gap-1 text-[10px] font-black uppercase text-red-600 animate-pulse">
              View Team <ChevronRight size={12} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN TEAM PAGE ================= */

const TeamMembers = () => {
  const [activeYear, setActiveYear] = useState("2025");
  const [loading, setLoading] = useState(true);
  const [currentYearData, setCurrentYearData] = useState({ core: [], subsystems: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/members");
        const data = response.data;
        
        // Transform the flat API list into your Subsystem structure
        const subsystemsMap = {
          "Powertrain": { id: "powertrain", name: "Powertrain", icon: <Settings size={20} />, members: [] },
          "Chassis and Aerodynamics": { id: "chassis", name: "Chassis & Aero", icon: <Wind size={20} />, members: [] },
          "Suspension, Steering and Braking": { id: "ssb", name: "Dynamics & Braking", icon: <Layers size={20} />, members: [] },
          "Electronics": { id: "electronics", name: "Electronics", icon: <Zap size={20} />, members: [] },
          "Management": { id: "management", name: "Management", icon: <Briefcase size={20} />, members: [] },
          "Documentation": { id: "documentation", name: "Documentation", icon: <FileText size={20} />, members: [] },
        };

        const core = [];
        const processedSubsystems = {};

        data.forEach(m => {
          const memberObj = {
            name: m.name,
            role: m.position,
            image: m.image,
            linkedin: m.linkedin.startsWith('http') ? m.linkedin : `https://linkedin.com/in/${m.linkedin}`,
            icon: <Shield size={20} />
          };

          // Logic: Captains go to Core. Others go to their techDept.
          if (m.position.toLowerCase().includes("captain")) {
            core.push(memberObj);
          } else {
            // Add to the first tech department listed
            const deptName = m.techDept[0];
            if (subsystemsMap[deptName]) {
              if (!processedSubsystems[deptName]) {
                processedSubsystems[deptName] = { ...subsystemsMap[deptName], lead: null, members: [] };
              }
              
              // Simple logic: First Senior Engineer found becomes the Lead for the UI
              if (!processedSubsystems[deptName].lead && m.position.includes("Senior")) {
                processedSubsystems[deptName].lead = memberObj;
              } else {
                processedSubsystems[deptName].members.push(memberObj);
              }
            }
          }
        });

        // Fallback for Leads: If no lead was assigned, pick the first member
        Object.keys(processedSubsystems).forEach(key => {
          if (!processedSubsystems[key].lead && processedSubsystems[key].members.length > 0) {
            processedSubsystems[key].lead = processedSubsystems[key].members.shift();
          }
        });

        setCurrentYearData({
          core: core.length > 0 ? core : [ { name: "Tahmid Rahman", role: "Team Captain", image: "/p1.jpg", linkedin: "#", icon: <Shield size={20} /> } ],
          subsystems: Object.values(processedSubsystems)
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-mono">LOADING_SYSTEM_DATA...</div>;

  return (
    <section className="bg-black text-black py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24 border-b-4 border-white pb-10">
          <div>
            <h1 className="text-7xl text-white md:text-8xl font-black uppercase italic leading-[0.8] tracking-tighter">
              THE <span className="text-red-600">CREW</span>
            </h1>
          </div>
          <div className="flex bg-gray-200 p-1 rounded-sm">
             <button className="px-8 py-3 text-xs font-black uppercase tracking-widest bg-black text-white shadow-lg">2025</button>
          </div>
        </div>

        {/* CORE COMMITTEE SECTION */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">Core Committee</h2>
            <div className="h-[2px] flex-grow bg-black/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentYearData.core.map((admin, idx) => (
              <MemberCard key={idx} member={admin} variant="admin" />
            ))}
            {currentYearData.subsystems.slice(0, 2).map((sub) => (
              <MemberCard key={sub.id} member={sub.lead} isLead={true} subsystemId={sub.id} />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {currentYearData.subsystems.slice(2).map((sub) => (
              <MemberCard key={sub.id} member={sub.lead} isLead={true} subsystemId={sub.id} />
            ))}
          </div>
        </div>

        {/* DETAILED SUBSYSTEM TEAMS */}
        <div className="space-y-40">
          {currentYearData.subsystems.map((sub) => (
            <div key={sub.id} id={sub.id} className="scroll-mt-24">
              <div className="flex items-center gap-6 mb-16">
                <div className="bg-red-600 text-white p-4 shadow-xl">{sub.icon}</div>
                <div>
                  <h3 className="text-5xl md:text-6xl text-white font-black uppercase italic tracking-tighter">{sub.name}</h3>
                  <p className="text-sm font-mono text-gray-400 uppercase tracking-widest">Department_Registry</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {sub.lead && <MemberCard member={sub.lead} isLead={true} />}
                {sub.members.map((member, mIdx) => (
                  <MemberCard key={mIdx} member={member} isLead={false} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-40 border-t border-black/10 pt-10 flex justify-between items-center opacity-30 pointer-events-none">
        <p className="font-mono text-[10px] uppercase">Telemetry Active // Global Sync</p>
        <p className="font-mono text-[10px] uppercase">© 2025 High-Performance Racing</p>
      </div>
    </section>
  );
};

export default TeamMembers;