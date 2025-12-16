"use client";

import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import SponsorCard from "../ui/retro-card"; // Correct import
import { RetroGrid } from "../ui/retro-grid";

// Sponsor details
const sponsors = [
  {
    logo: "/sponsers/sp1.png",
    name: "DongFien Motor",
    website: "https://sponsor1.com",
    description: "Leading innovator in automotive components.",
    accentColor: "yellow",
  },
  {
    logo: "/sponsers/sp2.png",
    name: "Radient",
    website: "https://sponsor2.com",
    description: "Experts in engineering solutions.",
    accentColor: "blue",
  },
  {
    logo: "/sponsers/sp3.png",
    name: "Seven Rings",
    website: "https://sponsor3.com",
    description: "Supporting next-gen motorsport talent.",
    accentColor: "red",
  },
  {
    logo: "/sponsers/sp4.png",
    name: "Dessualt System",
    website: "https://sponsor4.com",
    description: "Innovative solutions for racing.",
    accentColor: "green",
  },
  {
    logo: "/sponsers/sp5.png",
    name: "Rapid Harness",
    website: "https://sponsor5.com",
    description: "Engineering excellence worldwide.",
    accentColor: "yellow",
  },
  {
    logo: "/sponsers/sp6.png",
    name: "Ventra",
    website: "https://sponsor6.com",
    description: "Supporting future engineers.",
    accentColor: "blue",
  },
  {
    logo: "/sponsers/sp7.png",
    name: "JMI",
    website: "https://sponsor6.com",
    description: "Supporting future engineers.",
    accentColor: "blue",
  },
  {
    logo: "/sponsers/sp8.png",
    name: "Geely",
    website: "https://sponsor6.com",
    description: "Supporting future engineers.",
    accentColor: "blue",
  },
];

// Duplicate sponsors for continuous scrolling
const loopSponsors = [...sponsors, ...sponsors];

export default function PartnersScroll() {
  const controls = useAnimation();
  const router = useRouter();

  return (
    <section className="relative bg-white border-y-8 border-black overflow-hidden">
      <RetroGrid />

      <div className="max-w-vh mx-auto py-14">
        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl font-comic font-extrabold mb-10 text-red-700 drop-shadow-[4px_4px_0_#000]">
          OUR PARTNERS
        </h2>

        {/* Scroll Container */}
        <div className="relative overflow-x-hidden overflow-y-visible p-12">
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
            {loopSponsors.map((sponsor, index) => (
              <motion.div
                key={index}
                onHoverStart={() => controls.stop()}
                onHoverEnd={() => controls.start({ x: ["0%", "-50%"] })}
                onClick={() => window.open(sponsor.website, "_blank")}
                whileHover={{
                  scale: 1.08,
                  y: -6,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                {/* Sponsor Card */}
                <SponsorCard logo={sponsor.logo} name={sponsor.name} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
