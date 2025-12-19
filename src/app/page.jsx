import Navbar from "@/components/navbar/Navbar";
import AboutPreview from "@/components/sections/AboutPreview";
import Hero from "@/components/sections/Hero";
import PartnersScroll from "@/components/sections/PartnersScroll";
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { Pointer } from "@/components/ui/pointer"
import Footer from "@/components/footer/Footer";
import JoinCTA from "@/components/sections/JoinCTA";
import GalleryPreview from "@/components/sections/GalleryPreview";

export default function Home() {
  return (
    <>
      {/* <SmoothCursor/> */}
     <Navbar/>
     <Hero/>
     <AboutPreview/>
     <PartnersScroll/>
     <JoinCTA/>
     <GalleryPreview/>
     <Footer/>
    </>
  );
}
