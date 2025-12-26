"use client";

import LogoLoop from "../LogoLoop";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Cpu, Box } from "lucide-react";
import { useRef } from "react";

const sponsors = [
  { logo: "/sponsers/sp1.png", website: "https://sponsor1.com" },
  { logo: "/sponsers/sp2.png", website: "https://sponsor2.com" },
  { logo: "/sponsers/sp3.png", website: "https://sponsor3.com" },
  { logo: "/sponsers/sp4.png", website: "https://sponsor4.com" },
  { logo: "/sponsers/sp5.png", website: "https://sponsor5.com" },
  { logo: "/sponsers/sp6.png", website: "https://sponsor6.com" },
  { logo: "/sponsers/sp7.png", website: "https://sponsor7.com" },
  { logo: "/sponsers/sp8.png", website: "https://sponsor8.com" },
  { logo: "/sponsers/sp1.png", website: "https://sponsor1.com" },
  { logo: "/sponsers/sp2.png", website: "https://sponsor2.com" },
  { logo: "/sponsers/sp3.png", website: "https://sponsor3.com" },
  { logo: "/sponsers/sp4.png", website: "https://sponsor4.com" },
  { logo: "/sponsers/sp5.png", website: "https://sponsor5.com" },
  { logo: "/sponsers/sp6.png", website: "https://sponsor6.com" },
  { logo: "/sponsers/sp7.png", website: "https://sponsor7.com" },
  { logo: "/sponsers/sp8.png", website: "https://sponsor8.com" },
];

const sponsorLogos = sponsors.map((s) => ({
  src: s.logo,
  alt: "Strategic Partner",
  href: s.website,
}));

export default function PartnersScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xMove = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} className="relative selection:text-white selection:bg-red-600 bg-[#050505] overflow-hidden py-32 border-t border-white/5">
      
      {/* 1. MASSIVE BACKGROUND TEXT (PARALLAX) */}
      <motion.div 
        style={{ x: xMove }}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap text-[25vw] font-black text-white/2 italic select-none pointer-events-none uppercase tracking-tighter"
      >
        Strategic Alliances // Tech Partners //
      </motion.div>

      {/* 2. TECHNICAL GRID & HUD */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="max-w-[1800px] mx-auto px-6 relative z-10">
        
        {/* 3. HEADING: MAXIMUM IMPACT */}
        <div className="flex flex-col gap-2 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Cpu size={14} className="text-red-600" />
            <span className="font-mono text-[10px] text-red-600 font-bold uppercase tracking-[0.6em]">Supporters_Infrastructure</span>
          </motion.div>
          
          <h2 className="text-8xl font-sans md:text-[13rem] font-black uppercase italic leading-[0.7] tracking-[ -0.05em] text-white">
            OUR <br /> 
            <span className="text-transparent stroke-text">PARTNERS.</span>
          </h2>
        </div>

        {/* 4. THE MASSIVE LOGO SCANNER */}
        <div className="relative">
          {/* HUD Brackets for Logos */}
          <div className="absolute -top-10 left-0 flex items-center gap-4">
             <Box size={16} className="text-gray-700" />
             <div className="h-px w-32 bg-white/10" />
             <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest italic">Scanning_Entity_Assets...</span>
          </div>

          <div className="relative py-24 border-y border-white/5 bg-white/[0.01] backdrop-blur-3xl group">
            {/* Edge Glows */}
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
            
            <div className="relative items-center flex justify-center overflow-hidden opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out">
              <LogoLoop
                logos={sponsorLogos}
                speed={60} 
                direction="left"
                logoHeight={280} // DRAMATICALLY INCREASED SIZE
                gap={40}
                hoverSpeed={0}
                scaleOnHover
                fadeOut={false} // Custom fades used above for better control
                ariaLabel="Our partners"
              />
            </div>
          </div>

          {/* Bottom HUD Data */}
          <div className="absolute -bottom-10 right-0 flex items-center gap-4 text-right">
             <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest italic">Display_Mode: 4K_Render // FSC_Global</span>
             <div className="h-px w-32 bg-white/10" />
             <Activity size={16} className="text-red-900" />
          </div>
        </div>

        {/* 5. CALL TO ACTION TEXT */}
        <div className="mt-32 max-w-2xl border-l-4 border-red-600 pl-8">
           <p className="text-2xl md:text-4xl font-black italic uppercase leading-none text-white mb-6">
             The fuel behind <span className="text-red-600">Furiosa 1.0</span>
           </p>
           <p className="text-gray-500 font-medium text-lg leading-relaxed">
             Our partners provide the high-precision hardware and strategic resources required to compete at the edge of physics. 
             They don't just sponsor; they engineer the future with us.
           </p>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px white;
          color: transparent;
        }
      `}</style>
    </section>
  );
}