import Navbar from '@/components/navbar/Navbar';
import React from 'react';
import Gallery from './images';
import Footer from '@/components/footer/Footer';

// Capitalized 'Page' fixes the Next.js Runtime Error
const Page = () => {
  return (
    <>
     <Navbar/>
     <Gallery/>
     <Footer/> 
    </>
  );
};

export default Page;