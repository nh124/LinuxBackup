import { React, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

const PublicChatMessages = ({
  userData,
  ChatLogPublic,
  handleMessage,
  sendPublicMessages,
  showRightPanel,
  getUserNames,
  darkMode,
}) => {
  const timeConverter = (timeDate) => {
    if (timeDate === undefined) {
      return;
    }
    let time = new Date(timeDate);
    let hours = time.getHours();
    let am_pm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    let minutes = time.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    let finalTime = hours + ":" + minutes + " " + am_pm;
    return finalTime;
  };

  const getDate = (date, fragment) => {
    if (date === undefined) {
      return;
    }
    let T_Date = new Date(date);
    let month = T_Date.getMonth();
    let year = T_Date.getFullYear();
    let day = T_Date.getDate();

    if (fragment === "month") {
      return month;
    }
    if (fragment === "year") {
      return year;
    }
    if (fragment === "day") {
      return day;
    }
    if (fragment === "full") {
      return `${month}/${day}/${year}`;
    }
  };
  return (
    <>
      <div
        id="messageContent"
        className="w-full h-[92%] px-3 py-3 flex flex-col overflow-hidden overflow-y-auto max-sm:h-[90%]"
      >
        {ChatLogPublic.map((chat, idx) => {
          return (
            <div key={idx}>
              {chat.userId === userData.user_id && (
                <div className="flex flex-row mb-4 justify-end items-start gap-1">
                  <div className="w-[60%] flex flex-col items-end">
                    <div className="flex flex-row gap-2 items-end">
                      <span className="font-bold">
                        {getUserNames(chat.userId)}
                      </span>
                    </div>
                    <div className="ml-2 py-1 px-4 bg-[#21978B] rounded-bl-xl rounded-tr-xl rounded-tl-xl text-white max-w-[90%] break-words max-2xl:text-lg max-lg:text-base">
                      <p>{chat.message}</p>
                    </div>
                    <div className="text-xs flex flex-row gap-1">
                      <span>{getDate(chat.date, "full")}</span>
                      <span>{timeConverter(chat.date)}</span>
                    </div>
                  </div>
                  <div className="bg-slate-400 w-[50px] h-[50px] rounded-full flex justify-center items-center">
                    <BsFillPersonFill size={30} color="white" />
                  </div>
                </div>
              )}
              {chat.userId !== userData.user_id && (
                <div className="flex flex-row mb-4 justify-start items-start gap-1">
                  <div className="bg-orange-400 w-[50px] h-[50px] rounded-full flex justify-center items-center">
                    <BsFillPersonFill size={30} color="white" />
                  </div>
                  <div className="w-[60%] flex flex-col items-start">
                    <div className="flex flex-row gap-2 items-start">
                      <span className="font-bold">
                        {getUserNames(chat.userId)}
                      </span>
                    </div>
                    <div
                      className={`py-1 px-4 ${
                        darkMode ? "bg-gray-700 text-white" : "bg-[#dddddd]"
                      }  rounded-br-xl rounded-tr-xl rounded-tl-xl text-black max-w-[90%] break-words max-2xl:text-lg max-lg:text-base`}
                    >
                      <p>{chat.message}</p>
                    </div>
                    <div className="text-xs flex flex-row gap-1">
                      <span>{getDate(chat.date, "full")}</span>
                      <span>{timeConverter(chat.date)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div
        id="messageTypeBox"
        className={`px-3 py-3 border-t ${
          darkMode ? "border-gray-600" : ""
        }  flex items gap-3`}
      >
        <input
          className={`border ${
            darkMode
              ? "bg-[#4F5665] border-slate-500 focus:border-gray-400 focus:ring-gray-400 "
              : "bg-white border-slate-300 focus:border-sky-500 focus:ring-sky-500"
          }  border-slate-300 rounded-3xl py-2 pl-5 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm ml-3 w-[95%] overflow-auto`}
          type="text"
          placeholder="Start a new message"
          onChange={handleMessage}
        />
        <button onClick={sendPublicMessages}>
          <AiOutlineSend size={30} />
        </button>
      </div>
    </>
  );
};

export default PublicChatMessages;
