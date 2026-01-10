"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleryData = [
  { id: 1, image: "/car2.jpg", title: "Furiosa 1.0", description: "Performance validation and track testing." },
  { id: 2, image: "/improve.jpg", title: "Fabrication", description: "Precision chassis manufacturing." },
  { id: 3, image: "/china4.jpg", title: "MIST BLITZ", description: "Global Formula Student deployment." },
  { id: 4, image: "/car2.jpg", title: "Engineering", description: "Advanced system design and CAD." },
  { id: 5, image: "/china3.jpg", title: "Competition", description: "International static and dynamic events." },
];

export default function FormulaGallery() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef(null);

  const next = () => setActiveIndex((prev) => (prev + 1) % galleryData.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);

  // Drag Handler
  const handleDragEnd = (event, info) => {
    const threshold = 50; // pixels to trigger slide
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(next, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="relative bg-[#050505] text-white py-12 md:py-24 overflow-hidden select-none">
      <div className="max-w-350 mx-auto px-4 md:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-6">
          <motion.h2 className="text-5xl md:mb-20 font-sans sm:text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8]">
            OUR <br /> <span className="text-red-600">JOURNEY</span>
          </motion.h2>

          <div className="flex gap-2">
            <button onClick={prev} className="p-4 md:p-6 border border-white/10 hover:bg-red-600 transition-colors active:scale-95">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="p-4 md:p-6 border border-white/10 hover:bg-red-600 transition-colors active:scale-95">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* DRAGGABLE CAROUSEL CONTAINER */}
        <motion.div 
          ref={containerRef}
          className="relative h-100 sm:h-125 md:h-162.5 flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
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

        <div className="mt-8 md:mt-12 flex justify-center gap-2">
          {galleryData.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 transition-all duration-500 ${activeIndex === i ? "w-12 md:w-24 bg-red-600" : "w-4 bg-white/10"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, index, activeIndex, total }) {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  const isActive = offset === 0;

  return (
    <motion.div
      className="absolute w-full md:w-[80%] h-full pointer-events-none"
      initial={false}
      animate={{
        x: `${offset * 100}%`, 
        scale: isActive ? 1 : 0.8,
        opacity: Math.abs(offset) > 1 ? 0 : 1 - Math.abs(offset) * 0.6,
        zIndex: total - Math.abs(offset),
      }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
    >
      <div className={`relative w-full h-full overflow-hidden transition-all duration-700 ${isActive ? ' rounded-xl shadow-2xl' : 'opacity-30 blur-[2px]'}`}>
        <Image 
          src={item.image} 
          alt={item.title} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
          draggable={false} // Prevents default browser image ghosting
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
          <h3 className="text-4xl font-sans md:text-7xl font-black uppercase italic tracking-tighter leading-none pointer-events-auto">
            {item.title}
          </h3>
          <AnimatePresence>
            {isActive && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.3em] mt-2 md:mt-4 pointer-events-auto"
              >
                {item.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}