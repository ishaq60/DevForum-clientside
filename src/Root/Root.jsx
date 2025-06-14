import React from "react";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import { Outlet, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Root = () => {
  const location = useLocation();
  const noheaderfooter =
    location.pathname.includes("/login") ||
    location.pathname.includes("/footer")||location.pathname.includes("/dashboard");
  return (
    <div>
   
      {
        noheaderfooter||<Navbar />
      }
      <Outlet />
      <Footer />
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Root;
