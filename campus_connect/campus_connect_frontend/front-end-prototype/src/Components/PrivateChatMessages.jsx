import { React, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";

const PrivateChatMessages = ({
  ChatLogPrivate,
  userData,
  handleMessage,
  sendPrivateMessages,
  User,
}) => {
  return (
    <>
      <div
        id="messageContent"
        className="w-full h-[97%] px-3 py-3 flex flex-col justify-end"
      >
        {[...ChatLogPrivate.get(User)].map((chat, idx) => {
          return (
            <>
              {chat.senderName === userData.username && (
                <div class="flex justify-end mb-4">
                  <div class="ml-2 py-3 px-4 bg-[#21978B] rounded-bl-xl rounded-tr-xl rounded-tl-xl text-white">
                    <p>{chat.message}</p>
                  </div>
                </div>
              )}
              {chat.senderName !== userData.username && (
                <div class="flex justify-start mb-4">
                  <div class="ml-2 py-3 px-4 bg-[#dddddd] rounded-br-xl rounded-tr-xl rounded-tl-xl text-black">
                    <p>{chat.message}</p>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
      <div id="messageTypeBox" className="px-3 py-3 border-t flex items gap-3">
        <input
          className="border border-slate-300 rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm ml-10 w-[90%]"
          type="text"
          placeholder="Start a new message"
          onChange={handleMessage}
        />
        <button onClick={sendPrivateMessages}>
          <AiOutlineSend size={30} />
        </button>
      </div>
    </>
  );
};

export default PrivateChatMessages;
