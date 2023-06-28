import { React, useState, useEffect } from "react";
import LOGO from "../../Assets/LogoMakr.png";
import { CiSearch } from "react-icons/ci";
import { BiDotsHorizontalRounded, BiLogOut } from "react-icons/bi";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { Navigate } from "react-router-dom";
import { options } from "./OptionsList";

const Messages = ({
  UserInformation,
  setUser,
  UserData,
  User,
  privateMessageData,
  setLSideMenu,
  LSideMenu,
  darkMode,
  setDarkMode,
}) => {
  const [optionsVisibility, setOptionsVisibility] = useState(true);
  const [search, setSearch] = useState("");
  const optionDis = (option) => {
    if (option === "Logout") {
      return (
        (window.location.href = "/login"),
        localStorage.setItem("auth_token", null)
      );
    }
    if (option === "Dark") {
      return setDarkMode(!darkMode);
    }
    if (option === "Profile") {
      return (window.location.href = "/home");
    }
  };
  return (
    <div
      className={`w-[347px] h-screen bg-[#FAFAFA] flex flex-col py-1 relative max-md:absolute max-md:w-[40%] max-md:h-[100%] max-sm:w-[60%] max-sm:h-[100%]  max-md:top-0 max-md:z-10 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white"
      } max-md:${LSideMenu ? "absolute" : "hidden"}`}
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
          <h1 className="text-2xl font-bold max-md:text-lg"></h1>

          <div className="w-full h-auto flex flex-row gap-2 justify-between items-center relative">
            <div className="absolute z-20 left-2">
              <CiSearch size={20} style={{ color: "#708090" }} />
            </div>
            <input
              className={`border rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none  focus:ring-1 sm:text-sm w-full max-md:py-1 ${
                darkMode
                  ? "bg-[#4F5665] border-slate-500 focus:border-gray-400 focus:ring-gray-400 "
                  : "bg-white border-slate-300 focus:border-sky-500 focus:ring-sky-500"
              }`}
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
              className={`w-full h-[12%] flex flex-row justify-between py-1 px-1 gap-1 rounded-lg hover:cursor-pointer ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-slate-300"
              }  duration-300 max-sm:h-[10%]`}
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
                <span
                  className={`text-xs ${
                    darkMode ? "text-slate-400" : "text-[#4F5665]"
                  } `}
                >
                  nh123
                </span>
              </div>
              <div
                className={`w-full  flex items-center px-1 justify-end ${
                  darkMode ? "text-slate-400" : "text-[#4F5665]"
                }  text-xs`}
              >
                <span>Date</span>
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
                      className={`w-full h-[12%] flex flex-row justify-between py-1 px-1 gap-1 rounded-lg hover:cursor-pointer ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-slate-300"
                      }  duration-300 max-sm:h-[10%]`}
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
                        <div
                          className={`w-full px-1 justify-end ${
                            darkMode ? "text-slate-400" : "text-[#4F5665]"
                          }  text-xs`}
                        >
                          <span>nh123</span>
                        </div>
                      </div>
                      <div
                        className={`w-[30%]  flex items-center px-1 justify-end ${
                          darkMode ? "text-slate-400" : "text-[#4F5665]"
                        }  text-xs`}
                      >
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
          className="w-full flex flex-col items-center  absolute bottom-2 right-0"
          style={{ visibility: optionsVisibility ? "hidden" : "visible" }}
        >
          <div className="flex border rounded-md flex-row w-[90%] overflow-hidden">
            {options.map((option, idx) => (
              <button
                key={idx}
                className={`w-[100%] ${
                  darkMode ? "hover:bg-gray-800 " : "hover:bg-slate-300"
                } py-3 px-2`}
              >
                <div
                  className="flex flex-row justify-center items-center px-2 gap-2"
                  onClick={() => optionDis(option)}
                >
                  <span className="text-sm max-2xl:text-sm max-lg:hidden">
                    {option}
                  </span>
                  <div>
                    {option === "Dark" &&
                      (darkMode ? <BsFillSunFill /> : <BsFillMoonFill />)}
                    {option === "Profile" && <CgProfile />}
                    {option === "Logout" && <BiLogOut />}
                  </div>
                </div>
              </button>
            ))}
          </div>
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
          <div
            className={`w-full flex flex-row px-4 h-[64px] items-center ${
              darkMode ? "border-gray-500" : ""
            } border-t`}
          >
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
                <li
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-[#4F5665]"
                  } `}
                >
                  @{UserData.username}
                </li>
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
