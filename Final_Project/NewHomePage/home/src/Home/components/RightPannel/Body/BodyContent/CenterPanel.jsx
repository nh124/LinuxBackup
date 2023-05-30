import React from "react";
import Navbar from "../../Navbar/Navbar";
import RightPanel from "../RightContent/RightPanel";
import Banner from "./Banner/Banner";
import Cards from "./Cards/Cards";
import { RiCommunityLine } from "react-icons/ri";

const CenterPanel = () => {
  return (
    <div className="w-[80%] px-3 py-3">
      <Banner />
      <div className="flex flex-row gap-3">
        <div className="w-full flex flex-col">
          <span className="w-full h-[50px] flex items-center">
            Campus Navigation
          </span>
          <div className="flex flex-col gap-4">
            <Cards
              icon={<RiCommunityLine size={50} />}
              name="Home"
              description={"description"}
            />
            <Cards
              icon={<RiCommunityLine size={50} />}
              name="Home"
              description={"description"}
            />
          </div>
        </div>

        <div className="w-full flex flex-col">
          <span className="w-full h-[50px] flex items-center">
            Communication
          </span>
          <div className="flex flex-col gap-4">
            <Cards
              icon={<RiCommunityLine size={50} />}
              name="Home"
              description={"description"}
            />
            <Cards
              icon={<RiCommunityLine size={50} />}
              name="Home"
              description={"description"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterPanel;
