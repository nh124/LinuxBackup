import React from "react";
import Status from "./Status/Status";
import ListOfStd from "./ListOfStd/ListOfStd";

const RightPanel = () => {
  return (
    <div className="w-[25%] bg-[#F5F6F9] flex flex-col gap-3 px-3">
      <Status />
      <ListOfStd />
    </div>
  );
};

export default RightPanel;
