import React from 'react';
import Navbar from '../layout/Navbar/Navbar';
import Footer from '../layout/Footer/Footer';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const Root = () => {
    return (
        <div>
         
    <Navbar/>
            <Outlet/>
            <Footer/>
            <ToastContainer></ToastContainer>
        
        </div>
    );
};

export default Root;