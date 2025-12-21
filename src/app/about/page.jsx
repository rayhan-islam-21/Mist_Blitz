// pages/about.js
import WhatWeDo from "@/components/about/WhatWeDo";
import MISTBlitzIntro from "@/components/about/MISTBlitzIntro";
import TeamMembers from "@/components/about/TeamMembers";
import Achievements from "@/components/about/Achievements";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Highlighter } from "@/components/ui/highlighter";

const About = () => {
  return (
    <div className="bg-black min-h-screen selection:bg-blue-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-end justify-center overflow-hidden">
        <Image
          src="/team.jpg"
          fill
          priority
          alt="Mist Blitz Team"
          className="object-cover opacity-50 scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-black/80 z-10"></div>

        <div className="relative z-20 text-center  px-6">
          <h2 className="text-blue-500 font-mono tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in">
            Engineering the Future
          </h2>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-normal uppercase">
            About <span className="text-blue-600">blitz</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-6 font-light">
            We are a group of passionate engineers from MIST, dedicated to
            pushing the boundaries of automotive excellence through the Formula
            Student challenge.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <main className="bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          {/* Our Mission Grid */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <h3 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-2">
                Our Mission
              </h3>
              <h2 className="text-4xl font-bold text-white mb-6">
                Building More Than Just Race Cars.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Founded at the Military Institute of Science and Technology,
                **MIST Blitz** represents the pinnacle of student engineering.
                Our journey isn't just about the finish line; it’s about the
                thousands of hours spent in the lab, the precision of our CAD
                designs, and the grit required to build a high-performance
                machine from scratch.
              </p>
              <div className="flex gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-3xl font-bold text-white">40+</p>
                  <p className="text-gray-500 text-sm">Active Members</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">03</p>
                  <p className="text-gray-500 text-sm">Prototypes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">100%</p>
                  <p className="text-gray-500 text-sm">In-house Design</p>
                </div>
              </div>
            </div>
            <div className="relative h-100 rounded-2xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-blue-600/10 z-10"></div>
              <Image
                src="/car2.jpg"
                fill
                className="object-cover"
                alt="Workshop"
              />
            </div>
          </div>

          {/* Section Components */}
          <div className="space-y-4">
            <MISTBlitzIntro />

            <div className="py-16 border-y border-white/5">
              <WhatWeDo />
            </div>

            <Achievements />

            <div className="pt-8">
              <h2 className="text-center text-5xl font-bold text-white mb-16">
               <Highlighter> Meet The <span className="text-blue-600">Brains</span></Highlighter>
              </h2>
              <TeamMembers />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
