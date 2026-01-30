import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import TeamMembers from '@/components/about/TeamMembers';
import Footer from '@/components/footer/Footer';

const Page = () => {
    return (
        <div className="min-h-screen  text-slate-900">
            <Navbar />

            <main>
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <TeamMembers />
                    </div>
                </section>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default Page;