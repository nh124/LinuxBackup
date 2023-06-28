import React, { useState, useEffect } from "react";
import PrivateChatMessages from "./PrivateChatMessages";
import PublicChatMessages from "./PublicChatMessages";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPeopleFill } from "react-icons/bs";

import RightPanel from "./RightPanel";

const ChatBox = ({
  User,
  userData,
  ChatLogPublic,
  ChatLogPrivate,
  sendPublicMessages,
  sendPrivateMessages,
  handleMessage,
  setLSideMenu,
  LSideMenu,
  AllUsers,
  UserInformation,
  setPrivateChats,
  getUserNames,
  stompClient,
  darkMode,
}) => {
  const [showRightPanel, setShowRightPanel] = useState(false);
  return (
    <div
      className={`flex flex-col w-[90%] h-screen max-md:w-full relative ${
        darkMode ? "bg-gray-800 text-gray-200" : ""
      }`}
    >
      {/* current usersEntity */}
      <div
        id="CurrentUser"
        className={`w-full h-[8%] border-l border-b ${
          darkMode ? "border-gray-600" : "border-b-slate-300"
        }  flex items-center justify-between py-1`}
      >
        <div className="w-[300px] flex flex-row px-4 h-[100%] items-center gap-2">
          <div
            className="hidden max-md:flex hover:cursor-pointer"
            onClick={() => setLSideMenu(!LSideMenu)}
          >
            <GiHamburgerMenu />
          </div>

          <div className="flex flex-row px-4 h-[100%] items-center">
            <div className="flex justify-center items-center border border-black rounded-2xl w-[30%] max-sm:w-[25%] h-[100%] overflow-hidden">
              <img
                src="https://i.seadn.io/gae/XLA0Qt_fCDoU2EXhfgKoYJmofcXKcQe0WIYWJjK_1JKfdZxBkEROjisZdliIbcPU3uT2pwoWi5JMDp9kUPzw6nN6Y7FnV7NZnsnNZA?auto=format&dpr=1&w=1000"
                alt=""
                className="object-cover"
              />
            </div>
            <ul className="flex flex-col gap-1 h-[100%] items-start px-4 py-1">
              {/* username and id */}
              <li className="text-xl font-bold max-sm:text-sm">{User}</li>
              <li className="text-xs text-[#4F5665] max-sm:text-[9px]">
                @nh123
              </li>
            </ul>
          </div>
        </div>
        <div
          className="w-[60px] h-[70%] px-3 py-3 hidden justify-center items-center max-md:flex rounded-full mr-5 hover:bg-slate-300 hover:cursor-pointer"
          onClick={() => setShowRightPanel(!showRightPanel)}
        >
          <BsPeopleFill size={30} />
        </div>
      </div>
      {/* messageBox */}
      <div className="h-[92%] flex flex-row w-full">
        <div id="MessageBox" className="px-3 py-3 h-[100%] w-[100%]">
          {User !== "CHATROOM" && (
            <PrivateChatMessages
              User={User}
              ChatLogPrivate={ChatLogPrivate}
              userData={userData}
              handleMessage={handleMessage}
              sendPrivateMessages={sendPrivateMessages}
              showRightPanel={showRightPanel}
              getUserNames={getUserNames}
              darkMode={darkMode}
            />
          )}
          {User === "CHATROOM" && (
            <PublicChatMessages
              cChatMessages
              userData={userData}
              ChatLogPublic={ChatLogPublic}
              handleMessage={handleMessage}
              sendPublicMessages={sendPublicMessages}
              showRightPanel={showRightPanel}
              getUserNames={getUserNames}
              darkMode={darkMode}
            />
          )}
        </div>
        <RightPanel
          AllUsers={AllUsers}
          UserInformation={UserInformation}
          userData={userData}
          setPrivateChats={setPrivateChats}
          getUserNames={getUserNames}
          stompClient={stompClient}
          showRightPanel={showRightPanel}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default ChatBox;
