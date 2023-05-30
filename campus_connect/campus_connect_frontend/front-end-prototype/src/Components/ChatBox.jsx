import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import PrivateChatMessages from "./PrivateChatMessages";
import PublicChatMessages from "./PublicChatMessages";

const ChatBox = ({
  User,
  userData,
  ChatLogPublic,
  ChatLogPrivate,
  sendPublicMessages,
  sendPrivateMessages,
  handleMessage,
}) => {
  return (
    <div className="flex flex-col w-[90%] h-screen">
      {/* current usersEntity */}
      <div
        id="CurrentUser"
        className="w-full h-[64px] border border-b-slate-300"
      >
        <div className="w-[250px] flex flex-row px-4 h-[64px] items-center">
          <div className="flex justify-center items-center border border-black rounded-2xl w-[50px] h-[50px]">
            <img
              src="https://i.seadn.io/gae/XLA0Qt_fCDoU2EXhfgKoYJmofcXKcQe0WIYWJjK_1JKfdZxBkEROjisZdliIbcPU3uT2pwoWi5JMDp9kUPzw6nN6Y7FnV7NZnsnNZA?auto=format&dpr=1&w=1000"
              alt=""
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <ul className="flex flex-col gap-1 h-[64px] items-start px-4 py-3">
            {/* username and id */}
            <li className="text-xl font-bold">{User}</li>
            <li className="text-xs text-[#4F5665]">@nh123</li>
          </ul>
        </div>
      </div>
      {/* messageBox */}
      <div id="MessageBox" className="px-3 py-3 h-[90%]">
        {User !== "CHATROOM" && (
          <PrivateChatMessages
            User={User}
            ChatLogPrivate={ChatLogPrivate}
            userData={userData}
            handleMessage={handleMessage}
            sendPrivateMessages={sendPrivateMessages}
          />
        )}
        {User === "CHATROOM" && (
          <PublicChatMessages
            userData={userData}
            ChatLogPublic={ChatLogPublic}
            handleMessage={handleMessage}
            sendPublicMessages={sendPublicMessages}
          />
        )}
      </div>
    </div>
  );
};

export default ChatBox;
