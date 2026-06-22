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
      <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tight text-white">{title}</h2>
    </motion.div>
  );
}

const About = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0b0b0b_0%,#060606_100%)] text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="bg-[linear-gradient(180deg,#0b0b0b_0%,#060606_100%)]">
        {/* ── HERO ── */}
        <section className="relative w-full h-[70vh] overflow-hidden flex flex-col justify-end">
          <Image
            src="/team.jpg"
            fill
            priority
            alt="MIST Blitz Team"
            className="object-cover opacity-50 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/60 via-transparent to-transparent" />

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
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-24">

          {/* ── OUR TEAM ── */}
          <section>
            <SectionHeader label="01 Our Team" title="Building More Than Just Race Cars" />
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
            <SectionHeader label="03 The Competition" title="What Is Formula Student?" />
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <motion.p {...fadeUpDelay(0.1)} className="text-white/60 leading-relaxed text-base">
                  Formula Student (Formula SAE) is a global student engineering design competition
                  organised by SAE and regional hosts. Student teams design, build, and test a
                  formula-style prototype vehicle and present it to industry judges. Entries are
                  evaluated on engineering design, manufacturability & cost, business planning,
                  and on-track performance.
                </motion.p>
                <motion.p {...fadeUpDelay(0.15)} className="text-white/60 leading-relaxed text-base">
                  The competition combines static events (design, cost and business presentation)
                  with dynamic trials (acceleration, skidpad, autocross, and a long-distance endurance
                  that includes a fuel-economy component). Classes include combustion and electric
                  vehicles, and safety-focused technical rules (eg. engine restrictors or battery
                  limits) keep performance and costs appropriate for student teams.
                </motion.p>
              </div>
              <motion.div {...fadeUpDelay(0.1)} className="space-y-4">
                {[
                  { type: "Static Events", items: ["Engineering Design", "Cost & Manufacturing Analysis", "Business Plan Presentation"] },
                  { type: "Dynamic Events", items: ["Acceleration — straight-line sprint", "Skidpad — lateral grip / handling test", "Autocross — single-lap performance", "Endurance — long-distance reliability & fuel-economy"] },
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
            <SectionHeader label="04 Our Institution" title="Military Institute of Science & Technology" />
            <div className="max-w-3xl space-y-6">
              <motion.p {...fadeUpDelay(0.1)} className="text-white/60 leading-relaxed text-base md:text-lg">
                MIST is a leading engineering university in Bangladesh, known for a strong academic
                environment, modern laboratories, workshops, CAD facilities, and an active student
                community. It gives students the space to build real projects and turn engineering
                theory into practice.
              </motion.p>
              <motion.p {...fadeUpDelay(0.15)} className="text-white/60 leading-relaxed text-base md:text-lg">
                The university supports a wide range of disciplines, including Civil Engineering,
                Electrical and Computer Engineering, Mechanical Engineering, Biomedical and Nuclear
                Engineering, Architecture and Planning, and Science and Humanities. That broad base
                helps teams like MIST BLITZ work across design, fabrication, electronics, testing,
                and systems integration.
              </motion.p>
              <motion.p {...fadeUpDelay(0.2)} className="text-white/60 leading-relaxed text-base md:text-lg">
                For our team, MIST is more than a campus. It is the environment where collaboration,
                discipline, and hands-on engineering come together to create a race car from scratch.
              </motion.p>
              <motion.div {...fadeUpDelay(0.25)}>
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
