"use client";

import React from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export default function JoinCTA() {

    const handleClick = () => {
    window.location.href =
      "mailto:sponsor@mistblitz.com" +
      "?subject=Sponsorship%20Inquiry%20%E2%80%93%20Mist%20Blitz" +
      "&body=Assalamualaikum%2C%0A%0A" +
      "I%20hope%20this%20email%20finds%20you%20well.%0A%0A" +
      "I%20am%20interested%20in%20sponsoring%20Mist%20Blitz%20and%20would%20like%20to%20learn%20more%20about%20your%20sponsorship%20opportunities%2C%20audience%20reach%2C%20and%20collaboration%20models.%0A%0A" +
      "Please%20let%20me%20know%20the%20next%20steps%20and%20any%20relevant%20details.%0A%0A" +
      "Best%20regards%2C%0A" +
      "Name%3A%0A" +
      "Company%20%2F%20Organization%3A%0A" +
      "Phone%3A%0A" +
      "Email%3A";
  };
  return (
    <section className="relative py-16 selection:bg-red-600 selection:text-white bg-[#050505] border-t border-white/5 flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/1 italic select-none pointer-events-none uppercase tracking-tighter">
        FSC_2024
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-7xl font-sans tracking-tighter md:text-[11rem] font-black uppercase italic leading-none mb-2"
        >
          FUEL THE <br />
          <span className="text-red-600">FUTURE</span>!
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-6"
        >
          <p className="text-xl md:text-2xl font-bold tracking-wider italic text-gray-100 uppercase leading-tight mb-2">
            Join MIST BLITZ in engineering the next era of{" "}
            <span className="text-red-600">Global Motorsports.</span>
          </p>
          <p className="text-base font-sans text-gray-500 text-center text-balance font-medium leading-relaxed">
            Partner with the vanguard of the Military Institute of Science and
            Technology. Invest in high-tier technical innovation and gain
            international visibility at the
            <span className="text-white"> Formula Student China circuits.</span>
          </p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative md:inline-block flex justify-center items-center group"
        >
          <button onClick={handleClick} className="cta-btn relative min-h-14 py-4 md:py-5 bg-red-600 text-white mx-center italic hover:bg-red-700 gap-5 shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)] active:translate-y-1">
            SECURE PARTNERSHIP
            <MoveRight
              size={24}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
