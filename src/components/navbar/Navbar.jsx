"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: "01", name: "CORE", href: "/" },
    { id: "02", name: "CELLS", href: "/about/who-we-are" },
    { id: "03", name: "NODE", href: "/partners" },
    { id: "04", name: "DATA", href: "/gallery" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]">
      
      {/* 1. THE HUB (Fixed Top Left) */}
      <div className="absolute top-10 left-10 pointer-events-auto">
        <div 
          className="relative w-20 h-20 flex items-center justify-center cursor-pointer group"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Rotating Outer Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-dashed border-red-600/40 rounded-full"
          />
          
          {/* Inner Static Core */}
          <div className="relative w-14 h-14 bg-black border border-white/20 rounded-full flex items-center justify-center overflow-hidden">
            <Image 
              src="/hero.png" 
              alt="B" 
              width={40} 
              height={40} 
              className="brightness-200 object-contain scale-150" 
            />
            {/* Pulsing Status Overlay */}
            <div className="absolute inset-0 bg-red-600/10 animate-pulse" />
          </div>

          {/* Label Indicator */}
          <div className="absolute -right-24 top-1/2 -translate-y-1/2 flex flex-col">
            <span className="font-mono text-[8px] text-red-600 font-black">SYSTEM_ACCESS</span>
            <span className="font-mono text-[10px] text-white/40">{isOpen ? "CLOSE_X" : "EXPAND_V"}</span>
          </div>
        </div>
      </div>

      {/* 2. THE ORBITAL LINKS (Expandable) */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute top-36 left-16 flex flex-col gap-6 pointer-events-auto">
            {navLinks.map((link, idx) => {
              const active = pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={link.href} className="flex items-center group">
                    {/* The "Coordinate" Line */}
                    <div className={`w-8 h-px transition-all duration-500 ${active ? "w-16 bg-red-600" : "bg-white/20 group-hover:bg-red-600"}`} />
                    
                    <div className="ml-4 flex flex-col">
                      <span className={`font-mono text-[7px] ${active ? "text-red-600" : "text-white/20"}`}>
                        COORD_0{idx + 1}
                      </span>
                      <span className={`text-xl font-black italic tracking-tighter transition-all ${
                        active ? "text-white" : "text-white/20 group-hover:text-red-500 group-hover:translate-x-2"
                      }`}>
                        {link.name}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* THE EXECUTE TRIGGER */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10"
            >
              <Link 
                href="/join" 
                className="inline-block px-6 py-2 border border-red-600 text-red-600 font-mono text-[10px] font-black tracking-widest hover:bg-red-600 hover:text-white transition-all"
              >
                $RUN_INITIATE
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. PERIPHERAL DATA (The "Scan" Viewport) */}
      <div className="absolute inset-0 border-[20px] border-white/[0.02] pointer-events-none">
        <div className="absolute top-4 right-10 flex gap-10 font-mono text-[8px] text-white/10">
          <span>FRAME_STABILITY: 98%</span>
          <span>SENSORS: NOMINAL</span>
          <span>BUFFER: 0.002ms</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;