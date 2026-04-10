"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Linkedin, Star } from "lucide-react";
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
    highlight: true,
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
  { key: "Chassis and Aerodynamics",          label: "Chassis",    fullLabel: "Chassis & Aerodynamics" },
  { key: "Suspension, Steering and Braking",  label: "Suspension", fullLabel: "Suspension, Steering & Braking" },
  { key: "Powertrain",                        label: "Powertrain", fullLabel: "Powertrain" },
  { key: "Electronics",                       label: "Electronics",fullLabel: "Electronics & DAQ" },
];

const MGMT_DEPTS = [
  { key: "Documentation",              label: "Doc",      fullLabel: "Documentation" },
  { key: "Finance",                    label: "Finance",  fullLabel: "Finance" },
  { key: "Media",                      label: "Media",    fullLabel: "Media" },
  { key: "Logistics",                  label: "Log",      fullLabel: "Logistics" },
  { key: "Management",                 label: "Mgmt",     fullLabel: "Management" },
  { key: "Business Plan Presentation", label: "BPP",      fullLabel: "Business Plan Presentation" },
];

const POSITION_ORDER = ["Senior Engineer", "Junior Engineer", "Apprentice Engineer", "Trainee"];

function isLead(m) {
  return m.isLead === true || String(m.isLead).toLowerCase() === "true" || m.position === "Senior Engineer";
}

// ─── MEMBER CARD (regular — compact) ─────────────────────────────────────────
function MemberCard({ member }) {
  const linkedinUrl = member.linkedin
    ? member.linkedin.startsWith("http") ? member.linkedin : `https://www.linkedin.com/in/${member.linkedin}`
    : null;

  return (
    <div className="group relative bg-zinc-900 border border-white/10 hover:border-red-600/40 transition-all duration-300 overflow-hidden">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={member.image || "/placeholder.jpg"}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover object-top group-hover:scale-105 transition-all duration-500"
          alt={member.name}
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900/90 via-transparent to-transparent" />
      </div>
      <div className="p-4 border-t border-white/8">
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-red-500 mb-1 truncate">
          {member.position}
        </p>
        <h4 className="font-black italic uppercase text-sm text-white leading-tight tracking-tight mb-2 line-clamp-2">
          {member.name}
        </h4>
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/30 hover:text-red-500 transition-colors text-[10px] font-mono uppercase tracking-wider"
          >
            <Linkedin size={10} /> LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

// ─── LEAD CARD (bigger) ───────────────────────────────────────────────────────
function LeadCard({ member }) {
  const linkedinUrl = member.linkedin
    ? member.linkedin.startsWith("http") ? member.linkedin : `https://www.linkedin.com/in/${member.linkedin}`
    : null;

  return (
    <div className="group relative bg-zinc-900 border border-red-600/30 hover:border-red-600/60 transition-all duration-300 overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.08)]">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 z-10" />
      <div className="absolute top-3 right-3 z-10 bg-red-600 px-2 py-0.5 flex items-center gap-1">
        <Star size={8} className="text-white fill-white" />
        <span className="text-[8px] font-black uppercase tracking-widest text-white">Lead</span>
      </div>
      <div className="relative h-72 overflow-hidden">
        <Image
          src={member.image || "/placeholder.jpg"}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover object-top group-hover:scale-105 transition-all duration-500"
          alt={member.name}
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
      </div>
      <div className="p-5 border-t border-red-600/20">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-red-500 mb-1">{member.position}</p>
        <h4 className="font-black italic uppercase text-base text-white leading-tight tracking-tight mb-3">
          {member.name}
        </h4>
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/30 hover:text-red-500 transition-colors text-[10px] font-mono uppercase tracking-wider"
          >
            <Linkedin size={11} /> LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

// ─── TOP HIERARCHY CARD ───────────────────────────────────────────────────────
function HierarchyCard({ person }) {
  return (
    <div className={`group relative overflow-hidden border transition-all duration-300 bg-zinc-900 ${person.highlight ? "border-red-600/40 shadow-[0_0_30px_rgba(220,38,38,0.1)]" : "border-white/10 hover:border-red-600/30"}`}>
      {person.highlight && <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 z-10" />}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={person.image}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover object-top group-hover:scale-105 transition-all duration-700"
          alt={person.name}
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900/90 via-transparent to-transparent" />
      </div>
      <div className="p-5 border-t border-white/8">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-red-500 mb-1">{person.label}</p>
        <h4 className="font-black italic uppercase text-base text-white leading-tight tracking-tight">{person.name}</h4>
        <p className="text-white/40 text-xs mt-1 font-mono">{person.position}</p>
      </div>
    </div>
  );
}

// ─── CAPTAIN CARD ─────────────────────────────────────────────────────────────
function CaptainCard({ captain }) {
  const linkedinUrl = captain.linkedin
    ? `https://www.linkedin.com/in/${captain.linkedin}` : null;
  return (
    <div className="group relative overflow-hidden border border-red-600/40 bg-zinc-900 shadow-[0_0_30px_rgba(220,38,38,0.1)] transition-all duration-300 hover:border-red-600/70">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 z-10" />
      <div className="absolute top-3 right-3 z-10 bg-white px-2 py-0.5 flex items-center gap-1">
        <Star size={8} className="text-black fill-black" />
        <span className="text-[8px] font-black uppercase tracking-widest text-black">Captain</span>
      </div>
      <div className="relative h-72 overflow-hidden">
        <Image
          src={captain.image}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover object-top group-hover:scale-105 transition-all duration-700"
          alt={captain.name}
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900/90 via-transparent to-transparent" />
      </div>
      <div className="p-5 border-t border-red-600/20">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-red-500 mb-1">Team Captain</p>
        <h4 className="font-black italic uppercase text-base text-white leading-tight tracking-tight">{captain.name}</h4>
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/30 hover:text-red-500 transition-colors text-[10px] font-mono uppercase tracking-wider mt-2">
            <Linkedin size={11} /> LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

// ─── DEPT PANEL ───────────────────────────────────────────────────────────────
function DeptPanel({ depts, membersMap }) {
  const [active, setActive] = useState(depts[0]?.key || null);
  const members = membersMap[active] || [];

  const leads = members.filter(isLead);
  const rest = members
    .filter(m => !isLead(m))
    .sort((a, b) => POSITION_ORDER.indexOf(a.position) - POSITION_ORDER.indexOf(b.position));

  const activeDept = depts.find(d => d.key === active);

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap border border-white/10">
        {depts.map(d => (
          <button
            key={d.key}
            onClick={() => setActive(d.key)}
            className={`px-6 py-3.5 font-black italic text-sm uppercase tracking-tight border-r border-white/10 last:border-r-0 transition-all duration-200 ${
              active === d.key ? "bg-red-600 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeDept && (
        <div className="border border-t-0 border-white/10 p-6 md:p-8">
          <div className="mb-8">
            <h4 className="text-xl font-black italic uppercase tracking-tight text-white">{activeDept.fullLabel}</h4>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/25 mt-1">
              {leads.length} Lead{leads.length !== 1 ? "s" : ""} · {rest.length} Member{rest.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Leads row */}
          {leads.length > 0 && (
            <div className="mb-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/25 mb-4">Unit Leads</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {leads.map(m => <LeadCard key={m._id} member={m} />)}
              </div>
            </div>
          )}

          {/* Members grid */}
          {rest.length > 0 && (
            <div>
              {leads.length > 0 && <div className="border-t border-white/8 mb-6" />}
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/25 mb-4">Members</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {rest.map(m => <MemberCard key={m._id} member={m} />)}
              </div>
            </div>
          )}

          {leads.length === 0 && rest.length === 0 && (
            <p className="text-white/20 font-mono text-xs uppercase tracking-widest py-10 text-center border border-white/5">
              No members assigned yet.
            </p>
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

// ─── MAIN ─────────────────────────────────────────────────────────────────────
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
    <section className="bg-black py-16 md:py-24 px-4 md:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* ── 1. CHAIN OF COMMAND ── */}
        <div>
          <SectionHeader label="01 · Team Structure" title="Chain of Command" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TOP_MANAGEMENT.map(p => <HierarchyCard key={p.key} person={p} />)}
            <CaptainCard captain={CAPTAIN} />
          </div>
        </div>

        {/* ── 2. TECHNICAL TEAM ── */}
        <div>
          <SectionHeader label="02 · Technical Team" title="Engineering Sub-Teams" />
          <DeptPanel depts={TECH_DEPTS} membersMap={techMap} />
        </div>

        {/* ── 3. MANAGERIAL TEAM ── */}
        <div>
          <SectionHeader label="03 · Managerial Team" title="Operations & Strategy" />
          <DeptPanel depts={MGMT_DEPTS} membersMap={mgmtMap} />
        </div>

      </div>
    </section>
  );
};

export default TeamMembers;
