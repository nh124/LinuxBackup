import React, { useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { LuMessageSquare } from "react-icons/lu";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";

const RightPanel = ({
  AllUsers,
  UserInformation,
  userData,
  setPrivateChats,
  getUserNames,
  stompClient,
  showRightPanel,
  darkMode,
}) => {
  const [newMessage, setNewMessage] = useState(false);
  const [state, setState] = useState(-1);
  const [messages, setMessages] = useState("");
  const [search, setSearch] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const sendPrivateMessage = (receiverId) => {
    let message = {
      message: messages,
      receiverId: receiverId,
      type: "PRIVATE",
      userId: userData.user_id,
    };
    stompClient.send("/app/private-message", {}, JSON.stringify(message));
    message.date = new Date();
    UserInformation.set(getUserNames(receiverId), [message]);
    setPrivateChats(new Map(UserInformation));
  };
  return (
    <div
      className={`flex w-[20%] h-[100%]  flex-col max-2xl:w-[25%] max-xl:w-[60%] max-lg:w-[40%] max-sm:w-[50%] ${
        darkMode ? "bg-gray-800" : "bg-[#FAFAFA]"
      }  max-md:${showRightPanel ? "absolute right-0" : "hidden"}`}
    >
      <div className="w-full h-[10%] flex flex-col max-sm:h-[20%]">
        <div
          className={`text-xl font-bold h-[100%] flex items-center px-3 max-lg:text-base ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }text-gray-700 max-sm:text-xs`}
        >
          <span>Start a conversation</span>
        </div>
        <div
          className={`h-[100%] flex flex-row border border-l-0 border-r-0 justify-center items-center ${
            darkMode ? "border-gray-600" : ""
          }  ${showSearchBar ? "px-3" : ""}`}
        >
          <div
            className={`flex flex-row w-full ${
              showSearchBar ? "hidden" : "flex"
            } `}
          >
            <div
              className={`w-full h-[100%] flex flex-col items-center px-2 py-2 border-r ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-[#b4b3b3]"
              }  hover:cursor-pointer overflow-hidden ${
                darkMode ? "border-gray-600" : ""
              }`}
              onClick={() => setShowSearchBar(true)}
            >
              <AiOutlineSearch size={20} />
              <span className="text-xs">Search</span>
            </div>
            <div
              className={`w-full h-[100%] flex flex-col items-center px-2 py-2 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-[#b4b3b3]"
              }  hover:cursor-pointer overflow-hidden`}
            >
              <MdNotificationsActive size={20} />
              <span className="text-xs">Notification</span>
            </div>
          </div>

          <div className={`py-3 ${showSearchBar ? "flex" : "hidden"} w-full`}>
            <input
              className={`border border-slate-300 rounded-3xl py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full ${
                darkMode
                  ? "bg-[#4F5665] border-slate-500 focus:border-gray-400 focus:ring-gray-400 "
                  : "bg-white border-slate-300 focus:border-sky-500 focus:ring-sky-500"
              }`}
              style={{ zIndex: 0 }}
              type="text"
              placeholder="Search People..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div
              className="flex justify-center items-center w-[20%] hover:cursor-pointer"
              onClick={() => setShowSearchBar(false)}
            >
              <IoIosClose size={30} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[100%] overflow-auto flex flex-col">
        {/* users */}
        <div className="flex flex-row gap-1 px-1 py-2 text-xs items-center">
          <div className="w-[2%] bg-black h-[1px]"></div>
          <span>Users</span>
          <div className="w-full bg-black h-[1px]"></div>
        </div>

        {AllUsers.filter((user) => {
          const name = user.firstName + " " + user.lastName;
          return search.toLowerCase() === ""
            ? user
            : name.toLowerCase().includes(search.toLowerCase());
        }).map((user, index) => {
          if (
            !Array.from(UserInformation.keys()).includes(
              user.firstName + " " + user.lastName
            )
          ) {
            return (
              <div
                key={index}
                className="w-full h-auto flex flex-col px-2 py-2 items-center gap-1"
              >
                <div className="w-full h-[100%] flex flex-row px-2 py-2 items-center">
                  <div className="w-[20%] rounded-full overflow-hidden flex justify-center items-center">
                    <BsFillPersonFill size={30} />
                  </div>
                  <div className="w-full flex flex-col items-start px-1">
                    <span className="text-sm">
                      {user.firstName + " " + user.lastName}
                    </span>
                    <span className="text-xs">{user.role}</span>
                  </div>
                  <div
                    className={`w-[20%] flex justify-center items-center rounded-full h-[80%] ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-[#dfdede]"
                    }  hover:cursor-pointer`}
                    onClick={() => {
                      setNewMessage(!newMessage);
                      setState(index);
                    }}
                  >
                    <LuMessageSquare />
                  </div>
                </div>
                <div
                  className={`${
                    newMessage && state === index ? "flex" : "hidden"
                  } h-[100%] w-full  flex-row py-1`}
                >
                  <div className="w-[100%]">
                    <input
                      type="text"
                      className={`w-[100%] border rounded-lg text-black px-3 focus:outline-none  focus:ring-1 ${
                        darkMode
                          ? "bg-[#4F5665] border-slate-500 focus:border-gray-400 focus:ring-gray-400 text-white"
                          : "bg-white border-slate-300 focus:border-sky-500 focus:ring-sky-500"
                      }`}
                      onChange={(e) => setMessages(e.target.value)}
                    />
                  </div>
                  <div className="w-[30%] flex justify-center items-center">
                    <button
                      className={`rounded-md px-1 border border-gray-400 text-gray-400 ${
                        darkMode
                          ? "hover:bg-gray-700 hover:text-slate-300"
                          : "hover:bg-gray-300 hover:text-slate-700"
                      }  hover:cursor-pointer duration-300`}
                      onClick={() => {
                        sendPrivateMessage(user.id);
                      }}
                    >
                      send
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default RightPanel;
