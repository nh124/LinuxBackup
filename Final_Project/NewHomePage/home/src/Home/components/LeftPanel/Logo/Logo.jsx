import React from "react";
import LogoImage from "./Assets/Logo.png";

const Logo = () => {
  return (
    <div className="w-full h-[10%] bg-[#F5F6F9] flex items-center justify-start px-3 ">
      <img className="w-[200px]" src={LogoImage} alt="" />
    </div>
  );
};

export default Logo;
