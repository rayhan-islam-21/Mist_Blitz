"use client";

import React from 'react';

const AboutPreview = () => {
    return (
        // The section retains the comic image background and overlay for consistency
        <section 
            id="about-us-preview" 
            className="h-screen shadow-inner bg-[url('/images/comic-dot-texture.png')] bg-repeat bg-fixed"
        >
            <div className="bg-yellow-200/90 py-10"> 
                
                <div className="container mx-auto px-4 max-w-5xl text-center">

                    {/* Section Title (Simplified for Preview) */}
                    <h2 className="text-6xl sm:text-7xl font-comic text-black mb-12 drop-shadow-[4px_4px_0_rgba(255,0,0,1)] inline-block transform -rotate-1">
                        MISSION BRIEFING
                    </h2>

                    {/* 1. Short Intro and Team Goals (The Core Content) */}
                    <div className="mb-12 border-8 border-black p-6 bg-white shadow-[12px_12px_0_0_rgba(0,0,0,0.8)] transform rotate-1">
                        
                        <h3 className="text-4xl font-comic text-red-700 mb-4 border-b-4 border-red-700 inline-block px-2">
                            MIST BLITZ: RACING BEYOND LIMITS!
                        </h3>
                        
                        <p className="mb-6 text-xl font-bold text-gray-800 italic leading-relaxed">
                            We are the premier Formula Student team from Bangladesh, designing, building, and racing our own formula-style car.
                            Our goal is simple: **To put Bangladeshi engineering excellence on the global motorsport map!**
                        </p>
                        
                        {/* A small, comic-style element for visual flair */}
                        <span className="text-3xl font-comic text-blue-600 drop-shadow-[2px_2px_0_yellow] inline-block mt-4">
                            [ INNOVATION + TEAMWORK = SPEED ]
                        </span>
                    </div>
                    
                    {/* 2. Read More Button (Call to Action) */}
                    <a 
                        href="/about-us" // Link to the full "About Us" page
                        aria-label="Read more about MIST BLITZ's mission and activities"
                        className={`
                            inline-flex items-center justify-center
                            mt-8 px-12 py-4 
                            text-xl font-extrabold 
                            text-black 
                            bg-yellow-400
                            border-4 border-black
                            rounded-none
                            shadow-[8px_8px_0_0_black]
                            hover:shadow-[4px_4px_0_0_black]
                            hover:bg-yellow-300
                            transition-all duration-150
                            active:translate-x-2 active:translate-y-2 active:shadow-none
                            focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-white
                            transform skew-y-1 hover:skew-y-0
                        `}
                    >
                        READ FULL MISSION
                        <span className="ml-3 text-2xl">⚡️</span>
                    </a>

                </div>
            </div> 
        </section>
    );
};

export default AboutPreview;