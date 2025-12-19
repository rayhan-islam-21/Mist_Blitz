"use client";

import LogoLoop from "../LogoLoop";
import { Highlighter } from "../ui/highlighter";
import { RetroGrid } from "../ui/retro-grid";

const sponsors = [
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
  alt: "Sponsor logo",
  href: s.website,
}));

export default function PartnersScroll() {
  return (
    <section className="relative bg-white border-y-8 border-black overflow-hidden">
      <RetroGrid />

      <div className="relative py-10">
        <h2 className="text-center tracking-widest text-4xl md:text-5xl font-comic font-extrabold mb-14 text-yellow-400 drop-shadow-[4px_4px_0_#000]">
          <Highlighter action="underline" color="#E4013A">
            OUR
          </Highlighter>
          {"  "}
          {" "}
          <Highlighter action="highlight" color="#E4013A">
            PARTNERS
          </Highlighter>
        </h2>

        {/* Bigger Logo Loop */}
        <div className="relative  items-center flex justify-center  overflow-hidden">
          <LogoLoop
            logos={sponsorLogos}
            speed={110}
            direction="left"
            logoHeight={250}
            gap={20}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Our partners"
          />
        </div>
      </div>
    </section>
  );
}
