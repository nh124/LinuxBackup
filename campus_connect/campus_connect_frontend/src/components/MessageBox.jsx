import React from "react";
import { AiOutlineSend } from "react-icons/ai";

const ChatBox = () => {
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
            <li className="text-xl font-bold">Nur Haque</li>
            <li className="text-xs text-[#4F5665]">@nh123</li>
          </ul>
        </div>
      </div>
      {/* messageBox */}
      <div id="MessageBox" className="px-3 py-3 h-[90%]">
        <div
          id="messageContent"
          className="w-full h-[97%] px-3 py-3 flex flex-col justify-end"
        >
          <div class="flex justify-end mb-4">
            <div class="ml-2 py-3 px-4 bg-[#21978B] rounded-bl-xl rounded-tr-xl rounded-tl-xl text-white">
              <p>
                i woke up calmnnn i put it on the charger the phone was turned
                off next to me i took it out while i was sleeping
                hsadfkagshdfgsajf i slept early girl i slept at 3
              </p>
            </div>
          </div>
          <div class="flex justify-start mb-4">
            <div class="ml-2 py-3 px-4 bg-[#dddddd] rounded-br-xl rounded-tr-xl rounded-tl-xl text-black">
              <p>
                i woke up calmnnn i put it on the charger the phone was turned
                off next to me i took it out while i was sleeping
                hsadfkagshdfgsajf i slept early girl i slept at 3
              </p>
            </div>
          </div>
        </div>
        <div
          id="messageTypeBox"
          className="px-3 py-3 border-t flex items gap-3"
        >
          <input
            className="border border-slate-300 rounded-3xl py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm ml-10 w-[90%]"
            type="text"
            placeholder="Start a new message"
          />
          <button>
            <AiOutlineSend size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
