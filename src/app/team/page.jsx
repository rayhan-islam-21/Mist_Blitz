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
                <section className="relative w-full h-[58vh] md:h-[64vh] overflow-hidden flex flex-col justify-end">
                    <div className="absolute inset-0">
                        <Image
                            src="/china4.jpg"
                            alt="Team Hero"
                            fill
                            className="object-cover opacity-90"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-linear-to-r from-black/35 via-transparent to-transparent" />

                    <div className="relative z-10 px-6 md:px-16 pb-10 md:pb-12">
                        <div className="max-w-5xl">
                        <h1 className="text-[12vw] md:text-[9vw] font-black italic uppercase leading-none tracking-tighter text-white">
                            Our <span className="text-red-600">Team</span>
                        </h1>
                        <p className="text-white/65 text-base md:text-lg mt-4 max-w-2xl">
                            The engineers and operators behind every bolt, weld, and lap.
                        </p>
                        </div>
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