"use client";
import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import TeamMembers from '@/components/about/TeamMembers';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';

const Page = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
            <Navbar />

            <main>
                {/* Hero — same style as Our Journey */}
                <section className="relative w-full h-[70vh] overflow-hidden flex flex-col justify-end">
                    <Image
                        src="/china4.jpg"
                        alt="Team Hero"
                        fill
                        className="object-cover opacity-50 transition-all duration-700"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/80 via-transparent to-transparent" />

                    <div className="relative z-10 px-6 md:px-16 pb-12">
                        <h1 className="text-[12vw] md:text-[9vw] font-black italic uppercase leading-none tracking-tighter text-white">
                            Our <span className="text-red-600">Team</span>
                        </h1>
                        <p className="text-white/50 text-base md:text-lg mt-4 max-w-lg">
                            The engineers and operators behind every bolt, weld, and lap.
                        </p>
                    </div>
                </section>

                <section className="relative z-10 bg-[#0a0a0a] w-full">
                    <TeamMembers />
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Page;
