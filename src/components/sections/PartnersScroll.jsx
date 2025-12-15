"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const sponsors = [
  "/sponsors/sp1.png",
  "/sponsors/sp2.png",
  "/sponsors/sp3.png",
  "/sponsors/sp4.png",
  "/sponsors/sp5.png",
];

export default function PartnersScroll() {
  return (
    <section className="relative w-full overflow-hidden py-12 border-y-8 border-black bg-[#FFF3C4]">

      {/* Title */}
      <h2
        className="text-center text-4xl md:text-5xl font-comic font-extrabold mb-8 
                   text-red-700 drop-shadow-[4px_4px_0_#000]"
      >
        OUR PARTNERS
      </h2>

      {/* Infinite Scroll */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-10 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {[...sponsors, ...sponsors].map((logo, index) => (
            <div
              key={index}
              className="bg-white px-10 py-6 border-8 border-black
                         shadow-[10px_10px_0_0_#D90000]
                         rotate-[-2deg] hover:rotate-[2deg]
                         transition-transform duration-200"
            >
              <Image
                src={logo}
                alt="Sponsor logo"
                width={140}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
