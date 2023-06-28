import React from "react";
import Dashboard from "./BodyContent/CentralPanel/DashBoard";
import Profile from "./BodyContent/CentralPanel/Profile/Profile";
import RightPanel from "./RightContent/RightPanel";
import Options from "../Navbar/Profile/Options";

const Body = ({
  status,
  showRightPanel,
  darkMode,
  setDarkMode,
  tab,
  showEditAbout,
  setShowEditAbout,
}) => {
  return (
    <div className="w-[100%] h-[95%] bg-[#F5F6F9] flex flex-row relative overflow-auto">
      <Options status={status} darkMode={darkMode} setDarkMode={setDarkMode} />
      {tab === "Home" && <Dashboard darkMode={darkMode} />}
      {tab === "Profile" && (
        <Profile
          darkMode={darkMode}
          showEditAbout={showEditAbout}
          setShowEditAbout={setShowEditAbout}
        />
      )}
      <RightPanel showRightPanel={showRightPanel} darkMode={darkMode} />
    </div>
  );
};

export default Body;
