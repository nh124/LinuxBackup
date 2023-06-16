import React from "react";
import CenterPanel from "./BodyContent/CenterPanel";
import RightPanel from "./RightContent/RightPanel";
import Options from "../Navbar/Profile/Options";

const Body = ({ status, showRightPanel }) => {
  return (
    <div className="w-full h-[95%] bg-[#F5F6F9] flex flex-row relative overflow-hidden">
      <Options status={status} />
      <CenterPanel />
      <RightPanel showRightPanel={showRightPanel} />
    </div>
  );
};

export default Body;
