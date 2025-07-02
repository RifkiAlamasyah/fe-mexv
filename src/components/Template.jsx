// components/Layout.js
import React from 'react';
import Header from './molecules/Header';
import Navbar from './molecules/Navbar';
import Footer from './molecules/Footer';

const Template = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main className='pt-[50px]'>{children}</main>
            <Footer />
        </div>
    );
};

export default Template;
