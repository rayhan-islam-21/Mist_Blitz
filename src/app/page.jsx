import Navbar from "@/components/navbar/Navbar";
import AboutPreview from "@/components/sections/AboutPreview";
import Hero from "@/components/sections/Hero";
import PartnersScroll from "@/components/sections/PartnersScroll";
import Footer from "@/components/footer/Footer";
import JoinCTA from "@/components/sections/JoinCTA";
import JoinTeamSection from "@/components/sections/JoinTeam";
import ProtectedRoute from "@/components/protected/Protected";

export default function Home() {
  return (
    <>

        <Navbar />
        <Hero />
        <AboutPreview />
        <PartnersScroll />
        <JoinCTA />
        <JoinTeamSection />
        <Footer />
    </>
  );
}
