"use client";
import React, { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import TeamMembers from '@/components/about/TeamMembers';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';

const technicalTeams = {
    Chassis: ["Member 1", "Member 2", "Member 3"],
    Suspension: ["Member 1", "Member 2", "Member 3"],
    Powertrain: ["Member 1", "Member 2", "Member 3"],
    Electronics: ["Member 1", "Member 2", "Member 3"],
};

const managerialTeams = {
    Doc: ["Member 1", "Member 2"],
    Finance: ["Member 1", "Member 2"],
    Media: ["Member 1", "Member 2"],
    Log: ["Member 1", "Member 2"],
    Mgm: ["Member 1", "Member 2"],
    BPP: ["Member 1", "Member 2"],
};

const rolesAndResponsibilities = [
    "Leadership and strategic decision making",
    "Technical development and testing execution",
    "Operations, finance, media, and documentation support",
];

const Page = () => {
    const [openTechnical, setOpenTechnical] = useState(null);
    const [openManagerial, setOpenManagerial] = useState(null);

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <Navbar />

            <main>
                {/* ====== Improved Hero Section ====== */}
                <section className="relative w-full h-screen overflow-hidden">
                    {/* Background wrapper with overflow-hidden to clip the zoom effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 scale-105 animate-slow-zoom">
                            <Image
                                src="/china4.jpg" 
                                alt="Team Hero Banner"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Multi-layered Overlay */}
                    <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black"></div>
                    
                    {/* Hero Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
                        <div className="space-y-2">
                            <h1 className="text-6xl md:text-[8rem] font-sans font-black uppercase italic tracking-tighter leading-none">
                                OUR <span className="text-red-600">Team</span>
                            </h1>
                        </div>
                        
                        <p className="mt-6 text-sm md:text-xl font-light uppercase tracking-[0.3em] max-w-2xl text-zinc-300">
                            The visionaries and engineers <br /> 
                            <span className="font-bold text-white">Behind the machine.</span>
                        </p>

                        {/* Animated Scroll Indicator */}
                        <div className="absolute bottom-12 flex flex-col items-center gap-4">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Scroll to Explore</span>
                            <div className="w-px h-12 bg-linear-to-b from-red-600 to-transparent"></div>
                        </div>
                    </div>

                </section>

                {/* ====== Team Members Section ====== */}
                <section className="relative z-10 bg-black w-full overflow-hidden">
                    <TeamMembers />
                </section>

                {/* ====== Team Structure Doc Section ====== */}
                <section className="relative py-16 md:py-24 bg-linear-to-b from-[#f8f8f8] via-[#ececec] to-[#e6e6e6] text-black overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-40 pointer-events-none"
                        style={{
                            backgroundImage: "linear-gradient(#11111110 1px, transparent 1px), linear-gradient(90deg, #11111110 1px, transparent 1px)",
                            backgroundSize: "36px 36px",
                        }}
                    />

                    <div className="relative max-w-6xl mx-auto px-6 md:px-8">
                        <div className="rounded-3xl border border-black/10 bg-white/80 backdrop-blur-sm shadow-[0_24px_60px_rgba(0,0,0,0.12)] p-6 md:p-10">
                            <div className="mb-10 md:mb-12">
                                <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-red-600 font-bold mb-3">Organization Blueprint</p>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tight">4. Teams</h2>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8">
                                <div className="rounded-2xl border border-black/10 bg-white p-5 md:p-7">
                                    <h3 className="text-2xl md:text-3xl font-black mb-4">a. Team Structure</h3>
                                    <ul className="space-y-2 text-lg md:text-xl text-zinc-800">
                                        <li>• Commandant</li>
                                        <li>• HoD</li>
                                        <li>• Faculty advisor</li>
                                        <li>• Team lead / captain</li>
                                    </ul>
                                </div>

                                <div className="rounded-2xl border border-black/10 bg-[#111] text-white p-5 md:p-7">
                                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-400 mb-3">Core Note</p>
                                    <p className="text-lg md:text-xl leading-relaxed text-zinc-200">
                                        Each team tab expands on click to show members and responsibilities. This keeps the page clean while still showing full structure when needed.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-8 md:mb-10 rounded-2xl border border-black/10 bg-white p-5 md:p-7">
                                <h3 className="text-2xl md:text-3xl font-black mb-4">B. Technical Team</h3>
                                <p className="text-zinc-600 mb-5">Sub-teams</p>

                                <div className="flex flex-wrap gap-3 mb-5">
                                    {Object.keys(technicalTeams).map((team) => {
                                        const isOpen = openTechnical === team;

                                        return (
                                            <button
                                                key={team}
                                                onClick={() => setOpenTechnical(isOpen ? null : team)}
                                                className={`px-4 py-2 rounded-full border text-sm md:text-base font-semibold transition-all ${
                                                    isOpen
                                                        ? "bg-red-600 text-white border-red-600"
                                                        : "bg-white text-zinc-800 border-zinc-300 hover:border-red-600 hover:text-red-600"
                                                }`}
                                            >
                                                {team}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="rounded-xl border border-zinc-200 bg-zinc-50 min-h-28 p-4 md:p-5">
                                    {openTechnical ? (
                                        <ul className="space-y-2 text-zinc-800">
                                            {technicalTeams[openTechnical].map((member) => (
                                                <li key={member}>• {member}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-zinc-500">Select a sub-team to view members.</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-8 md:mb-10 rounded-2xl border border-black/10 bg-white p-5 md:p-7">
                                <h3 className="text-2xl md:text-3xl font-black mb-4">c. Managerial Team</h3>

                                <div className="flex flex-wrap gap-3 mb-5">
                                    {Object.keys(managerialTeams).map((team) => {
                                        const isOpen = openManagerial === team;

                                        return (
                                            <button
                                                key={team}
                                                onClick={() => setOpenManagerial(isOpen ? null : team)}
                                                className={`px-4 py-2 rounded-full border text-sm md:text-base font-semibold transition-all ${
                                                    isOpen
                                                        ? "bg-black text-white border-black"
                                                        : "bg-white text-zinc-800 border-zinc-300 hover:border-black"
                                                }`}
                                            >
                                                {team}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="rounded-xl border border-zinc-200 bg-zinc-50 min-h-28 p-4 md:p-5">
                                    {openManagerial ? (
                                        <ul className="space-y-2 text-zinc-800">
                                            {managerialTeams[openManagerial].map((member) => (
                                                <li key={member}>• {member}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-zinc-500">Select a managerial unit to view members.</p>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-black/10 bg-white p-5 md:p-7">
                                <h4 className="text-xl md:text-2xl font-black mb-4">Roles & responsibilities</h4>
                                <ul className="space-y-2 text-zinc-800">
                                    {rolesAndResponsibilities.map((item) => (
                                        <li key={item}>• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx global>{`
                html, body {
                    max-width: 100%;
                    overflow-x: hidden;
                }
                @keyframes slow-zoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s infinite alternate linear;
                }
            `}</style>
        </div>
    );
};

export default Page;