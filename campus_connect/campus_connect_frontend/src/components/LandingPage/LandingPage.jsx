import { React, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import AboutUs from "./AboutUs/AboutUs";
import Contributors from "./Contributors/Contributors";
import Services from "./Services/Services";

const LandingPage = ({ darkMode, setDarkMode }) => {
  return (
    <div>
      <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
      <Home darkMode={darkMode} />
      <AboutUs darkMode={darkMode} />
      <Services darkMode={darkMode} />
      <Contributors darkMode={darkMode} />
    </div>
  );
};

export default LandingPage;
