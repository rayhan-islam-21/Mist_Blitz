"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative z-0 min-h-screen flex flex-col items-center justify-center w-full overflow-x-hidden">
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
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/80 via-black/50 to-black/80" />

  

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Hero Image */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/hero.png"
            width={600}
            height={600}
            alt="MIST BLITZ Hero"
            className="
    mx-auto
    max-h-[45vh]
    w-auto
    object-contain
    hover:scale-105
    transition-transform
    duration-700
  "
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="
              mt-3
              max-w-3xl
              text-base sm:text-lg md:text-xl
              leading-relaxed
              text-white/90
              tracking-wide
              text-center
              relative
            "
        >
          The Formula Student Team of
          <span className="block text-gray-100">
            Military Institute of Science and Technology, Bangladesh
          </span>
          {/* subtle underline accent */}
          <span className="absolute left-1/2 -bottom-3 w-44 h-0.5 bg-gray-400 -translate-x-1/2 opacity-70"></span>
        </motion.p>

        {/* CTA Button */}
        {/* <motion.button
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="mt-10 px-10 py-4 w-56 text-xl font-extrabold text-white bg-black border-2 border-black  shadow-[3px_3px_0_0_gray] hover:shadow-[4px_4px_0_0-black] hover:bg-black tracking-wide rounded-none cursor-pointer hover:text-white hover:scale-105 transition-all duration-200 relative"
        >
          CONTACT US
        </motion.button> */}
      </div>
    </section>
  );
};

export default Hero;
