"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import DeptCard from "../Deptcard";
import { motion } from "framer-motion";
import Button from "../ui/retro-btn";
import { Activity, Cpu, LayoutPanelLeft, ShieldCheck, Zap } from "lucide-react";

/* ---------------- DATA ---------------- */

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

const handleJoinClick = () => {
  const email = "recruitment@mistblitz.com";
  const subject = encodeURIComponent("RECRUITMENT_PHASE_2025 // [NAME] // [DEPT]");
  
  const body = encodeURIComponent(
    "FULL_NAME: \n" +
    "STUDENT_ID: \n" +
    "DEPARTMENT/MAJOR: \n" +
    "LEVEL/TERM: \n\n" +
    
    "TARGET_UNIT: [Select: SSB | Chassis | Aero | Powertrain | Electronics | Mgmt | Media]\n" +
    "EXPERIENCE_LOG: [Years of experience or previous project involvements]\n\n" +
    
    "CORE_COMPETENCIES:\n" +
    "1. \n" +
    "2. \n" +
    "3. \n\n" +
    
    "LINK_PORTFOLIO: [Link to GitHub / Behance / Drive]\n\n" +
    
    "[Why do you want to join MIST BLITZ? Max 2 sentences]\n\n" +
    
    "--------------------------------------------------\n" +
    "REQUIRED_ATTACHMENTS:\n" +
    "[X] CV_FORMAT_PDF\n" +
    "[ ] PROJECT_PORTFOLIO\n" +
    "--------------------------------------------------\n" +
    "EOF_TRANSMISSION // END_OF_LOG"
  );

  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};

export default function JoinBlitzTeam() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const cardRefs = useRef([]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Spatial Constants for the "Satellite" Orbit
  const RADIUS_X = 630; // Horizontal stretch of the orbit
  const RADIUS_Y = 630; // Vertical stretch of the orbit
  const CARD_W = 280;
  const CARD_H = 320;

  return (
    <section className="relative min-h-screen py-24 md:py-40 bg-[#050505] overflow-hidden flex flex-col items-center border-t border-white/5">
      {/* 1. INDUSTRIAL BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-20 mb-32 text-center px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Activity size={16} className="text-red-600 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.5em] text-red-600 uppercase bg-red-600/10 px-3 py-1">
            Blitz_Core_Team
          </span>
        </div>
        <h2 className="text-6xl md:text-9xl font-black text-white font-sans italic leading-[0.8] tracking-tighter uppercase">
          TEAM <span className="text-red-600">BLITZ</span>
        </h2>
      </div>

      {/* ---------- MOBILE LAYOUT ---------- */}
      {isMobile && (
        <div className="relative z-20 w-full max-w-md px-4 space-y-8">
          {allDepts.map((dept, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={dept.title}
            >
              <DeptCard
                {...dept}
                className="w-full h-96 border border-white/10"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* ---------- DESKTOP CIRCULAR LAYOUT ---------- */}
      {!isMobile && (
        <div
          ref={containerRef}
          className="relative w-full max-w-[1800px] h-[1800px] flex items-center justify-center"
        >
          {/* HUD Status Elements */}
          <div className="absolute top-0 left-10 p-6  font-mono text-[9px] text-gray-500 uppercase"></div>

          {/* Center Hub: The Reactor Core */}
          <div ref={centerRef} className="relative z-50">
            <div className="relative h-32 w-32 rounded-full bg-black border-[4px] border-red-600 overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.3)] group cursor-crosshair">
              <Image
                src="/furiosalogo.jpg"
                alt="Logo"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-red-600/10 group-hover:bg-transparent transition-colors" />
            </div>
            {/* Pulsing Ring */}
            <div className="absolute inset-[-20px] rounded-full border border-red-600/20 animate-ping" />
          </div>

          {/* Cards arranged in an ellipse */}
          {allDepts.map((dept, i) => {
            const angle = (i / allDepts.length) * 2 * Math.PI;
            const x = Math.cos(angle) * RADIUS_X;
            const y = Math.sin(angle) * RADIUS_Y;

            return (
              <div
                key={dept.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className="absolute z-40 group"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  width: CARD_W,
                  height: CARD_H,
                }}
              >
                <div className="relative h-full w-full">
                  {/* Visual Connection Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />

                  <DeptCard
                    title={dept.title}
                    description={dept.description}
                    image={dept.image}
                    className="w-full h-full border border-white/5 group-hover:border-red-600/50 transition-all duration-500 bg-black/40 backdrop-blur-sm"
                  />
                </div>
              </div>
            );
          })}

          {/* Beams Connecting All Nodes */}
          {allDepts.map((_, i) => (
            <AnimatedBeam
              key={i}
              containerRef={containerRef}
              fromRef={{ current: cardRefs.current[i] }}
              toRef={centerRef}
              curvature={i % 2 === 0 ? 40 : -40}
              duration={4 + Math.random() * 2}
              delay={i * 0.2}
              pathColor="rgba(255, 255, 255, 0.03)"
              gradientStartColor="#dc2626"
              gradientEndColor="#000000"
            />
          ))}
        </div>
      )}

      {/* FINAL CTA */}
      <div className="relative z-30 mt-20 mb-32">
        <Button onClick={handleJoinClick} className="px-16 py-8 bg-red-600 text-white hover:bg-white hover:text-red-600 border-none transition-all group overflow-hidden skew-x-[-12deg]">
          <span className="relative font-black uppercase text-2xl tracking-[0.3em] italic skew-x-[12deg] flex items-center gap-4">
            <Zap className="fill-current" /> Join the Blitz
          </span>
        </Button>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </section>
  );
}
