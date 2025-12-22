"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import Button from "../ui/retro-btn";
import { Highlighter } from "../ui/highlighter";
import { ComicText } from "@/components/ui/comic-text";

const ComicHeadline = ({ children, colorClass = "text-red-700" }) => (
  <motion.h2
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ duration: 0.5 }}
    className={`text-5xl md:text-6xl font-cousine font-bold mb-8 drop-shadow-[1px_4px_0_rgba(0,0,0,0.8)] tracking-wide transform skew-x--3 inline-block px-2  ${colorClass}`}
  >
    {children}
  </motion.h2>
);

const FramedImage = ({ src, alt, caption, rotation }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.6 }}
    transition={{ type: "spring", stiffness: 70, damping: 15 }}
    whileHover={{ scale: 1.05, rotate: rotation }}
    className={`relative w-full aspect-4/3 md:aspect-square overflow-hidden border-8 border-black shadow-[16px_16px_0_0_#ffd900]`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <Image src={src} alt={alt} fill className="object-cover" />
    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center text-white text-lg font-cousine font-bold">
      {caption}
    </div>
  </motion.div>
);

const AboutPreview = () => {
  const handleScroll = () => {
    const section = document.getElementById("what-we-do");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen border-b-6 border-black ">
      <section id="about-mist-blitz-pro" className="relative bg-white z-10 ">
        <InteractiveGridPattern
          hoverFill="fill-gray-500"
          fadeDelay={200}
          squares={[40, 40]}
          className="opacity-20 md:block hidden"
        />
        <InteractiveGridPattern
          squares={[10, 10]}
          className="md:hidden block opacity-20"
        />

        {/* --- About Us Section --- */}
        <div className="py-16  overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
            <ComicHeadline colorClass="text-yellow-400">
              <Highlighter action="underline" color="#E4010D">
                About Us
              </Highlighter>
            </ComicHeadline>

            <div className="md:flex items-start gap-12">
              <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col gap-6">
                <div className="relative">
                  <p className="text-xl px-1 text-gray-900 leading-relaxed">
                    MIST BLITZ is the official Formula Student team of MIST,
                    Bangladesh. We are driven by a vision to push the boundaries
                    of engineering education, providing students hands-on
                    experience in designing, building, and testing single-seater
                    race cars.
                  </p>
                </div>

                <div className="relative pl-2 text-balance">
                  <div className="absolute left-0 text-balance top-0 bottom-0 w-1 bg-yellow-500 opacity-50 ml-0"></div>
                  <p className="text-lg text-balance text-gray-500 leading-relaxed px-1">
                    Our mission is not only to achieve competitive excellence
                    but also to cultivate creativity, teamwork, and
                    problem-solving skills in the next generation of engineers.
                    We emphasize real-world engineering challenges including
                    aerodynamics, vehicle dynamics, materials selection,
                    manufacturing, and cost optimization.
                  </p>
                </div>
              </div>

              <div className=" relative md:w-1/2">
                <FramedImage
                  src="/china4.jpg"
                  alt="Formula Student Competition"
                  caption="The proving ground for future engineers."
                  rotation={-2}
                />
              </div>
            </div>
          </div>
        </div>
        {/* 
        <ImageConnector/> */}

        {/* --- Origins Section --- */}
        <div className="py-16 mx-auto px-4 max-w-6xl">
          <ComicHeadline colorClass="text-yellow-400">
            {" "}
            <Highlighter action="underline" color="#E4010D">
              MIST BLITZ ORIGINS
            </Highlighter>{" "}
          </ComicHeadline>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <FramedImage
                src="/car2.jpg"
                alt="Furiosa 1.0 Race Car"
                caption="Furiosa 1.0: Our first contender."
                rotation={-2}
              />
            </div>

            <div className="order-1 md:order-2">
              <h3 className="text-3xl font-bold w-96 flex items-center  text-gray-100 mb-4">
                <Highlighter action="highlight" color="#E4010D">
                  Who We Are
                </Highlighter>
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                Founded in April 2024, MIST BLITZ brings together passionate
                students who aim to represent Bangladesh in global motorsport
                competitions. We combine technical knowledge with practical
                experience to produce competitive, innovative, and safe race
                cars.
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.4 }}
                className="bg-yellow-100 p-6 border-4 border-black font-cousine shadow-[6px_6px_0_0_#D90000] transform rotate-1"
              >
                <span className="text-2xl text-red-600">ALERT! </span>
                <span className="text-lg text-black">
                  Team formed in <strong>April 2024</strong>. Ready for the next
                  race season!
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- CTA Button --- */}
        <div className="text-center py-20 px-4 place-items-center">
          <Button
            size="lg"
            className="w-72 hover:rotate-0 px-12 py-5 active:translate-y-1 -rotate-2 text-white border-b-4 z-50 border-red-900 bg-red-600"
            onClick={handleScroll}
          >
            Read More About Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPreview;
