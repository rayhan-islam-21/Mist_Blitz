"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { DotPattern } from "@/components/ui/dot-pattern"

// --- Comic Action Text Component ---
const ComicActionText = ({
  text,
  color,
  position,
  size = "3xl",
  rotation = 0,
  delay = 0,
}) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ type: "spring", stiffness: 150, damping: 10, delay: delay }}
    className={`absolute font-comic font-extrabold text-${size} p-1 z-10 whitespace-nowrap`}
    style={{
      color: color,
      textShadow: `3px 3px 0 #000`,
      ...position,
      transform: `rotate(${rotation}deg)`,
    }}
  >
    {text}
  </motion.span>
);

// --- Reusable Component for Stylized Titles ---
const ComicHeadline = ({ children, colorClass = "text-red-700" }) => (
  <motion.h2
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ duration: 0.5 }}
    className={`text-5xl md:text-6xl font-comic font-extrabold ${colorClass} mb-8 
                    drop-shadow-[4px_4px_0_rgba(0,0,0,0.8)] 
                    tracking-wide
                    transform skew-x-[-5deg] inline-block px-2 border-b-4 border-yellow-400`}
  >
    {children}
  </motion.h2>
);

// --- Component for Comic-Framed Image ---
const FramedImage = ({ src, alt, caption, rotation }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ type: "spring", stiffness: 50, damping: 10, delay: 0.2 }}
    className={`relative w-full aspect-video md:aspect-square overflow-hidden border-8 object-cover border-black shadow-[16px_16px_0_0_#ffd900]`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" />
    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center text-white text-lg font-bold font-comic">
      {caption}
    </div>
  </motion.div>
);

// --- Main Component ---
const AboutPreview = () => {
  const listVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div className="min-h-screen  relative mx-auto">
      <DotPattern/>
      <section
        id="about-mist-blitz-pro"
        className="relative overflow-hidden  bg-no-repeat object-center bg-center object-cover bg-gray-50"
      >
        {/* --- Section 1: What is Formula Student? (Full Width) --- */}
        <div className="bg-white  py-16 border-t-8 border-b-8 border-black">
          <div className="container mx-auto px-4 max-w-6xl">
            <ComicHeadline colorClass="text-yellow-400">
              MISSION OBJECTIVE
            </ComicHeadline>

            <div className="md:flex items-start gap-12">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  WHAT IS FORMULA STUDENT?
                </h3>
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  Formula Student (FS) is Europe's most established educational
                  engineering competition. Teams around the globe design, build,
                  and compete with a single-seater race car, pushing the
                  boundaries of automotive engineering.
                </p>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="space-y-3 text-lg font-semibold text-gray-800"
                >
                  {[
                    "Engineering Design",
                    "Cost & Manufacturing",
                    "Dynamic Track Events",
                  ].map((item, index) => (
                    <motion.li
                      key={item}
                      custom={index}
                      variants={listVariants}
                      className="flex items-center"
                    >
                      <span className="text-red-500 mr-3 text-2xl font-extrabold font-comic">
                        {index + 1}.
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <div className="md:w-1/2">
                <FramedImage
                  src="/team.jpg" // Use a more realistic image path
                  alt="Formula Student Competition"
                  caption="The proving ground for future engineers."
                  rotation={-3}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Section 2: MIST BLITZ & Team History (Staggered Layout) --- */}
        <div className="  py-16  object-cover  mx-auto px-4 max-w-6xl ">
          <ComicHeadline colorClass="text-red-700">
            MIST BLITZ ORIGINS
          </ComicHeadline>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <FramedImage
                src="/furiosa.png"
                alt="Furiosa 1.0 Race Car"
                caption="Furiosa 1.0: Our first contender."
                rotation={5}
              />
            </div>

            <div className="order-1 md:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                WHO WE ARE
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                MIST BLITZ is the dedicated Formula Student team from MIST
                (Military Institute of Science and Technology). We were founded
                with a singular vision: to elevate Bangladeshi engineering to
                the world stage of motorsport.
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.4 }}
                className="bg-yellow-100 p-6 border-4 border-black font-comic shadow-[6px_6px_0_0_#D90000] transform rotate-1"
              >
                <span className="text-3xl text-red-600">ALERT! </span>
                <span className="text-xl text-black">
                  Team formed in **April 2024**. Ready for the next race season!
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- CTA Button --- */}
        <div className="text-center mt-0 mb-20">
          <motion.a
            href="/full-mission"
            aria-label="Read the full MIST BLITZ mission"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              type: "spring",
              // stiffness: 100,
              // damping: 10,
              delay: 0.1,
            }}
            whileHover={{
              scale: 1,  
              x: -2, // move left
              y: -1, // move slightly up
              boxShadow: "8px 8px 0px 0px #D90000",
              // transition: { type: "spring", stiffness: 200, damping: 12 },
            }}
            whileTap={{ scale: 0.95, boxShadow: "none" }}
            className="inline-flex items-center justify-center px-16 py-6 text-3xl font-extrabold text-white bg-black border-8 border-black rounded-none shadow-[14px_14px_0_0_#FFC107] transition-all duration-150 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-offset-4 focus:ring-offset-black skew-y-12 relative z-30 cursor-pointer"
          >
            READ FULL MISSION
            <span className="ml-5 text-4xl">→</span>
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default AboutPreview;
