"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import DeptCard from "../Deptcard";
import { GridPattern } from "../ui/grid-pattern";
import Button from "../ui/retro-btn";

export default function JoinBlitzTeam() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);

  const refs = Array.from({ length: 6 }, () => useRef(null));

  // Fixed horizontal distance from center
  const [X, setX] = useState(520);
  const curvatureMap = [-60, -20, -60, 60, 20, 60];

  useEffect(() => {
    const update = () => {
      setX(Math.max(480, window.innerWidth * 0.32));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const CARD_W = 320;
  const CARD_H = 420;
  const GAP_Y = 560; // vertical spacing ( > height )

  const departments = [
    {
      title: "Suspension",
      image: "/dept/dept1.jpg",
      description: "Mechanical dynamics and damping optimization.",
    },
    {
      title: "Brakes",
      image: "/dept/dept2.jpg",
      description: "Thermal management and deceleration systems.",
    },
    {
      title: "Steering",
      image: "/dept/dept3.jpg",
      description: "Precision control and cockpit ergonomics.",
    },
    {
      title: "Powertrain",
      image: "/dept/dept6.jpg",
      description: "Engine calibration and torque delivery.",
    },
    {
      title: "Technical",
      image: "/dept/dept5.jpg",
      description: "Electronics, DAE, and sensor fusion.",
    },
    {
      title: "Operations",
      image: "/dept/dept7.jpg",
      description: "Logistics, marketing, and team management.",
    },
  ];

  // FIXED POSITIONS (NO COLLISION POSSIBLE)
  const positions = [
    { x: -X, y: -GAP_Y },
    { x: -X, y: 0 },
    { x: -X, y: GAP_Y },
    { x: X, y: -GAP_Y },
    { x: X, y: 0 },
    { x: X, y: GAP_Y },
  ];

  return (
    <section className="relative min-h-screen py-40 bg-[#050505] overflow-hidden flex flex-col items-center">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <GridPattern className="opacity-10" strokeDasharray="4 4" />
      </div>

      {/* Title */}
      <div className="relative z-20 mb-40 text-center">
        <h2 className="text-6xl md:text-8xl font-black text-white italic tracking-tight">
          TEAM <span className="text-blue-600">BLITZ</span>
        </h2>
        <p className="mt-4 text-blue-500 font-mono text-xs tracking-[0.35em] uppercase">
          Departmental Structural Overview
        </p>
      </div>

      {/* Diagram */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[1600px] h-[1400px]"
      >
        {/* Center Hub */}
        <div
          ref={centerRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div className="relative scale-125">
            <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-3xl animate-pulse" />
            <div className="relative h-32 w-32 rounded-full bg-black border-2 border-blue-600 overflow-hidden">
              <Image
                src="/furiosalogo.jpg"
                alt="Logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Cards */}
        {departments.map((dept, i) => (
          <div
            key={dept.title}
            ref={refs[i]}
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
        {refs.map((ref, i) => (
          <AnimatedBeam
            key={i}
            containerRef={containerRef}
            fromRef={ref}
            toRef={centerRef}
            curvature={curvatureMap[i]}
            duration={4}
            delay={i * 0.3}
            pathColor="#2563eb"
            gradientStartColor="#ff001e"
            gradientEndColor="#ff001e"
          />
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-20 mt-16">
        <Button className="px-12 py-5 bg-red-600 text-white border-b-4 border-red-900 active:translate-y-1">
          <span className="font-black uppercase tracking-widest italic">
            Initialize Recruitment
          </span>
        </Button>
      </div>
    </section>
  );
}
