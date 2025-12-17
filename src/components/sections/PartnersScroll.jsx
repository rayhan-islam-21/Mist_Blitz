"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { RetroGrid } from "../ui/retro-grid";

// Sponsor logos
const sponsors = [
  { logo: "/sponsers/sp1.png", website: "https://sponsor1.com" },
  { logo: "/sponsers/sp2.png", website: "https://sponsor2.com" },
  { logo: "/sponsers/sp3.png", website: "https://sponsor3.com" },
  { logo: "/sponsers/sp4.png", website: "https://sponsor4.com" },
  { logo: "/sponsers/sp5.png", website: "https://sponsor5.com" },
  { logo: "/sponsers/sp6.png", website: "https://sponsor6.com" },
  { logo: "/sponsers/sp7.png", website: "https://sponsor7.com" },
  { logo: "/sponsers/sp8.png", website: "https://sponsor8.com" },
];

// Duplicate for seamless loop
const loopSponsors = [...sponsors, ...sponsors,...sponsors];

export default function PartnersScroll() {
  const controls = useAnimation();

  return (
    <section className="relative bg-white border-y-8 border-black overflow-hidden">
      <RetroGrid />

      <div className="py-14">
        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl font-comic font-extrabold mb-12 text-yellow-400  drop-shadow-[4px_4px_0_#000]">
          OUR PARTNERS
        </h2>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex items-center gap-3 w-max"
            animate={controls}
            initial={{ x: "0%" }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
            onViewportEnter={() =>
              controls.start({ x: ["0%", "-50%"] })
            }
          >
            {loopSponsors.map((sponsor, index) => (
              <motion.a
                key={index}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="relative   transition-all duration-300"
                onHoverStart={() => controls.stop()}
                onHoverEnd={() =>
                  controls.start({ x: ["0%", "-50%"] })
                }
                whileHover={{ scale: 1.2 }}
              >
                <Image
                  src={sponsor.logo}
                  alt="Sponsor logo"
                  width={300}
                  height={20}
                  className="object-cover "
                  priority
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
