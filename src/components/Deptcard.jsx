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
        "border border-white/10 hover:border-red-500/40",
        className
      )}
    >
      {/* 1. BACKGROUND IMAGE WITH DUAL FILTERS */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover   group-hover:scale-105 transition-all duration-1000 ease-out brightness-105 group-hover:brightness-100"
        />
        {/* Dynamic Gradient Mask */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* 2. HUD ELEMENTS (The Engineering Aesthetic) */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
      </div>

      {/* 3. CENTER CONTENT CONTAINER */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end p-8">
        
        {/* Floating Watermark Role (Visible on hover) */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 opacity-0 group-hover:opacity-10 transition-all duration-700 pointer-events-none">
          <h4 className="text-9xl font-black italic uppercase text-white leading-none -ml-12">{title.split(' ')[0]}</h4>
        </div>

        {/* Title & Static Info */}
        <div className="relative space-y-2">
          
          <h3 className="text-2xl border-l-4 border-l-red-500 p-2 font-black italic font-sans uppercase  text-white transition-all duration-500 ">
            {title}
          </h3>
        </div>

        {/* 4. EXPANDABLE SECTION (Description & Button) */}
        <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-60 group-hover:opacity-100 transition-all duration-700 ease-in-out">
          <p className="mt-4 text-neutral-300 text-sm leading-relaxed font-medium line-clamp-3">
            {description}
          </p>
        </div>
      </div>

      {/* 5. OVERLAY MESH GRID (Carbon Fiber vibe) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(45deg,#fff_1px,transparent_1px),linear-gradient(-45deg,#fff_1px,transparent_1px)] bg-size-[20px_20px]" />
    </div>
  );
});

export default DeptCard;