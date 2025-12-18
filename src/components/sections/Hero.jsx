"use client";

import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="relative z-0 min-h-screen pt-24 w-full overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute inset-0 z-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/blitz.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="max-w-5xl mx-auto">

          <Image
            src="/hero.png"
            width={600}
            height={600}
            alt="MIST BLITZ Hero"
            className="mx-auto"
            priority
          />

          <p className="mt-6 text-xl sm:text-2xl md:text-3xl text-white tracking-wide">
            The Formula Student Team of Military Institute of Science and Technology, Bangladesh
          </p>

          <button
            className="
              mt-10 px-10 py-4 w-52
              text-lg font-extrabold
              text-black bg-(--blitz-yellow)
              border-2 border-black
              shadow-[4px_4px_0_0_black]
              hover:shadow-[2px_2px_0_0_black]
              hover:bg-yellow-300
              hover:translate-x-1 hover:translate-y-1
              transition-all duration-150
              active:translate-x-2 active:translate-y-2 active:shadow-none
            "
          >
            CONTACT US
          </button>

        </div>
      </div>
    </section>
  );
};

export default Hero;
