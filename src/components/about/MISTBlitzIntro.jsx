import React from 'react';
import Image from 'next/image';
import { Highlighter } from '../ui/highlighter';

const MISTBlitzIntro = () => {
  return (
    <section className="relative py-12 bg-black overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/5 blur-[120px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Side with Decorative Frame */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute  bg-linear-to-r from-red-600 to-red-500 rounded-2xl  opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-gray-800 rounded-2xl overflow-hidden border border-white/60">
              <Image
                src="/mist.jpeg" 
                alt="Furiosa 1.0 Race Car"
                width={300}
                height={100}
                className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-105" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <span className="text-red-400 font-mono text-sm tracking-widest uppercase">Project Identity</span>
                <h3 className="text-white text-xl font-bold italic">FURIOSA 1.0</h3>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 space-y-6 text-left">
            <div className="inline-block px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest">
              Establishment 2024
            </div>

            <h2 className="text-4xl font-sans italic md:text-6xl  font-black text-white leading-[0.85]">
              THE GENESIS OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
                MIST BLITZ
              </span>
            </h2>
            
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>
                MIST BLITZ is the official Formula Student team of the {""}
                <span className="text-gray-200"><Highlighter action='highlight' color='#17cf48'>{" "}Military Institute of Science and Technology (MIST)</Highlighter> </span>. 
                Born out of a passion for precision engineering and speed, we are a collective of dreamers and doers.
              </p>
              <p>
                Founded in <span className="text-red-500 font-mono">April 2024</span>, our team embarked on a mission 
                to bridge the gap between classroom theory and the roar of the racetrack. Our debut project, 
                <span className=" text-white"> Furiosa 1.0</span>, serves as the cornerstone of our engineering legacy, 
                showcasing our ability to design, simulate, and manufacture a high-performance formula-style race car.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-4">
               <div className="h-0.5 w-12 bg-red-600"></div>
               <span className="text-sm text-gray-500 uppercase tracking-[0.2em] font-medium">Innovate • Fabricate • Race</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MISTBlitzIntro;