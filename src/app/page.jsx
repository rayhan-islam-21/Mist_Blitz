import Navbar from "@/components/navbar/Navbar";
import AboutPreview from "@/components/sections/AboutPreview";
import Hero from "@/components/sections/Hero";
import PartnersScroll from "@/components/sections/PartnersScroll";
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { Pointer } from "@/components/ui/pointer"

export default function Home() {
  return (
    <>
      {/* <SmoothCursor/> */}
      <Pointer/>
     <Navbar/>
     <Hero/>
     <AboutPreview/>
     <PartnersScroll/>
    </>
  );
}
