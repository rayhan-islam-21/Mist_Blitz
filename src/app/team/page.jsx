"use client";
import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import TeamMembers from '@/components/about/TeamMembers';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';

const Page = () => {
    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <Navbar />

            <main>
                {/* Hero */}
                <section className="relative w-full h-[70vh] overflow-hidden flex flex-col justify-end">
                    <div className="absolute inset-0">
                        <Image
                            src="/china4.jpg"
                            alt="Team Hero"
                            fill
                            className="object-cover opacity-75"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />

                    <div className="relative z-10 px-6 md:px-16 pb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-px bg-red-600" />
                            <span className="font-mono text-red-500 text-xs uppercase tracking-[0.4em]">MIST Blitz · The Crew</span>
                        </div>
                        <h1 className="text-[12vw] md:text-[9vw] font-black italic uppercase leading-none tracking-tighter text-white">
                            Our <span className="text-red-600">Team</span>
                        </h1>
                        <p className="text-white/40 text-base md:text-lg mt-4 max-w-lg">
                            The engineers and operators behind every bolt, weld, and lap.
                        </p>
                    </div>
                </section>

                <section className="relative z-10 bg-black w-full">
                    <TeamMembers />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Page;