import React from "react";
import LogoImage from "./Assets/Logo.png";
import { GrClose } from "react-icons/gr";

const Logo = ({ setLeftPanelShow, darkMode }) => {
  return (
    <div
      className={`w-full h-[10%] bg-[#F5F6F9] flex items-center justify-start px-3 relative ${
        darkMode ? "bg-gray-700" : "bg-[#F5F6F9]"
      } `}
    >
      <img className="w-[200px]" src={LogoImage} alt="" />
      <GrClose
        size={20}
        className="absolute hidden z-10 right-3 top-2 hover:rotate-90 duration-300 hover:cursor-pointer max-lg:flex"
        onClick={() => {
          setLeftPanelShow(false);
        }}
      />
    </div>
  );
};

export default Logo;
