import { React, useState } from "react";
import Status from "./Status/Status";
import ListOfStd from "./ListOfStd/ListOfStd";

const RightPanel = ({ showRightPanel, darkMode }) => {
  return (
    <div
      className={`w-[40%] bg-[#F5F6F9] flex flex-col gap-3 px-3 max-md:absolute max-md:right-0 ${
        darkMode ? "bg-gray-800 text-white" : "bg-[#F5F6F9]"
      } ${
        showRightPanel ? "max-md:h-0 " : "max-md:h-[10%]"
      }overflow-hidden duration-300`}
    >
      <Status darkMode={darkMode} />
      <ListOfStd darkMode={darkMode} />
    </div>
  );
};

export default RightPanel;
