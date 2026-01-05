"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import {
  Linkedin, ChevronRight, Wind, Settings, Layers, Zap
} from "lucide-react";
import Image from "next/image";

/* ================= MEMBER CARD COMPONENT ================= */
// Maintains your exact UI styles for "admin" (black) and "default" (white)
const MemberCard = ({ member, isLead, subsystemId, variant = "default" }) => {
  const handleClick = () => {
    if (subsystemId) {
      const element = document.getElementById(subsystemId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const linkedinUrl = member.linkedin?.startsWith('http') 
    ? member.linkedin 
    : `https://linkedin.com/search/results/all/?keywords=${encodeURIComponent(member.linkedin || member.name)}`;

  // THE BLACK ADMIN CARD UI
  if (variant === "admin") {
    return (
      <div 
        onClick={handleClick}
        className="group relative w-full h-[500px] bg-black overflow-hidden transition-all duration-500 hover:shadow-[15px_15px_0px_rgba(220,38,38,1)] border border-white/5 cursor-pointer"
      >
        <Image src={member.image || "/placeholder.jpg"} fill className="object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" alt={member.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <h3 className="text-4xl font-black uppercase italic text-white leading-none mb-2">{member.name}</h3>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">{member.role}</p>
          <div className="mt-4 flex items-center justify-between">
             <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
                <Linkedin size={16} />
             </a>
             {subsystemId && (
               <span className="text-[10px] font-black text-red-600 uppercase italic opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                 Go to Unit <ChevronRight size={12} />
               </span>
             )}
          </div>
        </div>
      </div>
    );
  }

  // THE WHITE SUBSYSTEM CARD UI
  return (
    <div className="group relative w-full h-[500px] bg-white overflow-hidden border border-black/10 transition-all duration-500 hover:shadow-[10px_10px_0px_rgba(220,38,38,1)]">
      <div className="relative w-full h-[70%] overflow-hidden bg-gray-100">
        <Image src={member.image || "/placeholder.jpg"} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={member.name} />
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
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-black/10 hover:bg-black text-black hover:text-white transition-colors">
            <Linkedin size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN TEAM PAGE ================= */
const TeamMembers = () => {
  const [loading, setLoading] = useState(true);
  const [currentYearData, setCurrentYearData] = useState({ core: [], subsystems: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/members");
        const data = Array.isArray(response.data) ? response.data : [];
        
        const subsystemsMap = {
          "Powertrain": { id: "powertrain", name: "Powertrain", icon: <Settings size={20} /> },
          "Chassis and Aerodynamics": { id: "chassis", name: "Chassis & Aero", icon: <Wind size={20} /> },
          "Suspension, Steering and Braking": { id: "ssb", name: "Dynamics & Braking", icon: <Layers size={20} /> },
          "Electronics": { id: "electronics", name: "Electronics", icon: <Zap size={20} /> },
        };

        // 1. Process Core Leads (Command Center)
        const coreLeads = data
          .filter(m => String(m.isLead).toLowerCase() === "true" && (!m.techDept || m.techDept.length === 0))
          .map(m => ({
            ...m,
            role: m.position,
            subId: null // Leads that aren't in a specific tech dept
          }));

        // 2. Process Subsystems
        const processedSubsystems = {};
        data.forEach(m => {
          if (m.techDept && Array.isArray(m.techDept)) {
            m.techDept.forEach(deptName => {
              if (subsystemsMap[deptName]) {
                if (!processedSubsystems[deptName]) {
                  processedSubsystems[deptName] = { ...subsystemsMap[deptName], lead: null, members: [] };
                }
                
                const memberObj = { ...m, role: m.position };
                if (String(m.isLead).toLowerCase() === "true") {
                  processedSubsystems[deptName].lead = memberObj;
                } else {
                  processedSubsystems[deptName].members.push(memberObj);
                }
              }
            });
          }
        });

        setCurrentYearData({
          core: coreLeads,
          subsystems: Object.values(processedSubsystems)
        });
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono italic">INITIALIZING_CREW_DATABASE...</div>;

  return (
    <section className="bg-black py-20 px-6 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-24 border-b-4 border-white pb-10">
          <h1 className="text-5xl text-white md:text-8xl font-black uppercase italic leading-[0.8] tracking-tighter">
            THE <span className="text-red-600">CREW</span>
          </h1>
          <div className="flex bg-zinc-800 p-1">
             <button className="px-8 py-3 text-xs font-black uppercase bg-red-600 text-white">SEASON_2026</button>
          </div>
        </div>

        {/* COMMAND CENTER (Uses Admin Variant) */}
        <div className="mb-48">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tight underline decoration-red-600 decoration-4 underline-offset-8">Command Center</h2>
            <div className="h-[1px] flex-grow bg-white/20" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentYearData.core.map((admin) => (
              <MemberCard 
                key={`leader-${admin._id}`} 
                member={admin} 
                variant="admin" 
                subsystemId={admin.subId} 
              />
            ))}
          </div>
        </div>

        {/* TECHNICAL UNITS (Uses Default Variant) */}
        <div className="space-y-48">
          {currentYearData.subsystems.map((sub) => (
            <div key={sub.id} id={sub.id} className="scroll-mt-32">
              <div className="flex items-center gap-6 mb-16">
                <div className="bg-red-600 text-white p-4 shadow-[5px_5px_0px_white]">{sub.icon}</div>
                <h3 className="text-3xl md:text-7xl text-white font-black uppercase italic tracking-tighter">{sub.name}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {sub.lead && <MemberCard member={sub.lead} isLead={true} />}
                {sub.members.map((member) => (
                  <MemberCard key={`mem-${member._id}`} member={member} isLead={false} />
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