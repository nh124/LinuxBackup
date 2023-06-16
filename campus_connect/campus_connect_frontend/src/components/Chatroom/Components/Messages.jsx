import { React, useState, useEffect } from "react";
import LOGO from "../Assets/LogoMakr-5ah0cW.png";
import { UserInformation } from "../UserInformation";
import { CiSearch } from "react-icons/ci";
import { BiDotsHorizontalRounded, BiLogOut } from "react-icons/bi";
import { BsFillMoonFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { Navigate } from "react-router-dom";

const Messages = ({
  UserInformation,
  setUser,
  UserData,
  User,
  privateMessageData,
  setLSideMenu,
  LSideMenu,
}) => {
  const [optionsVisibility, setOptionsVisibility] = useState(true);
  const [search, setSearch] = useState("");
  return (
    <div
      className={`w-[347px] h-screen bg-[#FAFAFA] flex flex-col py-1 relative max-md:absolute max-md:w-[40%] max-md:h-[100%] max-sm:w-[60%] max-sm:h-[100%]  max-md:top-0 max-md:z-10 max-md:${
        LSideMenu ? "absolute" : "hidden"
      }`}
    >
      {/* logo */}
      <div id="logoBox" className="py-3">
        <div
          id="logoBox"
          className="w-full flex justify-start px-3 max-md:w-[70%]"
        >
          <img src={LOGO} alt="" className="object-cover" />
        </div>
        <div
          className="hidden absolute top-4 right-4 hover:rotate-90 hover:cursor-pointer duration-300 max-md:flex"
          onClick={() => setLSideMenu(!LSideMenu)}
        >
          <IoMdClose size={25} />
        </div>
      </div>
      {/* usersBox */}
      <div className="flex flex-col h-[100%] w-full relative">
        {/* search and title */}
        <div id="searchBox" className="w-full h-auto flex flex-col px-3 gap-3">
          <h1 className="text-2xl font-bold max-md:text-lg">Messages</h1>

          <div className="w-full h-auto flex flex-row gap-2 justify-between items-center relative">
            <div className="absolute z-20 left-2">
              <CiSearch size={20} style={{ color: "#708090" }} />
            </div>
            <input
              className="border border-slate-300 rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full max-md:py-1"
              style={{ zIndex: 0 }}
              type="text"
              placeholder="Search People..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* usersEntity */}
        <div
          id="usersEntity"
          className="flex flex-col w-full h-[450px] mt-4 px-3 py-3 gap-2"
        >
          <ul className="flex flex-col w-full h-[100%] max:md:h-[450px] gap-3 max-h-[600px] overflow-auto">
            <li
              className="w-full h-[12%] flex flex-row justify-between py-1 px-1 gap-1 rounded-lg border hover:cursor-pointer hover:bg-slate-300 duration-300 max-sm:h-[10%]"
              onClick={() => setUser("CHATROOM")}
            >
              <div className="w-[40%] rounded-full flex justify-center items-center overflow-hidden">
                <img
                  className="object-cover w-full h-full top-[50%] right-[50%]"
                  src="https://voicefilm.com/wp-content/uploads/2022/07/How-Old-Was-Gohan-When-He-Fought-Cell-00.jpg"
                  alt=""
                />
              </div>
              <div className="w-full flex px-1 flex-col justify-center">
                <span className="text-base font-bold max-2xl:text-lg max-lg:text-base max-sm:text-sm">
                  Chat Room
                </span>
                <span className="text-xs text-[#4F5665]">nh123</span>
              </div>
              <div className="w-full  flex items-center px-1 justify-end text-[#4F5665] text-xs">
                Date
              </div>
            </li>
            {[...UserInformation.keys()]
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.toLowerCase().includes(search);
              })
              .map(
                (usersEntity, idx) =>
                  UserData.name !== usersEntity && (
                    <li
                      key={idx}
                      className="w-full h-[12%] flex flex-row justify-between py-1 px-1 gap-1 rounded-lg border hover:cursor-pointer hover:bg-slate-300 duration-300 max-sm:h-[10%]"
                      onClick={() => setUser(usersEntity)}
                    >
                      <div className="w-[25%] rounded-full flex justify-center items-center overflow-hidden">
                        <img
                          className="object-cover w-full h-full top-[50%] right-[50%]"
                          src="https://voicefilm.com/wp-content/uploads/2022/07/How-Old-Was-Gohan-When-He-Fought-Cell-00.jpg"
                          alt=""
                        />
                      </div>
                      <div className="w-full flex  px-1 flex-col justify-center">
                        <span className="text-base font-bold max-2xl:text-lg max-lg:text-base max-sm:text-sm">
                          {usersEntity}
                        </span>
                        <span className="text-xs text-[#4F5665]">nh123</span>
                      </div>
                      <div className="w-[30%]  flex items-center px-1 justify-end text-[#4F5665] text-xs">
                        Date
                      </div>
                    </li>
                  )
              )}
          </ul>
        </div>

        {/* options */}
        <div
          id="options"
          className="w-full flex flex-col items-end border rounded-md absolute bottom-2 right-0"
          style={{ visibility: optionsVisibility ? "hidden" : "visible" }}
        >
          <button className="w-[100%] border-b hover:bg-slate-300">
            <div className="flex flex-row justify-between items-center px-4">
              <span className="max-2xl:text-base max-lg:text-xs">
                Dark Mode
              </span>
              <BsFillMoonFill />
            </div>
          </button>
          <button className="w-[100%] border-b hover:bg-slate-300">
            <div className="flex flex-row justify-between items-center px-4">
              <span className="max-2xl:text-base max-lg:text-xs">Profile</span>
              <CgProfile />
            </div>
          </button>
          <button
            className="w-[100%] hover:bg-slate-300"
            // onClick={() => <Navigate to="/login" />}
          >
            <div className="flex flex-row justify-between items-center px-4">
              <span
                className="max-2xl:text-base max-lg:text-xs"
                // onClick={() => {
                //   window.location.href = "/login";
                // }}
              >
                Logout
              </span>
              <BiLogOut />
            </div>
          </button>
        </div>
      </div>

      {/* currentUserBox */}
      <div
        id="CurrentUser"
        className="w-full h-auto flex flex-col gap-1 px-1 justify-end"
      >
        <div
          onClick={() => setOptionsVisibility(!optionsVisibility)}
          className="flex flex-row hover:cursor-pointer"
        >
          <div className="w-full flex flex-row px-4 h-[64px] items-center border-t">
            <div className="w-full flex flex-row items-center">
              <div className="flex justify-center items-center border border-black rounded-2xl w-[60px] h-[50px]">
                <img
                  src="https://i.seadn.io/gae/XLA0Qt_fCDoU2EXhfgKoYJmofcXKcQe0WIYWJjK_1JKfdZxBkEROjisZdliIbcPU3uT2pwoWi5JMDp9kUPzw6nN6Y7FnV7NZnsnNZA?auto=format&dpr=1&w=1000"
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
              <ul className="flex flex-col gap-1 h-[64px] items-start px-4 py-3">
                {/* username and id */}
                <li className="text-xl font-bold max-2xl:text-lg max-lg:text-base">
                  {UserData.name}
                </li>
                <li className="text-xs text-[#4F5665]">@{UserData.username}</li>
              </ul>
            </div>

            <BiDotsHorizontalRounded />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
