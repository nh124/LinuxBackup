import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Chat from "./components/Chatroom/Chatroom";
// import Restaurant from "./components/Restaurant/restaurant";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import TravelAdvisor from "./components/TravelAdvisor/TravelAdvisor";

const Router = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />
            }
          />
          <Route path="/register" element={<Register darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route
            path="/home"
            element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="/chat"
            element={<Chat darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          {/* <Route path="/restaurant" element={<Restaurant />} /> */}
          <Route path="/restaurant" element={<TravelAdvisor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
