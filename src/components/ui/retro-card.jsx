"use client";
import React from "react";
import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const ACCENT_COLORS = {
  blue: { glow: "shadow-blue-400/60", border: "border-blue-500", text: "text-blue-500" },
  yellow: { glow: "shadow-yellow-400/60", border: "border-yellow-500", text: "text-yellow-500" },
  red: { glow: "shadow-red-400/60", border: "border-red-500", text: "text-red-500" },
  green: { glow: "shadow-green-400/60", border: "border-green-500", text: "text-green-500" },
  default: { glow: "shadow-gray-400/30", border: "border-gray-300", text: "text-gray-700" },
};

const SponsorCard = ({ logo, name, website, description, accentColor = "default" }) => {
  const colors = ACCENT_COLORS[accentColor] || ACCENT_COLORS.default;

  return (
    <motion.div
      onClick={() => window.open(website, "_blank")}
      className={cn(
        "relative cursor-pointer flex flex-col items-center p-6 text-center rounded-xl transition-all",
        "border-4 border-black bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000]",
        "hover:-translate-y-1 hover:-rotate-1"
      )}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 10px 20px rgba(0,0,0,0.2), 0 0 20px ${colors.glow}`,
      }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Background Dot Pattern */}
      <div
        className="absolute inset-0 opacity-10 bg-[radial-gradient(#00000020_1px,transparent_1px)] [background-size:20px_20px]"
        aria-hidden="true"
      />

      {/* Logo */}
      <motion.div
        className={cn(
          "relative w-full max-w-[140px] aspect-square p-3 mb-4 rounded-lg border-4 transition-all",
          colors.border,
          "bg-white"
        )}
        whileHover={{ scale: 1.08 }}
      >
        <img src={logo} alt={`${name} Logo`} className="w-full h-full object-contain" />
      </motion.div>

      {/* Name */}
      <h3 className="text-xl font-extrabold tracking-tight text-black drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
        {name}
      </h3>

      {/* Description */}
      {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}

      {/* Visit CTA */}
      <span
        className={cn(
          "mt-4 text-sm font-medium cursor-pointer transition-all duration-300",
          colors.text,
          "hover:underline hover:underline-offset-4"
        )}
      >
        Visit Website &rarr;
      </span>
    </motion.div>
  );
};

export default SponsorCard;
