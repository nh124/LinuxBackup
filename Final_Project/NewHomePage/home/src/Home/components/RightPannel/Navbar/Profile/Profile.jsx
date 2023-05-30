import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import Options from "./Options";

const Profile = ({ setStatus, status }) => {
  return (
    <div className="flex flex-row items-center justify-center h-[100%] w-[220px] gap-2 hover:cursor-pointer border border-r-0" onClick={() => setStatus(!status)} >
      <div className=" rounded-2xl">
        <img
          src="https://pm1.aminoapps.com/7500/115ec31f80c6d28fee44e5c14389a8bdf2ee2be5r1-1200-900v2_hq.jpg"
          alt=""
          style={{ "border-radius": "50%", width: "50px", height: "50px" }}
        />
      </div>
      <h2>Nur Haque</h2>
      <RiArrowDownSLine />
    </div>
  );
};

export default Profile;
