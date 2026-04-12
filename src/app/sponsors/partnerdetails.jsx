"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SponsorButton from "@/components/ui/sponser-btn";

const TIERS = [
  {
    id: "platinum",
    label: "Platinum",
    number: "01",
    accent: "border-red-600",
    accentText: "text-red-500",
    sponsors: [
      {
        name: "Dongfeng Motor",
        logo: "/sponsers/sp1.png",
        tag: "Automotive & Infrastructure",
        website: "https://www.dongfeng-global.com/",
        bio: "Global automotive leader focused on innovative vehicle manufacturing, sustainable infrastructure solutions, and smart mobility technologies. A cornerstone partner of MIST Blitz's international campaign.",
      },
      {
        name: "Radiant Pharmaceuticals",
        logo: "/sponsers/sp2.png",
        tag: "Healthcare",
        website: "https://www.radiantpharmabd.com/",
        bio: "Bangladesh's leading pharmaceutical company specializing in high-quality medicine production and healthcare solutions. Proud supporter of the next generation of engineers.",
      },
    ],
  },
  {
    id: "diamond",
    label: "Diamond",
    number: "02",
    accent: "border-white/40",
    accentText: "text-white/60",
    sponsors: [
      {
        name: "Seven Rings Cement",
        logo: "/sponsers/sp3.png",
        tag: "Construction & Materials",
        website: "https://sevenringscement.com/",
        bio: "Premier cement manufacturer delivering innovative construction materials and sustainable building solutions across international markets.",
      },
      {
        name: "Dassault Systèmes",
        logo: "/sponsers/sp4.png",
        tag: "Software & Engineering",
        website: "https://www.3ds.com/",
        bio: "Global leader in 3D design, engineering software, and cloud-based simulation powering next-generation product development for Formula Student teams worldwide.",
      },
    ],
  },
  {
    id: "gold",
    label: "Gold",
    number: "03",
    accent: "border-yellow-500/50",
    accentText: "text-yellow-500/70",
    sponsors: [
      {
        name: "Rapid Harness",
        logo: "/sponsers/sp5.png",
        tag: "Electrical & Aerospace",
        website: "https://rapidharness.com/",
        bio: "Specializes in high-performance wiring harnesses for aerospace and industrial applications, ensuring reliability in the most critical systems.",
      },
      {
        name: "Ventra International",
        logo: "/sponsers/sp6.png",
        tag: "Energy & Industrial",
        website: "https://ventra-international.com/",
        bio: "Global energy solutions provider focused on renewable energy systems, industrial efficiency, and innovative power management technologies.",
      },
    ],
  },
];

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function PremiumPartners() {
  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ── ALL TIERS ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-24">
        {TIERS.map((tier) => (
          <motion.div
            key={tier.id}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Tier Header */}
            <motion.div variants={fadeUp} className="flex items-center gap-5 mb-10">
              <span className="font-mono text-[10px] text-white/20 tracking-widest">{tier.number}</span>
              <div className={`h-px flex-1 ${tier.accent} border-t`} />
              <span className={`font-black italic uppercase text-sm tracking-widest ${tier.accentText}`}>
                {tier.label}
              </span>
              <div className={`h-px w-12 ${tier.accent} border-t`} />
            </motion.div>

            {/* Sponsor Cards */}
            <div className={`grid gap-4 ${tier.id === "platinum" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2"}`}>
              {tier.sponsors.map((sponsor) => (
                <motion.div key={sponsor.name} variants={fadeUp}>
                  <Link
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col h-full border border-white/8 hover:border-white/20 bg-white/2 hover:bg-white/4 transition-all duration-500 p-8 md:p-10"
                  >
                    {/* Top row: logo + arrow */}
                    <div className="flex items-start justify-between mb-10">
                      <div className="relative w-48 h-24 bg-white rounded-sm flex items-center justify-center p-3 shrink-0">
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          fill
                          className="object-contain p-3"
                        />
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-white/20 group-hover:text-red-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mb-2">{sponsor.tag}</p>
                      <h3 className="font-black italic uppercase text-2xl md:text-3xl tracking-tight text-white group-hover:text-red-500 transition-colors duration-300 mb-4 leading-tight">
                        {sponsor.name}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed">
                        {sponsor.bio}
                      </p>
                    </div>

                    {/* Bottom */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className={`font-mono text-[9px] uppercase tracking-widest ${tier.accentText}`}>
                        {tier.label} Partner
                      </span>
                      <span className="text-[9px] text-white/20 uppercase tracking-widest font-mono group-hover:text-white/40 transition-colors">
                        Visit Site →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── CTA BANNER ── */}
      <section className="bg-red-600 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-red-200 text-xs uppercase tracking-widest font-black mb-3">Partner With Us</p>
            <h3 className="text-3xl md:text-5xl font-sans font-black italic uppercase text-white leading-tight mb-4">
              Become a<br />Sponsor
            </h3>
            <ul className="space-y-2 text-red-100 text-sm">
              <li className="flex items-center gap-2"><span className="text-white text-xs">▶</span> Brand visibility on car &amp; team kit</li>
              <li className="flex items-center gap-2"><span className="text-white text-xs">▶</span> Direct access to top engineering talent</li>
              <li className="flex items-center gap-2"><span className="text-white text-xs">▶</span> Long-term strategic collaboration</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-red-100 text-sm max-w-sm">
              Sponsorship tiers are limited. Applications are reviewed based on strategic alignment and impact potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <a
                href="/sponsorship-proposal.pdf"
                download
                className="cta-btn bg-white text-red-600 hover:bg-red-50"
              >
                Download Proposal (PDF)
              </a>
              <SponsorButton />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
