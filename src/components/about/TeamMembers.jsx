import React from "react";
import { Linkedin, Mail, ExternalLink } from "lucide-react";
import Image from "next/image";

const TeamMembers = () => {
  const team = [
    {
      name: "Tahmid Rahman",
      role: "Team Captain",
      dept: "Management",
      image: "/p1.jpg",
      linkedin: "#",
      bio: "Leading the charge in powertrain integration and team strategy.",
    },
    {
      name: "Samiul Islam",
      role: "Chief Technical Officer",
      dept: "Engineering",
      image: "/p1.jpg",
      linkedin: "#",
      bio: "Specializing in CFD analysis and aerodynamic efficiency.",
    },
    {
      name: "Ayesha Siddiqua",
      role: "Head of Electronics",
      dept: "Electrical",
      image: "/p1.jpg",
      linkedin: "#",
      bio: "Designing custom PCB layouts and data acquisition systems.",
    },
    {
      name: "Farhan Ahmed",
      role: "Chassis Lead",
      dept: "Mechanical",
      image: "/p1.jpg",
      linkedin: "#",
      bio: "Expert in spaceframe optimization and torsional stiffness.",
    },
  ];

  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group relative">
              {/* Card Container */}
              <div className="relative overflow-hidden rounded-2xl bg-gray-800 border border-white/5 transition-all duration-500 hover:border-blue-500/50 hover:-translate-y-2">
                {/* Image Section */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  {/* Department Badge Overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold tracking-widest text-blue-400 uppercase">
                      {member.dept}
                    </span>
                  </div>
                  {/* Hover Info Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-xs text-gray-300 italic leading-relaxed">
                      "{member.bio}"
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 bg-gray-800/80 backdrop-blur-sm relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight uppercase italic group-hover:text-blue-500 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-blue-500 font-mono text-[10px] uppercase tracking-widest mt-1">
                        {member.role}
                      </p>
                    </div>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      className="text-gray-500 hover:text-white transition-colors p-2 bg-white/5 rounded-lg border border-white/5"
                    >
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>

                {/* Decorative Speed Lines (Bottom) */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tactical Recruitment CTA */}
        <div className="mt-20 p-8 rounded-3xl border border-dashed border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors">
          <div>
            <h4 className="text-white font-bold text-xl uppercase italic">
              Want to join the roster?
            </h4>
            <p className="text-gray-500 text-sm mt-1">
              We are always looking for passionate engineers and designers.
            </p>
          </div>
          <button className="px-8 py-3 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-blue-600 hover:text-white transition-all">
            Apply for 2026 Season
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
