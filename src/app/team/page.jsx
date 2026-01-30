import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import TeamMembers from '@/components/about/TeamMembers';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';

const Page = () => {
    return (
        <div className="min-h-screen text-slate-900">
            <Navbar />

            <main>
                {/* ====== Hero Section ====== */}
                <section className="relative w-full h-[500px] md:h-[750px]">
                    <Image
                        src="/china4.jpg" // <-- your hero image here
                        alt="Team Hero Banner"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>
                    {/* Hero Content (Optional) */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tight">
                            Meet <span className="text-red-600">Our Team</span>
                        </h1>
                        <p className="mt-4 text-lg md:text-2xl font-medium">
                            The Crew behind our success
                        </p>
                    </div>
                </section>

                {/* ====== Team Members Section ====== */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <TeamMembers />
                    </div>
                </section>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Page;
