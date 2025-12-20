"use client";

import { useRef } from "react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import DeptCard from "../Deptcard";
import Image from "next/image";

export default function JoinBlitzTeam() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);

  const suspensionRef = useRef(null);
  const powertrainRef = useRef(null);
  const technicalRef = useRef(null);
  const nonTechRef = useRef(null);

  return (
    <section className="py-24">
      <h2 className="text-4xl font-bold text-center mb-20">
        Join the MIST Blitz Team
      </h2>

      {/* MAIN CONTAINER */}
      <div ref={containerRef} className="relative mx-auto h-[900px] max-w-6xl">
        {/* CENTER LOGO */}
        <div
          ref={centerRef}
          className="absolute left-1/2 top-1/2 z-20
                     h-32 w-32 -translate-x-1/2 -translate-y-1/2
                     rounded-full overflow-hidden
                     ring-4 ring-red-500
                     bg-white shadow-xl
                     flex items-center justify-center"
        >
          <Image
            src="/furiosalogo.jpg"
            alt="MIST Blitz"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        {/* DEPARTMENT CARDS */}
        {/* DEPARTMENT CARDS */}
        <DeptCard
          ref={suspensionRef}
          title="Suspension Team"
          description="Vehicle dynamics, geometry, and handling performance."
          image="/dept/dept1.jpg"
          className="top-8 left-1/2 -translate-x-1/2"
        />

        <DeptCard
          ref={powertrainRef}
          title="Powertrain Team"
          description="Engine, drivetrain, and power delivery systems."
          image="/dept/dept2.jpg"
          className="top-1/2 right-6 -translate-y-1/2"
        />

        <DeptCard
          ref={technicalRef}
          title="Technical Team"
          description="Simulation, testing, and performance optimization."
          image="/dept/dept5.jpg"
          className="bottom-8 left-1/2 -translate-x-1/2"
        />

        <DeptCard
          ref={nonTechRef}
          title="Non-Technical Team"
          description="Management, marketing, and sponsorship operations."
          image="/dept/dept6.jpg"
          className="top-1/2 left-6 -translate-y-1/2"
        />

        {/* TOP */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={suspensionRef}
          toRef={centerRef}
          curvature={-70}
          startYOffset={20}
          endYOffset={-75}
        />

        {/* RIGHT */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={powertrainRef}
          toRef={centerRef}
          curvature={0}
          reverse
          startXOffset={-20}
          endXOffset={75}
        />

        {/* BOTTOM */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={technicalRef}
          toRef={centerRef}
          curvature={70}
          startYOffset={-20}
          endYOffset={75}
        />

        {/* LEFT */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={nonTechRef}
          toRef={centerRef}
          curvature={0}
          reverse
          startXOffset={20}
          endXOffset={-75}
        />
      </div>

      {/* JOIN NOW CTA */}
      <div className="mt-24 text-center">
        <a
          href="#join-form"
          className="inline-block rounded-xl bg-primary
                     px-12 py-4 text-lg font-semibold
                     text-white transition hover:scale-105"
        >
          Join Now
        </a>
      </div>
    </section>
  );
}
