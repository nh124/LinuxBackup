import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Body from "./Body/Body";

const BodyPanel = ({
  userData,
  setLeftPanelShow,
  darkMode,
  setDarkMode,
  tab,
  showEditAbout,
  setShowEditAbout,
}) => {
  const [status, setStatus] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);
  return (
    <div className="w-full h-screen relative">
      <Navbar
        setStatus={setStatus}
        userData={userData}
        status={status}
        showRightPanel={showRightPanel}
        setShowRightPanel={setShowRightPanel}
        setLeftPanelShow={setLeftPanelShow}
        darkMode={darkMode}
      />
      <Body
        status={status}
        showRightPanel={showRightPanel}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        tab={tab}
        showEditAbout={showEditAbout}
        setShowEditAbout={setShowEditAbout}
      />
    </div>
  );
};

export default BodyPanel;
