"use client";

import { useRef } from "react";
import Image from "next/image";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import DeptCard from "../Deptcard";
import { GridPattern } from "../ui/grid-pattern";
import { InteractiveGridPattern } from "../ui/interactive-grid-pattern";

const R = 520;
const CARD_W = 380;
const CARD_H = 420;

const degToRad = (deg) => (deg * Math.PI) / 180;

export default function JoinBlitzTeam() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const refs = Array.from({ length: 6 }, () => useRef(null));

  const departments = [
    { title: "Suspension Team", image: "/dept/dept1.jpg" },
    { title: "Brakes Team", image: "/dept/dept2.jpg" },
    { title: "Steering Team", image: "/dept/dept3.jpg" },
    { title: "Powertrain Team", image: "/dept/dept4.jpg" },
    { title: "Technical Team", image: "/dept/dept5.jpg" },
    { title: "Non-Technical Team", image: "/dept/dept6.jpg" },
  ];

  const angles = [-60, 0, 60, 120, 180, 240];

  return (
    <section className="relative py-64 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <GridPattern />
        {/* <InteractiveGridPattern /> */}
      </div>

      <h2 className="text-4xl font-bold text-center mb-32">
        Join the MIST Blitz Team
      </h2>

      <div
        ref={containerRef}
        className="relative mx-auto h-275 min-w-6xl"
      >
        {/* CENTER LOGO */}
        <div
          ref={centerRef}
          className="absolute left-1/2 top-1/2 z-30
                     h-36 w-36 rounded-full bg-white shadow-2xl
                     ring-4 ring-red-500
                     flex items-center overflow-hidden justify-center"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          <Image
            src="/furiosalogo.jpg"
            alt="MIST Blitz"
            width={110}
            height={110}
          />
        </div>

        {/* DEPARTMENT CARDS */}
        {departments.map((dept, i) => {
          const angle = degToRad(angles[i]);
          const x = Math.cos(angle) * (R + CARD_W / 2);
          const y = Math.sin(angle) * (R + CARD_H / 2);

          return (
            <DeptCard
              key={dept.title}
              ref={refs[i]}
              title={dept.title}
              description="Click to learn more about this department."
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
            curvature={0}
            reverse={i < 3}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-32 text-center">
        <a
          href="#join-form"
          className="inline-block rounded-xl bg-primary
                     px-16 py-4 text-lg font-semibold
                     text-white transition hover:scale-105"
        >
          Join Now
        </a>
      </div>
    </section>
  );
}
