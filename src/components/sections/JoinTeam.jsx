"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import Image from "next/image";
import { Highlighter } from "../ui/highlighter";

const DepartmentCard = forwardRef(({ name, img, className }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-20 flex flex-col items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-2xl p-5 w-44 h-52 text-center transition-all duration-500 hover:scale-105 hover:border-yellow-500 group",
      className
    )}
  >
    {/* Card Image Container */}
    <div className="relative h-20 w-20 rounded-xl bg-slate-50 mb-4 overflow-hidden border border-slate-100 shadow-inner group-hover:border-yellow-200 transition-colors">
      <Image 
        src={img} 
        alt={name} 
        fill 
        className="object-contain p-2" // Changed to object-contain for logos
      />
    </div>
    <h3 className="font-black text-xs uppercase tracking-[0.15em] text-slate-900 mb-4">
      {name}
    </h3>
    <button className="w-full rounded-lg bg-slate-900 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-yellow-400 hover:text-black transition-all duration-300">
      Apply Now
    </button>
  </div>
));

DepartmentCard.displayName = "DepartmentCard";

export default function JoinTeamSection() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);

  const dep1 = useRef(null);
  const dep2 = useRef(null);
  const dep3 = useRef(null);
  const dep4 = useRef(null);
  const dep5 = useRef(null);
  const dep6 = useRef(null);

  return (
    <section className="w-full py-20 bg-white">
      {/* SECTION HEADING */}
      <div className="text-center mb-16 space-y-4 px-4">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter">
          Build the{" "}
          <span className="relative inline-block">
            <Highlighter className="text-yellow-400">Future</Highlighter>
          </span>{" "}
          of Speed
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium tracking-tight">
          Join the MIST BLITZ Formula Student team. We are looking for driven engineers, 
          innovators, and designers to push the limits of performance.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative flex h-[750px] w-full items-center justify-center overflow-hidden bg-slate-50/50 rounded-[3rem] border border-slate-200 max-w-7xl mx-auto shadow-inner"
      >
        {/* Engineering Grid Background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, 
            backgroundSize: '30px 30px' 
          }} 
        />

        <div className="flex size-full max-w-5xl flex-row items-stretch justify-between px-10 z-10">
          {/* Left Wing */}
          <div className="flex flex-col justify-center gap-12">
            <DepartmentCard ref={dep1} name="Suspension" img="/china4.jpg" />
            <DepartmentCard ref={dep2} name="Powertrain" img="/china.jpg" />
            <DepartmentCard ref={dep3} name="Technical" img="/china3.jpg" />
          </div>

          {/* Center Hub - FIXED IMAGE OVERFLOW */}
          <div className="flex flex-col justify-center">
            <div
              ref={centerRef}
              className="relative z-30 flex h-48 w-48 items-center justify-center rounded-full bg-black border-8 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.3)] overflow-hidden"
            >
              <Image 
                src="/hero.png"
                alt="center logo"
                fill
                className="object-contain" // Ensures image fills the circle perfectly
                priority
              />
            </div>
          </div>

          {/* Right Wing */}
          <div className="flex flex-col justify-center gap-12">
            <DepartmentCard ref={dep4} name="Non-Tech" img="/teams/nontech.png" />
            <DepartmentCard ref={dep5} name="Electronics" img="/teams/electronics.png" />
            <DepartmentCard ref={dep6} name="Aero Design" img="/teams/design.png" />
          </div>
        </div>

        {/* --- ANIMATED BEAMS --- */}
        <AnimatedBeam containerRef={containerRef} fromRef={dep1} toRef={centerRef} curvature={-40} endYOffset={-20} gradientStartColor="#fbbf24" gradientStopColor="#E2E8F0" duration={5} />
        <AnimatedBeam containerRef={containerRef} fromRef={dep2} toRef={centerRef} curvature={0} gradientStartColor="#fbbf24" gradientStopColor="#E2E8F0" duration={5} />
        <AnimatedBeam containerRef={containerRef} fromRef={dep3} toRef={centerRef} curvature={40} endYOffset={20} gradientStartColor="#fbbf24" gradientStopColor="#E2E8F0" duration={5} />

        <AnimatedBeam containerRef={containerRef} fromRef={dep4} toRef={centerRef} curvature={-40} endYOffset={-20} reverse gradientStartColor="#fbbf24" gradientStopColor="#E2E8F0" duration={5} />
        <AnimatedBeam containerRef={containerRef} fromRef={dep5} toRef={centerRef} curvature={0} reverse gradientStartColor="#fbbf24" gradientStopColor="#E2E8F0" duration={5} />
        <AnimatedBeam containerRef={containerRef} fromRef={dep6} toRef={centerRef} curvature={40} endYOffset={20} reverse gradientStartColor="#fbbf24" gradientStopColor="#E2E8F0" duration={5} />
      </div>
    </section>
  );
}