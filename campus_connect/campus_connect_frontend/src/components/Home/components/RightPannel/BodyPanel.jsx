import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Body from "./Body/Body";

const BodyPanel = ({ userData, setLeftPanelShow }) => {
  const [status, setStatus] = useState(false);
  const [showRightPanel, setShowRightPanel] = useState(true);
  return (
    <div className="w-[100%] h-screen">
      <Navbar
        setStatus={setStatus}
        userData={userData}
        status={status}
        showRightPanel={showRightPanel}
        setShowRightPanel={setShowRightPanel}
        setLeftPanelShow={setLeftPanelShow}
      />
      <Body status={status} showRightPanel={showRightPanel} />
    </div>
  );
};

export default BodyPanel;
