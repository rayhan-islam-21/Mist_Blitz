"use client";

import { RetroGrid } from "../ui/retro-grid";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center text-center">

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/blitz.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col justify-center items-center">
        <h1 className="text-6xl md:text-8xl font-[var(--font-comic)] text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-gradient-x drop-shadow-[0_0_10px_rgba(0,0,0,0.7)]">
          MIST BLITZ
        </h1>

        <p className="mt-6 text-2xl md:text-3xl font-[var(--font-comic)] text-yellow-200 drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]">
          Formula Student Team – Engineering Innovation & Speed
        </p>

        {/* Join Button */}
        <a
          href="/join"
          className="mt-8 px-8 py-3 rounded-full font-[var(--font-comic)] text-black bg-yellow-300 border-2 border-black relative overflow-hidden group drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]"
        >
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-yellow-400 to-red-500 transition-all duration-300 ease-out group-hover:w-full z-0 rounded"></span>
          <span className="relative z-10">Join Us</span>
        </a>
      </div>
    </div>
  );
};

export default Hero;
