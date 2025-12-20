"use client";

import { useRef } from "react";
import Image from "next/image";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import DeptCard from "../Deptcard";
import { GridPattern } from "../ui/grid-pattern";
import { Highlighter } from "../ui/highlighter";
import Button from "../ui/retro-btn";

const CARD_W = 380;
const CARD_H = 420;
const R = Math.min(520, window.innerWidth / 2 - CARD_W / 2);

const degToRad = (deg) => (deg * Math.PI) / 180;

export default function JoinBlitzTeam() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const refs = Array.from({ length: 6 }, () => useRef(null));

  const departments = [
    {
      title: "Suspension Team",
      image: "/dept/dept1.jpg",
      description:
        "Design and optimize suspension systems for maximum performance and comfort.",
    },
    {
      title: "Brakes Team",
      image: "/dept/dept2.jpg",
      description:
        "Develop high-performance braking systems ensuring safety and reliability.",
    },
    {
      title: "Steering Team",
      image: "/dept/dept2.jpg",
      description:
        "Work on steering mechanisms to enhance handling and control of the vehicle.",
    },
    {
      title: "Powertrain Team",
      image: "/dept/dept6.jpg",
      description:
        "Focus on engine, transmission, and drivetrain design for optimal power delivery.",
    },
    {
      title: "Technical Team",
      image: "/dept/dept5.jpg",
      description:
        "Provide technical support and integrate electronics, sensors, and software.",
    },
    {
      title: "Non-Technical Team",
      image: "/dept/dept7.jpg",
      description:
        "Manage logistics, marketing, and team coordination for smooth operations.",
    },
  ];

  const angles = [-60, 0, 60, 120, 180, 240];

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridPattern className="opacity-[0.4]" />
        {/* <InteractiveGridPattern className="opacity-[0.25]" /> */}
      </div>

      {/* TITLE */}
      <div className="mb-32 relative overflow-hidden rounded-xl py-16 px-6 text-center ">
        {/* Decorative shapes */}
        <span className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></span>
        <span className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4 animate-pulse"></span>

        {/* Header text */}
        <Highlighter action="underline" color="#ffe203">
          <h2 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-[2px_4px_0_rgba(0,0,0,0.7)]">
            Join the MIST Blitz Team
          </h2>
        </Highlighter>

        {/* Subtitle */}
        <p className="relative z-10 mt-4 text-white text-lg sm:text-xl">
          <Highlighter action="highlight" color="#FF004C">
            Be a part of our innovative and dynamic teams!
          </Highlighter>
        </p>
      </div>

      {/* DIAGRAM */}
      <div ref={containerRef} className="relative z-10 mx-auto h-300 max-w-6xl">
        {/* CENTER LOGO */}
        <div
          ref={centerRef}
          className="absolute left-1/2 top-1/2 z-30
                     h-28 w-28 overflow-hidden rounded-full bg-white shadow-2xl
                     ring-1 object-center ring-red-200
                     flex items-center justify-center"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <Image
            src="/furiosalogo.jpg"
            alt="MIST Blitz"
            width={130}
            height={130}
            className="object-center"
          />
        </div>

        {/* DEPARTMENT CARDS */}
        {departments.map((dept, i) => {
          const angle = degToRad(angles[i]);
          const x = Math.cos(angle) * R;
          const y = Math.sin(angle) * R;

          return (
            <DeptCard
              key={dept.title}
              ref={refs[i]}
              title={dept.title}
              description={dept.description}
              image={dept.image}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `
                  translate(-50%, -50%)
                  translate(${x}px, ${y}px)
                `,
              }}
            />
          );
        })}

        {/* BEAMS */}
        {refs.map((r, i) => (
          <AnimatedBeam
            key={i}
            containerRef={containerRef}
            fromRef={r}
            toRef={centerRef}
            reverse={i < 3}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-40  text-center">
        <Button
          className="mx-auto w-44 -rotate-3 hover:rotate-0 bg-yellow-300"
          size="lg"
        >
          Join Us
        </Button>
      </div>
    </section>
  );
}
