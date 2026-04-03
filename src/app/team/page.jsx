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
                <section className="bg-[#efefef] text-black py-14 md:py-20">
                    <div className="max-w-4xl mx-auto px-6 md:px-8">
                        <h2 className="text-4xl md:text-5xl font-bold mb-10">4. Teams</h2>

                        <div className="mb-12">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">a. Team Structure</h3>
                            <ul className="list-disc pl-8 text-2xl leading-relaxed">
                                <li>Commandant</li>
                                <li>HoD</li>
                                <li>Faculty advisor</li>
                                <li>Team lead / captain</li>
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">B. Technical Team (Each team tab will be expanded with members on click)</h3>
                            <ul className="list-disc pl-8 text-2xl leading-relaxed mb-3">
                                <li>Sub-teams:</li>
                            </ul>

                            <div className="pl-10 mb-4 space-y-3">
                                {Object.keys(technicalTeams).map((team) => {
                                    const isOpen = openTechnical === team;

                                    return (
                                        <div key={team}>
                                            <button
                                                onClick={() => setOpenTechnical(isOpen ? null : team)}
                                                className="text-2xl underline-offset-4 hover:underline"
                                            >
                                                {team}
                                            </button>

                                            {isOpen && (
                                                <ul className="list-disc pl-8 text-xl mt-2">
                                                    {technicalTeams[team].map((member) => (
                                                        <li key={member}>{member}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <ul className="list-disc pl-8 text-2xl leading-relaxed">
                                <li>Roles and responsibilities</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold mb-4">c. Managerial Team (Same)</h3>

                            <div className="pl-6 mb-4 space-y-3">
                                {Object.keys(managerialTeams).map((team) => {
                                    const isOpen = openManagerial === team;

                                    return (
                                        <div key={team}>
                                            <button
                                                onClick={() => setOpenManagerial(isOpen ? null : team)}
                                                className="text-2xl underline-offset-4 hover:underline"
                                            >
                                                {team}
                                            </button>

                                            {isOpen && (
                                                <ul className="list-disc pl-8 text-xl mt-2">
                                                    {managerialTeams[team].map((member) => (
                                                        <li key={member}>{member}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <p className="text-2xl leading-relaxed">Roles & responsibilities</p>
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