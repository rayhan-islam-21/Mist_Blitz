"use client";
import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import TeamMembers from '@/components/about/TeamMembers';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';

const Page = () => {
    return (
        <div className="min-h-screen bg-black text-white ">
            <Navbar />

            <main>
                {/* ====== Improved Hero Section ====== */}
                <section className="relative w-full h-screen overflow-hidden">
                    {/* Background with subtle Zoom effect */}
                    <div className="absolute inset-0 scale-105 animate-slow-zoom">
                        <Image
                            src="/china4.jpg" 
                            alt="Team Hero Banner"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Multi-layered Overlay for better text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
                    
                    {/* Hero Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
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
                            <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
                        </div>
                    </div>

                    {/* Decorative Corner Accents */}
                    <div className="absolute bottom-10 left-10 hidden md:block">
                        <p className="text-[10px] font-mono text-zinc-600 uppercase [writing-mode:vertical-lr] tracking-[0.5em]">
                            MIST_AUTO_RACING
                        </p>
                    </div>
                </section>

                {/* ====== Team Members Section ====== */}
                {/* Removed extra padding/container here because TeamMembers handles its own max-width */}
                <section className="relative z-10 bg-black">
                    <TeamMembers />
                </section>
            </main>

            <Footer />

            {/* Global Animation Styles */}
            <style jsx global>{`
                @keyframes slow-zoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s infinite alternate linear;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Page;