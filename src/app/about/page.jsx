// pages/about.js
"use client";
import WhatWeDo from "@/components/about/WhatWeDo";
import MISTBlitzIntro from "@/components/about/MISTBlitzIntro";
import TeamMembers from "@/components/about/TeamMembers";
import Achievements from "@/components/about/Achievements";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Link from "next/link";

const About = () => {
  return (
    <div className="bg-black min-h-screen selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center animate-slow-zoom justify-center overflow-hidden">
        <Image
          src="/team.jpg"
          fill
          priority
          alt="Mist Blitz Team"
          className="object-cover object-center opacity-50 scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-[#000000]" />
        <div className="relative z-20 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-sans italic font-black text-white tracking-normal uppercase">
            About <span className="text-red-600">blitz</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mt-6 font-light">
            We are a group of passionate engineers from MIST, dedicated to
            pushing the boundaries of automotive excellence through the Formula
            Student challenge.
          </p>
        </div>
      </section>

      <main className="bg-black relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

          {/* a. Our Team */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <h3 className="text-red-500 font-sans italic font-bold uppercase tracking-widest text-sm mb-2">
                Our Team
              </h3>
              <h2 className="text-3xl md:text-5xl uppercase text-white font-sans font-black italic mb-6">
                Building More Than <span className="text-red-600">Just Race Cars.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Founded at the Military Institute of Science and Technology,
                MIST Blitz represents the pinnacle of student engineering.
                Our journey isn&apos;t just about the finish line; it&apos;s about the
                thousands of hours spent in the lab, the precision of our CAD
                designs, and the grit required to build a high-performance
                machine from scratch.
              </p>

              {/* Vision & Mission */}
              <div className="space-y-6 mb-8">
                <div className="border-l-2 border-red-600 pl-4">
                  <h4 className="text-white font-black uppercase text-sm tracking-wider mb-1">Vision</h4>
                  <p className="text-gray-400 text-sm">To become Bangladesh&apos;s leading Formula Student team, recognized globally for engineering excellence and innovation.</p>
                </div>
                <div className="border-l-2 border-white/20 pl-4">
                  <h4 className="text-white font-black uppercase text-sm tracking-wider mb-1">Mission</h4>
                  <p className="text-gray-400 text-sm">To develop world-class engineers through hands-on, competitive, real-world experience in vehicle design and manufacturing.</p>
                </div>
              </div>

              <div className="flex gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-3xl font-bold text-red-600">50+</p>
                  <p className="text-gray-500 text-sm">Active Members</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600">03</p>
                  <p className="text-gray-500 text-sm">Prototypes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-red-600">100%</p>
                  <p className="text-gray-500 text-sm">In-house Design</p>
                </div>
              </div>
            </div>
            <div className="relative h-100 rounded-2xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-blue-600/10 z-10"></div>
              <Image src="/car2.jpg" fill className="object-cover" alt="Workshop" />
            </div>
          </div>

          {/* Section Components */}
          <div className="space-y-4">
            <MISTBlitzIntro />

            <div className="py-16 border-y border-white/5">
              <WhatWeDo />
            </div>

            {/* b. What We Do — already covered by WhatWeDo component */}

            {/* c. About Formula Student */}
            <div className="py-16">
              <h3 className="text-red-500 font-sans italic font-bold uppercase tracking-widest text-sm mb-2">
                About Formula Student
              </h3>
              <h2 className="text-3xl md:text-4xl uppercase text-white font-sans font-black italic mb-8">
                What is Formula Student?
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Formula Student (also known as Formula SAE) is the world&apos;s largest and most established engineering
                    design competition for university students. Teams design, build, and race a small formula-style race car.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    The competition is not just about speed — judges evaluate engineering design, cost analysis, business
                    planning, and dynamic performance. It prepares students for real-world engineering careers.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-black uppercase text-sm tracking-wider mb-4">Competition Structure</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-red-500 text-xs uppercase tracking-widest font-bold mb-1">Static Events</p>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li>• Engineering Design Event</li>
                        <li>• Cost & Manufacturing Analysis</li>
                        <li>• Business Plan Presentation</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-red-500 text-xs uppercase tracking-widest font-bold mb-1">Dynamic Events</p>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li>• Acceleration — 75m sprint</li>
                        <li>• Skid Pad — figure-8 handling</li>
                        <li>• Autocross — single-lap performance</li>
                        <li>• Endurance — 22km reliability race</li>
                        <li>• Efficiency — fuel/energy scoring</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* d. Our University */}
            <div className="py-16 border-t border-white/5">
              <h3 className="text-red-500 font-sans italic font-bold uppercase tracking-widest text-sm mb-2">
                Our University
              </h3>
              <h2 className="text-3xl md:text-4xl uppercase text-white font-sans font-black italic mb-8">
                MIST — Military Institute of Science & Technology
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    The Military Institute of Science and Technology (MIST) is one of Bangladesh&apos;s leading engineering
                    universities, offering world-class facilities and a rigorous academic environment. MIST provides
                    the foundation for our team&apos;s technical capabilities.
                  </p>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Our team benefits from the support of the Mechanical and Electrical engineering departments,
                    access to workshops, CAD labs, and a community of driven engineering students.
                  </p>
                  <div className="flex gap-4 mt-6">
                    <Link
                      href="https://mist.ac.bd"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-500 font-black uppercase text-xs tracking-widest hover:text-red-400 transition-colors"
                    >
                      Visit MIST →
                    </Link>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-black uppercase text-sm tracking-wider mb-2">Departmental Support</h4>
                  {[
                    { dept: "Mechanical Engineering", support: "Fabrication facilities, design supervision, CNC access" },
                    { dept: "Electrical & Electronic Engineering", support: "Electronics labs, embedded systems mentorship" },
                    { dept: "Civil Engineering", support: "Structural analysis guidance" },
                  ].map((item, i) => (
                    <div key={i} className="border border-white/10 p-4">
                      <p className="text-white font-black uppercase text-xs tracking-wider mb-1">{item.dept}</p>
                      <p className="text-gray-500 text-sm">{item.support}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Achievements />
          </div>
        </div>
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

export default About;
