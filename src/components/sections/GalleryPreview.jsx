"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Install lucide-react or use SVGs

/* ---------------- DATA ---------------- */

const galleryData = [
  {
    id: 1,
    image: "/furiosa.png",
    title: "Vehicle Testing",
    tag: "Furiosa 1.0 • 2024",
    hoverText: "Track testing, data acquisition and performance validation.",
  },
  {
    id: 2,
    image: "/team.jpg",
    title: "Manufacturing Phase",
    tag: "Workshop • Chassis",
    hoverText: "Chassis fabrication, welding and assembly process.",
  },
  {
    id: 3,
    image: "/china.jpg",
    title: "Team MIST BLITZ",
    tag: "Formula Student",
    hoverText: "Representing Bangladesh on the international Formula Student stage.",
  },
  {
    id: 4,
    image: "/china4.jpg",
    title: "Design & Simulation",
    tag: "Engineering",
    hoverText: "CAD, CAE and simulation-driven engineering workflow.",
  },
  {
    id: 5,
    image: "/china3.jpg",
    title: "Competition Environment",
    tag: "International FS",
    hoverText: "Dynamic and static events under global competition standards.",
  },
];

/* ---------------- MAIN ---------------- */

export default function GalleryPreviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const delay = 5000;

  const next = () => setActiveIndex((prev) => (prev + 1) % galleryData.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(next, delay);
    }
    return () => clearInterval(intervalRef.current);
  }, [activeIndex, isHovered]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -100) next();
    if (info.offset.x > 100) prev();
  };

  return (
    <section className="relative bg-slate-50 overflow-hidden py-24 md:py-32">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-200/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-100/30 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-red-600" />
              <span className="text-xs font-bold tracking-[0.2em] text-red-600 uppercase">
                Our Journey
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight">
              The Gallery<span className="text-red-600">.</span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Moments that define our engineering process, teamwork, and presence 
              at Formula Student competitions worldwide.
            </p>
          </div>

          {/* Custom Navigation Controls */}
          <div className="flex gap-4">
            <NavButton onClick={prev} icon={<ChevronLeft size={24} />} />
            <NavButton onClick={next} icon={<ChevronRight size={24} />} />
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative h-[400px] md:h-[550px] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="relative w-full h-full cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
          >
            {galleryData.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                activeIndex={activeIndex}
                total={galleryData.length}
              />
            ))}
          </motion.div>
        </div>

        {/* Improved Indicators */}
        <div className="flex justify-center items-center gap-4 mt-16">
          {galleryData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="group relative py-4"
            >
              <div className={`h-[4px] transition-all duration-500 rounded-full ${
                activeIndex === i ? "w-12 bg-slate-900" : "w-4 bg-slate-300 group-hover:bg-slate-400"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HELPERS ---------------- */

function NavButton({ onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className="p-4 rounded-full border border-slate-200 bg-white text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm"
    >
      {icon}
    </button>
  );
}

function GalleryCard({ item, index, activeIndex, total }) {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  const isActive = offset === 0;
  const isAbsVisible = Math.abs(offset) <= 1;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[85%] md:w-[60%] h-full"
      initial={false}
      animate={{
        x: `calc(-50% + ${offset * 55}%)`,
        y: "-50%",
        scale: isActive ? 1 : 0.85,
        opacity: isAbsVisible ? 1 : 0,
        zIndex: total - Math.abs(offset),
        rotateY: offset * -15, // Adds a subtle 3D stack effect
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        whileHover={isActive ? { y: -10 } : {}}
        className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-500 ${
            isActive ? "shadow-red-900/10" : "shadow-none"
        }`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={isActive}
          className={`object-cover transition-transform duration-700 ${isActive ? "scale-105" : "scale-110 blur-sm"}`}
        />

        {/* Sophisticated Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
        
        {/* Content Layer */}
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
           <motion.div
             initial={false}
             animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
           >
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest text-white uppercase mb-4 inline-block">
                {item.tag}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-slate-300 max-w-md line-clamp-2 md:line-clamp-none text-sm md:text-base">
                {item.hoverText}
              </p>
           </motion.div>
        </div>

        {/* Overlay for non-active cards to focus center */}
        {!isActive && (
            <div className="absolute inset-0 bg-slate-900/40 transition-opacity duration-500" />
        )}
      </motion.div>
    </motion.div>
  );
}