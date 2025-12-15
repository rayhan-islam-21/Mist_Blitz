import Navbar from "@/components/navbar/Navbar";
import AboutPreview from "@/components/sections/AboutPreview";
import Hero from "@/components/sections/Hero";
import PartnersScroll from "@/components/sections/PartnersScroll";

export default function Home() {
  return (
    <>
     <Navbar/>
     <Hero/>
     <AboutPreview/>
     <PartnersScroll/>
    </>
  );
}
