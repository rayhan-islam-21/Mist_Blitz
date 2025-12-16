"use client";
import React from "react";
import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const ACCENT_COLORS = {
  blue: { glow: "shadow-blue-500/60", border: "border-blue-700", text: "text-blue-700", bg: "bg-blue-100", ribbon: "bg-blue-700", shadow: "#1d4ed8" },
  yellow: { glow: "shadow-yellow-500/70", border: "border-yellow-700", text: "text-yellow-700", bg: "bg-yellow-100", ribbon: "bg-yellow-700", shadow: "#b45309" },
  red: { glow: "shadow-red-500/60", border: "border-red-700", text: "text-red-700", bg: "bg-red-100", ribbon: "bg-red-700", shadow: "#b91c1c" },
  green: { glow: "shadow-green-500/60", border: "border-green-700", text: "text-green-700", bg: "bg-green-100", ribbon: "bg-green-700", shadow: "#047857" },
  purple: { glow: "shadow-purple-500/60", border: "border-purple-700", text: "text-purple-700", bg: "bg-purple-100", ribbon: "bg-purple-700", shadow: "#7c3aed" },
  default: { glow: "shadow-gray-500/50", border: "border-gray-600", text: "text-gray-800", bg: "bg-gray-100", ribbon: "bg-gray-600", shadow: "#4b5563" },
};

const SponsorCard = ({ logo, name, website, description, accentColor = "default", featured }) => {
  const colors = ACCENT_COLORS[accentColor] || ACCENT_COLORS.default;
  const shadowColor = colors.shadow || "#000";

  const cardVariants = {
    initial: { rotate: 0, scale: 1, y: 0, boxShadow: `6px 6px 0 0 ${shadowColor}` },
    hover: { rotate: -1, scale: 1.05, y: -5, boxShadow: `10px 10px 0 0 ${shadowColor}`, transition: { duration: 0.3, ease: "easeOut" } },
    tap: { scale: 0.97, rotate: 0.5, boxShadow: `4px 4px 0 0 ${shadowColor}`, transition: { duration: 0.1 } },
  };

  return (
    <motion.div
      onClick={() => website && window.open(website, "_blank")}
      className={cn(
        "relative flex flex-col items-center text-center rounded-2xl p-6 transition-colors",
        "border-4 border-black",
        colors.bg,
        website ? "cursor-pointer" : "cursor-default"
      )}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      {featured && (
        <div className={cn(
          "absolute -top-3 -right-3 text-white font-black uppercase text-sm px-4 py-1.5 rounded-full z-20",
          colors.ribbon,
          "shadow-[3px_3px_0_#000] transform rotate-6 ring-2 ring-black"
        )}>
          Top Sponsor
        </div>
      )}

      {/* Bigger Logo */}
      <motion.div
        className={cn(
          "relative w-full max-w-[200px] aspect-square p-5 mb-4 rounded-xl border-4 transition-all",
          colors.border,
          "bg-white shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]"
        )}
        whileHover={{ scale: 1.12, boxShadow: `0 0 40px -5px ${colors.glow.split('/').pop()}`, transition: { duration: 0.3 } }}
      >
        <img src={logo} alt={`${name} Logo`} className="w-full h-full object-contain" />
      </motion.div>

      <h3 className="text-2xl md:text-3xl font-black tracking-tight text-black">
        {name}
      </h3>

      {description && <p className="mt-3 text-sm md:text-base text-gray-800 max-w-sm">{description}</p>}

      {website && (
        <motion.span
          className={cn(
            "mt-4 inline-flex items-center gap-1 text-sm md:text-base font-extrabold px-3 py-1 rounded-full border-2 border-black",
            colors.text,
            "bg-white shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] transition-all"
          )}
          whileHover={{ x: 2, y: -2 }}
        >
          Visit Website
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.span>
      )}

      <div
        className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#00000010_1px,transparent_1px)] bg-size:20px_20px pointer-events-none rounded-2xl"
        aria-hidden="true"
      />
    </motion.div>
  );
};

export default SponsorCard;
