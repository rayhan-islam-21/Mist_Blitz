"use client";

import Image from "next/image";
import React from "react";
import Button from "../ui/retro-btn";

const Hero = () => {
  return (
    <section className="relative z-0 min-h-screen flex flex-col items-center justify-center w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/blitz.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />

      {/* Circuit Lines Background */}
      <svg
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,80 C200,120 400,40 800,100 S1200,60 1600,80"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          fill="transparent"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="1000"
            dur="10s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Hero Image */}
        <Image
          src="/hero.png"
          width={600}
          height={600}
          alt="MIST BLITZ Hero"
          className="mx-auto hover:scale-105 transition-transform duration-700"
          priority
        />

        {/* Tagline */}
        <p className="mt-6 text-xl sm:text-2xl md:text-3xl text-white tracking-wide drop-shadow-lg">
          The Formula Student Team of Military Institute of Science and Technology, Bangladesh
        </p>

        {/* CTA Button */}
        <Button className="mt-10 px-10 py-4 w-56 text-xl font-extrabold text-black bg-yellow-400 border-2 border-black rounded-none shadow-[6px_6px_0_0_black] hover:shadow-[4px_4px_0_0-black] hover:bg-yellow-300 hover:scale-105 transition-all duration-300 relative">
          <span className="absolute -inset-0.5 bg-yellow-500 blur-xl opacity-30 -z-10 rounded-none"></span>
          CONTACT US
        </Button>

        {/* Highlight Badges */}
        {/* <div className="flex gap-6 mt-10 justify-center text-white text-sm sm:text-base">
          <div className="bg-black/50 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            🏎 Cars: 3
          </div>
          <div className="bg-black/50 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            👥 Team Members: 35
          </div>
          <div className="bg-black/50 px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            ⚡ Top Speed: 200 km/h
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
