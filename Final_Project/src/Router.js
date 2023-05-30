import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Home from "./components/home";
import Comments from "./components/Comments";
import Profile from "./components/profile";
import Register from "./components/Register";
import Login from "./components/login";
import NotFound from "./components/notFound";
// import Protected from "./components/protected";
import Restaurant from "./components/restaurant";

const Routing = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/comments" element={<Comments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routing;
