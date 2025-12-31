import React from "react";
import Image from "next/image";

const Achievements = () => {
  const achievements = [
    {
      size: "lg",
      image: "/ach/best.jpg",
    },
    {
      size: "sm",
      image: "/ach/no1.jpg",
    },
    {
      size: "sm",
      image: "/ach/bf.jpg",
    },
    {
      size: "md",
      image: "/ach/4th.jpg",
    },
    {
      size: "sm",
      image: "/china4.jpg",
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-red-600 font-mono tracking-[0.4em] uppercase text-sm mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-red-600"></span> Proven Excellence
            </h2>
            <h1 className="text-5xl md:text-7xl font-black text-white font-sans tracking-tighter uppercase italic">
              Hall of <span className="text-red-700 ">Legacy</span>
            </h1>
          </div>
        </div>

        {/* Bento Grid Layout - Images Only */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[270px]">
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`group relative rounded overflow-hidden border border-white/10 bg-zinc-900
                transition-all duration-700 hover:border-red-600/50 hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)]
                ${item.size === "lg" ? "md:col-span-2 md:row-span-2" : "md:col-span-1 md:row-span-1"}`}
            >
              <Image
                src={item.image}
                alt={`Achievement ${index}`}
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-all duration-700 ease-in-out"
              />
              
              {/* Subtle Red Edge Highlight on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600/20 transition-colors duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;