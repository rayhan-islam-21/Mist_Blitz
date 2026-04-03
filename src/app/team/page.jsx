"use client";
import React, { useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';

const leadership = ["Commandant", "HoD", "Faculty Advisor", "Team Lead / Captain"];

const technicalTeams = [
    {
        name: "Chassis",
        image: "/dept/dept2.jpg",
        members: ["Structural Design Lead", "Frame Fabrication Engineer", "Material Analyst"],
        responsibilities: [
            "Spaceframe design and packaging",
            "Torsional rigidity and safety compliance",
            "Fabrication planning and quality checks",
        ],
    },
    {
        name: "Suspension",
        image: "/dept/dept1.jpg",
        members: ["Dynamics Lead", "Kinematics Engineer", "Test and Validation Engineer"],
        responsibilities: [
            "Suspension geometry and kinematics",
            "Steering integration and braking balance",
            "Track tuning and setup validation",
        ],
    },
    {
        name: "Powertrain",
        image: "/dept/dept5.jpg",
        members: ["Engine Lead", "Cooling Systems Engineer", "Drivetrain Specialist"],
        responsibilities: [
            "Engine mapping and performance optimization",
            "Cooling and thermal management",
            "Transmission and torque delivery setup",
        ],
    },
    {
        name: "Electronics",
        image: "/dept/dept6.jpg",
        members: ["DAQ Lead", "Wiring Harness Engineer", "Embedded Systems Engineer"],
        responsibilities: [
            "Sensor integration and live telemetry",
            "Power distribution and harness design",
            "Data logging and diagnostics systems",
        ],
    },
];

const managerialTeams = [
    {
        name: "Documentation",
        image: "/dept/dept2.jpg",
        members: ["Report Lead", "Design Report Writer", "Compliance Reviewer"],
        responsibilities: [
            "Technical documentation and submission planning",
            "Design and cost report compilation",
            "Version tracking and final proofreading",
        ],
    },
    {
        name: "Finance",
        image: "/dept/dept7.jpg",
        members: ["Budget Lead", "Procurement Coordinator", "Sponsor Accounts Officer"],
        responsibilities: [
            "Budget forecasting and expense control",
            "Purchase and vendor coordination",
            "Financial records and transparency tracking",
        ],
    },
    {
        name: "Media",
        image: "/dept/dept6.jpg",
        members: ["Creative Lead", "Content Creator", "Visual Editor"],
        responsibilities: [
            "Brand communication and storytelling",
            "Photo and video coverage",
            "Campaigns and social outreach",
        ],
    },
    {
        name: "Logistics",
        image: "/dept/dept5.jpg",
        members: ["Operations Lead", "Transport Coordinator", "Inventory Officer"],
        responsibilities: [
            "Event travel and shipment planning",
            "Inventory flow and resource movement",
            "On-ground operations support",
        ],
    },
    {
        name: "Management",
        image: "/dept/dept1.jpg",
        members: ["Program Manager", "Timeline Coordinator", "Inter-Team Liaison"],
        responsibilities: [
            "Milestone planning and execution tracking",
            "Cross-team communication and risk management",
            "Resource allocation and team coordination",
        ],
    },
    {
        name: "Business Plan Presentation",
        image: "/dept/dept7.jpg",
        members: ["Pitch Lead", "Market Research Analyst", "Presentation Strategist"],
        responsibilities: [
            "Business model development",
            "Market validation and value proposition",
            "Pitch deck and Q&A preparation",
        ],
    },
];

const TeamAccordion = ({ title, teams, activeTeam, setActiveTeam }) => (
    <section className="mb-14">
        <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-3">
            {title}
        </h3>
        <p className="text-sm md:text-base text-zinc-400 mb-6 uppercase tracking-wider">
            Click each tab to expand with members and responsibilities
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => {
                const isOpen = activeTeam === team.name;

                return (
                    <div
                        key={team.name}
                        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                            isOpen ? "border-red-600 bg-red-600/10" : "border-white/10 bg-white/2"
                        }`}
                    >
                        <button
                            onClick={() => setActiveTeam(isOpen ? null : team.name)}
                            className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-white/20 shrink-0">
                                    <Image
                                        src={team.image}
                                        alt={`${team.name} team`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <span className="font-black uppercase italic text-base md:text-lg truncate">{team.name}</span>
                            </div>
                            <span className="text-xl leading-none">{isOpen ? "-" : "+"}</span>
                        </button>

                        {isOpen && (
                            <div className="px-4 md:px-5 pb-5 border-t border-white/10">
                                <div className="pt-4">
                                    <div className="relative h-36 w-full rounded-xl overflow-hidden border border-white/10 mb-4">
                                        <Image
                                            src={team.image}
                                            alt={`${team.name} department`}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                    </div>

                                    <p className="text-[11px] tracking-widest uppercase text-zinc-400 mb-2">Members</p>
                                    <ul className="list-disc pl-5 text-sm text-zinc-200 space-y-1 mb-5">
                                        {team.members.map((member) => (
                                            <li key={member}>{member}</li>
                                        ))}
                                    </ul>

                                    <p className="text-[11px] tracking-widest uppercase text-zinc-400 mb-2">Roles and Responsibilities</p>
                                    <ul className="list-disc pl-5 text-sm text-zinc-200 space-y-1">
                                        {team.responsibilities.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    </section>
);

const Page = () => {
    const [activeTechnical, setActiveTechnical] = useState(technicalTeams[0].name);
    const [activeManagerial, setActiveManagerial] = useState(managerialTeams[0].name);

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

                {/* ====== Team Structure Section ====== */}
                <section className="relative z-10 bg-black w-full overflow-hidden py-16 md:py-24 border-t border-white/10">
                    <div className="max-w-6xl mx-auto px-4 md:px-6">
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tight mb-10">
                            4. <span className="text-red-600">Teams</span>
                        </h2>

                        <div className="mb-14 rounded-2xl border border-white/10 bg-white/2 p-6 md:p-8">
                            <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tight mb-5">
                                A. Team Structure
                            </h3>
                            <ul className="list-disc pl-6 text-lg text-zinc-200 space-y-2">
                                {leadership.map((role) => (
                                    <li key={role}>{role}</li>
                                ))}
                            </ul>
                        </div>

                        <TeamAccordion
                            title="B. Technical Team"
                            teams={technicalTeams}
                            activeTeam={activeTechnical}
                            setActiveTeam={setActiveTechnical}
                        />

                        <TeamAccordion
                            title="C. Managerial Team"
                            teams={managerialTeams}
                            activeTeam={activeManagerial}
                            setActiveTeam={setActiveManagerial}
                        />
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