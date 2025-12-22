import { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronRight, Zap, Target } from "lucide-react";

const DeptCard = forwardRef(function DeptCard(
  { title, description, image, className, style },
  ref
) {
  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "group relative w-full h-120 bg-[#0A0A0A] overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-in-out",
        "border border-white/10 hover:border-blue-500/40",
        className
      )}
    >
      {/* 1. BACKGROUND IMAGE WITH DUAL FILTERS */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out brightness-75 group-hover:brightness-90"
        />
        {/* Dynamic Gradient Mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* 2. HUD ELEMENTS (The Engineering Aesthetic) */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
        <div className="flex items-center gap-2 bg-blue-600/10 backdrop-blur-md px-3 py-1 rounded-full border border-blue-500/20">
          <Zap size={10} className="text-blue-500 fill-blue-500 animate-pulse" />
          <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest font-bold">Sector_0{title.length}</span>
        </div>
      </div>

      {/* 3. CENTER CONTENT CONTAINER */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-8">
        
        {/* Floating Watermark Role (Visible on hover) */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 opacity-0 group-hover:opacity-10 transition-all duration-700 pointer-events-none">
          <h4 className="text-9xl font-black italic uppercase text-white leading-none -ml-12">{title.split(' ')[0]}</h4>
        </div>

        {/* Title & Static Info */}
        <div className="relative space-y-2">
          <div className="flex items-center gap-2 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
             <div className="w-8 h-[2px] bg-blue-600" />
             <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Department Module</span>
          </div>
          
          <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white transition-all duration-500 group-hover:text-blue-500">
            {title}
          </h3>
        </div>

        {/* 4. EXPANDABLE SECTION (Description & Button) */}
        <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-60 group-hover:opacity-100 transition-all duration-700 ease-in-out">
          <p className="mt-4 text-neutral-300 text-sm leading-relaxed font-medium line-clamp-3">
            {description}
          </p>

          <div className="mt-6 flex items-center justify-between">
            <button className="flex items-center gap-2 group/btn relative">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white group-hover/btn:text-blue-500 transition-colors">
                Initialize Protocol
              </span>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover/btn:bg-blue-600 group-hover/btn:border-blue-600 transition-all">
                 <ChevronRight size={14} className="text-white group-hover/btn:translate-x-0.5 transition-transform" />
              </div>
            </button>
            
            {/* Visual Telemetry Detail */}
            <div className="hidden sm:flex gap-1">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="w-1 h-3 bg-white/10 group-hover:bg-blue-600/40 transition-all" style={{ transitionDelay: `${i * 50}ms` }} />
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. OVERLAY MESH GRID (Carbon Fiber vibe) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(45deg,#fff_1px,transparent_1px),linear-gradient(-45deg,#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
    </div>
  );
});

export default DeptCard;