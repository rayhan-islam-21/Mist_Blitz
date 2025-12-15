"use client";

import React from "react";

const Hero = () => {
  return (
    <div className="relative h-screen -z-50 w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
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
        className="absolute top-0 left-0 w-full h-full z-0" 
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      ></div>

      {/* Main Content (Text and Button) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Constrain content width for large screens */}
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white drop-shadow-xl tracking-wide">
            MIST BLIT<span className="text-(--blitz-red)">Z</span>
          </h1>
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl text-white drop-shadow-lg max-w-xl mx-auto">
            Racing Towards Innovation
          </p>

          <button
            aria-label="Contact Mist Blitz"
            className={`
              mt-8 px-10 py-4 
              text-lg font-extrabold 
              text-black 
              bg-(--blitz-yellow)
              border-2 border-black
              rounded-none
              shadow-[6px_6px_0_0_black]
              hover:shadow-[4px_4px_0_0_black]
              hover:bg-yellow-300
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