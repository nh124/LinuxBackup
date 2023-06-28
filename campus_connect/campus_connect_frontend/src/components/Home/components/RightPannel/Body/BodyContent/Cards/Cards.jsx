import React from "react";
import { RiCommunityLine } from "react-icons/ri";

const Cards = ({ icon, name, description, darkMode }) => {
  return (
    <div
      className={`h-[111px] ${
        darkMode ? "bg-gray-600 text-white" : "bg-white text-[#222222]"
      } w-full px-4 py-4 flex flex-row gap-3 items-center hover:shadow-md hover:cursor-pointer max-sm:h-[100%]`}
    >
      {icon}
      <div className="flex flex-col w-full h-[100%] justify-center px-3">
        <span className="text-lg">{name}</span>
        <span className="text-xs  italic">{description}</span>
      </div>
    </div>
  );
};

export default Cards;
