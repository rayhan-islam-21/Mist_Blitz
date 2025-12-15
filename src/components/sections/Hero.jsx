"use client";

import Link from "next/link";
import Button from "../ui/retro-btn";

const Hero = () => {
  return (
    <div className="relative -z-40 h-screen w-full overflow-hidden flex flex-col justify-center items-center text-center">
      Background Video
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
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
      {/* Hero Content */}
      <div className="relative z-20 flex flex-col justify-center items-center">
        <h1 className="text-6xl md:text-8xl font-(--font-comic) bg-clip-text ">
          MIST BLITZ
        </h1>

        <p className="mt-6 text-2xl md:text-3xl font-(--font-comic)text-yellow-200 drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]">
          Formula Student Team – Engineering Innovation & Speed
        </p>

        {/* Join Button */}
        <Button className="p-12 text-3xl">
          Join Us
        </Button>
        
      </div>
    </div>
  );
};

export default Hero;
