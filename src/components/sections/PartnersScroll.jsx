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
      className="relative bg-[#050505] selection:text-white selection:bg-red-600 border-t border-white/5 py-20 px-4 md:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

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

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-14 grid md:grid-cols-2 gap-10 pt-10 border-t border-white/5 items-center"
        >
          <div className="border-l-2 border-red-600 pl-6">
            <p className="text-xl md:text-2xl font-black italic uppercase leading-tight text-white mb-3">
              The fuel behind <span className="text-red-600">Furiosa 1.0</span>
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              Our partners provide the high-precision hardware and strategic
              resources required to compete at the edge of physics. They
              don&apos;t just sponsor — they engineer the future with us.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/20">
              Interested in partnering with MIST BLITZ?
            </p>
            <Link
              href="/sponsors"
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-mono text-[11px] uppercase tracking-widest px-5 py-3 transition-colors"
            >
              Become a Sponsor
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
