import React from "react";
import Navbar from "../../../Navbar/Navbar";
import RightPanel from "../../RightContent/RightPanel";
import Banner from "../Banner/Banner";
import Cards from "../Cards/Cards";
import { RiCommunityLine } from "react-icons/ri";

const Dashboard = ({ darkMode }) => {
  return (
    <div
      className={`w-[100%] px-3 py-3 max-md:w-[100%] max-md:h-auto overflow-hidden ${
        darkMode ? "bg-gray-700 text-white" : ""
      }`}
    >
      <Banner />
      <div className="flex flex-row gap-3 max-md:w-[100%] max-md:h-[70%] overflow-auto max-sm:h-[60%]">
        <div className="w-full flex flex-col">
          <span className="w-full h-[50px] flex items-center">
            Recent Activity
          </span>
          <div className="grid grid-cols-2 gap-4 max-sm:flex max-sm:flex-col max-sm:gap-1">
            <Cards
              icon={<RiCommunityLine size={50} />}
              name="Home"
              description={"description"}
              darkMode={darkMode}
            />
            <Cards
              icon={<RiCommunityLine size={50} />}
              name="Home"
              description={"description"}
              darkMode={darkMode}
            />
            <Cards
              icon={<RiCommunityLine size={50} />}
              name="Home"
              description={"description"}
              darkMode={darkMode}
            />
            <Cards
              icon={<RiCommunityLine size={50} />}
              name="Home"
              description={"description"}
              darkMode={darkMode}
            />
            <Cards
              icon={<RiCommunityLine size={50} />}
              name="Home"
              description={"description"}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
