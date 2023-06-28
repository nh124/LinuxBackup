import React, { useState, useEffect } from "react";
import Profile from "./Profile/Profile";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = ({
  status,
  setStatus,
  userData,
  showRightPanel,
  setShowRightPanel,
  setLeftPanelShow,
  darkMode,
}) => {
  useEffect(() => {
    console.log(status);
  }, [status]);
  return (
    <div
      className={`w-full h-[5%] flex flex-row justify-between border-b items-center border-l  relative ${
        darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white"
      }`}
    >
      <div className="px-3 w-[10%] flex flex-row gap-2">
        <div
          className="w-full justify-center items-center hidden max-lg:flex hover:cursor-pointer"
          onClick={() => setLeftPanelShow(true)}
        >
          <AiOutlineMenu size={20} />
        </div>
        <div className="w-full text-lg font-bold">
          <h2>Dashboard</h2>
        </div>
      </div>

      <Profile
        status={status}
        setStatus={setStatus}
        userData={userData}
        showRightPanel={showRightPanel}
        setShowRightPanel={setShowRightPanel}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Navbar;
