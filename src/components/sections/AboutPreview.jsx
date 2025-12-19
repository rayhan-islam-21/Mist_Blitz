"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import Button from "../ui/retro-btn";

const ComicHeadline = ({ children, colorClass = "text-red-700" }) => (
  <motion.h2
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ duration: 0.5 }}
    className={`text-5xl md:text-6xl font-cousine font-bold mb-8 drop-shadow-[1px_4px_0_rgba(0,0,0,0.8)] tracking-wide transform skew-x-[-3deg] inline-block px-2 border-b-4 border-yellow-400 ${colorClass}`}
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
    className={`relative w-full aspect-video md:aspect-square overflow-hidden border-8 border-black shadow-[16px_16px_0_0_#ffd900]`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <Image src={src} alt={alt} fill className="object-cover" />
    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center text-white text-lg font-cousine font-bold">
      {caption}
    </div>
  </motion.div>
);

const AboutPreview = () => {
  const listVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
  };

  const handleScroll = () => {
    const section = document.getElementById("what-we-do");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-cousine">
      <section id="about-mist-blitz-pro" className="relative z-10 bg-white">
        <InteractiveGridPattern
          hoverFill="fill-yellow-500"
          fadeDelay={200}
          squares={[30, 30]}
          className="opacity-30 md:block hidden"
        />
        <InteractiveGridPattern
          squares={[10, 10]}
          className="md:hidden block opacity-20"
        />

        {/* --- About Us Section --- */}
        <div className="py-16 overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
            <ComicHeadline colorClass="text-yellow-400">About Us</ComicHeadline>

            <div className="md:flex items-start gap-12">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <p className={`text-xl description-text  text-gray-900 leading-relaxed mb-41`}>
                  MIST BLITZ is the official Formula Student team of MIST, Bangladesh. We are driven by a vision to push the boundaries of engineering education, providing students hands-on experience in designing, building, and testing single-seater race cars.
                </p>
                <p className="text-xl text-gray-900 leading-relaxed mb-4">
                  Our mission is not only to achieve competitive excellence but also to cultivate creativity, teamwork, and problem-solving skills in the next generation of engineers. We emphasize real-world engineering challenges including aerodynamics, vehicle dynamics, materials selection, manufacturing, and cost optimization.
                </p>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="space-y-2 text-lg font-semibold text-gray-800"
                >
                  {[
                    "Innovative Vehicle Design",
                    "Efficient Manufacturing",
                    "Dynamic Track Performance",
                    "Teamwork & Leadership",
                    "Cost & Resource Management",
                  ].map((item, index) => (
                    <motion.li
                      key={item}
                      custom={index}
                      variants={listVariants}
                      className="flex items-center"
                    >
                      <span className="text-red-500 mr-3 text-2xl font-bold">
                        {index + 1}.
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <div className="md:w-1/2">
                <FramedImage
                  src="/team.jpg"
                  alt="Formula Student Competition"
                  caption="The proving ground for future engineers."
                  rotation={-2}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Origins Section --- */}
        <div className="py-16 mx-auto px-4 max-w-6xl">
          <ComicHeadline colorClass="text-red-700">MIST BLITZ ORIGINS</ComicHeadline>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <FramedImage
                src="/furiosa.png"
                alt="Furiosa 1.0 Race Car"
                caption="Furiosa 1.0: Our first contender."
                rotation={-2}
              />
            </div>

            <div className="order-1 md:order-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Who We Are</h3>
              <p className="text-xl text-gray-700 leading-relaxed mb-4">
                Founded in April 2024, MIST BLITZ brings together passionate students who aim to represent Bangladesh in global motorsport competitions. We combine technical knowledge with practical experience to produce competitive, innovative, and safe race cars.
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
                  Team formed in <strong>April 2024</strong>. Ready for the next race season!
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- CTA Button --- */}
        <div className="text-center p-20 place-items-center">
          <Button
            variant="outline"
            className="w-72 hover:rotate-0 -rotate-1 hover:bg-yellow-300 z-50 bg-yellow-300"
            size="lg"
            onClick={handleScroll}
          >
            Read More About Us
          </Button>
        </div>
      </section>

      {/* --- "What We Do" Section --- */}
      <section id="what-we-do" className="relative z-10 bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <ComicHeadline colorClass="text-blue-600">What We Do</ComicHeadline>
          <p className="text-xl text-gray-900 leading-relaxed mb-4">
            We design, prototype, assemble, and test race cars from scratch. Every student gets to experience vehicle dynamics, aerodynamics, manufacturing, and cost management while working collaboratively in a professional-style team environment.
          </p>
          <p className="text-xl text-gray-900 leading-relaxed">
            Each project also focuses on innovation, efficiency, and safety, preparing students for real-world engineering challenges and competitions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPreview;
