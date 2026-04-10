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

// ─── MEMBER CARD — full-bleed photo, text overlay ────────────────────────────
function MemberCard({ member }) {
  const linkedinUrl = member.linkedin
    ? member.linkedin.startsWith("http") ? member.linkedin : `https://www.linkedin.com/in/${member.linkedin}`
    : null;

  return (
    <div className="group relative aspect-3/4 overflow-hidden cursor-pointer">
      {/* Photo */}
      <Image
        src={member.image || "/placeholder.jpg"}
        fill
        sizes="(max-width: 768px) 50vw, 20vw"
        className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        alt={member.name}
      />
      {/* Gradient — only bottom third */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

      {/* Always-visible text */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-red-400 mb-0.5 leading-none">
          {member.position}
        </p>
        <h4 className="font-black italic uppercase text-sm text-white leading-tight tracking-tight">
          {member.name}
        </h4>
      </div>

      {/* LinkedIn — appears on hover */}
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="absolute top-3 right-3 w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:border-red-600 transition-all duration-200"
        >
          <Linkedin size={12} className="text-white" />
        </a>
      )}
    </div>
  );
}

// ─── LEAD CARD — taller, red accent ──────────────────────────────────────────
function LeadCard({ member }) {
  const linkedinUrl = member.linkedin
    ? member.linkedin.startsWith("http") ? member.linkedin : `https://www.linkedin.com/in/${member.linkedin}`
    : null;

  return (
    <div className="group relative aspect-3/4 overflow-hidden cursor-pointer">
      {/* Red top bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 z-20" />

      {/* Lead badge */}
      <div className="absolute top-3 left-3 z-20 bg-red-600 px-2 py-0.5">
        <span className="text-[8px] font-black uppercase tracking-widest text-white">Lead</span>
      </div>

      {/* Photo */}
      <Image
        src={member.image || "/placeholder.jpg"}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        alt={member.name}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-red-400 mb-1 leading-none">
          {member.position}
        </p>
        <h4 className="font-black italic uppercase text-base text-white leading-tight tracking-tight">
          {member.name}
        </h4>
      </div>

      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="absolute top-3 right-3 w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:border-red-600 transition-all duration-200"
        >
          <Linkedin size={12} className="text-white" />
        </a>
      )}
    </div>
  );
}

// ─── HIERARCHY CARD — same photo-dominant style ───────────────────────────────
function HierarchyCard({ person }) {
  return (
    <div className={`group relative aspect-3/4 overflow-hidden ${person.highlight ? "ring-1 ring-red-600" : ""}`}>
      {person.highlight && <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 z-20" />}

      <Image
        src={person.image}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
        alt={person.name}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.35em] text-red-400 mb-1 leading-none">{person.label}</p>
        <h4 className="font-black italic uppercase text-sm text-white leading-tight tracking-tight mb-0.5">{person.name}</h4>
        <p className="text-white/50 text-[10px] font-mono">{person.position}</p>
      </div>
    </div>
  );
}

// ─── CAPTAIN CARD ─────────────────────────────────────────────────────────────
function CaptainCard({ captain }) {
  const linkedinUrl = captain.linkedin
    ? `https://www.linkedin.com/in/${captain.linkedin}` : null;

  return (
    <div className="group relative aspect-3/4 overflow-hidden ring-1 ring-red-600">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 z-20" />
      <div className="absolute top-3 left-3 z-20 bg-white px-2 py-0.5 flex items-center gap-1">
        <Star size={7} className="text-black fill-black" />
        <span className="text-[8px] font-black uppercase tracking-widest text-black">Captain</span>
      </div>

      <Image
        src={captain.image}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
        alt={captain.name}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-mono text-[8px] uppercase tracking-[0.35em] text-red-400 mb-1 leading-none">Team Captain</p>
        <h4 className="font-black italic uppercase text-sm text-white leading-tight tracking-tight">{captain.name}</h4>
      </div>

      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 w-7 h-7 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:border-red-600 transition-all duration-200"
        >
          <Linkedin size={12} className="text-white" />
        </a>
      )}
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
