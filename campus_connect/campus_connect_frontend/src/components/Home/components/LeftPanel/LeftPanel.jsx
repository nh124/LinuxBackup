import { React, useState } from "react";
import Logo from "./Logo/Logo";
import OptionsList from "./ListItems/List";

const LeftPanel = ({ leftPanelShow, setLeftPanelShow, darkMode, setTab }) => {
  const [panelDisplay, setPanelDisplay] = useState(false);
  return (
    <div
      className={`w-[17%] h-screen  flex relative ${
        darkMode ? "bg-gray-800" : "bg-[#f8f8f8]"
      } flex-col ${
        leftPanelShow
          ? "max-lg:absolute max-lg:w-[30%] max-sm:w-[70%] z-10"
          : "max-lg:hidden"
      }`}
    >
      <Logo setLeftPanelShow={setLeftPanelShow} darkMode={darkMode} />
      <OptionsList darkMode={darkMode} setTab={setTab} />
    </div>
  );
};

export default LeftPanel;
