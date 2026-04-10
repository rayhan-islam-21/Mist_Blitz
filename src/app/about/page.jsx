"use client";
import { motion } from "framer-motion";
import WhatWeDo from "@/components/about/WhatWeDo";
import MISTBlitzIntro from "@/components/about/MISTBlitzIntro";
import Achievements from "@/components/about/Achievements";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Link from "next/link";

const fadeUp = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const fadeUpDelay = (delay = 0) => ({
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

function SectionHeader({ label, title }) {
  return (
    <motion.div {...fadeUp} className="mb-10 border-l-2 border-red-600 pl-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-500 mb-1">{label}</p>
      <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight text-white">{title}</h2>
    </motion.div>
  );
}

const About = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="bg-[#0a0a0a]">
        {/* ── HERO ── */}
        <section className="relative w-full h-[70vh] overflow-hidden flex flex-col justify-end">
          <Image
            src="/team.jpg"
            fill
            priority
            alt="MIST Blitz Team"
            className="object-cover opacity-50 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />

          <div className="relative z-10 px-6 md:px-16 pb-12">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-[12vw] md:text-[9vw] font-black italic uppercase leading-none tracking-tighter text-white">
                About <span className="text-red-600">Blitz</span>
              </h1>
              <p className="text-white/50 text-base md:text-lg mt-4 max-w-lg">
                Bangladesh&apos;s Formula Student team — built from scratch at MIST.
              </p>
            </motion.div>
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 space-y-24">

          {/* ── OUR TEAM ── */}
          <section>
            <SectionHeader label="01 · Our Team" title="Building More Than Just Race Cars" />
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <motion.p {...fadeUpDelay(0.1)} className="text-white/60 leading-relaxed text-base">
                  Founded at the Military Institute of Science and Technology, MIST Blitz represents
                  the pinnacle of student engineering. Our journey isn&apos;t just about the finish line —
                  it&apos;s about thousands of hours in the workshop, precision CAD design, and the grit
                  required to build a high-performance machine from scratch.
                </motion.p>

                <motion.div {...fadeUpDelay(0.15)} className="grid grid-cols-2 gap-4">
                  <div className="border border-white/10 p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/25 mb-1">Vision</p>
                    <p className="text-white/60 text-sm leading-relaxed">
                      To become Bangladesh&apos;s leading Formula Student team, recognised globally for engineering excellence.
                    </p>
                  </div>
                  <div className="border border-white/10 p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/25 mb-1">Mission</p>
                    <p className="text-white/60 text-sm leading-relaxed">
                      To develop world-class engineers through hands-on, competitive, real-world vehicle design.
                    </p>
                  </div>
                </motion.div>

                <motion.div {...fadeUpDelay(0.2)} className="flex gap-10 border-t border-white/8 pt-8">
                  {[
                    { val: "31+", label: "Active Members" },
                    { val: "01", label: "Race Car Built" },
                    { val: "100%", label: "In-house Design" },
                  ].map((s, i) => (
                    <div key={i}>
                      <p className="text-3xl font-black italic text-red-600">{s.val}</p>
                      <p className="text-white/30 text-xs font-mono uppercase tracking-wider mt-1">{s.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div {...fadeUpDelay(0.1)} className="relative h-80 md:h-120 overflow-hidden border border-white/10 group">
                <Image
                  src="/car2.jpg"
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-700"
                  alt="MIST Blitz Car"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
              </motion.div>
            </div>
          </section>

          {/* ── MIST BLITZ INTRO COMPONENT ── */}
          <section>
            <MISTBlitzIntro />
          </section>

          {/* ── WHAT WE DO ── */}
          <section className="border-t border-white/8 pt-16">
            <WhatWeDo />
          </section>

          {/* ── FORMULA STUDENT ── */}
          <section className="border-t border-white/8 pt-16">
            <SectionHeader label="03 · The Competition" title="What Is Formula Student?" />
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <motion.p {...fadeUpDelay(0.1)} className="text-white/60 leading-relaxed text-base">
                  Formula Student is the world&apos;s largest engineering design competition for university
                  students. Teams design, build, and race a small formula-style race car. Judges evaluate
                  engineering design, cost analysis, business planning, and dynamic performance.
                </motion.p>
                <motion.p {...fadeUpDelay(0.15)} className="text-white/60 leading-relaxed text-base">
                  It prepares students for real-world engineering careers by demanding end-to-end
                  ownership — from concept to competition-ready vehicle.
                </motion.p>
              </div>
              <motion.div {...fadeUpDelay(0.1)} className="space-y-4">
                {[
                  { type: "Static Events", items: ["Engineering Design Event", "Cost & Manufacturing Analysis", "Business Plan Presentation"] },
                  { type: "Dynamic Events", items: ["Acceleration — 75m sprint", "Skid Pad — figure-8 handling", "Autocross — single-lap performance", "Endurance — 22km reliability race"] },
                ].map((group, i) => (
                  <div key={i} className="border border-white/10 p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-red-500 mb-3">{group.type}</p>
                    <ul className="space-y-1.5">
                      {group.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-white/50">
                          <span className="w-1 h-1 bg-red-600 shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── OUR UNIVERSITY ── */}
          <section className="border-t border-white/8 pt-16">
            <SectionHeader label="04 · Our Institution" title="Military Institute of Science & Technology" />
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <motion.p {...fadeUpDelay(0.1)} className="text-white/60 leading-relaxed text-base">
                  MIST is one of Bangladesh&apos;s leading engineering universities, providing world-class
                  facilities and a rigorous academic environment. Our team benefits from Mechanical and
                  Electrical engineering departments, workshops, CAD labs, and a driven student community.
                </motion.p>
                <motion.div {...fadeUpDelay(0.15)}>
                  <Link
                    href="https://mist.ac.bd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-red-600/50 text-red-500 hover:bg-red-600 hover:text-white px-6 py-3 text-xs font-black uppercase tracking-widest transition-all duration-200"
                  >
                    Visit MIST →
                  </Link>
                </motion.div>
              </div>
              <motion.div {...fadeUpDelay(0.1)} className="space-y-3">
                {[
                  { dept: "Mechanical Engineering", support: "Fabrication facilities, design supervision, CNC access" },
                  { dept: "Electrical & Electronic Engineering", support: "Electronics labs, embedded systems mentorship" },
                  { dept: "Civil Engineering", support: "Structural analysis guidance" },
                ].map((item, i) => (
                  <div key={i} className="border border-white/10 p-4 hover:border-red-600/30 transition-colors">
                    <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-red-500 mb-1">{item.dept}</p>
                    <p className="text-white/40 text-sm">{item.support}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── ACHIEVEMENTS ── */}
          <section className="border-t border-white/8 pt-16">
            <Achievements />
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
