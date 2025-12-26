"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Button from "../ui/retro-btn";

const Navbar = () => {
  const pathname = usePathname();
  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: "SYS_01", name: "Home", href: "/" },
    { id: "SYS_02", name: "About", href: "/about/who-we-are" },
    { id: "SYS_03", name: "Partners", href: "/partners" },
    { id: "SYS_04", name: "Gallery", href: "/gallery" },
    { id: "SYS_05", name: "Shop", href: "/shop" },
  ];

  return (
    <>
      {/* 1. TOP BAR - Scaled for Mobile */}
      <div className="absolute top-0 left-0 w-full h-24 flex justify-between items-start px-6 md:px-12 pt-6 md:pt-10 z-[140] pointer-events-none">
        
        {/* LEFT: Logo Section */}
        <div className="flex gap-3 md:gap-6 items-center pointer-events-auto">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 md:gap-4 group">
              <div className="w-[2px] h-4 md:h-6 bg-red-600 shadow-[0_0_8px_#ef4444]" />
              <Link href="/">
                <Image src="/hero.png" alt="BLITZ" width={90} height={22} className="brightness-200 contrast-125 md:w-[115px] md:h-[28px]" priority />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT: Time & Initialize */}
        <div className="flex gap-4 md:gap-10 pointer-events-auto items-start">
          <div className="flex flex-col items-end font-mono">
            <div className="flex items-center gap-2">
              <span className="text-[8px] md:text-[10px] text-white font-bold tracking-widest">{systemTime}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            </div>
            <div className="hidden sm:flex mt-2 gap-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`h-[2px] w-3 md:w-4 ${i < 4 ? "bg-red-600" : "bg-white/10"}`} />
              ))}
            </div>
          </div>

          <Button href="/join" className="group relative h-8 md:h-11 px-4 md:px-10 bg-red-600 text-white font-mono text-[9px] md:text-[11px] font-black flex items-center justify-center skew-x-[-20deg] hover:bg-white hover:text-red-600 transition-all duration-300">
            <Link href="/contact"> <span className="skew-x-[20deg] tracking-widest">Contact Us</span></Link>
          </Button>
        </div>
      </div>

      {/* 2. STICKY NAV - Repositioned for Mobile Screens */}
      <nav className="fixed inset-0 pointer-events-none z-[150]">
        
        {/* RIGHT SIDE NAV - Responsive widths & font sizes */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1 md:gap-1 pointer-events-auto pr-4 md:pr-8">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.id} href={item.href} className="group relative flex items-center gap-3 md:gap-6 py-2 md:py-3">
                <div className="flex flex-col items-end">
                  <span className={`font-mono text-[6px] md:text-[7px] mb-0.5 transition-colors ${active ? "text-red-600" : "text-white/20"}`}>
                    {item.id}
                  </span>
                  <span className={`text-base md:text-2xl font-sans italic font-black tracking-tighter transition-all duration-500 uppercase ${
                    active ? "text-white scale-110 pr-0" : "text-white/10 group-hover:text-red-600 group-hover:pr-1"
                  }`}>
                    {item.name}
                  </span>
                </div>
                
                <div className={`w-[2px] md:w-1 h-10 md:h-14 transition-all duration-700 ${
                  active ? "bg-red-600 shadow-[0_0_15px_#ff0000]" : "bg-white/5 group-hover:bg-red-600/40"
                }`} />
              </Link>
            );
          })}
        </div>

        {/* CENTER CROSSHAIR - Hidden on very small screens to clear the view */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] hidden sm:block">
          <div className="relative w-32 h-32 md:w-48 md:h-48 border border-white/20 rounded-full flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-red-600 rotate-45" />
          </div>
        </div>

        {/* PERIPHERAL BORDER - Mobile Adjusted Padding */}
        <div className="absolute top-0 left-0 w-full h-full border-[1px] border-white/5 m-2 md:m-4 pointer-events-none" />
      </nav>
    </>
  );
};

export default Navbar;