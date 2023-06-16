import React from "react";
import { RiCommunityLine } from "react-icons/ri";

const Cards = ({ icon, name, description }) => {
  return (
    <div className="h-[111px] bg-white w-full px-4 py-4 flex flex-row gap-3 items-center hover:shadow-md hover:cursor-pointer">
      {icon}
      <div className="flex flex-col w-full h-[111px] justify-center px-3">
        <span className="text-lg">{name}</span>
        <span className="text-xs text-[#222222] italic">{description}</span>
      </div>
    </div>
  );
};

export default Cards;
