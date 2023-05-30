import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import MatchUser from "./components/MatchUser";
import Verify from "./components/Verify";
import Profile from "./components/Profile";

const Routers = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/match" element={<MatchUser />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Routers;
