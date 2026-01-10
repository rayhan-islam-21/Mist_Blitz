"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative z-0 min-h-screen flex flex-col items-center justify-center w-full overflow-hidden bg-black">
      <motion.div
        initial={{
          clipPath: "inset(40% 40% 40% 40% rounded 100px)",
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          clipPath: "inset(0% 0% 0% 0% rounded 0px)",
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source
            src="https://res.cloudinary.com/dnrubj8x4/video/upload/f_mp4,q_auto/hero-viedo_yzq8zl"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 z-10 bg-linear-to-b from-black/80 via-black/50 to-black/80" />
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-20 bg-linear-to-t from-black/90 via-black/50 to-transparent" />

      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/hero.png"
            width={600}
            height={600}
            alt="MIST BLITZ Hero"
            className="mx-auto max-h-[45vh] w-auto object-contain hover:scale-105 transition-transform duration-700"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="mt-3 max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-white/90 tracking-wide relative"
        >
          The Formula Student Team of
          <span className="block text-gray-100">
            Military Institute of Science and Technology, Bangladesh
          </span>
          <span className="absolute left-1/2 -bottom-3 w-44 h-0.5 bg-gray-400 -translate-x-1/2 opacity-70"></span>
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
