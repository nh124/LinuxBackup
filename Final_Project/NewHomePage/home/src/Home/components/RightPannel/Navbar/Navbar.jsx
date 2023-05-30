import React, { useState, useEffect } from "react";
import Profile from "./Profile/Profile";

const Navbar = ({ status, setStatus }) => {
  useEffect(() => {
    console.log(status);
  }, [status]);
  return (
    <div className="w-full h-[8%] bg-white flex flex-row justify-between items-center px-4 relative">
      <h2>Dashboard</h2>
      <Profile status={status} setStatus={setStatus} />
    </div>
  );
};

export default Navbar;
