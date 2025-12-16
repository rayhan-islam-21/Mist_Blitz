"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

const sponsors = [
  "/sponsers/sp1.png",
  "/sponsers/sp2.png",
  "/sponsers/sp3.png",
  "/sponsers/sp4.png",
  "/sponsers/sp5.png",
  "/sponsers/sp6.png",
  "/sponsers/sp7.png",
  "/sponsers/sp8.png",
];

const loopSponsors = [...sponsors, ...sponsors];

export default function PartnersScroll() {
  const controls = useAnimation();
  const router = useRouter();

  return (
    <section className="relative bg-[#FFF3C4] border-y-8 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto py-14">

        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl font-comic font-extrabold mb-10
                       text-red-700 drop-shadow-[4px_4px_0_#000]">
          OUR PARTNERS
        </h2>

        {/* Scroll Container */}
        <div className="relative overflow-x-hidden overflow-y-visible  p-12">

          {/* LEFT FOG */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32
                          bg-linear-to-r from-[#FFF3C4] via-[#FFF3C4]/80 to-transparent z-10" />

          {/* RIGHT FOG */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32
                          bg-linear-to-l from-[#FFF3C4] via-[#FFF3C4]/80 to-transparent z-10" />

          <motion.div
            className="flex gap-12 w-max"
            animate={controls}
            initial={{ x: "0%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 28,
            }}
            onViewportEnter={() =>
              controls.start({ x: ["0%", "-50%"] })
            }
          >
            {loopSponsors.map((logo, index) => (
              <motion.div
                key={index}
                onHoverStart={() => controls.stop()}
                onHoverEnd={() =>
                  controls.start({ x: ["0%", "-50%"] })
                }
                onClick={() => router.push("/#sponsors")}
                whileHover={{
                  rotate: 0,
                  scale: 1.08,
                  y: -6,
                }}
                whileTap={{
                  scale: 0.95,
                }}
               className="cursor-pointer shrink-0 bg-white px-10 py-4
                           border-[6px] border-black rounded-lg
                           shadow-[8px_8px_0_#ffe600]
                           -rotate-5
                           transition-shadow"
              >
                <Image
                  src={logo}
                  alt="Sponsor logo"
                  width={140}
                  height={140}
                  className="object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
