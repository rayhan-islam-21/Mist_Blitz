import Navbar from "@/components/navbar/Navbar";
import AboutPreview from "@/components/sections/AboutPreview";
import Hero from "@/components/sections/Hero";
import PartnersScroll from "@/components/sections/PartnersScroll";
import Footer from "@/components/footer/Footer";
import JoinCTA from "@/components/sections/JoinCTA";
import GalleryPreview from "@/components/sections/GalleryPreview";
import JoinTeamSection from "@/components/sections/JoinTeam";

export default function Home() {
  return (
    <>
     <Navbar/>
     <Hero/>
     <AboutPreview/>
     <PartnersScroll/>
     <JoinCTA/>
     <GalleryPreview/>
     <JoinTeamSection/>
     <Footer/>
    </>
  );
}
