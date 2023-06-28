import React from "react";
import Banner from "./profileComponents/Banner";

import About from "./profileComponents/About";
import Work_Showcase from "./profileComponents/Work_showcase/Work_Showcase";

const Profile = ({ darkMode, showEditAbout, setShowEditAbout }) => {
  return (
    <div
      className={`flex flex-col gap-2 w-[100%] px-3 py-3 max-md:w-[100%] max-md:h-auto overflow-auto  ${
        darkMode ? "bg-gray-700 text-white" : ""
      }`}
    >
      {/* profile */}
      <Banner darkMode={darkMode} />
      {/* About */}
      <About
        darkMode={darkMode}
        showEditAbout={showEditAbout}
        setShowEditAbout={setShowEditAbout}
      />
      {/* <Work_Showcase /> */}
      <Work_Showcase darkMode={darkMode} />
    </div>
  );
};

export default Profile;
