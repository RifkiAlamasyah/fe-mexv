// components/Layout.js
import React from 'react';
import Header from './molecules/Header';
import Navbar from './molecules/Navbar';

const Template = ({ children }) => {
    return (
        <div>
            <Navbar/>
            <main>{children}</main>
        </div>
    );
};

export default Template;
