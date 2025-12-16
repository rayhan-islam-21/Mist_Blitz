"use client";

import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="relative -z-40 h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute -z-10 top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/blitz.mp4" type="video/mp4" />
        <p>
          The background video could not be loaded. Please ensure you have a
          modern browser.
        </p>
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>

      <div
        className="absolute top-0 left-0 w-full h-full" 
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      ></div>

      {/* Main Content (Text and Button) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Constrain content width for large screens */}
        <div className="max-w-5xl mx-auto">
          <Image 
          src="/hero.png"
          width={600}
          height={600}
          alt="hero iamge"
          className="w-full "
          />
          <p className="text-xl sm:text-2xl md:text-3xl text-white drop-shadow-lg  mx-auto tracking-wide">
            The Formula Student Team of Military Institute of Science and Technology, Bangladesh
          </p>

          <button
            aria-label="Contact Mist Blitz"
            className={`
              mt-8 px-10 py-4  
              w-52  
              text-lg font-extrabold 
              text-black 
              bg-(--blitz-yellow)
              border-2 border-black
              rounded-none
              shadow-[6px_6px_0_0_black]
              hover:shadow-[4px_4px_0_0_black]
              hover:bg-yellow-300
              hover:translate-x-1 hover:translate-y-1
              transition-all duration-150
              active:translate-x-2 active:translate-y-1 active:shadow-none
              z-50
              focus:outline-none 
              cursor-pointer  
            `}
            onClick={() => console.log("Contact Clicked")}
          >
            CONTACT US
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;