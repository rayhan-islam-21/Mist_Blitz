import React from "react";
import { Award, Trophy, Target, Zap, ChevronRight, Camera } from "lucide-react";
import Image from "next/image";
import { Highlighter } from "../ui/highlighter";

const Achievements = () => {
  const achievements = [
    {
      year: "2025",
      title: "PR & Design Excellence",
      event: "International FS Competition",
      desc: "Dominated the static events with a flawless Engineering Design Report and a market-leading Business Plan.",
      icon: <Award className="w-8 h-8 text-blue-500" />,
      size: "lg",
      tag: "Top Tier",
      image: "/china3.jpg", // Add your image path
    },
    {
      year: "2024",
      title: "Global 1st Place",
      event: "FSAE Japan",
      desc: "Rookie category champions. Top marks in Acceleration.",
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      size: "sm",
      tag: "Winner",
      image: "/china3.jpg",
    },
    {
      year: "2024",
      title: "Furiosa 1.0",
      event: "Project Launch",
      desc: "MIST's first combustion prototype cleared tech inspection.",
      icon: <Zap className="w-6 h-6 text-emerald-500" />,
      size: "sm",
      tag: "Milestone",
      image: "/china3.jpg",
    },
    {
      year: "2023",
      title: "Concept Innovation",
      event: "Design Phase",
      desc: "Secured funding for the first carbon-fiber aero-package concept.",
      icon: <Target className="w-6 h-6 text-purple-500" />,
      size: "md",
      tag: "Innovation",
      image: "/china.jpg",
    },
  ];

  return (
    <section className="py-24  relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-red-600 font-mono tracking-[0.4em] uppercase text-sm mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-red-600"></span> Proven Excellence
            </h2>
            <h1 className="text-5xl md:text-7xl font-black text-black tracking-tight uppercase italic">
             <Highlighter> Hall of <span className="text-red-700 ">Legacy</span></Highlighter>
            </h1>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
            <p className="text-gray-900 font-mono text-[10px] uppercase tracking-widest">
              Global Ranking Status
            </p>
            <p className="text-2xl font-bold text-black uppercase italic flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Active Contender
            </p>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-red-100 transition-all duration-500 hover:border-red-500/50 
                ${item.size === "lg" ? "md:col-span-2 md:row-span-2" : ""}
                ${item.size === "md" ? "md:col-span-1 md:row-span-1" : ""}
                ${item.size === "sm" ? "md:col-span-1 md:row-span-1" : ""}`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-120 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-br from-gray-900/70 via-gray-900/70 to-black/10"></div>
              </div>

              {/* Content Layer */}
              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-black/50 backdrop-blur-lg rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <span className="text-4xl font-black text-white/10 font-mono group-hover:text-blue-500/20 transition-colors">
                      {item.year}
                    </span>
                  </div>

                  <div className="inline-block px-2 py-1 rounded-md bg-red-600/20 border border-red-600/30 text-red-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                    {item.tag}
                  </div>

                  <h3
                    className={`font-bold text-white mb-2 group-hover:text-red-600 transition-colors uppercase  tracking-wider 
                    ${item.size === "lg" ? "text-4xl md:text-5xl" : "text-xl"}`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-red-500 font-mono text-[10px] mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-red-500"></span>{" "}
                    {item.event}
                  </p>

                  <p
                    className={`text-gray-400 leading-relaxed font-light ${
                      item.size === "lg"
                        ? "text-lg max-w-md"
                        : "text-xs max-w-xs"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>

                {item.size === "lg" && (
                  <button className="flex items-center gap-2 text-white/50 text-xs font-mono group-hover:text-red-500 transition-colors uppercase tracking-widest">
                    Explore Technical Details <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Special Visual "Filler" Card - Pure Image */}
          <div className="hidden md:block relative rounded-3xl overflow-hidden border border-white/10 group">
            <Image
              src="/china4.jpg"
              fill
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              alt="Action"
            />
            <div className="absolute inset-0 mix-blend-multiply"></div>
            <div className="absolute bottom-4 left-4 text-white font-mono text-[10px] flex items-center gap-2">
              <Camera size={12} /> SHOT AT MIST LAB
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
