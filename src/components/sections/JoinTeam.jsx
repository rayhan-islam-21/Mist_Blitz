"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import DeptCard from "../Deptcard";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu, LayoutPanelLeft, ShieldCheck } from "lucide-react";

const technicalTeams = [
  {
    title: "Suspension, Steering and Braking",
    image: "/dept/dept1.jpg",
    description:
      "Optimizing vehicle kinematics through damping, precision steering, and thermal braking systems.",
  },
  {
    title: "Chassis and Aerodynamics",
    image: "/dept/dept2.jpg",
    description:
      "Engineering lightweight spaceframes and high-downforce aero packages for peak cornering.",
  },
  {
    title: "Powertrain",
    image: "/dept/dept5.jpg",
    description:
      "Managing power delivery, engine calibration, transmission efficiency, and cooling cycles.",
  },
  {
    title: "Electronics",
    image: "/dept/dept6.jpg",
    description:
      "Implementing DAE, sensor fusion, live telemetry, and custom wire harness architecture.",
  },
];

const nonTechnicalTeams = [
  {
    title: "Management",
    image: "/dept/dept1.jpg",
    description:
      "Strategic project oversight and cross-departmental synchronization for milestone delivery.",
  },
  {
    title: "Finance",
    image: "/dept/dept7.jpg",
    description:
      "Budgetary architecture, managing sponsorship inflows, and fiscal procurement logistics.",
  },
  {
    title: "Logistics",
    image: "/dept/dept5.jpg",
    description:
      "Supply chain management and international deployment operations for vehicle transit.",
  },
  {
    title: "Documentation",
    image: "/dept/dept2.jpg",
    description:
      "Archival of engineering design reports for rigorous regulatory and compliance auditing.",
  },
  {
    title: "Business Plan Presentation",
    image: "/dept/dept7.jpg",
    description:
      "Synthesizing engineering value into a viable market model and industry pitch.",
  },
  {
    title: "Media",
    image: "/dept/dept6.jpg",
    description:
      "Identity architecture, brand narrative, and high-fidelity visual documentation.",
  },
];

const allDepts = [...technicalTeams, ...nonTechnicalTeams];


export default function JoinBlitzTeam() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const cardRefs = useRef([]);
  // Stable ref objects for AnimatedBeam (new object each render breaks beam tracking)
  const beamRefs = useRef(allDepts.map(() => ({ current: null })));

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ORBIT_RADIUS = 470;
  const CARD_W = 220;
  const CARD_H = 220;

  return (
    <section className="relative selection:bg-red-600 selection:text-white py-16 md:py-20 bg-[#050505] overflow-hidden flex flex-col items-center border-t border-white/5">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-20 mb-20 text-center px-4">
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-5xl md:text-[7rem] font-black text-white font-sans italic leading-none tracking-tighter uppercase"
        >
          TEAM <span className="text-red-600">BLITZ</span>
        </motion.h2>
      </div>
    {isMobile && (
  <div className="relative z-20 w-full max-w-md px-4 space-y-8 flex flex-col items-center">
    {allDepts.map((dept, i) => (
      <DeptCard
        key={dept.title}
        title={dept.title}
        description={dept.description}
        image={dept.image}
        className="w-full border border-white/5 bg-black/40 backdrop-blur-sm"
      />
    ))}
  </div>
)}


      {!isMobile && (
        <div
          ref={containerRef}
          className="relative w-full max-w-7xl h-295 flex items-center justify-center"
        >
          <div className="absolute top-0 left-10 p-6  font-mono text-[9px] text-gray-500 uppercase"></div>

          <div
            className="pointer-events-none absolute rounded-full border border-white/10"
            style={{
              width: ORBIT_RADIUS * 2 + CARD_W,
              height: ORBIT_RADIUS * 2 + CARD_W,
            }}
          />

          <div ref={centerRef} className="relative z-50">
            <div className="relative h-44 w-44 rounded-full bg-black border-4 border-red-600 overflow-hidden shadow-[0_0_80px_rgba(220,38,38,0.5)] group cursor-crosshair">
              <Image
                src="/furiosalogo.jpg"
                alt="Logo"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-red-600/10 group-hover:bg-transparent transition-colors" />
            </div>

            <div className="absolute -inset-5 rounded-full border border-red-600/20 animate-ping" />
          </div>

          {allDepts.map((dept, i) => {
            const angle = (i / allDepts.length) * 2 * Math.PI;
            const x = Math.cos(angle) * ORBIT_RADIUS;
            const y = Math.sin(angle) * ORBIT_RADIUS;

            return (
              <div
                key={dept.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                  beamRefs.current[i].current = el;
                }}
                className="absolute z-40 group"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  width: CARD_W,
                  height: CARD_H,
                  borderRadius: "9999px",
                  overflow: "hidden",
                }}
              >
                <div className="relative h-full w-full">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />

                  <DeptCard
                    title={dept.title}
                    description={dept.description}
                    image={dept.image}
                    className="w-full h-full rounded-full border border-white/10 group-hover:border-red-600/60 transition-all duration-500 bg-black/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            );
          })}

          {allDepts.map((_, i) => (
            <AnimatedBeam
              key={i}
              containerRef={containerRef}
              fromRef={beamRefs.current[i]}
              toRef={centerRef}
              curvature={i % 2 === 0 ? 40 : -40}
              duration={4.8}
              delay={i * 0.2}
              pathColor="rgba(255, 255, 255, 0.16)"
              gradientStartColor="#dc2626"
              gradientStopColor="#7f1d1d"
            />
          ))}
        </div>
      )}

      <div className="relative z-30 w-full bg-red-600 py-16 px-6 mt-10">
        <div className="max-w-4xl mx-auto text-center">
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
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </section>
  );
}
