"use client";

import LogoLoop from "../LogoLoop";
import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const spon = [
  { logo: "/sponsers/sp9.png" },
  { logo: "/sponsers/sp2.png" },
  { logo: "/sponsers/sp3.png" },
  { logo: "/sponsers/sp4.png" },
  { logo: "/sponsers/sp5.png" },
  { logo: "/sponsers/sp8.png" },
  { logo: "/sponsers/sp6.png" },
  { logo: "/sponsers/sp7.png" },
];

const sponsors = [...spon, ...spon];
const sponsorLogos = sponsors.map((s) => ({
  src: s.logo,
  alt: "Strategic Partner",
}));

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function PartnersScroll() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050505] selection:text-white selection:bg-red-600 border-t border-white/5 py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-14 pb-10 border-b border-white/5"
        >
          <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter text-white">
            Our <span className="text-red-600">Sponsors</span>
          </h2>
        </motion.div>

        {/* Logo strip */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="flex items-center overflow-hidden opacity-75 hover:opacity-100 transition-opacity duration-700 group">
            <LogoLoop
              logos={sponsorLogos}
              speed={60}
              direction="left"
              logoHeight={180}
              gap={48}
              hoverSpeed={0}
              scaleOnHover
              fadeOut={false}
              ariaLabel="Our partners"
            />
          </div>
        </div>

      </div>

      {/* Bottom CTA — full width red banner */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mt-16 bg-red-600 py-16 px-6 text-center"
      >
        <h3 className="text-3xl md:text-5xl font-black italic uppercase text-white mb-4 tracking-tight">
          Ready to Partner?
        </h3>
        <p className="text-red-100 text-sm md:text-base max-w-lg mx-auto mb-10">
          Download our sponsorship proposal for full details on partnership
          benefits, our team, and competition plans.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/sponsorship-proposal.pdf"
            download
            className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-red-600 font-black text-xs uppercase tracking-widest px-10 py-4 transition-all"
          >
            Download Proposal (PDF)
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-red-600 font-black text-xs uppercase tracking-widest px-10 py-4 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
