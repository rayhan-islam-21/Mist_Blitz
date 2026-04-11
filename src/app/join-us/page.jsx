"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";
import Link from "next/link";

const departments = [
  {
    category: "Technical",
    roles: [
      { name: "Suspension & Steering", desc: "Design and optimize the suspension geometry, steering system, and braking components." },
      { name: "Chassis & Aerodynamics", desc: "Fabricate the space frame chassis and develop aerodynamic bodywork and wings." },
      { name: "Powertrain", desc: "Engine tuning, drivetrain integration, cooling systems, and fuel delivery." },
      { name: "Electronics", desc: "Wiring harness, ECU configuration, data acquisition, and embedded systems." },
    ],
  },
  {
    category: "Managerial",
    roles: [
      { name: "Management", desc: "Team coordination, scheduling, and internal operations." },
      { name: "Finance", desc: "Budgeting, expense tracking, and financial reporting." },
      { name: "Marketing & Media", desc: "Social media, photography, videography, and brand communication." },
      { name: "Business Plan", desc: "Writing and presenting the team's business plan for competition." },
      { name: "Logistics", desc: "Equipment management, shipping, and travel coordination." },
      { name: "Documentation", desc: "Technical reports, design documents, and record keeping." },
    ],
  },
];

const process = [
  { step: "01", title: "Apply Online", desc: "Fill out the application form with your background, interests, and motivation." },
  { step: "02", title: "Initial Screening", desc: "The team reviews applications and shortlists candidates based on fit and skills." },
  { step: "03", title: "Interview", desc: "A short technical or managerial interview with relevant team leads." },
  { step: "04", title: "Welcome Aboard", desc: "Selected members are onboarded, assigned to a department, and start contributing." },
];

const JoinUsPage = () => {
  const [activeCategory, setActiveCategory] = useState("Technical");
  const dept = departments.find((d) => d.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative w-full h-[70vh] overflow-hidden flex flex-col justify-end">
        <Image src="/team.jpg" fill alt="Join Us" className="object-cover opacity-50 transition-all duration-700" priority />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/60 via-transparent to-transparent" />
        <div className="relative z-10 px-6 md:px-16 pb-12">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="text-[12vw] md:text-[9vw] font-black italic uppercase leading-none tracking-tighter text-white">
              Join <span className="text-red-600">Us</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg mt-4 max-w-lg">
              Passionate about engineering? Be part of the Blitz family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join */}
      <section className="bg-[#0a0a0a] py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Why Join the Team</h2>
            <h3 className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-6">
              Build More Than a Car
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              MIST Blitz is more than a student club — it&apos;s a real engineering team competing at the highest student level globally.
              You won&apos;t just learn from books; you&apos;ll design, fabricate, test, and race.
            </p>
            <ul className="space-y-4">
              {[
                "Real hands-on engineering experience",
                "Work alongside talented peers from MIST",
                "Gain international competition exposure",
                "Build a standout portfolio and CV",
                "Access to workshops, tools, and mentorship",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="text-red-600 mt-1 text-xs">▶</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "50+", label: "Active Members" },
              { value: "4", label: "Tech Departments" },
              { value: "6", label: "Support Departments" },
              { value: "100%", label: "Student Run" },
            ].map((s, i) => (
              <div key={i} className="border border-white/10 p-6 text-center">
                <p className="text-3xl font-black text-red-600 font-sans italic">{s.value}</p>
                <p className="text-gray-500 text-xs uppercase tracking-widest mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles & Departments */}
      <section className="bg-[#111111] border-y border-white/5 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">Open Roles</h2>
          <p className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-10">
            Where You Fit In
          </p>
          <div className="flex gap-4 mb-10 border-b border-white/10">
            {departments.map((d) => (
              <button
                key={d.category}
                onClick={() => setActiveCategory(d.category)}
                className={`pb-4 px-2 text-sm font-black uppercase tracking-widest transition-all duration-300 border-b-2 ${
                  activeCategory === d.category
                    ? "border-red-600 text-white"
                    : "border-transparent text-white/30 hover:text-white/60"
                }`}
              >
                {d.category}
              </button>
            ))}
          </div>
          {dept && (
            <div className="grid md:grid-cols-2 gap-5">
              {dept.roles.map((role, i) => (
                <div key={i} className="border border-white/10 p-6 hover:border-red-600/40 transition-colors duration-300">
                  <h4 className="text-lg font-black uppercase italic text-white mb-2">{role.name}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{role.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-[#0a0a0a] py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs uppercase tracking-widest text-red-500 mb-2 font-bold">How to Apply</h2>
          <p className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-12">
            Application Process
          </p>
          <div className="grid md:grid-cols-4 gap-0">
            {process.map((p, i) => (
              <div key={i} className="relative border border-white/10 p-8">
                <div className="text-5xl font-black text-white/5 italic absolute top-4 right-6">{p.step}</div>
                <p className="text-red-500 text-xs uppercase tracking-widest font-bold mb-3">Step {p.step}</p>
                <h4 className="text-lg font-black uppercase italic text-white mb-3">{p.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section id="apply" className="bg-red-600 py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white mb-4">
            Ready to Join?
          </h3>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">
            Applications are open. Take the first step and become part of Bangladesh&apos;s premier Formula Student team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="cta-btn bg-white text-red-600 hover:bg-red-50"
            >
              Apply via Contact Form
            </Link>
            <a
              href="mailto:info@mistblitz.com"
              className="cta-btn border-2 border-white text-white hover:bg-white hover:text-red-600"
            >
              Email Us Directly
            </a>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default JoinUsPage;
