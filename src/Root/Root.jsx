import React from 'react';
import Navbar from '../layout/Navbar/Navbar';
import Footer from '../layout/Footer/Footer';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Root;