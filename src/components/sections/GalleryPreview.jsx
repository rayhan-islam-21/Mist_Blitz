"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Target, Maximize2, Activity } from "lucide-react";

/* ---------------- DATA ---------------- */

const galleryData = [
  {
    id: 1,
    image: "/car2.jpg",
    title: "Furiosa 1.0",
    tag: "Chassis_Phase // 01",
    hoverText: "Track testing and validation of Furiosa 1.0, focusing on vehicle dynamics and performance benchmarking.",
  },
  {
    id: 2,
    image: "/improve.jpg",
    title: "Manufacturing",
    tag: "Fabrication // 02",
    hoverText: "In-house chassis manufacturing involving precision fabrication and final structural assembly.",
  },
  {
    id: 3,
    image: "/china4.jpg",
    title: "Team MIST BLITZ",
    tag: "Deployment // 03",
    hoverText: "MIST BLITZ representing Bangladesh at international Formula Student competitions.",
  },
  {
    id: 4,
    image: "/car2.jpg",
    title: "Engineering",
    tag: "System_Design // 04",
    hoverText: "System-level vehicle design driven by CAD modeling and CFD analysis.",
  },
  {
    id: 5,
    image: "/china3.jpg",
    title: "Competition",
    tag: "Static_Events // 05",
    hoverText: "Participation in global Formula Student static and dynamic events under rigorous regulations.",
  },
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function GalleryPreviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const delay = 6000;

  const next = () => setActiveIndex((prev) => (prev + 1) % galleryData.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(next, delay);
    }
    return () => clearInterval(intervalRef.current);
  }, [activeIndex, isAutoPlaying]);

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -50) next();
    if (info.offset.x > 50) prev();
  };

  return (
    <section className="relative selection:bg-red-600 selection:text-white bg-[#050505] overflow-hidden py-24 md:py-32 border-t border-white/5">
      
      {/* 1. TECHNICAL BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-white/[0.01] italic select-none pointer-events-none uppercase tracking-tighter">
        ARCHIVE_RECORD
      </div>

      <div className="max-w-[1800px] mx-auto px-6 relative z-10">
        
        {/* 2. HEADER: BRUTALIST STYLE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <Activity size={16} className="text-red-600 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.5em] text-red-600 uppercase font-mono">
                Historical_Data // Archive
              </span>
            </div>
            <h2 className="text-7xl font-sans md:text-[11rem] font-black text-white italic leading-[0.75] tracking-tighter uppercase">
              THE<br /><span className="text-transparent stroke-text">JOURNEY.</span>
            </h2>
          </div>

          <div className="flex gap-4">
            <button onClick={prev} className="group relative p-6 bg-white hover:bg-red-600 transition-colors">
              <ChevronLeft size={24} className="text-black group-hover:text-white transition-colors" />
            </button>
            <button onClick={next} className="group relative p-6 bg-white hover:bg-red-600 transition-colors">
              <ChevronRight size={24} className="text-black group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* 3. CAROUSEL */}
        <div
          className="relative h-[450px] md:h-[650px] flex items-center justify-center touch-pan-y"
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

        {/* 4. FOOTER STATUS BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-16 gap-6 pt-10 border-t border-white/10 font-mono text-[9px] text-gray-600 uppercase tracking-widest italic">
          <div className="flex gap-10">
            <span>[X_COORD: 102.4]</span>
            <span>[Y_COORD: 900.2]</span>
          </div>
          <div className="flex gap-2">
            {galleryData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-[2px] transition-all duration-500 ${
                  activeIndex === i ? "w-12 bg-red-600" : "w-4 bg-gray-800"
                }`}
              />
            ))}
          </div>
          <span>Ref: BLITZ_ARCHIVE_2024</span>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px white;
          color: transparent;
        }
      `}</style>
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
      className="absolute left-1/2 top-1/2 w-[90%] md:w-[65%] h-full"
      initial={false}
      animate={{
        x: `calc(-50% + ${offset * (typeof window !== "undefined" && window.innerWidth < 768 ? 85 : 55)}%)`,
        y: "-50%",
        scale: isActive ? 1 : 0.8,
        opacity: Math.abs(offset) <= 1 ? 1 : 0,
        zIndex: total - Math.abs(offset),
        filter: isActive ? "grayscale(0%)" : "grayscale(100%) blur(4px)",
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
    >
      <div
        className={`relative w-full h-full border ${isActive ? 'border-red-600' : 'border-white/10'} overflow-hidden group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className={`object-cover transition-transform duration-1000 ${
            isActive ? "scale-100" : "scale-125"
          }`}
          sizes="(max-width: 768px) 100vw, 70vw"
        />

        {/* 5. HUD VIEWFINDER OVERLAY (Only on active) */}
        {isActive && (
          <div className="absolute inset-0 z-10 pointer-events-none border-[20px] border-black/20">
             <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-red-600" />
             <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-red-600" />
             <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-red-600" />
             <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-red-600" />
             <div className="absolute top-1/2 left-0 w-full h-px bg-red-600/10" />
             <div className="absolute left-1/2 top-0 w-px h-full bg-red-600/10" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

        {/* Content Box */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
          <motion.div animate={{ y: isHovered && isActive ? -10 : 0 }}>
            <div className="flex items-center gap-3 mb-4">
               <Target size={14} className="text-red-600" />
               <span className="inline-block px-3 py-1 text-[10px] font-mono font-bold uppercase text-white bg-red-600">
                 {item.tag}
               </span>
            </div>

            <h3 className="text-3xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
              {item.title}
            </h3>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                height: isHovered && isActive ? "auto" : 0,
                opacity: isHovered && isActive ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              <p className="text-gray-400 font-mono text-xs md:text-sm max-w-xl leading-relaxed mt-4 border-l-4 border-red-600 pl-6 uppercase">
                {item.hoverText}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* 6. CORNER ICON */}
        <div className="absolute top-6 right-6 opacity-40 group-hover:opacity-100 transition-opacity">
           <Maximize2 size={20} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}