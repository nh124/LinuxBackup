import React from "react";
import Logo from "./Logo/Logo";
import OptionsList from "./ListItems/List";

const LeftPanel = () => {
  return (
    <div className="w-[17%] h-screen bg-[#f8f8f8] flex flex-col">
      <Logo />
      <OptionsList />
    </div>
  );
};

export default LeftPanel;
