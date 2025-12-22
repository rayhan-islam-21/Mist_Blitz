"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import DeptCard from "../Deptcard";
import { GridPattern } from "../ui/grid-pattern";
import Button from "../ui/retro-btn";
import { Highlighter } from "../ui/highlighter";

export default function JoinBlitzTeam() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);

  // Stable refs for beams
  const cardRefs = useRef([]);

  const [isMobile, setIsMobile] = useState(false);
  const [X, setX] = useState(520);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // mobile if width < 1024
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
    <section className="relative min-h-screen py-24 md:py-40 bg-gray-100 overflow-hidden flex flex-col items-center">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <GridPattern className="opacity-80" strokeDasharray="4 4" />
      </div>

      {/* Title */}
      <div className="relative z-20 mb-20 md:mb-40 text-center px-4">
        <h2 className="text-5xl md:text-8xl font-black text-black italic tracking-wide">
          <Highlighter>TEAM <span className="text-red-600">BLITZ</span></Highlighter>
        </h2>
        <p className="mt-4 text-red-500 font-mono text-xs tracking-[0.35em] uppercase">
          Departmental Structural Overview
        </p>
      </div>

      {/* ---------- MOBILE / VERTICAL CARDS ---------- */}
      {isMobile && (
        <div className="relative z-20 w-full max-w-md px-4 space-y-10">
          {departments.map((dept) => (
            <DeptCard
              key={dept.title}
              title={dept.title}
              description={dept.description}
              image={dept.image}
              className="w-full h-100"
            />
          ))}
          <div className="flex justify-center mt-8">
            <Button className="px-12 py-5 bg-red-600 text-white border-b-4 border-red-900 active:translate-y-1">
              <span className="font-black uppercase tracking-widest italic">
                Initialize Recruitment
              </span>
            </Button>
          </div>
        </div>
      )}

      {/* ---------- DESKTOP / CIRCULAR BEAM LAYOUT ---------- */}
      {!isMobile && (
        <div
          ref={containerRef}
          className="relative w-full max-w-400 h-350"
        >
          {/* Center Hub */}
          <div
            ref={centerRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="relative -z-10  scale-125">
              <div className="absolute inset-0 rounded-full bg-red-600/20 blur-3xl animate-pulse" />
              <div className="relative h-32 w-32 rounded-full bg-black border-2 border-red-600 overflow-hidden">
                <Image src="/furiosalogo.jpg" alt="Logo" fill className="object-cover " />
              </div>
            </div>
          </div>

          {/* Cards */}
          {departments.map((dept, i) => (
            <div
              key={dept.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute left-1/2 top-1/2 z-40"
              style={{
                transform: `
                  translate(-50%, -50%)
                  translate(${positions[i].x}px, ${positions[i].y}px)
                `,
                width: CARD_W,
                height: CARD_H,
              }}
            >
              <DeptCard
                title={dept.title}
                description={dept.description}
                image={dept.image}
                className="w-full h-full"
              />
            </div>
          ))}

          {/* Beams */}
          {departments.map((_, i) => (
            <AnimatedBeam
              key={i}
              containerRef={containerRef}
              fromRef={{ current: cardRefs.current[i] }}
              toRef={centerRef}
              curvature={curvatureMap[i]}
              duration={4}
              delay={i * 0.3}
              pathColor="#2563eb"
              gradientStartColor="#ff001e"
              gradientEndColor="#ff001e"
            />
          ))}

          {/* Desktop CTA */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20">
            <Button className="px-12 -rotate-2 hover:rotate-0 transition-all delay-75 py-5 bg-red-600 text-white border-b-4 border-red-900 active:translate-y-1">
              <span className="font-black uppercase tracking-widest italic">
                Initialize Recruitment
              </span>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
