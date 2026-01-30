import Navbar from '@/components/navbar/Navbar';
import React from 'react';
import PartnersPage from './partnerdetails';
import Footer from '@/components/footer/Footer';

const page = () => {
    return (
        <>
            <Navbar/>
            <PartnersPage/>
            <Footer/>
        </>
    );
};

export default page;