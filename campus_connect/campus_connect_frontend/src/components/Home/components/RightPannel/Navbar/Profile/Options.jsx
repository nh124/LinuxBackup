import React from "react";
import { BsSun, BsFillCloudMoonFill } from "react-icons/bs";

const Options = ({ status, darkMode, setDarkMode }) => {
  return (
    <div
      className={`w-[220px] h-auto flex flex-col items-end top-0 right-0 absolute rounded-br-lg rounded-bl-lg border ${
        darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white "
      }`}
      style={{ display: status ? "flex" : "none" }}
    >
      <div
        onClick={() => setDarkMode(!darkMode)}
        className={`py-1 flex flex-row justify-between items-center  w-full px-3 hover:cursor-pointer border-b ${
          darkMode ? "border-gray-600 hover:bg-[#3f3f3f]" : "hover:bg-[#c9c9ca]"
        }`}
      >
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        <div>
          {darkMode ? <BsSun size={30} /> : <BsFillCloudMoonFill size={30} />}
        </div>
      </div>
      <span
        className={`py-1 ${
          darkMode ? "hover:bg-[#3f3f3f]" : "hover:bg-[#c9c9ca]"
        } w-full px-3 hover:cursor-pointer`}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "/login";
        }}
      >
        Logout
      </span>
    </div>
  );
};

export default Options;
