"use client";

import Image from "next/image";
import React from "react";
import Button from "../ui/retro-btn";

const Hero = () => {
  return (
    <section className="relative z-0 min-h-screen flex flex-col items-center justify-center w-full overflow-hidden">
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
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

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

          <p className="mt-6 text-xl sm:text-2xl md:text-3xl text-white tracking-wide drop-shadow-lg">
            The Formula Student Team of Military Institute of Science and
            Technology, Bangladesh
          </p>

          <Button
            className="
              mt-10 px-10 mx-auto py-3  w-52
              text-xl font-extrabold
              text-black bg-yellow-300
              border-2 border-black
              rounded-none
              shadow-[6px_6px_0_0_black]
              hover:shadow-[4px_3px_0_0_white]
              hover:bg-yellow-400
              hover:scale-105
              hover:translate-x-1 hover:translate-y-1
              transition-all duration-200
              active:translate-x-2 active:translate-y-2 active:shadow-none
              focus:outline-none
              relative
            "
          >
            <span className="absolute -inset-0.5 rounded-none bg-yellow-500 blur-xl opacity-30 -z-10"></span>
            CONTACT US
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
