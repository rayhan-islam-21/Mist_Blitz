"use client";

import LogoLoop from "../LogoLoop";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

export default function PartnersScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xMove = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      ref={containerRef}
      className="relative selection:text-white selection:bg-red-600 bg-[#050505] max-w-7xl mx-auto overflow-hidden py-20 border-t border-white/5"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-linear(#fff 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="max-w-450 mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-2 mb-10">
          <motion.h2
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="text-5xl font-sans tracking-tighter md:text-[9rem] font-black uppercase italic leading-none"
          >
            Our <br />
            <span className="text-red-600">Sponsers</span>!
          </motion.h2>
        </div>
        <div className="relative">
          <div className="relative py-0 bg-white/0.1 backdrop-blur-3xl group">
            <div className="absolute inset-y-0 left-0 w-40 bg-linear-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-linear-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

            <div className="relative items-center flex justify-center overflow-hidden opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out">
              <LogoLoop
                logos={sponsorLogos}
                speed={60}
                direction="left"
                logoHeight={220}
                gap={40}
                hoverSpeed={0}
                scaleOnHover
                fadeOut={false}
                ariaLabel="Our partners"
              />
            </div>
          </div>
        </div>

        {/* 5. CALL TO ACTION TEXT */}
        <div className="mt-10 max-w-2xl border-l-4 border-red-600 pl-8">
          <p className="text-2xl md:text-4xl font-sans font-black italic uppercase leading-none text-white mb-6">
            The fuel behind <span className="text-red-600">Furiosa 1.0</span>
          </p>
          <p className="text-balance font-sans gap-10 text-gray-300 text-sm md:text-sm font-normal leading-relaxed">
            Our partners provide the high-precision hardware and strategic
            resources required to compete at the edge of physics. They don't
            just sponsor; they engineer the future with us.
          </p>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px white;
          color: transparent;
        }
      `}</style>
    </section>
  );
}
