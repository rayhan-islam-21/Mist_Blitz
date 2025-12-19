"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------------- DATA ---------------- */

const galleryData = [
  {
    id: 1,
    image: "/car2.jpg",
    title: "Furiosa 1.0",
    tag: "Furiosa 1.0 • 2024",
    hoverText: "Track testing and validation of Furiosa 1.0, focusing on vehicle dynamics and performance benchmarking.",
  },
  {
    id: 2,
    image: "/improve.jpg",
    title: "Manufacturing",
    tag: "Workshop • Chassis",
    hoverText: "In-house chassis manufacturing involving precision fabrication and final structural assembly.",
  },
  {
    id: 3,
    image: "/china4.jpg",
    title: "Team MIST BLITZ",
    tag: "Formula Student",
    hoverText: "MIST BLITZ representing Bangladesh at international Formula Student competitions.",
  },
  {
    id: 4,
    image: "/china.jpg",
    title: "Engineering",
    tag: "Design & Simulation",
    hoverText: "System-level vehicle design driven by CAD modeling and CFD analysis.",
  },
  {
    id: 5,
    image: "/china3.jpg",
    title: "Competition",
    tag: "International FS",
    hoverText: "Participation in global Formula Student static and dynamic events under rigorous regulations.",
  },
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function GalleryPreviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const delay = 5000;

  const next = () => setActiveIndex((prev) => (prev + 1) % galleryData.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(next, delay);
    }
    return () => clearInterval(intervalRef.current);
  }, [activeIndex, isAutoPlaying]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -50) next(); // More sensitive drag for mobile
    if (info.offset.x > 50) prev();
  };

  return (
    <section className="relative bg-[#fafafa] overflow-hidden py-12 md:py-24">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[50%] md:w-[30%] h-[30%] bg-red-200 blur-[80px] md:blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[50%] md:w-[30%] h-[30%] bg-yellow-100 blur-[80px] md:blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 md:mb-3">
              <span className="w-8 md:w-10 h-[2px] bg-red-600" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-red-600 uppercase">Archive</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-none">
              Our Journey<span className="text-red-600">.</span>
            </h2>
          </div>
          
          {/* Nav Buttons - Hidden on very small screens, visible on md+ */}
          <div className="hidden md:flex gap-3">
            <button onClick={prev} className="p-4 rounded-full border border-slate-200 bg-black hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="p-4 rounded-full border border-slate-200 bg-black hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative h-[400px] md:h-[550px] flex items-center justify-center touch-pan-y"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
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

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8 md:mt-12">
          {galleryData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                activeIndex === i ? "w-8 md:w-10 bg-slate-900" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD COMPONENT ---------------- */

function GalleryCard({ item, index, activeIndex, total }) {
  const [isHovered, setIsHovered] = useState(false);
  
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  const isActive = offset === 0;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[85%] md:w-[70%] h-full"
      initial={false}
      animate={{
        // On mobile (smaller screen width), we reduce the x-offset multiplier
        x: `calc(-50% + ${offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 75 : 60)}%)`,
        y: "-50%",
        scale: isActive ? 1 : 0.85,
        opacity: Math.abs(offset) <= 1 ? 1 : 0,
        zIndex: total - Math.abs(offset),
        rotateY: offset * -10, // Reduced tilt for better mobile visibility
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      style={{ perspective: 1000 }}
    >
      <div 
        className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden group shadow-xl md:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => !isActive && setIsHovered(false)} // Reset hover if clicking away
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={`object-cover transition-transform duration-700 ${isActive ? "scale-105" : "scale-110 blur-[1px]"}`}
          sizes="(max-width: 768px) 100vw, 70vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Content Box */}
        <div className="absolute bottom-0 left-0 w-full p-5 md:p-12">
          <motion.div
            animate={{ y: (isHovered && isActive) ? 0 : 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span className="inline-block px-2 py-0.5 mb-2 md:mb-4 text-[9px] md:text-[10px] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-black bg-yellow-300 rounded">
              {item.tag}
            </span>
            
            <h3 className="text-xl md:text-5xl font-bold text-white tracking-tight mb-1 md:mb-2 leading-tight">
              {item.title}
            </h3>

            {/* Mobile Strategy: Show text on click/tap for active card */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: (isHovered && isActive) ? "auto" : 0, 
                opacity: (isHovered && isActive) ? 1 : 0 
              }}
              className="overflow-hidden"
            >
              <p className="text-slate-300 text-xs md:text-lg max-w-xl leading-relaxed mt-2 md:mt-4 border-l-2 border-red-600 pl-3 md:pl-4">
                {item.hoverText}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Non-active focus overlay */}
        {!isActive && (
          <div className="absolute inset-0 bg-slate-900/40" />
        )}
      </div>
    </motion.div>
  );
}