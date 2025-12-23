import React from "react";
import { Trophy, PenTool, Zap } from "lucide-react";

const WhatWeDo = () => {
  const categories = [
    {
      title: "The Competition",
      icon: <Trophy className="w-8 h-8 text-red-400" />,
      description:
        "Formula Student is the world's most established educational engineering competition, challenging university students to design, build, and race a formula-style car.",
      list: ["FSG (Germany)", "FSAE Japan", "FSUK (United Kingdom)"],
      bg: "bg-gradient-to-br from-red-600/20 via-red-500/10 to-transparent",
      border: "border-red-500/30",
    },
    {
      title: "Static Events",
      icon: <PenTool className="w-8 h-8 text-emerald-400" />,
      description:
        "It's not just about speed. We are judged on our engineering logic, financial sustainability, and business acumen.",
      list: [
        "Business Plan Presentation",
        "Engineering Design Report",
        "Cost & Manufacturing Report",
      ],
      bg: "bg-gradient-to-br from-emerald-600/20 via-emerald-500/10 to-transparent",
      border: "border-emerald-500/30",
    },
    {
      title: "Dynamic Events",
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      description:
        "Where the rubber meets the road. Our car is pushed to its absolute physical limits in five grueling disciplines.",
      list: [
        "Acceleration (0-75m)",
        "Skidpad (Cornering G-force)",
        "Autocross (Sprint Handling)",
        "Endurance (22km Reliability)",
      ],
      bg: "bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent",
      border: "border-blue-500/30",
    },
  ];

  return (
    <section id="what-we-do" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-red-500 font-mono tracking-widest uppercase text-sm mb-4">
            The Challenge
          </h2>
          <h1 className="text-4xl md:text-6xl font-black text-black italic">
            WHAT WE <span className="text-red-600">DO</span>
          </h1>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-6"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((item, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border ${item.border} ${item.bg}
              backdrop-blur-sm transition-all duration-300
              hover:scale-[1.02] hover:shadow-xl overflow-hidden`}
            >
              {/* Decorative icon */}
              <div className="absolute -right-6 -top-6 opacity-10">
                {item.icon}
              </div>

              {/* Icon */}
              <div className="mb-6 inline-flex p-3 bg-black/80 rounded-xl border border-white/10">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-black mb-4 italic uppercase tracking-wide">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              {/* List */}
              <ul className="space-y-3">
                {item.list.map((li, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-800 text-sm font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-red-600/10 to-transparent border border-red-500/20 text-center">
          <p className="text-gray-700 max-w-3xl mx-auto italic">
            “Formula Student is more than just a race; it is a test of engineering
            ingenuity, project management, and teamwork under pressure.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
