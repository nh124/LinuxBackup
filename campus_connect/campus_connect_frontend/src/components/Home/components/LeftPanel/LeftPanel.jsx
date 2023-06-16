import { React, useState } from "react";
import Logo from "./Logo/Logo";
import OptionsList from "./ListItems/List";

const LeftPanel = ({ leftPanelShow, setLeftPanelShow }) => {
  const [panelDisplay, setPanelDisplay] = useState(false);
  return (
    <div
      className={`w-[17%] h-screen bg-[#f8f8f8] flex flex-col ${
        leftPanelShow
          ? "max-lg:absolute max-lg:w-[30%] max-sm:w-[70%] z-10"
          : "max-lg:hidden"
      }`}
    >
      <Logo setLeftPanelShow={setLeftPanelShow} />
      <OptionsList />
    </div>
  );
};

export default LeftPanel;
