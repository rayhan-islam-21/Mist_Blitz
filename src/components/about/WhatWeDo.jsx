import React from 'react';
import { Trophy, PenTool, Zap, Flag } from 'lucide-react'; // Ensure lucide-react is installed

const WhatWeDo = () => {
  const categories = [
    {
      title: "The Competition",
      icon: <Trophy className="w-8 h-8 text-red-500" />,
      description: "Formula Student is the world's most established educational engineering competition, challenging university students to design, build, and race a formula-style car.",
      list: ["FSG (Germany)", "FSAE Japan", "FSUK (United Kingdom)"],
      color: "border-blue-500/20"
    },
    {
      title: "Static Events",
      icon: <PenTool className="w-8 h-8 text-emerald-500" />,
      description: "It's not just about speed. We are judged on our engineering logic, financial sustainability, and business acumen.",
      list: [
        "Business Plan Presentation",
        "Engineering Design Report",
        "Cost & Manufacturing Report"
      ],
      color: "border-emerald-500/20"
    },
    {
      title: "Dynamic Events",
      icon: <Zap className="w-8 h-8 text-red-500" />,
      description: "Where the rubber meets the road. Our car is pushed to its absolute physical limits in five grueling disciplines.",
      list: [
        "Acceleration (0-75m)",
        "Skidpad (Cornering G-force)",
        "Autocross (Sprint Handling)",
        "Endurance (22km Reliability)"
      ],
      color: "border-yellow-500/20"
    }
  ];

  return (
    <section id='what-we-do' className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-red-500 font-mono tracking-widest uppercase text-sm mb-4">The Challenge</h2>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-normal italic">
            WHAT WE <span className="text-red-600 italic">DO</span>
          </h1>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((item, index) => (
            <div 
              key={index}
              className={`relative bg-gray-800/40 p-8 rounded-2xl border ${item.color} backdrop-blur-sm hover:bg-red-200/10 transition-all duration-300 group overflow-hidden`}
            >
              {/* Background Decoration */}
              <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                {item.icon}
              </div>

              <div className="mb-6 inline-block p-3 bg-gray-900 rounded-xl border border-white/5">
                {item.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 italic uppercase tracking-wide">
                {item.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              <ul className="space-y-3">
                {item.list.map((li, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Call to action or Summary */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-900/20 to-transparent border border-white/5 text-center">
            <p className="text-gray-400 max-w-3xl mx-auto italic">
              "Formula Student is more than just a race; it is a test of engineering ingenuity, project management, and teamwork under pressure."
            </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;