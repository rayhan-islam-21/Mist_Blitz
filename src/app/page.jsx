import Navbar from "@/components/navbar/Navbar";
import AboutPreview from "@/components/sections/AboutPreview";
import Hero from "@/components/sections/Hero";
import PartnersScroll from "@/components/sections/PartnersScroll";
import Footer from "@/components/footer/Footer";
import JoinTeamSection from "@/components/sections/JoinTeam";
import LatestUpdates from "@/components/sections/LatestUpdates";

export default function Home() {
  return (
    <>
        <Navbar />
        <Hero />
        <AboutPreview />
        <LatestUpdates />
        <PartnersScroll />
        <JoinTeamSection />
        <Footer />
    </>
  );
}
