import { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
          className="object-cover opacity-100 group-hover:opacity-15 group-hover:scale-105 transition-all duration-1000 ease-out brightness-105 group-hover:brightness-75"
        />
        {/* Dynamic Gradient Mask */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* 2. HUD ELEMENTS (The Engineering Aesthetic) */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
      </div>

      {/* 3. CONTENT LAYER */}
      <div className="absolute inset-0 z-30 p-5">

        {/* Heading: small + centered by default, moves to top on hover */}
        <div className="absolute z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:left-4 group-hover:top-4 group-hover:translate-x-0 group-hover:translate-y-0 right-auto group-hover:right-4 transition-all duration-500">
          <h3 className="text-[11px] md:text-xs group-hover:text-lg font-black italic font-sans uppercase text-white leading-tight text-center group-hover:text-left tracking-[0.16em] group-hover:tracking-normal">
            {title}
          </h3>
        </div>
        
        {/* Floating Watermark Role (Visible on hover) */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 opacity-0 group-hover:opacity-10 transition-all duration-700 pointer-events-none">
          <h4 className="text-9xl font-black italic uppercase text-white leading-none -ml-12">{title.split(' ')[0]}</h4>
        </div>

        {/* Centered description on hover */}
        <div className="absolute inset-0 flex items-center justify-center px-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <p className="text-neutral-200 text-sm leading-relaxed font-semibold text-center line-clamp-4 max-w-[85%]">
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