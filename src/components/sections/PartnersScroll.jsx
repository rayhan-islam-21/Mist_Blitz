"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import RetroCard from "@/components/ui/retro-card";
import { GridPattern } from "../ui/grid-pattern";
import { DotPattern } from "../ui/dot-pattern";
import { RetroGrid } from "../ui/retro-grid";

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
    <section className="relative  bg-white border-y-8 border-black overflow-hidden">
      <RetroGrid></RetroGrid>
      <div className="max-w-vh mx-auto py-14">
        {/* Title */}
        <h2
          className="text-center text-4xl md:text-5xl font-comic font-extrabold mb-10
                       text-red-700 drop-shadow-[4px_4px_0_#000]"
        >
          OUR PARTNERS
        </h2>

        {/* Scroll Container */}
        <div className="relative overflow-x-hidden overflow-y-visible p-12">
          {/* LEFT FOG
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32
                          bg-linear-to-r from-[#ffffff] via-[#ffffff]/80 to-transparent z-10" />

          {/* RIGHT FOG */}
          {/* <div className="pointer-events-none absolute right-0 top-0 h-full w-32
                          bg-linear-to-l from-[#ffffff] via-[#ffffff]/80 to-transparent z-10" /> */}

          <motion.div
            className="flex gap-12 w-max"
            animate={controls}
            initial={{ x: "0%" }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 28,
            }}
            onViewportEnter={() => controls.start({ x: ["0%", "-50%"] })}
          >
            {loopSponsors.map((logo, index) => (
              <motion.div
                key={index}
                onHoverStart={() => controls.stop()}
                onHoverEnd={() => controls.start({ x: ["0%", "-50%"] })}
                onClick={() => router.push("/#sponsors")}
                whileHover={{
                  rotate: 0,
                  scale: 1.08,
                  y: -6,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                {/* Wrap sponsor logo in RetroCard */}
                <RetroCard className="-rotate-5 px-6 py-4">
                  <Image
                    src={logo}
                    alt="Sponsor logo"
                    width={140}
                    height={140}
                    className="object-contain"
                  />
                </RetroCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
