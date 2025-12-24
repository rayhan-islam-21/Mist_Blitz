"use client";

import React, { useState } from "react";
import {
  Linkedin,
  Shield,
  Zap,
  ChevronRight,
  Activity,
  Cpu,
  Wrench,
  Wind,
  FileText,
  Users,
  Settings,
  Briefcase
} from "lucide-react";
import Image from "next/image";

/* ================= MEMBER CARD COMPONENT ================= */

const MemberCard = ({ member, isLead, subsystemId, variant = "default" }) => {
  const handleClick = () => {
    if (isLead && subsystemId) {
      const element = document.getElementById(subsystemId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Captain/Vice Captain Variant
  if (variant === "admin") {
    return (
      <div className="group relative w-full h-125 bg-black overflow-hidden transition-all duration-500 hover:shadow-[15px_15px_0px_rgba(220,38,38,1)]">
        <Image
          src={member.image}
          fill
          className="object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
          alt={member.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-red-600 text-white">{member.icon}</div>
            <span className="font-mono text-[10px] text-red-500 font-bold tracking-widest uppercase">Command_Level_01</span>
          </div>
          <h3 className="text-4xl font-black uppercase italic text-white leading-none mb-2">{member.name}</h3>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">{member.role}</p>
          <a href={member.linkedin} className="inline-block mt-4 p-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors">
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
        <Image
          src={member.image}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          alt={member.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />
        {isLead && (
          <div className="absolute top-4 left-4 z-20 bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest italic shadow-lg">
            Sub_Lead
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 bg-white">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-bold text-red-600 uppercase tracking-tighter">
            {isLead ? "// Lead Specialist" : "// Unit Member"}
          </span>
          <h4 className="text-2xl font-black uppercase italic tracking-tight text-black leading-none">
            {member.name}
          </h4>
          <p className="text-gray-500 text-xs font-medium uppercase mt-1">
            {member.role}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 border border-black/10 hover:bg-black hover:text-white transition-colors"
          >
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

  const teamData = {
    "2025": {
      core: [
        { name: "Tahmid Rahman", role: "Team Captain", image: "/p1.jpg", linkedin: "#", icon: <Shield size={20} /> },
        { name: "Samiul Islam", role: "Vice Captain", image: "/p1.jpg", linkedin: "#", icon: <Zap size={20} /> },
      ],
      subsystems: [
        {
          id: "powertrain",
          name: "Powertrain",
          icon: <Wrench size={20} />,
          lead: { name: "Arif Hossain", role: "Powertrain Lead", image: "/p1.jpg", linkedin: "#" },
          members: [
            { name: "Rahat Bin", role: "Engine Tuning", image: "/p1.jpg", linkedin: "#" },
            { name: "Sifat Ali", role: "Drivetrain Engineer", image: "/p1.jpg", linkedin: "#" },
          ],
        },
        {
          id: "chassis",
          name: "Chassis & Dynamics",
          icon: <Settings size={20} />,
          lead: { name: "Farhan Ahmed", role: "Chassis Lead", image: "/p1.jpg", linkedin: "#" },
          members: [
            { name: "Adnan Sami", role: "Suspension", image: "/p1.jpg", linkedin: "#" },
            { name: "Zubayer Ahmed", role: "Frame Design", image: "/p1.jpg", linkedin: "#" },
          ],
        },
        {
          id: "electrical",
          name: "Electrical",
          icon: <Zap size={20} />,
          lead: { name: "Niaz Morshed", role: "Electrical Lead", image: "/p1.jpg", linkedin: "#" },
          members: [
            { name: "Sajid Hasan", role: "Data Acquisition", image: "/p1.jpg", linkedin: "#" },
            { name: "Imtiaz Ahmed", role: "Wiring Harness", image: "/p1.jpg", linkedin: "#" },
          ],
        },
        {
          id: "aero",
          name: "Aerodynamics",
          icon: <Wind size={20} />,
          lead: { name: "Tanvir Hasan", role: "Aero Lead", image: "/p1.jpg", linkedin: "#" },
          members: [
            { name: "Mahir Faisal", role: "CFD Analyst", image: "/p1.jpg", linkedin: "#" },
            { name: "Asif Iqbal", role: "Bodywork Design", image: "/p1.jpg", linkedin: "#" },
          ],
        },
        {
          id: "documentation",
          name: "Documentation",
          icon: <FileText size={20} />,
          lead: { name: "Rafiqul Islam", role: "Doc Lead", image: "/p1.jpg", linkedin: "#" },
          members: [
            { name: "Zayan Khan", role: "Technical Writer", image: "/p1.jpg", linkedin: "#" },
          ],
        },
        {
          id: "management",
          name: "Management",
          icon: <Briefcase size={20} />,
          lead: { name: "Maliha", role: "Management Lead", image: "/p1.jpg", linkedin: "#" },
          members: [
            { name: "Samiha Ahmed", role: "Sponsorship", image: "/p1.jpg", linkedin: "#" },
            { name: "Omar Faruq", role: "Logistics", image: "/p1.jpg", linkedin: "#" },
          ],
        },
      ],
    },
  };

  const currentYearData = teamData[activeYear];

  return (
    <section className="bg-white text-black py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24 border-b-2 border-black/20 pb-10">
          <div>
            <h1 className="text-7xl md:text-8xl font-black uppercase italic leading-[0.8] tracking-tighter">
              THE <span className="text-red-600">CREW</span>
            </h1>
          </div>

          <div className="flex bg-gray-200 p-1 rounded-sm">
            {Object.keys(teamData).map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-8 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                  activeYear === year ? "bg-black text-white shadow-lg" : "text-gray-500 hover:text-black"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* CORE COMMITTEE SECTION */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-black uppercase italic tracking-tight">Core Committee</h2>
            <div className="h-[2px] flex-grow bg-black/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Captain & Vice Captain with Photo Backgrounds */}
            {currentYearData.core.map((admin, idx) => (
              <MemberCard key={idx} member={admin} variant="admin" />
            ))}

            {/* Subsystem Leads (Clickable shortcuts) */}
            {currentYearData.subsystems.slice(0, 2).map((sub) => (
              <MemberCard 
                key={sub.id} 
                member={sub.lead} 
                isLead={true} 
                subsystemId={sub.id} 
              />
            ))}
          </div>
          
          {/* Second row of Leads if needed */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {currentYearData.subsystems.slice(2).map((sub) => (
              <MemberCard 
                key={sub.id} 
                member={sub.lead} 
                isLead={true} 
                subsystemId={sub.id} 
              />
            ))}
          </div>
        </div>

        {/* DETAILED SUBSYSTEM TEAMS */}
        <div className="space-y-40">
          {currentYearData.subsystems.map((sub) => (
            <div key={sub.id} id={sub.id} className="scroll-mt-24">
              <div className="flex items-center gap-6 mb-16">
                <div className="bg-red-600 text-white p-4 shadow-xl">
                  {sub.icon}
                </div>
                <div>
                  <h3 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter">
                    {sub.name}
                  </h3>
                  <p className="text-sm font-mono text-gray-400 uppercase tracking-widest">Department_Registry</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                <MemberCard member={sub.lead} isLead={true} />
                {sub.members.map((member, mIdx) => (
                  <MemberCard key={mIdx} member={member} isLead={false} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* FOOTER DECOR */}
      <div className="mt-40 border-t border-black/10 pt-10 flex justify-between items-center opacity-30 pointer-events-none">
        <p className="font-mono text-[10px] uppercase">Telemetry Active // Global Sync</p>
        <p className="font-mono text-[10px] uppercase">© 2025 High-Performance Racing</p>
      </div>
    </section>
  );
};

export default TeamMembers;