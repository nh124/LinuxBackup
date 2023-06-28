import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import Options from "./Options";
import { BsPeopleFill } from "react-icons/bs";

const Profile = ({
  setStatus,
  status,
  userData,
  showRightPanel,
  setShowRightPanel,
  darkMode,
}) => {
  return (
    <div className="h-[100%] w-[220px] flex flex-row">
      <div
        className={`flex flex-row items-center justify-center h-[100%] w-full gap-2 hover:cursor-pointer border border-t-0 border-r-0 border-b-0 ${
          darkMode ? "border-gray-600" : ""
        } `}
        onClick={() => setStatus(!status)}
      >
        <div className=" rounded-full max-md:hidden">
          <img
            src="https://pm1.aminoapps.com/7500/115ec31f80c6d28fee44e5c14389a8bdf2ee2be5r1-1200-900v2_hq.jpg"
            alt=""
            style={{ "border-radius": "50%", width: "40px", height: "40px" }}
          />
        </div>
        <h2>{`${userData.firstName} ${userData.lastName} `}</h2>
        <RiArrowDownSLine
          className={`${status ? "transform rotate-180" : ""} duration-300`}
        />
      </div>
      <div className="w-[60%] justify-center  items-center hidden max-md:flex hover:cursor-pointer">
        <BsPeopleFill
          size={30}
          onClick={() => setShowRightPanel(!showRightPanel)}
        />
      </div>
    </div>
  );
};

export default Profile;
