import { React, useState } from "react";
import LOGO from "../Assets/LogoMakr-5ah0cW.png";
// import { UserInformation } from "../UserInformation";
import { CiSearch } from "react-icons/ci";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsFillMoonFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";

const Messages = ({ UserInformation }) => {
  const [optionsVisibility, setOptionsVisibility] = useState(false);
  const [colorOfTab, setColorOfTab] = useState();
  return (
    <div className="w-[347px] h-screen bg-[#FAFAFA] flex flex-col py-3 relative">
      {/* logo */}
      <div id="logoBox" className="w-full flex justify-start px-3">
        <img src={LOGO} alt="" style={{ width: "300px" }} />
      </div>
      {/* search and title */}
      <div
        id="searchBox"
        className="w-full h-[80px] flex flex-col mt-20 px-3 gap-3 relative"
      >
        <h1 className="text-2xl font-bold">Messages</h1>
        <div className="absolute z-20 top-12 left-4">
          <CiSearch size={30} style={{ color: "#708090" }} />
        </div>
        <input
          className="border border-slate-300 rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          style={{ zIndex: 0 }}
          type="text"
          placeholder="Search People..."
        />
      </div>
      {/* usersEntity */}
      <div id="usersEntity" className="w-full h-auto mt-4  px-3 py-3">
        {[...UserInformation.keys()].map((usersEntity, idx) => (
          <ul
            key={idx}
            className="flex flex-row gap-3 justify-between h-[50px] items-center hover:cursor-pointer hover:bg-slate-300 rounded-md px-3 py-3"
          >
            {/* username and id */}
            <div id="userCredentials" className="flex flex-col items-start">
              <li className="text-xl font-bold">Nur Haque</li>
              <li className="text-xs text-[#4F5665]">NH123</li>
            </div>
            <div id="date">
              <li className="text-xs text-[#4F5665]">DEC 11</li>
            </div>
          </ul>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[160px] px-3 py-3 justify-center items-center">
        <div
          id="options"
          className="w-full flex flex-col items-end"
          style={{ visibility: optionsVisibility ? "hidden" : "visible" }}
        >
          <button className="w-[50%] border hover:bg-slate-300">
            <div className="flex flex-row justify-between items-center px-4">
              <span>Dark Mode</span>
              <BsFillMoonFill />
            </div>
          </button>
          <button className="w-[50%] border hover:bg-slate-300">
            <div className="flex flex-row justify-between items-center px-4">
              <span>Profile</span>
              <CgProfile />
            </div>
          </button>
          <button className="w-[50%] border hover:bg-slate-300">
            <div className="flex flex-row justify-between items-center px-4">
              <span>Dark Mode</span>
              <BsFillMoonFill />
            </div>
          </button>
        </div>
        <div
          id="CurrentUser"
          className="w-full h-[64px] border border-b-slate-300"
        >
          <button onClick={() => setOptionsVisibility(!optionsVisibility)}>
            <div className="w-full flex flex-row px-4 h-[64px] justify-between items-center">
              <div className="flex justify-center items-center border border-black rounded-2xl w-[60px] h-[50px]">
                <img
                  src="https://i.seadn.io/gae/XLA0Qt_fCDoU2EXhfgKoYJmofcXKcQe0WIYWJjK_1JKfdZxBkEROjisZdliIbcPU3uT2pwoWi5JMDp9kUPzw6nN6Y7FnV7NZnsnNZA?auto=format&dpr=1&w=1000"
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
              <ul className="flex flex-col gap-1 h-[64px] items-start px-4 py-3">
                {/* username and id */}
                <li className="text-xl font-bold">Nur Haque</li>
                <li className="text-xs text-[#4F5665]">@nh123</li>
              </ul>
              <div className="w-[40px]"></div>
              <BiDotsHorizontalRounded />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
