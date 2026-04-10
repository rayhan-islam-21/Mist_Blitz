"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import CenterLoader from "@/components/ui/center-loader";

// ─── STATIC TOP DATA ──────────────────────────────────────────────────────────
const TOP_MANAGEMENT = [
  {
    key: "cmdt",
    name: "Maj Gen Md Nasim Parvez, BSP, ndc",
    position: "Commandant",
    label: "Supreme Command",
    image: "https://res.cloudinary.com/dnrubj8x4/image/upload/v1769771824/cmdt_20241_xttjzj.jpg",
  },
  {
    key: "hod",
    name: "Brigadier General Md Awal Khan",
    position: "Head of Department (ME)",
    label: "Academic Authority",
    image: "https://res.cloudinary.com/dnrubj8x4/image/upload/v1769771833/Awal_Sir_phhwav.jpg",
  },
  {
    key: "advisor",
    name: "Shah Md. Ahasan Siddique, CSCA™, CSWA",
    position: "Faculty Advisor",
    label: "Technical Mentor",
    image: "https://res.cloudinary.com/dnrubj8x4/image/upload/v1769771833/Ahasan_Siddique_-_Picture_nw2wxi.jpg",
  },
];

const CAPTAIN = {
  name: "Tahmid Muntasir Auhin",
  position: "Team Captain",
  image: "https://res.cloudinary.com/dnrubj8x4/image/upload/v1767011897/yk1c0zmijihgaumufgxl.jpg",
  linkedin: "auhin",
};

// ─── DEPT DEFINITIONS ─────────────────────────────────────────────────────────
const TECH_DEPTS = [
  {
    key: "Chassis and Aerodynamics",
    label: "Chassis",
    fullLabel: "Chassis & Aerodynamics",
    roles: ["Chassis Design", "Frame Fabrication", "Aerodynamic Bodywork", "FEA Simulation", "Jig & Fixture"],
  },
  {
    key: "Suspension, Steering and Braking",
    label: "Suspension",
    fullLabel: "Suspension, Steering & Braking",
    roles: ["Suspension Geometry", "Kinematics Simulation", "Steering System", "Brake System", "Vehicle Dynamics"],
  },
  {
    key: "Powertrain",
    label: "Powertrain",
    fullLabel: "Powertrain",
    roles: ["Engine Management", "Drivetrain Integration", "Fuel System", "Cooling System", "Exhaust Design"],
  },
  {
    key: "Electronics",
    label: "Electronics",
    fullLabel: "Electronics & DAQ",
    roles: ["Wiring Harness", "DAQ System", "Sensor Integration", "ECU Calibration", "Embedded Systems"],
  },
];

const MGMT_DEPTS = [
  {
    key: "Documentation",
    label: "Doc",
    fullLabel: "Documentation",
    roles: ["Technical Writing", "Design Reports", "Regulation Compliance", "Archive Management"],
  },
  {
    key: "Finance",
    label: "Finance",
    fullLabel: "Finance",
    roles: ["Budget Planning", "Expense Tracking", "Sponsorship Finance", "Cost Reports"],
  },
  {
    key: "Media",
    label: "Media",
    fullLabel: "Media",
    roles: ["Photography", "Videography", "Social Media", "Content Creation", "Brand Identity"],
  },
  {
    key: "Logistics",
    label: "Log",
    fullLabel: "Logistics",
    roles: ["Parts Procurement", "Shipping & Transport", "Inventory Management", "Workshop Operations"],
  },
  {
    key: "Management",
    label: "Mgmt",
    fullLabel: "Management",
    roles: ["Team Coordination", "Event Planning", "External Relations", "Scheduling", "Sponsorship Outreach"],
  },
  {
    key: "Business Plan Presentation",
    label: "BPP",
    fullLabel: "Business Plan Presentation",
    roles: ["Market Analysis", "Business Strategy", "Presentation Design", "Financial Projections", "Pitch Delivery"],
  },
];

const POSITION_ORDER = ["Senior Engineer", "Junior Engineer", "Apprentice Engineer", "Trainee"];

// ─── MEMBER CARD ──────────────────────────────────────────────────────────────
function MemberCard({ member }) {
  const isLead = member.isLead === true || String(member.isLead).toLowerCase() === "true"
    || member.position === "Senior Engineer";

  const linkedinUrl = member.linkedin
    ? member.linkedin.startsWith("http") ? member.linkedin : `https://www.linkedin.com/in/${member.linkedin}`
    : null;

  return (
    <div className="group relative bg-zinc-950 border border-white/8 hover:border-red-600/40 transition-all duration-300 overflow-hidden">
      {isLead && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 z-10" />
      )}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={member.image || "/placeholder.jpg"}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          alt={member.name}
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
      </div>
      <div className="p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-red-500 mb-1">
          {member.position}
        </p>
        <h4 className="font-black italic uppercase text-sm text-white leading-tight tracking-tight mb-3">
          {member.name}
        </h4>
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/30 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-wider"
          >
            <Linkedin size={11} /> LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

// ─── TOP CARD (Commandant / HoD / Advisor) ────────────────────────────────────
function HierarchyCard({ person, highlight }) {
  return (
    <div className={`group relative overflow-hidden border transition-all duration-300 ${highlight ? "border-red-600/40 bg-zinc-950" : "border-white/8 bg-zinc-950 hover:border-red-600/20"}`}>
      {highlight && <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600" />}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={person.image}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top group-hover:scale-105 transition-all duration-700"
          alt={person.name}
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
      </div>
      <div className="p-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-red-500 mb-1">{person.label}</p>
        <h4 className="font-black italic uppercase text-base text-white leading-tight tracking-tight">{person.name}</h4>
        <p className="text-white/40 text-xs mt-1 font-mono uppercase tracking-wider">{person.position}</p>
      </div>
    </div>
  );
}

// ─── CAPTAIN CARD ─────────────────────────────────────────────────────────────
function CaptainCard({ captain }) {
  const linkedinUrl = captain.linkedin
    ? `https://www.linkedin.com/in/${captain.linkedin}` : null;
  return (
    <div className="group relative overflow-hidden border border-red-600/30 bg-zinc-950 md:col-span-1">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600" />
      <div className="relative h-56 overflow-hidden">
        <Image
          src={captain.image}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover object-top group-hover:scale-105 transition-all duration-700"
          alt={captain.name}
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
      </div>
      <div className="p-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-red-500 mb-1">Team Captain</p>
        <h4 className="font-black italic uppercase text-base text-white leading-tight tracking-tight">{captain.name}</h4>
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/30 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-wider mt-2">
            <Linkedin size={11} /> LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

// ─── DEPT PANEL ───────────────────────────────────────────────────────────────
function DeptPanel({ depts, membersMap, type }) {
  const [active, setActive] = useState(depts[0]?.key || null);
  const activeDept = depts.find(d => d.key === active);
  const members = membersMap[active] || [];

  const sorted = [...members].sort((a, b) => {
    return POSITION_ORDER.indexOf(a.position) - POSITION_ORDER.indexOf(b.position);
  });

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-0 border border-white/10 mb-0">
        {depts.map(d => (
          <button
            key={d.key}
            onClick={() => setActive(d.key)}
            className={`px-5 py-3 font-black italic text-sm uppercase tracking-tight border-r border-white/10 last:border-r-0 transition-all duration-200 ${
              active === d.key
                ? "bg-red-600 text-white"
                : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      {activeDept && (
        <div className="border border-t-0 border-white/10 p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8">
            <div className="flex-1">
              <h4 className="text-2xl font-black italic uppercase tracking-tight text-white mb-1">{activeDept.fullLabel}</h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                  {sorted.length} Member{sorted.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            {/* Roles */}
            <div className="md:w-64 shrink-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/25 mb-3">Roles & Responsibilities</p>
              <ul className="space-y-1">
                {activeDept.roles.map((r, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/50">
                    <span className="w-1 h-1 bg-red-600 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {sorted.length === 0 ? (
            <p className="text-white/20 font-mono text-xs uppercase tracking-widest py-8 text-center border border-white/5">
              No members assigned yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {sorted.map(m => (
                <MemberCard key={m._id} member={m} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ label, title }) {
  return (
    <div className="mb-10 border-l-2 border-red-600 pl-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-500 mb-1">{label}</p>
      <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight text-white">{title}</h2>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const TeamMembers = () => {
  const [loading, setLoading] = useState(true);
  const [techMap, setTechMap] = useState({});
  const [mgmtMap, setMgmtMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/members");
        const members = Array.isArray(data) ? data : [];

        const tech = {};
        const mgmt = {};

        members.forEach(m => {
          (m.techDept || []).forEach(dept => {
            if (!tech[dept]) tech[dept] = [];
            tech[dept].push(m);
          });
          (m.nonTechDept || []).forEach(dept => {
            if (!mgmt[dept]) mgmt[dept] = [];
            mgmt[dept].push(m);
          });
        });

        setTechMap(tech);
        setMgmtMap(mgmt);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CenterLoader fullScreen containerClassName="bg-black" />;

  return (
    <section className="bg-black py-16 md:py-24 px-4 md:px-8 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* ── 1. TEAM STRUCTURE ── */}
        <div>
          <SectionHeader label="01 · Team Structure" title="Chain of Command" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {TOP_MANAGEMENT.map((p, i) => (
              <HierarchyCard key={p.key} person={p} highlight={i === 0} />
            ))}
            <CaptainCard captain={CAPTAIN} />
          </div>
          {/* Visual connector line */}
          <div className="hidden md:flex justify-around mt-0 border-l border-r border-b border-white/5 mx-0 h-4" />
        </div>

        {/* ── 2. TECHNICAL TEAM ── */}
        <div>
          <SectionHeader label="02 · Technical Team" title="Engineering Sub-Teams" />
          <DeptPanel depts={TECH_DEPTS} membersMap={techMap} type="tech" />
        </div>

        {/* ── 3. MANAGERIAL TEAM ── */}
        <div>
          <SectionHeader label="03 · Managerial Team" title="Operations & Strategy" />
          <DeptPanel depts={MGMT_DEPTS} membersMap={mgmtMap} type="mgmt" />
        </div>

      </div>
    </section>
  );
};

export default TeamMembers;
