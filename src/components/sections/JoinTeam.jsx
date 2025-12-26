"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import DeptCard from "../Deptcard";
import { motion } from "framer-motion";
import Button from "../ui/retro-btn";
import { Activity, Cpu, LayoutPanelLeft } from "lucide-react";

export default function JoinBlitzTeam() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const cardRefs = useRef([]);

  const [isMobile, setIsMobile] = useState(false);
  const [X, setX] = useState(520);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setX(Math.max(480, window.innerWidth * 0.32));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CARD_W = 320;
  const CARD_H = 420;
  const GAP_Y = 560;
  const curvatureMap = [-60, -20, -60, 60, 20, 60];

  const departments = [
    { title: "Suspension", image: "/dept/dept1.jpg", description: "Mechanical dynamics and damping optimization." },
    { title: "Brakes", image: "/dept/dept2.jpg", description: "Thermal management and deceleration systems." },
    { title: "Steering", image: "/dept/dept5.jpg", description: "Precision control and cockpit ergonomics." },
    { title: "Powertrain", image: "/dept/dept6.jpg", description: "Engine calibration and torque delivery." },
    { title: "Technical", image: "/dept/dept5.jpg", description: "Electronics, DAE, and sensor fusion." },
    { title: "Operations", image: "/dept/dept7.jpg", description: "Logistics, marketing, and team management." },
  ];

  const positions = [
    { x: -X, y: -GAP_Y },
    { x: -X, y: 0 },
    { x: -X, y: GAP_Y },
    { x: X, y: -GAP_Y },
    { x: X, y: 0 },
    { x: X, y: GAP_Y },
  ];

  return (
    <section className="relative min-h-screen py-24 md:py-40 bg-[#050505] overflow-hidden flex flex-col items-center border-t border-white/5">

      {/* 1. INDUSTRIAL BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* 2. HEADER: MASSIVE BRUTALIST STYLE */}
      <div className="relative z-20 mb-32 text-center px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
           <Cpu size={18} className="text-red-600 animate-pulse" />
           <span className="font-mono text-xs text-red-600 font-bold tracking-[0.5em] uppercase">Structural_Nexus</span>
        </div>
        <h2 className="text-6xl font-sans md:text-[10rem] font-black text-white italic leading-[0.8] tracking-tighter uppercase">
          TEAM <br /> <span className="text-transparent stroke-text">BLITZ.</span>
        </h2>
        <p className="mt-8 text-gray-500 font-mono text-[10px] tracking-[0.3em] uppercase max-w-lg mx-auto leading-relaxed border-t border-white/10 pt-6">
          // Cross-Functional Departmental Interconnectivity System // Version 1.0_FSC
        </p>
      </div>

      {/* ---------- MOBILE / VERTICAL CARDS ---------- */}
      {isMobile && (
        <div className="relative z-20 w-full max-w-md px-4 space-y-12">
          {departments.map((dept) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              key={dept.title}
            >
              <DeptCard
                title={dept.title}
                description={dept.description}
                image={dept.image}
                className="w-full h-100 border border-white/10 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl shadow-red-600/5"
              />
            </motion.div>
          ))}
          <div className="flex justify-center mt-12 pb-10">
            <Button className="px-12 py-6 bg-red-600 text-white border-none hover:bg-red-700 transition-all skew-x-[-10deg]">
              <span className="font-black uppercase tracking-widest italic skew-x-[10deg]">
                Initialize Recruitment
              </span>
            </Button>
          </div>
        </div>
      )}

      {/* ---------- DESKTOP / CIRCULAR BEAM LAYOUT ---------- */}
      {!isMobile && (
        <div ref={containerRef} className="relative w-full max-w-[1600px] h-[1400px]">
          
          {/* HUD Decoration (Fixed corners of the graph) */}
          <div className="absolute top-0 left-0 p-8 border-l border-t border-white/10 opacity-30">
            <LayoutPanelLeft size={20} className="text-white mb-2" />
            <span className="font-mono text-[8px] text-white uppercase tracking-widest">Sys_Status: Link_Active</span>
          </div>

          {/* Center Hub: The Reactor Core */}
          <div ref={centerRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 rounded-full bg-red-600/30 blur-[60px] animate-pulse group-hover:bg-red-600/50 transition-all duration-700" />
              <div className="relative h-44 w-44 rounded-full bg-black border-[3px] border-red-600 overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                <Image src="/furiosalogo.jpg" alt="Logo" fill className="object-cover transition-transform group-hover:scale-110 duration-700" />
              </div>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-red-600 font-bold uppercase tracking-[0.4em]">
                Core_Node
              </div>
            </div>
          </div>

          {/* Cards: Industrial Modules */}
          {departments.map((dept, i) => (
            <div
              key={dept.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute left-1/2 top-1/2 z-40 group"
              style={{
                transform: `translate(-50%, -50%) translate(${positions[i].x}px, ${positions[i].y}px)`,
                width: CARD_W,
                height: CARD_H,
              }}
            >
              <DeptCard
                title={dept.title}
                description={dept.description}
                image={dept.image}
                className="w-full h-full border border-white/10 grayscale group-hover:grayscale-0 group-hover:border-red-600/50 transition-all duration-700"
              />
            </div>
          ))}

          {/* Beams: Energy Conduits */}
          {departments.map((_, i) => (
            <AnimatedBeam
              key={i}
              containerRef={containerRef}
              fromRef={{ current: cardRefs.current[i] }}
              toRef={centerRef}
              curvature={curvatureMap[i]}
              duration={5}
              delay={i * 0.4}
              pathColor="rgba(255, 255, 255, 0.05)"
              gradientStartColor="#dc2626"
              gradientEndColor="#7f1d1d"
            />
          ))}

          {/* Desktop CTA: Heavy Button */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
            <Button className="px-12 py-6 bg-red-600 text-white hover:bg-red-700 border-none transition-all group overflow-hidden relative skew-x-[-12deg]">
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[45deg]" />
              <span className="relative font-black uppercase text-xl tracking-[0.2em] italic skew-x-[12deg]">
                Initialize Recruitment
              </span>
            </Button>
          </div>
        </div>
      )}

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px white;
          color: transparent;
        }
      `}</style>

      {/* 7. BRUTALIST DATA MARQUEE */}
      <div className="absolute bottom-0 -rotate-0.5 left-0 w-full bg-red-600 py-6 overflow-hidden whitespace-nowrap border-y border-black z-50">
        <div className="flex animate-marquee">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-white font-mono text-[16px] md:text-lg font-black uppercase tracking-[0.3em] mx-10">
                SYSTEM_STATUS: OPTIMIZED // RECRUITMENT_PHASE: ACTIVE // CORE_TEMP: NOMINAL // ALLIANCE_SYNC: 100% // 
              </span>
              <span className="text-white font-mono text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mx-10">
                MIST_BLITZ_FSC_2024 // FURIA_1.0_CHASSIS_STABLE // 
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px white;
          color: transparent;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}