import React from "react";
import CenterPanel from "./BodyContent/CenterPanel";
import RightPanel from "./RightContent/RightPanel";
import Options from "../Navbar/Profile/Options";

const Body = ({ status, setStatus }) => {
  return (
    <div className="w-full h-[92%] bg-[#F5F6F9] flex flex-row relative">
      <Options status={status} />
      <CenterPanel />
      <RightPanel />
    </div>
  );
};

export default Body;
