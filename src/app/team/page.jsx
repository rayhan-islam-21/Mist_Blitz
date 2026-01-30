"use client";
import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import TeamMembers from '@/components/about/TeamMembers';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';

const Page = () => {
    return (
        /* Added overflow-x-hidden to prevent horizontal scroll from animations */
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
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
                    
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
                            <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
                        </div>
                    </div>

                </section>

                {/* ====== Team Members Section ====== */}
                <section className="relative z-10 bg-black w-full overflow-hidden">
                    <TeamMembers />
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