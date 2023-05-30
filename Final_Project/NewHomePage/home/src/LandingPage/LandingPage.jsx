import React from "react";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import AboutUs from "./AboutUs/AboutUs";
import Contributors from "./Contributors/Contributors";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <AboutUs />
      <Contributors />
    </div>
  );
};

export default LandingPage;
